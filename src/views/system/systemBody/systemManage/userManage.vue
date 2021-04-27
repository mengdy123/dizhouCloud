<template>
  <div class="dz-system">
    <div class="dz-system-title">用户管理</div>
    <div class="dz-system-search">
      <div class="dz-system-search-ruleForm">
        <el-form :model="ruleForm"
                 ref="ruleForm"
                 label-width="100px"
                 class="demo-ruleForm">
          <el-form-item>
            <span class="label-key">关键字</span>
            <el-input v-model="ruleForm.key"
                      style="width: 320px"
                      clearable
                      @clear="submitForm('ruleForm')"
                      placeholder="请输入请输入角色名称"></el-input>
          </el-form-item>
        </el-form>
        <div class="button-list">
          <el-button type="primary"
                     @click="submitForm('ruleForm')">搜索</el-button>
        </div>
      </div>
    </div>
    <div class="dz-system-table">
      <div class="dz-system-table-add"><span @click="showBox">新增</span></div>
      <myTable ref="myTable"
               :tableData="tableDataNew"
               :tableConfigArr='tableConfigArr'
               :selection="false"
               :action='actionList'
               :height='heightTable'
               :http='http'
               name='用户管理'
               @getList='getList'
               @deletList='deletList'
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
            name='用户管理'
            @getList='getList'
            @changeProjectBox='changeProjectBox'
            title='新增'>
      <slot slot='dialogMain'>
        <addUserForm ref="addForm"
                     @getList='getList'
                     @changeProjectBox='changeProjectBox'></addUserForm>
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
import addUserForm from '../../components/formModule/addUserForm'
export default {
  components: { addBox, myTable, addUserForm },
  data () {
    return {
      ruleForm: {},
      tableData: [],
      tableConfigArr: [
        {
          fixed: false,
          prop: 'userNumber',
          label: 'ID号',
        },
        {
          fixed: false,
          prop: 'userName',
          label: '账号',
        },
        {
          fixed: false,
          prop: 'name',
          label: '真实姓名',
        },
        {
          fixed: false,
          prop: 'phone',
          label: '联系方式',
        },
        {
          fixed: false,
          prop: 'departmentName',
          label: '部门',
        },
        {
          fixed: false,
          prop: 'jobName',
          label: '职务',
        },
        {
          fixed: false,
          prop: 'roleName',
          label: '角色',
        },
        // {
        //   fixed: false,
        //   prop: 'power',
        //   label: '权限',
        // },
      ],
      tableDataNew: [],
      http: '/manage/user/getUserById?userId=',
      ruleFormHeight: {},
      currentPage: 1,
      pageSize: 10,
      total: 0,
      addProjectStatus: false,
      heightTable: 'calc(100vh - 402px)',
      heightStatus: false,
      actionList: [
        {
          name: '详情',
          style: 'edit-button'
        },
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
    ...mapActions(['saveDetailInfo', 'changeEditStatus']),
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
      systemManageMirror.getListBySeek(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.tableDataNew = result.content
          this.total = result.recordTotal
          if (this.total > 0 && this.tableData.length === 0 && this.currentPage > 1) {
            this.currentPage = this.currentPage - 1
            this.getList()
          }
        }
        this.tableDataNew.forEach((item, index) => {
          item.createTime = timeReg.getNowFormatDate(item.createTime)
          if (item.status === '1') {
            item.statusLable = '正常'
          } else {
            item.statusLable = '已禁用'
          }
        })
      })
    },
    deletList (id) {
      let parmas = {
        id: id
      }
      systemManageMirror.deleteUser(parmas).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.getList()
        }
      })
    },
    showBox () {
      this.saveDetailInfo({})
      this.changeProjectBox(true)
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