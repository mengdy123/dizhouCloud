<template>
  <div class="chart-pie">
    <div ref="chartDomPie"
         id="chartDomPie"></div>
    <div class="chart-pie-center">
      <countTo :startVal='0'
               :endVal='total'
               :duration='2000'>{{num}}</countTo>
    </div>
  </div>
</template>
<script>
import countTo from 'vue-count-to';
import * as echarts from 'echarts';
export default {
  components: { countTo },
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
    total: {
      type: Number,
      default: 0
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
      timer: null,
      num: 0
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
    this.num = this.total
    this.$nextTick(() => {
      this.initChart()
    })
    this.timer = setInterval(() => {
      this.startTimer();
    }, 1000)
  },
  methods: {
    startTimer () {
      this.num++
    },
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
        },
        legend: {
          show: this.legendShow,
          top: 160,
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
            radius: ['70%', '86%'],
            top: '0%',
            height: '100%',
            left: 'center',
            width: '100%',
            itemStyle: {
              borderWidth: 1,
            },
            label: {
              show: false,
            },
            labelLine: {
              length: 8,
              length2: 1,
              maxSurfaceAngle: 80,
              lineStyle: {
                type: 'dashed'
              }
            },
            data: this.value
          }
        ],
      }
      // canvasChart.on('click', (e) => {
      //   console.log('点击了', e)
      // })
      canvasChart.setOption(option)
    },
  },
  destroyed () {
    clearInterval(this.timer);
  },
}
</script>
<style lang="less" scoped>
@import "../../style/color.less";
#chartDomPie {
  width: 100%;
  height: 100%;
}
.chart-pie {
  position: relative;
  width: 100%;
  height: 100%;
  &-center {
    position: absolute;
    width: 100px;
    height: 22px;
    left: 50%;
    top: 50%;
    margin-top: -10px;
    font-size: 22px;
    line-height: 22px;
    text-align: center;
    color: @white;
    margin-left: -50px;
    font-weight: 600;
  }
}
</style>