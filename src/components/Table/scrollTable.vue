<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: mandy
 * @Date: 2021-02-01 12:40:56
 * @LastEditors: mandy
 * @LastEditTime: 2021-03-29 10:22:04
-->
<template>
  <div class="table-scroll-body">
    <el-table :data="tabData"
              height="100%"
              width='100%'
              ref="table"
              @cell-mouse-enter='hoverTable'
              @cell-mouse-leave='leaveTable'
              @row-click='tableClick'>
      <!-- 表头数据 -->
      <el-table-column v-for="(item,index) in tableConfigArr"
                       :key="index"
                       :prop="item.prop"
                       :label="item.label"
                       :width="item.width"
                       :fixed="item.fixed"
                       :show-overflow-tooltip="item.tooltip"
                       align="left">
      </el-table-column>

    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    tabData: {
      type: Array,
      default: []
    },
    // 表头数据
    tableConfigArr: {
      type: Array
    },
  },
  data () {
    return {
      timer: null
    }
  },
  mounted () {
    this.scrollTableFunction()
  },
  methods: {
    tableClick (row) {
      this.$emit('getTableRow', row)
    },
    scrollTableFunction () {
      // 拿到表格挂载后的真实DOM
      const table = this.$refs.table
      // 拿到表格中承载数据的div元素
      const divData = table.bodyWrapper
      // 拿到元素后，对元素进行定时增加距离顶部距离，实现滚动效果(此配置为每100毫秒移动1像素)
      this.timer = setInterval(() => {
        // 元素自增距离顶部1像素
        divData.scrollTop += 48
        // 判断元素是否滚动到底部(可视高度+距离顶部=整个高度)
        if (divData.clientHeight + divData.scrollTop == divData.scrollHeight) {
          // 重置table距离顶部距离
          divData.scrollTop = 0
        }
      }, 1500)
    },
    hoverTable () {
      clearInterval(this.timer);
      this.timer = null
    },
    leaveTable () {
      this.scrollTableFunction()
    }
  }

}
</script>
<style lang="less" scoped>
/deep/ .el-table__empty-block {
  width: 100% !important;
}
.table-scroll-body {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
/deep/.el-table,
/deep/.el-table__expanded-cell {
  background-color: transparent;
}

/deep/.el-table th,
/deep/.el-table tr {
  background-color: transparent;
}
/deep/ .el-table--scrollable-y .el-table__body-wrapper {
  overflow-y: hidden !important;
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
/deep/ .el-table td,
.el-table th {
  padding: 2px 0;
}
/deep/ .el-table thead {
  color: #ffffff;
  opacity: 0.5;
}
</style>