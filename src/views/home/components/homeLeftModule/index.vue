<template>
  <div class="dz-left-module">
    <div class="dz-left-module-row progect-div">
      <titleDiv title='项目分布'></titleDiv>
      <pieChartBg></pieChartBg>
    </div>
    <div class="dz-left-module-row progect-div">
      <titleDiv title='项目总数'></titleDiv>
      <pieChart2 :color='colorPie2'
                 :value='valuePie2'></pieChart2>
      <div class="chart-pie-center">{{totalPie2}}</div>
    </div>
    <div class="dz-left-module-row system-div">
      <titleDiv title='系统总数'></titleDiv>
      <pieChart2 :color='colorPie3'
                 :value='valuePie3'
                 :legendShow='true'
                 :labelShow='true'></pieChart2>
      <div class="chart-pie-center">{{totalPie2}}</div>
    </div>
    <div class="dz-left-module-row system-div">
      <titleDiv title='设备总数'></titleDiv>
      <randarChart :value='randar'></randarChart>
      <div class="chart-randar-center">{{randarTotal}}</div>
    </div>
  </div>
</template>
<script>
import titleDiv from "@/components/titleModule";
import pieChartBg from "@/components/charts/pieChartBg.vue";
import pieChart2 from "@/components/charts/pieChart2.vue";
import randarChart from "@/components/charts/randar.vue";
export default {
  components: { titleDiv, pieChartBg, pieChart2, randarChart },
  data () {
    return {
      // xdata: ['a', 'b', 'c', 'd'],
      // data: [120, 200, 150, 80],
      // teamX: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      // teamData: [
      //   [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3, 2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
      //   [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3, 2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
      // ],
      colorPie2: ['#35E9FF', '#EE6666', '#FC8452', '#91CB74', '#FAC858', '#9A60B4', '#5470C6', '#F264DB', '#3CA272', '#73C0DE'],
      valuePie2: [
        { value: 348, name: '市政' },
        { value: 635, name: '交通' },
        { value: 580, name: '园林' },
        { value: 484, name: '企业' },
        { value: 300, name: '景区' },
        { value: 300, name: '园区' }
      ],
      totalPie2: 2983,
      totalPie3: 3553,
      colorPie3: ['#35E9FF', '#EE6666', '#FC8452', '#91CB74', '#FAC858', '#9A60B4', '#5470C6', '#F264DB', '#3CA272', '#73C0DE'],
      valuePie3: [
        { value: 189, name: '过街系统' },
        { value: 675, name: '景观步道系统' },
        { value: 451, name: '停车系统' },
        { value: 529, name: '市政系统' },
        { value: 506, name: '公交站系统' },
        { value: 347, name: '道路引导系统' },
        { value: 79, name: '照明系统' },
        { value: 651, name: '幕墙系统' }
      ],
      randar: [{ name: '发光标线', value: 2023, },
      { name: '停车立柱', value: 1908 },
      { name: '过街立柱', value: 1708 },
      { name: '景观椅', value: 808 },
      { name: '合杆', value: 2189 },
      { name: '智慧砖', value: 2354 },
      { name: '井盖', value: 1271 },
      { name: '智慧路灯', value: 2871 },
      ],
      randarTotal: 18900
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
.dz-left-module {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  // align-content: space-between;
  // align-items: flex-start;
  &-row {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .progect-div {
    height: 20%;
    position: relative;
  }
  .system-div {
    height: 30%;
    position: relative;
  }
  .chart-pie-center {
    position: absolute;
    width: 100px;
    height: 22px;
    left: 50%;
    top: 100px;
    font-size: 22px;
    line-height: 22px;
    text-align: center;
    color: @white;
    margin-left: -50px;
    font-weight: 600;
  }
  .chart-randar-center {
    position: absolute;
    width: 100px;
    height: 22px;
    left: 50%;
    top: 50%;
    font-size: 22px;
    line-height: 22px;
    text-align: center;
    color: @white;
    margin-left: -50px;
    font-weight: 600;
  }
}
</style>