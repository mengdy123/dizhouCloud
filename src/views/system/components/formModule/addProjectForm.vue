<template>
  <div class="form-module">
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="项目名称"
                    prop="projectName">
        <el-input v-model="ruleForm.projectName"
                  placeholder="请输入项目名称"></el-input>
      </el-form-item>
      <el-form-item label="项目简称">
        <el-input v-model="ruleForm.projectAbbreviation"
                  placeholder="请输入项目简称"></el-input>
      </el-form-item>
      <el-form-item label="项目地址"
                    prop="projectSite">
        <!-- @focus='getProjectSite' -->

        <span style="cursor:pointer"
              v-if="!projectAddress"
              @click="getProjectSite">点击获取项目地址</span>
        <el-input placeholder="请输入"
                  v-model="ruleForm.projectSite"
                  v-else>
          <i class="el-icon-edit el-input__icon"
             slot="suffix"
             @click="getProjectSite">
          </i>
        </el-input>
      </el-form-item>
      <el-form-item label="项目类型">
        <el-select v-model="ruleForm.projectType"
                   placeholder="请选择项目类型">
          <el-option v-for="item in projectType"
                     :label="item.name"
                     :key="item.id"
                     :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目状态">
        <el-select v-model="ruleForm.status"
                   placeholder="请选择运行状态">
          <el-option v-for="item in projectStatus"
                     :label="item.name"
                     :key="item.id"
                     :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户名称"
                    prop="companyId">
        <el-select v-model="ruleForm.companyId"
                   filterable
                   placeholder="请选择">
          <el-option v-for="item in companyList"
                     :key="item.companyId"
                     :label="item.companyName"
                     :value="item.companyId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目负责人">
        <el-input v-model="ruleForm.projectLeader"
                  placeholder="请输入项目负责人"> </el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="ruleForm.phone"
                  placeholder="请输入联系方式"></el-input>
      </el-form-item>
    </el-form>
    <div class="form-footer">
      <el-button type="primary"
                 @click="submitForm">确 定</el-button>
      <el-button @click="handleClose">取 消</el-button>
    </div>
    <addBox v-if="addProjectStatus"
            @changeProjectBox='changeProjectBox'
            title='新增'>
      <slot slot='dialogMain'>
        <addMapForm ref="addForm"
                    @changeProjectBox='changeProjectBox'></addMapForm>
      </slot>
    </addBox>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import systemMirror from '@/resource/systemMirror'
import { isPhone } from '@/utils/validate'
import addBox from '../dialogModule/addDialogModule'
import addMapForm from '../mapBox/index'
export default {
  components: { addBox, addMapForm },
  data () {
    return {
      addressInfo: {},
      ruleForm: {},
      rules: {
        projectName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
          { min: 4, max: 60, message: '长度在 4 到 60 个字符', trigger: 'blur' }
        ],
        projectAbbreviation: [
          { required: true, message: '请输入项目简称', trigger: 'blur' },
          { min: 4, max: 60, message: '长度在 4 到 60 个字符', trigger: 'blur' }
        ],
        projectSite: [
          { required: true, message: '请输入项目地址', trigger: 'blur' },
          { min: 4, max: 60, message: '长度在 4 到 60 个字符', trigger: 'blur' }
        ],
        companyId: [
          { required: true, message: '请输入客户名称', trigger: 'change' }
        ],
      },
      companyList: [],
      addProjectStatus: false,
    };
  },
  watch: {
    projectAddress: {
      deep: true,
      handler (newVal, oldVal) {
        console.log('projectAddress---watch', newVal)
        this.ruleForm.projectSite = newVal.name
        this.addressInfo = newVal.addressComponent
      }
    }
  },
  computed: {
    ...mapState({
      projectType: state => state.common.projectType,
      projectStatus: state => state.common.projectStatus,
      projectAddress: state => state.system.projectAddress
    })
  },
  mounted () {
    this.getcCompanyList()
  },
  methods: {
    ...mapActions(['saveDetailInfo']),
    changeProjectBox (status) {
      this.addProjectStatus = status
    },
    getcCompanyList () {
      let params = {
        companyName: '',
        currentPage: 1,
        pageSize: 10000,
      }
      systemMirror.getCompanyList(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.companyList = result.content
        }
      })
    },
    submitForm () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if (!isPhone(this.ruleForm.phone)) {
            this.$message.error('请输入正确的联系方式')
          } else {
            this.addProjectFun()
          }
        } else {
          console.log('error submit!!');
          return false
        }
      });
    },
    handleClose () {
      this.$refs['ruleForm'].resetFields();
      this.$emit('changeProjectBox', false)
      this.saveDetailInfo({})
    },
    getProjectSite () {
      // this.$emit('changeInnerVisible', true)
      this.changeProjectBox(true)
      this.$nextTick(() => {
        // this.$refs.addForm.changeDialogVisible(true)
      })
    },
    addProjectFun () {
      let params = {
        ...this.ruleForm,
        latitude: this.projectAddress.lnglat[1],
        longitude: this.projectAddress.lnglat[0],
        continent: "亚洲",
        companyId: this.ruleForm.companyId,
        status: this.ruleForm.status,
        country: this.addressInfo.country || this.ruleForm.country,
        province: this.addressInfo.province || this.ruleForm.province,
        city: this.addressInfo.district || this.ruleForm.city,
        county: this.addressInfo.township || this.ruleForm.county,
        projectSite: this.addressInfo.street + this.ruleForm.streetNumber,
      }
      console.log('ruleForm', params)
      systemMirror.addProject(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.$message.success(serviceMessage)
          this.$emit('changeProjectBox', false)
          this.saveDetailInfo({})
        }
      })
    },
  }
}
</script>