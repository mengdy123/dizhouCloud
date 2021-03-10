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
    colors: {
      type: Array,
      default: function () {
        return []
      }
    },
    type: {
      type: String,
      default: ''
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
      console.log('title', this.title)
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
      let series = [];
      let smooth = true
      let bottom = 0
      if (_this.type === 'personnel') {
        smooth = false
        bottom = 50
      } else {
        bottom = 30
      }
      for (let i = 0; i < _this.yAxisData.length; i++) {
        series.push({
          name: _this.title[i],
          type: 'line',
          smooth: smooth,
          symbol: 'circle',
          // symbolSize: 5,
          // showSymbol: true,
          data: _this.yAxisData[i]
        });
      }
      const option = {
        title: {
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0,0,0,0.9)',//背景颜色（此时为默认色）
          borderColor: 'rgba(0,0,0,0.9)'
        },
        legend: {
          bottom: 0,
          itemWidth: 10,
          itemHeight: 1,
          data: _this.title,
          textStyle: {
            fontSize: 10,
            color: '#BACCFD'
          }
        },
        grid: {
          left: 0,
          top: 10,
          right: 20,
          bottom: bottom,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: _this.xAxisData,
          axisLabel: {
            textStyle: {
              color: '#BACCFD'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          lineStyle: {
            color: '#7A7D9B'
          },
          axisLine: {
            show: true
          },
        },
        yAxis: {
          axisLine: {
            show: true
          },
          lineStyle: {
            color: '#7A7D9B'
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#BACCFD'
            }
          }
        },
        series: series

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