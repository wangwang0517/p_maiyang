import axios from 'axios'
import store from '../store'
import { MessageBox } from 'element-ui'

const service = axios.create({
  baseURL: 'http://106.13.91.109:1234', // api 的 base_url
  withCredentials: false, // 跨域请求时发送 cookies
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  }
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers['Authorization'] = store.state.token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      //  401 未登录
      if (res.code === 401) {
        MessageBox.alert('你的登录信息已过期', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            store.dispatch('login').then(() => {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            })
          }
        })
      } else {
        MessageBox.alert(res.msg, '提示', {
          confirmButtonText: '确定'
        })
      }
      return Promise.reject(res.message || 'error')
    } else {
      return res
    }
  },
  error => {
    if (error.response) {
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
    }
    MessageBox.alert(error.response.data.msg, '提示', {
      confirmButtonText: '确定'
    })
    return Promise.reject(error)
  }
)

export default service
