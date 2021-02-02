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
      <sinan total='522'
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
export default {
  components: { titleDiv, barChart, waterPolo, sinan, pieChart3, videoModule },
  data () {
    return {
      valueBar: [941, 490, 560, 279, 210],
      xAxisData: ['行人违章', '交通事故', '刑侦案件', '行政事件', '设备运维'],
      colorPie2: ['#91CB74'],
      valuePie2: [
        { value: 1000, name: '累计生产清洁能源(度)' },
      ],
      totalPie2: 1000,
      colorPie3: ['#FAC858'],
      valuePie3: [
        { value: 400, name: '累计节约标准煤(千克)' }
      ],
      totalPie3: 400,
      waterData1: [
        {
          name: 'CO',
          value: 0.45,
          num: 1088
        }
      ],
      waterData2: [
        {
          name: 'SO2',
          value: 0.6,
          num: 2013
        }
      ],
      waterData3: [
        {
          name: 'CO2',
          value: 0.25,
          num: 1880
        }
      ],
      waterData4: [
        {
          name: 'NO2',
          value: 0.3,
          num: 1288
        }
      ]
    }
  },
  mounted () {

  },
  methods: {

  }
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
      width: 100px;
      height: 100px;
    }
    span {
      width: 140px;
      height: 22px;
      line-height: 22px;
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
    width: 58px;
    height: 58px;
    left: 70px;
    top: 54%;
    .reduction-chart {
      width: 56px;
      height: 56px;
    }
  }
  &-div:nth-child(2) {
    width: 70px;
    height: 70px;
    left: 140px;
    top: 46%;
    .reduction-chart {
      width: 68px;
      height: 68px;
    }
  }
  &-div:nth-child(3) {
    width: 52px;
    height: 52px;
    left: 226px;
    top: 50%;
    .reduction-chart {
      width: 50px;
      height: 50px;
    }
  }
  &-div:nth-child(4) {
    width: 50px;
    height: 50px;
    left: 286px;
    top: 56%;
    .reduction-chart {
      width: 48px;
      height: 48px;
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
  }
}
</style>