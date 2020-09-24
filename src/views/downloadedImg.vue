<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="耐克" name="nike">
                <imageItem :name="activeName" :imgData="'nike' == imgData.name ? imgData : {}" :imageInfo="imageInfo"></imageItem>
            </el-tab-pane>
            <el-tab-pane label="阿迪达斯" name="adidas">
                <imageItem :name="activeName" :imgData="'adidas' == imgData.name ? imgData : {}" :imageInfo="imageInfo"></imageItem>
            </el-tab-pane>
            <el-tab-pane label="天马" name="tianma">
                <imageItem :name="activeName" :imgData="'tianma' == imgData.name ? imgData : {}" :imageInfo="imageInfo"></imageItem>
            </el-tab-pane>
            <el-tab-pane label="其他" name="other">
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import imageItem from "./imageItem";

    export default {
        data() {
            return {
                activeName: 'nike',
                currentDate: '描述',
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
                }
            };
        },
        components:{ imageItem },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>

<style scoped>
    /deep/ .is-active {
        pointer-events: none;
    }
</style>
