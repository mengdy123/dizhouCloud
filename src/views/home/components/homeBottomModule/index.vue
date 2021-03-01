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
                <li>维修进度：{{item.schedule || '暂无数据'}}</li>
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
        data: [
          ['扬州文昌路1', '扬州', '运行中', '交通', '43', '789'],
          ['扬州文昌路2', '扬州', '运行中', '交通', '21', '1025'],
          ['扬州文昌路3', '扬州', '运行中', '交通', '36', '333'],
          ['扬州文昌路4', '扬州', '运行中', '交通', '83', '569'],
          ['扬州文昌路5', '扬州', '运行中', '交通', '63', '1024'],
          ['扬州文昌路6', '扬州', '运行中', '交通', '48', '356'],
          ['扬州文昌路7', '扬州', '运行中', '交通', '55', '256'],
          ['扬州文昌路8', '扬州', '运行中', '交通', '33', '896'],
          ['扬州文昌路9', '扬州', '运行中', '交通', '13', '1236'],
          ['扬州文昌路10', '扬州', '运行中', '交通', '89', '1025'],
        ]
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
          this.resetTableList(this.homeIndexInfo.projectInfoList)
          this.spanIndex = '0'
          this.bugList = this.homeIndexInfo.warningList
          this.solve = this.homeIndexInfo.warSolveList[0].solveNumber
          this.solved = this.homeIndexInfo.warSolveList[1].solveNumber
        }
      }
    }
  },
  methods: {
    ...mapActions(['changeProjectData']),
    getTableRow (row) {
      const jwList = [
        [106.540223, 39.231666],
        [106.540223, 39.231666],
        [106.540223, 39.231666],
        [106.540223, 39.231666],
        [106.540223, 39.231666],
        [106.540223, 39.231666],
        [106.540223, 39.231666],
        [106.540223, 39.231666],
        [106.540223, 39.231666],
        [106.540223, 39.231666],
        [106.540223, 39.231666],
        [106.540223, 39.231666],
        [106.540223, 39.231666],
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
      } else {
        this.bugList = this.homeIndexInfo.warningListByReso
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
      data.forEach(item => {
        arr = []
        for (let val of Object.values(item)) {
          arr.push(val)
        }
        arrData.push(arr)
        this.config.data.push(arr)
      });
    },
  },
  mounted () {
    // console.log('homeIndexInfo----homeBottomModule', this.homeIndexInfo.warningList)
    if (this.homeIndexInfo && this.homeIndexInfo.projectInfoList) {
      this.resetTableList(this.homeIndexInfo.projectInfoList)
    }
    if (this.homeIndexInfo && this.homeIndexInfo.warningList) {
      this.solve = this.homeIndexInfo.warSolveList[0].solveNumber
      this.solved = this.homeIndexInfo.warSolveList[1].solveNumber
      if (this.spanIndex === '0') {
        this.bugList = this.homeIndexInfo.warningList
      } else {
        this.bugList = this.homeIndexInfo.warningListByReso
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
    font-size: 16px;
    opacity: 0.5;
    cursor: pointer;
  }
  .span-active {
    font-size: 18px !important;
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