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
    valuePer: {
      type: Array,
      default: function () {
        return []
      }
    },
  },
  mounted () {

    this.initChart()
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
        color: ['#3CA272', '#7E8490', '#EE6666', '#FAC858', '#9A60B4', '#5470C6'],
        tooltip: {
          trigger: 'item',
          // formatter: function (value) {
          //   let tootipData = null
          //   if (value.data.type === '1') {
          //     tootipData = `车位总数: ${value.data.sum || 0}<br/>已用/空余: ${value.data.use || 0}/${value.data.unoccupied || 0}<br/>使用率：${value.data.value || 0}%`
          //   } else {
          //     tootipData = `已用/空余: ${value.data.use || 0}/${value.data.unoccupied || 0}<br/> 使用率：${value.data.sumZb || 0}%`
          //   }
          //   return tootipData
          // },
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
                return params.value + '%'
              },
              fontSize: 10,
            },
            labelLine: {
              show: false
            },
            // selected: true
            data: _this.valuePer
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
              // formatter: function (value) {
              //   return `{a|${value.name}}{b|(${value.percent}%)}`
              // },
              rich: {
                a: {
                  color: '#BACCFD',
                  fontSize: 10,
                },
                b: {
                  color: '#BACCFD',
                  fontSize: 10,
                }
              }
            },
            data: _this.value[0]
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