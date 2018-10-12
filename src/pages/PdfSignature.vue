<template>
    <section>
        <div class="canvas-container-hide">
            <canvas id="pdf-canvas-hide"></canvas>
        </div>
        <div class="canvas-container">
            <canvas id="pdf-canvas"></canvas>
        </div>
        <el-button @click="prev">上一页</el-button>
        <el-button @click="next">下一页</el-button>
        <el-button @click="eSignature" v-show="curPageNo != numPages">电子签字</el-button>
        <el-button @click="confirmSignature" v-show="showOperationBtns">确认签字</el-button>
        <el-button @click="reset" v-show="showOperationBtns">撤销</el-button>
        <el-button @click="downloadSignature" v-show="showOperationBtns">下载签字页</el-button>
    </section>
</template>

<script>
import * as _ from 'underscore';
import { Signature } from '../assets/js/signature.js'
import * as jsPDF from 'jspdf'
export default {
    data(){
        return {
            pdf: null,
            curPageNo: 1,
            numPages: 1,
            signature: null,
            getAllCurrentPage: 1,
            imageDataList: [],
            signatureDataURL: ''
        }
    },
    mounted() {
        this.initPdf()
    },
    methods: {
        initPdf() {
            // 网络pdf
            var url = 'http://172.16.2.237:8097/Web3.0_控件开发包编程指南.pdf'
            // 本地pdf
            // var url = 'static/pdf/web/test.pdf';
            PDFJS.workerSrc = 'static/pdf/build/pdf.worker.js';
            PDFJS.getDocument(url).then(pdf => {
                console.log('pdf文档：', pdf)
                this.pdf = pdf
                this.numPages = pdf.numPages
                this.curPageNo = 1
                this.changePage(this.curPageNo)
                this.getAllPage()
            });
        },
        getAllPage() {
            this.pdf.getPage(this.getAllCurrentPage).then(page => {
                var scale = 1.5
                var viewport = page.getViewport(scale)
                var canvas = document.getElementById('pdf-canvas-hide')
                var context = canvas.getContext('2d')
                canvas.height = viewport.height
                canvas.width = viewport.width
                var renderContext = {
                    canvasContext: context,
                    viewport: viewport
                }
                page.render(renderContext).then(() => {
                    if (this.getAllCurrentPage < this.numPages) {
                        this.imageDataList.push(canvas.toDataURL('image/jpeg', 1.0))
                        this.getAllCurrentPage++
                        this.getAllPage()
                    } else {
                        console.log(this.imageDataList)
                    }
                })
            });
        },
        changePage(pageNo) {
            return new Promise((resolve, reject) => {
                this.pdf.getPage(pageNo).then(page => {
                    console.log('pdf当前页：', page)
                    var scale = 1.5
                    var viewport = page.getViewport(scale)
                    var canvas = document.getElementById('pdf-canvas')
                    var context = canvas.getContext('2d')
                    canvas.height = viewport.height
                    canvas.width = viewport.width
                    var renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    }
                    page.render(renderContext).then(() => {
                        if (this.signature) {
                            this.signature.enable = pageNo == this.numPages ? true : false
                        }
                        resolve()
                    })
                });
            })
        },
        prev() {
            if (this.curPageNo == this.numPages && this.signature.getSigned()) {
                this.$message({message: '请确认签字或撤销', type: 'warning'})
            } else if (this.curPageNo == 1) {
                this.$message({message: '已经是第一页了', type: 'warning'})
            } else {
                this.changePage(--this.curPageNo)
            }
        },
        next() {
            if (this.curPageNo == this.numPages) {
                this.$message({message: '已经到最后一页了', type: 'warning'})
            } else {
                this.changePage(++this.curPageNo)
            }
        },
        eSignature(noTips) {
            this.curPageNo = this.numPages
            this.changePage(this.curPageNo).then(() => {
                if (!noTips) {
                    this.$alert('请在空白区域签字', '系统提示', {
                        confirmButtonText: '确定'
                    });
                }
                this.signature = new Signature(document.getElementById('pdf-canvas'))
            })
        },
        confirmSignature() {
            this.$confirm('您确认要签字吗？', '系统提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(() => {
                this.signatureDataURL = this.signature._canvas.toDataURL('image/jpeg', 1.0)
                this.generatePDF()
            }).catch(() => {

            })
        },
        reset() {
            this.signature.setSigned(false)
            this.signatureDataURL = ''
            this.eSignature(true)
        },
        downloadSignature() {
            if (this.signature) {
                var imageURL = this.signature._canvas.toDataURL()
                var a = document.createElement('a')
                a.href = imageURL
                a.download = '电子签名' + new Date().toString()
                a.click()
                a = null
            }
        },
        generatePDF() {
            var doc = new jsPDF('p', 'pt', 'a4');
            for (let i = 0; i < this.imageDataList.length; i++) {
                doc.addImage(this.imageDataList[i], 'PNG', 0, 0, 597, 843);
                doc.addPage()
            }
            doc.addImage(this.signatureDataURL, 'PNG', 0, 0, 597, 843);
            doc.save('test.pdf');
        }
    },
    computed: {
        showOperationBtns: function() {
            return this.curPageNo == this.numPages && this.signature && this.signature.getSigned()
        }
    }
}
</script>

<style lang="scss" scoped>
    .canvas-container-hide {
        visibility: hidden;
        position: absolute;
        overflow: hidden;
        width: px2rem(1);
        height: px2rem(1);
    }
    .canvas-container {
        overflow: auto;
        height: px2rem(800);
        #pdf-canvas {
            border: 1px solid $border-color;
        }
    }
</style>

