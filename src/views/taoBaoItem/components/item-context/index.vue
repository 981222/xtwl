<template>
    <el-table
            :data="tableData"
            height="80vh"
            highlight-current-row
            style="width: 100%">
        <el-table-column type="expand">
            <template slot-scope="props">
                <el-form label-width="100px" label-position="right" status-icon>
                    <el-form-item label="宝贝标题">
                        <el-input
                                style="width: 66%;"
                                maxlength="60"
                                show-word-limit
                                placeholder="请输入标题"
                                v-model="props.row.name">
                        </el-input>
                    </el-form-item>
                    <el-row :gutter="20" class="row">
                        <el-col :span="8">
                            <el-form-item label="款号">
                                <el-input
                                        v-model.number="props.row.styleNumber">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="品牌">
                                <el-select v-model="props.row.brand" placeholder="请选择">
                                    <el-option
                                            v-for="item in props.row.context.brandList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="服装款式细节">
                                <el-select v-model="props.row.context.value1" multiple placeholder="请选择">
                                    <el-option
                                            v-for="item in props.row.context.options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="吊牌价">
                                <el-input
                                        v-model.number="props.row.priceTag">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="性别">
                                <el-select v-model="props.row.sex" placeholder="请选择">
                                    <el-option
                                            v-for="item in props.row.context.sexList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="面料材质">
                                <el-select v-model="props.row.fabricMaterial" placeholder="请选择">
                                    <el-option
                                            v-for="item in props.row.context.fabricMaterialList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="里料材质">
                                <el-select v-model="props.row.liningMaterial" placeholder="请选择">
                                    <el-option
                                            v-for="item in props.row.context.liningMaterialList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="上市时间">
                                <el-select v-model="props.row.marketTime" placeholder="请选择">
                                    <el-option
                                            v-for="item in props.row.context.marketTimeList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label=运动户外项目>
                                <el-select v-model="props.row.marketTime" placeholder="请选择">
                                    <el-option
                                            v-for="item in props.row.context.marketTimeList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="功能">
                                <el-select v-model="props.row.context.value1" multiple placeholder="请选择">
                                    <el-option
                                            v-for="item in props.row.context.options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="运动系列">
                                <el-select v-model="props.row.marketTime" placeholder="请选择">
                                    <el-option
                                            v-for="item in props.row.context.marketTimeList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="裤门襟">
                                <el-select v-model="props.row.marketTime" placeholder="请选择">
                                    <el-option
                                            v-for="item in props.row.context.marketTimeList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="服装版型">
                                <el-select v-model="props.row.marketTime" placeholder="请选择">
                                    <el-option
                                            v-for="item in props.row.context.marketTimeList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="腰型">
                                <el-select v-model="props.row.marketTime" placeholder="请选择">
                                    <el-option
                                            v-for="item in props.row.context.marketTimeList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="面料织造方法">
                                <el-select v-model="props.row.marketTime" placeholder="请选择">
                                    <el-option
                                            v-for="item in props.row.context.marketTimeList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="宝贝类型">
                        <el-radio v-model="props.row.context.quality" label="全新">全新</el-radio>
                        <el-radio v-model="props.row.context.quality" label="二手">二手</el-radio>
                    </el-form-item>
                    <el-form-item label="采购地区">
                        <el-radio v-model="props.row.context.area" label="中国大陆地区">中国大陆地区</el-radio>
                        <el-radio v-model="props.row.context.area" label="中国港澳台地区及海外">中国港澳台地区及海外</el-radio>
                    </el-form-item>
                    <el-form-item label="店铺中分类">
                        <el-select v-model="props.row.marketTime" placeholder="请选择">
                            <el-option
                                    v-for="item in props.row.context.marketTimeList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </template>
        </el-table-column>
        <el-table-column
                label="款号"
                prop="styleNumber"
                width="100"
                header-align="center"
                align="center">
        </el-table-column>
        <el-table-column
                label="标题"
                width="200"
                header-align="center"
                align="center">
            <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                    <p><b>标题: </b>{{ scope.row.name }}</p>
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.name.substring(0,10) }}...</el-tag>
                    </div>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column
                label="品牌"
                prop="brand"
                width="100"
                header-align="center"
                align="center">
        </el-table-column>
        <el-table-column
                label="宝贝类型"
                width="100"
                prop="context.quality"
                header-align="center"
                align="center">
        </el-table-column>
        <el-table-column
                label="颜色分类"
                width="100"
                header-align="center"
                align="center">
            <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                    <div class="demo-image__placeholder">
                        <div class="block">
                            <el-image :src="src" style="width: 400px">
                                <div slot="placeholder" class="image-slot">
                                    加载中<span class="dot">...</span>
                                </div>
                            </el-image>
                        </div>
                    </div>
                    <div slot="reference" class="name-wrapper">
                        <img src="https://img.alicdn.com/imgextra/i4/1600687454/O1CN01LAEYOn24vytNzs9l8_!!1600687454.jpg" alt="">
                    </div>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column
                label="宝贝图片"
                width="100"
                header-align="center"
                align="center">
            <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                    <div class="demo-image__placeholder">
                        <div class="block">
                            <el-image :src="src" style="width: 400px">
                                <div slot="placeholder" class="image-slot">
                                    加载中<span class="dot">...</span>
                                </div>
                            </el-image>
                        </div>
                    </div>
                    <div slot="reference" class="name-wrapper">
                        <img src="https://img.alicdn.com/imgextra/i4/1600687454/O1CN01LAEYOn24vytNzs9l8_!!1600687454.jpg" alt="">
                    </div>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column
                label="宝贝描述"
                width="100"
                header-align="center"
                align="center">
            <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                    <div class="demo-image__placeholder">
                        <div class="block">
                            <el-image :src="src" style="width: 400px">
                                <div slot="placeholder" class="image-slot">
                                    加载中<span class="dot">...</span>
                                </div>
                            </el-image>
                        </div>
                    </div>
                    <div slot="reference" class="name-wrapper">
                        <img src="https://img.alicdn.com/imgextra/i4/1600687454/O1CN01LAEYOn24vytNzs9l8_!!1600687454.jpg" alt="">
                    </div>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column
                label="宝贝视频"
                width="100"
                header-align="center"
                align="center">
            <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                    <div style="width: 600px">
                        <video-player  class="vjs-custom-skin"
                                       ref="videoPlayer"
                                       :playsinline="true"
                                       :options="scope.row.playerOptions"></video-player>
                    </div>
                    <div slot="reference" class="name-wrapper">
                        <h2>video</h2>
                    </div>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column
                label="操作"
                header-align="center"
                align="center">
            <el-link type="primary">移除</el-link>
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        name: 'itemContext',
        data() {
            return {
                src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                tableData: [
                    {
                        id: '12987122',
                        name: 'adidas阿迪达斯男裤长裤子2020秋冬新款休闲裤跑步运动裤FM0894',
                        styleNumber: 'FM0894',
                        shopId: '10333',
                        priceTag: 0,
                        brand: '阿迪达斯',
                        sex: null,
                        fabricMaterial: null,
                        liningMaterial: null,
                        marketTime: null,

                        context: {
                            //款式细节列表
                            options: [
                                {
                                    value: '选项1',
                                    label: '黄金糕'
                                }, {
                                    value: '选项2',
                                    label: '双皮奶'
                                }, {
                                    value: '选项3',
                                    label: '蚵仔煎'
                                }, {
                                    value: '选项4',
                                    label: '龙须面'
                                }, {
                                    value: '选项5',
                                    label: '北京烤鸭'
                                }
                            ],
                            value1: [],
                            //品牌列表
                            brandList:[
                                {
                                    value: '阿迪达斯',
                                    label: '阿迪达斯'
                                }, {
                                    value: '耐克',
                                    label: '耐克'
                                }, {
                                    value: '匡威',
                                    label: '匡威'
                                },
                            ],
                            //性别列表
                            sexList:[
                                {
                                    value: '1',
                                    label: '男'
                                }, {
                                    value: '2',
                                    label: '女'
                                }, {
                                    value: '3',
                                    label: '中性'
                                },
                            ],
                            //面料列表
                            fabricMaterialList:[
                                {
                                    value: '1',
                                    label: '男'
                                }, {
                                    value: '2',
                                    label: '女'
                                }, {
                                    value: '3',
                                    label: '中性'
                                },
                            ],
                            //里料列表
                            liningMaterialList:[
                                {
                                    value: '1',
                                    label: '男'
                                }, {
                                    value: '2',
                                    label: '女'
                                }, {
                                    value: '3',
                                    label: '中性'
                                },
                            ],
                            //上市时间列表
                            marketTimeList:[
                                {
                                    value: '1',
                                    label: '男'
                                }, {
                                    value: '2',
                                    label: '女'
                                }, {
                                    value: '3',
                                    label: '中性'
                                },
                            ],
                            quality: '全新',
                            area: '中国大陆地区',
                        },
                        playerOptions: {
                            playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                            autoplay: false, //如果true,浏览器准备好时开始回放。
                            muted: false, // 默认情况下将会消除任何音频。
                            loop: false, // 导致视频一结束就重新开始。
                            preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                            language: 'zh-CN',
                            aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                            fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                            sources: [{
                                type: "video/mp4",//这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                                src: //"http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" //url地址
                                    require('~/assets/video/tutorial.mp4')
                            }],
                            // poster: "../../static/images/test.jpg", //你的封面地址
                            width: document.documentElement.clientWidth, //播放器宽度
                            notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                            controlBar: {
                                timeDivider: true,
                                durationDisplay: true,
                                remainingTimeDisplay: false,
                                fullscreenToggle: true  //全屏按钮
                            }
                        }
                    },
                    {
                        id: '12987122',
                        name: 'adidas阿迪达斯男裤长裤子2020秋冬新款休闲裤跑步运动裤FM0894',
                        styleNumber: 'FM0894',
                        shopId: '10333',
                        priceTag: 0,
                        brand: '阿迪达斯',
                        sex: null,
                        fabricMaterial: null,
                        liningMaterial: null,
                        marketTime: null,

                        context: {
                            //款式细节列表
                            options: [
                                {
                                    value: '选项1',
                                    label: '黄金糕'
                                }, {
                                    value: '选项2',
                                    label: '双皮奶'
                                }, {
                                    value: '选项3',
                                    label: '蚵仔煎'
                                }, {
                                    value: '选项4',
                                    label: '龙须面'
                                }, {
                                    value: '选项5',
                                    label: '北京烤鸭'
                                }
                            ],
                            value1: [],
                            //品牌列表
                            brandList:[
                                {
                                    value: '阿迪达斯',
                                    label: '阿迪达斯'
                                }, {
                                    value: '耐克',
                                    label: '耐克'
                                }, {
                                    value: '匡威',
                                    label: '匡威'
                                },
                            ],
                            //性别列表
                            sexList:[
                                {
                                    value: '1',
                                    label: '男'
                                }, {
                                    value: '2',
                                    label: '女'
                                }, {
                                    value: '3',
                                    label: '中性'
                                },
                            ],
                            //面料列表
                            fabricMaterialList:[
                                {
                                    value: '1',
                                    label: '男'
                                }, {
                                    value: '2',
                                    label: '女'
                                }, {
                                    value: '3',
                                    label: '中性'
                                },
                            ],
                            //里料列表
                            liningMaterialList:[
                                {
                                    value: '1',
                                    label: '男'
                                }, {
                                    value: '2',
                                    label: '女'
                                }, {
                                    value: '3',
                                    label: '中性'
                                },
                            ],
                            //上市时间列表
                            marketTimeList:[
                                {
                                    value: '1',
                                    label: '男'
                                }, {
                                    value: '2',
                                    label: '女'
                                }, {
                                    value: '3',
                                    label: '中性'
                                },
                            ],
                            quality: '全新',
                            area: '中国大陆地区',
                        },
                        playerOptions: {
                            playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                            autoplay: false, //如果true,浏览器准备好时开始回放。
                            muted: false, // 默认情况下将会消除任何音频。
                            loop: false, // 导致视频一结束就重新开始。
                            preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                            language: 'zh-CN',
                            aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                            fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                            sources: [{
                                type: "video/mp4",//这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                                src: //"http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" //url地址
                                    require('~/assets/video/tutorial.mp4')
                            }],
                            // poster: "../../static/images/test.jpg", //你的封面地址
                            width: document.documentElement.clientWidth, //播放器宽度
                            notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                            controlBar: {
                                timeDivider: true,
                                durationDisplay: true,
                                remainingTimeDisplay: false,
                                fullscreenToggle: true  //全屏按钮
                            }
                        }
                    },
                ],
            }
        },
    };
</script>

<style scoped>
    .row /deep/ .el-input__inner {
        width: 300px;
    }
</style>