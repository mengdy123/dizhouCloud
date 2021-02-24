const map2D = {
  state: {
    projectLayerData: null,
    markerLayerData: null,
    scaleData: 0,
    showVideoStatus: null,
    addressInfo: [],
    municipalityList: ['110000', '310000', '500000', '120000'],
    provinceSelectData: null,
    citySelectData: null,
    countySelectData: null,
  },
  actions: {
    changeMarkerLayerData ({ commit, state }, params) {
      // console.log('params', params)
      // 保存流路径
      commit('CHANGE_MARKER_LAYER_DATA', params)
    },
    changeProjectData ({ commit, state }, params) {
      console.log('changeProjectData', params)
      commit('CHANGE_PROJECT_DATA', params)
    },
    saveScaleData ({ commit, state }, params) {
      commit('SAVE_SCALE_DATA', params)
    },
    changeVideoStatus ({ commit, state }, data) {
      commit('CHANGE_VIDEO_STATUS', data)
    },
    saveAddressInfo ({ commit, state }, data) {
      commit('SAVE_ADDRESS_INFO', data)
    },
    saveProvinceSelectData ({ commit, state }, data) {
      console.log('省', data)
      commit('SAVE_PROVINCE_SELECT', data)
    },
    saveCitySelectData ({ commit, state }, data) {
      console.log('市', data)
      commit('SAVE_CITY_SELECT', data)
    },
    saveCountySelectData ({ commit, state }, data) {
      console.log('区', data)
      commit('SAVE_COUNTY_SELECT', data)
    },


  },
  mutations: {
    CHANGE_MARKER_LAYER_DATA (state, data) {
      state.markerLayerData = data
    },
    CHANGE_PROJECT_DATA (state, data) {
      state.projectLayerData = data
    },
    SAVE_SCALE_DATA (state, data) {
      state.scaleData = data
    },
    CHANGE_VIDEO_STATUS (state, data) {
      state.showVideoStatus = data
    },
    SAVE_ADDRESS_INFO (state, data) {
      // console.log('SAVE_ADDRESS_INFO', data)
      state.addressInfo = data
    },
    SAVE_PROVINCE_SELECT (state, data) {
      // console.log('SAVE_ADDRESS_INFO', data)
      state.provinceSelectData = data
    },
    SAVE_CITY_SELECT (state, data) {
      // console.log('SAVE_ADDRESS_INFO', data)
      state.citySelectData = data
    },
    SAVE_COUNTY_SELECT (state, data) {
      console.log('countySelectData', data)
      state.countySelectData = data
    },

  }
}

export default map2D
