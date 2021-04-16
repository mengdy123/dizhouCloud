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


  // 分页查询项目信息
  getProjectList: params =>
    DutyMirror.get(`/manage/project/getProjectList`, {
      params: {
        ...params
      }
    }),
  // 新增项目
  addProject: params =>
    DutyMirror.post('manage/project/addProject', {
      ...params
    }),
  // 项目详情
  getProjectById: params =>
    DutyMirror.get(`/manage/project/getProjectById?projectId=${params}`),
  // 项目详情 修改
  updateProject: params =>
    DutyMirror.post('manage/project/update', {
      ...params
    }),
  // 分页查询客户列表信息
  getCompanyList: params =>
    DutyMirror.get(`/manage/company/getCompanyList`, {
      params: {
        ...params
      }
    }),

  // 客户详情
  getCompanyById: params =>
    DutyMirror.get(`/manage/company/getCompanyById?companyId=${params}`),
  // 新增客户
  addCompany: params =>
    DutyMirror.post('manage/company/addProject', {
      ...params
    }),
  // 客户详情 修改
  updateCompany: params =>
    DutyMirror.post('manage/company/update', {
      ...params
    }),
  // 分页查询行业列表信息
  getIndustryList: params =>
    DutyMirror.get(`/manage/indutry/getIndustryList`, {
      params: {
        ...params
      }
    }),
  // 行业详情
  getIndustryById: params =>
    DutyMirror.get(`/manage/indutry/getIndustryById?industryId=${params}`),
  // 修改行业信息
  updateIndutry: params =>
    DutyMirror.post('manage/indutry/update', {
      ...params
    }),
  // 行业新增
  addIndustry: params =>
    DutyMirror.post('manage/indutry/addIndustry', {
      ...params
    }),

  // 分页查询系统列表
  getSystemList: params =>
    DutyMirror.get(`/manage/system/getSystemList`, {
      params: {
        ...params
      }
    }),
  // 系统详情
  getSystemById: params =>
    DutyMirror.get(`manage/system/getSystemById?systemId=${params}`),

  // 修改 系统
  updateSystem: params =>
    DutyMirror.post('manage/system/update', {
      ...params
    }),

  // 新增系统
  addSystem: params =>
    DutyMirror.post('manage/system/addSystem', {
      ...params
    }),
  // 分页查询 系统设备列表
  getListBySeek: params =>
    DutyMirror.get(`/manage/device/getListBySeek`, {
      params: {
        ...params
      }
    }),
  // 高级搜索
  getListByPar: params =>
    DutyMirror.get(`/manage/device/getListByPar`, {
      params: {
        ...params
      }
    }),
  // 系统设备详情
  getDeviceById: params =>
    DutyMirror.get(`/manage/device/getDeviceById?deviceId=${params}`),
  // 修改 系统设备
  updateDevice: params =>
    DutyMirror.post('/manage/device/update', {
      ...params
    }),
  // 新增系统
  addDevice: params =>
    DutyMirror.post('/manage/device/addDevice', {
      ...params
    }),

  // 获取用户列表
  getUserList: params =>
    DutyMirror.get(`/manage/user/getListBySeek`, {
      params: {
        ...params
      }
    }),

  // 用户详情
  getUserById: params =>
    DutyMirror.get(`/manage/user/getUserById?userId=${params}`),

  // 新增用户
  addUser: params =>
    DutyMirror.post('/manage/user/addUser', {
      ...params
    }),

  // 修改 用户
  updateUser: params =>
    DutyMirror.post('/manage/user/update', {
      ...params
    }),

  // 产品中心
  /*
  * 根据条件分页查询设备类型 
  */
  getListByDevice: params =>
    DutyMirror.get(`/manage/device/getListByDevice`, {
      params: {
        ...params
      }
    }),
  /*
  * 根据id查询设备类型
  */
  getDeviceTypeById: params =>
    DutyMirror.get(`/manage/device/getDeviceTypeById`, {
      params: {
        ...params
      }
    }),
  /*
  * 新增设备类型
  */
  addDeviceType: params =>
    DutyMirror.post('/manage/device/addDeviceType', {
      ...params
    }),
  /*
  * 修改设备类型
  */
  updateDeviceType: params =>
    DutyMirror.post('/manage/device/updateDevice', {
      ...params
    }),

  /*
   * 根据设备类型分页查询设备系列
   */
  getListBySeries: params =>
    DutyMirror.get(`/manage/device/getListBySeries`, {
      params: {
        ...params
      }
    }),
  /*
   * 根据设备系列id查询设备系列详情
   */
  getSeriesById: params =>
    DutyMirror.get(`/manage/device/getSeriesById`, {
      params: {
        ...params
      }
    }),
  /*
  *   新增设备系列
  */
  addSeriesType: params =>
    DutyMirror.post('/manage/device/addSeriesType', {
      ...params
    }),
  /*
  *   修改设备类型
  */
  updateSeries: params =>
    DutyMirror.post('/manage/device/updateSeries', {
      ...params
    }),

  /*
  * 根据设备系列分页查询设备型号
  */
  getListByVer: params =>
    DutyMirror.get(`/manage/device/getListByVer`, {
      params: {
        ...params
      }
    }),

  /*
    *   新增设备型号
    */
  addVersiontype: params =>
    DutyMirror.post('/manage/device/addVersiontype', {
      ...params
    }),
  /*
    * 根据条件分页查询  智能系统
    */
  getSystemTypeList: params =>
    DutyMirror.get(`/manage/system/getSystemTypeList`, {
      params: {
        ...params
      }
    }),


  /*
* 根据设备系列systemTypeId查询智能系统的详情
*/
  getSystemTypeById: params =>
    DutyMirror.get(`/manage/system/getSystemTypeById?systemTypeId=1`, {
      params: {
        ...params
      }
    }),
  /*
  *   新增  系统类型
  */
  addSystemType: params =>
    DutyMirror.post('/manage/system/addSystemType ', {
      ...params
    }),

}