<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="耐克" name="nike">
                <imageItem :name="activeName" :userImageData="'nike' === userImageData.name ? userImageData : {}" :userImageInfo="userImageInfo"></imageItem>
            </el-tab-pane>
            <el-tab-pane label="阿迪达斯" name="adidas">
                <imageItem :name="activeName" :userImageData="'adidas' === userImageData.name ? userImageData : {}" :userImageInfo="userImageInfo"></imageItem>
            </el-tab-pane>
            <el-tab-pane label="天马" name="tianma">
                <imageItem :name="activeName" :userImageData="'tianma' === userImageData.name ? userImageData : {}" :userImageInfo="userImageInfo"></imageItem>
            </el-tab-pane>
            <el-tab-pane label="其他" name="other">
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import imageItem from "./imageItem";

    export default {
        data() {
            return {
                activeName: 'nike',
                userImageInfo: this.$store.state.userImageInfo,
                userImageData: this.$store.state.userImageData,
            };
        },
        components:{
            imageItem,
        },
        created() {
        },
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
