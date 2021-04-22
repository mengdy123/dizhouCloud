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
    <div class="satisfaction-level">
      评级标准：小于60为差, 60-79为中,80-90为良,大于90为优
    </div>
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="评分"
                    prop="satisfaction">
        <el-input type="input"
                  v-model="ruleForm.satisfaction"
                  placeholder="请输入评分">
        </el-input>
      </el-form-item>
      <el-form-item label="文字评价">
        <el-input type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入文字评价"
                  v-model="ruleForm.textarea2">
        </el-input>
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
      ruleForm: {
        handleType: '1'
      },
      rules: {
        satisfaction: [
          { required: true, message: '请选择故障类型', trigger: 'change' },
        ],
      },
      disabledMaintain: true,
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
.satisfaction-level {
  font-size: 12px;
  color: #666666;
  padding: 0px 0px 10px 30px;
}
</style>
