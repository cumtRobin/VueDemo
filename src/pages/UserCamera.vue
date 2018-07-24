<template>
    <section>
        <video ref="video" id="video" class="user-camera" autoplay></video>
        <el-button @click="controlUserCamera(true)">打开摄像头</el-button>
        <el-button @click="controlUserCamera(false)">关闭摄像头</el-button>
		<p>使用navigator.getUserMedia实现</p>
    </section>
</template>

<script>
export default {
    data(){
        return {
            mediaStreamTrack: null
        }
    },
    methods: {
        controlUserCamera(openFlag) {
            if(openFlag === true) {
				navigator.getUserMedia = navigator.getUserMedia ||  
				navigator.webkitGetUserMedia ||  
				navigator.mozGetUserMedia;  
				if (navigator.getUserMedia) {  
					navigator.getUserMedia({ video: true }, (stream) => {
						console.log(stream)
						this.mediaStreamTrack = stream.getTracks()[0]
						this.$refs.video.src = (window.URL || window.webkitURL).createObjectURL(stream);
						this.$refs.video.play();
					}, (err) => {
						this.$message({message: '您拒绝了打开摄像头或无摄像头可用', type: 'error'})
						console("发生了以下错误: " + err.name);  
					});  
				} else {
					this.$message({message: '您的浏览器不支持调用摄像头', type: 'error'})
					console.log("您的浏览器不支持调用摄像头");
				} 
			} else {
				if (this.mediaStreamTrack) {
					this.mediaStreamTrack.stop()
					this.mediaStreamTrack = null
				}
			}
        }
	},
	beforeDestroy() {
		if (this.mediaStreamTrack) {
			this.mediaStreamTrack.stop()
			this.mediaStreamTrack = null
		}
	}
}
</script>

<style lang="scss" scoped>
    .user-camera {
        width: px2rem(300);
    }
</style>
