import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/index/home.vue'
// import Adidas from '../views/adidas.vue'
import Brand from '../views/imageHandler/Brand.vue'
// import Tianma from '../views/tianma.vue'
import Index from '../views/index.vue'
import UserInfo from '../views/user/userInfo.vue'
import WaterMark from '../views/user/waterMark.vue'
import Login from '../views/login.vue'
import Register from '../views/register.vue'
import UserLog from '../views/user/userLog.vue'
import News from '../views/news.vue'
import Data from '../views/dataAnalysis/data.vue'
import UserRecharge from '../views/user/userRecharge.vue'
import DownloadedImg from '../views/imageManage/downloadedImg.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home
    },
    {
      path: '/login',
      name: '登陆',
      component: Login
    },
    {
      path: '/register',
      name: '注册',
      component: Register
    },
    {
      path: '/new',
      name: '公告信息',
      component: Index,
      icon: 'el-icon-s-home',
      children: [
        {
          path: '/news',
          name: '公告',
          component: News
        },
      ]
    },
    {
      path: '/img',
      name: '图片操作',
      component: Index,
      redirect: '/brand',
      icon: 'el-icon-picture',
      show:true,
      children: [
        {
          path: '/brand',
          name: '图片获取',
          component: Brand
        },
      ]
    },
    {
      path: '/user',
      name: '图片管理',
      component: Index,
      redirect: '/downloadedImg',
      show:true,
      icon: 'el-icon-s-grid',
      children: [
        {
          path: '/downloadedImg',
          name: '图库',
          component: DownloadedImg
        },
      ]
    },
    {
      path: '/user',
      name: '用户管理',
      component: Index,
      redirect: '/userInfo',
      show:true,
      icon: 'el-icon-s-custom',
      children: [
        {
          path: '/userInfo',
          name: '个人信息',
          component: UserInfo
        },
        // {
        //   path: '/waterMark',
        //   name: '水印设置',
        //   component: WaterMark
        // },
        {
          path: '/userLog',
          name: '操作日志',
          component: UserLog
        },
        {
          path: '/userRecharge',
          name: '充值中心',
          component: UserRecharge
        },
      ]
    },
    {
      path: '/dataNalysis',
      name: '数据分析',
      component: Index,
      redirect: '/data',
      show: true,
      icon: 'el-icon-s-data',
      children: [
        {
          path: '/data',
          name: '表格分析',
          component: Data,
        },
      ]
    },
  ]
})

router.beforeEach((to, form, next) => {
  if (to.path === '/login' || to.path === '/' || to.path === '/register') return next()
  const token = localStorage.getItem("token")
  if (!token) return next('/login')
  next()
})

export default router