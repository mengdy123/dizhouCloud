<template>
  <div class="form-module">
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="系统类型"
                    prop="systemId">
        <el-select v-model="ruleForm.systemId"
                   placeholder="请选择系统类型"
                   @change="changeDeviceByType('system',$event)">
          <el-option v-for="item in systemList"
                     :label="item.systemTypeName"
                     :key="item.systemTypeId"
                     :value="item.systemTypeId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备类型"
                    prop="deviceType">
        <el-select v-model="ruleForm.deviceType"
                   placeholder="请选择设备类型"
                   @change="changeDeviceByType('type',$event)">
          <el-option v-for="item in deviceTypeList"
                     :label="item.deviceTypeName"
                     :key="item.deviceTypeId"
                     :value="item.deviceTypeId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备系列"
                    prop="series">
        <el-select v-model="ruleForm.series"
                   placeholder="请选择设备系列"
                   @change="changeDeviceByType('series',$event)">
          <el-option v-for="item in seriesList"
                     :label="item.seriesName"
                     :key="item.seriesId"
                     :value="item.seriesId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备型号"
                    prop="versionType">
        <el-select v-model="ruleForm.versionType"
                   placeholder="请选择设备型号">
          <el-option v-for="item in modelList"
                     :label="item.versiontypeName"
                     :key="item.versionTypeId"
                     :value="item.versionTypeId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备编号"
                    prop="deviceNumber">
        <el-input v-model="ruleForm.deviceNumber"
                  placeholder="请输入设备编号"></el-input>
      </el-form-item>
      <el-form-item label="安装区域"
                    prop="installationArea">
        <el-input v-model="ruleForm.installationArea"
                  placeholder="请输入安装区域"> </el-input>
      </el-form-item>
      <el-form-item label="安装位置"
                    prop="installationSite">
        <el-input v-model="ruleForm.installationSite"
                  placeholder="请输入安装位置"></el-input>
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
import { isPhone } from '@/utils/validate'
export default {
  data () {
    return {
      addressInfo: {},
      ruleForm: {
      },
      rules: {
        // deviceType: [
        //   { required: true, message: '请选择设备类型', trigger: 'change' },
        // ],
        // systemId: [
        //   { required: true, message: '请选择系统类型', trigger: 'change' },
        // ],
        // series: [
        //   { required: true, message: '请选择设备系列', trigger: 'change' },
        // ],
        // versionType: [
        //   { required: true, message: '请选择设备型号', trigger: 'change' },
        // ],
        // deviceNumber: [
        //   { required: true, message: '请输入设备编号', trigger: 'blur' },
        // ],
        // installationSite: [
        //   { required: true, message: '请输入安装位置', trigger: 'blur' },
        // ],
        // installationArea: [
        //   { required: true, message: '请输入安装区域', trigger: 'blur' }
        // ],
      },
      systemList: [],
      deviceTypeList: [],
      seriesList: [],
      modelList: [],
    };
  },
  computed: {
    ...mapState({
      detailInfo: state => state.system.detailInfo,
      projectType: state => state.common.projectType,
      projectStatus: state => state.common.projectStatus,
      projectAddress: state => state.system.projectAddress
    })
  },
  mounted () {
    this.getListSystemType()
    console.log(' this.detailInfo', this.detailInfo)
  },
  methods: {
    submitForm () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.addProjectSetFun()
        } else {
          console.log('error submit!!');
          return false
        }
      });
    },
    handleClose () {
      this.$refs['ruleForm'].resetFields();
      this.$emit('changeProjectBox', false)
    },
    changeDeviceByType (type, val) {
      console.log(val);
      console.log(type);
      let name = type
      switch (name) {
        case 'system':
          this.getListByDevice(val)
          break;
        case 'type':
          this.getSeriesList(val)
          break;
        case 'series':
          this.getModelList(val)
          break;
      }
    },
    //获取系统列表
    getListSystemType () {
      let params = {
        projectId: this.detailInfo.id,
      }
      systemMirror.getListSystemType(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.systemList = result
          console.log('获取系统类型', result)
        }
      })
    },
    //获取设备类型
    getListByDevice (id) {
      let params = {
        projectId: this.detailInfo.id,
        systemTypeId: id
      }
      systemMirror.getListRelationBySystemTypeId(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.deviceTypeList = result
          console.log('获取设备类型', result)
        }
      })
    },
    //获取设备系列列表
    getSeriesList (id) {
      let params = {
        projectId: this.detailInfo.id,
        deviceTypeId: id
      }
      systemMirror.getListRelationByDeviceTypeId(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.seriesList = result
          console.log('获取设备系列列表', result)
        }
      })
    },
    //获取设备型号
    getModelList (id) {
      // console.log('id', id)
      let params = {
        projectId: this.detailInfo.id,
        seriesId: id
      }
      systemMirror.getListRelationBySeriesId(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.modelList = result
          console.log('获取设备型号', result)
        }
      })
    },
    addProjectSetFun () {
      let params = {
        ...this.ruleForm,
      }
      console.log('ruleForm', params)
      systemMirror.addDevice(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.$message.success(serviceMessage)
          this.$emit('changeProjectBox', false)
        }
      })
    },
  }
}
</script>