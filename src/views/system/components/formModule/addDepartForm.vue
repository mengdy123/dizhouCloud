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
      <el-form-item label="类型"
                    prop="type"
                    v-if="!editStatus">
        <el-select v-model="ruleForm.type"
                   placeholder="类型">
          <el-option v-for="item in shareholderTypeOptions"
                     :key="item.value"
                     :label="item.labelZh"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称"
                    prop="name">
        <el-input placeholder="输入名称"
                  v-model="ruleForm.name"></el-input>
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
import { Loading } from "element-ui";
export default {
  data () {
    return {
      ruleForm: {
        type: 2,
      },
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" }
        ],
      },
      shareholderTypeOptions: [
        {
          labelEn: "organization",
          labelZh: "组织架构",
          value: 1
        },
        {
          labelEn: "depart",
          labelZh: "部门",
          value: 2
        },
        {
          labelEn: "duty",
          labelZh: "职务",
          value: 3
        }
      ],
    };
  },
  computed: {
    ...mapState({
      detailInfo: state => state.system.detailInfo,
      editStatus: state => state.system.editStatus,
    })
  },
  mounted () {
    this.ruleForm = this.detailInfo
  },
  methods: {
    ...mapActions(['saveDetailInfo']),
    submitForm () {
      let loading = Loading.service();
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if (this.editStatus && !this.detailInfo.code) {
            this.updateDepartment();
          } else {
            this.addDepartment();
          }
        } else {
          loading.close();
        }
      });
    },
    handleClose () {
      this.$refs['ruleForm'].resetFields();
      this.$emit('changeProjectBox', false)
    },
    //新增 修改
    addDepartment () {
      let loading = Loading.service();
      let params = {}
      if (this.detailInfo.code) {
        params = {
          name: this.ruleForm.name,
          parentId: 0,
          level: '1',
          seq: 1,
          remark: ""
        }
      } else {
        params = {
          name: this.ruleForm.name,
          parentId: this.detailInfo.id,
          level: this.ruleForm.type,
          seq: 1,
          remark: ""
        }
      }
      systemManageMirror.addDepartment(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.$emit('changeProjectBox', false)
          this.$emit('getList')
          loading.close();
          this.$message.success(serviceMessage)
        }
      })
    },
    updateDepartment () {
      let loading = Loading.service();
      let params = {
        name: this.ruleForm.name,
        parentId: this.detailInfo.parentId,
        id: this.ruleForm.id,
        level: this.detailInfo.level,
        seq: this.detailInfo.seq,
        remark: this.detailInfo.remark
      }
      systemManageMirror.updateDepartment(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.$emit('changeProjectBox', false)
          this.$emit('getList')
          loading.close();
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
