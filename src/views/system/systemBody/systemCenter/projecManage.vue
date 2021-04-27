<template>
  <div class="dz-system">
    <div class="dz-system-title">项目列表</div>
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
          <el-button @click="resetList">重置</el-button>
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
                       style="width: 260px"
                       clearable>
              <el-option v-for="item in projectType"
                         :label="item.name"
                         :key="item.id"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户名称">
            <el-select v-model="ruleFormHeight.companyId"
                       clearable
                       placeholder="请选择客户名称"
                       style="width: 260px">
              <el-option v-for="item in companyList"
                         :label="item.companyName"
                         :key="item.companyId"
                         :value="item.companyId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属区域">
            <cascaderAreaItem v-model="ruleFormHeight.projectSite"
                              @getAddress='getAddress'></cascaderAreaItem>
          </el-form-item>
          <el-form-item label="运行时间">
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
      <div class="dz-system-table-add"><span @click="showBox">新增</span></div>
      <myTable :tableData="tableData"
               :tableConfigArr='tableConfigArr'
               :selection="false"
               :action='actionList'
               :height='heightTable'
               :http='http'
               name='项目管理'
               @deletList='deletList'
               @getList='getProgectList'
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
    <addBox v-if="addMapStatus"
            @changeProjectBox='changeMapBox'
            title='新增'>
      <slot slot='dialogMain'>
        <mapBox @changeProjectBox='changeMapBox'></mapBox>
      </slot>
    </addBox>
    <addBox v-if="addProjectStatus"
            name='项目管理'
            @getList='getProgectList'
            @changeProjectBox='changeProjectBox'
            title='新增'>
      <slot slot='dialogMain'>
        <addProjectForm ref="addForm"
                        @getList='getProgectList'
                        @changeMapBox='changeMapBox'
                        @changeProjectBox='changeProjectBox'></addProjectForm>
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
import addProjectForm from '../../components/formModule/addProjectForm'
import cascaderAreaItem from '@/components/Cascader/areaCascader'
import mapBox from '../../components/mapBox'
export default {
  components: { addBox, myTable, addProjectForm, cascaderAreaItem, mapBox },
  data () {
    return {
      ruleForm: {},
      ruleFormHeight: {},
      tableData: [],
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
          prop: 'runTime',
          label: '运行时间',
          tooltip: false,
        },
      ],
      currentPage: 1,
      pageSize: 10,
      total: 1000,
      addProjectStatus: false,
      addMapStatus: false,
      heightStatus: false,
      heightTable: 'calc(100vh - 402px)',
      http: '/manage/project/getProjectById?projectId=',
      actionList: [
        {
          name: '可视化',
          style: 'view-screen'
        },
        {
          name: '详情',
          style: 'view-screen'
        },
        {
          name: '编辑',
          style: 'view-screen'
        },
        {
          name: '删除',
          style: 'disable-button'
        },
      ],
      address: []
    };
  },
  computed: {
    ...mapState({
      projectType: state => state.common.projectType,
      projectStatus: state => state.common.projectStatus,
      companyList: state => state.system.companyList,
    })
  },
  mounted () {
    this.getProgectList()
  },
  methods: {
    ...mapActions(['saveDetailInfo']),
    submitForm (formName) {
      this.getProgectList()
    },
    resetList () {
      this.ruleForm = {}
      this.ruleFormHeight = {}
      this.getProgectList()
    },
    getAddress (data) {
      this.address = data
    },
    getProgectList () {
      let startTime, endTime
      if (this.ruleFormHeight.time) {
        startTime = this.ruleFormHeight.time[0]
        endTime = this.ruleFormHeight.time[1]
      }
      let params = {
        projectName: this.ruleForm.key,
        projectType: this.ruleFormHeight.projectType,
        companyId: this.ruleFormHeight.companyId,
        province: this.address[0] || '',
        city: this.address[1] || '',
        county: this.address[2] || '',
        startTime: startTime,
        endTime: endTime,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      }
      systemMirror.getProjectList(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.total = result.recordTotal
          if (this.total > 0 && this.tableData.length === 0 && this.currentPage > 1) {
            this.currentPage = this.currentPage - 1
            this.getList()
          }
          // console.log('this.currentPage', this.currentPage)

          this.tableData = result.content
        }
        this.tableData.forEach((item, index) => {
          item.createTime = timeReg.getNowFormatDate(item.createTime)
          item.runTime = timeReg.getNowFormatDate(item.runTime)
          this.projectType.forEach(it => {
            if (item.projectType && item.projectType === it.id) {
              item.projectTypeLable = it.name
            }
          })
          this.projectStatus.forEach(it => {
            if (item.status == it.id) {
              item.statusLable = it.name
            }
          })
        })
        console.log('this.tableData111', this.tableData)
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
    deletList (id) {
      systemMirror.deleteProjectById(id).then(res => {
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
    showBox () {
      this.saveDetailInfo({})
      this.changeProjectBox(true)
    },
    changeProjectBox (status) {
      this.addProjectStatus = status
    },
    changeMapBox (status) {
      this.addMapStatus = status
    },

    heightSearch () {
      if (!this.heightStatus) {
        this.heightTable = 'calc(100vh - 548px)'
      } else {
        this.ruleFormHeight = {}
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
/deep/ label {
  margin-bottom: 0;
}
</style>