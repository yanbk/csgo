import axios from 'axios'
// import { Message } from 'element-ui'
import { store } from '@/store'
// import { getStorage } from '@/utils/storage'
// import { store } from '../store'

// create an axios instance
export const apiService = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 100000 // request timeout
})
export const passportService = axios.create({
  baseURL: process.env.VUE_APP_PASSPORT_API, // url = base url + request url
  timeout: 100000 // request timeout
})
export const payService = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 100000 // request timeout
})

setService(apiService)
setService(passportService)
setService(payService)


function setService(service) {
  service.interceptors.request.use(
    config => {
      const token = store.state.user.token
      if (token) {
        config.headers['token'] = token
      }
      return config
    },
    error => {
      console.log(error)
      return Promise.reject(error)
    }
  )
  service.interceptors.response.use(
    response => {
      const res = response.data
      return res
    },
    error => {
      console.log('err' + error) // for debug
      return Promise.reject(error)
    }
  )
}

