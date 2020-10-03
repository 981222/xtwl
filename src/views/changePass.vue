<template>
    <div>
        <el-row class="login">
            <el-col class="demo-ruleForm">
                <h1 style="text-align: center;margin: 5px;font-size: x-large;">修改密码</h1>
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
                    <el-form-item prop="username">
                        <el-input type="text" v-model="ruleForm.username" autocomplete="off" placeholder="用户名">
                            <i slot="prefix" class="el-icon-user-solid" />
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
                    <el-form-item prop="code">
                        <el-input type="text" v-model="ruleForm.code" autocomplete="off" placeholder="验证码">
                            <i slot="prefix" class="el-icon-position" />
                        </el-input>
                        <el-button type="primary" @click="sendCode" v-if="show">获取验证码</el-button>
                        <el-button type="primary" disabled v-else>{{ countDownTime }} s</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import md5 from "js-md5";

    export default {
        data() {
            var validateUsername = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else if (/[\u4E00-\u9FA5]/g.test(value)){
                    callback(new Error('禁止使用中文字符,请重新输入'));
                } else {
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入新密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
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
                    username: '',
                    pass: '',
                    checkPass: '',
                    code: ''
                },
                rules: {
                    username: [
                        { validator: validateUsername, trigger: 'blur' }
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    code: [
                        { required: true, validator: validateCode, trigger: 'blur' }
                    ]
                },
            }
        },
        created() {
            let myEndTime= localStorage.getItem('myEndTime')
            myEndTime && this.codeCountDown(myEndTime)
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post(
                            "/api/rest/password",
                            {
                                'params': {
                                    'login': this.ruleForm.username,
                                    'password': this.ruleForm.pass,
                                    'code': this.ruleForm.code,
                                }
                            },
                            {
                            })
                            .then(res => {
                                if (res.data.result.code === 1000){
                                    this.$message({
                                        showClose: true,
                                        message: '修改成功',
                                        type: 'success'
                                    });
                                    this.$router.push("/news")
                                }else{
                                    this.$error(res.data.result.code,res.data.result.message)
                                }
                            })
                    } else {
                        // console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

            getCode(){
                const time = new Date().getTime().toString()
                const str = time + this.ruleForm.username + this.$store.state.DEFAULT_NUM
                const sms_token = md5(str)
                this.$http.post(
                    "/api/rest/message",
                    {
                        'params': {
                            'login': this.ruleForm.username,
                            'sms_token': sms_token,
                            'time': time,
                        }
                    },
                    {})
                    .then(res => {
                        if (res.data.result.code === 1000){
                            this.$message({
                                showClose: true,
                                message: '获取成功,等待验证码发送!',
                                type: 'success'
                            });
                        }else{
                            this.$error(res.data.result.code,res.data.result.message)
                        }
                    })
            },
            sendCode() {
                this.getVerificationCode()
                this.getCode()
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
    };
</script>

<style scoped>

    /deep/ .el-form-item__content {
        display: flex!important;
    }
</style>