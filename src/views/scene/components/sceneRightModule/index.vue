<template>
  <div class="dz-left-module">
    <div class="dz-left-module-row energy-div">
      <changeTitleDiv :title="energyType"
                      :titleEd='energySelected'
                      @changeResource='changeEnergy'></changeTitleDiv>
      <div class="weather-content"
           v-if="energySelected === 0">
        <div class="weather-content-div">
          <ul class="weather-content-div-temperature">
            <li>
              <!-- <img src="../../../../assets/weather.png"
                   alt=""> -->
              <img :src="`/static/image/weather-icon-S2/64/${weatherInfo.icon}.png`"
                   alt="">
            </li>
            <li>
              <span>天气</span>
              <span>{{weatherInfo.text}}</span>
            </li>
            <li>
              <span>温度</span>
              <span>{{weatherInfo.temp}}℃</span>
            </li>
            <li>
              <span>能见度</span>
              <span class="green-font">{{weatherInfo.vis}}Km</span>
            </li>
          </ul>
          <div class="weather-content-div-warning"
               v-if="warningInfo.length > 0">
            <span>预警</span>
            <span>{{warningInfo[0].title}}</span>
          </div>
          <div class="weather-content-div-warning"
               v-else>
            <span>提示</span>
            <span>近期没有灾害预警，请放心出行</span>
          </div>
        </div>

        <div class="weather-content-history">
          <div class="weather-content-history-title">过去24小时AQI指数></div>
          <ul class="weather-content-history-list">
            <li>
              <i>AQI</i>
            </li>
            <li>
              <span>空气质量</span>
              <span class="green-font">{{airInfo.category}}</span>
            </li>
            <li>
              <span>PM2.5</span>
              <span>{{airInfo.pm2p5}}</span>
            </li>
            <li>
              <span>PM10</span>
              <span>{{airInfo.pm10}}</span>
            </li>
            <li>
              <span>CO</span>
              <span>{{airInfo.co}}</span>
            </li>
            <li>
              <span>SO2</span>
              <span>{{airInfo.so2}}</span>
            </li>
            <li>
              <span>NO2</span>
              <span>{{airInfo.no2}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="energy-content"
           v-if="energySelected === 1">
        <div class="energy-content-div">
          <ul>
            <li>
              <span>合计</span>
              <span>{{energyTotal}}</span>
              <i></i>
            </li>
          </ul>
          <ul>
            <li v-for="(item, index) in energyTypeList"
                :key="index">
              <span>{{item.name}}</span>
              <span>{{item.value}}</span>
              <i></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="dz-left-module-row smart-div">
      <titleDiv title='人工智能'></titleDiv>
      <div class="retract-content">
        <div class="change-chart-time">
          <div class="title-span">交通安全及社会安全监测</div>
          <div class="time-span">
            <span v-for="(item, index) in timeList"
                  :key="index"
                  :class="[{'span-selected': timeSelectIndex === index}]"
                  @click="changeTime(item.title,index)">{{item.name}}</span>
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
        <randarChart :value='randar'
                     :type='"regulations"'
                     :color='colors'
                     ref="pieChartEquipment"
                     class="regulations-chart-div"
                     :center='center'></randarChart>
        <lineChart2 class="flow-chart-div"
                    :xAxisData='parkXAxis'
                    :yAxisData='parkYAxis'
                    :title="parkTitle"
                    :color='lineColors'
                    ref="trafficChart"
                    :type='"personnel"'></lineChart2>
      </div>
    </div>
    <div class="dz-left-module-row warning-div">
      <titleDiv title='告警信息'></titleDiv>
      <div class="dz-warning-detail">
        <div class="detail-type">
          <span :class="{'span-active' : spanIndex === '0'}"
                @click="clickSpan('0')">待解决（{{solve}}）</span>
          <span :class="{'span-active' : spanIndex === '1'}"
                @click="clickSpan('1')">已解决（{{solved}}）</span>
        </div>
        <div class="detail-list">
          <el-carousel trigger="click"
                       height="180px">
            <el-carousel-item v-for="(item, index) in bugList"
                              :key="index">
              <!-- @click="showBugDetail(item)" -->
              <div class="detail-list-carousel">
                <ul>
                  <li>异常预判：{{item.prediction || '暂无数据'}}</li>
                  <li>设备类型：{{item.deviceType || '暂无数据'}}</li>
                  <li>设备编号：{{item.deviceCode || '暂无数据'}}</li>
                  <li>设备地址：{{item.deivceSite || '暂无数据'}}</li>
                  <li>维修进度：进行中</li>
                  <li>工单指派：000</li>
                  <!-- {{item.schedule || '暂无数据'}} -->
                </ul>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import titleDiv from "@/components/titleModule";
import changeTitleDiv from "@/components/titleModule/changeTitle.vue";
import randarChart from "@/components/charts/randar.vue";
import lineChart2 from '@/components/charts/lineChart2.vue'
import sourceMirror from '@/resource/sourceMirror'
import { mapState, mapActions } from 'vuex'
export default {
  components: { titleDiv, changeTitleDiv, randarChart, lineChart2 },
  data () {
    return {
      xAxisData: [],
      energyType: [
        {
          name: '气象环境',
          type: 'weather'
        },
        {
          name: '清洁能源',
          type: 'energy'
        }
      ],
      energySelected: 0,
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
      roleList: [
        {
          name: '全部',
          id: 'all'
        },
        {
          name: '设防点A',
          id: 'roleA'
        },
        {
          name: '设防点B',
          id: 'roleB'
        },
        {
          name: '设防点C',
          id: 'roleC'
        },
        {
          name: '设防点D',
          id: 'roleD'
        }
      ],
      roleLiIndex: 0,
      randar: [],
      colors: '#35E9FF',
      parkXAxis: ['00:00', '02:00', '04:00', '06:00', '08:00', '12:00'],
      parkYAxis: [
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 0, 0],
        [0, 5, 3, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 2, 5, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      parkTitle: ['交通事故', '行人违章', '行政违法', '人员跌倒', '失踪人口', '重点人员'],
      lineColors: ['#6045EB', '#F264DB', '#91CB74', '#FAC858', '#EE6666', '#35E9FF'],
      center: ['50%', '48%'],
      bugList: [],
      spanIndex: '0',
      solve: 0,
      solved: 0,
      energyTypeList: [
        {
          name: '太阳能路灯',
          value: 0,
          type: 'sunLamp'
        },
        {
          name: '舞台',
          value: 0,
          type: 'stage'
        },
        {
          name: '太阳能座椅',
          value: 0,
          type: 'sunChair'
        },
        {
          name: '斑马线',
          value: 0,
          type: 'zebraLine'
        },
        {
          name: '舞台',
          value: 0,
          type: 'stage'
        },
        {
          name: '井盖',
          value: 0,
          type: 'manholeCver'
        },
      ],
      energyTotal: 0
    }
  },
  computed: {
    ...mapState({
      sceneInfo: state => state.home.sceneInfo,
      deviceType: state => state.common.deviceType,
      systemType: state => state.common.systemType,
      weatherInfo: state => state.weather.weatherInfo,
      airInfo: state => state.weather.airInfo,
      warningInfo: state => state.weather.warningInfo,
      warningType: state => state.common.warningType,
    })
  },
  watch: {
    sceneInfo: {
      deep: true,
      handler (newVal, oldVal) {
        // intelligenceWireList
        // console.log('sceneInfo---newVal', newVal)
        if (newVal) {
          this.resetLeftModuleData(newVal)
          this.bugList = newVal.warningList || []
          this.solve = newVal.warSolveList[0].solveNumber || 0
          this.solved = newVal.warSolveList[1].solveNumber || 0
          this.bugList.forEach(item => {
            this.deviceType.forEach(it => {
              if (item.deviceType && item.deviceType === it.id) {
                item.deviceType = it.name
              }
            })
          })
          this.resetPartData(newVal.intelligenceWireList)
          // setTimeout(() => {
          this.$refs.pieChartProject.initChart()
          this.$refs.pieChartSystem.initChart()
          this.$refs.pieChartEquipment.initChart()
          this.$refs.trafficChart.initChart()
          // }, 200)
        }
      }
    }
  },
  mounted () {
    this.getCleanEnergy()
    this.resetLeftModuleData(this.sceneInfo)
    this.solve = this.sceneInfo.warSolveList[0].solveNumber || 0
    this.solved = this.sceneInfo.warSolveList[1].solveNumber || 0
    this.bugList = this.sceneInfo.warningList || []
    this.bugList.forEach(item => {
      this.deviceType.forEach(it => {
        if (item.deviceType && item.deviceType === it.id) {
          item.deviceType = it.name
        }
      })
    })
    this.resetPartData(this.sceneInfo.intelligenceWireList)
    // setTimeout(() => {
    this.$refs.pieChartProject.initChart()
    this.$refs.pieChartSystem.initChart()
    this.$refs.pieChartEquipment.initChart()
    // this.$refs.trafficChart.initChart()
    // }, 200)
    console.log('sceneInfo----homeBottomModule', this.sceneInfo)
  },

  methods: {
    ...mapActions(['saveBoxTypeTitle']),
    changeEnergy (data) {
      this.energySelected = data
    },
    changeTime (type, index) {
      this.timeSelectIndex = index
      this.getWarGroup(type)
    },
    selectRole (data, index) {
      this.roleLiIndex = index
    },
    resetPartData (list) {
      // console.log('%c 交通安全1', 'color: green', list)
      this.parkXAxis = []
      this.parkYAxis[0] = []
      this.parkYAxis[1] = []
      this.parkYAxis[2] = []
      this.parkYAxis[3] = []
      this.parkYAxis[4] = []
      this.parkYAxis[5] = []
      list.forEach(item => {
        this.parkXAxis.push(item.time)
        this.parkYAxis[0].push(item.jtsg)
        this.parkYAxis[1].push(item.rydd)
        this.parkYAxis[2].push(item.szrk)
        this.parkYAxis[3].push(item.xrwz)
        this.parkYAxis[4].push(item.xzwf)
        this.parkYAxis[5].push(item.zdry)
      })
      // console.log('%c 交通安全2', 'color: green', this.parkYAxis)
      // console.log('%c 交通安全3', 'color: green', this.parkXAxis)
    },
    changeArrayFun (arr, type) {
      let newArr = []
      let oldArr = []
      let name = ''
      if (arr.length > 0) {
        oldArr = JSON.parse(JSON.stringify(arr))
        oldArr.forEach((item, index) => {
          this.warningType.forEach(it => {
            if (item.warningType && item.warningType === it.id) {
              name = it.name
            }
          })
          newArr.push({
            name: name,
            value: item.typeNumber || 0,
            id: type + (index + 1),
            type: type
          })
        })
      }
      // console.log('newArr------', newArr)
      return newArr
    },
    clickSpan (num) {
      this.spanIndex = num
      if (num === '0') {
        this.bugList = this.sceneInfo.warningList
        this.bugList.forEach(item => {
          this.deviceType.forEach(it => {
            if (item.deviceType && item.deviceType === it.id) {
              item.deviceType = it.name
            }
          })
        })
      } else {
        this.bugList = this.sceneInfo.warningListByReso
        this.bugList.forEach(item => {
          this.deviceType.forEach(it => {
            if (item.deviceType && item.deviceType === it.id) {
              item.deviceType = it.name
            }
          })
        })
      }
    },
    resetLeftModuleData (data) {
      this.randar = this.changeArrayFun(data.warGroupList, 'regulations')
    },
    getCleanEnergy () {
      sourceMirror.getCleanEnergy().then(res => {
        // console.log('result---res', res)
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.energyTotal = result.sum
          this.energyTypeList.forEach(item => {
            item.value = result[item.type]

          })
        }
      })
    },
    getWarGroup (date) {
      sourceMirror.getWarGroup(date).then(res => {
        console.log('result---res', res)
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.resetPartData(result.intelligenceWireList)
          this.randar = this.changeArrayFun(result.warGroupList, 'regulations')
          setTimeout(() => {
            this.$refs.pieChartEquipment.initChart()
            this.$refs.trafficChart.initChart()
          }, 200)
        }
      })
    },

  },

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
.green-font {
  color: #3ca272 !important;
}
.flow-chart-div {
  height: 150px;
  min-height: 150px;
}
.regulations-chart-div {
  height: 50%;
  min-height: 150px;
}
.retract-content {
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.dz-left-module {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  &-row {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 15px;
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
    .weather-content {
      width: 100%;
      height: 100%;
      margin-top: 10px;
      padding: 0 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      &-div {
        &-temperature {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          li {
            margin: 0px 15px;
            display: flex;
            flex-direction: column;
            font-size: 12px;
            img {
              width: 26px;
              height: 26px;
              margin: 6px auto;
            }
            span {
              display: block;
            }
            span:last-child {
              font-weight: 600;
            }
          }
        }
        &-warning {
          display: flex;
          width: 100%;
          height: 30px;
          line-height: 30px;
          padding: 0px 14px;
          background: rgba(84, 112, 198, 0.15);
          overflow: hidden;
          margin-top: 10px;
          span {
            font-size: 12px;
            color: @white;
            display: block;
          }
          span:first-child {
            color: #fac858;
            font-weight: 600;
            margin-right: 10px;
          }
        }
      }

      &-history {
        display: flex;
        flex-direction: column;
        font-size: 12px;
        &-title {
          text-align: right;
          color: #cccccc;
          height: 22px;
          line-height: 22px;
        }
        ul {
          display: flex;
          justify-content: space-between;
          li {
            color: rgba(255, 255, 255, 0.5);
            cursor: pointer;
            display: block;
            margin: 0 4px;
            i {
              font-style: normal;
              color: #000000;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background: #3ca272;
              line-height: 30px;
              display: block;
              text-align: center;
              font-weight: 600;
              margin: 4px auto;
            }
            span {
              display: block;
              color: @white;
            }
            span:last-child {
              font-weight: 600;
            }
          }
        }
      }
    }
    .energy-content {
      width: 100%;
      height: 100%;
      margin-top: 10px;
      padding: 0 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      &-div {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        ul {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;
          height: 100%;
          flex-wrap: wrap;
          li {
            width: 30%;
            display: flex;
            flex-direction: column;
            margin-bottom: 10px;
            span:nth-child(1) {
              color: #cccccc;
              font-size: 12px;
              line-height: 22px;
            }
            span:nth-child(2) {
              color: @white;
              font-size: 16px;
              line-height: 22px;
              font-weight: 600;
            }
            i {
              width: 50%;
              height: 4px;
              background: linear-gradient(
                270deg,
                #35e9ff 0%,
                rgba(53, 233, 255, 0) 100%
              );
              border-radius: 9px;
            }
          }
        }
        ul:first-child {
          li {
            width: 100%;
          }
        }
      }
    }
    .dz-warning-detail {
      width: 100%;
      padding: 20px 20px 0 20px;
      height: 100%;
      .detail-type {
        display: flex;
        width: 100%;
        justify-content: flex-start;
        span {
          height: 16px;
          line-height: 16px;
          margin-right: 16px;
          text-align: center;
          color: #e1e6fa;
          font-size: 12px;
          opacity: 0.5;
          cursor: pointer;
        }
        .span-active {
          font-size: 12px !important;
          opacity: 1 !important;
          color: #35e9ff !important;
          font-weight: 600;
        }
      }
      .detail-list {
        width: 100%;
        height: 100%;
        /deep/ .el-carousel__arrow--right {
          right: -14px;
        }
        /deep/ .el-carousel__arrow--left {
          left: -14px;
        }
        &-carousel {
          display: flex;
          width: 90%;
          height: 100%;
          margin: 10px auto 0 auto;
          cursor: pointer;
          background: rgba(84, 112, 198, 0.15);
          padding: 20px 20px 0 20px;
          ul {
            width: 100%;
            li {
              color: #e1e6fa;
              font-size: 12px;
              opacity: 0.7;
              line-height: 22px;
              height: 22px;
              display: block;
            }
            li:first-child {
              color: #ffa321;
              opacity: 1;
            }
          }
        }
        /deep/ .el-carousel__indicators--horizontal {
          display: none;
        }
      }
    }
  }
  &-row:last-child {
    margin-bottom: 0;
  }
  .energy-div {
    height: 22%;
    position: relative;
  }
  .smart-div {
    height: 52%;
    position: relative;
  }
  .warning-div {
    height: 26%;
    // position: relative;
  }
}
</style>