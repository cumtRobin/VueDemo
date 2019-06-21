<template>
    <section>
        <div style="margin:0.2rem 0;">要放开注释，index.html引入的百度地图的js</div>
        <div id="allmap" style="height:600px;"></div>
        <el-button @click="location">开始定位</el-button>
        <el-button @click="getAddressComponent">返回定位信息</el-button>
    </section>
</template>

<script>
export default {
    data(){
        return {
            geolocationControl: null
        }
    },
    methods: {
        initMap() {
            // 创建Map实例
            window.map = new BMap.Map("allmap");
            // 初始化地图,设置中心点坐标和地图级别，这里不设置的话，是不会展示地图的
            // 第一个参数是中心坐标，第二个缩放级别，越大越精准，但是有范围
            map.centerAndZoom(new BMap.Point(112.889, 28.237), 15);


            // 地图类型控件
            var mapTypeControl = new BMap.MapTypeControl({
                type: BMAP_MAPTYPE_CONTROL_DROPDOWN,
                mapTypes:[
                    BMAP_NORMAL_MAP,
                    // BMAP_SATELLITE_MAP,
                    BMAP_HYBRID_MAP
                ]
            })

            // 平移缩放控件
            var navigationControl = new BMap.NavigationControl({
                // 没看出来有什么用
                showZoomInfo: true,
                // 集成定位控件的定位功能，需要依赖GeolocationControl
                enableGeolocation: true,
                type: BMAP_NAVIGATION_CONTROL_SMALL
            })

            // 地图定位控件
            this.geolocationControl = new BMap.GeolocationControl({
                // 没看出来效果
                enableAutoLocation: false,
                // locationIcon: {

                // }
            })

            // 缩略地图控件
            var overviewMapControl = new BMap.OverviewMapControl({
                isOpen: true
            })

            // 比例尺控件
            var scaleControl = new BMap.ScaleControl({
                anchor: BMAP_ANCHOR_TOP_LEFT
            })

            // 版权控件
            var copyrightControl = new BMap.CopyrightControl({
                anchor: BMAP_ANCHOR_TOP_RIGHT,
                offset: {
                    width: 100,
                    height: 10
                }
            })

            // 全景控件
            var panoramaControl = new BMap.PanoramaControl()
            
            // 城市列表控件
            var cityListControlSize = new BMap.Size(200, 20);
            var cityListControl = new BMap.CityListControl({
                anchor: BMAP_ANCHOR_TOP_LEFT,
                offset: cityListControlSize,
                // 切换城市之间事件
                // onChangeBefore: function(){
                //    alert('before');
                // },
                // 切换城市之后事件
                // onChangeAfter:function(){
                //   alert('after');
                // }
            })

            map.addControl(mapTypeControl);
            map.addControl(navigationControl);
            map.addControl(this.geolocationControl);
            map.addControl(overviewMapControl);
            map.addControl(scaleControl);
            map.addControl(copyrightControl);
            map.addControl(panoramaControl);
            map.addControl(cityListControl);

            copyrightControl.addCopyright({
                id: 1,
                // 支持html
                content: '<h2 style="color:blue">版权归Tusi所有，侵权必究</h2>'
            })


            // 设置地图显示的城市 此项是必须设置的
            map.setCurrentCity("长沙");
            //开启鼠标滚轮缩放
            map.enableScrollWheelZoom(true);
        },
        location() {
            // 貌似没有用
            this.geolocationControl.location();
        },
        getAddressComponent() {
            let address = this.geolocationControl.getAddressComponent();
            console.log(address);
            this.$message({
                type: 'info',
                message: JSON.stringify(address)
            })
        }
    },
    mounted() {
        this.initMap();
    }
}
</script>

<style lang="scss" scoped>

</style>

