<template>
    <section>
        <el-button @click="changeLang">切换语言</el-button>
        <div>当前语言：{{$i18n.locale == 'en' ? '英文' : '中文'}}</div>
        <div>普通文本：{{$t('helloworld')}}</div>
        <div>
            <el-input v-model="name" type="text" class="j-input"></el-input>
            带参数文本：{{$t('helloman', {name: name})}}</div>
        <div>
            <el-select v-model="iphoneIndex">
                <el-option v-for="iphone in iphoneList" :key="iphone" :value="iphone" :label="iphone"></el-option>
            </el-select>
            多元化：{{$tc('iphones', iphoneIndex, {n: '3台'})}}</div>
    </section>
</template>

<script>
import * as _ from 'underscore';
export default {
    data(){
        return {
            name: '',
            iphoneList: [0, 1, 2],
            iphoneIndex: 0
        }
    },
    methods: {
        changeLang() {
            if (this.$i18n.locale == 'en') {
                this.$i18n.locale = 'zh'
                this.$store.commit('updateLang', 'zh')
            } else {
                this.$i18n.locale = 'en'
                this.$store.commit('updateLang', 'en')
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
