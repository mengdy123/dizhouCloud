const system = {
  state: {
    menuStatus: false,
    menuList: [
      {
        name: "项目中心",
        index: "project",
        icon: "el-icon-menu",
        children: [
          {
            name: "项目管理",
            index: "project-1",
            icon: "el-icon-menu",
            children: []
          },
          {
            name: "客户管理",
            index: "project-2",
            icon: "el-icon-menu",
            children: []
          },
          {
            name: "行业管理",
            index: "project-3",
            icon: "el-icon-menu",
            children: []
          }
        ]
      },
      {
        name: "产品中心",
        index: "product",
        icon: "el-icon-menu",
        children: [
          {
            name: "硬件管理",
            index: "product-1",
            icon: "el-icon-menu",
            children: []
          },
          {
            name: "系统管理",
            index: "product-2",
            icon: "el-icon-menu",
            children: []
          }
        ]
      },
      {
        name: "系统中心",
        index: "system",
        icon: "el-icon-menu",
        children: [
          {
            name: "角色管理",
            index: "system-1",
            icon: "el-icon-menu",
            children: []
          },
          {
            name: "权限管理",
            index: "system-2",
            icon: "el-icon-menu",
            children: []
          },
          // {
          //   name: "部门管理",
          //   index: "system-3",
          //   icon: "el-icon-menu",
          //   children: []
          // },
          {
            name: "用户管理",
            index: "system-4",
            icon: "el-icon-menu",
            children: []
          }
        ]
      },
    ]
  },
  actions: {
    changeMenuStatus ({ commit, state }, params) {
      commit('CHANGE_MENU_STATUS', params)
    },

  },
  mutations: {
    CHANGE_MENU_STATUS (state, data) {
      state.menuStatus = data
    },
  }
}

export default system
