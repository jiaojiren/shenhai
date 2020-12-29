module.exports = {
  // 部署生产环境和开发环境下的URL。
  // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
  //例如 https://www.my-app.com/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 baseUrl 为 /my-app/。
  publicPath: process.env.NODE_ENV === 'development' ? '/' : process.env.VUE_APP_TITLE === 'production' ? '/' : '/',
  productionSourceMap: false,
  // outputDir: 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）
  outputDir: "dist",
  //用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: "assets",
  // chainWebpack: config => {
  //   config.resolve.alias
  //     .set("@", resolve("src"));
  // },

  devServer: {
    overlay: {
      warnings: false,
      errors: false
    },
    // host: 'klink.haier.net/mm',
    port: 8081,
    open: true, // 配置自动启动浏览器
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: {
      colors: true
    },
    // disableHostCheck: true,
    proxy: {
      // 匹配代理的url
      '/api': {
        // 目标服务器地址
        target: 'http://192.168.1.117:32680/api',
        // target: 'http://192.168.1.135:8080/zlzy',
        // target: 'http://localhost:8080/zlzy',
        // target: 'http://zlyypt.hoptest.haier.net:80/zlzy',
        // target: 'http://klink.haier.net/zlzy',
        // target: '/zlzy',
        secure: false,
        // 路径重写
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      },
    }
  },
  lintOnSave: false,
}