
import axios from 'axios'
import Interceptor, {
  DUTY_URL
} from '@/http/axiosApi'
const home = {
  state: {
    homeIndexInfo: {},
    sceneInfo: {},

  },
  actions: {
    // this.$store.dispatch('getHomeIndexInfo')
    getHomeIndexInfo ({ commit }, params) {
      // console.log('params', params)
      axios.get(`${DUTY_URL}home/getHomeinfo?country=${params.country}&province=${params.province}&city=${params.city}&county=${params.county}`)
        .then(res => {
          commit("GET_HOME_INDEX_INFO", res.data.result);
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getProjectsum ({ commit }, params) {
      // console.log('params', params)
      axios.get(`${DUTY_URL}/projectinfo/getProjectsum?projectId=${params}`)
        .then(res => {
          commit("GET_PROJECT_SUM", res.data.result);
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  mutations: {
    GET_HOME_INDEX_INFO (state, data) {
      state.homeIndexInfo = data
    },
    GET_PROJECT_SUM (state, data) {
      state.sceneInfo = data
    },
  }
}

export default home
