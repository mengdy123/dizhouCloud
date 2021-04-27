const user = {
  state: {
    userInfo: {}
  },
  actions: {
    saveUserInfo ({ commit, state }, params) {
      commit('SAVE_USER_INFO', params)
    },
  },
  mutations: {
    SAVE_USER_INFO (state, data) {
      state.userInfo = data
    },
  }
}

export default user
