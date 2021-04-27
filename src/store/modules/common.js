
import axios from 'axios'
import Interceptor, {
  DUTY_URL
} from '@/http/axiosApi'
const common = {
  state: {
    // homeIndexInfo: {},
    // 设备类型
    deviceType: [
      {
        name: '发光标线',
        id: '1',
        type: 'zebra'
      },
      {
        name: '智慧路灯',
        id: '2',
        type: 'smartLight'
      },
      {
        name: '井盖',
        id: '3',
        type: 'well'
      },
      {
        name: '智慧砖',
        id: '4',
        type: 'smartBrick'
      },
      {
        name: '合杆',
        id: '5',
        type: 'alloyRod'
      },
      {
        name: '井盖系统',
        id: '6',
        type: 'wellSystem'
      },
      {
        name: '过街立柱',
        id: '7',
        type: 'redBar'
      },
      {
        name: '停车立柱',
        id: '8',
        type: 'stopBar'
      },
    ],
    // 设备状态
    deviceStatus: [
      {
        name: '正常',
        id: '1'
      },
      {
        name: '异常',
        id: '0'
      },
    ],
    // 项目类型
    projectType: [
      {
        name: '交通',
        id: '1'
      },
      {
        name: '工地',
        id: '2'
      },
      {
        name: '市政',
        id: '3'
      },
      {
        name: '园区',
        id: '4'
      },
      {
        name: '园林',
        id: '5'
      },
      {
        name: '景区',
        id: '6'
      },
      {
        name: '企业',
        id: '7'
      }
    ],
    // 系统类型
    systemType: [
      {
        name: '过街系统',
        id: '1'
      },
      {
        name: '出租车临停系统',
        id: '2'
      },
      {
        name: '临停系统',
        id: '3'
      },
      {
        name: '停车系统',
        id: '4'
      },
      {
        name: '公交系统',
        id: '5'
      },
      {
        name: '井盖系统',
        id: '6'
      },
      {
        name: '座椅系统',
        id: '7'
      },
      {
        name: '路灯系统',
        id: '8'
      },
      {
        name: '景观灯系统',
        id: '9'
      },
      {
        name: '智慧砖舞台系统',
        id: '10'
      },
      {
        name: '灯控过街系统',
        id: '11'
      },
      {
        name: '护树系统',
        id: '12'
      },
      {
        name: '幕墙系统',
        id: '13'
      }
    ],
    // 告警类型
    warningType: [
      {
        name: '设备故障',
        id: '1'
      },
      {
        name: '行人违章',
        id: '2'
      },
      {
        name: '交通事故',
        id: '3'
      },
      {
        name: '重点人员',
        id: '4'
      },
      {
        name: '失踪人口',
        id: '5'
      }
    ],
    // 井盖类型
    wellTypeList: [
      {
        type: '1',
        name: '全部'
      },
      {
        type: '2',
        name: '上水'
      },
      {
        type: '3',
        name: '污水'
      },
      {
        type: '4',
        name: '雨水'
      },
      {
        type: '5',
        name: '路灯'
      },
      {
        type: '6',
        name: '电力'
      },
      {
        type: '7',
        name: '燃气'
      }
    ],
    // 停车类型
    parkTypeList: [
      {
        name: '全部',
        type: '1'
      },
      {
        name: '出租车',
        type: '2'
      },
      {
        name: '临停',
        type: '3'
      },
      {
        name: '收费',
        type: '4'
      }
    ],
    // 项目状态
    projectStatus: [
      {
        name: '在建',
        id: '1'
      },
      {
        name: '维修',
        id: '2'
      },
      {
        name: '正常',
        id: '3'
      },
      {
        name: '关闭',
        id: '4'
      },
    ],
    // 工单状态状态
    wordStatusList: [
      {
        name: '待审批',
        type: '1'
      },
      {
        name: '待维修',
        type: '2'
      },
      {
        name: '待考评',
        type: '3'
      },
      {
        name: '已完成',
        type: '4'
      },
    ],
    // 客户状态
    companyStatus: [
      {
        name: '正常',
        id: '1'
      },
      {
        name: '禁用',
        id: '0'
      },
    ],
    // 维修方式
    repairModeList: [
      {
        name: '更换',
        type: '1'
      },
      {
        name: '维修',
        type: '2'
      }
    ],
  },
  actions: {
    // this.$store.dispatch('getHomeIndexInfo')
    // getHomeIndexInfo ({ commit }, params) {
    //   axios.get(`${DUTY_URL}home/getHomeinfo?country=${params.country}&province=${params.province}&city=${params.city}&county=${params.county}`)
    //     .then(res => {
    //       commit("GET_HOME_INDEX_INFO", res.data.result);
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // },
  },
  mutations: {
    // GET_HOME_INDEX_INFO (state, data) {
    //   state.homeIndexInfo = data
    // },
  }
}

export default common
