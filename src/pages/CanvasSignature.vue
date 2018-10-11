<template>
    <section class="signature-container">
        <canvas class="j-signature" ref="canvas-sign" width="1000" height="600">您的浏览器不支持canvas</canvas>
        <el-button @click="save">保存为图片</el-button>
        <el-button @click="reset">撤销</el-button>
        <!-- <el-button @mousedown="startSlowReset" @mouseup="stopSlowReset">长按缓慢撤销</el-button> -->
    </section>
</template>

<script>
import * as _ from 'underscore';
export default {
    data(){
        return {
            _canvas: null,
            _context: null,
            status: 'up',
            imageURL: '',
            leaveTimer: null,
            speed: 1,
            preTime: null,
            preOffsetX: 0,
            preOffsetY: 0,
            keepRestore: false
        }
    },
    methods: {
        save() {
            this.imageURL = this._canvas.toDataURL()
            var a = document.createElement('a')
            a.href = this.imageURL
            a.download = '电子签名' + new Date().toString()
            a.click()
            a = null
        },
        reset() {
            this._canvas.width = this._canvas.width
        },
        startSlowReset() {
            this.keepRestore = true
            this.slowReset()
        },
        stopSlowReset() {
            this.keepRestore = false
        },
        slowReset() {
            window.requestAnimationFrame(() => {
                this._context.restore()
                if (this.keepRestore) {
                    this.slowReset()
                }
            })
        }
    },
    mounted() {
        this._canvas = this.$refs['canvas-sign']
        this._context = this._canvas.getContext('2d')
        this._canvas.addEventListener('mousedown', (e) => {
            this.status = 'down'
            // 开始签名
            this._context.beginPath()
            // moveTo指定线的起点
            this._context.moveTo(e.offsetX, e.offsetY)
        })
        this._canvas.addEventListener('mousemove', (e) => {
            if (this.status == 'down' || this.status == 'moving') {
                this.status = 'moving'
                if (!this.preTime) {
                    // 记录最近一次的时间
                    this.preTime = new Date().getTime()
                } else {
                    // 根据距离和时间计算速度
                    this.speed = (Math.sqrt(Math.pow(this.preOffsetX - e.offsetX, 2) + Math.pow(this.preOffsetY - e.offsetY, 2))) / (new Date().getTime() - this.preTime)
                    // 记录最近一次的时间
                    this.preTime = new Date().getTime()
                }
                // 速度越快则笔画越细
                this._context.lineWidth = 3 / this.speed > 4 ? 4 : 3 / this.speed
                // moveTo指定线的终点
                this._context.lineTo(e.offsetX, e.offsetY)
                // stroke是真正的绘制线的方法
                this._context.stroke()
                // 开始新的一笔
                this._context.beginPath()
                this._context.moveTo(e.offsetX, e.offsetY)
                // 记录最近一次移动的坐标
                this.preOffsetX = e.offsetX
                this.preOffsetY = e.offsetY
            }
        })
        this._canvas.addEventListener('mouseup', (e) => {
            if (this.status == 'down' || this.status == 'moving') {
                this.status = 'up'
                // 鼠标松开，绘制最后一笔
                this._context.stroke()
            }
        })
        this._canvas.addEventListener('mouseleave', (e) => {
            if (this.status == 'down' || this.status == 'moving') {
                this.status = 'out'
                // 鼠标离开，绘制最后一笔
                this._context.stroke()
            }
        })
    }
}
</script>

<style lang="scss" scoped>
.signature-container {
    @include no-select;
    .j-signature {
        border: 1px solid $border-color;
    }
}
</style>

