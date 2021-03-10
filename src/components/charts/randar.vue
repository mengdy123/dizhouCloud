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
    type: {
      type: String,
      default: ''
    },
    total: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    center: {
      type: Array,
      default: function () {
        return []
      }
    }

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
    // value: {
    //   deep: true,
    //   handler (newVal, oldVal) {
    //     if (newVal.length > 0) {
    //       this.initChart()
    //     }
    //   }
    // }
  },
  mounted () {
    this.$nextTick(() => {
      // console.log('value---randar', this.value)
      if (this.value.length > 0) {
        this.initChart()
      }

    })
  },
  methods: {
    ...mapActions(['changeMarkerLayerData', 'saveBoxTypeTitle']),
    initChart () {
      const _this = this
      const lineStyle = {
        normal: {
          width: 0.1,
          opacity: 0.5
        }
      };
      const canvasChart = echarts.init(this.$refs.chartDomPie)
      window.onresize = () => {
        return (() => {
          canvasChart.resize()
        })()
      }
      let areaData = []
      if (_this.value.length > 0) {
        _this.value.map(item => {
          return areaData.push(item.value)
        })
      }
      const option = {
        title: {

        },
        legend: {
          show: false
        },
        radar: {
          shape: 'rect',
          splitNumber: 8, // 雷达图圈数设置 
          center: _this.center,
          // 圆中心坐标，数组的第一项是横坐标，第二项是纵坐标。[ default: ['50%', '50%'] ]
          radius: '60%',
          name: {
            textStyle: {
              color: '#E1E6FA',
              lineHeight: 18
            },
            // 只有一条数据时，可以使用该方法，显示单数据
            formatter: function (value, indicator) {
              // console.log('value', value)
              // console.log('indicator', indicator)
              let titleDiv = null
              if (_this.type === 'equipment') {
                titleDiv = `{name|${value}}\n{num|${indicator.value}}`;
              } else if (_this.type === 'regulations') {
                titleDiv = `{name|${value}}({n|${indicator.value}})`;
              }

              return titleDiv
            },
            rich: {
              name: {
                fontSize: 10,
                color: '#ccc'
              },
              n: {
                fontSize: 10,
                color: '#ccc'
              },
              num: {
                fontSize: 14,
                color: '#E1E6FA'
              }
            }
          },
          // 设置雷达图中间射线的颜色
          axisLine: {
            lineStyle: {
              color: 'rgba(131,141,158,.1)',
            },
          },
          indicator: _this.value,
          //雷达图背景的颜色，在这儿随便设置了一个颜色，完全不透明度为0，就实现了透明背景
          triggerEvent: true, //开启雷达图的边角名称可点击
          splitArea: {
            show: false,
            areaStyle: {
              color: 'rgba(255,0,0,0)', // 图表背景的颜色
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: 'rgba(131,141,158,.1)', // 设置网格的颜色
            },
          },
        }
        ,
        series: [{
          name: '雷达图', // tooltip中的标题
          type: 'radar', //表示是雷达图
          symbol: 'none', // 拐点的样式，还可以取值'rect','angle'等
          areaStyle: {
            normal: {
              width: 0.1,
              opacity: 0.2,
            },
          },
          symbol: 'circle',
          symbolSize: 5,
          data: [
            {
              value: areaData,
              name: '',
              itemStyle: {
                normal: {
                  color: _this.color,
                  lineStyle: lineStyle,
                },
              },
              lineStyle: {
                width: 1,
                color: _this.color, // 雷达构成的区域边框
              }
            },
          ],
        }],
      }
      canvasChart.on('click', (e) => {
        console.log('e', e)
        let data = {
          type: _this.type,
          title: e.name,
          data: pointsData.points
        }
        let data2 = {
          title: e.name,
          data: []
        }
        _this.saveBoxTypeTitle(_this.type)
        if (_this.itemKey !== e.name) {
          _this.changeMarkerLayerData(data)
          _this.itemKey = e.name
        } else {
          _this.changeMarkerLayerData(data2)
          _this.itemKey = ''
        }
      })
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