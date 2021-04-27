import systemLayout from '../../views/system'
const system = {
  state: {
    menuStatus: false,
    menuList: [
      {
        menuName: "项目中心",
        text: "project",
        icon: "01",
        id: '1',
        childrenMenu: [
          {
            menuName: "项目管理",
            text: "project-1",
            icon: "el-icon-menu",
            url: '/project',
            id: '1.1',
            parentId: '1',
            childrenMenu: []
          },
          {
            menuName: "客户管理",
            text: "project-2",
            icon: "el-icon-menu",
            url: '/clientManage',
            id: '1.2',
            parentId: '1',
            childrenMenu: []
          },
          {
            menuName: "行业管理",
            text: "project-3",
            icon: "el-icon-menu",
            url: '/industryManage',
            id: '1.3',
            parentId: '1',
            childrenMenu: []
          },
          {
            menuName: "项目分布",
            text: "project-4",
            icon: "el-icon-menu",
            url: '/distribute',
            id: '1.4',
            parentId: '1',
            childrenMenu: []
          },
        ]
      },
      {
        menuName: "运维中心",
        text: "operation",
        icon: "04",
        id: '2',
        childrenMenu: [
          {
            menuName: "设备运维",
            text: "operation-1",
            icon: "el-icon-menu",
            url: '',
            id: '2.1',
            parentId: '2',
            childrenMenu: [
              {
                menuName: "设备管理",
                text: "operation-1-1",
                icon: "el-icon-menu",
                url: '/setManage',
                id: '2.1.1',
                parentId: '2.1',
                childrenMenu: []
              },
              {
                menuName: "故障类型管理",
                text: "operation-1-2",
                url: '/breakdownManage',
                icon: "el-icon-menu",
                id: '2.1.2',
                parentId: '2.1',
                childrenMenu: []
              },
            ]
          },
          {
            menuName: "运维职责管理",
            text: "operation-2",
            url: '/maintainDutyManage',
            icon: "el-icon-menu",
            id: '2.2',
            parentId: '2',
            childrenMenu: []
          },
          {
            menuName: "工单管理",
            text: "operation-3",
            url: '/workOrderManage',
            icon: "el-icon-menu",
            id: '2.3',
            parentId: '2',
            childrenMenu: []
          },
          {
            menuName: "运维消息推送",
            text: "operation-4",
            icon: "el-icon-menu",
            id: '2.4',
            parentId: '2',
            url: '',
            childrenMenu: [
              {
                menuName: "信息模板",
                text: "operation-4-1",
                icon: "el-icon-menu",
                url: '/informationTemplate',
                id: '2.4.1',
                parentId: '2.4',
                childrenMenu: []
              },
              {
                menuName: "历史信息",
                text: "operation-4-2",
                url: '/informationHistory',
                icon: "el-icon-menu",
                id: '2.4.2',
                parentId: '2.4',
                childrenMenu: []
              },
            ]
          },
          {
            menuName: "运维日志管理",
            text: "operation-5",
            url: '/logsManage',
            icon: "el-icon-menu",
            id: '2.5',
            parentId: '2',
            childrenMenu: []
          },
          {
            menuName: "满意度考评",
            text: "operation-6",
            icon: "el-icon-menu",
            url: '/evaluation',
            id: '2.6',
            parentId: '2',
            childrenMenu: []
          }
        ]
      },
      {
        menuName: "产品中心",
        text: "product",
        icon: "02",
        id: '3',
        childrenMenu: [
          {
            menuName: "智能设备",
            text: "product-1",
            icon: "el-icon-menu",
            url: '/smartSet',
            id: '3.1',
            parentId: '3',
            childrenMenu: []
          },
          {
            menuName: "智能系统",
            text: "product-2",
            icon: "el-icon-menu",
            url: '/smartSystem',
            id: '3.2',
            parentId: '3',
            childrenMenu: []
          }
        ]
      },
      {
        menuName: "系统中心",
        text: "system",
        icon: "03",
        id: '4',
        childrenMenu: [
          {
            menuName: "部门管理",
            text: "system-4",
            url: '/departManage',
            icon: "el-icon-menu",
            id: '4.1',
            parentId: '4',
            childrenMenu: []
          },
          {
            menuName: "用户管理",
            text: "system-1",
            icon: "el-icon-menu",
            url: '/userManage',
            id: '4.2',
            parentId: '4',
            childrenMenu: []
          },
          {
            menuName: "角色管理",
            text: "system-2",
            url: '/roleManage',
            icon: "el-icon-menu",
            id: '4.3',
            parentId: '4',
            childrenMenu: []
          },
          {
            menuName: "权限管理",
            text: "system-3",
            id: '4.4',
            parentId: '4',
            url: '/powerManage',
            icon: "el-icon-menu",
            childrenMenu: []
          },

        ]
      },

    ],
    detailInfo: {},
    editStatus: false,
    projectList: [],
    systemList: [],
    projectAddress: null,
    failTypeList: [], //故障类型
    maintainPersonList: [], // 维修人员
    approvePersonList: [],  //审批人员
    companyList: [], // 客户列表
    powerList: [],  // 权限列表
    departmentList: [], //部门列表
    jobList: [], // 职务列表
    roleList: [], //角色列表
    deviceTypeList: [], // 设备类型管理
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
    },
    saveFailTypeList ({ commit, state }, params) {
      commit('SAVE_FAIL_TYPE_LIST', params)
    },
    saveMaintainPersonList ({ commit, state }, params) {
      commit('SAVE_MAINTAIN_PERSON_LIST', params)
    },
    saveApprovePersonList ({ commit, state }, params) {
      commit('SAVE_APPROVE_PERSON_LIST', params)
    },
    saveCompanyList ({ commit, state }, params) {
      commit('SAVE_COMPANY_LIST', params)
    },
    savePowerList ({ commit, state }, params) {
      commit('SAVE_POWER_LIST', params)
    },
    saveRoleList ({ commit, state }, params) {
      commit('SAVE_ROLE_LIST', params)
    },
    saveDeviceTypeList ({ commit, state }, params) {
      commit('SAVE_DEVICE_TYPE_LIST', params)
    },


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
    },
    SAVE_FAIL_TYPE_LIST (state, data) {
      state.failTypeList = data
    },
    SAVE_MAINTAIN_PERSON_LIST (state, data) {
      state.maintainPersonList = data
    },
    SAVE_APPROVE_PERSON_LIST (state, data) {
      state.approvePersonList = data
    },
    SAVE_COMPANY_LIST (state, data) {
      state.companyList = data
    },
    SAVE_POWER_LIST (state, data) {
      state.powerList = data
    },
    SAVE_ROLE_LIST (state, data) {
      state.roleList = data
    },
    SAVE_DEVICE_TYPE_LIST (state, data) {
      state.deviceTypeList = data
    },



  }
}

export default system
