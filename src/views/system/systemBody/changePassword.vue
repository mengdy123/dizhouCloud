<template>
  <div style="width: 500px">
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="原始密码"
                    prop="oldPass">
        <el-input v-model="ruleForm.oldPass"
                  type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码"
                    prop="pass">
        <el-input type="password"
                  v-model="ruleForm.pass"
                  autocomplete="off"></el-input>
      </el-form-item>
      <!-- <el-form-item label="确认密码"
                    prop="checkPass">
        <el-input type="password"
                  v-model="ruleForm.checkPass"
                  autocomplete="off"></el-input>
      </el-form-item> -->

      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('ruleForm')">提 交</el-button>
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import systemManageMirror from '@/resource/systemManageMirror'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        age: ''
      },
      rules: {
        pass: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        oldPass: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        userInfo: {}
      }
    };
  },

  mounted () {
    this.userInfo = JSON.parse(this.Cookie.get("userInfo"))
  },
  methods: {
    submitForm () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.updateUserPassword()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    updateUserPassword () {
      let params = {
        id: this.userInfo.id,
        oldUserPassword: String(this.ruleForm.oldPass),
        newUserPassword: String('this.ruleForm.pass')
      }
      systemManageMirror.updateUserPassword(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.$message.success(serviceMessage)
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>