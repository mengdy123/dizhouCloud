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
      <el-form-item label="地域名称"
                    prop="areaName">
        <el-input v-model="ruleForm.areaName"
                  placeholder="请输入地域名称"></el-input>
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
        areaName: [
          { required: true, message: '请输入地域名称', trigger: 'blur' },
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
    ...mapActions(['saveDetailInfo']),
    submitForm () {
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
      let params
      if (this.ruleForm.id) {
        params = {
          areaName: this.ruleForm.areaName,
          color: this.ruleForm.color,
          show: this.ruleForm.show,
          id: this.ruleForm.id
        }
        systemMirror.updateArea(params).then(res => {
          let { code, result, serviceMessage } = res.data
          if (code === 200) {
            this.$message.success(serviceMessage)
            this.$emit('getList')
            this.$emit('changeProjectBox', false)
          }
        })
      } else {
        params = {
          areaName: this.ruleForm.areaName,
          color: '',
          show: '0',
        }
        systemMirror.addArea(params).then(res => {
          let { code, result, serviceMessage } = res.data
          if (code === 200) {
            this.$message.success(serviceMessage)
            this.$emit('getList')
            this.$emit('changeProjectBox', false)
          }
        })
      }


    }
  }
}
</script>
