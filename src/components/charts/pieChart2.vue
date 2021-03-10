<template>
  <div class="chart-pie">
    <div ref="chartDomPie"
         id="chartDomPie"></div>
  </div>
</template>
<script>
import * as echarts from 'echarts';
import layerData from '../../data/layerProject.json'
import pointsData from '../../data/clusterPoints.json'
import pointsData2 from '../../data/clusterPoints2.json'
import pointsData3 from '../../data/clusterPoints3.json'

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
    legendShow: {
      type: Boolean,
      default: false
    },
    labelShow: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {

    }
  },
  computed: {
    randomId () {
      var Num = "";
      for (var i = 0; i < 6; i++) {
        Num += Math.floor(Math.random() * 10);
      }
      return Num;
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  methods: {
    ...mapActions(['changeMarkerLayerData']),
    initChart () {
      const _this = this
      const canvasChart = echarts.init(this.$refs.chartDomPie)
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
        color: this.color,
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0,0,0,0.9)',//背景颜色（此时为默认色）
          borderColor: 'rgba(0,0,0,0.9)'
        },
        legend: {
          show: this.legendShow,
          bottom: 10,
          left: 0,
          icon: "circle",
          itemWidth: 6,
          itemGap: 10,
          formatter: '{dark|{name}}',
          orient: 'horizontal',
          textStyle: {
            color: '#E1E6FA',
            rich: {
              dark: {
                align: 'center',
                // padding: [0, 35, 0, 10],
                // width: 60
              },
            }

          },
        },
        series: [
          {
            // name: '访问来源',
            type: 'pie',
            radius: ['70%', '96%'],
            top: '10%',
            height: 120,
            left: 'center',
            width: '100%',
            itemStyle: {
              borderWidth: 1,
            },
            label: {
              alignTo: 'edge',
              minMargin: 5,
              edgeDistance: 10,
              lineHeight: 15,
              formatter: function (name) {
                let data
                if (_this.labelShow) {
                  data = '{dark|' + name.value + '}'
                } else {
                  data = '{dark|' + name.name + '}'
                }
                return data
              },
              rich: {
                dark: {
                  color: '#E1E6FA',
                },
              },
            },
            labelLine: {
              length: 8,
              length2: 1,
              maxSurfaceAngle: 80,
              lineStyle: {
                type: 'dashed'
              }
            },
            labelLayout: function (params) {
              var isLeft = params.labelRect.x < canvasChart.getWidth() / 2;
              var points = params.labelLinePoints;
              // Update the end point.
              points[2][0] = isLeft
                ? params.labelRect.x
                : params.labelRect.x + params.labelRect.width;

              return {
                labelLinePoints: points
              };
            },
            data: this.value
          }
        ],

      }
      canvasChart.on('click', (e) => {
        // console.log('点击了11', e.name)
        let data = {
          title: e.name,
          color: e.color,
          data: pointsData.points
        }
        this.changeMarkerLayerData(data)
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
#chartDomPie {
  width: 100%;
  height: 100%;
}
.chart-pie {
  height: 100%;
}
</style>