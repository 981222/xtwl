<template>
    <div>
        <search ></search>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="耐克" :name="this.$GLOBAL.BRAND_NIKE">
                <imageItem :name="this.$GLOBAL.BRAND_NIKE" v-if="this.$GLOBAL.BRAND_NIKE == activeName"></imageItem>
            </el-tab-pane>
            <el-tab-pane label="阿迪达斯" :name="this.$GLOBAL.BRAND_ADIDAS">
                <imageItem :name="this.$GLOBAL.BRAND_ADIDAS" v-if="this.$GLOBAL.BRAND_ADIDAS == activeName"></imageItem>
            </el-tab-pane>
<!--            <el-tab-pane label="天马" name="tianma">-->
<!--                <imageItem :name="activeName"></imageItem>-->
<!--            </el-tab-pane>-->
<!--            <el-tab-pane label="其他" name="other">-->
<!--            </el-tab-pane>-->

        </el-tabs>
    </div>
</template>

<script>
    import imageItem from "./imageItem";
    import search from "../../components/utils/search";

    export default {
        data() {
            return {
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
