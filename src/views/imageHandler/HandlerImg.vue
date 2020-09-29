<template>
    <div style="border-radius: 4px;box-shadow: rgb(0, 0, 0) 0px 0px 10px -7px;">
        <div style="margin-bottom: 20px;padding: 20px;">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="输入货号">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="选择通道">
                    <el-radio-group v-model="form.resource">
                        <el-radio label="通道一"></el-radio>
<!--                        <el-radio label="通道二"></el-radio>-->
<!--                        <el-radio label="通道三"></el-radio>-->
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="getImageUrl">立即创建</el-button>
                    <el-button type="primary" @click="filesToRar('Select')" :loading="loadingSelect">{{ loadingSelect ? '下载中,耗时' + downImgTime.toString() + 's':'下载已选择图片'}}</el-button>
                    <el-button type="primary" @click="toRar('All')" :loading="loadingAll">{{ loadingAll ? '下载中,耗时' + downImgTime.toString() + 's':'下载全部图片'}}</el-button>
                </el-form-item>
            </el-form>
        </div>
        <showImage :imageInfo="imageInfo" :imageData="imageData" ></showImage>
    </div>
</template>`

<script>
    import showImage from "../../components/image/showImage";
    import JSZip from "jszip";
    import FileSaver from "file-saver";

    export default {
        data() {
            return {
                form: {
                    name: '',
                    resource: '通道一'
                },
                arrImages: [],
                loadingSelect: false,
                loadingAll: false,
                downImgTime: 1,
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
            getImageUrl() {
                // 获取图片
                const brand = this.name
                const method = this.form['resource']
                switch (brand) {
                    case 'nike':
                        alert("耐克下载通道尚未开启!")
                        break
                    case 'adidas':
                        const articlenos = this.form['name']
                        this.getAdidasImage(articlenos)
                        break
                    case 'tianma':
                        alert("天马下载通道尚未开启!")
                        break
                    case 'puma':
                        alert("彪马下载通道尚未开启!")
                        break
                    case 'converse':
                        alert("匡威下载通道尚未开启!")
                        break
                    case 'skechers':
                        alert("斯凯奇下载通道尚未开启!")
                        break
                }
            },
            toRar(method){
                this.loadingAll = true
                this.$filesToRar(method, imageData = this.imageData)
                this.loadingAll = false
            },

            filesToRar(method) {
                let filename = new Date();
                let month =filename.getMonth() < 9 ? "0" + (filename.getMonth() + 1) : filename.getMonth() + 1;
                let date = filename.getDate() <= 9 ? "0" + filename.getDate() : filename.getDate();
                filename = filename.getFullYear() + month + date + filename.getHours() + filename.getMinutes() + filename.getSeconds();

                let _this = this;
                _this.arrImages = []
                _this.downImgTime = 1
                let zip = new JSZip();
                let cache = {};
                let promises = [];
                switch (method) {
                    case "All":
                        _this.loadingAll = true
                        for(let i of _this.imageData.urlList){
                            for(let j = 0; j < i.imgList.length; j++){
                                _this.arrImages.push({fileUrl: i['imgList'][j], renameFileName: i.name + "_" + (j + 1).toString() + ".jpg"})
                            }
                        }
                        break;
                    case "Select":
                        _this.loadingSelect = true
                        for(let i in _this.imageInfo){
                            for(let j = 0; j < _this.imageInfo[i].imageUrls.length; j++){
                                _this.arrImages.push({fileUrl: _this.imageInfo[i]['imageUrls'][j], renameFileName: i + "_" + (j + 1).toString() + ".jpg"})
                            }
                        }
                        break;
                }
                if (_this.arrImages.length == 0){
                    this.$notify.info({
                        title: '下载提示',
                        message: '请选择图片进行下载!'
                    });
                    return;
                }
                var setIme = setInterval(() => {
                    _this.downImgTime++;
                }, 1000);

                for (let item of _this.arrImages) {
                    const promise = _this.getImgArrayBuffer(item.fileUrl).then(data => {
                        // 下载文件, 并存成ArrayBuffer对象(blob)
                        zip.file(item.renameFileName, data, { binary: true }); // 逐个添加文件
                        cache[item.renameFileName] = data;
                    });
                    promises.push(promise);
                }
                Promise.all(promises)
                    .then(() => {
                        zip.generateAsync({ type: "blob" }).then(content => {
                            // 生成二进制流
                            FileSaver.saveAs(content, filename); // 利用file-saver保存文件  自定义文件名
                            this.$notify.close();
                            this.$notify({
                                title: '成功',
                                message: '这是一条成功的提示消息',
                                type: 'success'
                            });
                            _this.loadingSelect = false
                            _this.loadingAll = false
                            window.clearInterval(setIme);
                        });
                    })
                    .catch(res => {
                        this.$notify.error({
                            title: '错误',
                            message: '这是一条错误的提示消息'
                        });
                        _this.loadingSelect = false
                        _this.loadingAll = false
                    });
            },
            //获取文件blob
            getImgArrayBuffer(url) {
                return new Promise((resolve, reject) => {
                    let xmlhttp = new XMLHttpRequest();
                    xmlhttp.open("GET", url, true);
                    xmlhttp.responseType = "blob";
                    xmlhttp.onload = function() {
                        if (this.status == 200) {
                            resolve(this.response);
                        } else {
                            reject(this.status);
                        }
                    };
                    xmlhttp.send();
                });
            },

            getAdidasImage(articlenos) {
                this.$http.post(
                    "/api/adidas",
                    {
                            'params': {
                                'articleno': articlenos,
                            }
                        },
                    {})
                    .then(res => {
                        if(res.data.code == 1000) {
                            this.$message({
                                showClose: true,
                                message: '图片获取成功!',
                                type: 'success'
                            });
                            this.imageData['urlList'] = []
                            this.imageInfo = {}
                            for (var i of res.data.data){
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
                                        ids.push("http://39.108.238.173:8080/api/image/" + id.toString())
                                    }
                                    data['imgList'] = ids
                                    this.imageData['urlList'].push(data)
                                }
                            }
                            // console.log(this.imageData)
                        }else{
                            this.$error(res.data.code,res.data.message)
                        }
                    })
            }
        }
    }
</script>

<style scoped>

</style>