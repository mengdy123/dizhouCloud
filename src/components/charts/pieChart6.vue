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
      console.log('value', this.value)
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
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          backgroundColor: 'rgba(0,0,0,0.9)',//背景颜色（此时为默认色）
          borderColor: 'rgba(0,0,0,0.9)'
        },
        dataset: {
          source: [
            ['product', '2012'],
            ['思贤公园', 8895210],
            ['市民公园', 2600000],
            ['地铁广场', 6589000],
          ]
        },
        series: [{
          type: 'pie',
          radius: '78%',
          center: ['50%', '44%'],
          encode: {
            itemName: 'product',
            value: '2012'
          },
          label: {
            position: 'outer',
            alignTo: 'labelLine',
            // formatter: '{b|{b}}\n{num|{d}}',
            formatter: function (p) {
              return `{n|${p.data[0]}}\n{num|${p.data[1]}}`;
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