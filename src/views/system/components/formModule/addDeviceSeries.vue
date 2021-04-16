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
      <el-form-item label="系列编号"
                    prop="seriesNumber">
        <el-input v-model="ruleForm.seriesNumber"
                  placeholder="请输入系列编号"></el-input>

      </el-form-item>
      <el-form-item label="系列名称"
                    prop="seriesName">
        <el-input v-model="ruleForm.seriesName"
                  placeholder="请输入系列名称"></el-input>
      </el-form-item>

    </el-form>
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
        seriesNumber: [
          { required: true, message: '请输入系列编号', trigger: 'blur' },
        ],
        seriesName: [
          { required: true, message: '请输入系列名称', trigger: 'blur' },
        ],
      },
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
    submitForm () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.addCompany()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm () {
      this.$refs['ruleForm'].resetFields();
    },
    addCompany () {
      let id = this.$route.query.id
      let params = {
        ...this.ruleForm,
        deviceTypeId: id
      }
      params.createTime = ''
      params.updateTime = ''
      if (params.seriesId) {
        systemMirror.updateSeries(params).then(res => {
          let { code, result, serviceMessage } = res.data
          if (code === 200) {
            this.$message.success(serviceMessage)
            this.$emit('changeProjectBox', false)
          }
        })
      } else {
        systemMirror.addSeriesType(params).then(res => {
          let { code, result, serviceMessage } = res.data
          if (code === 200) {
            this.$message.success(serviceMessage)
            this.$emit('changeProjectBox', false)
          }
        })
      }

    }
  }
}
</script>
