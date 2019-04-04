<template>
    <el-row :gutter="20">
        <el-col :span="12" v-for="(column, index) in columnList" :key="index">
            <el-card class="box-card card-column">
                <div slot="header" class="clearfix">
                    <span>{{column.columnName}}</span>
                </div>
                <commodity-list :commodities="column.commodityList">
                    <template slot-scope="scope">
                        <!-- 这里只需要给Commodity组件传入数据，响应Commodity组件的clickCommodity事件即可。
                        事件不必携带参数，完全符合父到子的数据流向，而不会发生子组件又给父组件反向发数据的情况 -->
                        <commodity :modityData="scope.row" @clickCommodity="onCommodityClick(scope.row)"></commodity>
                    </template>
                </commodity-list>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import Commodity from '@/components/Commodity'
import CommodityList from '@/components/CommodityList'
export default {
    components: {
        Commodity, CommodityList
    },
    data() {
        return {
            columnList: [
                {
                    columnName: '有好货',
                    commodityList: [
                        {
                            commodityName: '红米6',
                            detail: '红米6好啊，红米6好啊，红米6好啊，红米6好啊，红米6好啊，红米6好啊，红米6好啊，红米6好啊，'
                        },
                        {
                            commodityName: 'iphone8',
                            detail: 'iphone8好啊，iphone8好啊，iphone8好啊，iphone8好啊，iphone8好啊，iphone8好啊，iphone8好啊，'
                        },
                        {
                            commodityName: '红米8',
                            detail: '红米8好啊，红米8好啊，红米8好啊，红米8好啊，红米8好啊，红米8好啊，红米8好啊，红米8好啊，红米8好啊，'
                        },
                        {
                            commodityName: '小米9',
                            detail: '小米9好啊，小米9好啊，小米9好啊，小米9好啊，小米9好啊，小米9好啊，小米9好啊，小米9好啊，小米9好啊，'
                        },
                        {
                            commodityName: 'iphone X',
                            detail: 'iphone X好啊，iphone X好啊，iphone X好啊，iphone X好啊，iphone X好啊，iphone X好啊，iphone X好啊，'
                        },
                        {
                            commodityName: '华为荣耀8',
                            detail: '华为荣耀8好啊，华为荣耀8好啊，华为荣耀8好啊，华为荣耀8好啊，华为荣耀8好啊，华为荣耀8好啊，华为荣耀8好啊，'
                        }
                    ]
                },
                {
                    columnName: '爱逛街',
                    commodityList: [
                        {
                            commodityName: '格力冰箱',
                            detail: '格力冰箱好啊，格力冰箱好啊，格力冰箱好啊，格力冰箱好啊，格力冰箱好啊，格力冰箱好啊，格力冰箱好啊，格力冰箱好啊，'
                        },
                        {
                            commodityName: '西门子吸尘器',
                            detail: '西门子吸尘器好啊，西门子吸尘器好啊，西门子吸尘器好啊，西门子吸尘器好啊，西门子吸尘器好啊，西门子吸尘器好啊，'
                        },
                        {
                            commodityName: '海信智能电视',
                            detail: '海信智能电视好啊，海信智能电视好啊，海信智能电视好啊，海信智能电视好啊，海信智能电视好啊，海信智能电视好啊，'
                        },
                        {
                            commodityName: '松下吹风机',
                            detail: '松下吹风机好啊，松下吹风机好啊，松下吹风机好啊，松下吹风机好啊，松下吹风机好啊，松下吹风机好啊，松下吹风机好啊，'
                        },
                        {
                            commodityName: '家用投影仪',
                            detail: '家用投影仪好啊，家用投影仪好啊，家用投影仪好啊，家用投影仪好啊，家用投影仪好啊，家用投影仪好啊，'
                        },
                        {
                            commodityName: '扫地机器人',
                            detail: '扫地机器人好啊，扫地机器人好啊，扫地机器人好啊，扫地机器人好啊，扫地机器人好啊，扫地机器人好啊，'
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        onCommodityClick(row) {
            console.log(row)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
