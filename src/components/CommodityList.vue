<template>
    <el-row :gutter="20">
        <el-col :span="8" v-for="(item, index) in commodities" :key="index" style="margin-top:20px;">
            <slot :row="item"></slot>
        </el-col>
    </el-row>
</template>

<script>
export default {
    props: {
        commodities: {
            type: Array,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
