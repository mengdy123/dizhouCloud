<template>
  <div class="dz-system">
    <div class="dz-system-title">行业列表</div>
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
                      placeholder="请输入关键字进行搜索"></el-input>
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
               :detail='false'
               indexAlign='left'
               :indexWidth='"300%"'
               name='行业管理'
               :http='http'
               @getList='getList'
               @disebleTable='disebleTable'
               @changeProjectBox='changeProjectBox'
               @getDetail='getDetail'
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
            name='行业管理'
            @getList='getList'
            @changeProjectBox='changeProjectBox'
            title='新增'>
      <slot slot='dialogMain'>
        <addIndustryForm ref="addForm"
                         @changeProjectBox='changeProjectBox'></addIndustryForm>
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
import addIndustryForm from '../../components/formModule/addIndustryForm'
export default {
  components: { addBox, myTable, addIndustryForm },
  data () {
    return {
      ruleForm: {},
      rules: {},
      tableData: [],
      tableDataNew: [],
      tableConfigArr: [
        {
          fixed: false,
          prop: 'industryNumber',
          label: '行业编号',
          width: '500%',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'industryName',
          label: '行业类型',
          tooltip: true,
        }
      ],
      http: '/manage/indutry/getIndustryById?industryId=',
      dialogData: {},
      addProjectStatus: false,
      heightTable: 'calc(100vh - 402px)',
      currentPage: 1,
      pageSize: 10,
      total: 1000,
      actionList: [
        {
          name: '编辑',
          style: 'edit-button'
        },
        {
          name: '禁用',
          style: 'disable-button'
        },
        {
          name: '启用',
          style: 'edit-button'
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
        industryName: this.ruleForm.key,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      }
      systemMirror.getIndustryList(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.tableData = result.content
          this.total = result.recordTotal
        }
        this.tableData.forEach((item, index) => {
          item.createTime = timeReg.getNowFormatDate(item.createTime)
        })
        this.tableDataNew = this.tableData
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
      systemMirror.updateCompany(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.$message.success(serviceMessage)
          this.getList()
        }
      })
    },
    getDetail (data) {
      // console.log('获取行业详情data', data)
      this.dialogData = Object.assign({}, data)
      this.saveDetailInfo(this.dialogData)
      // systemMirror.getIndustryById().then(res => {

      // })
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
.item-content-div {
  height: 160px;
  display: flex;
  background: #f5f5f5;
  margin-bottom: 10px;
  padding: 30px;
  /deep/ .el-form {
    flex-wrap: wrap;
    justify-content: flex-start;
  }
}
/deep/ .el-table td,
/deep/ .el-table th {
  padding-left: 10px;
}
</style>