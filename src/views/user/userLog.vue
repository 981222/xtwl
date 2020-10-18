<template>
    <div>
        <search :title="title" :content="content"></search>

        <el-row style="display: flex;align-items: center;">
            <el-button type="primary" icon="el-icon-upload" size="small">导出</el-button>
            <el-button type="primary" icon="el-icon-delete-solid" size="small">删除</el-button>
        </el-row>

        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="id"
                    label="日志编号"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="username"
                    label="操作用户"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="sys"
                    label="系统模块"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="操作类型"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="request"
                    label="请求方式"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="操作状态"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="date"
                    label="操作日期"
                    width="120">
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="120">
                <el-link type="primary" :underline="false">详情</el-link>
            </el-table-column>
        </el-table>
<!--        <div style="margin-top: 20px">-->
<!--            <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>-->
<!--            <el-button @click="toggleSelection()">取消选择</el-button>-->
<!--        </div>-->
    </div>
</template>

<script>
    import search from "../../components/utils/search";

    export default {
        data() {
            return {
                title: "操作关键词",
                content: "操作关键词",
                tableData: [{
                    id: 1,
                    username: '王小虎',
                    sys: '图片获取',
                    type: '获取',
                    request: 'get',
                    status: '成功',
                    date: '2016-05-03',
                }],
                multipleSelection: []
            }
        },
        components:{
          search
        },
        methods: {
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }
</script>

<style scoped>

</style>