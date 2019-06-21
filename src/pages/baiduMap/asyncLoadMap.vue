<template>
    <section>
        <div style="margin:0.2rem 0;">可以注释掉index.html引入的百度地图的js</div>
        <div id="allmap" style="height:600px;"></div>
    </section>
</template>

<script>
import utils from '../../assets/js/utils.js'

export default {
    data(){
        return {
            ak: 'hEQzQyb5kAa4j19uywUhMqRmg6fY4oPq'
        }
    },
    methods: {
        init() {
            var map = new BMap.Map("allmap");
            var point = new BMap.Point(116.404, 39.915);
            map.centerAndZoom(point,15);                 
            map.enableScrollWheelZoom();
        }  
    },
    mounted() {
        window.initBaiduMap = this.init;
        utils.loadScript(
            `http://api.map.baidu.com/api?v=2.0&ak=${this.ak}&callback=initBaiduMap`,
            document.getElementsByTagName('head')[0],
            true,
            true
        ).then(res => {
            console.log('加载成功')
        }).catch(() => {
            console.log('加载失败')
            this.$message({
                type: 'success',
                message: '加载百度地图api失败'
            })
        })
    }
}
</script>

<style lang="scss" scoped>

</style>

