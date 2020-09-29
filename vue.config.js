module.exports = {
    publicPath: "./",
    devServer: {
        port: 8761,
        proxy: {
            "/api": {
                target: 'http://39.108.238.173:8080',
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            },
        }
    },
    // chainWebpack: config => {
    //     // 其他配置
    //     config.entry('main').add('babel-polyfill') // main是入口js文件
    //     // 其他配置
    // }
    css: {
        loaderOptions: {
            sass: {
                data: `
                @import "@/assets/scss/style.scss";
                `
            }
        }
    }
}
