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
                                        <el-radio-button label="primary_month">
                                            <p><strong>{{ payPrice.price.primary_month[1].split("-")[1] }}</strong></p>
                                            <p><strong>￥{{ payPrice.price.primary_month[0] }}</strong></p>
                                        </el-radio-button>
                                        <el-radio-button label="primary_quarter">
                                            <p><strong>{{ payPrice.price.primary_quarter[1].split("-")[1] }}</strong></p>
                                            <p><strong>￥{{ payPrice.price.primary_quarter[0] }}</strong></p>
                                        </el-radio-button>
                                        <el-radio-button label="primary_semi_year">
                                            <p><strong>{{ payPrice.price.primary_semi_year[1].split("-")[1] }}</strong></p>
                                            <p><strong>￥{{ payPrice.price.primary_semi_year[0] }}</strong></p>
                                        </el-radio-button>
                                        <el-radio-button label="primary_year">
                                            <p><strong>{{ payPrice.price.primary_year[1].split("-")[1] }}</strong></p>
                                            <p><strong>￥{{ payPrice.price.primary_year[0] }}</strong></p>
                                        </el-radio-button>
                                    </el-radio-group>
                                    <el-card class="box-card item">
                                        <div class="text">
                                            <b>特权：</b>
                                            <p>其他平台图片获取</p>
                                            <b>说明：</b>
                                            <p>上架的整个流程中，在处理图片这方面使用到的时间可以占到大约40%。</p>
                                            <p>使用本站的服务可以帮助您快速获取其他平台的图片进行快速的上新工作。</p>
                                            <p>节省上架时间、提高上架效率。</p>
                                        </div>
                                    </el-card>
                                </el-tab-pane>
                                <el-tab-pane label="中级会员" name="middle">
                                    <el-radio-group v-model="joinMember" class="item">
                                        <el-radio-button label="middle_month">
                                            <p><strong>{{ payPrice.price.middle_month[1].split("-")[1] }}</strong></p>
                                            <p><strong>￥{{ payPrice.price.middle_month[0] }}</strong></p>
                                        </el-radio-button>
                                        <el-radio-button label="middle_quarter">
                                            <p><strong>{{ payPrice.price.middle_quarter[1].split("-")[1] }}</strong></p>
                                            <p><strong>￥{{ payPrice.price.middle_quarter[0] }}</strong></p>
                                        </el-radio-button>
                                        <el-radio-button label="middle_semi_year">
                                            <p><strong>{{ payPrice.price.middle_semi_year[1].split("-")[1] }}</strong></p>
                                            <p><strong>￥{{ payPrice.price.middle_semi_year[0] }}</strong></p>
                                        </el-radio-button>
                                        <el-radio-button label="middle_year">
                                            <p><strong>{{ payPrice.price.middle_year[1].split("-")[1] }}</strong></p>
                                            <p><strong>￥{{ payPrice.price.middle_year[0] }}</strong></p>
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
                                        <el-radio-button label="height_month">
                                            <p><strong>{{ payPrice.price.height_month[1].split("-")[1] }}</strong></p>
                                            <p><strong>￥{{ payPrice.price.height_month[0] }}</strong></p>
                                        </el-radio-button>
                                        <el-radio-button label="height_quarter">
                                            <p><strong>{{ payPrice.price.height_quarter[1].split("-")[1] }}</strong></p>
                                            <p><strong>￥{{ payPrice.price.height_quarter[0] }}</strong></p>
                                        </el-radio-button>
                                        <el-radio-button label="height_semi_year">
                                            <p><strong>{{ payPrice.price.height_semi_year[1].split("-")[1] }}</strong></p>
                                            <p><strong>￥{{ payPrice.price.height_semi_year[0] }}</strong></p>
                                        </el-radio-button>
                                        <el-radio-button label="height_year">
                                            <p><strong>{{ payPrice.price.height_year[1].split("-")[1] }}</strong></p>
                                            <p><strong>￥{{ payPrice.price.height_year[0] }}</strong></p>
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
                                <el-tab-pane label="尊享会员" name="valued">
                                    <el-radio-group v-model="joinMember" class="item">
                                        <el-radio-button label="plus_month">
                                            <p><strong>{{ payPrice.price.plus_month[1].split("-")[1] }}</strong></p>
                                            <p><strong>￥{{ payPrice.price.plus_month[0] }}</strong></p>
                                        </el-radio-button>
                                        <el-radio-button label="plus_quarter">
                                            <p><strong>{{ payPrice.price.plus_quarter[1].split("-")[1] }}</strong></p>
                                            <p><strong>￥{{ payPrice.price.plus_quarter[0] }}</strong></p>
                                        </el-radio-button>
                                        <el-radio-button label="plus_semi_year">
                                            <p><strong>{{ payPrice.price.plus_semi_year[1].split("-")[1] }}</strong></p>
                                            <p><strong>￥{{ payPrice.price.plus_semi_year[0] }}</strong></p>
                                        </el-radio-button>
                                        <el-radio-button label="plus_year">
                                            <p><strong>{{ payPrice.price.plus_year[1].split("-")[1] }}</strong></p>
                                            <p><strong>￥{{ payPrice.price.plus_year[0] }}</strong></p>
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
                                <el-tab-pane label="网站推广合作" name="promote">
                                    <el-card class="box-card item">
                                        <div class="text">
                                            <b>网站推广合作：</b>
                                            <p>1.每一位用户都会有一个邀请码，邀请码可邀请多个新客户。</p>
                                            <p>2.新客户注册时，填写邀请人的邀请码并注册成功。</p>
                                            <p>3.由会员邀请同行业商家注册首次成为会员，成长为初级会员以上的，按照付费金额赚取10%的佣金。</p>
                                            <p>4.财务将在会员付费成功3个工作内，返佣金至邀请会员的支付宝中。</p>
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
                            <el-button type="primary" icon="el-icon-s-promotion" style="float: right" @click="pay">支付</el-button>
                            <el-dialog
                                    title="输入支付宝订单号"
                                    :visible.sync="verifyPay"
                                    width="30%"
                                    :before-close="handleClose"
                                    center>
                                <p style="font-size: 15px;">支付成功后需要提交支付宝账单的订单号进行验证是否支付成功！</p>
                                <el-form :model="formPay" class="demo-form-inline" size="medium" style="text-align: center;">
                                    <el-form-item label="订单号">
                                        <el-input v-model="formPay.id" placeholder="订单号"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" @click="onVerifyPay">验证</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-dialog>
                        </div>
                        </div>
                        <div v-else>
                            尊敬的{{ grade }}
                        </div>
                        会员到期时间：{{ expiration }}
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
    import payPrice from "./payPrice";

    export default {
        props:['username', 'grade','expiration'],
        data() {
            return {
                formPay: {
                    id: '',
                },
                payPrice: payPrice,
                verifyPay: false,
                joinMember: 'primary_month',
                payMethod: 'Alipay',
                alipayLogo: alipayLogo,
                activeName: 'primary',
                time: new Date(),
            }
        },
        methods:{
            pay() {
                const h = this.$createElement;
                this.$msgbox({
                    title: '支付信息',
                    message: h('p', null, [
                        h('b', null, '充值用户：'),
                        h('i', null, this.username),
                        h('br'),
                        h('b', null, '商品信息：'),
                        h('i', null, this.payPrice.price[this.joinMember][1]),
                        h('br'),
                        h('b', null, '付款金额：'),
                        h('i', null, '￥' + this.payPrice.price[this.joinMember][0]),
                    ]),
                    showCancelButton: true,
                    confirmButtonText: '确定支付',
                    cancelButtonText: '取消支付',
                }).then(() => {
                    this.verifyPay = true
                    this.handlePay(this.payPrice.price[this.joinMember][0])
                }).catch(() => {
                    this.$Message.info('已取消支付');
                });
                // alert('暂未开放支付，请联系客服！')
            },
            onVerifyPay() {
                this.verifyPay = false
                this.$http.post(
                    "/api/pay/state",
                    {
                        'params': {
                            'trade_no': this.formPay.id,
                        }
                    }).then(res => {
                    if (res.data.result.code == 1000){
                        this.$Message.success("充值成功");
                        this.$router.push("/news")
                    }else{
                        this.$error(res.data.result.code,res.data.result.message)
                    }
                })
            },
            handlePay(price) {
                // console.log(this.payPrice.price[this.joinMember])
                // console.log(this.joinMember)
                this.$http.post(
                    "/api/payment",
                    {
                        'params': {
                            'type': this.joinMember,
                            'price': price.toString(),
                        }
                    }).then(res => {
                        if (res.data.result.code == 1000){
                            this.$Message.success("正在跳转支付页面.")
                            setTimeout(()=>{
                                window.open(res.data.result.data,'_blank')
                            },1500)
                        }else{
                            this.$error(res.data.result.code,res.data.result.message)
                        }
                })
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            }
        }
    };
</script>

<style scoped>
    .item {
        margin-bottom: 20px
    }
    .item p {
        margin-top: 10px;
        margin-bottom: 10px;
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