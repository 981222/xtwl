<template>
    <div>
        <el-row class="login">
            <el-col class="demo-ruleForm">
                <h1 style="text-align: center;margin: 5px;font-size: x-large;">用户登陆</h1>
                <div style="display: flex;justify-content: center;margin-bottom: 10px">
                    <span>没有账号?</span>
                    <router-link to="/register" style="font-size: 16px;margin-left: 10px;text-decoration: none">注册</router-link>
                </div>
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
                    <el-form-item prop="user">
                        <el-input type="text" v-model="ruleForm.user" autocomplete="off" placeholder="用户名">
                            <i slot="prefix" class="el-icon-user-solid" />
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="密码">
                            <i slot="prefix" class="el-icon-lock" />
                        </el-input>
                    </el-form-item>
                    <router-link to="/changePass" style="text-decoration: none;">忘记密码?</router-link>
<!--                    <el-checkbox v-model="ruleForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>-->
                    <el-button type="primary"
                               @click="submitForm('ruleForm')"
                               style="width:100%;margin-top: 10px">登陆</el-button>
                </el-form>
            </el-col>
            <span style="position: fixed;bottom: 30px;font-size: 14px;color: #fff;text-align: center">Copyright © {{ new Date().getFullYear() }} 桂平市雄途网络科技团队 All Rights Reserved.<br><a href="http://beian.miit.gov.cn" style="color: white;text-decoration: none">桂ICP备2020007346号-1</a></span>
        </el-row>
    </div>
</template>

<script>
    import Cookies from "js-cookie";
    import { encrypt, decrypt } from '../utils/jsencrypt'

    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            var validateUser = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    user: '',
                    pass: '',
                    // rememberMe: false,
                },
                rules: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    user: [
                        { validator: validateUser, trigger: 'blur' }
                    ],
                }
            };
        },
        created() {
            // getCookie: {
            //     const username = Cookies.get("username")
            //     const password = Cookies.get("password")
            //     const rememberMe = Cookies.get('rememberMe')
            //     this.ruleForm = {
            //         user: username === undefined ? this.ruleForm.user : username,
            //         pass: password === undefined ? this.ruleForm.pass : decrypt(password),
            //         rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
            //     }
            // }
        },
        methods: {
            // getCookie() {
            //     const username = Cookies.get("username")
            //     const password = Cookies.get("password")
            //     const rememberMe = Cookies.get('rememberMe')
            //     this.ruleForm = {
            //         user: username === undefined ? this.ruleForm.user : username,
            //         pass: password === undefined ? this.ruleForm.pass : decrypt(password),
            //         rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
            //     }
            // },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.login(this.ruleForm.user, this.ruleForm.pass)
                    } else {
                        // console.log('error submit!!');
                        return false;
                    }
                });
            },
            login(username, password){
                this.$http.get(
                    "/api/auth/token",
                    {
                        params: {
                            'login': username,
                            'password': password,
                            'db': 'xiongtu',
                        }
                    })
                    .then(res => {
                        if (res.data.code === 1000){
                            // if (this.ruleForm.rememberMe) {
                            //     Cookies.set("username", this.ruleForm.user, { expires: 30 });
                            //     Cookies.set("password", encrypt(this.ruleForm.pass), { expires: 30 });
                            //     Cookies.set('rememberMe', this.ruleForm.rememberMe, { expires: 30 });
                            // } else {
                            //     Cookies.remove("username");
                            //     Cookies.remove("password");
                            //     Cookies.remove('rememberMe');
                            // }
                            // console.log(res.data.data.access_token)
                            this.$store.commit("chageToken",res.data.data.access_token)
                            this.$http.defaults.headers = {
                                'access_token': res.data.data.access_token
                            }
                            this.$router.push("/news")
                            this.$message({
                                showClose: true,
                                message: '登陆成功',
                                type: 'success'
                            });
                        } else {
                            this.$error(res.data.code,res.data.message)
                        }
                    })
            }
        }
    }
</script>

<style>
    .login {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-image: url("https://vue.ruoyi.vip/static/img/login-background.f9f49138.jpg");
        background-size: cover;
    }

    .demo-ruleForm {
        width: 400px!important;
        border-radius: 6px;
        padding: 30px;
        background: #fff;
    }

    .login .el-input__prefix {
        left: 10px!important;
    }
</style>