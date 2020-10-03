<template>
    <div>
        <el-tabs>
            <el-tab-pane label="雄途会员">
                <div class="card">
                    <el-card class="text item">
                        <div class="item" style="display: flex;">
                            <el-avatar :size="50" style="margin-right: 10px" src="https://pic3.zhimg.com/v2-ea115b92784802ce3dd9e4a945a912dd_r.jpg?source=1940ef5c"></el-avatar>
                            <div>
                                <div class="text">
                                    <strong>{{ username }}</strong>
                                </div>
                                <div class="text"  >
                                    <strong>{{ grade }}</strong>
                                </div>
                            </div>
                        </div>
                        <div v-if="grade == '免费会员'">
                            <div class="text item">
                                您还不是<span style="color: red"><strong>雄途会员</strong></span>，开通特权，尊享服务！
                            </div>
                            <el-tabs v-model="activeName">
                                <el-tab-pane label="初级会员" name="primary">
                                    <el-radio-group v-model="joinMember" class="item">
                                        <el-radio-button label="primaryMonth">
                                            <p><strong>1个月</strong></p>
                                            <p><strong>￥???</strong></p>
                                        </el-radio-button>
                                        <el-radio-button label="primaryQuarterly">
                                            <p><strong>季度</strong></p>
                                            <p><strong>￥???</strong></p>
                                        </el-radio-button>
                                        <el-radio-button label="primaryHalfOfYear">
                                            <p><strong>半年</strong></p>
                                            <p><strong>￥???</strong></p>
                                        </el-radio-button>
                                        <el-radio-button label="primaryYear">
                                            <p><strong>一年</strong></p>
                                            <p><strong>￥???</strong></p>
                                        </el-radio-button>
                                    </el-radio-group>
                                    <el-card class="box-card item">
                                        <div class="text">
                                            <b>特权：</b>
                                            <p>天马平台图片获取</p>
                                            <b>说明：</b>
                                            <p>上架的整个流程中，在处理图片这方面使用到的时间可以占到大约40%。</p>
                                            <p>使用本站的服务可以帮助您快速获取天马平台的图片进行快速的上新工作。</p>
                                            <p>节省上架时间、提高上架效率。</p>
                                        </div>
                                    </el-card>
                                </el-tab-pane>
                                <el-tab-pane label="中级会员" name="middle">
                                    <el-radio-group v-model="joinMember" class="item">
                                        <el-radio-button label="middleMonth">
                                            <p><strong>1个月</strong></p>
                                            <p><strong>￥???</strong></p>
                                        </el-radio-button>
                                        <el-radio-button label="middleQuarterly">
                                            <p><strong>季度</strong></p>
                                            <p><strong>￥???</strong></p>
                                        </el-radio-button>
                                        <el-radio-button label="middleHalfOfYear">
                                            <p><strong>半年</strong></p>
                                            <p><strong>￥???</strong></p>
                                        </el-radio-button>
                                        <el-radio-button label="middleYear">
                                            <p><strong>一年</strong></p>
                                            <p><strong>￥???</strong></p>
                                        </el-radio-button>
                                    </el-radio-group>
                                    <el-card class="box-card item">
                                        <div class="text">
                                            <b>特权：</b>
                                            <p>阿迪达斯 、耐克等等品牌官网图片获取（包含所有初级会员特权）</p>
                                            <b>说明：</b>
                                            <p>上架的整个流程中，在处理图片这方面使用到的时间可以占到大约40%。</p>
                                            <p>使用本站的服务可以帮助您快速获取各大品牌平台的图片进行快速的上新工作。</p>
                                            <p>节省上架时间、提高上架效率。</p>
                                        </div>
                                    </el-card>
                                </el-tab-pane>
                                <el-tab-pane label="高级会员" name="advance">
                                    <el-radio-group v-model="joinMember" class="item">
                                        <el-radio-button label="advanceMonth">
                                            <p><strong>1个月</strong></p>
                                            <p><strong>￥???</strong></p>
                                        </el-radio-button>
                                        <el-radio-button label="advanceQuarterly">
                                            <p><strong>季度</strong></p>
                                            <p><strong>￥???</strong></p>
                                        </el-radio-button>
                                        <el-radio-button label="advanceHalfOfYear">
                                            <p><strong>半年</strong></p>
                                            <p><strong>￥???</strong></p>
                                        </el-radio-button>
                                        <el-radio-button label="advanceYear">
                                            <p><strong>一年</strong></p>
                                            <p><strong>￥???</strong></p>
                                        </el-radio-button>
                                    </el-radio-group>
                                    <el-card class="box-card item">
                                        <div class="text">
                                            <b>特权：</b>
                                            <p>除全品牌图片获取额外享受图片拼接功能（图片拼接可定制!）</p>
                                            <b>说明：</b>
                                            <p>上架的整个流程中，在处理图片这方面使用到的时间可以占到大约40%。</p>
                                            <p>使用本站的服务可以帮助您快速制作出符合自身需求的详情图配合您的上新工作。</p>
                                            <p>节省上架时间、提高上架效率。</p>
                                        </div>
                                    </el-card>
                                </el-tab-pane>
                                <el-tab-pane label="尊享会员" name="supreme">
                                    <el-radio-group v-model="joinMember" class="item">
                                        <el-radio-button label="supremeMonth">
                                            <p><strong>1个月</strong></p>
                                            <p><strong>￥???</strong></p>
                                        </el-radio-button>
                                        <el-radio-button label="supremeQuarterly">
                                            <p><strong>季度</strong></p>
                                            <p><strong>￥???</strong></p>
                                        </el-radio-button>
                                        <el-radio-button label="supremeHalfOfYear">
                                            <p><strong>半年</strong></p>
                                            <p><strong>￥???</strong></p>
                                        </el-radio-button>
                                        <el-radio-button label="supremeYear">
                                            <p><strong>一年</strong></p>
                                            <p><strong>￥???</strong></p>
                                        </el-radio-button>
                                    </el-radio-group>
                                    <el-card class="box-card item">
                                        <div class="text">
                                            <b>特权：</b>
                                            <p>享受本站全部服务（可定制）：半自动上新 + 数据分析</p>
                                            <b>说明：</b>
                                            <p>半自动的上架新品、合理的数据化运营店铺。</p>
                                            <p>轻松处理大量的商品，科学的进行店铺分析。</p>
                                            <p>助您在事业上一路高歌!</p>
                                        </div>
                                    </el-card>
                                </el-tab-pane>
                            </el-tabs>
                            <div class="item">
                                <strong>请选择支付方式：</strong>
                            </div>
                            <div class="item">
                            <el-radio-group v-model="payMethod">
                                <el-radio label="Alipay" style="display: flex;align-items: center;box-shadow: 0px 0px 6px -3px #000;">
                                    <img style="width: 80px;margin: 10px" :src="alipayLogo" alt="">
                                </el-radio>
