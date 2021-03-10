<template>
  <div class="dz-scene">
    <!-- <model3D style='width: 100%;height: 100%'></model3D> -->
    <div class="dz-scene-body">
      <div class="dz-scene-body-top">
        <div class="dz-title-module">
          <dzTitle></dzTitle>
        </div>
        <div class="dz-time-module">
          <dzTopMenu></dzTopMenu>
        </div>
      </div>
      <div class="go-back"
           @click="goBack">
        返回首页</div>
      <div class="dz-scene-body-content">
        <router-view></router-view>
      </div>
      <!-- <div class="zebra-button"
           @click="zebraShow = true"></div>
      <div class="well-button"
           @click="wellShow = true"></div>
      <div class="zebra-info-box"
           v-if="zebraShow">
        <dv-border-box-13>
          <div class="zebra-box">
            <div class="zebra-box-content">
              <el-tabs v-model="activeName"
                       @tab-click="handleClick">
                <el-tab-pane label="运营数据"
                             name="first">
                  <ul>
                    <li v-for="(item, index) in operationList"
                        :key='index'>
                      <img :src="item.url"
                           alt="">
                      <div>
                        <span>{{item.label}}</span>
                        <span>{{item.value}}</span>
                      </div>
                    </li>
                  </ul>
                </el-tab-pane>
                <el-tab-pane label="硬件信息"
                             name="second">
                  <ul>
                    <li v-for="(item, index) in roadList"
                        :key='index'>
                      <img :src="item.url"
                           alt="">
                      <div>
                        <span>{{item.label}}</span>
                        <span>{{item.value}}</span>
                      </div>
                    </li>
                  </ul>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </dv-border-box-13>
        <div class="zebra-box-close"
             @click="zebraShow = false">
          <icon-svg icon-class="guanbi" />
        </div>
      </div>
      <div class="well-info-box"
           v-if="wellShow">
        <dv-border-box-13>
          <div class="zebra-box">
            <div class="zebra-box-content">
              <el-tabs v-model="activeName"
                       @tab-click="handleClick">
                <el-tab-pane label="运营数据"
                             name="first">
                  <ul>
                    <li v-for="(item, index) in operationList"
                        :key='index'>
                      <img :src="item.url"
                           alt="">
                      <div>
                        <span>{{item.label}}</span>
                        <span>{{item.value}}</span>
                      </div>
                    </li>
                  </ul>
                </el-tab-pane>
                <el-tab-pane label="硬件信息"
                             name="second">
                  <ul>
                    <li v-for="(item, index) in hardwareList"
                        :key='index'>
                      <img :src="item.url"
                           alt="">
                      <div>
                        <span>{{item.label}}</span>
                        <span>{{item.value}}</span>
                      </div>
                    </li>

                    <el-button type="primary"
                               class="project-info-button"
                               size="mini">参数配置</el-button>
                  </ul>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </dv-border-box-13>
        <div class="zebra-box-close"
             @click="wellShow = false">
          <icon-svg icon-class="guanbi" />
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import model3D from '../HelloWorld'
import dzTitle from '../dzTitle'
import dzTopMenu from '../dzTopMenu'
export default {
  name: 'mainIndex',
  components: { model3D, dzTitle, dzTopMenu },
  data () {
    return {
      screenWidth: null,
      zebraShow: false,
      wellShow: false,
      activeName: 'first',
      operationList: [
        {
          label: '状态',
          value: '运行中',
          url: require('../../assets/icon/ecs-running.png')
        },
        {
          label: '运行信息',
          value: '正常运行',
          url: require('../../assets/icon/shezhi.png')
        },
        {
          label: '通讯信号',
          value: '强',
          url: require('../../assets/icon/xinhao.png')
        },
        {
          label: '电池电量',
          value: '低',
          url: require('../../assets/icon/dianliang.png')
        },
        {
          label: '水位监测',
          value: '正常',
          url: require('../../assets/icon/shuiwei.png')
        },
        {
          label: '温湿度',
          value: '18℃ 20%',
          url: require('../../assets/icon/wenshidu.png')
        },
        {
          label: '电控锁',
          value: '开启',
          url: require('../../assets/icon/suo.png')
        },
        {
          label: '有毒气体',
          value: '正常',
          url: require('../../assets/icon/qiya.png')
        },
        {
          label: '太阳能发电量',
          value: '26度',
          url: require('../../assets/icon/ecs-running.png')
        },

      ],
      hardwareList: [
        {
          label: '硬件编号',
          value: 'NO.123456',
          url: require('../../assets/icon/bianhao.png')
        },
        {
          label: '地理信息',
          value: '121.125897  39.2356',
          url: require('../../assets/icon/ecs-running.png')
        },
        {
          label: '安装位置',
          value: '上海市松江区方松街道嘉松南路332号九号商业广场',
          url: require('../../assets/icon/mingcheng.png')
        },
        {
          label: '工作电压',
          value: 'DC9V',
          url: require('../../assets/icon/IOTtubiao_huabanfuben.png')
        },
        {
          label: '工作功率',
          value: '220W',
          url: require('../../assets/icon/shebeidianya.png')
        },
        {
          label: '防尘等级',
          value: '1级',
          url: require('../../assets/icon/ee-pushline-report-level.png')
        },
        {
          label: '承重能力',
          value: '5T',
          url: require('../../assets/icon/4qichexinghao.png')
        },

        {
          label: '工作温度',
          value: '-20~90 ℃',
          url: require('../../assets/icon/shuiwei.png')
        },
        {
          label: '外观',
          value: '定制版',
          url: require('../../assets/icon/17.png')
        },
        {
          label: '尺寸',
          value: '80*80',
          url: require('../../assets/icon/0-39.png')
        },

      ],
      roadList: [
        {
          label: '硬件编号',
          value: 'NO.123456',
          url: require('../../assets/icon/bianhao.png')
        },
        {
          label: '地理信息',
          value: '121.125897  39.2356',
          url: require('../../assets/icon/ecs-running.png')
        },
        {
          label: '安装位置',
          value: '上海市松江区方松街道嘉松南路332号九号商业广场',
          url: require('../../assets/icon/mingcheng.png')
        },
        {
          label: '工作电压',
          value: 'DC9V',
          url: require('../../assets/icon/IOTtubiao_huabanfuben.png')
        },
        {
          label: '工作功率',
          value: '220W',
          url: require('../../assets/icon/shebeidianya.png')
        },
        {
          label: '工作温度',
          value: '-20~90 ℃',
          url: require('../../assets/icon/shuiwei.png')
        },
      ]
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
    },
    goBack () {
      this.$router.push('mainIndex')
    }
  },
  mounted () {
    const that = this

  }
}
</script>
<style lang="less" scoped>
@import "../../style/color.less";
.dz-title-module {
  width: 260px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  margin-top: 26px;
  position: fixed;
  margin-left: -130px;
  top: 0px;
  left: 50%;
  z-index: 2;
}
.dz-time-module {
  width: 360px;
  height: 36px;
  line-height: 36px;
  position: fixed;
  right: 0;
  top: 30px;
  z-index: 2;
  text-align: right;
}
.dz-scene {
  width: 100%;
  height: 100%;
  background: url("../../assets/scene_01.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  &-body {
    display: flex;
  }
}
.zebra-button {
  width: 30px;
  height: 30px;
  background: rgba(7, 14, 71, 0.7);
  cursor: pointer;
  position: absolute;
  bottom: 360px;
  left: 1000px;
  border-radius: 50%;
}
.well-button {
  width: 30px;
  height: 30px;
  background: rgba(7, 14, 71, 0.7);
  cursor: pointer;
  position: absolute;
  bottom: 600px;
  left: 1170px;
  border-radius: 50%;
}
.zebra-info-box {
  width: 600px;
  height: 300px;
  position: absolute;
  bottom: 500px;
  left: 600px;
}
.well-info-box {
  width: 600px;
  height: 400px;
  position: absolute;
  top: 100px;
  left: 880px;
}
.zebra-box {
  padding: 30px;
  height: 100%;
  width: 100%;
  position: relative;
  &-content {
    width: 100%;
    height: 100%;
    background: rgba(7, 14, 71, 0.5);
    color: @white;
    padding: 10px 30px;
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        display: flex;
        min-width: 33%;
        margin-bottom: 10px;
        img {
          width: 20px;
          height: 20px;
          margin: auto 6px;
        }
        div {
          display: flex;
          flex-direction: column;
          & :first-child {
            font-size: 12px;
          }
          & :last-child {
            font-size: 14px;
          }
        }
      }
    }
    /deep/ .el-button--primary {
      color: #35e9ff;
      background: rgba(81, 142, 234, 30%) !important;
      background-color: rgba(81, 142, 234, 30%) !important;
      border-color: rgba(53, 233, 255, 50%) !important;
    }
  }
  &-close {
    position: absolute;
    right: 16px;
    top: 16px;
    cursor: pointer;
    /deep/ .svg-icon {
      width: 16px;
      height: 16px;
      fill: @white;
      opacity: 0.7;
    }
  }
  /deep/ .el-tabs__item {
    color: @white;
  }
  /deep/ .el-tabs__item.is-active {
    color: rgba(53, 233, 255, 1);
    font-size: 16px;
  }
  /deep/ .el-tabs__nav-wrap::after {
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
  }
  /deep/ .el-tabs__active-bar {
    background-color: rgba(53, 233, 255, 1);
    height: 1px;
  }
}
.go-back {
  width: 80px;
  height: 24px;
  line-height: 24px;
  cursor: pointer;
  color: @white;
  margin: 20px;
}
</style>
