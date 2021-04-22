/**
 * @description: 
 * @param {*}
 * @return {*}
 * @author: mandy
 */
import nprogress from 'nprogress'
import Cookies from 'js-cookie'
import { message } from 'element-ui'
import Vue from 'vue'
Vue.prototype.$message = message

class Interceptor {
  constructor(
    {
      progress = false,
      configure = {},
      beforeRequest = [],
      afterResponse = []
    } = {}
  ) {
    progress && this.progressInit(configure)

    this.beforeRequest = [
      config => {
        // config.headers.Authorization = Cookies.get('token')
        progress && this.progressStart()
        if (beforeRequest[0]) {
          beforeRequest[0](config)
        } else {
          return config
        }
      },
      error => {
        progress && this.progressStop()
        if (beforeRequest[1]) {
          beforeRequest[1](error)
        } else {
          return Promise.reject(error)
        }
      }
    ]

    this.afterResponse = [
      response => {
        progress && this.progressStop()
        if (afterResponse[0]) {
          afterResponse[0](response)
        } else {
          if (response.data.code !== 200) {
            const error = response.data.message || response.data.serviceMessage
            Vue.prototype.$message({
              type: 'error',
              message: error
            })
            return Promise.reject(error)
          } else {
            return response
          }
        }
      },
      ...error => {
        progress && this.progressStop()
        if (afterResponse[1]) {
          afterResponse[1](error)
        } else {
          return Promise.reject(error)
        }
      }
    ]
  }

  progressStart () {
    nprogress.start()
  }

  progressStop () {
    nprogress.done()
  }

  progressInit (configure) {
    nprogress.configure({
      showSpinner: false,
      ...configure
    })
  }
}

let DUTY_URL
let GIS_URL
let FILE_URL
switch (process.env.NODE_ENV) {
  case 'production':
    // 项目现场配置
    DUTY_URL = 'http://192.168.124.43:8080/'
    GIS_URL = '' // 四维
    FILE_URL = ''

    break
  case 'selfTest':
    // 公司测试配置
    DUTY_URL = 'http://106.15.77.69:8080/'
    GIS_URL = '' // 四维
    FILE_URL = ''
    break
  default:
    DUTY_URL = 'http://192.168.124.43:8080/'
    GIS_URL = '' // 四维
    FILE_URL = ''
    break
}
export { FILE_URL, GIS_URL, DUTY_URL }

export default Interceptor
