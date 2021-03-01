
import axios from 'axios'
import Interceptor, {
  DUTY_URL
} from '@/http/axiosApi'
const home = {
  state: {
    homeIndexInfo: {}
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
  },
  mutations: {
    GET_HOME_INDEX_INFO (state, data) {
      state.homeIndexInfo = data
    },
  }
}

export default home
