<template>
    <section>
        <div id="echartsMap" ref="echartsMap" class="map"></div>
    </section>
</template>

<script>
import echarts from 'echarts'
import axios from 'axios'
export default {
    data() {
        return {
            chartMap: null,
            mapOption: null
        }
    },
    mounted() {
        this.chartMap = echarts.init(this.$refs.echartsMap)
        axios.get('static/json/map/china.json').then(resp => {
            console.log(resp)
            echarts.registerMap('china', resp.data)
            this.setChartMap('china')
        })
    },
    methods: {
        setChartMap(mapName) {
            this.mapOption = {
                geo: {
                    map: mapName,
                    type: 'map',
                    itemStyle: {
                        opacity: '0.9'
                    },
                    zoom: 1.25
                },
                series: [
                    {
                        name: '监管点地图',
                        type: 'map',
                        selectedMode: 'single',
                        label: {
                            normal: {
                                show: true,
                                color: '#333'
                            }         
                        },
                        itemStyle: {
                            borderWidth: 2,
                            borderColor: '#0f5c94',
                            areaColor: '#f74700',
                            opacity: '0.9'
                        },
                        emphasis: {
                            label: {
                                color: '#fff'
                            },
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

