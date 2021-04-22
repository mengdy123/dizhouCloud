<template>
  <div class="detail-module">
    <el-page-header @back="goBack">
    </el-page-header>
    <div class="detail-module-row">
      <titleDiv2 title='项目信息'></titleDiv2>
      <div class="detail-form">
        <el-form ref="form"
                 :model="form"
                 label-width="100px">
          <el-form-item label="项目编号">
            <el-input v-model="form.projectNumber"
                      disabled></el-input>
          </el-form-item>
          <el-form-item label="项目名称">
            <el-input v-model="form.projectName"
                      :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="项目简称">
            <el-input v-model="form.projectAbbreviation"
                      :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="所属区域">
            <el-input v-model="form.projectArea"
                      :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="项目地址">
            <el-input v-model="form.projectSite"
                      :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="项目经纬度">
            <el-input v-model="form.projectLonlat"
                      :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="项目类型">
            <el-select v-model="form.projectType"
                       placeholder="请选择项目类型"
                       :disabled="isDisabled">
              <el-option v-for="item in projectType"
                         :label="item.name"
                         :key="item.id"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目负责人">
            <el-input v-model="form.projectLeader"
                      :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="form.phone"
                      :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="客户名称">
            <el-input v-model="form.companyName"
                      :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="运行时间">
            <el-input v-model="form.createTime"
                      :disabled="isDisabled"> </el-input>
          </el-form-item>
          <el-form-item label="系统数量">
            <el-input v-model="form.systemNumber"
                      disabled></el-input>
          </el-form-item>
          <el-form-item label="设备数量">
            <el-input v-model="form.deviceNumber"
                      disabled></el-input>
          </el-form-item>
          <el-form-item label="项目状态">
            <el-select v-model="form.status"
                       placeholder="请选择项目状态"
                       :disabled="isDisabled">
              <el-option v-for="item in projectStatus"
                         :label="item.name"
                         :key="item.id"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="故障信息数量">
            <el-input v-model="form.warningNumber"
                      disabled> </el-input>
          </el-form-item>
          <!-- <el-form-item label="项目数量">
            <el-input v-model="form.projectTotal"
                      disabled> </el-input>
          </el-form-item> -->
        </el-form>
      </div>
    </div>
    <!-- <div class="detail-module-row">
      <titleDiv2 title='历史记录'></titleDiv2>
      <div class="detail-form history-table">
        <myTable :tableData="tableDataHis"
                 :tableConfigArr='tableConfigArrHis'
                 :selection="false"
                 :action='actionList'
                 height='298px'
                 name='项目管理'
                 @getList='getHistoryList'
                 @disebleTable='disebleTable'
                 :index='true'></myTable>
      </div>
    </div> -->
    <div class="detail-module-row">
      <titleDiv2 title='设备列表'></titleDiv2>
      <div class="detail-form history-table">
        <myTable :tableData="tableDataHis"
                 :tableConfigArr='tableConfigArrHis'
                 :selection="false"
                 :action='actionList'
                 height='298px'
                 name='设备列表'
                 @getList='getSetList'
                 @disebleTable='disebleTable'
                 :index='true'></myTable>
      </div>
    </div>
    <div class="button-list"
         v-if="editStatus">
      <el-button type="primary"
                 @click="updateDetail(true)">确 定</el-button>
      <el-button @click="updateDetail(false)">取 消</el-button>
    </div>
    <div class="button-list"
         v-else>
      <el-button type="primary"
                 @click="changeOnlySetBox(true)">单条导入</el-button>
      <el-button type="primary"
                 @click="changeBatchSetBox(true)">批量导入</el-button>
      <el-button @click="updateDetail(false)">下载导入模板</el-button>
      <el-button @click="editDetail">编辑</el-button>
    </div>
    <addBox v-if="onlyUploadStatus"
            name='单条导入'
            @getList='getSetList'
            @changeProjectBox='changeOnlySetBox'
            title='单条导入'>
      <slot slot='dialogMain'>
        <addOnlySetForm ref="addForm"
                        @changeProjectBox='changeOnlySetBox'></addOnlySetForm>
      </slot>
    </addBox>
    <addBox v-if="batchUploadStatus"
            name='批量导入'
            @getList='getSetList'
            @changeProjectBox='changeBatchSetBox'
            title='批量导入'>
      <slot slot='dialogMain'>
        <addBatchSetForm ref="addForm"
                         @changeProjectBox='changeBatchSetBox'></addBatchSetForm>
      </slot>
    </addBox>
  </div>
