<template>
    <section>
        <div id="bigContaniner" class="big-img-wrap">
            <img id="bigImg" src="../assets/images/logo.png">
        </div>
        <div id="smallContaniner" class="small-img-wrap">
            <img id="smallImg" src="../assets/images/logo.png">
            <div id="mirror" class="mirror"></div>
        </div>
    </section>
</template>

<script>
import '../assets/js/magnifier'
export default {
    mounted() {
        var img = new Image()
        img.onload = () => {
            var options = {
                bigContainer: $('#bigContaniner'),
                bigImg: $('#bigImg'),
                smallContainer: $('#smallContaniner'),
                smallImg: $('#smallImg'),
                mirror: $('#mirror')
            }
            $.magnifier(options);
        }
        img.src = require('../assets/images/logo.png')
    }
}
</script>

<style lang="scss" scoped>
    .big-img-wrap {
        position: relative;
        width: 800px;
        height: 600px;
        overflow: hidden;
        #bigImg {
            position: relative;
            width: 100%;
        }
    }
    .small-img-wrap {
        position: relative;
        width: 400px;
        #smallImg {
            position: relative;
            width: 100%;
        }
        .mirror {
            display: none;
            position: absolute;
            width: 100px;
            top: 0;
            left: 0;
            background: rgba(0,0,0,0.5);
        }
    }
</style>

