import axios from 'axios'


var showTips = true

class HttpRequest {
  constructor(publicPath = baseURL) {
    this.publicPath = publicPath
    this.queue = {}
  }
  getInsideConfig() {
    const config = {
      baseURL: this.publicPath,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        // 'Authorization': 'BasicAuth' + localStorage.getItem('token')
      }
    }
    return config
  }
  destroy(url) {
    delete this.queue[url]
  }
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      this.queue[url] = true
      return config
    }, error => {
      console.log(error)
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const {
        data
      } = res
      if (res.data.code == 1007) {
        // mutation.logout()
        router.replace({
          name: 'Index'
        })
        return data
      } else if (res.data.code === 405) {
        // router.replace({
        //   name: 'error401'
        // })
      }
      return data
    }, error => {
      console.log(error)
      // mutation.setLoadingFalse()
      this.destroy(url)
      if (error.response.status) {
        switch (error.response.status) {
          // 401: 未登录
          // 未登录则跳转登录页面，并携带当前页面的路径
          // 在登录成功后返回当前页面，这一步需要在登录页操作。
          // case 302:
          //   window.location.href=
          //   break

          // 403 token过期
          // 登录过期对用户进行提示
          // 清除本地token和清空vuex中token对象
          // 跳转登录页面
          case 403:
            Message.error({
              content: '403待处理',
              duration: 3
            })
            // // 清除token
            // localStorage.removeItem('token');
            // store.commit('loginSuccess', null);
            // // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
            // setTimeout(() => {
            //   router.replace({
            //     path: '/login',
            //     query: {
            //       redirect: router.currentRoute.fullPath
            //     }
            //   });
            // }, 1000);
            break

            // 404请求不存在
          case 404:
            Message.error({
              content: '请求接口不存在',
              duration: 3
            })
            break
            // 500系统异常
          case 500:
            if (showTips) {
              showTips = false
              Message.info({
                content: "系统繁忙，请稍后再试",
                duration: 3
              })
              setTimeout(function () {
                showTips = true;
              }, 3000);
            }
            break
            // 其他错误，直接抛出错误提示
          default:
            console.log(error)
            Message.error({
              content: error.response.data.message,
              duration: 10
            })
        }
        return Promise.reject(error)
      }
    })
  }
  request(options) {
    // axios.default.timeout = 5000;
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest