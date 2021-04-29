
<template>
  <div class="dz-system">
    <div class="dz-system-title">运维职责管理</div>
    <div class="dz-system-search">
      <div class="dz-system-search-ruleForm">
        <el-form :model="ruleForm"
                 ref="ruleForm"
                 label-width="100px">
          <!-- <el-form-item> -->
          <!-- <span class="label-key">关键字</span> -->
          <!-- 设备编号， 系统名称、项目名称、项目编号，设备安装区域、设备安装位置（位置编号）、维修人员、审核人员-->
          <!-- <el-input v-model="ruleForm.key"
                      style="width: 260px"
                      placeholder="请输入关键字"
                      clearable></el-input>
          </el-form-item> -->
          <el-form-item label="项目名称"
                        prop="industry">
            <el-select v-model="ruleFormHeight.projectId"
                       placeholder="请选择项目名称"
                       style="width: 260px"
                       clearable
                       @change="changeProject">
              <el-option v-for="item in projectList"
                         :label="item.projectName"
                         :key="item.projectId"
                         :value="item.projectId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="配置模式"
                        prop="industry">
            <el-select v-model="ruleFormHeight.setType"
                       @change="changeSetType"
                       placeholder="请选择配置模式"
                       style="width: 260px"
                       clearable>
              <el-option v-for="item in setTypeList"
                         :label="item.label"
                         :key="item.value"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item>
            <el-select v-model="ruleFormHeight.type"
                       :placeholder="placeholderInfo"
                       style="width: 160px"
                       clearable>
              <el-option v-for="item in setTypeList"
                         :label="item.label"
                         :key="item.value"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item> -->
        </el-form>
        <div class="button-list">
          <el-button type="primary"
                     @click="submitForm('ruleForm')">搜索</el-button>
          <el-button type="primary"
                     @click="maintainFun('level')">维修参数配置</el-button>
          <!-- <el-button type="primary"
                     @click="maintainFun('person')">维修人员</el-button> -->
        </div>
      </div>
    </div>
    <div class="dz-system-table">
      <cascaderTable ref="cascaderTable"
                     :projectId='projectId'></cascaderTable>
    </div>
    <addBox v-if="addProjectStatus"
            name='维修参数配置'
            @getList='getProgectList'
            :treeInfo='treeInfo'
            @changeProjectBox='changeProjectBox'
            title='维修参数配置'>
      <slot slot='dialogMain'>
        <maintenanceSet ref="addForm"
                        :treeInfo='treeInfo'
                        @getList='getProgectList'
                        @changeProjectBox='changeProjectBox'>
        </maintenanceSet>
      </slot>
    </addBox>

  </div>
</template>
<script>
import systemMirror from '@/resource/systemMirror'
import { mapState, mapActions } from 'vuex'
import timeReg from '@/utils/timeReg'
import cascaderTable from "@/components/Table/cascaderTable";
import addBox from '../../components/dialogModule/addDialogModule'
import maintenanceSet from '../../components/formModule/maintenanceSet'
export default {
  components: { cascaderTable, addBox, maintenanceSet },
  data () {
    return {
      ruleForm: {},
      ruleFormHeight: {},
      projectList: [],
      setTypeList: [
        {
          label: '系统',
          value: '1'
        },
        {
          label: '设备',
          value: '2'
        },
        {
          label: '安装区域',
          value: '3'
        }
      ],
      placeholderInfo: '',
      projectId: '1',
      addProjectStatus: false,
      treeInfo: {}
    };
  },
  computed: {
    ...mapState({
      projectType: state => state.common.projectType,
      projectStatus: state => state.common.projectStatus,
    })
  },
  mounted () {
    this.getProgectList()
  },
  methods: {
    ...mapActions(['saveDetailInfo']),
    changeProject (data) {
      this.projectId = String(data)
    },
    changeProjectBox (status) {
      this.addProjectStatus = status
    },
    //搜索按钮
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            // this.ruleFormHeight.projectId
            projectId: '1',
            type: this.ruleFormHeight.setType
          }
          this.$refs.cascaderTable.getListByProjectId(params)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 修改配置模式
    changeSetType (type) {
      switch (type) {
        case 1:
          this.placeholderInfo = '请选择系统类型'
          break
        case 2:
          this.placeholderInfo = ''
          break
        case 3:
          this.placeholderInfo = '请选择安装区域'
          break
      }
      console.log('ruleFormHeight.setType', this.ruleFormHeight.setType)
    },
    //设置 维修人员  维修级别
    maintainFun (type) {
      let data = this.$refs.cascaderTable.resourceIntegration()
      if (!this.ruleFormHeight.projectId) {
        this.$message.warning('请选择项目')
      } else if (!this.ruleFormHeight.projectId) {
        this.$message.warning('请选择项目配置模式')
      } else if (data.systemIdList && data.systemIdList.length === 0) {
        this.$message.warning('请先配置项目设备')
      } else {
        this.saveDetailInfo({})
        data.type = this.ruleFormHeight.setType
        // data.level = '' // 设备级别
        // data.maintenance = ''
        // data.auditor = ''
        console.log('data', data)
        this.treeInfo = data
        this.changeProjectBox(true)
      }

      // switch (type) {
      //   case 'level':
      //     //设置 维修级别
      //     break
      //   case 'person':
      //     //设置 维修人员
      //     break
      // }
    },
    //获取项目列表
    getProgectList () {
      let params = {
        projectName: '',
        currentPage: 1,
        pageSize: 100000,
      }
      systemMirror.getProjectList(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.projectList = result.content
        }
      })
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
.dz-system-table {
  height: calc(100vh - 300px);
}
</style>
