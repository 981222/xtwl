<template>
    <div id="app" ref="app">
        <el-container>
            <el-aside class="nav-left scroll" :width="width" v-if="this.login">
                <el-menu router text-color="#bbbbbb" :collapse="isCollapse"  class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">

                    <el-menu-item index="/news" class="nav-home" @click="this.$router.push('/news')">
                        <i class="el-icon-s-promotion" style="color: #fff;margin-right: 10px"></i>
                        <span slot="title"><strong>雄途网络系统</strong></span>
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

                    <div class="fold" ref="isCollapse" @click="isCollapseClick">
                        <i class="el-icon-s-operation" v-if="isCollapse"></i>
                        <i class="el-icon-s-operation" v-else=""></i>
                    </div>

<!--                    <el-breadcrumb separator="/">-->
<!--                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
<!--                        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>-->
<!--                        <el-breadcrumb-item>活动列表</el-breadcrumb-item>-->
<!--                        <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
<!--                    </el-breadcrumb>-->

                    <el-dropdown router trigger="click" v-if="this.login">
                        <el-link :underline="false"><el-avatar :size="40" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar></el-link>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="el-icon-s-promotion"><el-link :underline="false" @click="logout">退出登录</el-link></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>

                    <div class="login-register" v-else>
                        <el-link :underline="false" href="/login">登陆</el-link>
                        <el-link :underline="false" href="/register">注册</el-link>
                    </div>
                </el-header>
<!--                <el-header style="text-align: right; font-size: 12px;box-shadow: rgb(0, 0, 0) 0px 1px 10px -7px;height: 30px!important;line-height: 30px!important;">-->
<!--                    <div style="float: left">-->
<!--                        <el-link :underline="false" type="success" @click="this.$router.push('/news')">首页</el-link>-->
<!--                    </div>-->
<!--                </el-header>-->

                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>

        </el-container>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapState} from "vuex";

    export default {
        data() {
            return {
                isCollapse: false,
                width: '200',
            }
        },
        computed: {
            ...mapGetters(['login']),
            ...mapState(['token'])
        },
        created() {
            console.log(this.$http.defaults.headers)
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
                            }
                      })
            },
            isCollapseClick(){
                this.isCollapse =! this.isCollapse
                if (this.$refs.app.getBoundingClientRect().x == 200){
                    this.$refs.app.style.marginLeft = "64px";
                } else if (this.$refs.app.getBoundingClientRect().x == 64){
                    this.$refs.app.style.marginLeft = "200px";
                }

            }
        }
    };
</script>

<style scoped>
    #app {
        /*margin-top: 60px;*/
        margin-left: 200px;
        padding: 0px;
        transition: all 300ms linear 0ms;
        -o-transition: all 300ms linear 0ms; /*兼容parsto内核*/
        -moz-transition: all 300ms linear 0ms; /*兼容gecko内核*/
        -webkit-transition: all 300ms linear 0ms; /*兼容webkit内核*/
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

    .fold {
        float: left;
        font-size: 30px;
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
