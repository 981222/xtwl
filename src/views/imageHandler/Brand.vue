<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="耐克" :name="this.$GLOBAL.BRAND_NIKE">
<!--            :imageData="'nike' === imageData.name ? imageData : {}" :imageInfo="imageInfo"-->
            <HandlerImg :name="activeName"></HandlerImg>
        </el-tab-pane>
        <el-tab-pane label="阿迪达斯" :name="this.$GLOBAL.BRAND_ADIDAS">
            <HandlerImg :name="activeName"></HandlerImg>
        </el-tab-pane>
        <el-tab-pane label="天马" :name="this.$GLOBAL.BRAND_TIANMA">
            <HandlerImg :name="activeName"></HandlerImg>
        </el-tab-pane>
        <el-tab-pane label="彪马" :name="this.$GLOBAL.BRAND_PUMA">
            <HandlerImg :name="activeName"></HandlerImg>
        </el-tab-pane>
        <el-tab-pane label="匡威" :name="this.$GLOBAL.BRAND_CONVERSE">
            <HandlerImg :name="activeName"></HandlerImg>
        </el-tab-pane>
        <el-tab-pane label="斯凯奇" :name="this.$GLOBAL.BRAND_SKECHERS">
            <HandlerImg :name="activeName"></HandlerImg>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    // import imageItem from "./imageItem";
    import HandlerImg from "./HandlerImg";

    export default {
        data() {
            return {
                activeName: this.$GLOBAL.BRAND_NIKE,
                // imageInfo: this.$store.state.imageInfo,
                // imageData: this.$store.state.imageData,
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
