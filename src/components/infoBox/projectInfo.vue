<template>
  <div ref="infoProject"
       class="project-box"
       :class="[{'project-div':projectInfoData.type === 'project' },{'bug-div':projectInfoData.type === 'bug' }]">
    <div class="project-box-info">
      <ul v-if="projectInfoData.type === 'project'">
        <li><span>项目名称：</span>{{projectInfoData.projectName || '暂无数据'}}</li>
        <li><span>项目位置：</span>{{projectInfoData.province + projectInfoData.city + projectInfoData.county   || '暂无数据'}}</li>
        <li><span>项目状态：</span>{{projectInfoData.states || '暂无数据'}}</li>
      </ul>
      <ul v-if="projectInfoData.type === 'bug'">
        <li><span>异常预判：</span>{{projectInfoData.row.prediction || '暂无数据'}}</li>
        <li><span>设备类型：</span>{{projectInfoData.row.deviceType || '暂无数据'}}</li>
        <li><span>设备编号：</span>{{projectInfoData.row.deviceCode || '暂无数据'}}</li>
        <li><span>设备地址：</span>{{projectInfoData.row.deivceSite || '暂无数据'}}</li>
        <li><span>维修进度：</span>{{projectInfoData.row.status || '暂无数据'}}</li>
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
    },
    showDetail () {
      // this.$store.dispatch('getProjectsum', 1)
      // this.$router.push('/sceneIndex')
      this.$router.push({ path: '/sceneIndex', query: { id: 1 } });
    }
  },
  mounted () {
    // console.log('projectInfoData', this.projectInfoData)
    // console.log('this.$refs.offsetHeight', this.$refs.infoProject.offsetHeight)
    // console.log('this.$refs.offsetWidth', this.$refs.infoProject.offsetWidth)
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
  position: relative;
  transition: all 0.3s;
  border: 1px solid #354881;
}
.project-div {
  width: 320px;
  height: 200px;
}
.bug-div {
  width: 340px;
  height: 260px;
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
// .project-box::before {
//   content: "";
//   width: 1px;
//   height: 20px;
//   position: absolute;
//   left: 50%;
//   bottom: -20px;
//   border-left: 1px dashed #fa7355;
// }
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