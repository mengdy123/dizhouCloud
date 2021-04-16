import systemLayout from '../../views/system'
const system = {
  state: {
    menuStatus: false,
    menuList: [
      {
        name: "项目中心",
        index: "project",
        icon: "01",
        children: [
          {
            name: "项目管理",
            index: "project-1",
            icon: "el-icon-menu",
            path: '/system',
            children: []
          },
          {
            name: "客户管理",
            index: "project-2",
            icon: "el-icon-menu",
            path: '/clientManage',
            children: []
          },
          {
            name: "行业管理",
            index: "project-3",
            icon: "el-icon-menu",
            path: '/industryManage',
            children: []
          }
        ]
      },
      {
        name: "运维中心",
        index: "operation",
        icon: "04",
        children: [
          {
            name: "设备运维",
            index: "operation-1",
            icon: "el-icon-menu",
            path: '',
            children: [
              {
                name: "设备管理",
                index: "operation-1-1",
                icon: "el-icon-menu",
                path: '/setManage',
                children: []
              },
              {
                name: "故障类型管理",
                index: "operation-1-2",
                path: '/breakdownManage',
                icon: "el-icon-menu",
                children: []
              },
            ]
          },
          {
            name: "运维职责管理",
            index: "operation-2",
            path: '/maintainDutyManage',
            icon: "el-icon-menu",
            children: []
          },
          {
            name: "工单管理",
            index: "operation-3",
            path: '/workOrderManage',
            icon: "el-icon-menu",
            children: []
          },
          {
            name: "运维消息推送",
            index: "operation-4",
            icon: "el-icon-menu",
            path: '',
            children: [
              {
                name: "信息模板",
                index: "operation-4-1",
                icon: "el-icon-menu",
                path: '/informationTemplate',
                children: []
              },
              {
                name: "历史信息",
                index: "operation-4-2",
                path: '/informationHistory',
                icon: "el-icon-menu",
                children: []
              },
            ]
          },
          {
            name: "运维日志管理",
            index: "operation-5",
            path: '/logsManage',
            icon: "el-icon-menu",
            children: []
          },
          {
            name: "满意度考评",
            index: "operation-6",
            icon: "el-icon-menu",
            path: '/evaluation',
            children: []
          }
        ]
      },
      {
        name: "产品中心",
        index: "product",
        icon: "02",
        children: [
          {
            name: "智能设备",
            index: "product-1",
            icon: "el-icon-menu",
            path: '/smartSet',
            children: []
          },
          {
            name: "智能系统",
            index: "product-2",
            icon: "el-icon-menu",
            path: '/smartSystem',
            children: []
          }
        ]
      },
      {
        name: "系统中心",
        index: "system",
        icon: "03",
        children: [
          {
            name: "部门管理",
            index: "system-4",
            path: '/departManage',
            icon: "el-icon-menu",
            children: []
          },
          {
            name: "用户管理",
            index: "system-1",
            icon: "el-icon-menu",
            path: '/userManage',
            children: []
          },
          {
            name: "角色管理",
            index: "system-2",
            path: '/roleManage',
            icon: "el-icon-menu",
            children: []
          },
          {
            name: "权限管理",
            index: "system-3",
            path: '/powerManage',
            icon: "el-icon-menu",
            children: []
          },

        ]
      },

    ],
    detailInfo: {},
    editStatus: false,
    projectList: [],
    systemList: [],
    projectAddress: null
  },
  actions: {
    changeMenuStatus ({ commit, state }, params) {
      commit('CHANGE_MENU_STATUS', params)
    },
    saveDetailInfo ({ commit, state }, params) {
      commit('SAVE_DETAIL_INFO', params)
    },
    changeEditStatus ({ commit, state }, params) {
      commit('CHANGE_EDIT_STATUS', params)
    },
    saveProjectList ({ commit, state }, params) {
      commit('SAVE_PROJECT_LIST', params)
    },
    saveSystemList ({ commit, state }, params) {
      commit('SAVE_SYSTEM_LIST', params)
    },
    saveProjectAddress ({ commit, state }, params) {
      commit('SAVE_PROJECT_ADDRESS', params)
    }

  },
  mutations: {
    CHANGE_MENU_STATUS (state, data) {
      state.menuStatus = data
    },
    SAVE_DETAIL_INFO (state, data) {
      state.detailInfo = data
    },
    CHANGE_EDIT_STATUS (state, data) {
      state.editStatus = data
    },
    SAVE_PROJECT_LIST (state, data) {
      state.projectList = data
    },
    SAVE_SYSTEM_LIST (state, data) {
      state.systemList = data
    },
    SAVE_PROJECT_ADDRESS (state, data) {
      state.projectAddress = data
    }
  }
}

export default system
