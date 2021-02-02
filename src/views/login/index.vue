<template>
  <div class="dz-login">
    <div class="dz-login-box">
      <div class="dz-login-box-blue">
        <span>数字城市解决商</span>
        <em>智慧交通/智慧园区/智慧社区</em>
        <em>规划/设计/产品定制/运维</em>
      </div>
      <div class="dz-login-box-white">
        <span>地洲智慧云平台</span>
        <el-form :model="ruleForm"
                 status-icon
                 :rules="rules"
                 :label-position="labelPosition"
                 ref="ruleForm"
                 label-width="100px">
          <el-form-item label="账号"
                        prop="account">
            <el-input type="input"
                      v-model="ruleForm.account"></el-input>
          </el-form-item>
          <el-form-item label="密码"
                        prop="pass">
            <el-input type="password"
                      v-model="ruleForm.pass"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>


export default {
  name: "login",
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    var validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'));
      } else {
        callback();
      }
    };
    return {
      labelPosition: 'top',
      ruleForm: {
        pass: '',
        account: '',
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        account: [
          { validator: validateAccount, trigger: 'blur' }
        ],
      }
    };
  },
  mounted () {

  },
  methods: {
    submitForm (formName) {
      console.log('111', this.$refs)
      this.$refs[formName].validate((valid) => {
        console.log('222', valid)
        if (valid) {
          console.log('1212')
          this.$router.push('mainIndex')
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>

<style lang="less" scoped>
.dz-login {
  width: 100%;
  height: 100%;
  background: url("../../assets/Vector.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  &-box {
    width: 920px;
    height: 490px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -460px;
    margin-top: -245px;
    display: flex;
    &-blue {
      width: 60%;
      height: 100%;
      background: rgba(81, 142, 234, 0.9);
      padding: 50px;
      display: flex;
      flex-direction: column;
      span {
        font-size: 36px;
        line-height: 80px;
        height: 80px;
        color: #ffffff;
      }
      em {
        color: #ffffff;
        font-style: normal;
        font-size: 18px;
        line-height: 30px;
      }
    }
    &-white {
      width: 40%;
      height: 100%;
      background: #f0f2f9;
      padding: 50px;
      display: flex;
      flex-direction: column;
      span {
        font-size: 20px;
        letter-spacing: 2.7px;
        text-align: center;
        margin: 40px auto 40px auto;
        color: #333333;
        font-weight: 600;
      }
      /deep/ .el-form-item__label {
        line-height: 18px !important;
        padding: 0;
      }
      /deep/ .el-input__inner {
        border-radius: 20px;
        background-color: #f0f2f9;
      }
      /deep/ .el-button {
        width: 100%;
        margin-top: 20px;
        border-radius: 20px;
      }
    }
  }
}
</style>
