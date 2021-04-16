<template>
  <div class="form-module">
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="设备名称"
                    prop="deviceName">
        <el-input v-model="ruleForm.deviceName"
                  placeholder="请输入设备名称"></el-input>
      </el-form-item>
      <el-form-item label="设备类型"
                    prop="deviceType">
        <el-select v-model="ruleForm.deviceType"
                   placeholder="请选择设备类型">
          <el-option v-for="item in deviceType"
                     :label="item.name"
                     :key="item.id"
                     :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="项目类型"
                    prop="projectType">
        <el-select v-model="ruleForm.projectType"
                   placeholder="请选择项目类型">
          <el-option v-for="item in projectType"
                     :label="item.name"
                     :key="item.id"
                     :value="item.id"></el-option>
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="项目系列"
                    prop="series">
        <el-select v-model="ruleForm.series"
                   placeholder="请选择项目系列">
          <el-option label="系列一"
                     value="1"></el-option>
          <el-option label="系列二"
                     value="2"></el-option>
        </el-select>
      </el-form-item> -->
      <!-- @change="changeSystem" -->
      <el-form-item label="系统名称">
        <el-select v-model="ruleForm.systemId"
                   placeholder="请选择系统名称">
          <el-option v-for="(item, index) in systemList"
                     @click.native="changeSystem(item.systemId)"
                     :label="item.systemName"
                     :key="index"
                     :value="item.systemId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目名称">
        <el-input v-model="ruleForm.projectName"
                  disabled></el-input>
      </el-form-item>
      <el-form-item label="行业名称">
        <el-input v-model="ruleForm.industryName"
                  disabled></el-input>
      </el-form-item>
      <el-form-item label="设备状态"
                    prop="status">
        <el-select v-model="ruleForm.status"
                   placeholder="请选择设备状态">
          <el-option label="正常"
                     value="1"></el-option>
          <el-option label="异常"
                     value="2"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="运行时间">
        <el-date-picker v-model="ruleForm.createTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item> -->
    </el-form>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import systemMirror from '@/resource/systemMirror'
import timeReg from '@/utils/timeReg'
export default {
  data () {
    return {
      ruleForm: {
      },
      rules: {
        deviceName: [
          { required: true, message: '请输入系统名称', trigger: 'blur' },
        ],
        status: [
          { required: true, message: '请选择设备状态', trigger: 'change' },
        ],
        deviceType: [
          { required: true, message: '请选择设备类型', trigger: 'change' },
        ],
      },
      systemId: null
    };
  },
  computed: {
    ...mapState({
      projectType: state => state.common.projectType,
      systemList: state => state.system.systemList,
      deviceType: state => state.common.deviceType,
    })
  },
  watch: {
    systemId (newVal, oldVal) {
      if (newVal) {
        this.getSystemById(newVal)
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.addSystem()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    addSystem () {
      let params = {
        ...this.ruleForm,
      }
      systemMirror.addDevice(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.$emit('changeProjectBox', false)
          this.$message.success(serviceMessage)
        }
      })
    },
    changeSystem (val) {
      this.systemId = val
      this.getSystemById(val)
    },
    getSystemById (id) {
      systemMirror.getSystemById(id).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.ruleForm.projectName = result.projectName
          this.ruleForm.industryName = result.industryName
        }
      })
    },
  }
}
</script>