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

                        <div class="text item">
                            您还不是<span style="color: red"><strong>雄途会员</strong></span>，开通特权，尊享服务！
                        </div>
                        <div class="item">
                            <el-radio-group v-model="joinMember">
                                <el-radio-button label="primary">
                                    <p><strong>初级会员</strong></p>
                                    <p><strong>￥59</strong></p>
                                </el-radio-button>
                                <el-radio-button label="middle">
                                    <p><strong>中级会员</strong></p>
                                    <p><strong>￥99</strong></p>
                                </el-radio-button>
                                <el-radio-button label="advance">
                                    <p><strong>高级会员</strong></p>
                                    <p><strong>￥199</strong></p>
                                </el-radio-button>
                                <el-radio-button label="supreme">
                                    <p><strong>尊享会员</strong></p>
                                    <p><strong>￥399</strong></p>
                                </el-radio-button>
                            </el-radio-group>
                        </div>
                        <div class="item">
                            <strong>请选择支付方式：</strong>
                        </div>
                        <div class="item">
                            <el-radio-group v-model="payMethod">
                                <el-radio label="Alipay" style="display: flex;align-items: center;border: 1px solid #b9b9b9;border-radius: 4px;">
                                    <img style="width: 80px;margin: 10px" :src="alipayLogo" alt="">
                                </el-radio>
<!--                                <el-radio-button label="WeChat">-->
<!--                                    微信-->
<!--                                </el-radio-button>-->
                            </el-radio-group>
                            <el-button type="primary" icon="el-icon-s-promotion" style="float: right" @click="pay">确认支付</el-button>
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
                joinMember: 'primary',
                payMethod: 'Alipay',
                alipayLogo: alipayLogo,
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
        margin-left: 20px;
        border: 1px solid #DCDFE6;
        border-radius: 4px;
    }
    /deep/ .el-radio__input {
        margin-left: 10px!important;
    }
    /deep/ .el-radio__label {
         padding-left: 0px!important;
    }
</style>