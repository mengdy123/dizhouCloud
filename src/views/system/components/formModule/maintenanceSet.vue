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
      <el-form-item label="设备等级"
                    prop="level">
        <el-select v-model="ruleForm.level"
                   filterable
                   placeholder="请选择设备等级">
          <el-option v-for="item in deviceLevelList"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="维修人员"
                    prop="maintenance">
        <el-select v-model="ruleForm.maintenance"
                   placeholder="请选择维修人员">
          <el-option v-for="item in userList"
                     :key="item.id"
                     :label='`${item.name}` + "--" + `${item.phone}`'
                     :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审批人员"
                    prop="auditor">
        <el-select v-model="ruleForm.auditor"
                   placeholder="请选择审批人员">
          <el-option v-for="item in userList"
                     :key="item.id"
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
import systemManageMirror from '@/resource/systemManageMirror'
import systemMirror from '@/resource/systemMirror'
export default {
  props: {
    treeInfo: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      deviceLevelList: [
        {
          name: '一级',
          id: '1'
        },
        {
          name: '二级',
          id: '2'
        }
      ],
      ruleForm: {},
      rules: {
        level: [
          { required: true, message: '请选择设备等级', trigger: 'change' },
        ],
        maintenance: [
          { required: true, message: '请选择维修人员', trigger: 'change' },
        ],
        auditor: [
          { required: true, message: '请选择审批人员', trigger: 'change' },
        ],
      },
      userList: []
    };
  },
  computed: {
    ...mapState({
      detailInfo: state => state.system.detailInfo,
      failTypeList: state => state.system.failTypeList,
      maintainPersonList: state => state.system.maintainPersonList,
      approvePersonList: state => state.system.approvePersonList,
    })
  },
  mounted () {
    this.ruleForm = this.detailInfo
    this.getList()
    console.log('treeInfo', this.treeInfo)
  },
  methods: {
    ...mapActions(['saveDetailInfo']),
    submitForm () {
      console.log('this.ruleForm.faultId', this.ruleForm)
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.addCompany()
        } else {
          console.log('error submit!!');
          return false
        }
      });
    },
    getList () {
      let params = {
        seek: '',
        currentPage: 1,
        pageSize: 1000000,
      }
      systemManageMirror.getListBySeek(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.userList = result.content
        }
      })
    },
    handleClose () {
      this.$refs['ruleForm'].resetFields();
      this.$emit('changeProjectBox', false)
      this.saveDetailInfo({})
    },
    addCompany () {
      let params = Object.assign({}, this.treeInfo)
      params.level = this.ruleForm.level // 设备级别
      params.maintenance = this.ruleForm.maintenance
      params.auditor = this.ruleForm.auditor
      console.log('params', params)
      systemMirror.setMaintainManage(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.$message.success(serviceMessage)
          this.$emit('changeProjectBox', false)
        }
      })

    }
  }
}
</script>
