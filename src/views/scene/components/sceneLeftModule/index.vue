<template>
  <div class="dz-left-module">
    <div class="dz-left-module-row">
      <div class="flow-div-content1">
        <titleDiv title='人/车流量'></titleDiv>
        <div class="retract-content">
          <div class="change-chart-time">
            <div class="title-span">实时流量</div>
            <div class="time-span">
              <span v-for="(item, index) in timeList"
                    :key="index"
                    :class="[{'span-selected': timeSelectIndex === index}]"
                    @click.stop="changeTime(item.title,index)">{{item.name}}</span>
            </div>
          </div>
          <div class="change-chart-type">
            <ul>
              <li v-for="(item, index) in roleList"
                  :key="index"
                  :class="[{'li-selected': roleLiIndex === index}]"
                  @click="selectRole(item, index)">{{item.name}}</li>
            </ul>
          </div>
          <barChart1 class="flow-chart-div"
                     :xAxisData='flowXAxis'
                     :yAxisData='flowYAxis'
                     :title="flowTitle"
                     ref="flowChart"></barChart1>
        </div>
      </div>
      <div class="flow-div-content2">
        <div class="retract-content">
          <div class="change-chart-time">
            <div class="title-span">拥堵指数</div>
          </div>
          <lineChart class="flow-chart-div margin-10"
                     :xAxisData='flowXAxis'
                     :yAxisData='congestionYAxis'
                     :title="congestionTitle"
                     ref="congestionChart"></lineChart>
        </div>
      </div>
    </div>
    <div class="dz-left-module-row">
      <div class="flow-div-content1">
        <changeTitleDiv :title="resourceType"
                        :titleEd='resourceSelected'
                        @changeResource='changeResource'></changeTitleDiv>
        <div class="retract-content">
          <div class="change-chart-time">
            <div class="title-span">车位使用实时占比</div>
            <div>
            </div>
          </div>
          <div class="change-chart-type">
            <ul>
              <li v-for="(item, index) in parkList"
                  :key="index"
                  :class="[{'li-selected': parkLiIndex === index}]"
                  @click.stop="selectPark(item, index)">{{item.name}}</li>
            </ul>
          </div>
          <pieChart7 class="flow-chart-div2"
                     ref="parkChart"
                     :value='parkData'
                     :valuePer='parkDataPer'></pieChart7>
        </div>
      </div>
      <div class="flow-div-content2">
        <div class="retract-content">
          <div class="change-chart-time">
            <div class="title-span">{{chartTitle}}</div>
            <div class="time-span">
              <span v-for="(item, index) in timeList"
                    :key="index"
                    :class="[{'span-selected': timeSelectIndex2 === index}]"
                    @click="changeTime2(item.title,index)">{{item.name}}</span>
            </div>
          </div>
          <lineChart2 class="flow-chart-div margin-10"
                      :xAxisData='parkXAxis'
                      :yAxisData='parkYAxis'
                      :title="parkTitle"
                      :colors='colors'
                      ref="parkPerChart"></lineChart2>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import titleDiv from "@/components/titleModule";
