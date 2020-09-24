<template>
    <div>
        <h1 style="margin-left: 12px">天马图片下载</h1>
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
                <el-button type="primary" @click="getImageUrl">下载已选择图片</el-button>
                <el-button type="primary" @click="getImageUrl">下载全部图片</el-button>
            </el-form-item>
        </el-form>

        <showImage :imageInfo="imageInfo" :imgData="imgData"></showImage>
    </div>
</template>

<script>
    import showImage from "./showImage";

    export default {
        data() {
            return {
                form: {
                    name: '',
                    resource: '通道一'
                },
                imageInfo: {
                    // 'CW0411-010': {
                    //     checkAll: false,
                    //     isIndeterminate: false,
                    //     dialogVisible: false,
                    //     dialogVisible2: false,
                    //     imageUrls: [],
                    // },
                    // 'AJ2876-100': {
                    //     checkAll: false,
                    //     isIndeterminate: false,
                    //     dialogVisible: false,
                    //     dialogVisible2: false,
                    //     imageUrls: [],
                    // },
                    // 'AT5939-407': {
                    //     checkAll: false,
                    //     isIndeterminate: false,
                    //     dialogVisible: false,
                    //     dialogVisible2: false,
                    //     imageUrls: [],
                    // },
                },
                imgData: {
                    // name: 'nike',
                    // urlList: [
                    //     {
                    //         name: 'CW0411-010',
                    //         imgList:['https://images.nike.com/is/image/DotCom/CW0411_010_A_PREM?wid=1800&hei=1800',
                    //             'https://images.nike.com/is/image/DotCom/CW0411_010_B_PREM?wid=1800&hei=1800',
                    //             'https://images.nike.com/is/image/DotCom/CW0411_010_C_PREM?wid=1800&hei=1800',
                    //             'https://images.nike.com/is/image/DotCom/CW0411_010_D_PREM?wid=1800&hei=1800',],
                    //     },
                    //     {
                    //         name: 'AJ2876-100',
                    //         imgList:['https://images.nike.com/is/image/DotCom/AJ2876_100_A_PREM?wid=1800&hei=1800',
                    //             'https://images.nike.com/is/image/DotCom/AJ2876_100_B_PREM?wid=1800&hei=1800',
                    //             'https://images.nike.com/is/image/DotCom/AJ2876_100_C_PREM?wid=1800&hei=1800',
                    //             'https://images.nike.com/is/image/DotCom/AJ2876_100_D_PREM?wid=1800&hei=1800'],
                    //     },
                    //     {
                    //         name:'AT5939-407',
                    //         imgList: [
                    //             'https://images.nike.com/is/image/DotCom/AT5939_407_A_PREM?wid=1800&hei=1800',
                    //             'https://images.nike.com/is/image/DotCom/AT5939_407_B_PREM?wid=1800&hei=1800',
                    //             'https://images.nike.com/is/image/DotCom/AT5939_407_C_PREM?wid=1800&hei=1800',
                    //             'https://images.nike.com/is/image/DotCom/AT5939_407_D_PREM?wid=1800&hei=1800']
                    //     }
                    // ],
                }
            }
        },
        components:{ showImage },
        methods: {
            getImageUrl() {
                // 获取图片
                let method = this.form['resource']
                let names = this.form['name']
                switch (method) {
                    case '通道一':
                        alert(method,names)
                        console.log(names)
                        console.log('通道一开启')
                        break
                    case '通道二':
                        alert(method,names)
                        console.log('通道二开启')
                        break
                    case '通道三':
                        alert(method,names)
                        console.log('通道三开启')
                        break
                }
            },
        }
    }
</script>

<style scoped>

</style>