</template>
<script>
import titleDiv2 from "@/components/titleModule/titleSystemDetail.vue";
import addBox from '../../components/dialogModule/addDialogModule'
import { mapState, mapActions } from 'vuex'
import systemMirror from '@/resource/systemMirror'
import timeReg from '@/utils/timeReg'
import myTable from "@/components/Table";
import addOnlySetForm from '../../components/formModule/addOnlySetForm'
import addBatchSetForm from '../../components/formModule/addBatchSetForm'
export default {
  components: { titleDiv2, myTable, addBox, addOnlySetForm, addBatchSetForm },
  data () {
    return {
      form: {},
      tableData: [
        {
          date: '2016-05-02',
          number: '001',
          name: '松江新城可视化平台',
          shortName: '松江新城',
          address: '上海市松江区松江大学城',
          clientName: '李三',
          industry: '交通',
          responsible: '张思',
          status: '运行中',
          runTime: '2021-01-03'
        },
        {
          date: '2016-05-02',
          number: '001',
          name: '松江新城可视化平台',
          shortName: '松江新城',
          address: '上海市松江区松江大学城',
          clientName: '李三',
          industry: '交通',
          responsible: '张思',
          status: '运行中',
          runTime: '2021-01-03'
        },
        {
          date: '2016-05-02',
          number: '001',
          name: '松江新城可视化平台',
          shortName: '松江新城',
          address: '上海市松江区松江大学城',
          clientName: '李三',
          industry: '交通',
          responsible: '张思',
          status: '运行中',
          runTime: '2021-01-03'
        },
        {
          date: '2016-05-02',
          number: '001',
          name: '松江新城可视化平台',
          shortName: '松江新城',
          address: '上海市松江区松江大学城',
          clientName: '李三',
          industry: '交通',
          responsible: '张思',
          status: '运行中',
          runTime: '2021-01-03'
        },
        {
          date: '2016-05-02',
          number: '001',
          name: '松江新城可视化平台',
          shortName: '松江新城',
          address: '上海市松江区松江大学城',
          clientName: '李三',
          industry: '交通',
          responsible: '张思',
          status: '运行中',
          runTime: '2021-01-03'
        }
      ],
      isDisabled: true,
      tableDataHis: [],
      tableConfigArrHis: [
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
          prop: 'statusLable',
          label: '状态',
          width: '80px',
          tooltip: false,
        },
        {
          fixed: false,
          prop: 'createTime',
          label: '运行时间',
          tooltip: false,
        },
      ],
      actionList: [],
      onlyUploadStatus: false,
      batchUploadStatus: false
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
  watch: {
    editStatus (newVal, oldVal) {
      if (newVal) {
        this.isDisabled = false
      }
    }
  },
  created () {
    let id = this.$route.query.id
    this.getProjectById(id)
  },
  mounted () {
    this.isDisabled = !this.editStatus
    this.form = this.detailInfo
    this.form.createTime = timeReg.getNowFormatDate(this.form.createTime)
    this.form.projectLonlat = this.form.longitude + ',' + this.form.latitude
  },
  methods: {
    ...mapActions(['saveDetailInfo', 'changeEditStatus']),
    goBack () {
      this.$router.push('/project')
    },
    changeOnlySetBox (status) {
      this.onlyUploadStatus = status
    },
    changeBatchSetBox (status) {
      this.batchUploadStatus = status
    },
    //设备列表
    getSetList () { },
    // 历史记录
    getHistoryList () { },
    disebleTable () { },
    editDetail () {
      this.changeEditStatus(true)
    },
    getProjectById (id) {
      systemMirror.getProjectById(id).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.form = result
          this.saveDetailInfo(result)
          this.form.createTime = timeReg.getNowFormatDate(this.form.createTime)
          this.form.projectLonlat = this.form.longitude + ',' + this.form.latitude
        }
      })
    },
    updateDetail (status) {
      if (status) {
        let params = {
          ...this.form,
        }
        params.updateTime = ''
        console.log('ruleForm', params)
        systemMirror.updateProject(params).then(res => {
          console.log('updateDetail', res.data)
          let { code, result, serviceMessage } = res.data
          if (code === 200) {
            this.$message.success(serviceMessage)
            // this.goBack()
          }
        })
      } else {
        this.changeEditStatus(false)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.detail-module {
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
</style>