<template>
    <div id="app">
        <el-container :class="isCollapse ? 'shrinkShort' : 'shrinkLong'" ref="app">
            <el-aside class="nav-left scroll" :width="width" v-if="this.login">
                <el-menu router text-color="#bbbbbb" :collapse="isCollapse"  class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">

                    <el-menu-item index="/news" class="nav-home">
<!--                        <i class="el-icon-s-promotion" style="color: #fff;margin-right: 10px"></i>-->
                        <i><img :src="logo" alt="" style="height: 18px;width: 18px;"></i>

                        <span slot="title" style="color: #fff;padding-left: 10px;"><strong>雄途网络系统</strong></span>
                    </el-menu-item>

                    <el-submenu v-for="(item,index) in $router.options.routes" :key="index" :index="index+''" v-if="item.show">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span style="color: #bbbbbb!important;">{{ item.name }}</span>
                        </template>
                        <el-menu-item v-for="(item2,index2) in item.children"
                                      :index="item2.path"
                                      :class="$route.path==item2.path?'is-active':''">
                            {{item2.name}}
                        </el-menu-item>
                    </el-submenu>

                </el-menu>
            </el-aside>

            <el-container>
                <el-header class="header1">

                    <div :class="isCollapse ? 'fold' : 'unfold'" ref="isCollapse" @click="shrink">
                        <i class="iconfont icon-caidanshousuo" v-if="isCollapse"></i>
                        <i class="iconfont icon-caidanshousuo" v-else></i>
                    </div>

                    <b>雄途网络系统欢迎您!</b>
                    <b style="float: right">联系客服<i class="iconfont icon-QQ"></i>：1141095812</b>
                    <div style="display: flex;align-items: center">
                        <div>
                            <div class="text item" style="margin: 0px 0px 6px;">
                                <router-link to="/userInfo" style="text-decoration: none;color: #000"><strong>{{ username }}</strong></router-link>
                            </div>
                            <div class="text item">
                                <router-link
                                        to="/userRecharge"
                                        style="text-decoration: none;color: #000"
                                        v-if="grade == '免费会员'"
                                ><strong>{{ grade }}</strong></router-link>
                                <router-link
                                        to="/userRecharge"
                                        style="text-decoration: none;color: red"
                                        v-else
                                ><strong>{{ grade }}</strong></router-link>
                            </div>
                        </div>
                        <el-dropdown router trigger="click" v-if="this.login">
                                <el-link :underline="false"><el-avatar :size="40" style="margin-left: 10px" src="https://pic3.zhimg.com/v2-ea115b92784802ce3dd9e4a945a912dd_r.jpg?source=1940ef5c"></el-avatar></el-link>

                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item icon="el-icon-s-promotion"><el-link :underline="false" @click="logout">退出登录</el-link></el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>

                </el-header>
<!--                <el-header style="text-align: right; font-size: 12px;box-shadow: rgb(0, 0, 0) 0px 1px 10px -7px;height: 30px!important;line-height: 30px!important;">-->
<!--                    <div style="float: left">-->
<!--                        <el-link :underline="false" type="success" @click="this.$router.push('/news')">首页</el-link>-->
<!--                    </div>-->
<!--                </el-header>-->

                <el-main>
                    <router-view :username="username" :email="email" :grade="grade" :phone="phone"></router-view>
                </el-main>
            </el-container>

        </el-container>
    </div>
</template>

<script>
    import logoIcon from "../assets/logo.png"
    import {mapGetters, mapMutations, mapState} from "vuex";

    export default {
        data() {
            return {
                isCollapse: false,
                width: '200',
                username: '',
                email: '',
                phone: '',
                grade: '',
                logo: logoIcon,
                shrinkC: 'shrinkLong'
            }
        },
        computed: {
            ...mapGetters(['login']),
            ...mapState(['token'])
        },
        created() {
            // console.log(this.$http.defaults.headers)
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
                                this.grade = "初级会员"
                                break;
                            case "middle":
                                this.grade = "中级会员"
                                break;
                            case "advanced":
                                this.grade = "高级会员"
                                break;
                            case "valued":
                                this.grade = "尊享会员"
                                break;
                        }
                    }else{
                        this.$error(res.data.code,res.data.message)
                    }
                })
            }
        },
        methods: {
            ...mapMutations(['clearToken', 'chageToken']),
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                // console.log(key, keyPath);
            },
            logout (){
                this.$http.get("/api/auth/logout")
                        .then((res) => {
                            if (res.data.code === 1000){
                                this.clearToken()
                                this.$router.push('/login')
                            } else {
                                this.$error(res.data.code,res.data.message)
                            }
                      })
            },
            shrink(){
                this.isCollapse = !this.isCollapse
                if (this.shrinkC == 'shrinkLong'){
                    this.shrinkC = 'shrinkShort'
                }else{
                    this.shrinkC = 'shrinkLong'
                }
                // if (this.$refs.app.getBoundingClientRect().x == 200){
                //     this.$refs.app.style.marginLeft = "64px";
                // } else if (this.$refs.app.getBoundingClientRect().x == 64){
                //     this.$refs.app.style.marginLeft = "200px";
                // }
            }
        }
    };
