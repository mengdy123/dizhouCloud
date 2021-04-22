<template>
  <div class="dz-system">
    <div class="dz-system-title">工单管理</div>
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
                      placeholder="请输入关键字"
                      clearable
                      @clear="submitForm('ruleForm')"
                      @keyup.enter.native="submitForm('ruleForm')"></el-input>
          </el-form-item>
        </el-form>
        <div class="button-list">
          <el-button @click="heightSearch">{{heightStatus ? '关闭高级' : '高级'}}搜索</el-button>
          <el-button type="primary"
                     @click="submitForm('ruleForm')">搜索</el-button>
        </div>
      </div>
      <div class="item-content-div"
           v-if="heightStatus">
        <el-form :model="ruleFormHeight"
                 ref="ruleFormHeight"
                 label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="设备编号"
                        prop="industry">
            <el-select v-model="ruleFormHeight.projectType"
                       placeholder="请选择项目类型"
                       style="width: 320px"
                       clearable>
              <el-option v-for="item in projectType"
                         :label="item.name"
                         :key="item.id"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目状态">
            <el-select v-model="ruleFormHeight.status"
                       clearable
                       placeholder="请选择项目状态"
                       style="width: 320px">
              <el-option v-for="item in projectStatus"
                         :label="item.name"
                         :key="item.id"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目运行时间">
            <el-date-picker v-model="ruleFormHeight.time"
                            clearable
                            type="datetimerange"
                            range-separator="至"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="dz-system-table">
      <myTable :tableData="tableDataNew"
               :tableConfigArr='tableConfigArr'
               :selection="false"
               :action='actionList'
               :height='heightTable'
               :http='http'
               name='工单管理'
               @getDetail='getDetail'
               @changeProjectBox='approveStatusBox'
               @maintainStatusBox='maintainStatusBox'
               @checkStatusBox='checkStatusBox'
               @getList='getApproveList'
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
    <addBox v-if="addApproveStatus"
            name='审批'
            @getList='getApproveList'
            @changeProjectBox='approveStatusBox'
            title='审批'>
      <slot slot='dialogMain'>
        <addApproveForm name='审批'
                        @changeProjectBox='approveStatusBox'></addApproveForm>
      </slot>
    </addBox>
    <addBox v-if="addMaintainStatus"
            name='维修'
            @getList='getApproveList'
            @changeProjectBox='maintainStatusBox'
            title='维修'>
      <slot slot='dialogMain'>
        <addApproveForm name='维修'
                        @changeProjectBox='maintainStatusBox'></addApproveForm>
      </slot>
    </addBox>
    <addBox v-if="addCheckStatus"
            name='考评'
            @getList='getApproveList'
            @changeProjectBox='checkStatusBox'
            title='考评'>
      <slot slot='dialogMain'>
        <addCheckForm name='考评'
                      @changeProjectBox='checkStatusBox'></addCheckForm>
      </slot>
    </addBox>
  </div>
</template>
<script>
import systemMirror from '@/resource/systemMirror'
import { mapState, mapActions } from 'vuex'
import timeReg from '@/utils/timeReg'
import myTable from "@/components/Table";
import addBreakdown from '../../components/formModule/addBreakdown'
import addBox from '../../components/dialogModule/addDialogModule'
import addApproveForm from '../../components/formModule/addApproveForm'
import addCheckForm from '../../components/formModule/addCheckForm'
export default {
  components: { myTable, addBreakdown, addBox, addApproveForm, addCheckForm },
  data () {
    return {
      ruleForm: {},
      ruleFormHeight: {},
      tableData: [],
      tableConfigArr: [
        {
          fixed: false,
          prop: 'orderNumber',
          label: '工单编号',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'faultType',
          label: '故障类型',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'deviceNumber',
          label: '设备编号',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'approvePerson',
          label: '审批人员',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'maintainPerson',
          label: '维修人员',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'faultTime',
          label: '故障时间',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'useTime',
          label: '预计用时',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'installationArea',
          label: '安装区域',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'status',
          label: '状态',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'remark',
          label: '备注',
          tooltip: true,
        },
      ],
      tableDataNew: [
        {
          orderNumber: '1001',
          faultType: '井盖',
          deviceNumber: '井盖10001',
          approvePerson: '张三',
          approvePhone: '15726999999',
          maintainPerson: '李四',
          maintainPhone: '15736999999',
          faultTime: '2021-04-16 12:36',
          useTime: '0.5',
          installationArea: '姚北路',
          status: '待审批',
          remark: '无'
        }
      ],
      currentPage: 1,
      pageSize: 10,
      total: 1000,
      addApproveStatus: false,
      heightStatus: false,
      heightTable: 'calc(100vh - 402px)',
      http: '/manage/project/getProjectById?projectId=',
      actionList: [
        {
          name: '审批',
          style: 'view-screen'
        },
        {
          name: '维修',
          style: 'view-screen'
        },
        {
          name: '考评',
          style: 'view-screen'
        },

      ],
      addMaintainStatus: false,
      addCheckStatus: false
    };
  },
  computed: {
    ...mapState({
      projectType: state => state.common.projectType,
      projectStatus: state => state.common.projectStatus,
    })
  },
  mounted () {
    // this.getApproveList()
  },
  methods: {
    ...mapActions(['saveDetailInfo']),
    handleClick (row) {
      console.log(row);
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getApproveList()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 点击获取设备系列的详情
    getDetail (data) {
      this.dialogData = Object.assign({}, data)
      this.saveDetailInfo(this.dialogData)
    },
    approveStatusBox (status) {
      this.addApproveStatus = status
    },
    maintainStatusBox (status) {
      this.addMaintainStatus = status
    },
    checkStatusBox (status) {
      this.addCheckStatus = status
    },
    getApproveList () {
      let startTime, endTime
      if (this.ruleFormHeight.time) {
        startTime = this.ruleFormHeight.time[0]
        endTime = this.ruleFormHeight.time[1]
      }
      let params = {
        projectName: this.ruleForm.key,
        projectLeader: this.ruleFormHeight.leader,
        projectType: this.ruleFormHeight.projectType,
        projectSite: this.ruleFormHeight.address,
        status: this.ruleFormHeight.status,
        startTime: startTime,
        endTime: endTime,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      }
      systemMirror.getProjectList(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          // this.tableData = result.content
          this.total = result.recordTotal
        }
        this.tableData.forEach((item, index) => {
          item.createTime = timeReg.getNowFormatDate(item.createTime)
          this.projectType.forEach(it => {
            if (item.projectType && item.projectType === it.id) {
              item.projectTypeLable = it.name
            }
          })
          this.projectStatus.forEach(it => {
            if (item.status && item.status === it.id) {
              item.statusLable = it.name
            }
          })
        })
        this.tableDataNew = this.tableData
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.getApproveList()
    },
    heightSearch () {
      if (!this.heightStatus) {
        this.pageSize = 8
        this.getApproveList()
        this.heightTable = 'calc(100vh - 498px)'
      } else {
        this.tableDataNew = this.tableData
        this.ruleFormHeight = {}
        this.currentPage = 1
        this.pageSize = 10
        this.getApproveList()
        this.heightTable = 'calc(100vh - 402px)'
      }
      this.heightStatus = !this.heightStatus
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
</style>
