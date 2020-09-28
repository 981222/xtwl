<template>
    <div>
        <el-tabs>
            <el-tab-pane label="个人信息">
                <div class="card" style="float:left;">
                    <el-avatar :size="100" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>

                    <div class="text item info">
                        用户名：{{ username }}
                    </div>
                    <div class="text item info">
                        会员等级：{{ grade }}
                    </div>
                    <div class="text item info">
                        手机号码：{{ phone }}
                    </div>
                    <div class="text item info">
                        电子邮箱：{{ email }}
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="修改密码">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="旧密码" prop="oldPass">
                        <el-input type="password" v-model.number="ruleForm.oldPass" placeholder="旧密码"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="新密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码" prop="checkPass">
                        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="确认新密码"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码"  prop="code">
                        <el-input type="text" v-model="ruleForm.code" autocomplete="off" placeholder="验证码">
                        </el-input>
                        <el-button type="primary" @click="sendCode" v-if="show">获取验证码</el-button>
                        <el-button type="primary" disabled v-else>{{ countDownTime }} s</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import md5 from 'js-md5';

    export default {
        data(){
            var validateOldPass = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error('请输入旧密码'));
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
                username: '',
                email: '',
                phone: '',
                grade: '',
                ruleForm: {
                    pass: '',
                    checkPass: '',
                    oldPass: '',
                    code: ''
                },
                rules: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    oldPass: [
                        { validator: validateOldPass, trigger: 'blur' }
                    ],
                    code: [
                        { required: true, validator: validateCode, trigger: 'blur' }
                    ]
                },
            }
        },
        created() {
            // let myEndTime= localStorage.getItem('myEndTime')
            // myEndTime && this.codeCountDown(myEndTime)
            getUserInfo: {
                this.$http.get("/api/my/info").then(res => {
                    if (res.data.code == 1000){
                        this.username = res.data.data.nikeName
                        this.email = res.data.data.email
                        this.phone = res.data.data.phone
                        switch (res.data.data.grade) {
                            case "free":
                                this.grade = "免费会员"
                                break;
                            case "primary":
                                this.grade = "免费会员"
                                break;
                            case "middle":
                                this.grade = "免费会员"
                                break;
                            case "advanced":
                                this.grade = "免费会员"
                                break;
                        }
                    }
                })
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post(
                            "/api/rest/password",
                            {
                                'params': {
                                    'login': this.username,
                                    'password': this.ruleForm.pass,
                                    'code': this.ruleForm.code,
                                }
                            },
                        {
                            })
                            .then(res => {
                                console.log(res)
                                if (res.data.code === '1000'){
                                    this.$message({
                                        showClose: true,
                                        message: '修改成功',
                                        type: 'success'
                                    });
                                    this.$router.push("/news")
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
                const str = time + this.username + this.$store.state.DEFAULT_NUM
                const sms_token = md5(str)
                this.$http.post(
                    "/api/rest/message",
                    {
                        'params': {
                            'login': this.username,
                            'sms_token': sms_token,
                            'time': time,
                        }
                    },
                    {})
                    .then(res => {
                        console.log(res)
                        if (res.data.code === '1000'){
                            this.$message({
                                showClose: true,
                                message: '获取成功,手机号' + this.phone.substring(3, 0) + '***' + this.phone.substring(4, 7) + '接收验证码!',
                                type: 'success'
                            });
                        }
                    })
                    .catch(err => {
                        if (err.request.status == 403){
                            this.$message({
                                showClose: true,
                                message: '验证码获取失败,请联系管理员!',
                                type: 'error'
                            });
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
    .card {
        display: flex;
        /* justify-content: center; */
        align-items: center;
        flex-flow: column;
    }
    .info {
        border-bottom: 1px solid #ffcfcf;
        margin: 10px;
    }
</style>