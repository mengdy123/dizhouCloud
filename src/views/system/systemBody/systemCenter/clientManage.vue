<template>
  <div class="dz-system">
    <div class="dz-system-title">客户列表</div>
    <div class="dz-system-search">
      <div class="dz-system-search-ruleForm">
        <el-form :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="100px"
                 class="demo-ruleForm">
          <el-form-item>
            <span class="label-key">关键字</span>
            <el-input v-model="ruleForm.key"
                      style="width: 320px"
                      clearable
                      placeholder="请输入关键字进行搜索 "></el-input>
          </el-form-item>
        </el-form>
        <div class="button-list">
          <el-button type="primary"
                     @click="submitForm('ruleForm')">搜索</el-button>
        </div>
      </div>
    </div>

    <div class="dz-system-table">
      <div class="dz-system-table-add"><span @click="changeProjectBox(true)">新增</span></div>
      <myTable :tableData="tableDataNew"
               :tableConfigArr='tableConfigArr'
               :selection="false"
               :action='actionList'
               :height='heightTable'
               :http='http'
               name='客户管理'
               indexAlign='left'
               :indexWidth='"100%"'
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
            name='客户管理'
            @getList='getList'
            @changeProjectBox='changeProjectBox'
            title='新增'>
      <slot slot='dialogMain'>
        <addClientForm ref="addForm"
                       @changeProjectBox='changeProjectBox'></addClientForm>
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
import addClientForm from '../../components/formModule/addClientForm'
export default {
  components: { addBox, myTable, addClientForm },
  data () {
    return {
      ruleForm: {},
      rules: {},
      tableData: [],
      tableDataNew: [],
      tableConfigArr: [
        {
          fixed: false,
          prop: 'companyNumber',
          label: '客户编号',
          width: '300px',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'companyName',
          label: '客户名称',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'statusName',
          label: '状态',
          tooltip: true,
        },
      ],
      addProjectStatus: false,
      heightTable: 'calc(100vh - 402px)',
      http: '/manage/company/getCompanyById?companyId=',
      currentPage: 1,
      pageSize: 10,
      total: 1000,
      actionList: [
        {
          name: '详情',
          style: 'view-screen'
        },
        {
          name: '编辑',
          style: 'view-screen'
        },
        {
          name: '禁用',
          style: 'disable-button'
        },
        {
          name: '启用',
          style: 'view-screen'
        }
      ]
    };
  },
  computed: {
    ...mapState({
      projectType: state => state.common.projectType,
      projectStatus: state => state.common.projectStatus,
    })
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
        companyName: this.ruleForm.key,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      }
      systemMirror.getCompanyList(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.tableData = result.content
          this.total = result.recordTotal
        }
        this.tableData.forEach((item, index) => {
          item.createTime = timeReg.getNowFormatDate(item.createTime)
          if (item.status === '1') {
            item.statusName = '正常'
          } else {
            item.statusName = '已禁用'
          }
        })
        this.tableDataNew = this.tableData
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
      systemMirror.updateCompany(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.$message.success(serviceMessage)
          this.getList()
        }
      })
    },
  },
}
</script>
<style lang="less" scoped>
.item-content-div {
  display: flex;
  background: #f5f5f5;
  margin-bottom: 10px;
  /* padding: 30px; */
  padding-top: 30px;
  position: relative;

  // justify-content: space-between;
  /deep/ .el-form {
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}
.item-content-div:before {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #f5f5f5;
  display: block;
  content: "";
  position: absolute;
  right: 160px;
  top: -10px;
}
/deep/ .el-table td,
/deep/ .el-table th {
  padding-left: 10px;
}
</style>