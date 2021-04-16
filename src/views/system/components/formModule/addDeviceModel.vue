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
      <el-form-item label="设备型号"
                    prop="seriesModel">
        <el-input v-model="ruleForm.seriesModel"
                  placeholder="请输入设备型号"></el-input>

      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import systemMirror from '@/resource/systemMirror'
export default {
  data () {
    var checkNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入行业编号'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字'));
        } else {
          let valueString = value.toString()
          if (valueString.length !== 2) {
            callback(new Error('行业编号必须是2位数字'));
          } else {
            callback();
          }
        }
      }, 500);
    };
    return {
      ruleForm: {},
      rules: {
        seriesModel: [
          { required: true, message: '请输入设备型号', trigger: 'blur' },
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
    // updateIndutry
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
    addCompany () {
      let params = {
        ...this.ruleForm,
        seriesId: '1'
      }
      params.createTime = ''
      params.updateTime = ''

      systemMirror.addVersiontype(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.$message.success(serviceMessage)
          this.$emit('changeProjectBox', false)
        }
      })
    }
  }
}
</script>
