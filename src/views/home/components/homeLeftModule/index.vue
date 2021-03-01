<template>
  <div class="dz-left-module">
    <div class="dz-left-module-row progect-div">
      <titleDiv title='项目分布'></titleDiv>
      <pieChartBg :value='projectPlan'></pieChartBg>
    </div>
    <div class="dz-left-module-row progect-div">
      <titleDiv title='项目总数'></titleDiv>
      <pieChart4 :color='colorPie2'
                 :value='valuePie2'
                 :type='"project"'></pieChart4>
      <div class="chart-pie-center"
           @click="getAllPoint('project')">{{totalPie2}}</div>
    </div>
    <div class="dz-left-module-row chart-div">
      <titleDiv title='系统总数'></titleDiv>
      <pieChart4 :color='colorPie2'
                 :value='valuePie3'
                 :labelShow='true'
                 :legendShow='true'
                 :type='"system"'></pieChart4>
      <div class="chart-pie-center"
           @click="getAllPoint('system')">{{totalPie3}}</div>
    </div>
    <div class="dz-left-module-row system-div">
      <titleDiv title='设备总数'></titleDiv>
      <randarChart :value='randar'
                   :type='"equipment"'></randarChart>
      <div class="chart-randar-center"
           @click="getAllPoint('equipment')">{{randarTotal}}</div>
    </div>
  </div>
</template>
<script>
import titleDiv from "@/components/titleModule";
import pieChartBg from "@/components/charts/pieChartBg.vue";
import pieChart4 from "@/components/charts/pieChart4.vue";
import randarChart from "@/components/charts/randar.vue";
import { mapState, mapActions } from 'vuex'
import eventBus from '@/utils/bus'
export default {
  components: { titleDiv, pieChartBg, pieChart4, randarChart },
  data () {
    return {
      projectPlan: [],
      colorPie2: ['#35E9FF', '#EE6666', '#FC8452', '#91CB74', '#FAC858', '#9A60B4', '#5470C6', '#F264DB', '#3CA272', '#73C0DE'],
      valuePie2: [],
      totalPie2: 0,
      totalPie3: 0,
      valuePie3: [],
      randar: [],
      randarTotal: 0,
      clickType: ''
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
        }
      }
    }
  },
  mounted () {
    // console.log('homeIndexInfo', this.homeIndexInfo)
    if (JSON.stringify(this.homeIndexInfo) != '{}') {
      this.resetLeftModuleData(this.homeIndexInfo)
    }
  },
  methods: {
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
      let oldArr
      if (arr) {
        oldArr = JSON.parse(JSON.stringify(arr))
        oldArr.forEach((item, index) => {
          newArr.push({
            name: item.projectType || item.systemType || item.deviceType,
            value: item.typeNumber,
            id: 's' + (index + 1),
            type: type
          })
        })
      }
      return newArr
    },
    summationFun (arr) {
      let total = 0
      let oldArr = JSON.parse(JSON.stringify(arr))
      oldArr.forEach((item, index) => {
        total += item.typeNumber
      })
      return total
    },
    resetLeftModuleData (data) {
      this.projectPlan = this.homeIndexInfo.companyGroupList
      this.valuePie2 = this.changeArrayFun(this.homeIndexInfo.typeGroupList, 'project')
      this.valuePie3 = this.changeArrayFun(this.homeIndexInfo.sysGroupList, 'system')
      this.randar = this.changeArrayFun(this.homeIndexInfo.deGroupList, 'equipment')
      this.totalPie2 = this.summationFun(this.homeIndexInfo.typeGroupList)
      this.totalPie3 = this.summationFun(this.homeIndexInfo.sysGroupList)
      this.randarTotal = this.summationFun(this.homeIndexInfo.deGroupList)
    },
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
  .chart-pie-center {
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
    cursor: pointer;
  }
  .chart-div {
    height: 30%;
    position: relative;
    .chart-pie-center {
      top: 35%;
    }
  }
  .system-div {
    height: 30%;
    position: relative;
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