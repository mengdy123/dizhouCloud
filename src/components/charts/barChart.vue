<template>
  <div class="chart-pie">
    <div ref="chartDom"
         id="chartDom"></div>
  </div>
</template>
<script>
import * as echarts from 'echarts';
export default {
  props: {
    value: {
      type: Array,
      default: function () {
        return []
      },
    },
    xAxisData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {

    }
  },
  mounted () {
    this.$nextTick(() => {
      console.log('252525', this.xAxisData)
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
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          },
          backgroundColor: 'rgba(0,0,0,0.9)',//背景颜色（此时为默认色）
          borderColor: 'rgba(0,0,0,0.9)'
        },
        grid: {
          top: 40,
          left: '-30px',
          right: 0,
          bottom: '3%',
          containLabel: true
        },
        xAxis:
        {
          type: 'category',
          data: _this.xAxisData,
          triggerEvent: true,
          axisTick: {
            alignWithLabel: false,
            show: false
          },
          axisLabel: {
            color: '#E1E6FA',
            interval: 0
          },
          axisLine: {
            show: false
          }
        },
        yAxis: [
          {
            type: 'value',
            show: false,
          }
        ],
        series: [
          {
            name: '',
            type: 'bar',
            barWidth: '6px',
            roundCap: 2,
            label: {
              show: true,
              position: "outside",
              color: '#E1E6FA',
              formatter: function (p) {
                return p.value > 0 ? (p.value) : '';
              }
            },
            itemStyle: {
              //柱状条的颜色，这里用了一个线性渐变色
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0, //必须存在，表示这个颜色从0%开始，不得大于1
                  color: '#75e4fd',
                },
                {
                  offset: 1,
                  color: 'rgba(117,228,253,0)',
                },
              ]),

              barBorderRadius: [4, 4, 0, 0], //设置柱状条的边框圆角
            },
            data: _this.value,
            animationDelay: function (idx) {
              return idx * 10;
            }
          }
        ]

      }
      canvasChart.on('click', (e) => {
        console.log('点击了', e)
      })
      canvasChart.setOption(option)
    },
    resetChartClick (name) {
      console.log('333', name) // 如果不加off事件，就会叠加触发
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../style/color.less";
#chartDom {
  width: 100%;
  height: 100%;
}
.chart-pie {
  height: 100%;
  width: 100%;
}
</style>