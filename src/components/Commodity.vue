<template>
    <div>
        <el-card class="box-card card-commodity" @click.native="onClickCard">
            <div slot="header" class="clearfix">
                <span>{{modityData.commodityName}}</span>
            </div>
            <p>{{modityData.detail}}</p>
        </el-card>
    </div>
</template>

<script>
export default {
    props: {
        modityData: {
            type: Object,
            required: true
        }
    },
    methods: {
        onClickCard() {
            this.$emit('clickCommodity');
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
