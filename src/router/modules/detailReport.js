// 详情
import systemLayout from '../../views/system'
export default [
  {
    path: '/projectDetail',
    name: 'projectDetail',
    component: systemLayout,
    children: [{
      path: '/',
      title: '项目详情',
      component: resolve => {
        require(['../../views/system/components/detailModule/projectDetail.vue'], resolve)
      }
    }]
  },
  {
    path: '/clientManageDetail',
    name: 'clientManageDetail',
    component: systemLayout,
    children: [{
      path: '/',
      title: '客户详情',
      component: resolve => {
        require(['../../views/system/components/detailModule/clientDetail.vue'], resolve)
      }
    }]
  },
  {
    path: '/industryDetail',
    name: 'industryDetail',
    component: systemLayout,
    children: [{
      path: '/',
      title: '行业详情',
      component: resolve => {
        require(['../../views/system/components/detailModule/industryDetail.vue'], resolve)
      }
    }]
  },
  {
    path: '/smartSetDetail',
    name: 'smartSetDetail',
    component: systemLayout,
    children: [{
      path: '/',
      title: '智能设备详情',
      component: resolve => {
        require(['../../views/system/components/detailModule/samrtSetDetail.vue'], resolve)
      }
    }]
  },
  {
    path: '/smartSystemDetail',
    name: 'smartSystemDetail',
    component: systemLayout,
    children: [{
      path: '/',
      title: '智能系统详情',
      component: resolve => {
        require(['../../views/system/components/detailModule/smartSystemDetail.vue'], resolve)
      }
    }]
  },
  {
    path: '/userManageDetail',
    name: 'userManageDetail',
    component: systemLayout,
    children: [{
      path: '/',
      title: '用户详情',
      component: resolve => {
        require(['../../views/system/components/detailModule/userDetail.vue'], resolve)
      }
    }]
  },
  {
    path: '/powerManageDetail',
    name: 'powerManageDetail',
    component: systemLayout,
    children: [{
      path: '/',
      title: '权限详情',
      component: resolve => {
        require(['../../views/system/components/detailModule/powerManageDetail.vue'], resolve)
      }
    }]
  },
  {
    path: '/logsManageDetail',
    name: 'logsManageDetail',
    component: systemLayout,
    children: [{
      path: '/',
      title: '运维日志详情',
      component: resolve => {
        require(['../../views/system/components/detailModule/logsManageDetail.vue'], resolve)
      }
    }]
  },
  {
    path: '/setManageDetail',
    name: 'setManageDetail',
    component: systemLayout,
    children: [{
      path: '/',
      title: '设备管理详情',
      component: resolve => {
        require(['../../views/system/components/detailModule/setManageDetail.vue'], resolve)
      }
    }]
  },
  {
    path: '/evaluationDetail',
    name: 'evaluationDetail',
    component: systemLayout,
    children: [{
      path: '/',
      title: '满意度考评个人的详情',
      component: resolve => {
        require(['../../views/system/components/detailModule/evaluationDetail.vue'], resolve)
      }
    }]
  },


]