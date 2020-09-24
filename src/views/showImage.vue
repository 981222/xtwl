<template>
    <div>
        <div style="margin-bottom: 20px;box-shadow: 0px 0px 3px #808080;float: left;width: 100%;" class="demo-image__lazy" v-for="(data, i) in imgData.urlList" :key="i">
            <el-form ref="form" :model="imageInfo" label-width="50px">
                <div class="name-bottom">
                    <h1 style="margin-left: 40px;display: table;padding: 8px;">{{ data.name }}</h1>
                    <el-form-item>
                        <el-checkbox
                                style="margin-right: 10px"
                                :indeterminate="imageInfo[data.name]['isIndeterminate']"
                                v-model="imageInfo[data.name]['checkAll']"
                                @change="(val) => handleCheckAllChange(val, data)"
                                border>全选</el-checkbox>
                        <el-button type="primary" @click="imageHandler(data.name)">开始拼图</el-button>
                        <el-button type="primary" @click="imageInfo[data.name]['dialogVisible'] = true">预览效果</el-button>
                    </el-form-item>
                </div>

                <div class="imageList" v-for="(url, index) in data.imgList">
                    <el-checkbox-group v-model="imageInfo[data.name]['imageUrls']" @change="(value) => handleCheckedCitiesChange(value, data)">
                        <el-checkbox :label="url" :key="index">
                            <img class="image" :key="index" :src="url">
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
    export default {
        props: {
            imageInfo: Object,
            imgData: Object,
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
                console.log(this.imageInfo[name]);
                alert('开始拼图')
                // this.$http.get('').then(res => {
                // })
            }
        }
    };
</script>

<style scoped>
    .imageList /deep/ .el-checkbox__input {
        position: absolute!important;
        right: 10px!important;
        zoom: 2!important;
    }

    .name-bottom {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        margin-right: 50px;
    }

    .imageList {
        float: left;
        width: 300px;
        margin: 20px;
    }

    .imagePreview {
        width: 50%
    }

    .image {
        width: 300px;
        border-radius: 4px;
        box-shadow: 0px 0px 3px #808080;
        margin-left: 20px;
        margin-right: 20px;
    }

    .imageList:hover .image{
        filter: brightness(66%);
    }
</style>