<template>
  <div ref="infoProject"
       class="project-box">
    <div class="project-box-info">
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
      <div class="project-box-info-close"
           @click="closeInfoBox">
        <icon-svg icon-class="guanbi" />
      </div>
      <el-button type="primary"
                 @click="showDetail"
                 class="project-box-info-button"
                 size="mini">详情</el-button>
    </div>
  </div>
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
    console.log('this.$refs.offsetHeight', this.$refs.infoProject.offsetHeight)
    console.log('this.$refs.offsetWidth', this.$refs.infoProject.offsetWidth)
  }
}
</script>
<style lang="less" scoped>
@import "../../style/color.less";
@keyframes divAni {
  0%,
  100% {
    clip-path: inset(0 0 98% 0);
  }
  25% {
    clip-path: inset(0 0 0 98%);
  }
  50% {
    clip-path: inset(98% 0 0 0);
  }
  75% {
    clip-path: inset(0 98% 0 0);
  }
}
.project-box {
  width: 100%;
  height: 100%;
  border: 1px solid #354881;
  position: relative;
  transition: all 0.3s;
}
.project-box::after {
  content: "";
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  border: 1px solid #2db3d9;
  animation: divAni 6s infinite linear;
}
.project-box-info {
  display: flex;
  flex-direction: column;
  background: rgba(7, 14, 71, 0.5);
  top: 10px;
  left: 10px;
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 16px;
  z-index: 9;
  ul {
    width: 100%;
    margin-top: 14px;
    li {
      line-height: 26px;
      span {
        color: #35e9ff;
      }
    }
  }
  &-button {
    width: 60px;
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
  /deep/ .el-button--primary {
    color: #35e9ff;
    background: rgba(81, 142, 234, 30%) !important;
    background-color: rgba(81, 142, 234, 30%) !important;
    border-color: rgba(53, 233, 255, 50%) !important;
  }
  &-close {
    position: absolute;
    right: 10px;
    top: 10px;
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