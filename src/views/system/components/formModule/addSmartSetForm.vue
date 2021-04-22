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
      detailInfo: state => state.system.detailInfo,
    })
  },
  mounted () {
    this.ruleForm = this.detailInfo
  },
  methods: {
    ...mapActions(['saveDetailInfo']),
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
    handleClose () {
      this.$refs['ruleForm'].resetFields();
      this.$emit('changeProjectBox', false)
      this.saveDetailInfo({})
    },
    addSystem () {
      let params = {
        deviceTypeName: this.ruleForm.deviceTypeName
      }
      systemMirror.addDeviceType(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.$emit('changeProjectBox', false)
          this.$emit('getList')
          this.$message.success(serviceMessage)
        }
      })
    },
  }
}
</script>