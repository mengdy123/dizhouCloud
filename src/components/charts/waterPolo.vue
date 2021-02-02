<template>
  <div class="sn-container">
    <div class="chartsdom"
         ref="chart_polo"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts-liquidfill'
export default {
  name: "waterPolo",
  props: {
    value: {
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
      this.getEchart()
    })
  },
  methods: {
    getEchart () {
      const _this = this
      let myChart = echarts.init(_this.$refs.chart_polo);
      let option = {
        series: [{
          type: 'liquidFill',
          data: _this.value,
          radius: '70%',
          color: ['#3E56FF'],
          fontSize: '10px',
          backgroundStyle: {
            color: 'rgba(0, 0, 0, 0.5)',
            borderColor: '#35E9FF',
            opacity: 0.5,
            borderWidth: 1,
          },
          label: {
            formatter: function (param) {
              return _this.value[0].name + '\n'
                + _this.value[0].num;
            },
            fontSize: 12,
            lineHeight: 12,
            fontWeight: 300,
            color: '#E1E6FA'
          },
          outline: {
            show: false,
          },
        }]
      }

      myChart.setOption(option, true);

      window.addEventListener('resize', () => {
        myChart.resize();
      });
    }
  },
  beforeDestroy () {

  }
};
</script>

<style lang="less" scoped>
.sn-container {
  width: 100%;
  height: 100%;
  .chartsdom {
    width: 100%;
    height: 100%;
  }
}
</style>
