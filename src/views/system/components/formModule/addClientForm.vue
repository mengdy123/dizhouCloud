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
      <el-form-item label="客户名称"
                    prop="companyName">
        <el-input v-model="ruleForm.companyName"
                  placeholder="请输入客户名称"></el-input>
      </el-form-item>
      <el-form-item label="客户简称"
                    prop="companyShortName">
        <el-input v-model="ruleForm.companyShortName"
                  placeholder="请输入客户简称"></el-input>
      </el-form-item>
      <el-form-item label="客户编号"
                    prop="companyNumber">
        <el-input v-model.number="ruleForm.companyNumber"
                  placeholder="请输入5位客户编号"></el-input>
      </el-form-item>
      <el-form-item label="项目"
                    prop="project">
        <el-select v-model="ruleForm.project"
                   filterable
                   placeholder="请选择项目">
          <el-option v-for="item in projectList"
                     :key="item.name"
                     :label="item.name"
                     :value="item.id">
          </el-option>
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
          if (valueString.length !== 5) {
            callback(new Error('客户编号必须是5位数字'));
          } else {
            callback();
          }
        }
      }, 500);
    };
    return {
      ruleForm: {},
      rules: {
        companyName: [
          { required: true, message: '请输入客户名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        companyShortName: [
          { required: true, message: '请输入客户简称', trigger: 'blur' },
        ],
        companyNumber: [
          { required: true, validator: checkNum, trigger: 'blur' },
        ]
      },
      projectList: [
        {
          name: '项目1',
          id: '1'
        }
      ]
    };
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
      let params = {
        ...this.ruleForm,
      }
      systemMirror.addCompany(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.$message.success(serviceMessage)
          this.$emit('changeProjectBox', false)
          this.saveDetailInfo({})
        }
      })
    }
  }
}
</script>
