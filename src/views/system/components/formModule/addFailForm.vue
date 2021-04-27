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
                    prop="faulttype">
        <el-select v-model="ruleForm.faulttype"
                   filterable
                   placeholder="请选择故障类型">
          <el-option v-for="item in failTypeList"
                     :key="item.faultId"
                     :label="item.faultName"
                     :value="item.faultId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="维修人员"
                    prop="maintenance">
        <el-select v-model="ruleForm.maintenance"
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
                    prop="auditor">
        <el-select v-model="ruleForm.auditor"
                   filterable
                   placeholder="请选择审批人员">
          <el-option v-for="item in approvePersonList"
                     :key="item.name"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="故障时间"
                    prop="faultTime">
        <el-date-picker v-model="ruleForm.faultTime"
                        type="datetime"
                        style="width: 320px"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择故障时间">
        </el-date-picker>
      </el-form-item>
      <!-- prop="img" -->
      <el-form-item label="现场照片">
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
                    prop="predictTime">
        <el-input placeholder="请输入预计维修用时"
                  v-model="ruleForm.predictTime">
          <template slot="append">小时</template>
        </el-input>
      </el-form-item>
      <el-form-item label="截止时间"
                    prop="lastTime">
        <el-date-picker v-model="ruleForm.lastTime"
                        type="datetime"
                        style="width: 320px"
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
        faulttype: [
          { required: true, message: '请选择故障类型', trigger: 'change' },
        ],
        maintenance: [
          { required: true, message: '请选择维修人员', trigger: 'change' },
        ],
        auditor: [
          { required: true, message: '请选择审批人员', trigger: 'change' },
        ],
        faultTime: [
          { required: true, message: '请选择故障时间', trigger: 'change' },
        ],
        img: [
          { required: true, message: '请选择现场照片', trigger: 'change' },
        ],
        lastTime: [
          { required: true, message: '请选择截止时间', trigger: 'change' },
        ],
        predictTime: [
          { required: true, message: '请输入预计维修时间', trigger: 'blur' },
        ]
      },
      approvePersonList: []
    };
  },
  computed: {
    ...mapState({
      detailInfo: state => state.system.detailInfo,
      failTypeList: state => state.system.failTypeList,
      maintainPersonList: state => state.system.maintainPersonList,
    })
  },
  mounted () {
    this.ruleForm = this.detailInfo
    this.getAuditor()
    console.log('approvePersonList', this.approvePersonList)
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
    //获取审核人列表
    getAuditor () {
      let id = this.detailInfo.deviceId
      systemMirror.getAuditor(id).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.approvePersonList = result
        }
      })
    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleClose () {
      this.$emit('changeProjectBox', false)
    },
    addCompany () {
      let params = {
        faulttype: this.ruleForm.faulttype,
        maintenance: this.ruleForm.maintenance,
        auditor: this.ruleForm.auditor,
        img: this.ruleForm.img,
        predictTime: this.ruleForm.predictTime,
        lastTime: this.ruleForm.lastTime,
        faultTime: this.ruleForm.faultTime,
        deviceNumber: this.detailInfo.deviceNumber,
        deviceId: this.detailInfo.deviceId,
        deviceType: this.detailInfo.deviceType,
      }
      systemMirror.reported(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.$message.success(serviceMessage)
          this.$emit('changeProjectBox', false)
          this.$emit('getList')
          this.saveDetailInfo({})
        }
      })
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
