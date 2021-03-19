<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: mandy
 * @Date: 2021-03-04 10:27:10
 * @LastEditors: mandy
 * @LastEditTime: 2021-03-04 11:09:13
-->
<template>
  <div class="chart-pie">
    <div ref="chartDomPie"
         id="chartDomPie"></div>

  </div>
</template>
<script>
import * as echarts from 'echarts';
import pointsData from '../../data/clusterPoints.json'
import { mapActions, mapMutations } from 'vuex'
export default {
  props: {
    value: {
      type: Array,
      default: function () {
        return []
      }
    },
    color: {
      type: Array,
      default: function () {
        return []
      }
    },

  },
  data () {
    return {
    }
  },
  computed: {

  },
  mounted () {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  methods: {
    ...mapActions(['changeMarkerLayerData', 'changeVideoStatus', 'saveBoxTypeTitle']),
    initChart () {
      const _this = this
      const canvasChart = echarts.init(this.$refs.chartDomPie)
      window.onresize = () => {
        return (() => {
          canvasChart.resize()
        })()
      }
      const option = {
        legend: {
          show: false
        },
        color: ['#EE6666', '#FAC858', '#5470C6', '#3CA272', '#91CB74', '#F264DB', '#73C0DE'],
        tooltip: {
          trigger: 'item',
          formatter: '{c}%',
          // formatter: function (value) {
          //   console.log('value', value)
          //   let tootipData = null
          //   // if (value.data.type === '1') {
          //   //   tootipData = `车位总数: ${value.data.sum}<br/>已用/空余: ${value.data.use}/${value.data.unoccupied}<br/>使用率：${value.data.value}%`
          //   // } else {
          //   //   tootipData = `已用/空余: ${value.data.use}/${value.data.unoccupied}<br/> 使用率：${value.data.sumZb}%`
          //   // }
          //   return tootipData
          // },
          backgroundColor: 'rgba(0,0,0,0.9)',//背景颜色（此时为默认色）
          borderColor: 'rgba(0,0,0,0.9)'

        },
        dataset: {
          source: _this.value
        },
        series: [{
          type: 'pie',
          radius: '78%',
          center: ['50%', '52%'],
          label: {
            position: 'outer',
            alignTo: 'labelLine',
            // formatter: '{b|{b}}\n{num|{d}}',
            formatter: function (p) {
              return `{n|${p.data[0]}}\n{num|${p.data[1]}}\n{per|${p.data[2]}%}`;
            },
            rich: {
              n: {
                color: '#E1E6FA',
                fontSize: 12,
              },
              num: {
                color: '#E1E6FA',
                fontSize: 12,
                fontWeight: 600
              },
              per: {
                color: '#E1E6FA',
                fontSize: 12,
              }
            }
          },
        }]
      };
      canvasChart.setOption(option)
    },
  }
}
</script>
<style lang="less" scoped>
@import "../../style/color.less";
#chartDomPie {
  width: 100%;
  height: 100%;
}
.chart-pie {
  height: 100%;
}
</style>