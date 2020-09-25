<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="耐克" name="nike">
            <HandlerImg :name="activeName" :imageData="'nike' === imageData.name ? imageData : {}" :imageInfo="imageInfo"></HandlerImg>
        </el-tab-pane>
        <el-tab-pane label="阿迪达斯" name="adidas">
            <HandlerImg :name="activeName" :imageData="'adidas' === imageData.name ? imageData : {}" :imageInfo="imageInfo"></HandlerImg>
        </el-tab-pane>
        <el-tab-pane label="天马" name="tianma">
            <HandlerImg :name="activeName" :imageData="'tianma' === imageData.name ? imageData : {}" :imageInfo="imageInfo"></HandlerImg>
        </el-tab-pane>
        <el-tab-pane label="彪马" name="puma">
            <HandlerImg :name="activeName" :imageData="'puma' === imageData.name ? imageData : {}" :imageInfo="imageInfo"></HandlerImg>
        </el-tab-pane>
        <el-tab-pane label="匡威" name="converse">
            <HandlerImg :name="activeName" :imageData="'converse' === imageData.name ? imageData : {}" :imageInfo="imageInfo"></HandlerImg>
        </el-tab-pane>
        <el-tab-pane label="斯凯奇" name="skechers">
            <HandlerImg :name="activeName" :imageData="'skechers' === imageData.name ? imageData : {}" :imageInfo="imageInfo"></HandlerImg>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    // import imageItem from "./imageItem";
    import HandlerImg from "./HandlerImg";

    export default {
        data() {
            return {
                activeName: 'nike',
                imageInfo: this.$store.state.imageInfo,
                imageData: this.$store.state.imageData,
            };
        },
        components:{ HandlerImg },
        methods: {
            handleClick(tab, event) {
                // console.log(tab, event);
            }
        }
    }
</script>

<style scoped>
    /deep/ .is-active {
        pointer-events: none;
    }
</style>
