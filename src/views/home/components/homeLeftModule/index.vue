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
                 :type='"project"'
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
      if (arr.length > 0) {
        oldArr = JSON.parse(JSON.stringify(arr))
        oldArr.forEach((item, index) => {
          if (item.projectType && item.projectType === '1') {
            name = '交通'
          } else if (item.projectType && item.projectType === '2') {
            name = '工地'
          } else if (item.projectType && item.projectType === '3') {
            name = '市政'
          } else if (item.projectType && item.projectType === '4') {
            name = '园区'
          } else if (item.projectType && item.projectType === '5') {
            name = '园林'
          } else if (item.projectType && item.projectType === '6') {
            name = '景区'
          } else if (item.projectType && item.projectType === '7') {
            name = '企业'
          } else if (item.deviceType && item.deviceType === '1') {
            name = '发光标线'
          } else if (item.deviceType && item.deviceType === '2') {
            name = '智慧路灯'
          } else if (item.deviceType && item.deviceType === '3') {
            name = '井盖'
          } else if (item.deviceType && item.deviceType === '4') {
            name = '智慧砖'
          } else if (item.deviceType && item.deviceType === '5') {
            name = '合杆'
          } else if (item.deviceType && item.deviceType === '6') {
            name = '井盖系统'
          } else if (item.deviceType && item.deviceType === '7') {
            name = '过街立柱'
          } else if (item.deviceType && item.deviceType === '8') {
            name = '停车立柱'
          } else if (item.systemType && item.systemType === '1') {
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
    cursor: pointer;
  }
}
</style>