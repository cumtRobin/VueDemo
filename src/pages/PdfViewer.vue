<template>
    <section>
        <iframe src="static/pdf/web/viewer.html?file=test.pdf" class="j-frame"></iframe>
    </section>
</template>

<script>
import * as _ from 'underscore';
export default {
    data(){
        return {

        }
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
    .j-frame {
        position: relative;
        width: 100%;
        height: 800px;
        border: none;
    }
</style>

