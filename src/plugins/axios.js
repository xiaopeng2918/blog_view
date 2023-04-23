import axios from "axios";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const request = axios.create({
  baseURL: 'https://yxp291.top:8090',
  timeout: 10000,
})

// 请求拦截
request.interceptors.request.use(
  config => {
    NProgress.start()
    const identification = window.localStorage.getItem('identification')
    // //identification存在，且是基于baseURL的请求
    // /*
    // 在这个示例代码中，只有请求 URL 不以 "http://" 或 "https://" 开头的请求才会将 identification 标识添加到请求头中。这是因为 "http://" 或 "https://" 开头的 URL 通常是跨域请求的地址，而跨域请求需要通过 CORS（跨域资源共享）来进行安全控制。在 CORS 中，浏览器会发送预检请求（Preflight Request）来检查服务器是否支持跨域请求，并在预检请求中包含一些请求头部信息（例如 Origin 和 Content-Type）。如果在预检请求中也包含了 identification 标识，可能会导致跨域请求失败或被拒绝。因此，只有在不涉及跨域请求的情况下，才将 identification 标识添加到请求头中。
    // */
    // if (identification && !(config.url.startsWith('http://') || config.url.startsWith('https://'))) {
    //     config.headers.identification = identification
    // }
    return config
  }
)

// 响应拦截
request.interceptors.response.use(
  config => {
    NProgress.done()
    const identification = config.headers.identification
    if (identification) {
      //保存身份标识到localStorage
      window.localStorage.setItem('identification', identification)
    }
    return config.data
  }
)

export default request