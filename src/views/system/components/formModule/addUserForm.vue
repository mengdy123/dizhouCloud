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
      <el-form-item label="ID号"
                    style="display:flex"
                    prop="userName">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-select v-model="ruleForm.companyNumber"
                       placeholder="请选择客户编号"
                       @change="changeCompanyInfo">
              <el-option v-for="item in companyList"
                         :label="item.companyNumber +'--'+ item.companyName"
                         :key="item.companyId"
                         :value="item"></el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-input v-model="ruleForm.idNumber"
                      style="width: '100px"
                      placeholder="请输入"
                      disabled></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="用户名"
                    prop="userName">
        <el-input v-model="ruleForm.userName"
                  placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名"
                    prop="name">
        <el-input v-model="ruleForm.name"
                  placeholder="请输入真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="联系电话"
                    prop="phone">
        <el-input v-model="ruleForm.phone"
                  placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="密码"
                    prop="userPassword">
        <el-input type="password"
                  v-model="ruleForm.userPassword"
                  autocomplete="off"
                  placeholder="请输入密码"></el-input>
      </el-form-item>
      <!-- <el-form-item label="确认密码"
                    prop="checkPass">
        <el-input type="password"
                  v-model="ruleForm.checkPass"
                  autocomplete="off"
                  placeholder="请输入确认密码"></el-input>
      </el-form-item> -->
      <el-form-item label="组织架构"
                    prop="orgId">
        <el-select v-model="ruleForm.orgId"
                   placeholder="请选择组织架构"
                   @change="changeOrgId">
          <el-option v-for="item in orgList"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门"
                    prop="departmentId">
        <el-select v-model="ruleForm.departmentId"
                   placeholder="请选择部门"
                   @change="changeDeparmentId">
          <el-option v-for="item in departmentArr"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职务"
                    prop="jobId">
        <el-select v-model="ruleForm.jobId"
                   placeholder="请选择职务">
          <el-option v-for="item in jobArr"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户角色"
                    prop='roleId'>
        <el-select v-model="ruleForm.roleId"
                   placeholder="请选择用户角色">
          <el-option v-for="(item, index) in roleList"
                     :key="index"
                     :label="item.roleName"
                     :value="item.id"></el-option>
        </el-select>
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
      <!-- prop="photo" -->
      <el-form-item label="免冠照片">
        <el-upload class="avatar-uploader"
                   action="https://jsonplaceholder.typicode.com/posts/"
                   :show-file-list="false"
                   :on-success="handleAvatarSuccess"
                   :before-upload="beforeAvatarUpload">
          <img v-if="ruleForm.imageUrl"
               :src="ruleForm.imageUrl"
               class="avatar">
          <i v-else
             class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
import { isPhone } from '@/utils/validate'
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
      } else if (value !== this.ruleForm.userPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        status: '1',
        imageUrl: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户真实姓名', trigger: 'blur' },
        ],
        userName: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
        ],
        roleId: [
          { required: true, message: '请选择用户角色', trigger: 'change' },
        ],
        phone: [
          { required: true, message: '请输入用户手机号', trigger: 'blur' },
        ],
        userPassword: [
          { required: true, validator: validatePass, trigger: 'blur' },
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' },
        ],
        orgId: [
          { required: true, message: '请选择组织架构', trigger: 'change' },
        ],
        departmentId: [
          { required: true, message: '请选择部门', trigger: 'change' },
        ],
        jobId: [
          { required: true, message: '请选择部门', trigger: 'change' },
        ],
        // photo: [
        //   { required: true, message: '请上传免冠照片', trigger: 'change' },
        // ]
      },
      companyInfo: {},
      orgList: [],
      departmentArr: [],
      jobArr: []
    };
  },
  computed: {
    ...mapState({
      roleList: state => state.system.roleList,
      companyList: state => state.system.companyList,
    })
  },
  mounted () {
    this.getDepartmentAll()
  },
  methods: {
    ...mapActions(['saveDetailInfo', 'changeEditStatus']),
    changeCompanyInfo (val) {
      console.log('companyInfo', val)
      this.companyInfo = val
    },
    //组织架构树
    getDepartmentAll () {
      let params = {}
      systemManageMirror.getDepartmentAll(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.orgList = result
        }
      })
    },
    changeOrgId (val) {
      this.getDepartmentsByOrganizationId(val)
    },
    // 获取组织架构下的部门
    getDepartmentsByOrganizationId (id) {
      let parmas = {
        id: id
      }
      systemManageMirror.getDepartmentsByOrganizationId(parmas).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.departmentArr = result
        }
      })
    },
    changeDeparmentId (val) {
      this.getJobs(val)
    },
    // 获取部门的职务
    getJobs (id) {
      let parmas = {
        id: id
      }
      systemManageMirror.getJobs(parmas).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.jobArr = result
        }
      })
    },
    recursionItem (item) {
      // 一层一层往下面执行，循环，直到不满足情况的条件下，会自动跳出这个递归方法，然后又到上面方法的源头处，开始执行下一个对象。。。
      if (item.childrenDepartment && item.childrenDepartment.length > 0) {
        item.childrenDepartment = item.childrenDepartment
        item.id = item.id
        item.level = item.level
        item.name = item.name
        item.parentId = item.parentId
        item.remark = item.remark
        item.seq = item.seq
        // 因为三级联动的数据格式是value和label,所以需要自己手动添加，没有的忽略。
        item.childrenDepartment.forEach(ff => {
          // 这里就是判断他的children下面还有没有值，有的话我就要往下挖，就又开始自己调用自己了
          this.recursionItem(ff)
        })
      } else {
        // 这里就是判断，如果我这一层的children下面没有东西的时候该做什么操作 
        item.childrenDepartment = item.childrenDepartment
        item.id = item.id
        item.level = item.level
        item.name = item.name
        item.parentId = item.parentId
        item.remark = item.remark
        item.seq = item.seq // 要添加value和label,否则会看不到标签名字和值
      }
    },
    submitForm () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if (!isPhone(this.ruleForm.phone)) {
            this.$message.error('请输入正确的联系方式')
          } else {
            this.addUser()
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleClose () {
      this.$refs['ruleForm'].resetFields();
      this.$emit('changeProjectBox', false)
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    addUser () {
      let params = {
        companyNumber: this.companyInfo.companyNumber,
        companyId: this.companyInfo.companyId,
        userName: this.ruleForm.userName,
        name: this.ruleForm.name,
        phone: this.ruleForm.phone,
        userPassword: this.ruleForm.userPassword,
        departmentId: this.ruleForm.departmentId,
        jobId: this.ruleForm.jobId,
        roleId: this.ruleForm.roleId,
        status: this.ruleForm.status,
        img: this.ruleForm.img,
        idNumber: this.ruleForm.idNumber,
      }
      systemManageMirror.addUser(params).then(res => {
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
<style lang="less" scoped>
/deep/ .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 68px;
  height: 68px;
  line-height: 68px;
  text-align: center;
}
.avatar {
  width: 68px;
  height: 68px;
  display: block;
}
</style>
