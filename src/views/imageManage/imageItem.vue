<template>
    <el-row>
        <el-col :span="4" v-for="(data, index) in userImageData.urlList" :key="index" style="margin: 20px">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">

                <img :src="data.imgList[0]" class="image">
                <div style="padding: 10px;">
                    <span>{{ data.name }}</span>
                    <div class="bottom clearfix">
                        <time class="time">图片数量：{{ data.imgList.length }}</time>
                        <el-button type="text" class="button" @click="toRar('AllByName', userImageData, data.name)">下载</el-button>
                        <el-button type="text" class="button" @click="userImageInfo[data.name]['dialogVisible2'] = true">查看</el-button>
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

    export default {
        data() {
            return {
                userImageInfo: {},
                userImageData: {
                    urlList:[]
                }
            };
        },
        components:{ showImage },
        props: {
            name: String,
            // userImageData: Object,
            // userImageInfo: Object,
        },
        created() {
            getUserImage: {
                this.$http.get("/api/my/img").then(res => {
                    if (res.data.code == 1000){
                        this.userImageData['urlList'] = []
                        this.userImageInfo = {}
                        for (var i of res.data.data){
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
                        this.$error(res.data.code,res.data.message)
                    }
                })
            }
        },
        methods: {
            toRar(method,imageList,name){
                // const arrImages = []
                // switch (method) {
                //     case "All":
                //         for(let i of imageList.urlList){
                //             for(let j = 0; j < i.imgList.length; j++){
                //                 arrImages.push({fileUrl: i['imgList'][j], renameFileName: i.name + "_" + (j + 1).toString() + ".jpg"})
                //             }
                //         }
                //         break;
                //     case "Select":
                //         for(let j = 0; j < imageList[name].imageUrls.length; j++){
                //             arrImages.push({fileUrl: imageList[name]['imageUrls'][j], renameFileName: name + "_" + (j + 1).toString() + ".jpg"})
                //         }
                //         break;
                //     case "AllByName":
                //         for(let i of imageList.urlList){
                //             if (i.name === name){
                //                 for(let j = 0; j < i.imgList.length; j++){
                //                     arrImages.push({fileUrl: i['imgList'][j], renameFileName: i.name + "_" + (j + 1).toString() + ".jpg"})
                //                 }
                //             }
                //         }
                //         break;
                // }
                // this.loadingSelect = true
                this.$filesToRar(method, imageList, name)
                // this.loadingSelect = false
            }
        }
    };
</script>

<style scoped>
    .time {
        font-size: 13px;
        color: #999;
    }

    .bottom {
        margin-top: 5px;
        line-height: 35px;
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