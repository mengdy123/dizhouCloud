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
      <!-- 权限菜单 -->
      <el-form-item label="权限名称"
                    prop="permissionName">
        <el-input v-model="ruleForm.permissionName"
                  placeholder='请输入权限名称'></el-input>
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
import systemManageMirror from '@/resource/systemManageMirror'
export default {
  data () {
    return {
      ruleForm: {
        name: '',
        role: ''
      },
      rules: {
        permissionName: [
          { required: true, message: '请输入权限名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
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
          this.updatePower()
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
    updatePower () {
      console.log('this.detailInfo', this.detailInfo)
      let params = {
        id: this.detailInfo.id,
        permissionName: this.ruleForm.permissionName
      }
      console.log('params', params)
      systemManageMirror.updatePermissionById(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.$message.success(serviceMessage)
          this.$emit('changeProjectBox', false)
          this.$emit('getList')
          this.saveDetailInfo({})
        }
      })
    }

  }
}
</script>
<style lang="less" scoped>
</style>
