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
  /*
  *   系统中心
  *   角色管理
  */
  //  查询所有角色
  getRoleAll: params =>
    DutyMirror.get('/role/getRoleAll', {
      params: {
        ...params
      }
    }),
  getRolePermissionAll: params =>
    DutyMirror.get('/role/getRolePermissionAll', {
      params: {
        ...params
      }
    }),
  // 获取角色权限
  selectRolePermission: params =>
    DutyMirror.get(`/role/selectRolePermission?id=${params}`, {
    }),
  // 添加角色
  addRole: params =>
    DutyMirror.post('/role/addRole', {
      ...params
    }),
  // 修改角色
  updateRoleById: params =>
    DutyMirror.post('/role/updateRoleById', {
      ...params
    }),
  // 删除角色
  deleteRoleById: params =>
    DutyMirror.post(`/role/deleteRoleById`, {
      ...params
    }),


  /*
  *   系统中心
  *   角色管理
  */
  //  查询所有权限
  getPowerPermissionAll: params =>
    DutyMirror.get('/permission/getPermissionAll', {
      params: {
        ...params
      }
    }),
  // 修改权限
  updatePermissionById: params =>
    DutyMirror.post('/permission/updatePermissionById', {
      ...params
    }),
  // 获取权限信息
  selectPermission: params =>
    DutyMirror.get(`/permission/selectPermission?id=${params}`, {

    }),
  //  查询一个权限关联的菜单
  getMenuByPermissionId: params =>
    DutyMirror.get('/permission/getMenuByPermissionId', {
      params: {
        ...params
      }
    }),
  //  获取某个组织架构下的所有部门
  getDepartmentsByOrganizationId: params =>
    DutyMirror.get('/department/getDepartmentsByOrganizationId', {
      params: {
        ...params
      }
    }),
  //  获取该部门的职务(传入的id为部门的id)
  getJobs: params =>
    DutyMirror.get('/department/getJobs', {
      params: {
        ...params
      }
    }),
  // 配置权限
  addPermissionmenu: params =>
    DutyMirror.post('/permission/addPermissionmenu', {
      ...params
    }),



  /*
*   系统中心
*   用户管理
*/
  //  查询所有用户列表
  getListBySeek: params =>
    DutyMirror.get('/manage/user/getListBySeek', {
      params: {
        ...params
      }
    }),
  //  新增用户
  addUser: params =>
    DutyMirror.post('/manage/user/addUser', {
      ...params
    }),

  // 获取用户信息
  getUserById: params =>
    DutyMirror.get(`/manage/user/getUserById?userId=${params}`, {

    }),
  // 删除用户信息
  deleteUser: params =>
    DutyMirror.post(`/manage/user/deleteUser`, {
      ...params
    }),
  // 修改用户信息
  update: params =>
    DutyMirror.post('/manage/user/update', {
      ...params
    }),

  // 修改密码
  updateUserPassword: params =>
    DutyMirror.post('/user/updateUserPassword', {
      ...params
    }),



}