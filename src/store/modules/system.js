import systemLayout from '../../views/system'
const system = {
  state: {
    menuStatus: false,
    menuList: [
      {
        name: "项目中心",
        index: "project",
        icon: "01",
        id: '1',
        children: [
          {
            name: "项目管理",
            index: "project-1",
            icon: "el-icon-menu",
            path: '/project',
            id: '1.1',
            parentId: '1',
            children: []
          },
          {
            name: "客户管理",
            index: "project-2",
            icon: "el-icon-menu",
            path: '/clientManage',
            id: '1.2',
            parentId: '1',
            children: []
          },
          {
            name: "行业管理",
            index: "project-3",
            icon: "el-icon-menu",
            path: '/industryManage',
            id: '1.3',
            parentId: '1',
            children: []
          },
          {
            name: "项目分布",
            index: "project-4",
            icon: "el-icon-menu",
            path: '/distribute',
            id: '1.4',
            parentId: '1',
            children: []
          },
        ]
      },
      {
        name: "运维中心",
        index: "operation",
        icon: "04",
        id: '2',
        children: [
          {
            name: "设备运维",
            index: "operation-1",
            icon: "el-icon-menu",
            path: '',
            id: '2.1',
            parentId: '2',
            children: [
              {
                name: "设备管理",
                index: "operation-1-1",
                icon: "el-icon-menu",
                path: '/setManage',
                id: '2.1.1',
                parentId: '2.1',
                children: []
              },
              {
                name: "故障类型管理",
                index: "operation-1-2",
                path: '/breakdownManage',
                icon: "el-icon-menu",
                id: '2.1.2',
                parentId: '2.1',
                children: []
              },
            ]
          },
          {
            name: "运维职责管理",
            index: "operation-2",
            path: '/maintainDutyManage',
            icon: "el-icon-menu",
            id: '2.2',
            parentId: '2',
            children: []
          },
          {
            name: "工单管理",
            index: "operation-3",
            path: '/workOrderManage',
            icon: "el-icon-menu",
            id: '2.3',
            parentId: '2',
            children: []
          },
          {
            name: "运维消息推送",
            index: "operation-4",
            icon: "el-icon-menu",
            id: '2.4',
            parentId: '2',
            path: '',
            children: [
              {
                name: "信息模板",
                index: "operation-4-1",
                icon: "el-icon-menu",
                path: '/informationTemplate',
                id: '2.4.1',
                parentId: '2.4',
                children: []
              },
              {
                name: "历史信息",
                index: "operation-4-2",
                path: '/informationHistory',
                icon: "el-icon-menu",
                id: '2.4.2',
                parentId: '2.4',
                children: []
              },
            ]
          },
          {
            name: "运维日志管理",
            index: "operation-5",
            path: '/logsManage',
            icon: "el-icon-menu",
            id: '2.5',
            parentId: '2',
            children: []
          },
          {
            name: "满意度考评",
            index: "operation-6",
            icon: "el-icon-menu",
            path: '/evaluation',
            id: '2.6',
            parentId: '2',
            children: []
          }
        ]
      },
      {
        name: "产品中心",
        index: "product",
        icon: "02",
        id: '3',
        children: [
          {
            name: "智能设备",
            index: "product-1",
            icon: "el-icon-menu",
            path: '/smartSet',
            id: '3.1',
            parentId: '3',
            children: []
          },
          {
            name: "智能系统",
            index: "product-2",
            icon: "el-icon-menu",
            path: '/smartSystem',
            id: '3.2',
            parentId: '3',
            children: []
          }
        ]
      },
      {
        name: "系统中心",
        index: "system",
        icon: "03",
        id: '4',
        children: [
          {
            name: "部门管理",
            index: "system-4",
            path: '/departManage',
            icon: "el-icon-menu",
            id: '4.1',
            parentId: '4',
            children: []
          },
          {
            name: "用户管理",
            index: "system-1",
            icon: "el-icon-menu",
            path: '/userManage',
            id: '4.2',
            parentId: '4',
            children: []
          },
          {
            name: "角色管理",
            index: "system-2",
            path: '/roleManage',
            icon: "el-icon-menu",
            id: '4.3',
            parentId: '4',
            children: []
          },
          {
            name: "权限管理",
            index: "system-3",
            id: '4.4',
            parentId: '4',
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
