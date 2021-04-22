<template>
  <div class="dz-system">
    <div class="dz-system-title">角色管理</div>
    <div class="dz-system-table">
      <div class="dz-system-table-add"><span @click="changeProjectBox(true)">新增</span></div>
      <myTable ref="myTable"
               :tableData="tableDataNew"
               :tableConfigArr='tableConfigArr'
               :selection="false"
               :action='actionList'
               :height='heightTable'
               :http='http'
               name='角色管理'
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
                     @changeProjectBox='changeProjectBox'></addRoleForm>
      </slot>
    </addBox>
  </div>
</template>
<script>
import addBox from '../../components/dialogModule/addDialogModule'
import myTable from "@/components/Table";
import systemMirror from '@/resource/systemMirror'
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
          prop: 'name',
          label: '角色名',
        },
        {
          fixed: false,
          prop: 'power',
          label: '权限',
        },

      ],
      tableDataNew: [],
      http: '/manage/user/getUserById?userId=',
      ruleFormHeight: {},
      currentPage: 1,
      pageSize: 10,
      total: 1000,
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
      ]
    };
  },
  mounted () {
    this.getList()
  },
  methods: {
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
        seek: this.ruleForm.key,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      }
      systemMirror.getUserList(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.tableDataNew = result.content
          this.total = result.recordTotal
        }
        this.tableDataNew.forEach((item, index) => {
          item.createTime = timeReg.getNowFormatDate(item.createTime)
          if (item.status === '1') {
            item.statusName = '正常'
          } else {
            item.statusName = '已禁用'
          }
        })
      })
    },
    disebleTable (row) {
      let params = {
        ...row,
      }
      params.updateTime = ''
      params.createTime = ''
      if (params.status === '1') {
        params.status = '2'
      } else {
        params.status = '1'
      }
      systemMirror.updateUser(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.$message.success(serviceMessage)
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