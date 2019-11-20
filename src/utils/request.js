import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 20000
})

// 请求拦截
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    console.log('请求错误:' + error)
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 0) {
      if (res.errmsg === '请勿重复登陆') {
        // 重复登录处理
        return Promise.resolve({ authentication: '123' })
      }
      Message({
        message: res.errmsg || '',
        type: 'error',
        duration: 5 * 1000
      })
      if (res.code === 2) {
        MessageBox.confirm('登录超时，您可以取消继续停留在此页或再次登录', '确认退出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      if (res.data) {
        return Promise.resolve(res.data)
      }
    }
  },
  error => {
    if (error.message.indexOf('timeout') > -1) {
      // 请求超时提示
      Message({
        message: '请求超时',
        type: 'error',
        duration: 2 * 1000
      })
    } else {
      return Promise.reject(error)
    }
  }
)

// form-data提交
service.form = obj => {
  const formData = new FormData()
  Object.keys(obj)
    .filter(key => Boolean(obj[key]) || (obj[key] !== null && +obj[key] === -obj[key]))
    .forEach(key => formData.append(key, obj[key] === undefined ? '' : obj[key]))
  return formData
}

export default service
