<template>
  <div class="dz-system">
    <div class="dz-system-title">消息模板</div>
    <div class="dz-system-news">
      <titleDiv title='审批消息'></titleDiv>
      <div class="dz-system-news-content">
        设备编号：{{approveNews.deviceNumber}}出现故障，安装位置：{{approveNews.deviceSit}}，出现故障：{{approveNews.deviceSit}}，
        故障时间：{{approveNews.faultTime}}，请审批人员{{approveNews.approvePerson}}审核，是否同意维修人员{{approveNews.maintainPerson}}前往维修。
      </div>
      <div class="line-div"></div>
      <div class="dz-system-news-content gray-color">
        短信效果展示：<br />
        设备编号：1565892出现故障，安装位置：上海市松江区九亭镇姚北路890号，出故障类型：电路损坏，
        故障时间：2021-04-15 15：30。请您审核是否同意维修人员张三前往维修。回复“是”或“否”。
      </div>
    </div>
    <div class="dz-system-news">
      <titleDiv title='派工消息'></titleDiv>
      <div class="dz-system-news-content">
        设备编号：{{orderNews.deviceNumber}}出现故障，安装位置：{{orderNews.deviceSit}}，出现故障：{{orderNews.deviceType}}，故障时间：{{orderNews.deviceType}}，
        请维修人员{{orderNews.deviceType}}，于{{orderNews.deviceType}}（时间点）前往维修，最迟于{{orderNews.deviceType}}前排除故障，
        最长维修周期{{orderNews.deviceType}}小时。维修建议{{orderNews.deviceType}},注意事项：{{orderNews.deviceType}}。
      </div>
      <div class="line-div"></div>
      <div class="dz-system-news-content gray-color">
        短信效果展示：<br />
        设备编号：1565892出现故障，安装位置：上海市松江区九亭镇姚北路890号，出故障类型：电路损坏，
        故障时间：2021-04-15 15：30。请您审核是否同意维修人员张三前往维修。回复“是”或“否”。
      </div>
    </div>

  </div>
</template>
<script>
import systemMirror from '@/resource/systemMirror'
import titleDiv from '@/components/titleModule/titleSystemDetail'
import { mapState, mapActions } from 'vuex'
import timeReg from '@/utils/timeReg'
export default {
  components: { titleDiv },
  data () {
    return {
      approveNews: {},
      orderNews: {}
    };
  },
  computed: {
    ...mapState({

    })
  },
  mounted () {
  },
  methods: {

  },
}
</script>
<style lang="less" scoped>
.line-div {
  width: 100%;
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin: 0px 30px;
}
.gray-color {
  color: #666666 !important;
}
.dz-system {
  &-news {
    margin-top: 30px;
    &-content {
      font-size: 14px;
      line-height: 26px;
      color: #333333;
      padding: 30px;
    }
  }
}
</style>
