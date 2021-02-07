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
    total: {
      type: Number,
      default: 0
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
  mounted () {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  methods: {
    ...mapActions(['changeMarkerLayerData']),
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
      _this.value.map(item => {
        return areaData.push(item.value)
      })
      const option = {
        title: {
          text: '',
          subtext: ''
        },
        // tooltip: {
        //   //雷达图的tooltip不会超出div，也可以设置position属性，position定位的tooltip 不会随着鼠标移动而位置变化，不友好
        //   confine: true,
        //   enterable: true, //鼠标是否可以移动到tooltip区域内
        // },
        legend: {
          show: false
        },
        radar: {
          shape: 'rect',
          splitNumber: 5, // 雷达图圈数设置
          center: ['50%', '50%'],
          // 圆中心坐标，数组的第一项是横坐标，第二项是纵坐标。[ default: ['50%', '50%'] ]
          radius: 60,
          name: {
            textStyle: {
              color: '#E1E6FA',
              lineHeight: 20
            },
            // // 只有一条数据时，可以使用该方法，显示单数据
            formatter: function (value, indicator) {
              // console.log('value', value)
              // console.log('indicator', indicator)
              return `{name|${value}}\n{num|${indicator.value}}`;
            },
            rich: {
              name: {
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
          data: [
            {
              value: areaData,
              name: '',
              itemStyle: {
                normal: {
                  color: '#F9713C',
                  lineStyle: lineStyle,
                },
              },
              lineStyle: {
                width: 1,
                color: '#F9713C', // 雷达构成的区域边框
              }
            },
          ],
        }],
      }
      canvasChart.on('click', (e) => {
        let data = {
          title: e.name,
          data: pointsData.points
        }
        if (_this.itemKey !== e.name) {
          _this.changeMarkerLayerData(data)
          _this.itemKey = e.name
        } else {
          _this.changeMarkerLayerData(null)
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