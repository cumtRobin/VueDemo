<template>
    <section>
        <iframe :src="`static/pdf/web/viewer.html?file=http://172.16.2.237:8097/Web3.0_控件开发包编程指南.pdf`" class="j-frame"></iframe>
    </section>
</template>

<script>
export default {
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

