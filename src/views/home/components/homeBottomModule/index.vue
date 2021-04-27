<template>
  <div class="dz-content-bottom-module">
    <div class="dz-content-bottom-table">
      <titleDiv title='项目信息'></titleDiv>
      <scrollTable @getTableRow='getTableRow'
                   :tableConfigArr='tableConfigArr'
                   :tabData='tabData'></scrollTable>
    </div>
    <div class="dz-content-bottom-detail">
      <div class="detail-type">
        <span :class="{'span-active' : spanIndex === '0'}"
              @click="clickSpan('0')">待解决（{{solve}}）</span>
        <span :class="{'span-active' : spanIndex === '1'}"
              @click="clickSpan('1')">已解决（{{solved}}）</span>
      </div>
      <div class="detail-list">
        <el-carousel trigger="click"
                     height="150px">
          <el-carousel-item v-for="(item, index) in bugList"
                            :key="index">
            <div class="detail-list-carousel"
                 @click="showBugDetail(item)">
              <img src="../../../../assets/yellow-light.png"
                   alt="">
              <ul>
                <li>异常预判：{{item.prediction || '暂无数据'}}</li>
                <li>设备类型：{{item.deviceType || '暂无数据'}}</li>
                <li>设备编号：{{item.deviceCode || '暂无数据'}}</li>
                <li>设备地址：{{item.deivceSite || '暂无数据'}}</li>
              </ul>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>
<script>
import scrollTable from '@/components/Table/scrollTable.vue'
import titleDiv from "@/components/titleModule";
import eventBus from '@/utils/bus'
import { mapState, mapActions } from 'vuex'
export default {
  components: { scrollTable, titleDiv },
  data () {
    return {
      bugList: [],
      spanIndex: '0',
      solve: 0,
      solved: 0,
      tabData: [],
      tableConfigArr: [
        {
          fixed: false,
          prop: 'projectName',
          label: '名称',
          width: '180px',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'province',
          label: '位置',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'states',
          label: '状态',
          tooltip: false,
        },
        {
          fixed: false,
          prop: 'projectType',
          label: '类型',
          tooltip: false,
        },
        {
          fixed: false,
          prop: 'systemNumber',
          label: '系统数量',
          tooltip: false,
        },
        {
          fixed: false,
          prop: 'deviceNumber',
          label: '设备数量',
          tooltip: false,
        },
      ]
    }
  },
  computed: {
    ...mapState({
      homeIndexInfo: state => state.home.homeIndexInfo,
      deviceType: state => state.common.deviceType,
      projectStatus: state => state.common.projectStatus,
    })
  },
  watch: {
    homeIndexInfo: {
      deep: true,
      handler (newVal, oldVal) {
        console.log('homeIndexInfo---homeBottomModule', newVal)
        if (newVal) {
          this.resetTableList(newVal.projectInfoList)
          this.spanIndex = '0'
          this.bugList = newVal.warningList || []
          this.solve = newVal.warSolveList[0].solveNumber || 0
          this.solved = newVal.warSolveList[1].solveNumber || 0
          this.bugList.forEach(item => {
            this.deviceType.forEach(it => {
              if (item.deviceType === it.id) {
                item.deviceType = it.name
              }
            })
          })
        }
      }
    }
  },
  methods: {
    ...mapActions(['changeProjectData']),
    getTableRow (row) {
      console.log('row', row)
      const jwList = [
        [121.231733, 31.032311],
        [121.231733, 31.032311],
        [121.231733, 31.032311],
        [121.231733, 31.032311],
        [121.231733, 31.032311],
        [121.231733, 31.032311],
        [121.231733, 31.032311],
        [121.231733, 31.032311],
        [121.231733, 31.032311],
        [121.231733, 31.032311],
        [121.231733, 31.032311],
        [121.231733, 31.032311],
        [121.231733, 31.032311],
      ]
      let data = {
        ...row,
        type: 'project',
        jw: jwList[0]
      }
      // console.log('所在行数据', data)
      eventBus.$emit('addMarkerOnly', data)
    },
    clickSpan (num) {
      this.spanIndex = num
      if (num === '0') {
        this.bugList = this.homeIndexInfo.warningList
        this.bugList.forEach(item => {
          this.deviceType.forEach(it => {
            if (item.deviceType === it.id) {
              item.deviceType = it.name
            }
          })
        })
      } else {
        this.bugList = this.homeIndexInfo.warningListByReso
        this.bugList.forEach(item => {
          this.deviceType.forEach(it => {
            if (item.deviceType === it.id) {
              item.deviceType = it.name
            }
          })
        })
      }
    },
    showBugDetail (item) {
      let data = {
        type: 'bug',
        row: item,
        jw: [121.231733, 31.032311],
      }
      console.log('查看BUG详情', data)
      eventBus.$emit('addMarkerOnly', data)
    },
    resetTableList (data) {
      this.tabData = data
      this.tabData.forEach(item => {
        if (item.states === '1') {
          item.states = '正常'
        } else {
          item.states = '正常'
        }
        if (item.projectType === '1') {
          item.projectType = '交通'
        } else {
          item.projectType = '其他'
        }
      });

    },
  },
  mounted () {
    this.resetTableList(this.homeIndexInfo.projectInfoList)
    if (this.homeIndexInfo && this.homeIndexInfo.warningList) {
      this.solve = this.homeIndexInfo.warSolveList[0].solveNumber || 0
      this.solved = this.homeIndexInfo.warSolveList[1].solveNumber || 0
      if (this.spanIndex === '0') {
        this.bugList = this.homeIndexInfo.warningList
        this.bugList.forEach(item => {
          this.deviceType.forEach(it => {
            if (item.deviceType === it.id) {
              item.deviceType = it.name
            }
          })
        })
      } else {
        this.bugList = this.homeIndexInfo.warningListByReso
        this.bugList.forEach(item => {
          this.deviceType.forEach(it => {
            if (item.deviceType === it.id) {
              item.deviceType = it.name
            }
          })
        })
      }
    }

  }
}
</script>
<style lang="less" scoped>
.detail-type {
  display: flex;
  width: 100%;
  span {
    width: 50%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #e1e6fa;
    font-size: 14px;
    opacity: 0.5;
    cursor: pointer;
  }
  .span-active {
    font-size: 14px !important;
    opacity: 1 !important;
  }
}
.detail-list {
  &-carousel {
    display: flex;
    width: 70%;
    margin: 20px auto;
    cursor: pointer;
    img {
      width: 60px;
      height: 60px;
      margin: 30px 20px;
    }
    ul {
      width: 100%;
      li {
        color: #e1e6fa;
        font-size: 14px;
        opacity: 0.7;
        width: 100%;
      }
      li:first-child {
        color: #ffa321;
        opacity: 1;
      }
      // li:last-child {
      //   text-overflow: ellipsis;
      //   overflow: hidden;
      // }
    }
  }
  /deep/ .el-carousel__indicators--horizontal {
    display: none;
  }
}
.dz-content-bottom-module {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  .dz-content-bottom-table {
    width: 60%;
    height: 100%;
    padding: 20px;
    background: linear-gradient(180deg, #090e45 0%, rgba(8, 13, 68, 0.8) 100%);
  }
  .dz-content-bottom-detail {
    width: 39%;
    height: 100%;
    background: linear-gradient(180deg, #090e45 0%, rgba(8, 13, 68, 0.8) 100%);
    padding: 20px;
  }
}
</style>