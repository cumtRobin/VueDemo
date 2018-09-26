<template>
    <section>
        <video ref="video" id="video" class="user-camera" autoplay></video>
        <el-button @click="controlUserCamera(true)">打开摄像头</el-button>
        <el-button @click="controlUserCamera(false)">关闭摄像头</el-button>
        <p>使用navigator.mediaDevices.getUserMedia实现</p>
    </section>
</template>

<script>
export default {
    data(){
        return {
            videoTrack: null
        }
    },
    methods: {
        controlUserCamera(openFlag) {
            if (navigator.mediaDevices) {
                if (openFlag === true) {
                    var constraints = window.constraints = {
                        audio: false,
                        video: true
                    };
                    navigator.mediaDevices.getUserMedia(constraints).then(stream => {
                        this.videoTrack = stream.getVideoTracks()[0];
                        this.$refs.video.srcObject = stream;
                    }).catch(function(error) {
                        let message = ''
                        if (error.name === 'ConstraintNotSatisfiedError') {
                            message = 'The resolution ' + constraints.video.width.exact + 'x' +
                                constraints.video.width.exact + ' px is not supported by your device.';
                        } else if (error.name === 'PermissionDeniedError') {
                            message = 'Permissions have not been granted to use your camera and ' +
                            'microphone, you need to allow the page access to your devices in ' +
                            'order for the demo to work.';
                        }
                        this.$message({message: message, type: 'error'})
                    });
                } else {
                    if (this.videoTrack) {
                        this.videoTrack.stop()
                        this.videoTrack = null
                    }
                }
            } else {
                this.$message({message: '您的浏览器不支持navigator.mediaDevices.getUserMedia', type: 'error'})
            }
        }
    },
    beforeDestroy() {
		if (this.videoTrack) {
            this.videoTrack.stop()
            this.videoTrack = null
        }
	}
}
</script>

<style lang="scss" scoped>
    .user-camera {
        width: px2rem(300);
    }
</style>

