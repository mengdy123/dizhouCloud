<template>
  <div class="form-module">
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="系统名称"
                    prop="systemTypeName">
        <el-input v-model="ruleForm.systemTypeName"
                  placeholder="请输入系统名称"></el-input>
      </el-form-item>
      <!-- <el-form-item label="系统类型"
                    prop="systemType">
        <el-select v-model="ruleForm.systemType"
                   placeholder="请选择系统类型">
          <el-option v-for="item in systemType"
                     :label="item.name"
                     :key="item.id"
                     :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
     <el-form-item label="所属项目"
                    prop="projectId">
        <el-select v-model="ruleForm.projectId"
                   placeholder="请选择所属项目">
          <el-option v-for="item in projectList"
                     :label="item.projectName"
                     :key="item.projectId"
                     :value="item.projectId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目类型">
        <el-select v-model="ruleForm.industry"
                   placeholder="请选择项目类型">
          <el-option v-for="item in projectType"
                     :label="item.name"
                     :key="item.id"
                     :value="item.id">
          </el-option>
        </el-select>
      </el-form-item> -->
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
      ruleForm: {
      },
      rules: {
        systemTypeName: [
          { required: true, message: '请输入系统名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        systemType: [
          { required: true, message: '请选择系统类型', trigger: 'change' },
        ],
        projectId: [
          { required: true, message: '请选择所属项目', trigger: 'change' },
        ],
      }
    };
  },
  computed: {
    ...mapState({
      detailInfo: state => state.system.detailInfo,
      projectType: state => state.common.projectType,
      systemType: state => state.common.systemType,
      projectList: state => state.system.projectList,
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
          this.addSystem()
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
    addSystem () {
      let params = {
        ...this.ruleForm,
      }
      systemMirror.addSystemType(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.$emit('changeProjectBox', false)
          this.$emit('getList')
          this.$message.success(serviceMessage)
        }
      })
    }
  }
}
</script>