</script>

<style scoped>
    #app {
        /*margin-top: 60px;*/
        /*margin-left: 200px;*/
        padding: 0px;
    }
    .shrinkLong {
        margin-left: 200px;
        transition: all 300ms linear 0ms;
        -o-transition: all 300ms linear 0ms; /*兼容parsto内核*/
        -moz-transition: all 300ms linear 0ms; /*兼容gecko内核*/
        -webkit-transition: all 300ms linear 0ms; /*兼容webkit内核*/
    }
    .shrinkShort {
        margin-left: 64px;
        transition: all 300ms linear 0ms;
        -o-transition: all 300ms linear 0ms; /*兼容parsto内核*/
        -moz-transition: all 300ms linear 0ms; /*兼容gecko内核*/
        -webkit-transition: all 300ms linear 0ms; /*兼容webkit内核*/
    }
    /deep/ .el-tooltip {
        text-align: center;
    }
    .user-info /deep/ .el-menu-item {
        /*text-align: center!important;*/
    }
    .nav{
        /*position:fixed!important;*/
        /*top:0;*/
        /*left:0;*/
        /*right:2000;*/
        /*z-index:999;*/
    }
    .nav /deep/ .el-submenu {
        /*float: right!important;*/
    }

    .nav-left{
        background-color: #304156;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        position: fixed;
        left: 0;
    }

    b {
        font-size: 14px;
    }

    .fold {
        transition: all 300ms linear 0ms;
        -o-transition: all 300ms linear 0ms; /*兼容parsto内核*/
        -moz-transition: all 300ms linear 0ms; /*兼容gecko内核*/
        -webkit-transition: all 300ms linear 0ms; /*兼容webkit内核*/
    }

    .fold .iconfont, .unfold .iconfont{
        font-size: 24px;
        color: black;
    }

    .unfold {
        transform: rotateY(180deg);
        transition: all 300ms linear 0ms;
        -o-transition: all 300ms linear 0ms; /*兼容parsto内核*/
        -moz-transition: all 300ms linear 0ms; /*兼容gecko内核*/
        -webkit-transition: all 300ms linear 0ms; /*兼容webkit内核*/
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
        height: 100vh;
        color: #fff;
        /*box-shadow: rgb(128, 128, 128) 0px 0px 3px;*/
    }

    .scroll::-webkit-scrollbar {/*滚动条整体样式*/
        width: 6px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }

    .scroll::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        /*border-radius: 3px;*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #409EFF;
    }

    .scroll::-webkit-scrollbar-thumb:hover {/*滚动条里面小方块*/
        /*border-radius: 3px;*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #3e82c7
    }

    .scroll::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        /*border-radius: 3px;*/
        background: #fff;
    }

    /*.login-register .el-link--default{*/
    /*    color: white!important;*/
    /*}*/

    /*.login-register {*/
    /*    float: right;*/
    /*    width: 100px;*/
    /*    display: flex;*/
    /*    justify-content: space-around;*/
    /*}*/

    /deep/ .el-header {
        background-color: #fff;
        color: #333;
        line-height: 11px;
        height: 56px!important;
    }
    /deep/ .el-menu {
        color: #fff!important;
        background-color: #304156!important;
        border-right: 0px!important;
    }

    /deep/ .el-aside {
        color: #333;
    }

    .nav-left /deep/ .el-menu-item.is-active {
        background-color: #001234!important;
        border-left: #33A2EF solid 4px !important;
    }

    .nav-left .el-menu-item:hover {
        background-color: #001234!important;
        border-left: #33A2EF solid 4px !important;
        transition: all 100ms linear!important;
    }
    .nav-left /deep/ .el-submenu__title:hover {
        background-color: #001234!important;
        transition: all 100ms linear!important;
    }
    .nav-home {
        background-color: #001234;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    /deep/ .el-link--inner {
        /*height: 56px!important;*/
    }
    .header1 {
        text-align: center;
        font-size: 12px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
