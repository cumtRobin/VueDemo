<template>
    <section>
        <canvas class="j-signature" ref="canvas-sign" width="800" height="500">您的浏览器不支持canvas</canvas>
        <el-button @click="save">保存为图片</el-button>
        <el-button @click="reset">撤销</el-button>
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
            leaveTimer: null
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
        }
    },
    mounted() {
        this._canvas = this.$refs['canvas-sign']
        this._context = this._canvas.getContext('2d')
        // this._context.strokeStyle = "red";
        this._canvas.addEventListener('mousedown', (e) => {
            this.status = 'down'
            this._context.moveTo(e.offsetX, e.offsetY)
        })
        this._canvas.addEventListener('mousemove', (e) => {
            if (this.status == 'down' || this.status == 'moving') {
                this.status = 'moving'
                this._context.stroke()
                this._context.lineTo(e.offsetX, e.offsetY)
            }
        })
        this._canvas.addEventListener('mouseup', (e) => {
            if (this.status == 'down' || this.status == 'moving') {
                this.status = 'up'
                this._context.stroke()
            }
        })
        this._canvas.addEventListener('mouseleave', (e) => {
            if (this.status == 'down' || this.status == 'moving') {
                this.status = 'out'
                this._context.stroke()
            }
        })
    }
}
</script>

<style lang="scss" scoped>
    .j-signature {
        border: 1px solid $border-color;
    }
</style>

