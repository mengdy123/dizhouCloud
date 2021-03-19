import axios from 'axios'
const weatherInfo = {
  state: {
    weatherInfo: null,
    airInfo: null,
    warningInfo: []
  },
  actions: {
    getWeatherInfo ({ commit }, params) {
      axios.get('https://devapi.qweather.com/v7/weather/now?location=101020100&key=abb3c35aa85741999654c517c7d4d4e3')
        .then(res => {
          commit("GET_WEATHER_INFO", res.data.now);
          // console.log('%c getWeatherInfo', 'color:red', res)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getAirInfo ({ commit }, params) {
      axios.get('https://devapi.qweather.com/v7/air/now?location=101020100&key=abb3c35aa85741999654c517c7d4d4e3')
        .then(res => {
          commit("GET_AIR_INFO", res.data.now);
          // console.log('%c getAirInfo', 'color:red', res)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getWarningInfo ({ commit }, params) {
      axios.get('https://devapi.qweather.com/v7/warning/now?location=101020100&key=abb3c35aa85741999654c517c7d4d4e3')
        .then(res => {
          commit("GET_WARNING_INFO", res.data.warning);
          // console.log('%c getWarningInfo', 'color:red', res)
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  mutations: {
    GET_WEATHER_INFO (state, data) {
      state.weatherInfo = data
    },
    GET_AIR_INFO (state, data) {
      state.airInfo = data
    },
    GET_WARNING_INFO (state, data) {
      state.warningInfo = data
    },
  }
}

export default weatherInfo
