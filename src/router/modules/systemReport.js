// 系统
import systemLayout from '../../views/system'
export default [
  {
    path: '/project',
    name: 'project',
    component: systemLayout,
    children: [
      /*
      * 项目中心
      */
      {
        path: '/',
        name: 'project',
        title: '项目管理',
        component: resolve => {
          require(['../../views/system/systemBody/systemCenter/projecManage.vue'], resolve)
        }
      },
      {
        path: '/distribute',
        name: 'distribute',
        title: '项目分布',
        component: resolve => {
          require(['../../views/system/systemBody/systemCenter/distribute.vue'], resolve)
        }
      },

      {
        path: '/clientManage',
        name: 'clientManage',
        title: '客户管理',
        component: resolve => {
          require(['../../views/system/systemBody/systemCenter/clientManage.vue'], resolve)
        }
      },
      {
        path: '/industryManage',
        name: 'industryManage',
        title: '行业管理',
        component: resolve => {
          require(['../../views/system/systemBody/systemCenter/industryManage.vue'], resolve)
        }
      },
      /*
     * 产品中心
     */
      {
        path: '/smartSet',
        name: 'smartSet',
        title: '智能设备',
        component: resolve => {
          require(['../../views/system/systemBody/productCenter/smartSet.vue'], resolve)
        }
      },
      {
        path: '/smartSystem',
        name: 'smartSystem',
        title: '智能系统',
        component: resolve => {
          require(['../../views/system/systemBody/productCenter/smartSystem.vue'], resolve)
        }
      },

      /*
     * 运维中心
     */

      {
        path: '/setManage',
        name: 'setManage',
        title: '设备管理',
        component: resolve => {
          require(['../../views/system/systemBody/maintatinCenter/setManage.vue'], resolve)
        }
      },
      {
        path: '/breakdownManage',
        name: 'breakdownManage',
        title: '故障类型管理',
        component: resolve => {
          require(['../../views/system/systemBody/maintatinCenter/breakdownManage.vue'], resolve)
        }
      },
      {
        path: '/maintainDutyManage',
        name: 'maintainDutyManage',
        title: '运维职责管理',
        component: resolve => {
          require(['../../views/system/systemBody/maintatinCenter/maintainDutyManage.vue'], resolve)
        }
      },
      {
        path: '/workOrderManage',
        name: 'workOrderManage',
        title: '工单管理',
        component: resolve => {
          require(['../../views/system/systemBody/maintatinCenter/workOrderManage.vue'], resolve)
        }
      },
      {
        path: '/informationTemplate',
        name: 'informationTemplate',
        title: '消息模板',
        component: resolve => {
          require(['../../views/system/systemBody/maintatinCenter/informationTemplate.vue'], resolve)
        }
      },
      {
        path: '/informationHistory',
        name: 'informationHistory',
        title: '历史消息',
        component: resolve => {
          require(['../../views/system/systemBody/maintatinCenter/informationHistory.vue'], resolve)
        }
      },
      {
        path: '/logsManage',
        name: 'logsManage',
        title: '运维日志',
        component: resolve => {
          require(['../../views/system/systemBody/maintatinCenter/logsManage.vue'], resolve)
        }
      },
      {
        path: '/evaluation',
        name: 'evaluation',
        title: '满意度考评',
        component: resolve => {
          require(['../../views/system/systemBody/maintatinCenter/evaluation.vue'], resolve)
        }
      },

      /*
      * 系统中心
      */
      {
        path: '/userManage',
        name: 'userManage',
        title: '用户管理',
        component: resolve => {
          require(['../../views/system/systemBody/systemManage/userManage.vue'], resolve)
        }
      },
      {
        path: '/departManage',
        name: 'departManage',
        title: '部门管理',
        component: resolve => {
          require(['../../views/system/systemBody/systemManage/departManage.vue'], resolve)
        }
      },
      {
        path: '/roleManage',
        name: 'roleManage',
        title: '角色管理',
        component: resolve => {
          require(['../../views/system/systemBody/systemManage/roleManage.vue'], resolve)
        }
      },
      {
        path: '/powerManage',
        name: 'powerManage',
        title: '权限管理',
        component: resolve => {
          require(['../../views/system/systemBody/systemManage/powerManage.vue'], resolve)
        }
      },
      {
        path: '/changePassword',
        name: 'changePassword',
        title: '修改密码',
        component: resolve => {
          require(['../../views/system/systemBody/changePassword.vue'], resolve)
        }
      },
      {
        path: '/information',
        name: 'information',
        title: '个人中心',
        component: resolve => {
          require(['../../views/system/systemBody/information.vue'], resolve)
        }
      },

    ]
  },

]