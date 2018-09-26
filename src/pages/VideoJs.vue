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
                myPlayer.src({ type: "rtmp/flv", src: 'rtmp://pull-g.kktv8.com/livekktv/100987038' });
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

