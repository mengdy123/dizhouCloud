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

  // 项目中心
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
    DutyMirror.post('/manage/project/update', {
      ...params
    }),
  // 分页查询客户列表信息
  getCompanyList: params =>
    DutyMirror.get(`/manage/company/getCompanyList`, {
      params: {
        ...params
      }
    }),

  // 删除项目
  deleteProjectById: params =>
    DutyMirror.get(`/manage/project/delete?projectId=${params}`),

  // 单条导入的时候提前配置好的一些数据接口
  // 产品中心已经配置好的系统的列表
  getListSystemType: params =>
    DutyMirror.get(`/manage/system/getListSystemType`),
  // 根据系统类型id查询该系统类型下的设备类型
  getListRelationBySystemTypeId: params =>
    DutyMirror.get(`/manage/system/getListRelationBySystemTypeId`, {
      params: {
        ...params
      }
    }),
  // 根据设备类型id查询该设备类型下的设备系列
  getListRelationByDeviceTypeId: params =>
    DutyMirror.get(`/manage/system/getListRelationByDeviceTypeId`, {
      params: {
        ...params
      }
    }),
  // 根据设备系列id查询该设备类型下的设备型号
  getListRelationBySeriesId: params =>
    DutyMirror.get(`/manage/system/getListRelationBySeriesId`, {
      params: {
        ...params
      }
    }),
  // 
  addProjectRelation: params =>
    DutyMirror.post('/manage/system/addProjectRelation', {
      ...params
    }),
  // 项目中设备单条导入
  addDevice: params =>
    DutyMirror.post('/manage/device/addDevice', {
      ...params
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
  // 客户管理根据客户id分页查询项目列表
  getListByCompanyId: params =>
    DutyMirror.get(`/manage/project/getListByCompanyId`, {
      params: {
        ...params
      }
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
  // 行业管理列表的删除
  deleteIndustryById: params =>
    DutyMirror.get(`manage/indutry/delete?industryId=${params}`),


  // 地域管理
  // 分页查询地域列表信息
  getAreaList: params =>
    DutyMirror.get(`/manage/area/getAreaList`, {
      params: {
        ...params
      }
    }),
  // 新增地域
  addArea: params =>
    DutyMirror.post('/manage/area/addArea', {
      ...params
    }),
  // 修改地域列表
  updateArea: params =>
    DutyMirror.post('/manage/area/update', {
      ...params
    }),
  // 删除地域列表
  deleteArea: params =>
    DutyMirror.get(`/manage/area/delete?id=${params}`, {
    }),

  // 产品中心
  // 分页查询系统列表
  getSystemList: params =>
    DutyMirror.get(`/manage/system/getSystemList`, {
      params: {
        ...params
      }
    }),
  // 设备系统详情
  getSystemById: params =>
    DutyMirror.get(`/manage/system/getSystemTypeById?systemTypeId=${params}`),

  // 修改 系统
  updateSysType: params =>
    DutyMirror.post('/manage/system/updateSysType', {
      ...params
    }),
  // 删除 系统
  deleteSysType: params =>
    DutyMirror.post('/manage/system/deleteSysType', {
      ...params
    }),





  // updateSystem: params =>
  //   DutyMirror.post('/manage/system/update', {
  //     ...params
  //   }),

  // 新增系统
  addSystem: params =>
    DutyMirror.post('/manage/system/addSystem', {
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
  // 设备详情
  getDeviceById: params =>
    DutyMirror.get(`/manage/device/getDeviceById?deviceId=${params}`),
  // 修改 系统设备
  updateDevice: params =>
    DutyMirror.post('/manage/device/update', {
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
    DutyMirror.get(`/manage/system/getSystemTypeById?systemTypeId=${params}`, {
    }),
  /*
  *   新增  系统类型
  */
  addSystemType: params =>
    DutyMirror.post('/manage/system/addSystemType ', {
      ...params
    }),



  // 运维中心---故障类型管理
  /*
  * 根据条件分页查询  故障类型列表
  */
  getFailTypeList: params =>
    DutyMirror.get(`/faulttype/getList`, {
      params: {
        ...params
      }
    }),
  /*
 *  新增故障类型
 */
  addFailTypeList: params =>
    DutyMirror.post(`/faulttype/add`, {
      ...params
    }),
  /*
   *  修改故障类型
   */
  updateFailTypeList: params =>
    DutyMirror.post(`/faulttype/update`, {
      ...params
    }),


  // 运维中心---设备列表
  /*
 * 根据条件分页查询  设备列表
 */
  getListBySeek: params =>
    DutyMirror.get(`/manage/device/getListBySeek`, {
      params: {
        ...params
      }
    }),

  /*
  *  上报
  */
  reported: params =>
    DutyMirror.post(`/manage/work/reported`, {
      ...params
    }),
  /*
  *  工单审批/维修/考评
  */
  updateWord: params =>
    DutyMirror.post(`/manage/work/update`, {
      ...params
    }),


  // 运维中心---工单管理
  /*
 * 根据条件分页查询  工单管理
 */
  getWorkList: params =>
    DutyMirror.get(`/manage/work/getList`, {
      params: {
        ...params
      }
    }),
  /*
  *  维修工列表
  */
  getMaintenance: params =>
    DutyMirror.get(`/user/getMaintenance?deviceId=${params}`, {
    }),
  /*
  *  审核人列表
  */
  getAuditor: params =>
    DutyMirror.get(`/user/getAuditor?deviceId=${params}`, {
    }),



  // 运维中心---满意度考评
  /*
  * 团队成员列表
  */
  getTeamList: params =>
    DutyMirror.get(`/manage/work/getWorkList`, {
      params: {
        ...params
      }
    }),
  /*
  * 统计维修人员数量，总工单数，平均分
  */
  getAvgInfo: params =>
    DutyMirror.get(`/manage/work/getAvg?maintenance=${params}`, {
      params: {
        ...params
      }
    }),
  /*
  * 统计分数区间数量
  */
  getScoreLevel: params =>
    DutyMirror.get(`/manage/work/getScoreLevel?maintenance=${params}`, {
      params: {
        ...params
      }
    }),
  // /*
  //  * 统计分数区间数量
  //  */
  // getScoreLevel: params =>
  //   DutyMirror.get(`/manage/work/getListByMin`, {
  //     params: {
  //       ...params
  //     }
  //   }),
  /*
  * 个人维修记录
  */
  getListByMin: params =>
    DutyMirror.get(`/manage/work/getListByMin`, {
      params: {
        ...params
      }
    }),
  /*
  * 根据型号分页查询设备列表
  */
  getDeviceByVer: params =>
    DutyMirror.get(`/manage/device/getDeviceByVer`, {
      params: {
        ...params
      }
    }),

  /*
  * 根据设备id分页查询维修日志列表
  */
  getListByDeviceId: params =>
    DutyMirror.get(`/manage/log/getListByDeviceId`, {
      params: {
        ...params
      }
    }),


  // 运维职能配置
  /*
  * 根据项目id查询所有已经部署的系统
  */
  getListByProjectId: params =>
    DutyMirror.get(`/manage/system/getListByProjectId`, {
      params: {
        ...params
      }
    }),
  /*
  * 根据项目id和系统id查询设备类型
  */
  getListTypeBySystem: params =>
    DutyMirror.get(`/manage/device/getListTypeBySystem`, {
      params: {
        ...params
      }
    }),
  /*
  * 根据项目id和系统id和设备id查询系列
  */
  getListTypeByDevice: params =>
    DutyMirror.get(`/manage/device/getListTypeByDevice`, {
      params: {
        ...params
      }
    }),
  /*
  * 根据项目id和系统id和设备id和设备系列id查询型号
  */
  getListTypeBySeries: params =>
    DutyMirror.get(`/manage/device/getListTypeBySeries`, {
      params: {
        ...params
      }
    }),
  /*
  * 根据项目id和系统id和设备id和设备系列id和设备型号id查询具体的设备
  */
  getListTypeByVersion: params =>
    DutyMirror.get(`/manage/device/getListTypeByVersion`, {
      params: {
        ...params
      }
    }),
  /*
  * 运维职能配置主接口
  */
  setMaintainManage: params =>
    DutyMirror.post(`/manage/device/setMaintainManage`, {
      ...params
    }),


}