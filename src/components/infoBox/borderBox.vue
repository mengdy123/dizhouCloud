<template>
  <div class="dz-border-box">
    <div class="zebra-info-box">
      <div class="zebra-box">
        <div class="zebra-box-content">
          <el-tabs v-if="editableTabs.showTabs"
                   v-model="activeName"
                   @tab-click="handleClick">
            <el-tab-pane :key="item.name"
                         v-for="item in editableTabs.data"
                         :label="item.title"
                         :name="item.name">
              <div class="second-span"
                   v-if="infoData.secondList.length > 1">
                <span v-for="(item, index) in infoData.secondList"
                      :key="item.name"
                      :class="{'active-span': spanIndex === index}"
                      @click.stop="selectSpan(item,index)">{{item.name}}</span>
              </div>
              <div v-if="spanType === 'table'">
                <el-table :data="infoData.table"
                          :header-cell-style="{color: 'cccccc',fontWeight: '500',height: '48px'}"
                          style="width: 100%; height: 100%">
                  <el-table-column prop="time"
                                   label="时间"
                                   width="100">
                  </el-table-column>
                  <el-table-column prop="type"
                                   label="类型">
                  </el-table-column>
                  <el-table-column prop="details"
                                   label="详情">
                  </el-table-column>
                  <el-table-column prop="state"
                                   label="状态">
                  </el-table-column>
                </el-table>
              </div>
              <ul v-else>
                <li v-for="(item, index) in list"
                    :key='index'>
                  <img v-if="item.name || item.label"
                       src="../../assets/icon/ecs-running.png"
                       alt="">
                  <div>
                    <span>{{item.label || item.name}}</span>
                    <span>{{item.value}}</span>
                  </div>
                </li>
              </ul>
              <barChart1 v-if="list && list.type === 'barChart'"
                         class="flow-chart-div"
                         :xAxisData='list.xAxisData'
                         :yAxisData='list.yAxisData'
                         :title="list.title"
                         ref="flowChart"></barChart1>
            </el-tab-pane>
          </el-tabs>
          <div class="project-info-button">
            <el-button type="primary"
                       @click.stop="setParamer"
                       size="mini">参数配置</el-button>
          </div>
        </div>
      </div>
      <div class="zebra-box-close"
           @click.stop="closeBox(false)">
        <icon-svg icon-class="guanbi" />
      </div>
    </div>

  </div>
</template>
<script>
import barChart1 from '@/components/charts/barChart1.vue'
export default {
  components: { barChart1 },
  props: {
    infoData: {
      type: Object,
      default: {}
    },
    editableTabs: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      activeName: '',
      spanIndex: 0,
      spanType: '',
      tableData: [
        {
          time: '2020-05-02',
          type: '硬件损坏',
          detail: '电池老化',
          status: '维修结束',
        },
        {
          time: '2021-03-02',
          type: '人工智能',
          detail: '行人违章',
          status: '已警示',
        },
      ],
      list: []
    }
  },
  watch: {
    infoData: {
      deep: true,
      handler (newValue, oldValue) {
        this.spanType = newValue.secondList[0].type
        this.list = newValue[this.spanType]
        this.$nextTick(() => {
          this.$refs.flowChart.initChart()
        })
        // setTimeout(() => {
        //   if (this.$refs['flowChart']) {
        //     this.$refs.flowChart.initChart()
        //   }
        // }, 200)
      }
    }
  },
  mounted () {
    this.activeName = this.editableTabs.data[0].name
    this.spanType = this.infoData.secondList[0].type
    this.list = this.infoData[this.spanType]
    // setTimeout(() => {
    //   this.$refs.flowChart.initChart()
    // }, 500)
  },
  methods: {
    selectSpan (item, index) {
      this.spanIndex = index
      this.spanType = item.type
      this.list = this.infoData[this.spanType]
    },
    handleClick (tab, event) {
      event.stopPropagation();
      // console.log('handleClick', tab);
      this.$emit('saveTabsTitle', Number(tab.name) + 1)

      // this.list = this.infoData[this.spanType]
    },
    closeBox (val) {
      this.$emit('closeBox', val)
    },
    setParamer (event) {
      // event.stopPropagation();
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../style/color.less";
.flow-chart-div {
  height: 150px;
  width: 100%;
}
.dz-border-box {
  width: 100%;
  height: 100%;
  z-index: 99999999;
}
.zebra-info-box {
  width: 100%;
  height: 100%;
}
.project-info-button {
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 6px;
  /deep/.el-button {
    margin-top: 10px;
  }
}
.active-span {
  font-weight: bold;
  color: #35e9ff !important;
}
.zebra-box {
  height: 100%;
  width: 100%;
  position: relative;

  &-content {
    width: 100%;
    background: rgba(7, 14, 71, 0.5);
    color: @white;
    padding: 10px 30px;
    .second-span {
      display: flex;
      span {
        font-size: 12px;
        line-height: 16px;
        padding: 4px 0 14px 0;
        color: rgba(255, 255, 255, 0.5);
        cursor: pointer;
        margin-right: 20px;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-between;
      justify-content: flex-start;
      li {
        display: flex;
        min-width: 33%;
        margin-bottom: 10px;
        img {
          width: 14px;
          height: 14px;
          margin: auto 6px;
        }
        div {
          display: flex;
          flex-direction: column;
          & :first-child {
            font-size: 12px;
            color: #cccccc;
          }
          & :last-child {
            font-size: 14px;
            color: #e1e6fa;
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
    right: 28px;
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
  /deep/.el-table,
  /deep/.el-table__expanded-cell {
    background-color: transparent;
  }

  /deep/.el-table th,
  /deep/.el-table tr {
    background-color: transparent;
  }
  /deep/.el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: rgba(7, 14, 71, 0.5);
    color: #e1e6fa !important;
  }
  /deep/.el-table__body {
    color: #e1e6fa !important;
  }
  /deep/.el-table td,
  /deep/ .el-table th.is-leaf {
    border-bottom: 1px solid rgba(7, 14, 71, 0.5);
  }
  /deep/.el-table::before {
    background-color: rgba(7, 14, 71, 0.5);
  }
}
</style>