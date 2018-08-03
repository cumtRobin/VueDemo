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
        this.$getStatic('static/markdown/test.md').then(resp => {
            console.log(resp)
            this.$refs.article.innerHTML = marked(resp.data)
        })
    }
}
</script>

<style lang="scss" scoped>

</style>

