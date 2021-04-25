<template>
  <div class="dz-system">
    <div class="dz-system-title">运维日志</div>
    <div class="dz-system-search">
      <div class="dz-system-search-ruleForm">
        <el-form :model="ruleForm"
                 ref="ruleForm"
                 label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="设备类型">
            <el-select v-model="ruleForm.deviceTypeId"
                       placeholder="请选择设备类型"
                       @change="changeDeviceByType('type',$event)">
              <el-option v-for="item in deviceTypeList"
                         :label="item.deviceTypeName"
                         :key="item.deviceTypeId"
                         :value="item.deviceTypeId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备系列">
            <el-select v-model="ruleForm.seriesId"
                       placeholder="请选择设备系列"
                       @change="changeDeviceByType('series',$event)">
              <el-option v-for="item in seriesList"
                         :label="item.seriesName"
                         :key="item.seriesId"
                         :value="item.seriesId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备型号">
            <el-select v-model="ruleForm.versiontypeId"
                       placeholder="请选择设备型号"
                       @change="changeDeviceByType('model',$event)">
              <el-option v-for="item in modelList"
                         :label="item.versiontypeName"
                         :key="item.versiontypeId"
                         :value="item.versiontypeId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备编号">
            <el-select v-model="ruleForm.deviceId"
                       placeholder="请选择设备编号"
                       @change="changeDeviceByType('code',$event)">
              <el-option v-for="item in deviceList"
                         :label="item.deviceName"
                         :key="item.deviceId"
                         :value="item.deviceId"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="button-list">
          <el-button type="primary"
                     @click="submitForm('ruleForm')">搜索</el-button>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import systemMirror from '@/resource/systemMirror'
import { mapState, mapActions } from 'vuex'
import timeReg from '@/utils/timeReg'
import myTable from "@/components/Table";
import addBreakdown from '../../components/formModule/addBreakdown'
export default {
  components: { myTable, addBreakdown },
  data () {
    return {
      ruleForm: {},
      seriesList: [],
      modelList: [],
      deviceList: []
    };
  },
  computed: {
    ...mapState({
      projectType: state => state.common.projectType,
      projectStatus: state => state.common.projectStatus,
      deviceTypeList: state => state.system.deviceTypeList,
    })
  },
  mounted () {
    this.getListByDevice()
  },
  methods: {
    ...mapActions(['saveDeviceTypeList']),
    changeDeviceByType (type, val) {
      console.log(val);
      console.log(type);
      let name = type
      switch (name) {
        case 'type':
          console.log('1111')
          this.getSeriesList(val)
          break;
        case 'series':
          this.getModelList(val)
          console.log('2222')
          break;
        case 'model':
          console.log('3333')
          break;
        case 'code':
          console.log('4444 ')
          break;

      }
    },
    //获取设备类型
    getListByDevice () {
      let params = {
        currentPage: 1,
        pageSize: 10000,
      }
      systemMirror.getListByDevice(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.saveDeviceTypeList(result.content)
        }
      })
    },
    //获取设备系列列表
    getSeriesList (id) {
      let params = {
        deviceTypeId: id,
        currentPage: 1,
        pageSize: 10000,
      }
      systemMirror.getListBySeries(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.seriesList = result.content
          // console.log('result.content', result.content)
        }
      })
    },
    //获取设备型号
    getModelList (id) {
      console.log('id', id)
      let params = {
        seriesId: id,
        currentPage: 1,
        pageSize: 10000,
      }
      systemMirror.getListByVer(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          // this.$nextTick(() => {
          this.modelList = result.content
          console.log('result', result.content)
          // })

        }
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getProgectList()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm () {
      this.$refs['ruleForm'].resetFields();
    },
  },
}
</script>
<style lang="less" scoped>
</style>
