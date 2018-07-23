<template>
    <section>
        <img :src="originalUrl">
        <front-process :imgUrl="imgUrl" @changeImg="changeImg"></front-process>
    </section>
</template>

<script>
import * as _ from 'underscore';
import FrontProcess from '@/components/FrontProcess';
export default {
    components: {
        FrontProcess
    },
    data(){
        return {
            originalUrl: require('../assets/images/logo.png'),
            imgUrl: require('../assets/images/logo.png')
        }
    },
    methods: {
        changeImg(url) {
            this.originalUrl = url
        }
    }
}
</script>
