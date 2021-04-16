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
      <el-form-item label="用户姓名"
                    prop="name">
        <el-input v-model="ruleForm.name"
                  placeholder="请选择用户姓名"></el-input>
      </el-form-item>

      <el-form-item label="用户角色"
                    prop='roleId'>
        <el-select v-model="ruleForm.roleId"
                   placeholder="请选择用户角色">
          <el-option label="角色1"
                     value="1"></el-option>
          <el-option label="角色2"
                     value="2"></el-option>
          <el-option label="角色3"
                     value="3"></el-option>
          <el-option label="角色4"
                     value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系电话"
                    prop="phone">
        <el-input v-model="ruleForm.phone"
                  placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="账号状态">
        <el-select v-model="ruleForm.status"
                   placeholder="请选择账号状态">
          <el-option label="正常"
                     value="1"></el-option>
          <el-option label="异常"
                     value="2"></el-option>
        </el-select>
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
        return callback(new Error('请输入客户编号'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          let valueString = value.toString()
          if (valueString.length < 5) {
            callback(new Error('客户编号必须是5位数字'));
          } else {
            callback();
          }
        }
      }, 500);
    };
    return {
      ruleForm: {
        status: '1'
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: '请选择用户角色', trigger: 'change' },
        ],
        phone: [
          { required: true, message: '请输入用户手机号', trigger: 'blur' },
        ]
      }
    };
  },
  methods: {
    submitForm () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.addUser()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    addUser () {
      let params = {
        ...this.ruleForm,
      }
      systemMirror.addUser(params).then(res => {
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
