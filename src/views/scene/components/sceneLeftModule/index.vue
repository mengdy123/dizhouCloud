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
          <pieChart5 class="flow-chart-div2"
                     ref="parkChart"
                     :value='parkData'
                     :valuePer='parkDataPer'></pieChart5>
        </div>
      </div>
      <div class="flow-div-content2">
        <div class="retract-content">
          <div class="change-chart-time">
            <div class="title-span">车位使用率</div>
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
import pieChart5 from '@/components/charts/pieChart5.vue'
import lineChart from '@/components/charts/lineChart.vue'
import lineChart2 from '@/components/charts/lineChart2.vue'
import { mapState, mapActions } from 'vuex'
import sourceMirror from '@/resource/sourceMirror'
import eventBus from '@/utils/bus'
export default {
  components: { titleDiv, barChart1, lineChart, changeTitleDiv, pieChart5, lineChart2 },
  data () {
    return {
      roleList: [
        {
          name: '全部',
          id: 'all'
        },
        {
          name: '道路A',
          id: 'roleA'
        },
        {
          name: '道路B',
          id: 'roleB'
        },
        {
          name: '道路C',
          id: 'roleC'
        },
        {
          name: '道路D',
          id: 'roleD'
        },
        {
          name: '道路E',
          id: 'roleE'
        },
        {
          name: '道路F',
          id: 'roleF'
        },
        {
          name: '道路D',
          id: 'roleD'
        }
      ],
      roleLiIndex: 0,
      timeList: [
        {
          name: '天',
          title: 'days'
        },
        {
          name: '周',
          title: 'week'
        },
        {
          name: '月',
          title: 'months'
        },
        {
          name: '年',
          title: 'years'
        },
      ],
      timeSelectIndex: 0,
      flowXAxis: [],
      flowYAxis: [
        [],
        []
      ],
      flowTitle: ['车流量', '人流量'],
      congestionXAxis: ['00:00', '04:00', '08:00', '12:00', '14:00', '20:00'],
      congestionYAxis: [
        [1.06, 1.19, 1.25, 0.76, 0.63, 0.75],
        [1.16, 1.29, 1.35, 0.86, 0.73, 0.85],
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
          type: 'all'
        },
        {
          name: '出租车车位',
          type: 'taxi'
        },
        {
          name: '临停车位',
          type: 'shortPark'
        },
        {
          name: '收费车位',
          type: 'chargePark'
        }
      ],
      parkLiIndex: 0,
      timeList2: [
        {
          name: '天',
          title: 'days'
        },
        {
          name: '周',
          title: 'week'
        },
        {
          name: '月',
          title: 'months'
        },
        {
          name: '年',
          title: 'years'
        },
      ],
      timeSelectIndex2: 0,
      parkXAxis: ['00:00', '04:00', '08:00', '12:00', '14:00', '20:00'],
      parkYAxis: [
        [120, 190, 130, 180, 50, 100],
        [80, 120, 150, 160, 180, 90]
      ],
      parkTitle: ['已用车位', '空闲车位'],
      colors: ['#91CB74', '#7E8490'],
      parkData: [],
      parkDataPer: []
    }
  },
  computed: {
    ...mapState({
      sceneInfo: state => state.home.sceneInfo,
      wellTypeList: state => state.common.wellTypeList,
    })
  },
  watch: {
    sceneInfo: {
      deep: true,
      handler (newVal, oldVal) {
        // console.log('sceneInfo---newVal', newVal)
        // carParkConlList 停车位资源
        // carUsageRatesList 车位使用率
        if (newVal) {
          this.resetFlowData(newVal.lowStatisticsList)
          this.$refs.flowChart.initChart()
          this.resetCongestionData(newVal.blockIndex)
          this.$refs.congestionChart.initChart()
          this.resetParkData(newVal.carParkConlList)
          this.$refs.parkChart.initChart()
          this.resetPartUserData(newVal.carUsageRatesList)
          this.$refs.parkPerChart.initChart()
        }
      }
    }
  },
  mounted () {
    let id = this.$route.query.id || 1
    this.$store.dispatch('getProjectsum', id)
    this.parkList = this.parkList1
    setTimeout(() => {
      this.resetFlowData(this.sceneInfo.lowStatisticsList)
      this.$refs.flowChart.initChart()
      this.resetCongestionData(this.sceneInfo.blockIndex)
      this.$refs.congestionChart.initChart()
      this.resetParkData(this.sceneInfo.carParkConlList)
      this.$refs.parkChart.initChart()
      this.resetPartUserData(this.sceneInfo.carUsageRatesList)
      // this.$refs.parkPerChart.initChart()
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
            this.flowXAxis.push(item.time)
            this.flowYAxis[1].push(item.count)
          }
        });
        // console.log(' this.flowXAxis', this.flowXAxis)
        // console.log(' this.flowYAxis', this.flowYAxis)
      }
    },
    resetCongestionData (list) {
      // console.log('%c 拥堵指数', 'color: green', list)
      this.congestionYAxis[0] = []
      this.congestionYAxis[1] = []
      this.congestionYAxis[0] = list.blockIndexHiList
      this.congestionYAxis[1] = list.blockIndexList
    },
    resetParkData (list) {
      // console.log('%c 停车位资源', 'color: green', list)
      this.parkDataPer = []
      this.parkData = []
      list.forEach(item => {
        if (this.parkLiIndex === 0) {
          if (item.type === '1') {
            let data1 = Object.assign({}, item)
            data1.sumZb = data1.remainZb
            this.parkDataPer.push(item)
            this.parkDataPer.push(data1)
          } else if (item.type === '2' || item.type === '3' || item.type === '4') {
            this.parkData.push(item)
          }
        } else {
          if (item.type === '1') {
            let data1 = Object.assign({}, item)
            data1.sumZb = data1.remainZb
            this.parkDataPer.push(item)
            this.parkDataPer.push(data1)
          } else if (item.type === '5' || item.type === '6' || item.type === '6') {
            this.parkData.push(item)
          }
        }
      })
      this.parkDataPer.forEach(it => {
        it.value = it.sumZb
        it.name = ''
      })
      if (this.resourceSelected == '0') {
        this.parkData.forEach(it => {
          it.value = it.sumZb
          if (it.type === '2' || it.type === '5') {
            it.name = '出租车'
          } else if (it.type === '3' || it.type === '6') {
            it.name = '临停'
          } else if (it.type === '4' || it.type === '7') {
            it.name = '收费'
          }
        })
      } else {
        this.parkData.forEach(it => {
          it.value = it.sumZb

        })
      }

    },
    resetPartUserData (list) {
      // console.log('%c 车位使用率', 'color: green', list)
      this.parkXAxis = []
      this.parkYAxis[0] = []
      this.parkYAxis[1] = []
      list.forEach(item => {
        this.parkXAxis.push(item.date)
        this.parkYAxis[0].push(item.carUsageRates)
        this.parkYAxis[1].push(item.carUsageRatesHi)
      })
    },
    changeTime (type, index) {
      this.timeSelectIndex = index
      this.getFlowBy(type)
    },
    changeTime2 (type, index) {
      this.timeSelectIndex2 = index
      this.getCarUsageRatesBy(type)
    },
    selectRole (data, index) {
      this.roleLiIndex = index
    },
    changeResource (data) {
      let id = this.$route.query.id || 1
      this.resourceSelected = data
      if (data === 1) {
        this.getManholeCover(id)
        this.parkList = this.wellTypeList
      } else {
        this.parkList = this.parkList1
        this.resetParkData(this.sceneInfo.carParkConlList)
        setTimeout(() => {
          this.$refs.parkChart.initChart()
        }, 200)
      }
    },
    selectPark (data, index) {
      let id = this.$route.query.id || 1
      this.parkLiIndex = index
      if (this.resourceSelected === 1) {
        this.getManholeCover(id)
      } else {
        this.resetParkData(this.sceneInfo.carParkConlList)
      }

      setTimeout(() => {
        this.$refs.parkChart.initChart()
      }, 200)
    },
    getFlowBy (date) {
      sourceMirror.getFlowBy(date).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.resetFlowData(result)
          setTimeout(() => {
            this.$refs.flowChart.initChart()
          }, 200)
        }
      })
    },
    getManholeCover (id) {
      sourceMirror.getManholeCover(id).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          // console.log('%c result', 'color: blue', result)
          this.resetParkData(result)
          setTimeout(() => {
            this.$refs.parkChart.initChart()
          }, 200)
        }
      })
    },
    getCarUsageRatesBy (date) {
      sourceMirror.getCarUsageRatesBy(date).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
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