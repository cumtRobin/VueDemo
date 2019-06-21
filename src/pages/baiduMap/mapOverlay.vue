<template>
    <section>
        <div style="margin:0.2rem 0;">要放开注释，index.html引入的百度地图的js</div>
        <div id="allmap" style="height:600px;"></div>
    </section>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    methods: {
        initMap() {
            // 创建Map实例
            var map = new BMap.Map("allmap");
            // 初始化地图,设置中心点坐标和地图级别，这里不设置的话，是不会展示地图的
            // 第一个参数是中心坐标，第二个缩放级别，越大越精准，但是有范围
            map.centerAndZoom(new BMap.Point(112.889, 28.237), 15);
            // 添加地图类型控件
            map.addControl(new BMap.MapTypeControl({
                mapTypes:[
                    BMAP_NORMAL_MAP,
                    // BMAP_SATELLITE_MAP,
                    BMAP_HYBRID_MAP
                ]}));
            //开启鼠标滚轮缩放
            map.enableScrollWheelZoom(true);
        }
    },
    mounted() {
        this.initMap();
    }
}
</script>

<style lang="scss" scoped>

</style>

