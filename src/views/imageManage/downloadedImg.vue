<template>
    <div>
        <search :title="title" :content="content"></search>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="耐克" :name="this.$GLOBAL.BRAND_NIKE">
                <imageItem :name="this.$GLOBAL.BRAND_NIKE" v-if="this.$GLOBAL.BRAND_NIKE == activeName"></imageItem>
            </el-tab-pane>
            <el-tab-pane label="阿迪达斯" :name="this.$GLOBAL.BRAND_ADIDAS">
                <imageItem :name="this.$GLOBAL.BRAND_ADIDAS" v-if="this.$GLOBAL.BRAND_ADIDAS == activeName"></imageItem>
            </el-tab-pane>
            <el-tab-pane label="天马" :name="this.$GLOBAL.BRAND_TIANMA">
                <imageItem :name="this.$GLOBAL.BRAND_TIANMA" v-if="this.$GLOBAL.BRAND_TIANMA == activeName"></imageItem>
            </el-tab-pane>
            <el-tab-pane label="彪马" :name="this.$GLOBAL.BRAND_PUMA">
                <imageItem :name="this.$GLOBAL.BRAND_PUMA" v-if="this.$GLOBAL.BRAND_PUMA == activeName"></imageItem>
            </el-tab-pane>
            <el-tab-pane label="匡威" :name="this.$GLOBAL.BRAND_CONVERSE">
                <imageItem :name="this.$GLOBAL.BRAND_CONVERSE" v-if="this.$GLOBAL.BRAND_CONVERSE == activeName"></imageItem>
            </el-tab-pane>
            <el-tab-pane label="斯凯奇" :name="this.$GLOBAL.BRAND_SKECHERS">
                <imageItem :name="this.$GLOBAL.BRAND_SKECHERS" v-if="this.$GLOBAL.BRAND_SKECHERS == activeName"></imageItem>
            </el-tab-pane>

        </el-tabs>
    </div>
</template>

<script>
    import imageItem from "./imageItem";
    import search from "../../components/utils/search";

    export default {
        data() {
            return {
                title: "货号名称",
                content: "货号名称",
                activeName: this.$GLOBAL.BRAND_NIKE,
                // userImageInfo: this.$store.state.userImageInfo,
                // userImageData: this.$store.state.userImageData,
            };
        },
        components:{
            imageItem,
            search,
        },
        created() {
        },
        methods: {
            handleClick(tab, event) {
                // console.log(tab.$options.propsData.name);
            }
        }
    }
</script>

<style scoped>
    /deep/ .is-active {
        pointer-events: none;
    }
</style>
