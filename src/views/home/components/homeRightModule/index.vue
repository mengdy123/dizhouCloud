<template>
  <div class="dz-left-module">
    <div class="dz-left-module-row energy-div">
      <titleDiv title='能源与环境信息'></titleDiv>
      <div class="energy-chart-list">
        <div class="energy-chart-list-div">
          <pieChart3 :color='colorPie2'
                     :value='valuePie2'
                     :total='totalPie2'
                     class='energy-chart'></pieChart3>
          <span>累计生产清洁能源(度)</span>
        </div>
        <div class="energy-chart-list-div">
          <pieChart3 :color='colorPie3'
                     :value='valuePie3'
                     :total='totalPie3'
                     class='energy-chart'></pieChart3>
          <span>累计节约标准煤(千克)</span>
        </div>
      </div>
      <div class="reduction-chart-list">
        <div class="reduction-chart-list-div">
          <waterPolo class='reduction-chart'
                     :value='waterData1'></waterPolo>
        </div>
        <div class="reduction-chart-list-div">
          <waterPolo class='reduction-chart'
                     :value='waterData2'></waterPolo>
        </div>
        <div class="reduction-chart-list-div">
          <waterPolo class='reduction-chart'
                     :value='waterData3'></waterPolo>
        </div>
        <div class="reduction-chart-list-div">
          <waterPolo class='reduction-chart'
                     :value='waterData4'></waterPolo>
        </div>
      </div>
      <sinan total='5256'
             name='累计减排（千克）'></sinan>
    </div>

    <div class="dz-left-module-row system-div">
      <titleDiv title='告警信息'></titleDiv>
      <barChart :value='valueBar'
                :xAxisBar='xAxisData'></barChart>
    </div>
    <div class="dz-left-module-row system-div">
      <titleDiv title='重点项目监控'></titleDiv>
      <videoModule></videoModule>
    </div>
  </div>
</template>
<script>
import titleDiv from "@/components/titleModule";
import barChart from "@/components/charts/barChart.vue";
import waterPolo from "@/components/charts/waterPolo.vue";
import sinan from '@/components/Animation/sinan.vue'
import pieChart3 from "@/components/charts/pieChart3.vue";
import videoModule from '../videoModule'
import { mapState, mapActions } from 'vuex'
export default {
  components: { titleDiv, barChart, waterPolo, sinan, pieChart3, videoModule },
  data () {
    return {
      valueBar: [941, 490, 560, 279, 210],
      xAxisData: ['行人违章', '交通事故', '刑侦案件', '行政事件', '设备运维'],
      colorPie2: ['#91CB74'],
      valuePie2: [
        { value: 10000, name: '累计生产清洁能源(度)' },
      ],
      timer: null,
      totalPie2: 10000,
      colorPie3: ['#FAC858'],
      valuePie3: [
        { value: 4000, name: '累计节约标准煤(千克)' }
      ],
      totalPie3: 4000,
      waterData1: [
        {
          name: 'C',
          value: 0.45,
          num: 1088
        }
      ],
      waterData2: [
        {
          name: 'CO2',
          value: 0.8,
          num: 3988
        }
      ],
      waterData3: [
        {
          name: 'SO2',
          value: 0.25,
          num: 120
        }
      ],
      waterData4: [
        {
          name: 'NOx',
          value: 0.2,
          num: 60
        }
      ]
    }
  },
  computed: {
    ...mapState({
      addressInfo: state => state.map2D.addressInfo,

    })
  },
  watch: {
    addressInfo (newVal, oldVal) {
      console.log('newVal11--homeRightModule', newVal)
      if (newVal.length > 0) {
        this.valueBar.forEach(item => {
          item = parseInt(item / 1.5)
        })
      } else {
        this.valueBar = [941, 490, 560, 279, 210]
      }
    }
  },
  mounted () {
    // this.timer = setInterval(() => {
    //   this.startTimer();
    // }, 1000)
  },

  methods: {
    // startTimer () {
    //   this.valuePie2[0].value++
    // }
  },
  // destroyed () {
  //   clearInterval(this.timer);
  // },
}
</script>
<style lang="less" scoped>
@import "../../../../style/color.less";
.energy-chart-list {
  display: flex;
  width: 100%;
  margin-top: 5%;
  justify-content: space-around;
  &-div {
    position: relative;
    .energy-chart {
      width: 120px;
      height: 120px;
    }
    span {
      width: 160px;
      height: 26px;
      line-height: 26px;
      color: @white;
      text-align: center;
      position: absolute;
      left: -20px;
      bottom: 4px;
      font-size: 12px;
      background: url("../../../../assets/home/energy-bg.png") no-repeat;
      background-size: 100% 100%;
    }
  }
}
.reduction-chart-list {
  display: flex;
  width: 100%;
  margin-top: 10px;
  justify-content: space-around;
  flex: 1;
  &-div {
    position: absolute;
    border-radius: 50%;
    background: rgb(53 233 255 / 10%);
  }
  &-div:nth-child(1) {
    width: 78px;
    height: 78px;
    left: 70px;
    top: 54%;
    .reduction-chart {
      width: 76px;
      height: 76px;
    }
  }
  &-div:nth-child(2) {
    width: 90px;
    height: 90px;
    left: 140px;
    top: 46%;
    .reduction-chart {
      width: 88px;
      height: 88px;
    }
  }
  &-div:nth-child(3) {
    width: 72px;
    height: 72px;
    left: 226px;
    top: 50%;
    .reduction-chart {
      width: 70px;
      height: 70px;
    }
  }
  &-div:nth-child(4) {
    width: 60px;
    height: 60px;
    left: 286px;
    top: 56%;
    .reduction-chart {
      width: 68px;
      height: 68px;
    }
  }
}
.dz-left-module {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  &-row {
    display: flex;
    flex-direction: column;
    padding: 20px 20px;
  }
  .energy-div {
    height: 48%;
    background: @bgBlue;
    position: relative;
  }
  .system-div {
    height: 26%;
    background: @bgBlue;
    margin-top: 10px;
    width: 100%;
  }
}
</style>