const map2D = {
  state: {
    projectLayer: null,
    markerLayerData: {}
  },
  actions: {
    changeMarkerLayerData ({ commit, state }, params) {
      console.log('changeMarkerLayerData----params', params)
      // 保存流路径
      commit('CHANGE_MARKER_LAYER_DATA', params)
    },
  },
  mutations: {
    CHANGE_MARKER_LAYER_DATA (state, data) {
      state.markerLayerData = data
    },
  }
}

export default map2D
