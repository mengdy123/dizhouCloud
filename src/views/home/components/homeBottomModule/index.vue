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
              @click="clickSpan('0')">待解决（18）</span>
        <span :class="{'span-active' : spanIndex === '1'}"
              @click="clickSpan('1')">已解决（20）</span>
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
                <li>异常预判：{{item.name + index}}</li>
                <li>设备类型：{{item.type}}</li>
                <li>设备编号：{{item.num}}</li>
                <li>设备地址：{{item.address}}</li>
                <li>维修进度：{{item.plan}}</li>
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
import { mapActions } from 'vuex'
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
      bugList: [
        {
          name: '电路短路',
          type: '太阳能地砖',
          num: 'NO.7859',
          address: '上海市松江区姚北路1518号',
          plan: '维修中',
          jw: [121.307849, 31.3731]
        },
        {
          name: '电路短路',
          type: '太阳能地砖',
          num: 'NO.7859',
          address: '上海市松江区姚北路1518号',
          plan: '维修中',
          jw: [121.176013, 31.018336]
        },
        {
          name: '电路短路',
          type: '太阳能地砖',
          num: 'NO.7859',
          address: '上海市松江区姚北路1518号',
          plan: '维修中',
          jw: [120.3026, 31.656418]
        },
        {
          name: '电路短路',
          type: '太阳能地砖',
          num: 'NO.7859',
          address: '上海市松江区姚北路1518号',
          plan: '维修中',
          jw: [119.695605, 30.721293]
        }
      ],
      spanIndex: '0'
    }
  },
  methods: {
    ...mapActions(['changeProjectData']),
    getTableRow (row) {
      const jwList = [
        [119.396228, 32.171657],
        [120.601977, 31.140656],
        [117.358264, 32.947299],
        [119.742297, 29.069054],
        [121.269397, 32.299593],
        [114.172229, 29.366299],
        [120.269641, 34.292093],
        [130.948352, 46.719842],
        [89.639758, 42.076549],
        [109.678821, 24.140154]
      ]
      let data = {
        ...row,
        type: 'project',
        jw: jwList[row.rowIndex]
      }
      // console.log('所在行数据', data)
      this.changeProjectData(data)
    },
    clickSpan (num) {
      this.spanIndex = num
    },
    showBugDetail (item) {
      let jw = item.jw
      let data = {
        type: 'bug',
        row: item,
        jw: item.jw
      }
      // console.log('查看BUG详情', data)
      this.changeProjectData(data)
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