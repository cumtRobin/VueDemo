<template>
  <div id="app">
    <el-button @click="backToHomePage" v-show="$route.path !== '/'">返回首页</el-button>
    <router-view/>
  </div>
</template>

<script>
const HTML_FONTSIZE = 100
const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 1080
export default {
  name: 'App',
  data() {
    return {
      bigImgUrl: '',
      showImgBox: false
    }
  },
  mounted() {
    this.convertHtmlFontSize()
    $(window).on('resize', () => {
      this.convertHtmlFontSize()
      this.$EventService.emit('WINDOW_RESIZE')
    })
    this.$EventService.on('SHOW_IMG_BOX', url => {
			this.bigImgUrl = url
			this.showImgBox = true
		})
  },
  methods: {
    convertHtmlFontSize() {
      let convertFontSize = Math.sqrt(Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2)) * HTML_FONTSIZE / Math.sqrt(Math.pow(DESIGN_WIDTH, 2) + Math.pow(DESIGN_HEIGHT, 2)) + 'px'
      $('html').css('fontSize', convertFontSize)
    },
    backToHomePage() {
      this.$router.push('/')
    }
  },
  beforeDestroy() {
    $(window).off('resize')
  }
}
</script>

<style <style lang="scss" scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: px2rem(60);
  }
</style>