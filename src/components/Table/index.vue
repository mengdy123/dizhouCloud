<template>
  <div class="dz-table-module">
    <el-table ref="refTable"
              :data="tableData"
              style="width: 100%"
              :height="height"
              :header-cell-style="{background:'#fafafa',fontWeight: '500',height: '54px'}"
              :empty-text="emptyText"
              @row-click="expandChange">
      <!-- 展开行 -->
      <el-table-column v-if="expand"
                       type="expand">
        <template slot-scope="scope">
          <main>
            <slot name='rowMain'></slot>
          </main>
        </template>
      </el-table-column>
      <!-- table的第一列是判断是否为序号（index）或者是选择框(selection) -->
      <el-table-column v-if="selection"
                       width="55"
                       type="selection"
                       align="center">
      </el-table-column>
      <el-table-column v-if="index"
                       :width="indexWidth"
                       label="序号"
                       type="index"
                       :align="indexAlign">
      </el-table-column>

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
      <!-- 表格操作项，使用scope.row拿到当前行的数据 -->
      <el-table-column v-if="action.length > 0"
                       label="操作"
                       prop="actions"
                       fixed="right"
                       width="200px"
                       align="left">
        <template slot-scope="scope">
          <span v-for="(it, index) in action"
                :key="index"
                :class="it.style">
            <span v-if="it.name === '可视化'"
                  @click.stop="viewScreen">{{it.name}}</span>
            <span v-if="it.name === '详情'"
                  @click.stop="rowClick(scope.row)">{{it.name}}</span>
            <span v-if="it.name === '上报'"
                  @click.stop="reportedClick(scope.row)">{{it.name}}</span>
            <span v-if="it.name === '编辑'"
                  @click.stop="editTable(scope.row)">{{it.name}}</span>
            <span v-if="it.name === '禁用' && name === '项目管理' && scope.row.status !== '4'"
                  @click.stop="disebleTable(scope.row)">{{it.name}}</span>
            <span v-if="it.name === '禁用' && name !== '项目管理' && scope.row.status !== '1'"
                  @click.stop="disebleTable(scope.row)">{{it.name}}</span>
            <span v-if="it.name === '启用' && name === '项目管理'  && scope.row.status === '4'"
                  @click.stop="disebleTable(scope.row)">{{it.name}}</span>
            <span v-if="it.name === '启用' && name !== '项目管理' && scope.row.status === '1'"
                  @click.stop="disebleTable(scope.row)">{{it.name}}</span>
            <span v-if="it.name === '删除'"
                  @click.stop="deleteRow(scope.row)">{{it.name}}</span>
            <span v-if="it.name === '审批'"
                  @click.stop="approveRow(scope.row)">{{it.name}}</span>
            <span v-if="it.name === '维修'"
                  @click.stop="maintainRow(scope.row)">{{it.name}}</span>
            <span v-if="it.name === '考评'"
                  @click.stop="checkRow(scope.row)">{{it.name}}</span>

          </span>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>
  <script>
/* 
data:表格数据源；
height:该表格的高度 如果该高度有值 则会固定表头；
border：是否需要边框；
empty-text：空数据时显示的文本内容->暂无数据；
*/
import axios from 'axios'
import Interceptor, {
  DUTY_URL
} from '@/http/axiosApi'
import { mapState, mapActions } from 'vuex'
import systemMirror from '@/resource/systemMirror'
export default {
  data () {
    return {
      // tableHeight: 200, // 自己设置高度
      expands: []
    }
  },
  props: {
    // 展开行
    expand: {
      type: Boolean,
      default: false
    },
    indexWidth: {
      type: String,
      default: '50px'
    },
    indexAlign: {
      type: String,
      default: 'center'
    },
    // 请求的接口名称
    http: {
      type: String,
      default: ''
    },
    // 当前模块名称
    name: {
      type: String,
      default: ''
    },
    // 是否显示序号（index）/ 选择框（selection）
    index: {
      type: Boolean,
      default: false
    },
    selection: {
      type: Boolean,
      default: false
    },
    //是否可以查看详情
    detail: {
      type: Boolean,
      default: true
    },
    //是否可以编辑
    editRow: {
      type: Boolean,
      default: true
    },
    //是否可以编辑
    statusRow: {
      type: Boolean,
      default: true
    },
    // 表格数据
    tableData: {
      type: Array
    },
    //是否展示操作列
    action: {
      type: Array,
      default: []
    },
    // 表头数据
    tableConfigArr: {
      type: Array
    },
    // 表头高度
    height: {
      type: String,
      default: '54'
    },
    // 当表格无数据的时候表格内显示暂无数据
    emptyText: {
      type: String,
      default: "暂无数据"
    },
  },
  mounted () {
    //固定表头

  },
  methods: {
    ...mapActions(['saveDetailInfo', 'changeEditStatus']),
    editTable (row) {
      if (this.name === '行业管理') {
        this.$emit('changeProjectBox', true)
        this.$emit('getDetail', row)
      } else if (this.name === '设备系列') {
        this.$emit('changeProjectBox', true)
        this.$emit('getDetail', row)
      } else {
        this.changeEditStatus(true)
        this.handdle(row)
      }
    },
    //审批
    approveRow (row) {
      alert('审批')
    },
    //维修
    maintainRow (row) {
      alert('维修')
    },
    //考评
    checkRow (row) {
      alert('考评')
    },
    // 删除
    deleteRow (row) {
      alert('删除')
    },
    expandChange (row, index, e) {
      // console.log('row', row)
      // console.log('index', index)
      // console.log('e', e)
      //调用,table的方法,展开/折叠 行
      this.$refs.refTable.toggleRowExpansion(row)
      this.$emit('getList', row.seriesId)
    },
    viewScreen () {
      this.$router.push('/sceneIndex')
    },
    rowClick (row) {
      this.changeEditStatus(false)
      this.handdle(row)
    },
    disebleTable (row) {
      this.$emit('disebleTable', row)
    },
    reportedClick (row) {
      alert('上报功能')
    },
    handdle (row) {
      console.log('row', row)
      console.log('this.name', this.name)
      let http = ''
      let id = ''
      if (this.name === '项目管理' || row.projectId) {
        id = row.projectId
      } else if (this.name === '客户管理' || row.companyId) {
        id = row.companyId
      } else if (this.name === '' || row.deviceId) {
        id = row.deviceId
      } else if (this.name === '' || row.userId) {
        id = row.userId
      } else if (this.name === '' || row.deviceTypeId) {
        id = row.deviceTypeId
      } else if (this.name === '' || row.systemTypeId) {
        id = row.systemTypeId
      }
      http = DUTY_URL + this.http + String(id)
      if (this.detail) {
        axios.get(http)
          .then(res => {
            console.log('查看详情', res.data)
            let { code, result, serviceMessage } = res.data
            this.saveDetailInfo(result)
            if (code === 200) {
              let path = this.$route.name + 'Detail'
              let data = {
                url: path,
                id: id || '1'
              }

              this.toPath(data)

            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    toPath (data) {
      this.$router.push({ path: data.url, query: { id: data.id } });
    }
  }
}
</script>
<style lang="less" scoped>
// .dz-table-module {
//   overflow-y: scroll;
// }
</style>