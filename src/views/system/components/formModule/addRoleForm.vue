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
      <el-form-item label="角色名"
                    prop="roleName">
        <el-input v-model="ruleForm.roleName"
                  placeholder="请输入角色名"></el-input>
      </el-form-item>

      <el-form-item label="权限"
                    prop='permissionId'>
        <el-select v-model="ruleForm.permissionId"
                   placeholder="请选择权限">
          <el-option v-for="(item, index) in powerList"
                     :key="index"
                     :label="item.permissionName"
                     :value="item.id"></el-option>
        </el-select>
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
        status: '1',
        imageUrl: ''
      },
      rules: {
        roleName: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
        ],
        permissionId: [
          { required: true, message: '请选择用户角色', trigger: 'change' },
        ],
      },
      powerList: []
    };
  },
  computed: {
    ...mapState({
      // powerList: state => state.system.powerList,
      detailInfo: state => state.system.detailInfo,
    })
  },
  mounted () {
    this.ruleForm = this.detailInfo
    this.getPowerList()
  },
  methods: {
    ...mapActions(['savePowerList']),
    submitForm () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.addRole()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getPowerList () {
      let params = {
        currentPage: 1,
        pageSize: 100000,
      }
      systemManageMirror.getPowerPermissionAll(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.powerList = result.content
        }
      })
    },
    handleClose () {
      this.$refs['ruleForm'].resetFields();
      this.$emit('changeProjectBox', false)
      this.saveDetailInfo({})
    },
    addRole () {
      let params = {
        ...this.ruleForm,
      }
      if (this.ruleForm.id) {
        systemManageMirror.updateRoleById(params).then(res => {
          let { code, result, serviceMessage } = res.data
          if (code === 200) {
            this.$emit('changeProjectBox', false)
            this.$emit('getList')
            this.$message.success(serviceMessage)
          }
        })
      } else {
        systemManageMirror.addRole(params).then(res => {
          let { code, result, serviceMessage } = res.data
          if (code === 200) {
            this.$emit('changeProjectBox', false)
            this.$emit('getList')
            this.$message.success(serviceMessage)
          }
        })
      }

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
