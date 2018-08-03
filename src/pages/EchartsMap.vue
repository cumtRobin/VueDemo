<template>
    <section>
        <div id="echartsMap" ref="echartsMap" class="map"></div>
        <el-button @click="backToUpperMap" v-show="mapStack.length > 1">返回</el-button>
    </section>
</template>

<script>
import _ from 'underscore'
import echarts from 'echarts'
import axios from 'axios'
export default {
    data() {
        return {
            chartMap: null,
            mapOption: null,
            currMapJsonData: null,
            mapStack: []
        }
    },
    mounted() {
        this.chartMap = echarts.init(this.$refs.echartsMap)
        this.initMap()
        this.chartMap.on('mapselectchanged', (data) => {
            let areaName = data.batch[0].name
            if (areaName !== '南海诸岛') {
                let findArea = _.find(this.currMapJsonData.features, item => {
                    return item.properties.name === areaName
                })
                let areaId = findArea.properties.id
                this.getNewMapJson(areaId, areaName)
            }
        })
    },
    methods: {
        initMap() {
            this.chartMap.showLoading()
            axios.get('static/json/map/china.json').then(resp => {
                this.chartMap.hideLoading()
                this.currMapJsonData = resp.data
                echarts.registerMap('china', resp.data)
                this.setChartMap('china', 'china')
            })
        },
        getNewMapJson(id, name, isBack) {
            if (id.length == 4) {
                id += '00'
            }
            this.chartMap.showLoading()
            axios.get(`static/json/map/${id}.json`).then(resp => {
                this.chartMap.hideLoading()
                this.currMapJsonData = resp.data
                echarts.registerMap(name, resp.data)
                this.setChartMap(id, name, isBack)
            }).catch(err => {
                this.chartMap.hideLoading()
                if (err.response.status == 404) {
                    this.$message({message: '抱歉，暂无下一级地图', type: 'warning'})
                }
            })
        },
        setChartMap(mapId, mapName, isBack) {
            this.mapOption = {
                geo: {
                    map: mapName,
                    type: 'map',
                    zoom: 1.25
                },
                series: [
                    {
                        name: '监管点地图',
                        type: 'map',
                        map: mapName,
                        selectedMode: 'single',
                        label: {
                            show: true,
                            color: '#333',
                            emphasis: {
                                color: 'yellow'
                            }      
                        },
                        itemStyle: {
                            borderWidth: 2,
                            borderColor: '#0f5c94',
                            areaColor: 'lightblue',
                            opacity: '0.9'
                        },
                        emphasis: {
                            itemStyle: {
                                areaColor: '#f74700',
                                shadowColor: '#f4deb9',
                                shadowBlur: '6'
                            }
                        },
                        zoom: 1.25,
                        data: []
                    }
                ]
            };
            this.chartMap.setOption(this.mapOption)
            if (!isBack) {
                this.mapStack.push({
                    mapId: mapId,
                    mapName: mapName
                })
            }
        },
        backToUpperMap() {
            this.mapStack.pop()
            let stackLength = this.mapStack.length
            let backMapInfo = this.mapStack[stackLength - 1]
            this.getNewMapJson(backMapInfo.mapId, backMapInfo.mapName, true)
        }
    }
}
</script>

<style lang="scss" scoped>
    .map {
        width: 1200px;
        height: 800px;
    }
</style>

