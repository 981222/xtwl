import Vue from 'vue'
import VueRouter from 'vue-router'
import VideoTutorial from '../views/videos/videoTutorial'
import Brand from '../views/imageHandler/Brand.vue'
import Index from '../views/index.vue'
import Design from '../views/design/index.vue'
import UserInfo from '../views/user/userInfo.vue'
import ChangePass from '../views/changePass.vue'
import WaterMark from '../views/user/waterMark.vue'
import ImageTemplate from '../components/image/imageTemplate'
import Login from '../views/login.vue'
import Register from '../views/register.vue'
import AddItem from '../views/taoBaoItem/index.vue'
import UserLog from '../views/user/userLog.vue'
import Home from '../views/home.vue'
import Data from '../views/dataAnalysis/data.vue'
import UserRecharge from '../views/user/userRecharge.vue'
import DownloadedImg from '../views/imageManage/downloadedImg.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL + 'xt',
  routes: [
    {
      path: '/',
      name: 'xt',
      component: Login
    },
    {
      path: '/login',
      name: '登陆',
      component: Login
    },
    {
      path: '/changePass',
      name: '修改密码',
      component: ChangePass
    },
    {
      path: '/register',
      name: '注册',
      component: Register
    },
    {
      path: '/home',
      name: '公告信息',
      component: Index,
      icon: 'el-icon-s-home',
      children: [
        {
          path: '/home',
          name: '公告',
          component: Home
        },
      ]
    },
    {
      path: '/img',
      name: '图片操作',
      component: Index,
      redirect: '/brand',
      icon: 'el-icon-picture',
      meta: { requireAuth: true, keepAlive: true },
      show:true,
      children: [
        {
          path: '/brand',
          name: '图片获取',
          component: Brand
        },
        {
          path: '/design',
          name: '图片模板',
          component: Design
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
      meta: { requireAuth: true, keepAlive: true },
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
        // {
        //   path: '/userLog',
        //   name: '操作日志',
        //   component: UserLog
        // },
        {
          path: '/userRecharge',
          name: '雄途会员',
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
    {
      path: '/add',
      name: '商家管理',
      component: Index,
      redirect: '/addItem',
      show: true,
      icon: 'el-icon-s-shop',
      children: [
        {
          path: '/addItem',
          name: '商品发布',
          component: AddItem,
        },
      ]
    },
    {
      path: '/videos',
      name: '视频教程',
      component: Index,
      redirect: '/videoTutorial',
      show: true,
      icon: 'el-icon-video-camera-solid',
      children: [
        {
          path: '/videoTutorial',
          name: '操作视频',
          component: VideoTutorial,
        },
      ]
    },
  ]
})

router.beforeEach((to, form, next) => {
  if (to.path === '/login' || to.path === '/' || to.path === '/register' || to.path === '/changePass') return next()
  const token = localStorage.getItem("token")
  if (!token) return next('/login')
  next()
})

export default router