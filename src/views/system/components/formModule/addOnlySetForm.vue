<template>
  <div class="form-module">
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="设备型号"
                    prop="seriesModel">
        <el-input v-model="ruleForm.deviceModel"
                  placeholder="请输入设备型号"></el-input>
      </el-form-item>
      <el-form-item label="设备编号"
                    prop="deviceNumber">
        <el-input v-model="ruleForm.deviceNumber"
                  placeholder="请输入设备编号"></el-input>
      </el-form-item>

      <el-form-item label="安装区域"
                    prop="deviceArea">
        <el-input v-model="ruleForm.deviceArea"
                  placeholder="请输入安装区域"> </el-input>
      </el-form-item>
      <el-form-item label="安装位置"
                    prop="deviceSit">
        <el-input v-model="ruleForm.deviceSit"
                  placeholder="请输入安装位置"></el-input>
      </el-form-item>
    </el-form>
    <div class="form-footer">
      <el-button type="primary"
                 @click="submitForm">确 定</el-button>
      <el-button @click="handleClose">取 消</el-button>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import systemMirror from '@/resource/systemMirror'
import { isPhone } from '@/utils/validate'
export default {
  data () {
    return {
      addressInfo: {},
      ruleForm: {},
      rules: {
        seriesModel: [
          { required: true, message: '请输入设备型号', trigger: 'blur' },
        ],
        deviceNumber: [
          { required: true, message: '请输入设备编号', trigger: 'blur' },
        ],
        deviceSit: [
          { required: true, message: '请输入安装位置', trigger: 'blur' },
        ],
        deviceArea: [
          { required: true, message: '请输入安装区域', trigger: 'blur' }
        ],
      },
      companyList: []
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
      this.$emit('changeInnerVisible', true)
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