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
    value: {
      type: Array,
      default: function () {
        return []
      }
    },
    colors: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.initChart()
    }, 500)
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
        color: _this.colors,
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0,0,0,0.9)',//背景颜色（此时为默认色）
          borderColor: 'rgba(0,0,0,0.9)'
        },
        legend: {
          show: false
          // bottom: 10
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            center: ['50%', '50%'],
            data: [
              { value: 735, name: '优' },
              { value: 510, name: '良' },
              { value: 434, name: '中' },
              { value: 335, name: '差' }
            ],
            label: {
              position: 'outer',
              show: true,
              formatter: function (params) {
                let data = `${params.name}\n${params.percent}%`
                return data
              },
              fontSize: 10,
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
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