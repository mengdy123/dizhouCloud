<template>
  <div class="dz-system">
    <div class="dz-system-title">项目分布</div>
    <div class="dz-system-table">
      <div class="dz-system-table-add"><span @click="showBox">新增</span></div>
      <myTable :tableData="tableDataNew"
               :tableConfigArr='tableConfigArr'
               :selection="false"
               :action='actionList'
               :height='heightTable'
               :detail='false'
               indexAlign='left'
               :indexWidth='"60px"'
               name='项目分布'
               :http='http'
               :showIndex='true'
               :showColors='true'
               @getList='getList'
               @changeColor='changeColor'
               @selectChangeShow='selectChangeShow'
               @disebleTable='disebleTable'
               @deletList='deletList'
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
            name='项目分布'
            @getList='getList'
            @changeProjectBox='changeProjectBox'
            title='新增'>
      <slot slot='dialogMain'>
        <addAreaForm ref="addForm"
                     @getList='getList'
                     @changeProjectBox='changeProjectBox'></addAreaForm>
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
import addAreaForm from '../../components/formModule/addAreaForm'
export default {
  components: { addBox, myTable, addAreaForm },
  data () {
    return {
      ruleForm: {},
      rules: {},
      tableData: [],
      tableDataNew: [
        {
          show: true,
          color: 'rgba(255, 69, 0, 0.68)',
        }
      ],
      tableConfigArr: [
        {
          fixed: false,
          prop: 'areaName',
          label: '地域名称',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'projectNumber',
          label: '项目数量',
          tooltip: true,
        },
        // {
        //   fixed: false,
        //   prop: 'projectNumber',
        //   label: '项目总数',
        //   tooltip: false,
        // }
      ],
      http: '/manage/indutry/getIndustryById?industryId=',
      dialogData: {},
      addProjectStatus: false,
      heightTable: 'calc(100vh - 290px)',
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
        },
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
        areaName: '',
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      }
      systemMirror.getAreaList(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.tableData = result.content
          this.total = result.recordTotal
          const totalPage = Math.ceil((this.total - 1) / this.pageSize)
          this.currentPage = this.currentPage > totalPage ? totalPage : this.currentPage
          this.currentPage = this.currentPage < 1 ? 1 : this.currentPage
        }
        this.tableData.forEach((item, index) => {
          item.createTime = timeReg.getNowFormatDate(item.createTime)
          if (item.show === '1') {
            item.show = true
          } else {
            item.show = false
          }
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
      // console.log('获取详情data', data)
      this.dialogData = Object.assign({}, data)
      this.saveDetailInfo(this.dialogData)
      // systemMirror.getIndustryById().then(res => {

      // })
    },
    deletList (id) {
      systemMirror.deleteArea(id).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.getList()
        }
      })
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
        areaName: row.areaName,
        color: row.color,
        show: show,
        id: row.id
      }
      systemMirror.updateArea(params).then(res => {
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
      console.log('修改色值', row)
      this.editDetail(row)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.getList()
    },
    showBox () {
      this.saveDetailInfo({})
      this.changeProjectBox(true)
    },
    changeProjectBox (status) {
      this.saveDetailInfo({})
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