import axios from 'axios'
import Interceptor, {
  DUTY_URL
} from '@/http/axiosApi'
const common = {
  state: {
    operationList: [
      {
        id: 2,
        menuName: '项目管理',
        list: [
          {
            name: '新增',
            type: '1'
          },
          {
            name: '删除',
            type: '2'
          },
          {
            name: '编辑',
            type: '3'
          },
          {
            name: '可视化',
            type: '4'
          }
        ]
      },
      {
        id: 3,
        menuName: '客户管理',
        list: [
          {
            name: '新增',
            type: '1'
          },
          {
            name: '删除',
            type: '2'
          },
          {
            name: '编辑',
            type: '3'
          },
          {
            name: '可视化',
            type: '4'
          }
        ]
      },
      {
        id: 4,
        menuName: '行业管理',
        list: [
          {
            name: '新增',
            type: '1'
          },
          {
            name: '删除',
            type: '2'
          },
          {
            name: '编辑',
            type: '3'
          },
          {
            name: '可视化',
            type: '4'
          }
        ]
      },
      {
        id: 5,
        menuName: '项目分布',
        list: [
          {
            name: '新增',
            type: '1'
          },
          {
            name: '删除',
            type: '2'
          },
          {
            name: '编辑',
            type: '3'
          },
          {
            name: '可视化',
            type: '4'
          }
        ]
      },
      {
        id: 7,
        menuName: '设备运维',
        list: [
          {
            name: '新增',
            type: '1'
          },
          {
            name: '删除',
            type: '2'
          },
          {
            name: '编辑',
            type: '3'
          },
          {
            name: '可视化',
            type: '4'
          }
        ]
      },
      {
        id: 10,
        menuName: '运维职责管理',
        list: [
          {
            name: '新增',
            type: '1'
          },
          {
            name: '删除',
            type: '2'
          },
          {
            name: '编辑',
            type: '3'
          },
          {
            name: '可视化',
            type: '4'
          }
        ]
      },
      {
        id: 11,
        menuName: '工单管理',
        list: [
          {
            name: '新增',
            type: '1'
          },
          {
            name: '删除',
            type: '2'
          },
          {
            name: '编辑',
            type: '3'
          },
          {
            name: '可视化',
            type: '4'
          }
        ]
      },
      {
        id: 15,
        menuName: '运维日志管理',
        list: [
          {
            name: '新增',
            type: '1'
          },
          {
            name: '删除',
            type: '2'
          },
          {
            name: '编辑',
            type: '3'
          },
          {
            name: '可视化',
            type: '4'
          }
        ]
      },
      {
        id: 16,
        menuName: '满意度考评',
        list: [
          {
            name: '新增',
            type: '1'
          },
          {
            name: '删除',
            type: '2'
          },
          {
            name: '编辑',
            type: '3'
          },
          {
            name: '可视化',
            type: '4'
          }
        ]
      },
      {
        id: 18,
        menuName: '智能设备',
        list: [
          {
            name: '新增',
            type: '1'
          },
          {
            name: '删除',
            type: '2'
          },
          {
            name: '编辑',
            type: '3'
          },
          {
            name: '可视化',
            type: '4'
          }
        ]
      },
      {
        id: 19,
        menuName: '智能系统',
        list: [
          {
            name: '新增',
            type: '1'
          },
          {
            name: '删除',
            type: '2'
          },
          {
            name: '编辑',
            type: '3'
          },
          {
            name: '可视化',
            type: '4'
          }
        ]
      },
      {
        id: 21,
        menuName: '部门管理',
        list: [
          {
            name: '新增',
            type: '1'
          },
          {
            name: '删除',
            type: '2'
          },
          {
            name: '编辑',
            type: '3'
          },
          {
            name: '可视化',
            type: '4'
          }
        ]
      },
      {
        id: 22,
        menuName: '用户管理',
        list: [
          {
            name: '新增',
            type: '1'
          },
          {
            name: '删除',
            type: '2'
          },
          {
            name: '编辑',
            type: '3'
          },
          {
            name: '可视化',
            type: '4'
          }
        ]
      },
      {
        id: 23,
        menuName: '角色管理',
        list: [
          {
            name: '新增',
            type: '1'
          },
          {
            name: '删除',
            type: '2'
          },
          {
            name: '编辑',
            type: '3'
          },
          {
            name: '可视化',
            type: '4'
          }
        ]
      },
      {
        id: 24,
        menuName: '权限管理',
        list: [
          {
            name: '新增',
            type: '1'
          },
          {
            name: '删除',
            type: '2'
          },
          {
            name: '编辑',
            type: '3'
          },
          {
            name: '可视化',
            type: '4'
          }
        ]
      },
    ]
  },
  mutations: {
    // GET_HOME_INDEX_INFO (state, data) {
    //   state.homeIndexInfo = data
    // },
  }
}

export default common
