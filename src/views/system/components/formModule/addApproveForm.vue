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
                   disabled
                   placeholder="请选择故障类型">
          <el-option v-for="item in failTypeList"
                     :key="item.faultId"
                     :label="item.faultName"
                     :value="item.faultId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="安装区域"
                    prop="installationArea">
        <el-input v-model="ruleForm.installationArea"
                  placeholder='请输入安装区域'
                  disabled />
      </el-form-item>
      <el-form-item label="维修人员"
                    prop="maintenance">
        <el-select v-model="ruleForm.maintenance"
                   :disabled='disabledMaintain'
                   placeholder="请选择维修人员">
          <el-option v-for="item in maintainPersonList"
                     :key="item.name"
                     :label='`${item.name}` + "--" + `${item.phone}`'
                     :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审批人员"
                    prop="auditor">
        <el-select v-model="ruleForm.auditor"
                   :disabled='disabledMaintain'
                   filterable
                   placeholder="请选择维修人员">
          <el-option v-for="item in approvePersonList"
                     :key="item.name"
                     :label='`${item.name}` + "--" + `${item.phone}`'
                     :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="故障时间"
                    prop="faultTime">
        <el-date-picker v-model="ruleForm.faultTime"
                        type="datetime"
                        disabled
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择故障时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="现场照片">
        <el-upload action="https://jsonplaceholder.typicode.com/posts/"
                   list-type="picture-card"
                   :on-preview="handlePictureCardPreview"
                   :limit="3"
                   disabled
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
                  v-model="ruleForm.predictTime"
                  disabled>
          <template slot="append">小时</template>
        </el-input>
      </el-form-item>
      <el-form-item label="截止时间"
                    prop="lastTime">
        <el-date-picker v-model="ruleForm.lastTime"
                        disabled
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择截止时间">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="维修时间"
                    v-if="disabledMaintain">
        <el-date-picker v-model="ruleForm.maintainTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择维修时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="处理方式"
                    v-if="disabledMaintain">
        <el-select v-model="ruleForm.handleType"
                   filterable
                   placeholder="请选择处理方式">
          <el-option v-for="item in handleTypeList"
                     :key="item.name"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细过程"
                    v-if="disabledMaintain">
        <el-input type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入维修详细过程"
                  v-model="ruleForm.textarea2">
        </el-input>
      </el-form-item>
    </el-form>
    <div class="form-footer"
         v-if="disabledMaintain">
      <el-button type="primary"
                 @click="submitForm">确 定</el-button>
      <el-button @click="handleClose">取 消</el-button>
    </div>
    <div class="form-footer"
         v-if="!disabledMaintain">
      <el-button type="primary"
                 @click="submitForm">同 意</el-button>
      <!-- <el-button @click="handleClose">拒 绝</el-button> -->
      <el-button @click="handleClose">取 消</el-button>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import systemMirror from '@/resource/systemMirror'
export default {
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      ruleForm: {},
      rules: {
        installationArea: [
          { required: true, message: '请输入安装区域', trigger: 'blur' },
        ],
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
      disabledMaintain: true,
      handleTypeList: [
        {
          name: '维修',
          id: '1'
        },
        {
          name: '更换',
          id: '2'
        }
      ]
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
    this.ruleForm.faulttype = Number(this.ruleForm.faulttype)
    this.ruleForm.maintenance = Number(this.ruleForm.maintenance)
    this.ruleForm.auditor = Number(this.ruleForm.auditor)
    this.ruleForm.installationArea = this.detailInfo.installationArea || '无'
    console.log('this.detailInfo', this.detailInfo)
    console.log('this.ruleForm', this.ruleForm)
    if (this.name === '维修') {
      this.disabledMaintain = true
    } else {
      this.disabledMaintain = false
    }
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
      let status
      if (this.name === '维修') {
        status = '3'
      } else if (this.name === '审批') {
        status = '2'
      }
      let params = {
        id: this.detailInfo.id,
        status: status,
      }
      console.log('this.detailInfo', this.detailInfo)
      systemMirror.updateWord(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.$message.success(serviceMessage)
          this.$emit('getList')
          this.$emit('changeProjectBox', false)
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
