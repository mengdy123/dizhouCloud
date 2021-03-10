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
          <barChart1 class="flow-chart-div"
                     :xAxisData='flowXAxis'
                     :yAxisData='flowYAxis'
                     :title="flowTitle"></barChart1>
        </div>
      </div>
      <div class="flow-div-content2">
        <div class="retract-content">
          <div class="change-chart-time">
            <div class="title-span">拥堵指数</div>
          </div>
          <lineChart class="flow-chart-div margin-10"
                     :xAxisData='congestionXAxis'
                     :yAxisData='congestionYAxis'
                     :title="congestionTitle"></lineChart>
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
                  @click="selectPark(item, index)">{{item.name}}</li>
            </ul>
          </div>
          <pieChart5 class="flow-chart-div2"></pieChart5>
        </div>
      </div>
      <div class="flow-div-content2">
        <div class="retract-content">
          <div class="change-chart-time">
            <div class="title-span">车位使用率</div>
            <div class="time-span">
              <span v-for="(item, index) in timeList2"
                    :key="index"
                    :class="[{'span-selected': timeSelectIndex2 === index}]"
                    @click="changeTime2(item.name,index)">{{item.name}}</span>
            </div>
          </div>
          <lineChart2 class="flow-chart-div margin-10"
                      :xAxisData='parkXAxis'
                      :yAxisData='parkYAxis'
                      :title="parkTitle"
                      :colors='colors'></lineChart2>
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
      flowXAxis: ['07:00', '07:15', '07:30', '07:45', '08:00', '08:15', '08:30', '08:45', '09:00', '09:15'],
      flowYAxis: [
        [196, 176, 166, 154, 144, 132, 120, 110, 100, 96],
        [96, 89, 76, 70, 68, 59, 52, 48, 44, 30]
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
      parkList: [
        {
          name: '全部',
          id: 'all'
        },
        {
          name: '出租车车位',
          id: 'taxi'
        },
        {
          name: '临停车位',
          id: 'shortPark'
        },
        {
          name: '收费车位',
          id: 'chargePark'
        }
      ],
      parkLiIndex: 0,
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
      timeSelectIndex2: 0,
      parkXAxis: ['00:00', '04:00', '08:00', '12:00', '14:00', '20:00'],
      parkYAxis: [
        [120, 190, 130, 180, 50, 100],
        [80, 120, 150, 160, 180, 90]
      ],
      parkTitle: ['已用车位', '空闲车位'],
      colors: ['#91CB74', '#7E8490']
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
          // this.resetLeftModuleData(newVal)
        }
      }
    }
  },
  mounted () {
    // console.log('homeIndexInfo', this.homeIndexInfo)
    // if (JSON.stringify(this.homeIndexInfo) != '{}') {
    //   this.resetLeftModuleData(this.homeIndexInfo)
    // }
  },
  methods: {
    ...mapActions(['saveBoxTypeTitle']),
    changeTime (type, index) {
      this.timeSelectIndex = index
    },
    changeTime2 (type, index) {
      this.timeSelectIndex2 = index
    },
    selectRole (data, index) {
      this.roleLiIndex = index
    },
    changeResource (data) {
      this.resourceSelected = data
    },
    selectPark (data, index) {
      this.parkLiIndex = index
    },
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