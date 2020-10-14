<template>
    <div class="template">
        <el-container>

            <el-menu class="el-menu-vertical-demo"
                     background-color="#545c64"
                     text-color="#fff"
                     active-text-color="#ffd04b"
                     :collapse="true">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">导航一</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                        <el-submenu index="1-4">
                            <span slot="title">选项4</span>
                            <el-menu-item index="1-4-1">选项1</el-menu-item>
                        </el-submenu>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航二</span>
                </el-menu-item>
            </el-menu>

            <el-main>
                <div class="text-event">
                    <DragImage
                            :w="150"
                            :h="150"
                            :x="50"
                            :y="50"
                            :min-width="50"
                            :min-height="50"
                            :parent="true"
                            :grid="[5,5]"
                            @dragging="onDrag"
                            @resizing="onResize"
                            v-for="(data, i) in fileList"
                            :key="i">
                        <img style="width: 100%;height: 100%" :src="data.url" alt="">
                        <!--                X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height: {{ height }}-->
                    </DragImage>
                    <DragImage
                            :w="200"
                            :h="23"
                            :x="200"
                            :y="50"
                            :parent="true"
                            :grid="[5,5]"
                            class-name="my-class"
                            @dragging="onDrag"
                            @resizing="onResize"
                            @activated="onActivated"
                            @deactivated="onDeactivated"
                            :drag-cancel="'.drag-cancel'">
                        <div v-if="!active" style="white-space: pre-line;white-space: break-spaces;word-spacing: 3px;">
                            <label>{{ text }}</label>
                        </div>
                        <el-input
                            v-else
                            class="drag-cancel"
                            autosize
                            @input="onActivated"
                            :rows="(height - 23) / 21 + 1"
                            style="outline:0;border: none;word-break: break-all;overflow:hidden;word-spacing: -2px;font-size: 16px"
                            autofocus="true"
                            type="textarea"
                            v-model="text"/>
                    </DragImage>
                </div>
            </el-main>

            <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-change="handleChange"
                    :file-list="fileList"
                    :auto-upload="false">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </el-container>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                fileList: [{
                    name: 'food.jpeg',
                    url: 'http://www.xiongzhijiongtu.com:8080/api/image/1389'
                }, {
                    name: 'food2.jpeg',
                    url: 'http://www.xiongzhijiongtu.com:8080/api/image/1387'
                }, {
                    name: 'food3.jpeg',
                    url: 'http://www.xiongzhijiongtu.com:8080/api/image/1386'
                }, {
                    name: 'food4.jpeg',
                    url: 'http://www.xiongzhijiongtu.com:8080/api/image/1379'
                }],
                text: '添加文字',
                active: false,
                width: 0,
                height: 0,
                x: 0,
                y: 0,
            }
        },
        methods: {
            handleChange(file, fileList) {
                this.fileList = fileList.slice(-3);
            },
            onResize: function(x, y, width, height) {
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
            },
            onDrag: function(x, y) {
                this.x = x;
                this.y = y;
            },
            onActivated () {
                this.active = true
                console.log(1)
            },
            onDeactivated () {
                this.active = false
                console.log(this.text)
            }
        },
    };
</script>

<style scoped>
    .template .el-main {
        padding: 0px!important;
    }

    .template /deep/ .el-textarea__inner{
        padding: 0px!important;
    }
    .draggable {
        cursor: move;
    }

    my-class{
        border:none;
    }

    .text-event {
        height: 800px;
        width: 800px;
        border: 1px solid red;
        position: relative;
        /*background: linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 10px 10px, linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 10px 10px;*/
    }

</style>