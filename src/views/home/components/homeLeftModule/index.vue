<template>
  <div class="dz-left-module">
    <div class="dz-left-module-row progect-div">
      <titleDiv title='项目分布'></titleDiv>
      <pieChartBg :value='projectPlan'
                  class="pie-chart-dom"></pieChartBg>
    </div>
    <div class="dz-left-module-row progect-all">
      <titleDiv title='项目总数'></titleDiv>
      <pieChart4 :color='colorPie2'
                 :value='valuePie2'
                 :type='"project"'
                 class="pie-chart-dom"
                 ref="pieChartProject"></pieChart4>
      <div class="chart-pie-center"
           @click="getAllPoint('project')">{{totalPie2}}</div>
    </div>
    <div class="dz-left-module-row chart-div">
      <titleDiv title='系统总数'></titleDiv>
      <pieChart4 :color='colorPie2'
                 :value='valuePie3'
                 :labelShow='true'
                 :legendShow='true'
                 :type='"system"'
                 class="pie-chart-dom"
                 ref="pieChartSystem"></pieChart4>
      <div class="chart-pie-center"
           @click="getAllPoint('system')">{{totalPie3}}</div>
    </div>
    <div class="dz-left-module-row system-div">
      <titleDiv title='设备总数'></titleDiv>
      <randarChart :value='randar'
                   :type='"equipment"'
                   :color='colors'
                   :center='center'
                   class="pie-chart-dom"
                   ref="pieChartEquipment"></randarChart>
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
      clickType: '',
      colors: '#F9713C',
      center: ['50%', '50%']
    }
  },
  computed: {
    ...mapState({
      homeIndexInfo: state => state.home.homeIndexInfo,
      deviceType: state => state.common.deviceType,
      projectType: state => state.common.projectType,
      systemType: state => state.common.systemType,
    })
  },
  watch: {
    homeIndexInfo: {
      deep: true,
      handler (newVal, oldVal) {
        console.log('homeIndexInfo---newVal', newVal)
        if (newVal) {
          this.resetLeftModuleData(newVal)
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
      let oldArr = []
      let name = ''
      console.log(22)
      if (arr.length > 0) {
        oldArr = JSON.parse(JSON.stringify(arr))
        oldArr.forEach((item, index) => {
          this.projectType.forEach(it => {
            if (item.projectType && item.projectType === it.id) {
              name = it.name
            }
          })
          this.deviceType.forEach(it => {
            if (item.deviceType && item.deviceType === it.id) {
              name = it.name
            }
          })
          this.systemType.forEach(it => {
            if (item.systemType && item.systemType === it.id) {
              name = it.name
            }
          })
          newArr.push({
            name: name,
            value: item.typeNumber || 0,
            max: item.typeNumber + 10 || 0,
            id: type + (index + 1),
            type: type
          })
        })
      }
      return newArr
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
      this.projectPlan = data.companyGroupList
      console.log('data.deGroupList--------', data.deGroupList)
      if (data.deGroupList.length == 0) {
        data.deGroupList = [
          {
            deviceType: "1",
            typeNumber: 0
          },
          {
            deviceType: "2",
            typeNumber: 0
          },
          {
            deviceType: "3",
            typeNumber: 0
          },
          {
            deviceType: "4",
            typeNumber: 0
          },
          {
            deviceType: "5",
            typeNumber: 0
          },
          {
            deviceType: "6",
            typeNumber: 0
          },
          {
            deviceType: "7",
            typeNumber: 0
          },
          {
            deviceType: "8",
            typeNumber: 0
          },
          {
            deviceType: "9",
            typeNumber: 0
          }
        ]
      }
      this.valuePie2 = this.changeArrayFun(data.typeGroupList, 'project')
      this.valuePie3 = this.changeArrayFun(data.sysGroupList, 'system')
      this.randar = this.changeArrayFun(data.deGroupList, 'equipment')
      this.totalPie2 = this.summationFun(data.typeGroupList)
      this.totalPie3 = this.summationFun(data.sysGroupList)
      this.randarTotal = this.summationFun(data.deGroupList)
      console.log('this.valuePie2', this.valuePie2)
      console.log('this.valuePie3', this.valuePie3)
    },
  }
}
</script>
<style lang="less" scoped>
@import "../../../../style/color.less";
.pie-chart-dom {
  margin-top: 10px;
}
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
    margin-bottom: 10px;
  }
  .progect-div {
    height: 240px;
    position: relative;
  }
  .progect-all {
    height: 220px;
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
    height: 360px;
    position: relative;
    .chart-pie-center {
      top: 100px;
    }
  }
  .system-div {
    height: 380px;
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
    cursor: pointer;
  }
}
</style>