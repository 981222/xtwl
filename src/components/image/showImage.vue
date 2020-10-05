<template>
    <div>
        <div class="demo-image__lazy" v-for="(data, i) in imageData.urlList" :key="i"style=" background-color: #fff;box-shadow: rgb(0, 0, 0) 0px 0px 10px -7px;border-radius: 4px;margin-bottom: 20px;float: left;width: 100%;">
            <el-form ref="form" :model="imageInfo" label-width="50px">
                <div class="name-bottom">

                    <h1 style="margin-left: 40px;display: table;padding: 8px;">{{ data.name }}</h1>
                    <el-form-item>
                        <el-checkbox
                                style="margin-right: 10px"
                                :indeterminate="imageInfo[data.name]['isIndeterminate']"
                                v-model="imageInfo[data.name]['checkAll']"
                                @change="(val) => handleCheckAllChange(val, data)"
                                border>全选 {{ imageInfo[data.name].imageUrls.length }}/{{ data.imgList.length }}</el-checkbox>
                        <el-button type="primary" @click="toRar('SelectByName', imageInfo, data.name)" :loading="loadingSelect">{{ loadingSelect ? '正在下载...':'下载已选图片' }}</el-button>
                        <el-button type="primary" @click="imageHandler(data.name)" :loading="loadingPuzzle">
                            开始拼图
                            <el-popover
                                    effect="light"
                                    placement="top"
                                    title="提示"
                                    width="200"
                                    trigger="hover"
                                    content="目前拼图功能仅提供偶数数量图片的拼图功能.">
                                <i slot="reference" class="el-icon-question" style="color: black!important;"></i>
                            </el-popover>
                        </el-button>

                        <el-button type="primary" @click="imageInfo[data.name]['dialogVisible'] = true">预览效果</el-button>
                    </el-form-item>
                </div>

                <div>
                    <el-checkbox-group fill="#fff" class="imageList" v-model="imageInfo[data.name]['imageUrls']" @change="(value) => handleCheckedCitiesChange(value, data)">
                        <el-checkbox v-for="(url, index) in data.imgList" :label="url" :key="index">
                            <div>
                                <img class="image":key="index" :src="url">
                                <div class="checkboxIcon">
                                    <i class="iconfont icon-xuanzhong"></i>
                                </div>
                            </div>
                        </el-checkbox>
                    </el-checkbox-group>
                </div>

                <!--图片预览-->
                <el-dialog title="预览图" :visible.sync="imageInfo[data.name]['dialogVisible']" width="60%" append-to-body>
                    <div style="display: flex;flex-wrap: wrap;align-content: space-between;">
                        <img v-for="(url, i) in imageInfo[data.name]['imageUrls']" class="imagePreview" :key="i" :src="url">
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="imageHandler(data.name)" :loading="loadingPuzzle">
                            开始拼图
                            <el-popover
                                    placement="top"
                                    title="提示"
                                    width="200"
                                    trigger="hover"
                                    content="目前拼图功能仅提供偶数数量图片的拼图功能.">
                                <i slot="reference" class="el-icon-question" style="color: black!important;"></i>
                            </el-popover>
                        </el-button>
                        <el-button @click="imageInfo[data.name]['dialogVisible'] = false">关 闭</el-button>
                    </span>
                </el-dialog>
            </el-form>
        </div>
    </div>
</template>

<script>
    import '../../assets/icon/iconfont.css'
    import download from 'downloadjs'

    export default {
        props: {
            name: String,
            imageInfo: Object,
            imageData: Object,
        },
        data(){
          return {
              loadingSelect: false,
              loadingPuzzle: false,
          }
        },
        methods: {
            handleCheckAllChange(val, data) {
                this.imageInfo[data.name]['imageUrls'] = val ? data.imgList : [];
                this.imageInfo[data.name]['isIndeterminate'] = false;
            },
            handleCheckedCitiesChange(value, data) {
                let checkedCount = value.length;
                this.imageInfo[data.name]['checkAll'] = checkedCount === data.imgList.length;
                this.imageInfo[data.name]['isIndeterminate'] = checkedCount > 0 && checkedCount < data.imgList.length;
            },
            imageHandler(name) {
                if (this.imageInfo[name]['imageUrls'].length % 2 != 0){
                    this.$Message('目前拼图功能仅支持2,4,6等等双数的图片数量')
                    return;
                }
                this.loadingPuzzle = true
                this.$Message('正在拼图,请稍等...')
                this.$http.post(
                    '/api/img/puzzle',
                    {
                        'params': {
                            "articleno": name,
                            "ids": this.imageInfo[name]['imageUrls'],
                            "type": this.name
                        }
                    }).then(res => {
                    if (res.data.result.code == 1000){
                        this.$Message.success('拼图成功')
                        this.loadingPuzzle = false
                        for (let i of this.imageData.urlList) {
                            if (i.name == name) i.imgList.pushHead("http://www.xiongzhijiongtu.com:8080/api/image/" + res.data.result.data)
                        }
                        download("http://www.xiongzhijiongtu.com:8080/api/image/" + res.data.result.data, name + '.jpg', 'image/jpeg')
                    }else{
                        this.loadingPuzzle = false
                        this.$error(res.data.result.code,res.data.result.message)
                    }
                })
            },
            evol(){
                this.loadingSelect = false
            },
            toRar(method,imageList,name){
                this.loadingSelect = true
                this.$filesToRar(method, imageList, name, this.evol)
                // this.loadingSelect = false
            },
        }
    };
</script>

<style scoped>
    .imageList /deep/ .el-checkbox__input {
        /*position: absolute!important;*/
        /*right: 10px!important;*/
        /*zoom: 2!important;*/
        display: none;
    }
    .el-checkbox {
        margin-right: 0px;
    }

    .checkboxIcon {
        font-size: 30px;
        position: absolute;
        right: 15px;
        bottom: 15px;
    }

    .name-bottom {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        margin-right: 50px;
    }

    .imageList {
        /*float: left;*/
        /*width: 300px;*/
        margin-bottom: 20px;
        display: flex;
        /*justify-content: center;*/
        align-items: center;
        flex-flow: wrap;
    }

    .imagePreview {
        width: 50%
    }

    .image {
        width: 300px;
        border-radius: 4px;
        /*box-shadow: 0px 0px 3px #808080;*/
        margin: 5px;
        transition: all 100ms linear 0ms;
    }

    .image:hover {
        filter: brightness(88%);
    }

</style>