<template>
    <section>
        <el-input v-model="svghtml"></el-input>
        宽度：<el-input v-model="width"></el-input>
        高度：<el-input v-model="height"></el-input>
        <el-button @click="generateSVG">生成SVG</el-button>
        <el-button @click="generateImg">开始转换图片</el-button>
        <div id="svgContainer" :style="{width: `${width}px`, height: `${height}px`}"></div>
    </section>
</template>

<script>
import * as _ from 'underscore';
export default {
    data(){
        return {
            svghtml: '',
            width: 400,
            height: 300
        }
    },
    methods: {
        generateSVG() {
            var svgdom = $(this.svghtml);
            $('#svgContainer').html(svgdom);
        },
        generateImg() {
            var image = new Image();
            image.onload = function() {
                var canvas = document.createElement('canvas');
                canvas.width = $('svg').width();
                canvas.height = $('svg').height();

                var context = canvas.getContext('2d');
                context.drawImage(image, 0, 0);

                var a = document.createElement('a');
                a.href = canvas.toDataURL('image/png');
                a.download = "svg转的图片";
                a.click();
            }
            image.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(this.svghtml)));
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
