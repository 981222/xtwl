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
                        <el-button type="primary" @click="toRar('SelectByName', imageInfo, data.name)">下载已选图片</el-button>
                        <el-button type="primary" @click="imageHandler(data.name)">开始拼图</el-button>
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
<!--                                    <svg width="24" height="24" t="1601017752197" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1149"><path d="M0 640.9C94.2 584.7 188.4 528.5 282.6 472.2c45.5 87.1 91.2 174.4 136.7 261.5 0.1 0.1 118.7-250.8 222.1-389.5C751.3 196.7 842.9 86.4 993.7 27c-16.3 46.4-20.8 89.6-20.8 162 2.6 57.5 13.3 112.7 50.7 199.5-72.7 33.5-140.7 76.2-175.6 106.3-48.3 41.7-92.5 89.6-136.8 136C611.3 745 559.6 810 437 996.5c-90.9-109.9-115.3-132.2-186.3-194.1C164.8 727.6 116.6 697.6 0 640.9z m0 0" p-id="1150"></path></svg>-->
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
                        <el-button @click="imageInfo[data.name]['dialogVisible'] = false">关 闭</el-button>
                    </span>
                </el-dialog>
            </el-form>
        </div>
    </div>
</template>

<script>
    import '../../assets/icon/iconfont.css'

    export default {
        props: {
            imageInfo: Object,
            imageData: Object,
        },
        data(){
          return {
              loadingSelect: false,
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
                // 拼图
                // console.log(this.imageInfo[name]);
                alert('开始拼图')
                // this.$http.get('').then(res => {
                // })
            },
            checkbox(data){
                console.log(data)
            },
            toRar(method,imageList,name){
                // this.loadingSelect = true
                this.$filesToRar(method, imageList, name)
                // this.loadingSelect = false
            }
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