import changeTitleDiv from "@/components/titleModule/changeTitle.vue";
import barChart1 from '@/components/charts/barChart1.vue'
import pieChart7 from '@/components/charts/pieChart7.vue'
import lineChart from '@/components/charts/lineChart.vue'
import lineChart2 from '@/components/charts/lineChart2.vue'
import { mapState, mapActions } from 'vuex'
import sourceMirror from '@/resource/sourceMirror'
import eventBus from '@/utils/bus'
export default {
  components: { titleDiv, barChart1, lineChart, changeTitleDiv, pieChart7, lineChart2 },
  data () {
    return {
      roleList: [
        {
          name: '全部',
          id: '0'
        },
        {
          name: '嘉松南路',
          id: '1'
        },
        {
          name: '绿城路',
          id: '2'
        },
        {
          name: '通跃路',
          id: '3'
        },
        {
          name: '思贤路',
          id: '4'
        },
      ],
      roleLiIndex: 0,
      timeList: [
        {
          name: '天',
          title: 'day'
        },
        {
          name: '周',
          title: 'week'
        },
        {
          name: '月',
          title: 'month'
        },
        {
          name: '年',
          title: 'year'
        },
      ],
      timeSelectIndex: 0,
      flowXAxis: [],
      flowYAxis: [
        [],
        []
      ],
      flowTitle: ['车流量', '人流量'],
      congestionXAxis: [],
      congestionYAxis: [
        [],
        [],
      ],
      congestionTitle: ['今日指数', '去年本月通勤日均值'],
      resourceType: [
        {
          name: '停车位资源',
          type: 'park'
        },
        {
          name: '井盖资源',
          type: 'well'
        }
      ],
      resourceSelected: 0,
      parkList: [],
      parkList1: [
        {
          name: '全部',
          type: '1'
        },
        {
          name: '出租车车位',
          type: '2'
        },
        {
          name: '临停车位',
          type: '3'
        },
        {
          name: '收费车位',
          type: '4'
        }
      ],
      parkLiIndex: 0,
      parkType: '1',
      timeSelectIndex2: 0,
      parkXAxis: [],
      parkYAxis: [
        [],
        []
      ],
      parkTitle: ['已用车位', '空闲车位'],
      colors: ['#91CB74', '#7E8490'],
      parkData: [],
      parkDataPer: [],
      chartTitle: '车位使用率',
      resourceSelectedTime: 'day',
      flowTimeType: 'day'
    }
  },
  computed: {
    ...mapState({
      sceneInfo: state => state.home.sceneInfo,
      wellTypeList: state => state.common.wellTypeList,
      parkTypeList: state => state.common.parkTypeList,

    })
  },
  watch: {
    sceneInfo: {
      deep: true,
      handler (newVal, oldVal) {
        if (newVal) {
          this.resetFlowData(newVal.lowStatisticsList)
          this.$refs.flowChart.initChart()
          this.resetCongestionData(newVal.blockIndex)
          this.$refs.congestionChart.initChart()
        }
      }
    }
  },
  mounted () {
    let id = this.$route.query.id || 1
    this.$store.dispatch('getProjectsum', id)
    this.parkList = this.parkList1
    this.getCarParkInfo('1')
    setTimeout(() => {
      this.resetFlowData(this.sceneInfo.lowStatisticsList)
      this.$refs.flowChart.initChart()
      this.resetCongestionData(this.sceneInfo.blockIndex)
      this.$refs.congestionChart.initChart()
    }, 200)
  },
  methods: {
    ...mapActions(['saveBoxTypeTitle']),
    resetFlowData (list) {
      this.flowXAxis = []
      this.flowYAxis[0] = []
      this.flowYAxis[1] = []
      if (list.length > 0) {
        list.forEach(item => {
          if (item.type === '1') {
            this.flowYAxis[0].push(item.count)
          } else {
            if (this.flowTimeType === 'day') {
              this.flowXAxis.push(item.time.slice(11, 16))
            } else if (this.flowTimeType === 'week') {
              this.flowXAxis.push(item.days)
            } else if (this.flowTimeType === 'month') {
              this.flowXAxis.push(item.months)
            } else if (this.flowTimeType === 'year') {
              this.flowXAxis.push(item.years)
            }

            this.flowYAxis[1].push(item.count)
          }
        });
      }
    },
    resetCongestionData (list) {
      // console.log('%c 拥堵指数', 'color: green', list)
      this.congestionYAxis[0] = []
      this.congestionYAxis[1] = []
      this.congestionYAxis[0] = list.blockIndexHiList
      this.congestionYAxis[1] = list.blockIndexList
    },
    // 获取停车位资源 
    // 1 全部
    // 2 出租车
    // 3 临停
    // 4 收费
    getCarParkInfo (type) {
      sourceMirror.getCarStallInfo(type).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.resetParkData(result.stallLlist)
          this.resetPartUserData(result.usageRatesList)
          setTimeout(() => {
            this.$refs.parkChart.initChart()
            this.$refs.parkPerChart.initChart()
          }, 500)
        }
      })
    },
    resetParkData (list) {
      // console.log('%c 停车位资源', 'color: green', list)
      this.parkDataPer = []
      this.parkData = []
      if (this.resourceSelected === 1 && list.length === 1) {
        list.forEach(item => {
          let data1 = Object.assign({}, item)
          data1.sumZb = data1.remainZb
          this.parkDataPer.push(item)
          this.parkDataPer.push(data1)
        })
      } else {
        list.forEach(item => {
          if (item.type === '1') {
            let data1 = Object.assign({}, item)
            data1.sumZb = data1.remainZb
            this.parkDataPer.push(item)
            this.parkDataPer.push(data1)
          } else {
            this.parkData.push(item)
          }
        })
      }
      this.parkDataPer.forEach(it => {
        if (it.roadName) {
          it.name = it.roadName
          it.value = it.sumZb
        } else {
          it.value = it.sumZb
          it.name = ''
        }
      })
      if (this.resourceSelected === 1) {
        if (list.length > 1) {
          this.parkData.forEach(it => {
            it.value = it.sumZb
            if (it.roadName) {
              it.name = it.roadName
            } else {
              this.wellTypeList.forEach(v => {
                if (it.type === v.type) {
                  it.name = v.name
                }
              })
            }
          })
        } else {
          this.parkData = []
        }
      } else {
        this.parkData.forEach(it => {
          it.value = it.sumZb
          if (it.roadName) {
            it.name = it.roadName
          } else {
            this.parkTypeList.forEach(v => {
              if (it.type === v.type) {
                it.name = v.name
              }
            })
          }
        })
      }
    },
    resetPartUserData (list) {
      // console.log('%c 车位使用率', 'color: green', list)
      this.parkXAxis = []
      this.parkYAxis[0] = []
      this.parkYAxis[1] = []
      if (this.resourceSelected === 1) {
        list.forEach(item => {
          this.parkXAxis.push(item.date)
          this.parkYAxis[0].push(item.gasIndex)
        })
      } else {
        list.forEach(item => {
          this.parkXAxis.push(item.date)
          this.parkYAxis[0].push(item.carUsageRates)
          this.parkYAxis[1].push(item.carUsageRatesHi)
        })
      }

    },
    changeTime (type, index) {
      this.timeSelectIndex = index
      let id = this.$route.query.id || 1
      this.flowTimeType = type
      let road = ''
      if (this.roleLiIndex) {
        road = String(this.roleLiIndex)
      }
      let params = {
        projectId: id,
        time: type,
        road: road
      }
      this.getFlowBy(params)
    },
    changeTime2 (type, index) {
      this.timeSelectIndex2 = index
      this.resourceSelectedTime = type
      let id = this.$route.query.id || 1
      if (this.resourceSelected === 1) {
        let params = {
          projectId: id,
          time: this.resourceSelectedTime,
          type: this.parkType
        }
        this.getManholeCover2(params)
      } else {
        let params = {
          projectId: id,
          time: this.resourceSelectedTime,
          type: this.parkType
        }
        this.getCarUsageRatesBy(params)
      }
    },
    selectRole (data, index) {
      this.roleLiIndex = index
      let id = this.$route.query.id || 1
      let road = ''
      if (this.roleLiIndex) {
        road = String(this.roleLiIndex)
      }
      let params = {
        projectId: id,
        time: this.flowTimeType,
        road: road
      }
      this.getFlowBy(params)
    },
    // 资源类型
    changeResource (data) {
      let id = this.$route.query.id || 1
      this.resourceSelected = data
      this.parkLiIndex = 0
      this.parkType = '1'
      if (data === 1) {
        this.parkDataPer = []
        this.parkData = []
        this.parkList = this.wellTypeList
        this.chartTitle = '有毒气体浓度'
        let params = {
          projectId: id,
          time: this.resourceSelectedTime,
          type: this.parkType
        }
        this.getManholeCover(params)
        this.getManholeCover2(params)

      } else {
        this.chartTitle = '车位使用率'
        this.parkDataPer = []
        this.parkData = []
        this.parkList = this.parkList1
        this.getCarParkInfo('1')
      }
    },
    // 资源分类 type
    selectPark (data, index) {
      let id = this.$route.query.id || 1
      this.parkLiIndex = index
      this.parkType = data.type
      if (this.resourceSelected === 1) {
        let params = {
          projectId: id,
          time: this.resourceSelectedTime,
          type: this.parkType
        }
        this.getManholeCover(params)
      } else {
        this.getCarParkInfo(data.type)
      }
    },
    // 人、车流量2
    getFlowBy (params) {
      sourceMirror.getFlowBy(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.resetFlowData(result)
          setTimeout(() => {
            this.$refs.flowChart.initChart()
          }, 200)
        }
      })
    },
    // 井盖资源
    getManholeCover (params) {
      sourceMirror.getManholeCover(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          // console.log('%c result', 'color: blue', result)
          // coverIndexList
          this.resetParkData(result.coverInfoList)
          setTimeout(() => {
            this.$refs.parkChart.initChart()
          }, 200)
        }
      })
    },
    getManholeCover2 (params) {
      sourceMirror.getManholeCover(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          // console.log('%c result', 'color: blue', result)
          // coverIndexList
          this.resetPartUserData(result.coverIndexList)
          setTimeout(() => {
            this.$refs.parkPerChart.initChart()
          }, 500)
        }
      })
    },
    // 获取停车位资源 周，月，年接口
    getCarUsageRatesBy (params) {
      sourceMirror.getCarUsageRatesBy(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          // console.log('%c 获取停车位资源', 'color: blue', result)
          this.resetPartUserData(result)
          setTimeout(() => {
            this.$refs.parkPerChart.initChart()
          }, 200)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../../../style/color.less";
.li-selected {
  font-weight: bold !important;
  color: #35e9ff !important;
}
.span-selected {
  color: #ffffff !important;
}
.retract-content {
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.margin-10 {
  margin-top: 10px;
}
.dz-left-module {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  &-row {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 15px;
    justify-content: space-between;
    height: 50%;
    .change-chart-time {
      display: flex;
      justify-content: space-between;
      line-height: 22px;
      margin-top: 15px;
      font-size: 12px;
      color: @white;
      .title-span {
        font-weight: 600;
      }
      .time-span {
        display: flex;
        justify-content: space-between;
        span {
          cursor: pointer;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 500;
          padding-right: 12px;
          font-weight: 600;
        }
      }
    }
    .change-chart-type {
      display: flex;
      width: 100%;
      margin: 10px 0;
      ul {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        overflow: hidden;
        li {
          color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          display: block;
          margin: 0 6px;
        }
        li:first-child {
          margin-left: 0;
        }
      }
    }
  }
  &-row:last-child {
    margin-bottom: 0;
  }
  .flow-div-content1 {
    height: 54%;
    display: flex;
    flex-flow: column;
    position: relative;
  }
  .flow-div-content2 {
    height: 46%;
    display: flex;
    flex-flow: column;
    position: relative;
  }
  .flow-chart-div {
    height: 80%;
    min-height: 100px;
  }
  .flow-chart-div2 {
    height: 100%;
    min-height: 100px;
  }
}
</style>