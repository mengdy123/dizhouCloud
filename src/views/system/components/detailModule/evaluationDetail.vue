<template>
  <div class="dz-system">
    <div class="dz-system-title back-span"
         @click="goBack">返回</div>
    <div class="dz-system-module">
      <ul v-for="(item, index) in evaluationType"
          :key="index">
        <li>{{item.label}}</li>
        <li>{{item.value}}</li>
      </ul>
    </div>
    <div class="dz-system-type">
      <ul>
        <li class="dz-system-type-title">考评级别占比</li>
        <li class="dz-system-type-chart">
          <pieChart8 class="pie-chart"
                     :value='valuePie'
                     ref="flowChart1"
                     :colors='colors'></pieChart8>
        </li>
      </ul>
      <ul>
        <li class="dz-system-type-title">考评级别设备占比</li>
        <li class="dz-system-type-chart">
          <pieChart8 class="pie-chart"
                     :value='valuePie'
                     ref="flowChart2"
                     :colors='colors'></pieChart8>
        </li>
      </ul>
    </div>
    <div class="dz-system-title">维修记录</div>
    <div class="dz-system-table">
      <myTable :tableData="tableData"
               :tableConfigArr='tableConfigArr'
               :selection="false"
               :action='actionList2'
               height='250px'
               http=''
               :detail='false'
               name='维修记录'
               @getList='getProgectList'
               :index='true'></myTable>
    </div>
  </div>
</template>
<script>
import systemMirror from '@/resource/systemMirror'
import { mapState, mapActions } from 'vuex'
import timeReg from '@/utils/timeReg'
import myTable from "@/components/Table";
import pieChart8 from '@/components/charts/pieChart8.vue'
export default {
  components: { myTable, pieChart8 },
  data () {
    return {
      tableConfigArr: [
        {
          fixed: false,
          prop: 'id',
          label: '工单编号',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'deviceType',
          label: '设备类型 ',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'faulttype',
          label: '故障类型    ',
          tooltip: true,
        },
        // {
        //   fixed: false,
        //   prop: 'deviceAmount',
        //   label: '维修时长',
        //   tooltip: false,
        // },
        {
          fixed: false,
          prop: 'score',
          label: '评分',
          tooltip: false,
        },
        {
          fixed: false,
          prop: 'level',
          label: '级别',
          tooltip: false,
        },
        {
          fixed: false,
          prop: 'remark',
          label: '评价',
          tooltip: false,
        },
        {
          fixed: false,
          prop: 'faultTime',
          label: '故障时间',
          tooltip: false,
        },
      ],
      tableData: [],
      heightTable: 'calc(100vh - 640px)',
      http: '/manage/project/getProjectById?projectId=',
      actionList: [
        {
          name: '详情',
          style: 'view-screen'
        },
      ],
      evaluationType: [
        {
          label: '维修人员数量（人）',
          value: '0',
          type: 'personAmount'
        },
        {
          label: '维修设备数量（个）',
          value: '0',
          type: 'deviceAmount'
        },
        {
          label: '综合服务评分',
          value: '0',
          type: 'avgScore'
        },
        {
          label: '综合服务级别',
          value: '0',
          type: 'level'
        }
      ],
      chartList: [
        {
          title: '考评级别占比'
        },
        {
          title: '考评级别设备占比'
        }
      ],
      valuePie: [
        { value: 735, name: '优' },
        { value: 510, name: '良' },
        { value: 434, name: '中' },
        { value: 335, name: '差' }
      ],
      colors: ['#5470C6', '#EE6666', '#FC8452', '#91CC75', '#FFA321'],
      title: '满意度考评',
      actionList2: []
    };
  },
  computed: {
    ...mapState({
      projectType: state => state.common.projectType,
      projectStatus: state => state.common.projectStatus,
    })
  },
  mounted () {
    this.getProgectList()
    let id = this.$route.query.id
    this.getAvgInfo(id)
    this.getScoreLevel(id)
  },
  methods: {
    getProgectList () {
      let params = {
        currentPage: 1,
        pageSize: 1000,
      }
      systemMirror.getTeamList(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.tableData = result.content
        }
      })
    },
    getAvgInfo (id) {
      systemMirror.getAvgInfo(id).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          let data = result
          this.evaluationType.forEach(item => {
            item.value = data[item.type]
          })
        }
      })
    },
    getScoreLevel (id) {
      let that = this
      systemMirror.getScoreLevel(id).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          let data = result
          if (data.length) {
            this.valuePie = []
            data.forEach(item => {
              this.valuePie.push({
                value: item.counts,
                name: item.level
              })
            })
            this.$nextTick(() => {
              this.$refs.flowChart1.initChart()
              this.$refs.flowChart2.initChart()
            })
          }
        }
      })
    },
    goBack () {
      this.$router.push('/evaluation')
    },
  },
}
</script>
<style lang="less" scoped>
.dz-system {
  &-module {
    display: flex;
    margin: 30px 0;
    ul {
      width: 260px;
      height: 100px;
      border-radius: 4px;
      padding: 16px;
      margin-right: 70px;
      li:first-child {
        color: #666666;
        font-size: 14px;
      }
      li:last-child {
        font-weight: bold;
        font-size: 30px;
        margin-top: 10px;
      }
    }
    ul:nth-child(1),
    ul:nth-child(2) {
      background: #d5ebff;
      li:last-child {
        color: #333333;
      }
    }
    ul:nth-child(3),
    ul:nth-child(4) {
      background: #fff3db;
      li:last-child {
        color: #3ca272;
      }
    }
  }
  &-type {
    display: flex;
    ul {
      width: 400px;
      height: 280px;
      padding: 30px;
      margin-right: 20px;
      border-radius: 2px;
      margin: 20px 0;
    }
    &-title {
      font-weight: bold;
      font-size: 14px;
      color: #333333;
    }
    &-chart {
      width: 100%;
      height: 100%;
      .pie-chart {
        width: 100%;
        height: 100%;
      }
    }
  }
  .back-span {
    cursor: pointer;
  }
}
</style>