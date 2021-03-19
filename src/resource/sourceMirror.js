import { DutyMirror } from '@/http/interceptor'
console.log('DutyMirror', DutyMirror)
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

  // 人、车流量
  getProjectsum: params =>
    DutyMirror.get(`/projectinfo/getProjectsum?projectId=${params}`, {
      params: {
        ...params
      }
    }),

  // 人、车流量2
  getFlowBy: params =>
    DutyMirror.get(`/projectinfo/getFlowBy?date=${params}`, {
    }),
  // 井盖资源接口
  getManholeCover: params =>
    DutyMirror.get(`/projectinfo/getManholeCover?projectId=${params}`, {
    }),
  // 车位使用率 周，月，年接口
  getCarUsageRatesBy: params =>
    DutyMirror.get(`/projectinfo/getCarUsageRatesBy?date=${params}`, {
    }),

  // 清洁能源
  getCleanEnergy: params =>
    DutyMirror.get(`projectinfo/getCleanEnergy`, {
    }),
  // 人工智能警告信息
  getWarGroup: params =>
    DutyMirror.get(`projectinfo/getWarGroup?date=${params}`, {
    }),

}
