<template>
    <el-row>
        <el-row style="display: flex;align-items: center;">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" border style="margin-right: 10px"  size="small">全选</el-checkbox>
            <el-button type="primary" icon="el-icon-circle-plus" size="small" @click="dialogVisible = true">新增</el-button>
            <el-button type="primary" icon="el-icon-download" size="small" @click="toRar('SelectByListName', userImageData, listName)" :loading="loadingSelect">下载</el-button>
            <el-button type="primary" icon="el-icon-delete-solid" size="small" @click="deleteImage(listName)">删除</el-button>
        </el-row>

        <el-checkbox-group v-model="listName" @change="handleCheckedCitiesChange">
            <el-col :span="4" v-for="(data, index) in userImageData.urlList" :key="index" style="margin: 20px 20px 20px 0px">
                <el-card shadow="hover" :body-style="{ padding: '0px' }">

                    <img :src="data.imgList[0]" class="image">
                    <div style="padding: 10px;">
                        <span>{{ data.name }}</span>
                        <div class="bottom clearfix">
                            <time class="time">图片数量：{{ data.imgList.length }}</time>
                            <div style="display: flex;justify-content: space-between;">
                                <div style="display: flex;">
                                    <el-button type="text" class="button" @click="userImageInfo[data.name]['dialogVisible2'] = true">查看</el-button>
                                    <el-button type="text" class="button" @click="toRar('AllByName', userImageData, data.name)">下载</el-button>
                                    <el-button type="text" class="button" @click="deleteImage(data.name)">删除</el-button>
                                </div>
                                <el-checkbox :label="data.name" :key="data.name">勾选</el-checkbox>
                            </div>
                        </div>
                    </div>

                    <!--图片预览-->
                    <el-dialog title="查看图片" :visible.sync="userImageInfo[data.name]['dialogVisible2']" width="80%" append-to-body>
                        <showImage :imageData="{urlList: [data]}" :name="name" :imageInfo="userImageInfo"></showImage>
                        <span slot="footer" class="dialog-footer">
                                <el-button @click="userImageInfo[data.name]['dialogVisible2'] = false">关 闭</el-button>
                        </span>
                    </el-dialog>

                </el-card>
            </el-col>
        </el-checkbox-group>

        <!--下载-->
        <el-dialog title="下载图片" :visible.sync="dialogVisible" width="80%" append-to-body>
            <Brand :imageData="{urlList: [data]}" :name="name" :imageInfo="userImageInfo"></Brand>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">关 闭</el-button>
            </span>
        </el-dialog>
    </el-row>
</template>

<script>
    import showImage from "../../components/image/showImage";
    import Brand from "../imageHandler/Brand";
    import bus from "../../utils/bus";

    export default {
        data() {
            return {
                dialogVisible: false,
                loadingSelect: false,
                checkAll: false,
                listName: [],
                isIndeterminate: false,
                userImageInfo: {},
                userImageData: { urlList:[] }
            };
        },
        components:{ showImage,Brand },
        props: {
            name: String,
            // userImageData: Object,
            // userImageInfo: Object,
        },
        created() {
            this.getUserImage(this.name)
            bus.$off('search')
        },
        methods: {
            handleCheckAllChange(val) {
                let names = []
                for (let i in this.userImageInfo){
                    names.push(i)
                }
                this.listName = val ? names : [];
                this.isIndeterminate = false;
            },

            handleCheckedCitiesChange(value) {
                let names = []
                for (let i in this.userImageInfo){
                    names.push(i)
                }
                let checkedCount = value.length;
                this.checkAll = checkedCount === names.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < names.length;
            },

            evol(method){
                this.loadingSelect = false
            },

            toRar(method,imageList,name){
                this.loadingSelect = true
                this.$filesToRar(method, imageList, name, this.evol)
            },

            deleteImage(name){
                const names = typeof(name) == "string" ? [name] : name
                this.$http.post(
                    "/api/delete/img",
                    {
                        'params': {
                            'articleno': names,
                        }
                    }).then(res => {
                        if (res.data.result.code == 1000){
                            this.$Message.success("删除成功!")
                            for (let x of names){
                                for (var i = 0; i < this.userImageData.urlList.length; i++){
                                    if(this.userImageData.urlList[i].name == x){
                                        this.userImageData.urlList.splice(i,1)
                                    }
                                }
                            }
                        }else{
                            this.$error(res.data.result.code, res.data.result.message)
                        }
                })
            },

            getUserImage() {
                this.$http.post(
                    "/api/my/img",
                    {
                        'params': {
                            'type': this.name,
                        }
                    }).then(res => {
                    if (res.data.result.code == 1000){
                        this.userImageData['urlList'] = []
                        this.userImageInfo = {}
                        for (var i of res.data.result.data){
                            const data = {}
                            this.$set(this.userImageInfo, i['jt_articleno'], {
                                checkAll: false,
                                isIndeterminate: false,
                                dialogVisible: false,
                                dialogVisible2: false,
                                imageUrls: [],
                            })
                            data['name'] = i['jt_articleno']
                            const ids = []
                            for (var id of i['img_ids']){
                                ids.push("http://www.xiongzhijiongtu.com:8080/api/image/" + id.toString())
                            }
                            data['imgList'] = ids
                            this.userImageData['urlList'].push(data)
                        }
                    }else{
                        this.$error(res.data.result.code,res.data.result.message)
                    }
                })
            },
        },

        mounted() {
            bus.$on("search", articleno => {
                this.$http.post(
                    "/api/my/img_search",
                    {
                        'params': {
                            'articleno': articleno.trim().toUpperCase(),
                        }
                    }).then(res => {
                    if (res.data.result.code == 1000){
                        this.userImageData['urlList'] = []
                        this.userImageInfo = {}
                        for (var i of res.data.result.data){
                            const data = {}
                            this.$set(this.userImageInfo, i['jt_articleno'], {
                                checkAll: false,
                                isIndeterminate: false,
                                dialogVisible: false,
                                dialogVisible2: false,
                                imageUrls: [],
                            })
                            data['name'] = i['jt_articleno']
                            const ids = []
                            for (var id of i['img_ids']){
                                ids.push("http://www.xiongzhijiongtu.com:8080/api/image/" + id.toString())
                            }
                            data['imgList'] = ids
                            this.userImageData['urlList'].push(data)
                        }
                        // console.log(this.userImageData)
                        // console.log(this.userImageInfo)
                    }else{
                        this.$error(res.data.result.code,res.data.result.message)
                    }
                })
            })
        }
    };
</script>

<style scoped>
    .time {
        font-size: 13px;
        color: #999;
    }

    .bottom {
        line-height: 30px;
    }

    /deep/ .el-checkbox-group{
        font-size: 16px;
    }
    .button {
        padding: 0;
        float: right;
    }

    .image {
        width: 100%;
        display: block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
</style>