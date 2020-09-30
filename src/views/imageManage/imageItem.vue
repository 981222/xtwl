<template>
    <el-row>
        <el-col :span="4" v-for="(data, index) in userImageData.urlList" :key="index" style="margin: 20px">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">

                <img :src="data.imgList[0]" class="image">
                <div style="padding: 10px;">
                    <span>{{ data.name }}</span>
                    <div class="bottom clearfix">
                        <time class="time">图片数量：{{ data.imgList.length }}</time>
                        <div style="display: flex;">
                            <el-button type="text" class="button" @click="userImageInfo[data.name]['dialogVisible2'] = true">查看</el-button>
                            <el-button type="text" class="button" @click="toRar('AllByName', userImageData, data.name)">下载</el-button>
                            <el-button type="text" class="button" @click="deleteImage(data.name)">删除</el-button>
                        </div>
                    </div>
                </div>

                <!--图片预览-->
                <el-dialog title="查看图片" :visible.sync="userImageInfo[data.name]['dialogVisible2']" width="80%" append-to-body>
                    <showImage :imageData="{urlList: [data]}" :imageInfo="userImageInfo"></showImage>
                    <span slot="footer" class="dialog-footer">
                            <el-button @click="userImageInfo[data.name]['dialogVisible2'] = false">关 闭</el-button>
                    </span>
                </el-dialog>
            </el-card>
        </el-col>


    </el-row>
</template>

<script>
    import showImage from "../../components/image/showImage";
    import bus from "../../utils/bus";

    export default {
        data() {
            return {
                userImageInfo: {},
                userImageData: { urlList:[] }
            };
        },
        components:{ showImage },
        props: {
            name: String,
            // userImageData: Object,
            // userImageInfo: Object,
        },
        created() {
            this.getUserImage(this.name)
        },
        methods: {
            toRar(method,imageList,name){
                this.$filesToRar(method, imageList, name)
            },
            deleteImage(name){
                this.$http.post(
                    "/api/delete/img",
                    {
                        'params': {
                            'articleno': [name],
                        }
                    }).then(res => {
                        if (res.data.result.code == 1000){
                            this.$Message.success("删除成功!")
                            for (var i of this.userImageData.urlList){
                                console.log(i)
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
                        // console.log(this.userImageData)
                        // console.log(this.userImageInfo)
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
                            'articleno': articleno,
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