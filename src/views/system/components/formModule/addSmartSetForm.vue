<template>
  <div class="form-module">
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="设备类型"
                    prop="deviceTypeName">
        <el-input v-model="ruleForm.deviceTypeName"
                  placeholder="请输入设备类型"></el-input>
      </el-form-item>
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
        deviceTypeName: [
          { required: true, message: '请输入设备类型', trigger: 'blur' },
        ]
      },
    };
  },
  computed: {
    ...mapState({
      projectType: state => state.common.projectType,
      systemList: state => state.system.systemList,
      deviceType: state => state.common.deviceType,
    })
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
      systemMirror.addDeviceType(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.$emit('changeProjectBox', false)
          this.$message.success(serviceMessage)
        }
      })
    },
  }
}
</script>