<template>
    <section>
        <div ref="article"></div>
    </section>
</template>

<script>
import * as _ from 'underscore';
const marked = require('marked')
export default {
    data(){
        return {

        }
    },
    methods: {

    },
    mounted() {
        this.$httpLocal.get('static/markdown/test.md').then(resp => {
            this.$refs.article.innerHTML = marked(resp)
        })
    }
}
</script>

<style lang="scss" scoped>

</style>

