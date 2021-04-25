<template>
  <div class="dz-system">
    <div class="dz-system-title">设备管理</div>
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
          <el-form-item label="项目类型"
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
      <!-- <div class="dz-system-table-add"><span @click="changeProjectBox(true)">新增</span></div> -->
      <myTable :tableData="tableData"
               :tableConfigArr='tableConfigArr'
               :selection="false"
               :action='actionList'
               :height='heightTable'
               :http='http'
               name='设备管理'
               :detail='true'
               @getDetail='getDetail'
               @getList='getProgectList'
               @disebleTable='disebleTable'
               @changeProjectBox='upFailBox'
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
    <addBox v-if="addFailBoxStatus"
            name='上报'
            @getList='getProgectList'
            @changeProjectBox='upFailBox'
            title='上报'>
      <slot slot='dialogMain'>
        <addFailForm ref="addForm"
                     v-if="addFailBoxStatus"
                     @changeProjectBox='upFailBox'></addFailForm>
      </slot>
    </addBox>
  </div>
</template>
<script>
import addBox from '../../components/dialogModule/addDialogModule'
import systemMirror from '@/resource/systemMirror'
import { mapState, mapActions } from 'vuex'
import timeReg from '@/utils/timeReg'
import myTable from "@/components/Table";
import addFailForm from '../../components/formModule/addFailForm'
export default {
  components: { addBox, myTable, addFailForm },
  data () {
    return {
      ruleForm: {},
      ruleFormHeight: {},
      tableData: [],
      tableConfigArr: [
        {
          fixed: false,
          prop: 'deviceNumber',
          label: '设备编号',
          tooltip: false,
        },
        {
          fixed: false,
          prop: 'deviceTypeLabel',
          label: '设备类型',
          tooltip: false,
        },
        {
          fixed: false,
          prop: 'systemName',
          label: '系统名称',
          tooltip: false,
        },
        {
          fixed: false,
          prop: 'projectName',
          label: '项目名称',
          tooltip: false,
        },
        {
          fixed: false,
          prop: 'installationArea',
          label: '安装区域',
          tooltip: false,
        },
      ],
      currentPage: 1,
      pageSize: 10,
      total: 1000,
      addFailBoxStatus: false,
      heightStatus: false,
      heightTable: 'calc(100vh - 402px)',
      http: '/manage/device/getDeviceTypeById?deviceTypeId=',
      actionList: [
        {
          name: '详情',
          style: 'view-screen'
        },
        {
          name: '上报',
          style: 'view-screen'
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
      deviceType: state => state.common.deviceType,
      maintainPersonList: state => state.system.maintainPersonList,
      deviceStatus: state => state.common.deviceStatus,
    })
  },
  mounted () {
    console.log('deviceType', this.deviceType)
    this.getProgectList()
    this.getFailTypeList()
  },
  methods: {
    ...mapActions(['saveDetailInfo', 'saveMaintainPersonList', 'saveApprovePersonList', 'saveFailTypeList']),
    handleClick (row) {
      console.log(row);
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getProgectList()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    formatSetKey (arr, key) {
      let name
      if (arr.length) {
        arr.forEach(item => {
          if (item.id == key) {
            name = item.name
          }
        })
      }
      return name
    },
    formatKey (arr, key) {
      let name
      if (arr.length) {
        arr.forEach(item => {
          if (item.id == key) {
            name = item.name
          }
        })
      }
      return name
    },
    // 点击获取设备系列的详情
    getDetail (data) {
      this.dialogData = Object.assign({}, data)
      this.saveDetailInfo(this.dialogData)
      this.getMaintenance()
      this.getAuditor()
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    //获取故障类型
    getFailTypeList () {
      let params = {
        currentPage: 1,
        pageSize: 10000,
      }
      systemMirror.getFailTypeList(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          // setTimeout(() => {
          this.saveFailTypeList(result.content)
          // }, 500)

        }
      })
    },
    //获取维修工列表
    getMaintenance () {
      console.log('this.dialogData', this.dialogData)
      let id = this.dialogData.deviceId
      systemMirror.getMaintenance(id).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.saveMaintainPersonList(result)
        }
      })
    },
    //获取审核人列表
    getAuditor () {
      console.log('this.dialogData', this.dialogData)
      let id = this.dialogData.deviceId
      systemMirror.getAuditor(id).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.saveApprovePersonList(result)
        }
      })
    },
    getProgectList () {
      let startTime, endTime
      if (this.ruleFormHeight.time) {
        startTime = this.ruleFormHeight.time[0]
        endTime = this.ruleFormHeight.time[1]
      }
      let params = {
        seek: this.ruleForm.key,
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
      systemMirror.getListBySeek(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.tableData = result.content
          this.total = result.recordTotal
          const totalPage = Math.ceil((this.total - 1) / this.pageSize)
          this.currentPage = this.currentPage > totalPage ? totalPage : this.currentPage
          this.currentPage = this.currentPage < 1 ? 1 : this.currentPage
        }
        this.tableData.forEach((item, index) => {
          item.statusLable = this.formatKey(this.deviceStatus, item.status)
          item.deviceTypeLabel = this.formatSetKey(this.deviceType, item.deviceType)
        })
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
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.getProgectList()
    },
    upFailBox (status) {
      this.addFailBoxStatus = status
    },
    heightSearch () {
      if (!this.heightStatus) {
        this.heightTable = 'calc(100vh - 498px)'
      } else {
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
    justify-content: left;
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