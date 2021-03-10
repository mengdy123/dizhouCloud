<template>
  <div class="chart-div">
    <div ref="chartDom"
         class="chart-dom"></div>
  </div>
</template>
<script>
import * as echarts from 'echarts';
import { mapActions, mapMutations } from 'vuex'
export default {
  props: {
    xAxisData: {
      type: Array,
      default: function () {
        return []
      }
    },
    yAxisData: {
      type: Array,
      default: function () {
        return []
      }
    },
    title: {
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
    initChart () {
      const _this = this
      const canvasChart = echarts.init(this.$refs.chartDom)
      window.onresize = () => {
        return (() => {
          canvasChart.resize()
        })()
      }
      const option = {
        title: {
          text: '',
          subtext: ''
        },
        tooltip: {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          backgroundColor: 'rgba(0,0,0,0.9)',//背景颜色（此时为默认色）
          borderColor: 'rgba(0,0,0,0.9)'
        },
        legend: {
          show: false,
        },
        series: [
          {
            name: '',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '50%'],
            label: {
              position: 'inner',
              show: true,
              formatter: function (params) {
                return params.value
              },
              fontSize: 10,
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1548, name: '搜索引擎' },
              { value: 775, name: '直达' },
              { value: 679, name: '营销广告', selected: true }
            ]
          },
          {
            name: '',
            type: 'pie',
            radius: ['70%', '90%'],
            labelLine: {
              length: 30,
            },
            label: {
              position: 'outer',
              alignTo: 'labelLine',
              formatter: '{b|{b}}{per|({d}%)}',
              rich: {
                b: {
                  color: '#BACCFD',
                  fontSize: 10,
                },
                per: {
                  color: '#BACCFD',
                }
              }
            },
            data: [
              { value: 310, name: '出租车' },
              { value: 251, name: '收费' },
              { value: 234, name: '临停' },
            ]
          }
        ]

      }
      canvasChart.setOption(option)
    },
  }
}
</script>
<style lang="less" scoped>
@import "../../style/color.less";
.chart-dom {
  width: 100%;
  height: 100%;
}
</style>