<template>
  <div class="dz-content-bottom-module">
    <div class="dz-content-bottom-module-title">
      <titleDiv title='车位收费统计'></titleDiv>
      <div class="change-chart-time">
        <div class="time-span">
          <span v-for="(item, index) in timeList2"
                :key="index"
                :class="[{'span-selected': timeSelectIndex2 === index}]"
                @click="changeTime2(item.name,index)">{{item.name}}</span>
        </div>
      </div>
    </div>
    <div class="dz-content-bottom-module-table">
      <div class="change-chart-type">
        <ul>
          <li v-for="(item, index) in parkList"
              :key="index"
              :class="[{'li-selected': parkLiIndex === index}]"
              @click="selectPark(item, index)">{{item.name}}</li>
        </ul>
      </div>
      <div class="table-content">
        <div class="table-content-revenue">
          <ul>
            <li>营收总额（元）</li>
            <li>{{costStatsData.money}}</li>
            <li>年环比<i v-if="costStatsData.huaibi > 0"
                 class="el-icon-top"></i><i v-else
                 class="el-icon-bottom"></i><span>{{Math.abs(costStatsData.huaibi)}}%</span></li>
          </ul>
        </div>
        <div class="table-content-pie">
          <pieChart6 :value='valuePie'
                     ref="valueChart"></pieChart6>
        </div>
        <div class="table-content-bar">
          <barChart3 class="bar-chart-div"
                     ref="barChart"
                     :xAxisData='flowXAxis'
                     :yAxisData='flowYAxis'
                     :title="flowTitle">
          </barChart3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import titleDiv from "@/components/titleModule";
import pieChart6 from '@/components/charts/pieChart6.vue'
import barChart3 from '@/components/charts/barChart3.vue'
import eventBus from '@/utils/bus'
import { mapState, mapActions } from 'vuex'
export default {
  components: { titleDiv, pieChart6, barChart3 },
  data () {
    return {
      timeList2: [
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
      timeSelectIndex2: 3,
      parkList: [
        {
          name: '全部',
          id: 'all'
        },
        {
          name: '思贤公园',
          id: '1'
        },
        {
          name: '市民广场',
          id: '2'
        },
        {
          name: '地铁广场',
          id: '3'
        }
      ],
      parkLiIndex: 0,
      flowXAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      flowYAxis:
        [76, 86, 96, 104, 110, 112, 120, 130, 140, 146, 150, 170, 200],
      flowTitle: [],
      costStatsData: {},
      valuePie: [
        [],
        [],
        []
      ]
    }
  },
  computed: {
    ...mapState({
      sceneInfo: state => state.home.sceneInfo,
    })
  },
  watch: {
    sceneInfo: {
      deep: true,
      handler (newVal, oldVal) {
        console.log('sceneInfo---homeBottomModule', newVal)
        if (newVal) {
          this.resetCostStatsData(newVal.costStats)
          setTimeout(() => {
            this.$refs.valueChart.initChart()
            this.$refs.barChart.initChart()
          }, 200)
        }
      }
    }
  },
  methods: {
    ...mapActions(['changeProjectData']),
    changeTime2 (type, index) {
      this.timeSelectIndex2 = index
    },
    selectPark (data, index) {
      this.parkLiIndex = index
      this.resetCostStatsData(this.sceneInfo.costStats)
      setTimeout(() => {
        this.$refs.valueChart.initChart()
        this.$refs.barChart.initChart()
      }, 200)
    },
    resetCostStatsData (data) {
      if (data && data.chargeInfo) {
        data.chargeInfo.forEach(item => {
          if (item.type === '1') {
            this.costStatsData = item
          } else if (item.type === '2') {
            this.valuePie[0] = [item.name, item.money, item.zb]
          } else if (item.type === '3') {
            this.valuePie[1] = [item.name, item.money, item.zb]
          } else if (item.type === '4') {
            this.valuePie[2] = [item.name, item.money, item.zb]
          }
        });
      }
      this.flowXAxis = []
      this.flowYAxis = []
      if (data && data.chargeIndex) {
        data.chargeIndex.forEach(item => {
          this.flowXAxis.push(item.date)
          if (this.parkLiIndex === 0) {
            this.flowYAxis.push(item.sumMoney / 10000)
          } else if (this.parkLiIndex === 1) {
            this.flowYAxis.push(item.sxgy / 10000)
          } else if (this.parkLiIndex === 2) {
            this.flowYAxis.push(item.smgy / 10000)
          } else if (this.parkLiIndex === 3) {
            this.flowYAxis.push(item.dtgc / 10000)
          }

        });
      }
      console.log('this.flowXAxis = []', this.flowXAxis)
      console.log('this.flowYAxis = []', this.flowYAxis)
    }


  },
  mounted () {
    this.resetCostStatsData(this.sceneInfo.costStats)
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
.change-chart-time {
  display: flex;
  justify-content: space-between;
  line-height: 22px;
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
      padding-right: 12px;
      font-weight: 600;
    }
  }
}
.change-chart-type {
  display: flex;
  width: 100%;
  padding: 6px 20px 10px 20px;
  ul {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    overflow: hidden;
    li {
      color: rgba(255, 255, 255, 0.5);
      cursor: pointer;
      display: block;
      margin: 0 10px;
    }
    li:first-child {
      margin-left: 0;
    }
  }
}
.dz-content-bottom-module {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #090e45 0%, rgba(8, 13, 68, 0.8) 100%);
  &-title {
    width: 100%;
    height: 48px;
    background: rgba(84, 112, 198, 0.15);
    padding: 16px 20px;
    display: flex;
    justify-content: space-between;
  }
  &-table {
    width: 100%;
    height: calc(100% - 48px);
    padding: 10px;
    display: flex;
    flex-direction: column;
  }
  .table-content {
    height: 120px;
    margin: 6px 20px 20px 20px;
    display: flex;
    justify-content: space-between;
    &-revenue {
      width: 200px;
      height: 100%;
      background: rgba(53, 233, 255, 0.1);
      position: relative;
      ul {
        display: flex;
        flex-direction: column;
        text-align: center;
        color: @white;
        li {
          padding-top: 4px;
        }
        li:nth-child(1) {
          font-weight: bold;
          font-size: 12px;
          line-height: 22px;
          margin-top: 20px;
        }
        li:nth-child(2) {
          font-weight: bold;
          font-size: 26px;
          line-height: 22px;
          color: #ffffff;
        }
        li:nth-child(3) {
          font-size: 12px;
          line-height: 22px;
          span,
          i {
            color: #3ca272;
          }
        }
      }
    }
    &-pie {
      width: 300px;
      height: 100%;
    }
    &-bar {
      width: 400px;
      height: 100%;
      .bar-chart-div {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>