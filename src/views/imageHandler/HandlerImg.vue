<template>
    <div style="border-radius: 4px;box-shadow: rgb(0, 0, 0) 0px 0px 10px -7px;">
        <div style="margin-bottom: 20px;padding: 20px;">
            <el-form ref="form" :model="form" label-width="80px"  :rules="rules" @submit.native.prevent>
                <el-form-item prop="name" label="输入货号">
                    <el-popover
                            placement="top-start"
                            title=""
                            width="400"
                            trigger="hover"
                            content="请输入完整货号，货号之间使用空格间隔，为了保证速度每次请求只能接收最多5个货号。">
                        <i slot="reference" class="el-icon-question"></i>
                    </el-popover>
                    <el-input style="width: 80%;margin-left: 10px" v-model="form.name" placeholder="请输入货号" @keyup.enter.native="loading"></el-input>
                </el-form-item>
                <el-form-item label="选择通道">
                    <el-radio-group v-model="form.resource">
                        <el-radio label="通道一"></el-radio>
<!--                        <el-radio label="通道二"></el-radio>-->
<!--                        <el-radio label="通道三"></el-radio>-->
                    </el-radio-group>
                </el-form-item>
                <p><b style="margin: 12px;color: red">警告：请勿使用官网广告宣传图片，有高投诉风险！！！</b></p>
                <p><b style="margin: 12px;color: red">下载说明：如出现下载数据包无法解压问题可尝试清理浏览器缓存。</b></p>
                <el-form-item style="margin-top: 15px">
                    <el-button type="success" @click="loading" :loading="handlerLoading">{{ handlerLoading ? '正在获取,耗时' + downImgTime.toString() + 's':'立即创建'}}</el-button>
                    <el-button type="primary" @click="toRar('Select', imageInfo)" :loading="loadingSelect">
                        {{ loadingSelect ? '正在下载...':'下载已选图片'}}
                        <el-popover
                                placement="top"
                                width="100"
                                trigger="hover"
                                content="下载目前页面已选图片.">
                            <i slot="reference" class="el-icon-question" style="color: black!important;"></i>
                        </el-popover>
                    </el-button>
                    <el-button type="primary" @click="toRar('All', imageData)" :loading="loadingAll">
                        {{ loadingAll ? '正在下载...':'下载全部图片'}}
                        <el-popover
                                placement="top"
                                width="100"
                                trigger="hover"
                                content="下载目前页面全部图片.">
                            <i slot="reference" class="el-icon-question" style="color: black!important;"></i>
                        </el-popover>
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <showImage :imageInfo="imageInfo" :imageData="imageData" :name="this.name"></showImage>
    </div>
</template>`

<script>
    import showImage from "../../components/image/showImage";
    import JSZip from "jszip";
    import FileSaver from "file-saver";

    export default {
        data() {
            var validateName = (rule, value, callback) => {
                let alist = value.split(' ')
                let count = []
                for(var i = 0; i < alist.length; i++){
                    if(alist[i] == ''){
                        continue
                    }
                    count.push(alist[i])
                }
                if (value === '') {
                    callback(new Error('请输入货号'));
                } else if (count.length > 5){
                    callback(new Error('输入货号过多,请缩减至5个以内'));
                } else {
                    callback();
                }
            };
            return {
                handlerLoading: false,
                loadingSelect: false,
                loadingAll: false,
                setIme: '',
                downImgTime: 1,
                form: {
                    name: '',
                    resource: '通道一'
                },
                rules: {
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                },
                arrImages: [],
                imageData: {name: this.name, urlList: [],},
                imageInfo: {},
            }
        },
        props: {
            name: String,
            // imageData: Object,
            // imageInfo: Object,
        },
        components:{
            showImage,
        },
        methods: {
            loading() {
                this.$refs["form"].validate((valid) => {
                    if (valid) {
                        this.handlerLoading = true;
                        this.setIme = setInterval(() => {
                            this.downImgTime++;
                        }, 1000);
                        this.getImageUrl()
                    } else {
                        // console.log('error submit!!');
                        return false;
                    }
                });
            },
            getImageUrl() {
                // 获取图片
                const brand = this.name
                const method = this.form['resource']
                const articlenos = this.form['name'].trim().toUpperCase()
                switch (brand) {
                    case this.$GLOBAL.BRAND_NIKE:
                        this.getImage(articlenos, this.$GLOBAL.BRAND_NIKE)
                        break
                    case this.$GLOBAL.BRAND_ADIDAS:
                        this.getImage(articlenos, this.$GLOBAL.BRAND_ADIDAS)
                        break
                    case this.$GLOBAL.BRAND_CONVERSE:
                        this.getImage(articlenos, this.$GLOBAL.BRAND_CONVERSE)
                        break
                    case this.$GLOBAL.BRAND_SKECHERS:
                        this.getImage(articlenos, this.$GLOBAL.BRAND_SKECHERS)
                        break
                    case this.$GLOBAL.BRAND_PUMA:
                        window.clearInterval(this.setIme);
                        this.handlerLoading = false;
                        alert("彪马下载通道尚未开启!")
                        break
                    case this.$GLOBAL.BRAND_TIANMA:
                        window.clearInterval(this.setIme);
                        this.handlerLoading = false;
                        alert("天马下载通道尚未开启!")
                        break
                }
            },
            evol(method){
                if (method.indexOf('All') == 0){
                    this.loadingAll = false
                }else{
                    this.loadingSelect = false
                }
            },
            toRar(method, imageList, name){
                if (method.indexOf('All') == 0){
                    this.loadingAll = true
                }else{
                    this.loadingSelect = true
                }
                this.$filesToRar(method, imageList, name, this.evol)
            },
            getImage(articlenos, brand) {
                this.$http.post(
                    "/api/" + brand,
                    {
                        'params': {
                            'articleno': articlenos,
                        }
                    })
                    .then(res => {
                        if(res.data.result.code == 1000) {
                            this.imageData['urlList'] = []
                            this.imageInfo = {}
                            for (var i of res.data.result.data){
                                const data = {}
                                for (var j in i){
                                    this.$set(this.imageInfo, i[j]['articleno'], {
                                        checkAll: false,
                                        isIndeterminate: false,
                                        dialogVisible: false,
                                        dialogVisible2: false,
                                        imageUrls: [],
                                    })
                                    data['name'] = i[j]['articleno']
                                    const ids = []
                                    for (var id of i[j]['ids']){
                                        ids.push("http://www.xiongzhijiongtu.com:8080/api/image/" + id.toString())
                                    }
                                    data['imgList'] = ids
                                    if (ids.length == 0){
                                        this.$message.error('货号' + i[j]['articleno'] + '不存在图片!请更换线路获取!')
                                    } else {
                                        this.$Message.success('货号' + i[j]['articleno'] + '图片获取成功!')
                                    }
                                    this.imageData['urlList'].push(data)
                                }
                            }
                            window.clearInterval(this.setIme);
                            this.handlerLoading = false;
                        }else{
                            this.$error(res.data.result.code,res.data.result.message)
                            window.clearInterval(this.setIme);
                            this.handlerLoading = false;
                        }
                    })
            },

        }
    }
</script>

<style scoped>

</style>