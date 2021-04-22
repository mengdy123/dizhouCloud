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
      <el-form-item label="故障类型"
                    prop="failType">
        <el-select v-model="ruleForm.failType"
                   filterable
                   placeholder="请选择故障类型">
          <el-option v-for="item in failTypeList"
                     :key="item.name"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="维修人员"
                    prop="maintainPerson">
        <el-select v-model="ruleForm.maintainPerson"
                   filterable
                   placeholder="请选择维修人员">
          <el-option v-for="item in maintainPersonList"
                     :key="item.name"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审批人员"
                    prop="approvePerson">
        <el-select v-model="ruleForm.approvePerson"
                   filterable
                   placeholder="请选择维修人员">
          <el-option v-for="item in approvePersonList"
                     :key="item.name"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="故障时间"
                    prop="failTime">
        <el-date-picker v-model="ruleForm.failTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择故障时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="现场照片"
                    prop="photo">
        <el-upload action="https://jsonplaceholder.typicode.com/posts/"
                   list-type="picture-card"
                   :on-preview="handlePictureCardPreview"
                   :limit="3"
                   :multiple='true'
                   :auto-upload='false'
                   :file-list="fileList"
                   :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible"
                   :modal='false'
                   :modal-append-to-body='true'
                   :close-on-click-modal='false'>
          <img width="100%"
               :src="dialogImageUrl"
               alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="预计用时"
                    prop="useTime">
        <el-input placeholder="请输入预计维修用时"
                  v-model="ruleForm.useTime">
          <template slot="append">小时</template>
        </el-input>
      </el-form-item>
      <el-form-item label="截止时间"
                    prop="endTime">
        <el-date-picker v-model="ruleForm.endTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择截止时间">
        </el-date-picker>
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
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      ruleForm: {},
      rules: {
        failType: [
          { required: true, message: '请选择故障类型', trigger: 'change' },
        ],
        maintainPerson: [
          { required: true, message: '请选择维修人员', trigger: 'change' },
        ],
        approvePerson: [
          { required: true, message: '请选择审批人员', trigger: 'change' },
        ],
        failTime: [
          { required: true, message: '请选择故障时间', trigger: 'change' },
        ],
        photo: [
          { required: true, message: '请选择现场照片', trigger: 'change' },
        ],
        endTime: [
          { required: true, message: '请选择截止时间', trigger: 'change' },
        ],
        useTime: [
          { required: true, message: '请输入预计维修时间', trigger: 'blur' },
        ]
      },
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
  },
  methods: {
    ...mapActions(['saveDetailInfo']),
    submitForm () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.addCompany()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleClose () {
      this.$refs['ruleForm'].resetFields();
      this.$emit('changeProjectBox', false)
      this.saveDetailInfo({})
    },
    addCompany () {
      let id = this.$route.query.id
      let params = {
        ...this.ruleForm,
        deviceTypeId: id
      }
      params.createTime = ''
      params.updateTime = ''
      if (params.seriesId) {
        systemMirror.updateSeries(params).then(res => {
          let { code, result, serviceMessage } = res.data
          if (code === 200) {
            this.$message.success(serviceMessage)
            this.$emit('changeProjectBox', false)
            this.saveDetailInfo({})
          }
        })
      } else {
        systemMirror.addSeriesType(params).then(res => {
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
}
</script>
<style lang="less" scoped>
/deep/ .el-upload--picture-card,
/deep/ .el-upload-list--picture-card .el-upload-list__item {
  width: 100px;
  height: 100px;
  line-height: 100px;
}
</style>