<!--                                <el-radio-button label="WeChat">-->
<!--                                    微信-->
<!--                                </el-radio-button>-->
                            </el-radio-group>
                            <el-button type="primary" icon="el-icon-s-promotion" style="float: right" @click="pay">确认支付</el-button>
                        </div>
                        </div>
                        <div v-else>
                            尊敬的{{ grade }}
                            <div class="text">
                                <b>特权：</b>
                                <p>天马平台图片获取</p>
                                <b>说明：</b>
                                <p>上架的整个流程中，在处理图片这方面使用到的时间可以占到大约40%。</p>
                                <p>使用本站的服务可以帮助您快速获取天马平台的图片进行快速的上新工作。</p>
                                <p>节省上架时间、提高上架效率。</p>
                            </div>
                        </div>


                    </el-card>
                </div>
            </el-tab-pane>
            <!--            <el-tab-pane label="修改密码">-->
            <!--            </el-tab-pane>-->
        </el-tabs>
    </div>
</template>

<script>
    import alipayLogo from '../../assets/icon/Alipay.png'
    export default {
        props:['username', 'grade'],
        data() {
            return {
                joinMember: 'primaryMonth',
                payMethod: 'Alipay',
                alipayLogo: alipayLogo,
                activeName: 'primary',
                time: new Date(),
            }
        },
        methods:{
            pay() {
                console.log(this.joinMember)
                console.log(this.payMethod)
            }
        }
    };
</script>

<style scoped>
    .item {
        margin-bottom: 20px
    }
    .card {
        width: 80%;
        margin: 20px auto;
    }

    /deep/ .el-radio-button__inner {
        margin-right: 20px;
        border: 1px solid #DCDFE6;
        border-radius: 4px!important;
    }
    /deep/ .el-radio__input {
        margin-left: 10px!important;
    }
    /deep/ .el-radio__label {
        padding-left: 0px!important;
    }
</style>