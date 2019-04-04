<template>
    <section>
        <el-input v-model="svghtml"></el-input>
        <el-button @click="generateSVG">生成SVG</el-button>
        <el-button @click="generateImg">开始转换图片</el-button>
        <div id="svgContainer"></div>
    </section>
</template>

<script>
import * as _ from 'underscore';
export default {
    data(){
        return {
            svghtml: ''
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

            // 直接在网站上下载
//             var image = new Image();
//             image.onload = function() {
//                 var canvas = document.createElement('canvas');
//                 canvas.width = $('#tusi_svg').width();
//                 canvas.height = $('#tusi_svg').height();
// ​
//                 var context = canvas.getContext('2d');
//                 context.drawImage(image, 0, 0);
// ​
//                 var a1 = document.createElement('a');
//                 a1.href = canvas.toDataURL('image/png');
//                 a1.download = "svg转的图片";
//                 a1.click();
//             }
//             image.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent($('#tusi_svg').html())));

        }
    }
}
</script>

<style lang="scss" scoped>

</style>
