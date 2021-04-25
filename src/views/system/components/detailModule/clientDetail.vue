<template>
  <div class="detail-module">
    <el-page-header @back="goBack">
    </el-page-header>
    <div class="detail-module-row">
      <titleDiv2 title='基本信息'></titleDiv2>
      <div class="detail-form">
        <el-form ref="form"
                 :model="form"
                 label-width="68px">
          <el-form-item label="客户编号">
            <el-input v-model="form.companyNumber"
                      disabled></el-input>
          </el-form-item>
          <el-form-item label="客户名称">
            <el-input v-model="form.companyName"
                      :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="客户简称">
            <el-input v-model="form.companyAbbreviation"
                      :disabled="isDisabled"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="detail-module-row">
      <titleDiv2 title='项目信息'></titleDiv2>
      <!-- <div class="add-project-button"><span @click="changeProjectBox(true)">新增</span></div> -->
      <div class="detail-form history-table">
        <myTable :tableData="tableData"
                 :tableConfigArr='tableConfigArr'
                 :selection="false"
                 :action='actionList'
                 :height='heightTable'
                 name='项目管理'
                 @getList='getProgectList'
                 @disebleTable='disebleTable'
                 :index='true'></myTable>
      </div>
      <div class="button-list"
           v-if="editStatus">
        <el-button type="primary"
                   @click="updateDetail(true)">保 存</el-button>
        <el-button @click="updateDetail(false)">取 消</el-button>
      </div>
      <div class="button-list"
           v-else>
        <el-button @click="editDetail">编辑</el-button>
      </div>
      <addBox v-if="addProjectStatus"
              name='项目管理'
              @getList='getList'
              title='新增'>
        <slot slot='dialogMain'>
          <addProjectForm ref="addForm"
                          @changeProjectBox='changeProjectBox'></addProjectForm>
        </slot>
      </addBox>
    </div>
  </div>
</template>
<script>
import titleDiv2 from "@/components/titleModule/titleSystemDetail.vue";
import addBox from '../dialogModule/addDialogModule'
import { mapState, mapActions } from 'vuex'
import systemMirror from '@/resource/systemMirror'
import timeReg from '@/utils/timeReg'
import myTable from "@/components/Table";
import addProjectForm from '../../components/formModule/addProjectForm'

export default {
  components: { titleDiv2, addBox, myTable, addProjectForm },
  data () {
    return {
      form: {},
      tableConfigArr: [
        {
          fixed: false,
          prop: 'projectNumber',
          label: '项目编号',
          width: '100px',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'projectName',
          width: '200px',
          label: '项目名称',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'projectSite',
          width: '200px',
          label: '项目地址',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'companyName',
          label: '客户名称',
          tooltip: false,
        },
        {
          fixed: false,
          prop: 'projectTypeLable',
          label: '项目类型',
          tooltip: false,
        },
        {
          fixed: false,
          prop: 'projectLeader',
          label: '项目负责人',
          tooltip: false,
        },
        {
          fixed: false,
          prop: 'statesLable',
          label: '状态',
          tooltip: false,
        },
        {
          fixed: false,
          prop: 'createTime',
          label: '运行时间',
          tooltip: false,
        },
      ],
      isDisabled: true,
      tableData: [],
      heightTable: 'calc(100vh - 450px)',
      addProjectStatus: false,
      currentPage: 1,
      pageSize: 10000,
      actionList: [
        // {
        //   name: '详情',
        //   style: 'view-screen'
        // },
      ]
    }
  },
  watch: {
    editStatus (newVal, oldVal) {
      if (newVal) {
        this.isDisabled = false
      }
    }
  },
  computed: {
    ...mapState({
      detailInfo: state => state.system.detailInfo,
      projectType: state => state.common.projectType,
      projectStatus: state => state.common.projectStatus,
      editStatus: state => state.system.editStatus,
    })
  },
  created () {
    let id = this.$route.query.id
    this.getCompanyById(id)
    this.getProgectList()
  },
  mounted () {
    this.isDisabled = !this.editStatus
    this.form = this.detailInfo
    this.form.createTime = timeReg.getNowFormatDate(this.form.createTime)
  },
  methods: {
    ...mapActions(['saveDetailInfo', 'changeEditStatus']),
    editDetail () {
      this.changeEditStatus(true)
    },
    goBack () {
      this.$router.push('/clientManage')
    },
    getCompanyById (id) {
      systemMirror.getCompanyById(id).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.form = result
          this.saveDetailInfo(result)
          this.form.createTime = timeReg.getNowFormatDate(this.form.createTime)
        }
      })
    },
    updateDetail () {
      if (status) {
        let params = {
          ...this.form,
        }
        params.updateTime = ''
        params.createTime = ''
        systemMirror.updateCompany(params).then(res => {
          let { code, result, serviceMessage } = res.data
          if (code === 200) {
            this.$message.success(serviceMessage)
            this.changeEditStatus(false)
          }
        })
      } else {
        this.changeEditStatus(false)
        this.form = Object.assign({}, this.detailInfo)
      }
    },
    getProgectList () {
      let id = this.$route.query.id
      let params = {
        companyId: id,
        currentPage: '1',
        pageSize: '10000',
      }
      systemMirror.getListByCompanyId(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.tableData = result.content
          this.total = result.recordTotal
          const totalPage = Math.ceil((this.total - 1) / this.pageSize)
          this.currentPage = this.currentPage > totalPage ? totalPage : this.currentPage
          this.currentPage = this.currentPage < 1 ? 1 : this.currentPage
          this.tableData.forEach((item, index) => {
            item.createTime = timeReg.getNowFormatDate(item.createTime)
            this.projectType.forEach(it => {
              if (item.projectType && item.projectType === it.id) {
                item.projectTypeLable = it.name
              }
            })
            this.projectStatus.forEach(it => {
              if (item.status && item.status === it.id) {
                item.statesLable = it.name
              }
            })
            console.log('this.tableData', this.tableData)
          })
        }

      })
    },
    disebleTable (row) {
      let params = {
        ...row,
      }
      params.updateTime = ''
      if (params.status === '4') {
        params.status = '1'
      } else {
        params.status = '4'
      }
      systemMirror.updateProject(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.$message.success(serviceMessage)
          this.getProgectList()
        }
      })
    },
    changeProjectBox (status) {
      this.addProjectStatus = status
    },
  }
}
</script>
<style lang="less" scoped>
.detail-module {
  &-row {
    margin-top: 30px;
    position: relative;
  }
  .detail-form {
    margin-top: 30px;
    /deep/ .el-form {
      display: flex;
      flex-wrap: wrap;
      .el-form-item {
        width: 33%;
        margin-bottom: 10px;
      }
      .el-form-item__content {
        width: 60%;
      }
    }
  }
  .add-project-button {
    position: absolute;
    right: 0;
    top: 0;
    color: #2761ff;
    cursor: pointer;
  }
  .history-table {
    /deep/ .el-table__body-wrapper {
      height: 190px;
      overflow-y: scroll;
    }
  }
  .button-list {
    display: flex;
    justify-content: center;
    position: fixed;
    left: 50%;
    margin-left: -50px;
    bottom: 40px;
    /deep/ .el-button {
      margin-right: 10px;
    }
  }
}
</style>