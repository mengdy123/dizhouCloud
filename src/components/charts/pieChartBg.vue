<template>
  <div class="chart-pie">
    <div id="chartDom"></div>
    <div class="chart-pie-bg"></div>
    <div class="chart-pie-center">4590</div>
    <div class="chart-pie-style">
      <ul>
        <li @click="resetChartClick('亚洲')">亚洲<em>71%</em></li>
        <li @click="resetChartClick('中国')">中国<em>65%</em></li>
      </ul>
      <ul>
        <li @click="resetChartClick('欧洲')">欧洲<em>16%</em></li>
        <li @click="resetChartClick('非洲')">非洲<em>10%</em></li>
        <li @click="resetChartClick('北美洲')">北美洲<em>3%</em></li>
      </ul>
    </div>
  </div>

</template>
<script>
import * as echarts from 'echarts';

export default {
  data () {
    return {
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  methods: {
    initChart () {
      const canvasChart = echarts.init(document.getElementById('chartDom'))
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
        color: ['#3CA272', '#73C0DE', '#9A60B4', '#EE6666', '#FAC858', '#FC8452', '#91CB74', '#5470C6', '#F264DB'],
        tooltip: {
          trigger: 'item',
        },
        legend: {
          show: false
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['70%', '90%'],
            avoidLabelOverlap: false,
            top: top + '%',
            height: '90%',
            left: '0',
            width: '100%',
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 3048, name: '中国' },
              { value: 635, name: '欧洲' },
              { value: 580, name: '非洲' },
              { value: 484, name: '亚洲' },
              { value: 300, name: '北美洲' }
            ]
          }
        ],

      }
      canvasChart.on('click', (e) => {
        console.log('点击了', e)
      })
      canvasChart.setOption(option)
    },
    resetChartClick (name) {
      console.log('点击了2222', name) // 如果不加off事件，就会叠加触发
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../style/color.less";
#chartDom {
  width: 100%;
  height: 138px;
}
.chart-pie {
  position: relative;
  margin-top: 10px;
  &-bg {
    width: 140px;
    height: 140px;
    background: url("../../assets/home/circle-bg.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 50%;
    top: 6px;
    margin-left: -70px;
    z-index: -1;
  }
  &-center {
    position: absolute;
    width: 80px;
    height: 22px;
    left: 50%;
    top: 64px;
    font-size: 22px;
    line-height: 22px;
    text-align: center;
    color: @white;
    margin-left: -40px;
    font-weight: 600;
  }
  &-style {
    margin-top: -50px;
    ul {
      width: 72px;
      text-align: center;
      font-size: 12px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      align-content: center;
      li {
        cursor: pointer;
        width: 100%;
        height: 18px;
        line-height: 18px;
        margin-top: 30px;
        background: url("../../assets/home/style-bg.png") no-repeat;
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        position: relative;
        text-align: center;
        em {
          position: absolute;
          top: 22px;
          left: 0px;
          font-style: normal;
          width: 100%;
          text-align: center;
          font-size: 14px;
        }
      }
      li:nth-child(1) {
        margin-top: 0px;
      }
      li::before {
        content: "";
        width: 6px;
        height: 6px;
        border-radius: 50%;
        display: block;
        margin: 6px 4px;
      }
      li::after {
        content: "";
        width: 6px;
        height: 6px;
        border-radius: 50%;
        display: block;
        margin: 6px 4px;
      }
    }
    ul:first-child {
      position: absolute;
      left: 0px;
      top: 20px;
      li:nth-child(1)::before {
        background: #44df97;
      }
      li:nth-child(1)::after {
        background: #fd5d5d;
      }
      li:nth-child(2)::before,
      li:nth-child(2)::after {
        background: #44df97;
      }
    }
    ul:last-child {
      position: absolute;
      right: 0px;
      top: 20px;

      li:nth-child(1)::before,
      li:nth-child(1)::after {
        background: #43aaed;
      }
      li:nth-child(2)::before,
      li:nth-child(2)::after {
        background: #9039f6;
      }
      li:nth-child(3)::before,
      li:nth-child(3)::after {
        background: #ffab34;
      }
    }
  }
}
</style>