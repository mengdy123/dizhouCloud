<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: mandy
 * @Date: 2021-03-23 10:19:37
 * @LastEditors: mandy
 * @LastEditTime: 2021-03-23 10:51:02
-->
<template>
  <div class="form-module">
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="故障类型"
                    prop="faultName">
        <el-input v-model="ruleForm.faultName"
                  placeholder="请输入故障类型"></el-input>
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
export default {
  data () {
    return {
      ruleForm: {},
      rules: {
        faultName: [
          { required: true, message: '请输入故障类型名称', trigger: 'blur' },
        ],
      }
    };
  },
  computed: {
    ...mapState({
      detailInfo: state => state.system.detailInfo,
    })
  },
  mounted () {
    this.ruleForm = this.detailInfo
  },
  methods: {
    ...mapActions(['saveDetailInfo']),
    submitForm () {
      console.log('this.ruleForm.faultId', this.ruleForm)
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.addCompany()
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
    addCompany () {
      if (this.ruleForm.faultId) {
        let params = {
          ...this.ruleForm,
        }
        params.createTime = ''
        params.updateTime = ''
        systemMirror.updateFailTypeList(params).then(res => {
          let { code, result, serviceMessage } = res.data
          if (code === 200) {
            this.$emit('getList')
            this.$message.success(serviceMessage)
            this.$emit('changeProjectBox', false)
            this.$refs['ruleForm'].resetFields();
          }
        })
      } else {
        let params2 = {
          ...this.ruleForm,
        }
        params2.createTime = ''
        params2.updateTime = ''
        systemMirror.addFailTypeList(params2).then(res => {
          let { code, result, serviceMessage } = res.data
          if (code === 200) {
            this.$emit('getList')
            this.saveDetailInfo({})
            this.$message.success(serviceMessage)
            this.$emit('changeProjectBox', false)

          }
        })
      }

    }
  }
}
</script>
