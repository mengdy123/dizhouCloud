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
      <el-form-item label="设备型号"
                    prop="versiontypeName">
        <el-input v-model="ruleForm.versiontypeName"
                  placeholder="请输入设备型号"></el-input>

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
import { number } from 'echarts';
export default {
  props: {
    seriesId: {
      type: Number,
      default: 0
    }
  },
  data () {
    var checkNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入行业编号'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字'));
        } else {
          let valueString = value.toString()
          if (valueString.length !== 2) {
            callback(new Error('行业编号必须是2位数字'));
          } else {
            callback();
          }
        }
      }, 500);
    };
    return {
      ruleForm: {},
      rules: {
        versiontypeName: [
          { required: true, message: '请输入设备型号', trigger: 'blur' },
        ],
      }
    };
  },
  computed: {
    ...mapState({
      detailInfo: state => state.system.detailInfo,
    })
  },
  mounted () {
    this.ruleForm = this.detailInfo
    // updateIndutry
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
    handleClose () {
      this.$refs['ruleForm'].resetFields();
      this.$emit('changeProjectBox', false)
      this.saveDetailInfo({})
    },
    addCompany () {
      let params = {
        ...this.ruleForm,
        seriesId: this.seriesId
      }
      params.createTime = ''
      params.updateTime = ''

      systemMirror.addVersiontype(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.$message.success(serviceMessage)
          this.$emit('getModelList', this.seriesId)
          this.$emit('getSeriesList',)
          this.$emit('changeProjectBox', false)
          this.saveDetailInfo({})
        }
      })
    }
  }
}
</script>
