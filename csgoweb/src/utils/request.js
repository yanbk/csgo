import axios from 'axios'
import { formData } from '@/utils/form.js'
// import { Message } from 'element-ui'
// import { store } from '@/store'
// import { getStorage } from '@/utils/storage'
// import { store } from '../store'

// create an axios instance
axios.defaults.withCredentials = true
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
      // const uid = store.state.user.csgoUid
      // const token = store.state.user.csgoToken
      // if (token) {
      //   config.headers['uid'] = uid
      //   config.headers['token'] = token
      // }
      if (config.method == 'post') {
        config.data = formData(config.data)
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

