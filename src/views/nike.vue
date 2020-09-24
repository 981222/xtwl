<template>
    <div>
        <h1 style="margin-left: 12px">耐克图片下载</h1>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="输入货号">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="选择通道">
                <el-radio-group v-model="form.resource">
                    <el-radio label="通道一"></el-radio>
                    <el-radio label="通道二"></el-radio>
                    <el-radio label="通道三"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="getImageUrl">立即创建</el-button>
                <el-button type="primary" @click="filesToRar('Select')" :loading="loadingSelect">{{ loadingSelect ? '下载中,耗时' + downImgTime.toString() + 's':'下载已选择图片'}}</el-button>
                <el-button type="primary" @click="filesToRar('All')" :loading="loadingAll">{{ loadingAll ? '下载中,耗时' + downImgTime.toString() + 's':'下载全部图片'}}</el-button>
            </el-form-item>
        </el-form>

        <showImage  class="scroll" :imageInfo="imageInfo" :imgData="imgData"></showImage>
    </div>
</template>

<script>
    import showImage from "./showImage";
    import JSZip from "jszip";
    import FileSaver from "file-saver";

    export default {
        data() {
            return {
                form: {
                    name: '',
                    resource: '通道一'
                },
                imageInfo: {
                    'CW0411-010': {
                        checkAll: false,
                        isIndeterminate: false,
                        dialogVisible: false,
                        dialogVisible2: false,
                        imageUrls: [],
                    },
                    'AJ2876-100': {
                        checkAll: false,
                        isIndeterminate: false,
                        dialogVisible: false,
                        dialogVisible2: false,
                        imageUrls: [],
                    },
                    'AT5939-407': {
                        checkAll: false,
                        isIndeterminate: false,
                        dialogVisible: false,
                        dialogVisible2: false,
                        imageUrls: [],
                    },
                },
                imgData: {
                    name: 'nike',
                    urlList: [
                        {
                            name: 'CW0411-010',
                            imgList:['https://images.nike.com/is/image/DotCom/CW0411_010_A_PREM?wid=1800&hei=1800',
                                'https://images.nike.com/is/image/DotCom/CW0411_010_B_PREM?wid=1800&hei=1800',
                                'https://images.nike.com/is/image/DotCom/CW0411_010_C_PREM?wid=1800&hei=1800',
                                'https://images.nike.com/is/image/DotCom/CW0411_010_D_PREM?wid=1800&hei=1800',],
                        },
                        {
                            name: 'AJ2876-100',
                            imgList:['https://images.nike.com/is/image/DotCom/AJ2876_100_A_PREM?wid=1800&hei=1800',
                                'https://images.nike.com/is/image/DotCom/AJ2876_100_B_PREM?wid=1800&hei=1800',
                                'https://images.nike.com/is/image/DotCom/AJ2876_100_C_PREM?wid=1800&hei=1800',
                                'https://images.nike.com/is/image/DotCom/AJ2876_100_D_PREM?wid=1800&hei=1800'],
                        },
                        {
                            name:'AT5939-407',
                            imgList: [
                                'https://images.nike.com/is/image/DotCom/AT5939_407_A_PREM?wid=1800&hei=1800',
                                'https://images.nike.com/is/image/DotCom/AT5939_407_B_PREM?wid=1800&hei=1800',
                                'https://images.nike.com/is/image/DotCom/AT5939_407_C_PREM?wid=1800&hei=1800',
                                'https://images.nike.com/is/image/DotCom/AT5939_407_D_PREM?wid=1800&hei=1800']
                        }
                    ],
                },
                arrImages: [],
                loadingSelect: false,
                loadingAll: false,
                downImgTime: 1,
            }
        },
        components:{ showImage },
        methods: {
            getImageUrl() {
                // 获取图片
                let method = this.form['resource']
                switch (method) {
                    case '通道一':
                        // this.form['name'].split(" ")
                        console.log('通道一开启')
                        break
                    case '通道二':
                        console.log('通道二开启')
                        break
                    case '通道三':
                        console.log('通道三开启')
                        break
                }
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
                        for(let i of _this.imgData.urlList){
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
                let _this = this;
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
            }
        }
    }
</script>

<style scoped>



</style>