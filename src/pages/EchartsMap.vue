<template>
    <section>
        <div id="echartsMap" ref="echartsMap" class="map"></div>
        <el-button @click="backToUpperMap" v-show="upperMapStack.length > 0">返回上级地图</el-button>
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
            upperMapStack: [],
            scatterDatas: [
                {
                    name: '长沙机场',
                    value: [113.0823, 28.2568, 20]
                },
                {
                    name: '上海机场',
                    value: [121.4648, 31.2891, 40]
                },
                {
                    name: '乌鲁木齐机场',
                    value: [87.9236, 43.5883, 33]
                }
            ],
            airLineList: [
                {
                    from: '长沙机场',
                    to: '上海机场',
                    coords: [[113.0823, 28.2568], [121.4648, 31.2891]]
                },
                {
                    from: '长沙机场',
                    to: '乌鲁木齐机场',
                    coords: [[113.0823, 28.2568], [87.9236, 43.5883, 33]]
                }
            ]
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
                this.getNewMapJson(areaId, areaName, false)
            }
        })
    },
    methods: {
        initMap() {
            this.chartMap.showLoading()
            this.$getStatic('static/json/map/china.json').then(resp => {
                this.chartMap.hideLoading()
                this.currMapJsonData = resp.data
                echarts.registerMap('china', resp.data)
                this.setChartMap('china', 'china')
            }, fail => {
                console.log(fail)
            })
        },
        getNewMapJson(id, name, isBack) {
            if (id.length == 4) {
                id += '00'
            }
            this.chartMap.showLoading()
            this.$getStatic(`static/json/map/${id}.json`).then(resp => {
                if (!isBack) {
                    this.upperMapStack.push(this.currentMap)
                }
                this.chartMap.hideLoading()
                this.currMapJsonData = resp.data
                echarts.registerMap(name, resp.data)
                this.setChartMap(id, name)
            }).catch(err => {
                this.chartMap.hideLoading()
                if (err.response.status == 404) {
                    this.$message({message: '抱歉，暂无下一级地图', type: 'warning'})
                }
            })
        },
        setChartMap(mapId, mapName) {
            this.mapOption = {
                geo: {
                    map: mapName,
                    type: 'map',
                    zoom: 1.25
                },
                tooltip: {
                    show: false
                },
                legend: {
                    data: ['航线图'],
                    textStyle: {
                        color: '#333'
                    }
                },
                series: [
                    // 地图
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
                    },
                    // 散点图
                    {
                        name: '航线数量',
                        type: 'scatter',
                        symbol: 'circle',
                        symbolSize: '18',
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: false
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        itemStyle: {
                            color: {
                                type: 'radial',
                                x: 0.5,
                                y: 0.5,
                                r: 0.5,
                                colorStops: [{
                                    offset: 0, color: '#bbd49b'
                                }, {
                                    offset: 1, color: '#864b21'
                                }],
                                globalCoord: false
                            }
                        },
                        coordinateSystem: 'geo',
                        data: this.scatterDatas,
                        tooltip: {
                            trigger: 'item',
                            show: true,
                            formatter: function(data) {
                                return data.name + '<br/>' + data.seriesName + ': ' + data.value[2]
                            }
                        },
                    },
                    {
                        name: '航线图',
                        type: 'lines',
                        coordinateSystem: 'geo',
                        zlevel: 1,
                        effect: {
                            show: true,
                            constantSpeed: 120,
                            symbol: 'arrow',
                            symbolSize: 16,
                            trailLength: 0,
                        },
                        lineStyle: {
                            width: 2,
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#052e55'
                                }, {
                                    offset: 1, color: '#cc2fee'
                                }],
                                globalCoord: false
                            },
                            curveness: 0.2,
                            opacity: 0.9
                        },
                        data: this.upperMapStack.length == 0 ? this.airLineList : []
                    }
                ]
            };
            this.chartMap.setOption(this.mapOption)
            this.currentMap = {
                mapId: mapId,
                mapName: mapName
            }
        },
        backToUpperMap() {
            let backMapInfo = this.upperMapStack.pop()
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

