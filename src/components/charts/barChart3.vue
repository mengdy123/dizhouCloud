<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: mandy
 * @Date: 2021-03-04 11:06:21
 * @LastEditors: mandy
 * @LastEditTime: 2021-03-04 11:06:21
-->
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
  watch: {
    yAxisData (newVal, oldVal) {
      console.log('yAxisData', this.yAxisData)
      this.initChart()
    }
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
          trigger: 'item',
          formatter: '{b}  {c}W',
          backgroundColor: 'rgba(0,0,0,0.9)',//背景颜色（此时为默认色）
          borderColor: 'rgba(0,0,0,0.9)'
        },
        legend: {
          bottom: 0,
          textStyle: {					//----图例内容样式
            color: '#BACCFD',				//---所有图例的字体颜色
          },
          data: _this.title,
          icon: 'circle',
        },
        grid: {
          show: false,					//---是否显示直角坐标系网格
          bottom: 20,
          top: 10,
          right: 0,					//---相对位置，top\bottom\left\right  
          containLabel: false,			//---grid 区域是否包含坐标轴的刻度标签
          tooltip: {					//---鼠标焦点放在图形上，产生的提示框
            show: true,
            trigger: 'item',			//---触发类型
            textStyle: {
              color: '#BACCFD',
            },
          }
        },
        xAxis: {
          type: 'category',
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
          z: 10
        },
        yAxis: {
          name: 'W',
          axisLine: {
            show: true
          },
          interval: 50,
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
            formatter: '{value}w',
            textStyle: {
              color: '#BACCFD',
            }
          }
        },
        series: [
          {
            name: _this.title,
            data: _this.yAxisData,
            type: 'bar',
            barWidth: 6,
            itemStyle: {
              barBorderRadius: [6, 6, 0, 0],
              color: '#91CB74'
            },
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
