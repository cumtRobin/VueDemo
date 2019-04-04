<template>
    <section>
        <slot-child>
            <template slot-scope="scope">
                <div>{{scope.nickName}}</div>
            </template>
        </slot-child>
    </section>
</template>

<script>
import SlotChild from '@/components/SlotChild';
import FrontProcess from '@/components/FrontProcess';
export default {
    components: {
        SlotChild,
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

<style lang="scss" scoped>

</style>

