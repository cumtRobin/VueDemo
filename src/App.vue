<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
const HTML_FONTSIZE = 100
export default {
  name: 'App',
  mounted() {
    let convertFontSize = window.innerWidth * HTML_FONTSIZE / window.screen.width + 'px'
    $('html').css('fontSize', convertFontSize)
    $(window).on('resize', () => {
      let convertFontSize = window.innerWidth * HTML_FONTSIZE / window.screen.width + 'px'
      $('html').css('fontSize', convertFontSize)
      this.$EventService.emit('WINDOW_RESIZE')
    })
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