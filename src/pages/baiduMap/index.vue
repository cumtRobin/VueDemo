<template>
    <section>
        <router-link to="/baidumap">
            <el-button>地图展示</el-button>
        </router-link>
        <router-link to="/baidumap/async_load">
            <el-button>异步加载</el-button>
        </router-link>
        <router-link to="/baidumap/map_control">
            <el-button>地图控件</el-button>
        </router-link>
        <router-link to="/baidumap/map_overlay">
            <el-button>地图覆盖物</el-button>
        </router-link>

        <router-view/>
    </section>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    methods: {

    },
    mounted() {

    }
}
</script>

<style lang="scss" scoped>

</style>

