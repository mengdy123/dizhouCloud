<template>
  <div class="detail-module">
    <el-page-header @back="goBack">
    </el-page-header>
    <div class="detail-module-row">
      <titleDiv2 title='基础信息'></titleDiv2>
      <div class="detail-form">
        <el-form ref="form"
                 :model="form"
                 label-width="100px">
          <el-form-item label="用户编号"
                        class='user-number'>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-select v-model="form.companyNumber"
                           placeholder="请选择客户编号"
                           @change="changeCompanyInfo"
                           :disabled="isDisabled">
                  <el-option v-for="item in companyList"
                             :label="item.companyNumber +'--'+ item.companyName"
                             :key="item.companyId"
                             :value="item.companyNumber"></el-option>
                </el-select>
              </el-col>
              <el-col :span="12">
                <el-input v-model="form.idNumber"
                          style="width: '100px"
                          placeholder="请输入"
                          disabled></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="账号">
            <el-input v-model="form.userName"
                      disabled></el-input>
          </el-form-item>
          <el-form-item label="真实姓名">
            <el-input v-model="form.name"
                      :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="组织架构">
            <el-select v-model="form.orgId"
                       placeholder="请选择组织架构"
                       @change="changeOrgId"
                       :disabled="isDisabled"
                       style="width: 314px">
              <el-option v-for="item in orgList"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门">
            <el-select v-model="form.departmentName"
                       placeholder="请选择部门"
                       @change="changeDeparmentId"
                       :disabled="isDisabled"
                       style="width: 314px">
              <el-option v-for="item in departmentArr"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职务">
            <el-select v-model="form.jobName"
                       placeholder="请选择职务"
                       :disabled="isDisabled"
                       style="width: 314px">
              <el-option v-for="item in jobArr"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户角色">
            <el-input v-model="form.roleName"
                      :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="form.phone"
                      :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="账号状态">
            <el-select v-model="form.status"
                       placeholder="请选择设备状态"
                       :disabled="isDisabled"
                       style="width: 314px">
              <el-option label="正常"
                         value="1"></el-option>
              <el-option label="异常"
                         value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="detail-module-row">
      <titleDiv2 title='相关项目'></titleDiv2>
      <div class="detail-form">
        <myTable :tableData="tableData"
                 :tableConfigArr='tableConfigArr'
                 :selection="false"
                 :height='"180"'
                 :index='true'></myTable>
      </div>
    </div>
    <div class="detail-module-row">
      <titleDiv2 title='历史记录'></titleDiv2>
      <div class="detail-form history-table">
        <myTable :tableData="tableData"
                 :tableConfigArr='tableConfigArr'
                 :selection="false"
                 :height='"180"'
                 :index='true'></myTable>

        </el-table>
      </div>
    </div>
    <div class="button-list"
         v-if="editStatus">
      <el-button type="primary"
                 @click="updateDetail">确 定</el-button>
      <el-button @click="resetUpdateDetail">取 消</el-button>
    </div>
    <div class="button-list"
         v-else>
      <el-button @click="editDetail">编辑</el-button>
    </div>
  </div>
</template>
<script>
import titleDiv2 from "@/components/titleModule/titleSystemDetail.vue";
import myTable from "@/components/Table";
import { mapState, mapActions } from 'vuex'
import systemManageMirror from '@/resource/systemManageMirror'
import timeReg from '@/utils/timeReg'
export default {
  components: { titleDiv2, myTable },
  data () {
    return {
      form: {},
      tableData: [
        {
          createTime: '2016-05-02',
          projectCode: '001',
          projectName: '松江新城可视化平台',
          projectAbbreviation: '松江新城',
          projectSite: '上海市松江区松江大学城',
          companyName: '李三',
          projectTypeLable: '交通',
          projectLeader: '张思',
          statesLable: '运行中',
        },
        {
          createTime: '2016-05-02',
          projectCode: '001',
          projectName: '松江新城可视化平台',
          projectAbbreviation: '松江新城',
          projectSite: '上海市松江区松江大学城',
          companyName: '李三',
          projectTypeLable: '交通',
          projectLeader: '张思',
          statesLable: '运行中',
        },
        {
          createTime: '2016-05-02',
          projectCode: '001',
          projectName: '松江新城可视化平台',
          projectAbbreviation: '松江新城',
          projectSite: '上海市松江区松江大学城',
          companyName: '李三',
          projectTypeLable: '交通',
          projectLeader: '张思',
          statesLable: '运行中',
        },
        {
          createTime: '2016-05-02',
          projectCode: '001',
          projectName: '松江新城可视化平台',
          projectAbbreviation: '松江新城',
          projectSite: '上海市松江区松江大学城',
          companyName: '李三',
          projectTypeLable: '交通',
          projectLeader: '张思',
          statesLable: '运行中',
        },
      ],
      tableConfigArr: [
        {
          fixed: false,
          prop: 'projectCode',
          label: '项目编号',
          width: '100px',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'projectName',
          label: '项目名称',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'projectAbbreviation',
          label: '项目简称',
          tooltip: false,
        },
        {
          fixed: false,
          prop: 'projectSite',
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
          label: '项目状态',
          tooltip: false,
        },
        {
          fixed: false,
          prop: 'createTime',
          label: '运行时间',
          tooltip: true,
        },
      ],
      isDisabled: true,
      companyInfo: {},
      orgList: [],
      departmentArr: [],
      jobArr: []
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
      editStatus: state => state.system.editStatus,
      companyList: state => state.system.companyList,
    })
  },
  created () {
    let id = this.$route.query.id
    this.getUserById(id)
  },
  mounted () {
    this.isDisabled = !this.editStatus
    this.form = this.detailInfo
    this.form.createTime = timeReg.getNowFormatDate(this.form.createTime)
    this.getDepartmentAll()
  },
  methods: {
    ...mapActions(['saveDetailInfo', 'changeEditStatus']),
    resetUpdateDetail () {
      this.changeEditStatus(false)
    },
    changeCompanyInfo (val) {
      console.log('companyInfo', val)
      this.companyInfo = val
    },
    editDetail () {
      this.changeEditStatus(true)
    },
    goBack () {
      this.$router.push('/userManage')
    },
    getUserById (id) {
      systemManageMirror.getUserById(id).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.form = result
          this.saveDetailInfo(result)
          this.form.createTime = timeReg.getNowFormatDate(this.form.createTime)
        }
      })
    },
    //组织架构树
    getDepartmentAll () {
      let params = {}
      systemManageMirror.getDepartmentAll(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.orgList = result
        }
      })
    },
    changeOrgId (val) {
      this.getDepartmentsByOrganizationId(val)
    },
    // 获取组织架构下的部门
    getDepartmentsByOrganizationId (id) {
      let parmas = {
        id: id
      }
      systemManageMirror.getDepartmentsByOrganizationId(parmas).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.departmentArr = result
        }
      })
    },
    changeDeparmentId (val) {
      this.getJobs(val)
    },
    // 获取部门的职务
    getJobs (id) {
      let parmas = {
        id: id
      }
      systemManageMirror.getJobs(parmas).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.jobArr = result
        }
      })
    },
    updateDetail () {
      let params = {
        ...this.form,
      }
      params.updateTime = ''
      params.createTime = ''
      systemManageMirror.update(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.$message.success(serviceMessage)
          this.changeEditStatus(false)
          this.$emit('getList')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.detail-module {
  overflow-y: scroll;
  &-row {
    margin-top: 30px;
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
.user-number {
  display: flex;
  /deep/ .el-form-item__content {
    margin-left: 0 !important;
  }
}
</style>