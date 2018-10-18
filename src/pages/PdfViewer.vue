<template>
    <section>
        <div>获取远程pdf</div>
        <iframe src="static/pdf/web/viewer.html?file=http://172.16.2.237:8097/Web3.0_控件开发包编程指南.pdf" class="j-frame"></iframe>
        <div>获取本地pdf</div>
        <iframe src="static/pdf/web/viewer.html?file=test.pdf&local=true" class="j-frame"></iframe>
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
