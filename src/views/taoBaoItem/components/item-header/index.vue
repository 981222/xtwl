<template>
    <search title="" content="货号名称">
        <el-button type="primary" size="small">图库添加</el-button>
        <el-button type="primary" size="small">本地添加</el-button>
        <el-button type="primary" size="small">自动添加</el-button>
        <el-button type="primary" size="small">表格添加</el-button>
        <div style="display: inherit;position: fixed;right: 40px;">
            <el-button type="primary" size="small">发布商品</el-button>
            <el-button type="danger" size="small">全部删除</el-button>
        </div>
    </search>
</template>

<script>
    import search from "~/components/utils/search";

    export default {
        name: 'itemHeader',
        components:{
            search,
        },
        
    };
</script>

<style scoped>

</style>