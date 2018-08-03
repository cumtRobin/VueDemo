<template>
    <section>
        <router-link to="/ImgProcess">
            <el-button>图像处理</el-button>
        </router-link>
        <router-link to="/ImageMagnifier">
            <el-button>图片放大镜</el-button>
        </router-link>
        <router-link to="/UserCamera">
            <el-button>用户摄像头控制(旧版本)</el-button>
        </router-link>
        <router-link to="/NewUserCamera">
            <el-button>用户摄像头控制(新版本)</el-button>
        </router-link>
        <router-link to="/CameraAndUpload">
            <el-button>摄像头和图片上传功能</el-button>
        </router-link>
        <router-link to="/TreeDemo">
            <el-button>树形组件的应用</el-button>
        </router-link>
        <router-link to="/EchartsMap">
            <el-button>地图组件的应用</el-button>
        </router-link>
        <router-link to="/MarkdownToHtml">
            <el-button>markdown转html</el-button>
        </router-link>
    </section>
</template>

<script>
export default {

}
</script>
