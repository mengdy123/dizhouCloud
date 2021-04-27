<template>
  <div class="dz-system">
    <div class="dz-system-title">行业列表</div>
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
      <div class="dz-system-table-add"><span @click="showBox">新增</span></div>
      <myTable :tableData="tableData"
               :tableConfigArr='tableConfigArr'
               :selection="false"
               :action='actionList'
               :height='heightTable'
               :detail='false'
               indexAlign='left'
               :indexWidth='"60px"'
               name='行业管理'
               :http='http'
               :showIndex='true'
               :showColors='true'
               @getList='getList'
               @disebleTable='disebleTable'
               @changeProjectBox='changeProjectBox'
               @getDetail='getDetail'
               @changeColor='changeColor'
               @selectChangeShow='selectChangeShow'
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
            name='行业管理'
            @getList='getList'
            @changeProjectBox='changeProjectBox'
            title='新增'>
      <slot slot='dialogMain'>
        <addIndustryForm ref="addForm"
                         @getList='getList'
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
      tableData: [
        {
          show: true,
          color: 'rgba(255, 69, 0, 0.68)',
        }
      ],
      tableConfigArr: [
        {
          fixed: false,
          prop: 'industryNumber',
          label: '行业编号',
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
          name: '删除',
          style: 'disable-button'
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
          if (this.total > 0 && this.tableData.length === 0 && this.currentPage > 1) {
            this.currentPage = this.currentPage - 1
            this.getList()
          }
          this.tableData.forEach((item, index) => {
            item.createTime = timeReg.getNowFormatDate(item.createTime)
            if (item.show === '1') {
              item.show = true
            } else {
              item.show = false
            }
          })
        } else {
          this.tableData = []
        }

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
    // 是否显示
    selectChangeShow (row) {
      if (!row.color) {
        this.$message.error('请先设置显示的色值')
        row.show = '0'
        return false
      }
      this.editDetail(row)
    },
    //修改色值
    changeColor (row) {
      this.editDetail(row)
    },
    // 修改详情
    editDetail (row) {
      let show
      if (row.show) {
        show = '1'
      } else {
        show = '0'
      }
      let params = {
        ...row,
        show: show
      }
      params.createTime = ''
      params.updateTime = ''
      systemMirror.updateIndutry(params).then(res => {
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
    deletList (id) {
      systemMirror.deleteIndustryById(id).then(res => {
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