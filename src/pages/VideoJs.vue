<template>
    <section>
        <video class="video-js j-video" ref="h5video"></video>
    </section>
</template>

<script>
import * as _ from 'underscore';
import 'video.js/dist/video-js.css';
import videojs from 'video.js';
require('videojs-flash');
export default {
    data(){
        return {
            player: null
        }
    },
    mounted() {
        this.initVideoJS()
    },
    methods: {
        initVideoJS() {
            videojs.options.flash.swf = 'static/video-js.swf';
            this.player = videojs(this.$refs.h5video, {
                autoplay: true,
                controls: true,
                techOrder: ["flash"],
                preload: 'auto',
            });
            this.player.ready(function() {
                var myPlayer = this;
                // myPlayer.src({ type: "rtmp/flv", src: 'rtmp://172.16.2.96:1935/live/room' });
                // myPlayer.src({ type: "rtmp/flv", src: 'rtmp://172.16.2.237:1935/live/room' });
                // myPlayer.src({ type: "rtmp/flv", src: 'rtmp://mobliestream.c3tv.com:554/live/goodtv.sdp' });
                // myPlayer.src({ type: "rtmp/flv", src: 'rtmp://202.69.69.180:443/webcast/bshdlive-pc' });
                // myPlayer.src({ type: "rtmp/flv", src: 'rtmp://live.chosun.gscdn.com/live/tvchosun1.stream' });
                myPlayer.src({ type: "rtmp/flv", src: 'rtmp://ns8.indexforce.com/home/mystream' });
                // myPlayer.src({ type: "rtmp/flv", src: 'rtmp://media3.sinovision.net:1935/live/livestream' });
                myPlayer.load();
                myPlayer.play();
            });
        }
    },
    beforeDestroy() {
        if (this.player) {
            this.player.dispose()
        }
    }
}
</script>

<style lang="scss" scoped>
    .j-video {
        width: px2rem(1000);
        height: px2rem(750);
    }
</style>

