<template>
    <section class="signature-container">
        <canvas class="j-signature" ref="canvasSign" width="1000" height="600">您的浏览器不支持canvas</canvas>
        <el-button @click="save">保存为图片</el-button>
        <el-button @click="reset">撤销</el-button>
    </section>
</template>

<script>
import * as _ from 'underscore';
import { Signature } from '../assets/js/signature.js'
export default {
    data(){
        return {
            signature: null
        }
    },
    methods: {
        save() {
            var imageURL = this.signature._canvas.toDataURL()
            var a = document.createElement('a')
            a.href = imageURL
            a.download = 'Canvas电子签名' + new Date().toString()
            a.click()
            a = null
        },
        reset() {
            this.signature.reset()
        },
    },
    mounted() {
        this.signature = new Signature(this.$refs.canvasSign)
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

