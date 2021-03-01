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
    type: {
      type: String,
      default: ''
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
      itemKey: ''
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
  watch: {
    value: {
      deep: true,
      handler (newVal, oldVal) {
        if (newVal.length > 0) {
          this.initChart()
        }
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
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
      let radiusData = []
      let centerData = []
      if (_this.legendShow) {
        radiusData = [26, '50%']
        centerData = ['50%', '34%']
      } else {
        radiusData = [30, '80%']
        centerData = ['50%', '50%']
      }
      const option = {
        title: {
          text: '',
          subtext: ''
        },
        color: this.color,
        tooltip: {
          trigger: 'item',
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
              },
            }

          },
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: radiusData,
            center: centerData,
            roseType: 'area',
            itemStyle: {
              borderRadius: 2,
              borderWidth: 1,
            },
            label: {
              alignTo: 'edge',
              minMargin: 5,
              edgeDistance: 6,
              lineHeight: 18,
              formatter: '{name|{b}}\n{num|{c}}',
              rich: {
                name: {
                  fontSize: 10,
                  color: '#ccc',
                  opacity: 0.5
                },
                num: {
                  fontSize: 14,
                  color: '#E1E6FA'
                }
              },
              color: '#E1E6FA',
              lineHeight: 20
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
              // console.log('params', params)
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
        console.log('e', e)
        let data1 = {
          title: e.name,
          color: e.color,
          data: pointsData.points,
          type: e.data.type
        }
        let data2 = {
          type: e.data.type,
          title: e.name,
          color: e.color,
          data: []
        }
        _this.saveBoxTypeTitle(e.data.type)
        if (_this.itemKey !== e.data.id) {
          _this.changeMarkerLayerData(data1)
          _this.itemKey = e.data.id
        } else {
          _this.changeMarkerLayerData(data2)
          _this.itemKey = ''
        }
      })
      // 图例的点击事件
      canvasChart.on('legendselectchanged', function (obj) {
        const { selected, name } = obj;
        // console.log('obj', selected[name])
        if (obj.name) {
          if (!selected[name]) {
            selected[name] = true
          }
          option.legend.selected = selected;
          this.setOption(option);
          let videoData = {
            name: name,
            url: require('../../../static/video/1.mp4')
          }
          // console.log('videoData', videoData)
          _this.changeVideoStatus(videoData)
        }
      });

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