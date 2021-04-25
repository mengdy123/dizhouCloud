<template>
  <div class="detail-module">
    <el-page-header @back="goBack">
    </el-page-header>
    <div class="detail-module-row">
      <titleDiv2 title='基本信息'></titleDiv2>
      <div class="detail-form">
        <el-form ref="form"
                 v-model="form"
                 label-width="68px">
          <el-form-item label="权限等级">
            <el-input v-model="form.level"
                      disabled></el-input>
          </el-form-item>
          <el-form-item label="权限名称">
            <el-input v-model="form.permissionName"
                      :disabled="isDisabled"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="detail-module-row">
      <titleDiv2 title='菜单信息'></titleDiv2>
      <div class="detail-form history-table">
        <myTable :tableData="tableData"
                 :tableConfigArr='tableConfigArr'
                 :selection="false"
                 :action='actionList'
                 :height='heightTable'
                 name='菜单信息'
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
import systemManageMirror from '@/resource/systemManageMirror'
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
      actionList: []
    }
  },
  watch: {
    editStatus (newVal, oldVal) {
      if (newVal) {
        this.isDisabled = false
      } else {
        this.isDisabled = true
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

  },
  mounted () {
    this.isDisabled = !this.editStatus
    let id = this.$route.query.id
    this.getCompanyById(id)
    this.form = this.detailInfo
    this.form.createTime = timeReg.getNowFormatDate(this.form.createTime)
  },
  methods: {
    ...mapActions(['saveDetailInfo', 'changeEditStatus']),
    goBack () {
      this.$router.push('/powerManage')
    },
    editDetail () {
      this.changeEditStatus(true)
    },
    getCompanyById (id) {
      systemManageMirror.selectPermission(id).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          console.log('result', result)
          this.form = result
          this.saveDetailInfo(result)
          this.form.createTime = timeReg.getNowFormatDate(this.form.createTime)
        }
      })
    },
    updateDetail (status) {
      if (status) {
        let id = this.$route.query.id
        let params = {
          id: id,
          permissionName: this.ruleForm.permissionName
        }
        console.log('params', params)
        systemManageMirror.updatePermissionById(params).then(res => {
          let { code, result, serviceMessage } = res.data
          if (code === 200) {
            this.$message.success(serviceMessage)
            this.changeEditStatus(false)
          }
        })
      } else {
        this.changeEditStatus(false)
        this.form = Object.assign({}, this.detailInfo)
        this.form.createTime = timeReg.getNowFormatDate(this.form.createTime)
        this.form.projectLonlat = this.form.longitude + ',' + this.form.latitude
      }

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