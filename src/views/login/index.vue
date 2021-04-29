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
                        prop="userName">
            <el-input type="input"
                      v-model="ruleForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码"
                        prop="userPassword">
            <el-input type="password"
                      v-model="ruleForm.userPassword"
                      @keyup.enter.native="submitForm('ruleForm')"></el-input>
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
import sourceMirror from '@/resource/sourceMirror'
import { mapActions } from 'vuex';
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
        userPassword: '',
        userName: '',
      },
      rules: {
        userPassword: [
          { validator: validatePass, trigger: 'blur' }
        ],
        userName: [
          { validator: validateAccount, trigger: 'blur' }
        ],
      }
    };
  },
  mounted () {

  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = this.ruleForm
          this.login(params)
        } else {
          return false;
        }
      });
    },
    login (params) {
      sourceMirror.login(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          //存
          this.Cookie.set("userInfo", result);
          this.getUserById(result.id)
          //取
          // this.Cookie.get("a");
          this.$router.push('mainIndex')
        } else {
          this.$message.error(serviceMessage)
        }
      })
    },
    getUserById (id) {
      systemManageMirror.getUserById(id).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          // console.log('个人中心', result)
          let data = result
          this.baseInfo.forEach(item => {
            if (item.type) {
              item.value = data[item.type]
            }
          })
          this.tableDataNew = result.projectList
          this.menuArr = result.menuList
          if (this.menuArr && this.menuArr.length) {
            this.menuArr.forEach(item => {
              if (item.childrenMenu.length > 0) {
                // 即：this.recursionItem(item);在这地方添加的
                item.childrenMenu.forEach(items => {
                  // 下面的就是执行递归的方法，因为我是从第二层才开始需要往下挖的，所以这里多了个forEach,如果从第一层起，从item就好了，即：this.recursionItem(item);在上面添加
                  this.recursionItem(items); // 这里是源头，把一个对象开始递归，开始循环
                  // 如果想看完整数据，那么是在这里打印数据哦
                  console.log(items, '看我查看完整的数据哦')
                  if (items.flag) {
                    this.checkedKeys.push(items.id)
                  }
                  if (items.level === '1') {
                    this.checkAll = true
                  } else {
                    this.checkAll = false
                  }
                  // if (this.checkAll) {
                  //   items.level = '1'
                  // } else {
                  //   items.level = '0'
                  // }
                  // 因为上一步递归时，就已经把循环children的动作做完了，这里是验收递归方法的地方。
                })
              } else {
                // 如果第一层没有子项做的操作。。。。。
              }
            })
          }
        }
      })
    },
    //递归
    recursionItem (item) {
      // 一层一层往下面执行，循环，直到不满足情况的条件下，会自动跳出这个递归方法，然后又到上面方法的源头处，开始执行下一个对象。。。
      if (item.childrenMenu && item.childrenMenu.length > 0) {
        item.value = item.id
        item.label = item.menuName
        item.path = item.url
        item.level = item.level
        item.parentId = item.parentId
        item.permissionId = item.permissionId
        item.flag = item.flag
        // 因为三级联动的数据格式是value和label,所以需要自己手动添加，没有的忽略。
        item.childrenMenu.forEach(ff => {
          // 这里就是判断他的children下面还有没有值，有的话我就要往下挖，就又开始自己调用自己了
          this.recursionItem(ff)
        })
      } else {
        // 这里就是判断，如果我这一层的children下面没有东西的时候该做什么操作 
        item.value = item.id
        item.label = item.menuName
        item.path = item.url
        item.level = item.level
        item.parentId = item.parentId
        item.permissionId = item.permissionId
        item.flag = item.flag // 要添加value和label,否则会看不到标签名字和值
      }
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
