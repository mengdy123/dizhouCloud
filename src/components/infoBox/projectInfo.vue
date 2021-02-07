<template>
  <dv-border-box-13>
    <div class="project-info">
      <ul v-if="projectInfoData.type === 'project'">
        <li><span>项目名称：</span>{{projectInfoData.row[0] || '暂无数据'}}</li>
        <li><span>项目位置：</span>{{projectInfoData.row[1] || '暂无数据'}}广陵区金地广场120号</li>
        <li><span>项目状态：</span>{{projectInfoData.row[2] || '暂无数据'}}</li>
      </ul>
      <ul v-if="projectInfoData.type === 'bug'">
        <li><span>异常预判：</span>{{projectInfoData.row.name || '暂无数据'}}</li>
        <li><span>设备类型：</span>{{projectInfoData.row.type || '暂无数据'}}广陵区金地广场120号</li>
        <li><span>设备编号：</span>{{projectInfoData.row.num || '暂无数据'}}</li>
        <li><span>设备地址：</span>{{projectInfoData.row.address || '暂无数据'}}</li>
        <li><span>维修进度：</span>{{projectInfoData.row.plan || '暂无数据'}}</li>
      </ul>
      <div class="project-info-close"
           @click="closeInfoBox">
        <icon-svg icon-class="guanbi" />
      </div>
      <el-button type="primary"
                 @click="showDetail"
                 class="project-info-button"
                 size="mini">详情</el-button>
    </div>
  </dv-border-box-13>
</template>
<script>
export default {
  props: {
    projectInfoData: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {

    }
  },
  methods: {
    closeInfoBox () {
      this.$emit('closeInfoWindow')
      this.$emit('clearMarkerOnly')
    },
    showDetail () {
      this.$router.push('/sceneIndex')
    }
  },
  mounted () {
    console.log('projectInfoData', this.projectInfoData)
  }
}
</script>
<style lang="less" scoped>
@import "../../style/color.less";
.project-info {
  width: 300px;
  min-height: 180px;
  padding: 40px 30px 30px 30px;
  position: relative;
  ul {
    width: 100%;
    li {
      line-height: 26px;
      span {
        color: #35e9ff;
      }
    }
  }
  &-button {
    position: absolute;
    right: 20px;
    bottom: 20px;
  }
  /deep/ .el-button--primary {
    color: #35e9ff;
    background: rgba(81, 142, 234, 30%) !important;
    background-color: rgba(81, 142, 234, 30%) !important;
    border-color: rgba(53, 233, 255, 50%) !important;
  }
  &-close {
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
    /deep/ .svg-icon {
      width: 16px;
      height: 16px;
      fill: @white;
      opacity: 0.7;
    }
  }
}
</style>