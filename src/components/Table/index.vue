<template>
  <div class="dz-table-module">
    <el-table ref="refTable"
              :data="tableData"
              style="width: 100%"
              :height="height"
              :row-key='getRowKeys'
              :header-cell-style="{background:'#fafafa',fontWeight: '500',height: '54px'}"
              :empty-text="emptyText"
              :expand-row-keys="expands"
              @expand-change="expandChange"
              @row-click="clickRowHandle">
      <!-- 展开行 -->
      <el-table-column v-if="expand"
                       type="expand">
        <template slot-scope="scope">
          <div class="row-main"
               :data-rowData="rowData">
            <ul v-for="(item, index) in rowData"
                :key="index">
              <li>
                <span>设备型号：</span>
                <span>{{item.versiontypeName}}</span>
              </li>
              <li>
                <span>设备数量：</span>
                <span>{{item.deviceNumber}}</span>
              </li>
            </ul>
            <div class="dz-system-device-add"
                 @click="changeModelBox(true)">新增型号</div>
          </div>
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
      <!-- 显示 -->
      <el-table-column v-if="showIndex"
                       width="60"
                       label="显示"
                       align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.show"
                       @change="selectChangeShow(scope.row)"></el-checkbox>
        </template>
      </el-table-column>

      <!-- 色值 -->
      <el-table-column v-if="showColors"
                       width="60"
                       label="色值"
                       align="center">
        <template slot-scope="scope">
          <el-color-picker v-model="scope.row.color"
                           :show-alpha='false'
                           color-format='hex'
                           size="mini"
                           @change='changeColor(scope.row)'
                           :predefine="predefineColors">
          </el-color-picker>
        </template>
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
      <!-- 状态行 -->
      <el-table-column prop="status"
                       label="状态"
                       v-if="name !== '客户管理' && name !=='故障类型管理' 
                       && name !=='运维职责管理' && name !=='历史信息' && name !=='满意度考评'  && name !=='权限配置' && name !=='行业管理'
                       && name !=='项目分布' && name !=='智能设备' && name !=='智能系统' && name !=='角色管理'">
        <template scope="scope">
          <span v-if="scope.row.statusLable == '正常' || scope.row.statusLable == '待审批' "
                style="color: #518EEA">{{ scope.row.statusLable }}</span>
          <span v-else-if="scope.row.statusLable == '待维修' || scope.row.statusLable == '维修'"
                style="color: #3CA272">{{ scope.row.statusLable }}</span>
          <span v-if="scope.row.statusLable == '待考核'|| scope.row.statusLable == '在建' || scope.row.statusLable == '待考评'"
                style="color: #FAC858">{{ scope.row.statusLable }}</span>
          <!-- <span v-else-if="scope.row.statusLable == '待考评'"
                style="color: #73C0DE">{{ scope.row.statusLable }}</span> -->
          <span v-else-if="scope.row.statusLable == '异常' || scope.row.statusLable == '禁用'"
                style="color: #EE6666">{{ scope.row.statusLable }}</span>
          <span v-else-if="scope.row.statusLable == '已完成' || scope.row.statusLable == '关闭'">{{ scope.row.statusLable }}</span>
        </template>
      </el-table-column>
      <!-- 表格操作项，使用scope.row拿到当前行的数据 -->
      <el-table-column v-if="action.length > 0"
                       label="操作"
                       prop="actions"
                       fixed="right"
                       width="230px"
                       align="left">
        <template slot-scope="scope">
          <div v-for="(it, index) in action"
               :key="index"
               :class="it.style"
               class="table-button-list">
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
            <span v-if="it.name === '审批' && scope.row.status === '1'"
                  @click.stop="approveRow(scope.row)">{{it.name}}</span>
            <span v-if="it.name === '维修' && scope.row.status === '2'"
                  @click.stop="maintainRow(scope.row)">{{it.name}}</span>
            <span v-if="it.name === '考评' && scope.row.status === '3'"
                  @click.stop="checkRow(scope.row)">{{it.name}}</span>
            <span v-if="it.name === '权限配置'"
                  @click.stop="setpower(scope.row)">{{it.name}}</span>

          </div>
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
      expands: [],
      predefineColors: [
        '#518EEA',
        '#EE6666',
        '#FC8452',
        '#FAC858',
        '#91CB74',
        '#3CA272',
        '#73C0DE',
        '#5470C6',
        '#9A60B4',
        '#F264DB',
        '#35E9FF',
      ]
    }
  },
  props: {
    // 展开行
    expand: {
      type: Boolean,
      default: false
    },
    // 是否在首页显示
    showIndex: {
      type: Boolean,
      default: false
    },
    // 是否可配置色值
    showColors: {
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
    rowData: {
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
    console.log('name', this.name)
  },
  methods: {
    ...mapActions(['saveDetailInfo', 'changeEditStatus']),
    //编辑
    editTable (row) {
      // let nameArr = [
      //   '行业管理',
      //   '设备系列',
      //   '角色管理',
      //   '项目分布',
      //   '故障类型管理'
      // ]
      // nameArr.forEach(item => {
      //   if (this.name === item) {
      //     this.$emit('changeProjectBox', true)
      //     this.$emit('getDetail', row)
      //   } else {
      //     this.changeEditStatus(true)
      //     this.handdle(row)
      //   }
      // })
      if (this.name === '行业管理' || this.name === '设备系列' || this.name === '角色管理' || this.name === '项目分布'
        || this.name == '故障类型管理') {
        console.log('this.name1', this.name)
        this.$emit('changeProjectBox', true)
        this.$emit('getDetail', row)
      } else {
        this.changeEditStatus(true)
        this.handdle(row)
      }
    },
    // 上报
    reportedClick (row) {
      this.$emit('getDetail', row)
      this.$emit('changeProjectBox', true)
    },
    //审批
    approveRow (row) {
      this.$emit('getDetail', row)
      this.$emit('changeProjectBox', true)
    },
    //维修
    maintainRow (row) {
      this.$emit('getDetail', row)
      this.$emit('maintainStatusBox', true)
    },
    //考评
    checkRow (row) {
      this.$emit('getDetail', row)
      this.$emit('checkStatusBox', true)
    },
    // 删除
    deleteRow (row) {
      console.log('this.name---deleteRow', this.name)
      console.log('row---deleteRow', row)
      this.$confirm('请确认是否删除？').then(item => {
        let id = ''
        if (this.name === '项目管理' && row.projectId) {
          id = row.projectId
        } else if (this.name === '客户管理' && row.companyId) {
          id = row.companyId
        } else if (this.name === '智能设备' && row.deviceId) {
          id = row.deviceId
        } else if (this.name === '智能系统' && row.systemTypeId) {
          id = row.systemTypeId
        } else if (this.name === '设备管理' && row.deviceTypeId) {
          id = row.deviceTypeId
        } else if (this.name === '行业管理' && row.industryId) {
          id = row.industryId
        } else {
          id = row.id
        }
        this.$emit('deletList', id)
        done();
      })
        .catch(_ => { });

    },
    //配置权限
    setpower (row) {
      this.$emit('changePowerMenuBox', true)
    },
    getRowKeys: function (row) {
      let id = ''
      if (this.name === '项目管理' && row.projectId) {
        id = row.projectId
      } else if (this.name === '客户管理' && row.companyId) {
        id = row.companyId
      } else if (this.name === '智能设备' && row.deviceTypeId) {
        id = row.deviceTypeId
      } else if (this.name === '智能系统' && row.systemTypeId) {
        id = row.systemTypeId
      } else if (this.name === '' && row.userId) {
        id = row.userId
      } else if (this.name === '设备管理' && row.deviceTypeId) {
        id = row.deviceTypeId
      } else if (this.name === '设备系列' && row.seriesId) {
        id = row.seriesId
      } else if (this.name === '行业管理' && row.industryId) {
        id = row.industryId
      } else {
        id = row.id
      }
      return id
    },
    changeModelBox (status) {
      this.$emit('changeModelBox', true)
    },
    clickRowHandle (row, index, e) {
      // console.log('index', index)
      // console.log('e', e)
      //调用,table的方法,展开/折叠 行
      this.$refs.refTable.setCurrentRow(row)

    },
    expandChange (row, expandedRows) {
      const that = this
      that.$emit('changeSeriesId', row.seriesId)
      that.$emit('getModelList', row.seriesId)
      if (expandedRows.length) {
        that.expands = []
        if (row) {
          let id = ''
          if (this.name === '项目管理' && row.projectId) {
            id = row.projectId
          } else if (this.name === '客户管理' && row.companyId) {
            id = row.companyId
          } else if (this.name === '智能设备' && row.deviceTypeId) {
            id = row.deviceTypeId
          } else if (this.name === '智能系统' && row.systemTypeId) {
            id = row.systemTypeId
          } else if (this.name === '' && row.userId) {
            id = row.userId
          } else if (this.name === '设备管理' && row.deviceTypeId) {
            id = row.deviceTypeId
          } else if (this.name === '设备系列' && row.seriesId) {
            id = row.seriesId
          } else if (this.name === '行业管理' && row.industryId) {
            id = row.industryId
          } else {
            id = row.id
          }
          that.expands.push(id)
        }
      } else {
        that.expands = []
      }
    },
    //显示
    selectChangeShow (row) {
      this.$emit('selectChangeShow', row)
    },
    // 修改色值
    changeColor (row) {
      this.$emit('changeColor', row)
    },
    viewScreen () {
      this.$router.push('/sceneIndex')
    },
    //详情的点击
    rowClick (row) {
      this.changeEditStatus(false)
      this.handdle(row)
    },
    disebleTable (row) {
      this.$emit('disebleTable', row)
    },
    //详情的判断
    handdle (row) {
      console.log('row', row)
      console.log('this.name', this.name)
      let http = ''
      let id = ''
      if (this.name === '项目管理' && row.projectId) {
        id = row.projectId
      } else if (this.name === '客户管理' && row.companyId) {
        id = row.companyId
      } else if (this.name === '智能设备' && row.deviceTypeId) {
        id = row.deviceTypeId
      } else if (this.name === '智能系统' && row.systemTypeId) {
        id = row.systemTypeId
      } else if (this.name === '' && row.userId) {
        id = row.userId
      } else if (this.name === '设备管理' && row.deviceType) {
        id = row.deviceType
      } else if (this.name === '行业管理' && row.industryId) {
        id = row.industryId
      } else {
        id = row.id
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
      } else {
        if (this.name === '满意度考评') {
          this.$emit('updateInfo', row)
        }
      }
    },
    toPath (data) {
      this.$router.push({ path: data.url, query: { id: data.id } });
    }
  }
}
</script>
<style lang="less" scoped>
.dz-table-module {
  height: 100%;
  /deep/ label {
    margin-bottom: 0;
  }
}
.row-main {
  min-height: 44px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  ul {
    width: 100%;
    margin: 10px 20px 5px 0;
    display: flex;
    li {
      display: flex;
      width: 15%;
      span {
        display: block;
        color: #333333;
      }
      span:nth-child(odd) {
        color: #999999;
      }
    }
  }
  .dz-system-device-add {
    color: #2761ff;
    cursor: pointer;
    text-align: left;
    height: 44px;
    line-height: 44px;
    font-size: 14px;
    font-weight: 500;
  }
}
.table-button-list {
  display: flex;
}
</style>