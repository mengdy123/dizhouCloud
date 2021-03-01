import axios from 'axios'
import Interceptor, {
  GIS_URL, DUTY_URL, FILE_URL
} from '@/http/axiosApi'
import Cookies from 'js-cookie'
axios.defaults.timeout = 180000
console.log('-----DUTY_URL', DUTY_URL)
// http request 请求拦截器
const token = Cookies.get('token')
const resources = {
  // 地图服务
  GisMirror: axios.create({
    baseURL: GIS_URL,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': token
    }
  }),
  // 微服务
  DutyMirror: axios.create({
    baseURL: DUTY_URL,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': token
    }
  }),

  // 上传文件服务器
  FileMirror: axios.create({
    baseURL: FILE_URL,
    headers: {
      // 'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': token
    }
  }),
}
// http response 请求拦截器
resources.GisMirror.interceptors.response.use(response, error)
resources.DutyMirror.interceptors.response.use(response, error)
resources.FileMirror.interceptors.response.use(response, error)

function response (response) {
  return response
}
function error (error) {
  if (error.response.status === 401) {
    removeToken()
  }
  // 响应错误
  return Promise.reject(error)
}

function removeToken () {
  Cookies.remove('userCode')
  Cookies.remove('name')
  Cookies.remove('loginMode')
  Cookies.remove('regionId')
  Cookies.remove('regionQueryCode')
  Cookies.remove('orgId')
  Cookies.remove('orgName')
  Cookies.remove('orgQueryCode')
  Cookies.remove('userType')
  Cookies.remove('categoryId')
  Cookies.remove('personId')
  // Cookies.remove('token')
  // 存储本地
  localStorage.setItem('userAuthority', '')
  // 跳转到成功页面
  Cookies.remove('user')
  Cookies.remove('password')
  window.location.href = '/#/'
}

const InterceptorWithProgress = new Interceptor({ progress: true })

for (const key of Object.keys(resources)) {
  resources[key].interceptors.request.use(
    ...InterceptorWithProgress.beforeRequest
  )
  resources[key].interceptors.response.use(
    ...InterceptorWithProgress.afterResponse
  )
}
export const { GisMirror, DutyMirror } = resources
