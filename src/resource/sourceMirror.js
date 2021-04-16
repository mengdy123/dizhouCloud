import { DutyMirror } from '@/http/interceptor'
export default {
  // 登录
  login: params =>
    DutyMirror.get(`/user/login`, {
      params: {
        ...params
      }
    }),
  // 人、车流量
  getProjectsum: params =>
    DutyMirror.get(`/projectinfo/getProjectsum?projectId=${params}`, {
      params: {
        ...params
      }
    }),

  // 人、车流量2
  getFlowBy: params =>
    DutyMirror.get(`/projectinfo/getFlowBy?projectId=${params.projectId}&time=${params.time}&road=${params.road}`, {
    }),
  // 井盖资源接口
  getManholeCover: params =>
    DutyMirror.get(`/projectinfo/getManholeCover?projectId=${params.projectId}&time=${params.time}&type=${params.type}`, {
    }),
  // 车位使用率 周，月，年接口
  getCarUsageRatesBy: params =>
    DutyMirror.get(`/projectinfo/getCarUsageRatesBy?projectId=${params.projectId}&time=${params.time}&type=${params.type}`, {
    }),

  // 清洁能源
  getCleanEnergy: params =>
    DutyMirror.get(`/projectinfo/getCleanEnergy`, {
    }),
  // 人工智能警告信息
  getWarGroup: params =>
    DutyMirror.get(`/projectinfo/getWarGroup?projectId=${params.projectId}&time=${params.time}&road=${params.road}`, {
    }),
  // 点击设备获取对应设备信息接口
  getDeviceData: params =>
    DutyMirror.get(`/projectinfo/getDeviceData?deviceType=${params.deviceType}&dataType=${params.dataType}&deviceId=${params.deviceId}`, {
    }),

  //车位收费统计  天周月年
  getCostStatsByTime: params =>
    DutyMirror.get(`projectinfo/getCostStatsByTime?date=${params}`, {
    }),

  // 根据type获取停车位资源
  getCarStallInfo: params =>
    DutyMirror.get(`/projectinfo/getCarStallInfo?type=${params}`, {
    }),


}
