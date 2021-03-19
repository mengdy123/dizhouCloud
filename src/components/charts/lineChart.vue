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
      let xAxisData = _this.xAxisData.map(item => {
        return item.slice(11, 16)
      })
      const option = {
        title: {
          text: '',
          subtext: ''
        },
        tooltip: {
          trigger: 'axis',
          // axisPointer: {
          //   type: 'cross',
          //   label: {
          //     backgroundColor: '#6a7985'
          //   }
          // },
          // feature: {
          //   dataZoom: {
          //     yAxisIndex: 'none'
          //   },
          //   dataView: { readOnly: false },
          //   magicType: { type: ['line', 'bar'] },
          //   restore: {},
          //   saveAsImage: {}
          // },
          backgroundColor: 'rgba(0,0,0,0.9)',//背景颜色（此时为默认色）
          borderColor: 'rgba(0,0,0,0.9)'
        },
        legend: {
          bottom: 0,
          itemWidth: 10,
          itemHeight: 1,
          data: [						//----图例内容
            {
              name: _this.title[0],
              icon: 'stack',			//----图例的外框样式
              textStyle: {
                color: '#BACCFD',		//----单独设置某一个图例的颜色
                //backgroundColor:'black',//---单独设置某一个图例的字体背景色
              }
            },
            {
              name: _this.title[1],
              icon: 'stack',		//----图例的外框样式
              textStyle: {
                color: '#BACCFD',		//----单独设置某一个图例的颜色
                //backgroundColor:'black',//---单独设置某一个图例的字体背景色
              }
            }
          ],
        },
        grid: {
          left: 0,
          top: 10,
          bottom: 30,
          right: 20,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxisData,
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
        series: [
          {
            name: _this.title[0],
            data: _this.yAxisData[0],
            type: 'line',
            showSymbol: false,
            itemStyle: {
              color: '#FAC858',
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(250,220,81,1',
              }, {
                offset: 1,
                color: 'rgba(250,220,81,0',
              }])
            },
          },
          {
            name: _this.title[1],
            data: _this.yAxisData[1],
            type: 'line',
            showSymbol: false,
            itemStyle: {
              color: '#BACCFD'
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