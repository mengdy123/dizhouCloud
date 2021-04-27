<template>
  <div class="dz-system">
    <div class="dz-system-title">角色管理</div>
    <div class="dz-system-table">
      <div class="dz-system-table-add"><span @click="addList('新增')">新增</span></div>
      <myTable ref="myTable"
               :tableData="tableData"
               :tableConfigArr='tableConfigArr'
               :selection="false"
               :action='actionList'
               :height='heightTable'
               :http='http'
               name='角色管理'
               @deletList='deletList'
               @getDetail='getDetail'
               @changeProjectBox='changeProjectBox'
               @getList='getList'
               @disebleTable='disebleTable'
               :index='true'></myTable>
    </div>
    <div class="dz-system-pagination">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page.sync="currentPage"
                     :page-size="pageSize"
                     layout="total, prev, pager, next"
                     :total="total">
      </el-pagination>
    </div>
    <addBox v-if="addProjectStatus"
            name='角色管理'
            @getList='getList'
            @changeProjectBox='changeProjectBox'
            title='新增'>
      <slot slot='dialogMain'>
        <addRoleForm ref="addForm"
                     @getList='getList'
                     @changeProjectBox='changeProjectBox'></addRoleForm>
      </slot>
    </addBox>
  </div>
</template>
<script>
import addBox from '../../components/dialogModule/addDialogModule'
import myTable from "@/components/Table";
import systemManageMirror from '@/resource/systemManageMirror'
import { mapState, mapActions } from 'vuex'
import timeReg from '@/utils/timeReg'
import addRoleForm from '../../components/formModule/addRoleForm'
export default {
  components: { addBox, myTable, addRoleForm },
  data () {
    return {
      ruleForm: {},
      tableData: [],
      tableConfigArr: [
        {
          fixed: false,
          prop: 'roleName',
          label: '角色名',
        },
        {
          fixed: false,
          prop: 'permissionName',
          label: '权限',
        }
      ],
      http: '',
      ruleFormHeight: {},
      currentPage: 1,
      pageSize: 10,
      total: 0,
      addProjectStatus: false,
      heightTable: 'calc(100vh - 402px)',
      heightStatus: false,
      actionList: [
        {
          name: '编辑',
          style: 'edit-button'
        },
        {
          name: '删除',
          style: 'disable-button'
        }
      ],
      dialogData: {}
    };
  },
  mounted () {
    this.getList()

  },
  methods: {
    ...mapActions(['saveDetailInfo']),
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getList()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getList () {
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      }
      systemManageMirror.getRolePermissionAll(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.total = result.recordTotal
          this.tableData = result.content
          if (this.total > 0 && this.tableData.length === 0 && this.currentPage > 1) {
            this.currentPage = this.currentPage - 1
            this.getList()
          }
        }
      })
    },
    addList (name) {
      this.saveDetailInfo({})
      this.changeProjectBox(true)
    },

    getDetail (data) {
      this.dialogData = Object.assign({}, data)
      this.saveDetailInfo(this.dialogData)
    },
    disebleTable (row) {

    },
    deletList (id) {
      let parmas = {
        id: id
      }
      systemManageMirror.deleteRoleById(parmas).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.getList()
        }
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.getList()
    },
    changeProjectBox (status) {
      this.addProjectStatus = status
    },
  },
}
</script>
<style lang="less" scoped>
.header-bg {
  background-color: red;
}
.item-content-div {
  height: 160px;
  display: flex;
  background: #f5f5f5;
  margin-bottom: 10px;
  padding: 30px;
  // justify-content: space-between;
  /deep/ .el-form {
    flex-wrap: wrap;
    justify-content: flex-start;
  }
}
.dz-system {
}
</style>