<template>
  <div class="logs-modules">
    <el-timeline>
      <el-timeline-item v-for="(activity, index) in activities"
                        :key="index"
                        :icon="activity.icon"
                        :type="activity.type"
                        :color="activity.color"
                        :size="activity.size"
                        placement="top"
                        :timestamp="activity.timeStatus">
        <div>{{activity.timestamp}}</div>
        <div v-if="activity.timeStatus === '维修结束'">
          <div>维修人：{{activity.failTime}}</div>
          <div>详情：{{activity.failType}}</div>
        </div>
        <div v-if="activity.timeStatus === '审批结束'">
          <div>审批人：{{activity.failTime}}</div>
          <div>详情：{{activity.failType}}</div>
        </div>
        <div v-if="activity.timeStatus === '上报成功'">
          <div>上报人：{{activity.failTime}}</div>
          <div>详情：{{activity.failType}}</div>
          <div class="fail-img">
            <img src="../../assets/scene.png"
                 alt="">
            <img src="../../assets/scene.png"
                 alt="">
            <img src="../../assets/scene.png"
                 alt="">
          </div>
        </div>
        <div v-if="activity.timeStatus === '考评结束'">
          <div>考评人：{{activity.failTime}}</div>
          <div>详情：{{activity.failType}}</div>
        </div>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activities: [
        {
          content: '支持使用图标',
          timestamp: '2018-04-12 20:46',
          failTime: '2018-04-12 20:46',
          failType: '传感器损坏',
          size: 'normal',
          color: '#2761FF',
          timeStatus: '维修结束'
        },
        {
          content: '支持自定义颜色',
          failType: '传感器损坏',
          size: 'normal',
          failTime: '2018-04-12 20:46',
          timestamp: '2018-04-03 20:46',
          color: '#2761FF',
          timeStatus: '审批结束'
        },
        {
          content: '支持自定义尺寸',
          failType: '传感器损坏',
          size: 'normal',
          failTime: '2018-04-12 20:46',
          timestamp: '2018-04-03 20:46',
          color: '#2761FF',
          timeStatus: '上报成功'
        },
        {
          content: '默认样式的节点',
          failType: '传感器损坏',
          size: 'normal',
          failTime: '2018-04-12 20:46',
          timestamp: '2018-04-03 20:46',
          color: '#2761FF',
          timeStatus: '考评结束'
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.logs-modules {
  padding: 0 20px;
}
.fail-img {
  display: flex;
  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 2px;
  }
}
/deep/ .el-timeline-item__tail {
  border-left: 2px dotted #e4e7ed;
}
/deep/ .el-timeline-item__timestamp {
  color: #333333;
  font-size: 14px;
  font-weight: 600;
}
</style>