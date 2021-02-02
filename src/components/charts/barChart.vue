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
      xAxisBar: {
        type: Array,
        default: function () {
          return []
        },
      }
    },
  },
  data () {
    return {

    }
  },
  mounted () {

    this.$nextTick(() => {
      console.log('_this.xAxisBar', this.xAxisBar)
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
          }
        },
        grid: {
          top: 20,
          left: 0,
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['行人违章', '交通事故', '刑侦案件', '行政事件', '设备运维'],
            triggerEvent: true,
            axisTick: {
              alignWithLabel: false,
              show: false
            },
            axisLabel: {
              color: '#E1E6FA'
            },
            axisLine: {
              show: false
            }
          }
        ],
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
            data: _this.value
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
  position: relative;
  height: 100%;
  &-center {
    position: absolute;
    width: 100px;
    height: 22px;
    left: 50%;
    top: 64px;
    font-size: 22px;
    line-height: 22px;
    text-align: center;
    color: @white;
    margin-left: -50px;
    font-weight: 600;
  }
}
</style>