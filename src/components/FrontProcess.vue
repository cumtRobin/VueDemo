<template>
  <div class="front-process-container" v-loading="loading">
        <img id="original" crossorigin="anonymous" :src="imgUrl" ref="originalImg">
        <div class="slider-wrap">
            <label class="slider-label">亮度</label>
            <el-slider v-model="valueOfBrightness" class="zj-slider" :max="100" :min="-100" @change="drawByParams"></el-slider>
        </div>
        <div class="slider-wrap">
            <label class="slider-label">对比度</label>
            <el-slider v-model="valueOfContrast" class="zj-slider" :max="100" :min="-100" @change="drawByParams"></el-slider>
        </div>
        <div class="slider-wrap">
            <label class="slider-label">色调</label>
            <el-slider v-model="valueOfHue" class="zj-slider" :max="100" :min="-100" @change="drawByParams"></el-slider>
        </div>
        <div class="slider-wrap">
            <label class="slider-label">饱和度</label>
            <el-slider v-model="valueOfSaturation" class="zj-slider" :max="100" :min="-100" @change="drawByParams"></el-slider>
        </div>
        <div class="slider-wrap">
            <label class="slider-label">加噪</label>
            <el-slider v-model="valueOfNoise" class="zj-slider" :max="100" :min="0" @change="drawByParams"></el-slider>
        </div>
        <div class="slider-wrap">
            <label class="slider-label">深褐</label>
            <el-slider v-model="valueOfSepia" class="zj-slider" :max="100" :min="0" @change="drawByParams"></el-slider>
        </div>
        <div class="slider-wrap">
            <label class="slider-label">锐化半径</label>
            <el-slider v-model="usmRadius" class="zj-slider" :max="200" :min="0" @change="drawByParams"></el-slider>
        </div>
        <div class="slider-wrap">
            <label class="slider-label">锐化强度</label>
            <el-slider v-model="usmStrength" class="zj-slider" :max="5" :min="0" :step="0.01" @change="drawByParams"></el-slider>
        </div>
        <el-button class="op-btn" @click="drawByParams('curves')" :class="{active: isCurves}">反显</el-button>
        <el-button class="op-btn" @click="drawByParams('denoise')" :class="{active: isDenoise}">降噪</el-button>
        <el-button class="op-btn" @click="resetImg">恢复原图</el-button>
  </div>
</template>

<script>
import * as _ from 'underscore';
import {fx} from '@/assets/js/glfx.js'
export default {
    data(){
        return {
            valueOfBrightness: 0,
            _canvas: null,
            _texture: null,
            imgElement: null,
            _draw: null,
            originalSrc: '',
            valueOfContrast: 0,
            isCurves: false,
            isDenoise: false,
            valueOfHue: 0,
            valueOfSaturation: 0,
            valueOfNoise: 0,
            valueOfSepia: 0,
            usmRadius: 0,
            usmStrength: 0,
            loading: true,
            opBtn: []
        }
    },
    props: {
        imgUrl: {
            required: true
        }
    },
    methods: {
        drawByParams(operation) {
            this.loading = true
            this.resetProperty()
            let opIndex = _.indexOf(this.opBtn, operation)
            if (opIndex !== -1) {
                this.opBtn.splice(opIndex, 1)
            } else {
                this.opBtn.push(operation)
            }
            this._draw.
                brightnessContrast(this.valueOfBrightness / 100, this.valueOfContrast / 100).
                hueSaturation(this.valueOfHue / 100, this.valueOfSaturation / 100).
                noise(this.valueOfNoise / 100).
                sepia(this.valueOfSepia / 100).
                unsharpMask(this.usmRadius, this.usmStrength);
            if (_.indexOf(this.opBtn, 'curves') !== -1) {
                this.isCurves = true
                this._draw.curves([[0,1], [1,0]], [[0,1], [1,0]], [[0,1], [1,0]])
            } else {
                this.isCurves = false
            }
            if (_.indexOf(this.opBtn, 'denoise') !== -1) {
                this.isDenoise = true
                this._draw.denoise(20)
            } else {
                this.isDenoise = false
            }
            this._draw.update()
            this.$emit('changeImg', this._canvas.toDataURL('image/png'))
            this.loading = false
        },
        getWebGLElements() {
            if (!this._canvas) {
                this._canvas = fx.canvas();
            }

            if (!this.imgElement) {
                this.imgElement = this.$refs.originalImg;
                this.originalSrc = this.imgElement.src;
            }

            if (!this._texture) {
                this._texture = this._canvas.texture(this.imgElement);
            }

            if (!this._draw) {
                this._draw = this._canvas.draw(this._texture)
            }
            this.loading = false
        },
        resetProperty() {
            this._texture.loadContentsOf(this.imgElement)
            this._draw = this._canvas.draw(this._texture)
        },
        resetImg() {
            this.valueOfBrightness = 0
            this.valueOfContrast = 0
            this.valueOfHue = 0
            this.valueOfSaturation = 0
            this.valueOfNoise = 0
            this.valueOfSepia = 0
            this.usmRadius = 0
            this.usmStrength = 0
            this.isCurves = false
            this.isDenoise = false
            this.opBtn = []
            this.resetProperty()
            this._draw.update()
            this.$emit('changeImg', this._canvas.toDataURL('image/png'))
        }
    },
    mounted(){
        this.loading = false
        var img = new Image()
        img.setAttribute('crossOrigin', 'anonymous')
        img.onload = () => {
            this.$nextTick(() => {
                this.getWebGLElements()
            })
        }
        img.src = this.imgUrl
    },
    watch: {
        imgUrl: function(val) {
            if (val) {
                var img = new Image()
                img.setAttribute('crossOrigin', 'anonymous')
                img.onload = () => {
                    this.$nextTick(() => {
                        this.getWebGLElements()
                    })
                }
                img.src = val
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.front-process-container {
    position: relative;
    padding: px2rem(20) px2rem(15);
    #original {
        width: 100%;
        display: none;
    }
    .slider-wrap {
        position: relative;
        height: px2rem(40);
        line-height: px2rem(14);
        .slider-label {
            float: left;
            text-align: left;
            margin-right: px2rem(5);
            letter-spacing: px2rem(-1);
        }
    }
    .el-button.op-btn {
        width:px2rem(78);
        height: px2rem(24);
        line-height: px2rem(24);
        padding: 0;
        margin: 0;
        margin-bottom: px2rem(10);
        margin-right: px2rem(10);
        text-align: center;
        overflow: hidden;
        float: left;
        border-radius: px2rem(1);
        &.active {
            background: red;
        }
    }
}
</style>
