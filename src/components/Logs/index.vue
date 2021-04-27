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
                        :timestamp="activity.timestamp">
        <div class="log-list"
             v-if="type === '运维日志' ">
          <div>故障类型：{{activity.faultName || '暂无数据'}}</div>
          <div>维修方式：{{activity.repairMode || '暂无数据'}}</div>
          <el-popover placement="right"
                      width="400"
                      trigger="click">
            <div class="detail-item">
              <ul>
                <li><em>设备类型：</em>{{activity.faultName || '暂无数据'}}</li>
                <li><em>设备编号：</em>{{activity.deviceNumber || '暂无数据'}}</li>
                <li><em>故障类型：</em>{{activity.faulttype || '暂无数据'}}</li>
                <li><em>故障时间：</em>{{activity.faultTime || '暂无数据'}}</li>
                <li><em>审核人：</em>{{activity.auditorName || '暂无数据'}}</li>
                <li><em>维修方式：</em>{{activity.repairMode || '暂无数据'}}</li>
                <li><em>安装区域：</em>{{activity.installationArea || '暂无数据'}}</li>
                <li><em>维修人：</em>{{activity.maintenanceName || '暂无数据'}}</li>
                <li><em>描述：</em>{{activity.remark || '暂无数据'}}</li>
                <li>
                  <!-- <el-image style="width: 100px; height: 100px"
                            :src="url"
                            :preview-src-list="srcList">
                  </el-image> -->
                </li>
              </ul>
            </div>
            <div class="show-detail"
                 slot="reference"
                 v-popover:popover>详细信息</div>

          </el-popover>
        </div>
      </el-timeline-item>
    </el-timeline>

  </div>
</template>
<script>
export default {
  props: {
    activities: {
      type: Array,
      default: []
    },
    type: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ]
    };
  },
  methods: {
    showDetail () {

    }
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
.log-list {
  width: 500px;
  .show-detail {
    width: 80px;
    cursor: pointer;
    color: rgb(39, 97, 255);
  }
}
.detail-item {
  ul {
    li {
      line-height: 26px;
      font-style: 14px;
      font-weight: 500;
      em {
        font-style: normal;
        color: #333333;
      }
    }
  }
}
</style>