<template>
  <div class="dz-content-bottom-module">
    <div class="dz-content-bottom-table">
      <titleDiv title='项目信息'></titleDiv>
      <scrollTable :config='config'
                   @getTableRow='getTableRow'></scrollTable>
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
                <li>维修进度：进行中</li>
                <!-- {{item.schedule || '暂无数据'}} -->
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
      config: {
        headerBGC: '',
        oddRowBGC: '',
        evenRowBGC: '',
        hoverPause: true,
        header: ['名称', '位置', '状态', '类型', '系统数量', '设备数量'],
        data: []
      },
      bugList: [],
      spanIndex: '0',
      solve: 0,
      solved: 0
    }
  },
  computed: {
    ...mapState({
      homeIndexInfo: state => state.home.homeIndexInfo,
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
            if (item.deviceType && item.deviceType === '1') {
              item.deviceType = '发光标线'
            } else if (item.deviceType && item.deviceType === '2') {
              item.deviceType = '智慧路灯'
            } else if (item.deviceType && item.deviceType === '3') {
              item.deviceType = '井盖'
            } else if (item.deviceType && item.deviceType === '4') {
              item.deviceType = '智慧砖'
            } else if (item.deviceType && item.deviceType === '5') {
              item.deviceType = '合杆'
            } else if (item.deviceType && item.deviceType === '6') {
              item.deviceType = '井盖系统'
            } else if (item.deviceType && item.deviceType === '7') {
              item.deviceType = '过街立柱'
            } else if (item.deviceType && item.deviceType === '8') {
              item.deviceType = '停车立柱'
            }
          })
        }
      }
    }
  },
  methods: {
    ...mapActions(['changeProjectData']),
    getTableRow (row) {
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
        jw: jwList[row.rowIndex]
      }
      // console.log('所在行数据', data)
      eventBus.$emit('addMarkerOnly', data)
    },
    clickSpan (num) {
      this.spanIndex = num
      if (num === '0') {
        this.bugList = this.homeIndexInfo.warningList
        this.bugList.forEach(item => {
          if (item.deviceType && item.deviceType === '1') {
            item.deviceType = '发光标线'
          } else if (item.deviceType && item.deviceType === '2') {
            item.deviceType = '智慧路灯'
          } else if (item.deviceType && item.deviceType === '3') {
            item.deviceType = '井盖'
          } else if (item.deviceType && item.deviceType === '4') {
            item.deviceType = '智慧砖'
          } else if (item.deviceType && item.deviceType === '5') {
            item.deviceType = '合杆'
          } else if (item.deviceType && item.deviceType === '6') {
            item.deviceType = '井盖系统'
          } else if (item.deviceType && item.deviceType === '7') {
            item.deviceType = '过街立柱'
          } else if (item.deviceType && item.deviceType === '8') {
            item.deviceType = '停车立柱'
          }
        })
      } else {
        this.bugList = this.homeIndexInfo.warningListByReso
        this.bugList.forEach(item => {
          if (item.deviceType && item.deviceType === '1') {
            item.deviceType = '发光标线'
          } else if (item.deviceType && item.deviceType === '2') {
            item.deviceType = '智慧路灯'
          } else if (item.deviceType && item.deviceType === '3') {
            item.deviceType = '井盖'
          } else if (item.deviceType && item.deviceType === '4') {
            item.deviceType = '智慧砖'
          } else if (item.deviceType && item.deviceType === '5') {
            item.deviceType = '合杆'
          } else if (item.deviceType && item.deviceType === '6') {
            item.deviceType = '井盖系统'
          } else if (item.deviceType && item.deviceType === '7') {
            item.deviceType = '过街立柱'
          } else if (item.deviceType && item.deviceType === '8') {
            item.deviceType = '停车立柱'
          }
        })
      }
    },
    showBugDetail (item) {
      let data = {
        type: 'bug',
        row: item,
        jw: item.jw
      }
      // console.log('查看BUG详情', data)
      eventBus.$emit('addMarkerOnly', data)
    },
    resetTableList (data) {
      this.config.data = []
      let arrData = []
      let arr = []
      let val = null
      if (data.length > 0) {
        data.forEach(item => {
          arr = []
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
          for (val of Object.values(item)) {
            arr.push(val)
          }
          arrData.push(arr)
          this.config.data.push(arr)
        });
      }

    },
  },
  mounted () {
    // console.log('homeIndexInfo----homeBottomModule', this.homeIndexInfo.warningList)
    if (this.homeIndexInfo && this.homeIndexInfo.projectInfoList) {
      this.resetTableList(this.homeIndexInfo.projectInfoList)
    }
    if (this.homeIndexInfo && this.homeIndexInfo.warningList) {
      this.solve = this.homeIndexInfo.warSolveList[0].solveNumber || 0
      this.solved = this.homeIndexInfo.warSolveList[1].solveNumber || 0
      if (this.spanIndex === '0') {
        this.bugList = this.homeIndexInfo.warningList
        this.bugList.forEach(item => {
          if (item.deviceType && item.deviceType === '1') {
            item.deviceType = '发光标线'
          } else if (item.deviceType && item.deviceType === '2') {
            item.deviceType = '智慧路灯'
          } else if (item.deviceType && item.deviceType === '3') {
            item.deviceType = '井盖'
          } else if (item.deviceType && item.deviceType === '4') {
            item.deviceType = '智慧砖'
          } else if (item.deviceType && item.deviceType === '5') {
            item.deviceType = '合杆'
          } else if (item.deviceType && item.deviceType === '6') {
            item.deviceType = '井盖系统'
          } else if (item.deviceType && item.deviceType === '7') {
            item.deviceType = '过街立柱'
          } else if (item.deviceType && item.deviceType === '8') {
            item.deviceType = '停车立柱'
          }
        })
      } else {
        this.bugList = this.homeIndexInfo.warningListByReso
        this.bugList.forEach(item => {
          if (item.deviceType && item.deviceType === '1') {
            item.deviceType = '发光标线'
          } else if (item.deviceType && item.deviceType === '2') {
            item.deviceType = '智慧路灯'
          } else if (item.deviceType && item.deviceType === '3') {
            item.deviceType = '井盖'
          } else if (item.deviceType && item.deviceType === '4') {
            item.deviceType = '智慧砖'
          } else if (item.deviceType && item.deviceType === '5') {
            item.deviceType = '合杆'
          } else if (item.deviceType && item.deviceType === '6') {
            item.deviceType = '井盖系统'
          } else if (item.deviceType && item.deviceType === '7') {
            item.deviceType = '过街立柱'
          } else if (item.deviceType && item.deviceType === '8') {
            item.deviceType = '停车立柱'
          }
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
      li {
        color: #e1e6fa;
        font-size: 14px;
        opacity: 0.7;
      }
      li:first-child {
        color: #ffa321;
        opacity: 1;
      }
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