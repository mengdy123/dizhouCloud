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
          <span>累计生产清洁能源(万度)</span>
        </div>
        <div class="energy-chart-list-div">
          <pieChart3 :color='colorPie3'
                     :value='valuePie3'
                     :total='totalPie3'
                     class='energy-chart'></pieChart3>
          <span>累计节约标准煤(吨)</span>
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
      <sinan :total='grandData'
             name='累计减排（吨）'></sinan>
    </div>

    <div class="dz-left-module-row system-div">
      <titleDiv title='告警信息'></titleDiv>
      <barChart :xAxisData='xAxisData'
                :value='valueBar'></barChart>
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
      // xAxisData: ['行人违章', '交通事故', '刑侦案件', '行政事件', '设备运维'],
      xAxisData: [],
      colorPie2: ['#91CB74'],
      valuePie2: [
        { value: 10000, name: '累计生产清洁能源(度)' },
      ],
      timer: null,
      totalPie2: 0,
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
      ],
      grandData: 0
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
          this.resetEnergyData(newVal.energy)
          this.resetWarningList(newVal.warGroupList)
        }
      }
    }
  },
  mounted () {
    console.log('homeIndexInfo----homeBottomModule', this.homeIndexInfo.warGroupList)
    if (JSON.stringify(this.homeIndexInfo) != '{}') {
      this.resetEnergyData(this.homeIndexInfo.energy)
      this.resetWarningList(this.homeIndexInfo.warGroupList)
    }
  },

  methods: {
    resetEnergyData (data) {
      this.totalPie2 = data.energy
      this.totalPie3 = data.coal
      this.valuePie2.num = data.energy
      this.valuePie3.num = data.coal
      this.waterData1[0].num = data.c
      this.waterData2[0].num = data.co2
      this.waterData3[0].num = data.so2
      this.waterData4[0].num = data.nox
      this.waterData1[0].value = data.c / data.count
      this.waterData2[0].value = data.co2 / data.count
      this.waterData3[0].value = data.so2 / data.count
      this.waterData4[0].value = data.nox / data.count
      this.grandData = data.count
    },
    resetWarningList (data) {
      this.valueBar = []
      this.xAxisData = []
      data.forEach(item => {
        this.valueBar.push(item.typeNumber)
        this.xAxisData.push(item.warningType)
      })
      console.log('this.xAxisData', this.xAxisData)
    }
  },

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