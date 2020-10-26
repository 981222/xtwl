const path = require('path')

const resolve = dir => {
    return path.join(__dirname, dir)
}

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
    chainWebpack: config => {
        config.resolve.alias
            .set('~', resolve('src')) // key,value自行定义
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                @import "@/assets/style/index.less";
                `
            }
        }
    }
}
