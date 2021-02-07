const map2D = {
  state: {
    projectLayerData: null,
    markerLayerData: null,
    scaleData: 0,
    showVideoStatus: null,
    countryInfo: '',
    provinceInfo: '',
    cityInfo: '',
    districtInfo: '',
    addressInfo: [],
    municipalityList: ['110000', '310000', '500000', '120000']
  },
  actions: {
    changeMarkerLayerData ({ commit, state }, params) {
      // 保存流路径
      commit('CHANGE_MARKER_LAYER_DATA', params)
    },
    changeProjectData ({ commit, state }, params) {
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
      console.log('SAVE_ADDRESS_INFO', data)
      state.addressInfo = data
    }
  }
}

export default map2D
