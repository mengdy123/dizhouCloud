import { DutyMirror } from '@/http/interceptor'
export default {
  // 首页信息
  // getHomeinfo: params =>
  //   DutyMirror.post('home/getHomeinfo', {
  //     ...params
  //   }),


  // 今日路面执法量
  // queryGroupOrgin: params =>
  //   DutyMirror.get('/duty/enforcement/group/orgin', {
  //     params: {
  //       ...params
  //     }
  //   }),

  /*
  *   系统中心
  *   部门管理
  */
  //  新增部门
  addDepartment: params =>
    DutyMirror.post('/department/addDepartment', {
      ...params
    }),
  //  修改部门数据
  updateDepartment: params =>
    DutyMirror.post('/department/updateDepartment', {
      ...params
    }),
  //  获取部门级的数据(包括组织架构级)
  getDepartments: params =>
    DutyMirror.get('/department/getDepartments', {
      params: {
        ...params
      }
    }),
  //  获取该部门的职务(传入的id为部门的id)
  getJobs: params =>
    DutyMirror.get('department/getJobs', {
      params: {
        ...params
      }
    }),
  //  删除部门或职务
  deleteDepartment: params =>
    DutyMirror.post('/department/deleteDepartment', {
      ...params
    }),
  // 查询组织架构全部数据 
  getDepartmentAll: params =>
    DutyMirror.get('/department/getDepartmentAll', {
      params: {
        ...params
      }
    }),

  // 删除前, 查询受影响的用户
  deleteDepartmentPre: params =>
    DutyMirror.get('/department/deleteDepartmentPre', {
      params: {
        ...params
      }
    }),
}