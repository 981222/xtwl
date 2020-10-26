export default [
    {
        path: '/',
        name: 'xt',
        component: () => import('~/views/login')
    },
    {
        path: '/login',
        name: '登陆',
        component: () => import('~/views/login')
    },
    {
        path: '/changePass',
        name: '修改密码',
        component: () => import('~/views/changePass')
    },
    {
        path: '/register',
        name: '注册',
        component: () => import('~/views/register')
    },
    {
        path: '/new',
        name: '公告信息',
        component: () => import('~/views/index'),
        icon: 'el-icon-s-home',
        children: [
            {
                path: '/news',
                name: '公告',
                component: () => import('~/views/news')
            },
        ]
    },
    {
        path: '/img',
        name: '图片操作',
        component: () => import('~/views/index'),
        redirect: '/brand',
        icon: 'el-icon-picture',
        meta: { requireAuth: true, keepAlive: true },
        show: true,
        children: [
            {
                path: '/brand',
                name: '图片获取',
                component: () => import('~/views/imageHandler/Brand')
            },
            {
                path: '/design',
                name: '图片模板',
                component: () => import('~/views/design/index')
            },
        ]
    },
    {
        path: '/user',
        name: '图片管理',
        component: () => import('~/views/index'),
        redirect: '/downloadedImg',
        show: true,
        icon: 'el-icon-s-grid',
        meta: { requireAuth: true, keepAlive: true },
        children: [
            {
                path: '/downloadedImg',
                name: '图库',
                component: () => import('~/views/imageManage/downloadedImg')
            },
        ]
    },
    {
        path: '/user',
        name: '用户管理',
        component: () => import('~/views/index'),
        redirect: '/userInfo',
        show: true,
        icon: 'el-icon-s-custom',
        children: [
            {
                path: '/userInfo',
                name: '个人信息',
                component: () => import('~/views/user/userInfo')
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
                component: () => import('~/views/user/userRecharge')
            },
        ]
    },
    {
        path: '/dataNalysis',
        name: '数据分析',
        component: () => import('~/views/index'),
        redirect: '/data',
        show: true,
        icon: 'el-icon-s-data',
        children: [
            {
                path: '/data',
                name: '表格分析',
                component: () => import('~/views/dataAnalysis/data')
            },
        ]
    },
    {
        path: '/videos',
        name: '视频教程',
        component: () => import('~/views/index'),
        redirect: '/videoTutorial',
        show: true,
        icon: 'el-icon-video-camera-solid',
        children: [
            {
                path: '/videoTutorial',
                name: '操作视频',
                component: () => import('~/views/videos/videoTutorial')
            },
        ]
    },
]