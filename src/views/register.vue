<template>
    <div>
        <el-row class="login">
            <el-col class="demo-ruleForm">
                <h1 style="text-align: center;margin: 5px;font-size: x-large;">用户注册</h1>
                <div style="display: flex;justify-content: center;margin-bottom: 10px">
                    <span>已拥有账号?</span>
                    <el-link type="primary" href="/login" style="font-size: 16px;margin-left: 10px">登陆</el-link>
                </div>
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
                    <el-form-item prop="user">
                        <el-input type="text" v-model="ruleForm.user" autocomplete="off" placeholder="用户名">
                            <i slot="prefix" class="el-icon-user-solid" />
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="email">
                        <el-input type="text" v-model="ruleForm.email" autocomplete="off" placeholder="电子邮箱">
                            <i slot="prefix" class="el-icon-message" />
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="密码">
                            <i slot="prefix" class="el-icon-lock" />
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="checkPass">
                        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="再次输入密码">
                            <i slot="prefix" class="el-icon-lock" />
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="phone">
                        <el-input type="text" v-model="ruleForm.phone" autocomplete="off" placeholder="手机号码">
                            <i slot="prefix" class="el-icon-phone-outline" />
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="code">
                        <el-input type="text" v-model="ruleForm.code" autocomplete="off" placeholder="验证码">
                            <i slot="prefix" class="el-icon-position" />
                        </el-input>
                        <el-button type="primary" @click="sendCode" v-if="show">获取验证码</el-button>
                        <el-button type="primary" disabled v-else>{{ countDownTime }} s</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import md5 from 'js-md5';

    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var validateUser = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else if (/[\u4E00-\u9FA5]/g.test(value)){
                    callback(new Error('不能使用中文,请重新输入'));
                } else {
                    callback();
                }
            };
            var validatePhone = (rule, value, callback) => {
                const reg = /^\d{11}$/
                if (value === '') {
                    callback(new Error('请输入手机号码'));
                } else if (!reg.test(value)){
                    callback(new Error('请输入正确的11位手机号码'));
                } else {
                    callback();
                }
            };
            var validateCode = (rule, value, callback) => {
                const reg = /^\d{4}$/
                if (value === '') {
                    callback(new Error('请输入验证码'));
                } else if (!reg.test(value)){
                    callback(new Error('请输入正确的验证码'));
                } else {
                    callback();
                }
            };
            return {
                show: true,
                countDownTime: '',
                sms_token: '',
                ruleForm: {
                    user: '',
                    email: '',
                    pass: '',
                    checkPass: '',
                    phone: '',
                    code: '',
                },
                rules: {
                    pass: [
                        { required: true, validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { required: true, validator: validatePass2, trigger: 'blur' }
                    ],
                    user: [
                        { required: true, validator: validateUser, trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, validator: validatePhone, trigger: 'blur' }
                    ],
                    email: [
                        { required: true, type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                    ],
                    code: [
                        { required: true, validator: validateCode, trigger: 'blur' }
                    ]
                },
            };
        },
        created () {
            let myEndTime= localStorage.getItem('myEndTime')
            myEndTime && this.codeCountDown(myEndTime)
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.register()
                    } else {
                        // console.log('error submit!!');
                        // console.log(valid)
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            register() {
                const nikeName = this.ruleForm.user
                const password = this.ruleForm.pass
                const phone = this.ruleForm.phone
                const email = this.ruleForm.email
                const code = this.ruleForm.code
                this.$http.post(
                    "/api/register/user",
                    {

                        'params': {
                            'nikeName': nikeName,
                            'password': password,
                            'phone': phone,
                            'email': email,
                            'code': code,
                        }
                    })
                    .then(res => {
                        const code = res.data.code
                        if (code == 1000){
                            this.$message({
                                showClose: true,
                                message: '注册成功',
                                type: 'success'
                            });
                            this.$router.push("/login")
                        }else{
                            this.$error(code)
                        }
                    })
                    // err.request.status == 403
            },
            sendCode() {
                this.$refs.ruleForm.validateField('phone', phoneError => {
                    if (!phoneError) {
                        this.getVerificationCode()
                        this.getCode()
                    } else {
                        return false;
                    }
                });
            },
            getCode(){
                const time = new Date().getTime()
                const str = time.toString() + this.ruleForm.phone + this.$store.state.DEFAULT_NUM
                const sms_token = md5(str)
                this.$http.post(
                    "/api/message/send",
                    {
                        'params': {
                            'sms_token': sms_token,
                            'time': time,
                            'phone': this.ruleForm.phone,
                        }})
                    .then(res => {
                        console.log(res.request.status)
                        if (res.data.data === 'succeed'){
                            this.$message({
                                showClose: true,
                                message: '获取成功,请等待片刻...',
                                type: 'success'
                            });
                        } else {
                            this.$message({
                                showClose: true,
                                message: '未知错误!',
                                type: 'warning'
                            });
                        }
                    })
                    .catch(err => {
                        if (err.request.status == 403){
                            this.$message({
                                showClose: true,
                                message: '验证码获取失败,请检查手机号或联系管理员!',
                                type: 'error'
                            });
                        }
                    })
            },
            getVerificationCode () {
                let endMsRes = (new Date()).getTime() + 60000;
                localStorage.setItem('myEndTime', JSON.stringify(endMsRes));
		        this.codeCountDown(endMsRes)
            },
            codeCountDown (endMsRes) {
                this.show = false;
                this.countDownTime= Math.ceil((endMsRes - (new Date()).getTime()) / 1000)
                let time = setTimeout(() => {
                    this.countDownTime--
                    if (this.countDownTime < 1) {
                        this.show = true
                        this.countDownTime = 60
                        localStorage.removeItem('myEndTime')
                        clearTimeout(time)
                    } else {
                        this.codeCountDown(endMsRes)
                    }
                }, 1000)
            }
        }
    }
</script>

<style scoped>
    /deep/ .el-form-item__content {
        display: flex!important;
    }
</style>