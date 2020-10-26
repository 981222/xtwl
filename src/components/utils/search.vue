<template>
    <el-form :inline="true" :model="search" class="demo-form-inline">
        <el-form-item :label="title">
            <el-input v-model="search.articleno" :placeholder="content" size="small"></el-input>
        </el-form-item>
<!--        <el-form-item label="品牌">-->
<!--            <el-select v-model="search.brand" placeholder="品牌选择">>-->
<!--                <el-option label="不限" value="all"></el-option>-->
<!--                <el-option label="耐克" value="nike"></el-option>-->
<!--                <el-option label="阿迪达斯" value="adidas"></el-option>-->
<!--            </el-select>-->
<!--        </el-form-item>-->
        <el-form-item>
            <el-button type="primary" @click="searchForArticleno" icon="el-icon-search" size="small">搜索</el-button>
            <slot></slot>
        </el-form-item>
    </el-form>
</template>

<script>
    import bus from "../../utils/bus";

    export default {
        data() {
            return {
                search: {
                    articleno: '',
                    // brand: 'all'
                },
            }
        },
        props: {
            title: String,
            content: String,
        },
        methods: {
            searchForArticleno() {
                bus.$emit("search", this.search.articleno)
            },
        }
    };
</script>

<style scoped>

</style>