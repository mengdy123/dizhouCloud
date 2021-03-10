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
              <img src="../../../../assets/weather.png"
                   alt="">
            </li>
            <li>
              <span>天气</span>
              <span>小雨</span>
            </li>
            <li>
              <span>温度</span>
              <span>15℃</span>
            </li>
            <li>
              <span>能见度</span>
              <span class="green-font">良好</span>
            </li>
          </ul>
          <div class="weather-content-div-warning">
            <span>预警</span>
            <span>预计未来6小时降水量增大，需预警路面湿滑。</span>
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
              <span class="green-font">良</span>
            </li>
            <li>
              <span>PM2.5</span>
              <span>32</span>
            </li>
            <li>
              <span>PM10</span>
              <span>72</span>
            </li>
            <li>
              <span>CO</span>
              <span>0.63</span>
            </li>
            <li>
              <span>SO2</span>
              <span>5</span>
            </li>
            <li>
              <span>NO2</span>
              <span>43</span>
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
              <span>11253</span>
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
                  @click="changeTime(item.name,index)">{{item.name}}</span>
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
          name: '天'
        },
        {
          name: '周'
        },
        {
          name: '月'
        },
        {
          name: '年'
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
      randarTotal: 0,
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
          value: 4458
        },
        {
          name: '舞台',
          value: 4458
        },
        {
          name: '太阳能座椅',
          value: 4458
        },
        {
          name: '斑马线',
          value: 4458
        },
        {
          name: '舞台',
          value: 4458
        },
        {
          name: '井盖',
          value: 4458
        },
      ]
    }
  },
  computed: {
    ...mapState({
      homeIndexInfo: state => state.home.homeIndexInfo,
    })
  },
  watch: {
    homeIndexInfo: {
      deep: true,
      handler (newVal, oldVal) {
        // console.log('homeIndexInfo---newVal', newVal)
        if (newVal) {
          this.resetLeftModuleData(newVal)
          this.bugList = newVal.warningList || []
          this.solve = newVal.warSolveList[0].solveNumber || 0
          this.solved = newVal.warSolveList[1].solveNumber || 0
          this.bugList.forEach(item => {
            if (item.deviceType && item.deviceType === '1') {
              item.deviceType = '发光标线'
            } else if (item.deviceType && item.deviceType === '2') {
              item.deviceType = '智慧路灯'
            } else if (item.deviceType && item.deviceType === '3') {
              item.deviceType = '井盖'
            } else if (item.deviceType && item.deviceType === '4') {
              item.deviceType = '智慧砖'
            } else if (item.deviceType && item.deviceType === '5') {
              item.deviceType = '合杆'
            } else if (item.deviceType && item.deviceType === '6') {
              item.deviceType = '井盖系统'
            } else if (item.deviceType && item.deviceType === '7') {
              item.deviceType = '过街立柱'
            } else if (item.deviceType && item.deviceType === '8') {
              item.deviceType = '停车立柱'
            }
          })
          setTimeout(() => {
            this.$refs.pieChartProject.initChart()
            this.$refs.pieChartSystem.initChart()
            this.$refs.pieChartEquipment.initChart()
          }, 500)
        }
      }
    }
  },
  mounted () {
    console.log('homeIndexInfo----homeBottomModule', this.homeIndexInfo.warGroupList)
    if (JSON.stringify(this.homeIndexInfo) != '{}') {
      this.resetLeftModuleData(this.homeIndexInfo)
      this.solve = this.homeIndexInfo.warSolveList[0].solveNumber || 0
      this.solved = this.homeIndexInfo.warSolveList[1].solveNumber || 0
      if (this.spanIndex === '0') {
        this.bugList = this.homeIndexInfo.warningList
        this.bugList.forEach(item => {
          if (item.deviceType && item.deviceType === '1') {
            item.deviceType = '发光标线'
          } else if (item.deviceType && item.deviceType === '2') {
            item.deviceType = '智慧路灯'
          } else if (item.deviceType && item.deviceType === '3') {
            item.deviceType = '井盖'
          } else if (item.deviceType && item.deviceType === '4') {
            item.deviceType = '智慧砖'
          } else if (item.deviceType && item.deviceType === '5') {
            item.deviceType = '合杆'
          } else if (item.deviceType && item.deviceType === '6') {
            item.deviceType = '井盖系统'
          } else if (item.deviceType && item.deviceType === '7') {
            item.deviceType = '过街立柱'
          } else if (item.deviceType && item.deviceType === '8') {
            item.deviceType = '停车立柱'
          }
        })
      } else {
        this.bugList = this.homeIndexInfo.warningListByReso
        this.bugList.forEach(item => {
          if (item.deviceType && item.deviceType === '1') {
            item.deviceType = '发光标线'
          } else if (item.deviceType && item.deviceType === '2') {
            item.deviceType = '智慧路灯'
          } else if (item.deviceType && item.deviceType === '3') {
            item.deviceType = '井盖'
          } else if (item.deviceType && item.deviceType === '4') {
            item.deviceType = '智慧砖'
          } else if (item.deviceType && item.deviceType === '5') {
            item.deviceType = '合杆'
          } else if (item.deviceType && item.deviceType === '6') {
            item.deviceType = '井盖系统'
          } else if (item.deviceType && item.deviceType === '7') {
            item.deviceType = '过街立柱'
          } else if (item.deviceType && item.deviceType === '8') {
            item.deviceType = '停车立柱'
          }
        })
      }
    }
  },

  methods: {
    changeEnergy (data) {
      this.energySelected = data
    },
    changeTime (type, index) {
      this.timeSelectIndex = index
    },
    selectRole (data, index) {
      this.roleLiIndex = index
    },
    ...mapActions(['saveBoxTypeTitle']),
    getAllPoint (type) {
      this.saveBoxTypeTitle(type)
      if (this.clickType === type) {
        eventBus.$emit('changeProjectLayerStatus', false)
        this.clickType = ''
      } else {
        eventBus.$emit('changeProjectLayerStatus', true)
        this.clickType = type
      }
    },
    changeArrayFun (arr, type) {
      let newArr = []
      let oldArr = []
      let name = ''
      if (arr.length > 0) {
        oldArr = JSON.parse(JSON.stringify(arr))
        oldArr.forEach((item, index) => {
          if (item.systemType && item.systemType === '1') {
            name = '过街系统'
          } else if (item.systemType && item.systemType === '2') {
            name = '出租车临停系统'
          } else if (item.systemType && item.systemType === '3') {
            name = '临停系统'
          } else if (item.systemType && item.systemType === '4') {
            name = '停车系统'
          } else if (item.systemType && item.systemType === '5') {
            name = '公交系统'
          } else if (item.systemType && item.systemType === '6') {
            name = '井盖系统'
          } else if (item.systemType && item.systemType === '7') {
            name = '座椅系统'
          } else if (item.systemType && item.systemType === '8') {
            name = '路灯系统'
          } else if (item.systemType && item.systemType === '9') {
            name = '景观灯系统'
          } else if (item.systemType && item.systemType === '10') {
            name = '智慧砖舞台系统'
          } else if (item.systemType && item.systemType === '11') {
            name = '灯控过街系统'
          } else if (item.systemType && item.systemType === '12') {
            name = '护树系统'
          } else if (item.systemType && item.systemType === '13') {
            name = '幕墙系统'
          } else {
            name = '其他'
          }
          newArr.push({
            name: name,
            value: item.typeNumber || 0,
            id: type + (index + 1),
            type: type
          })
        })
      }
      return newArr
    },
    clickSpan (num) {
      this.spanIndex = num
      if (num === '0') {
        this.bugList = this.homeIndexInfo.warningList
        this.bugList.forEach(item => {
          if (item.deviceType && item.deviceType === '1') {
            item.deviceType = '发光标线'
          } else if (item.deviceType && item.deviceType === '2') {
            item.deviceType = '智慧路灯'
          } else if (item.deviceType && item.deviceType === '3') {
            item.deviceType = '井盖'
          } else if (item.deviceType && item.deviceType === '4') {
            item.deviceType = '智慧砖'
          } else if (item.deviceType && item.deviceType === '5') {
            item.deviceType = '合杆'
          } else if (item.deviceType && item.deviceType === '6') {
            item.deviceType = '井盖系统'
          } else if (item.deviceType && item.deviceType === '7') {
            item.deviceType = '过街立柱'
          } else if (item.deviceType && item.deviceType === '8') {
            item.deviceType = '停车立柱'
          }
        })
      } else {
        this.bugList = this.homeIndexInfo.warningListByReso
        this.bugList.forEach(item => {
          if (item.deviceType && item.deviceType === '1') {
            item.deviceType = '发光标线'
          } else if (item.deviceType && item.deviceType === '2') {
            item.deviceType = '智慧路灯'
          } else if (item.deviceType && item.deviceType === '3') {
            item.deviceType = '井盖'
          } else if (item.deviceType && item.deviceType === '4') {
            item.deviceType = '智慧砖'
          } else if (item.deviceType && item.deviceType === '5') {
            item.deviceType = '合杆'
          } else if (item.deviceType && item.deviceType === '6') {
            item.deviceType = '井盖系统'
          } else if (item.deviceType && item.deviceType === '7') {
            item.deviceType = '过街立柱'
          } else if (item.deviceType && item.deviceType === '8') {
            item.deviceType = '停车立柱'
          }
        })
      }
    },
    summationFun (arr) {
      let total = 0
      if (arr.length > 0) {
        let oldArr = JSON.parse(JSON.stringify(arr))
        oldArr.forEach((item, index) => {
          total += item.typeNumber
        })
      }
      return total
    },
    resetLeftModuleData (data) {
      this.randar = this.changeArrayFun(data.deGroupList, 'regulations')
      this.randarTotal = this.summationFun(data.deGroupList)
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
  height: 70%;
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