<template>
  <div class="cascader-table">
    <div class="cascader-table-list">
      <div class="cascader-table-list-title">
        <ul>
          <li>
            <el-checkbox :indeterminate="isIndeterminate"
                         v-model="checkAllSystem"
                         @change="handleCheckAll('system',$event)">全选</el-checkbox>
          </li>
          <!-- <li>
            系统编号
          </li> -->
          <li>系统类型</li>
        </ul>
      </div>
      <div class="cascader-table-list-li">
        <el-checkbox-group v-model="checkedSystem"
                           @change="changeChecked('system',$event)">
          <li>
            <el-checkbox v-for="item in systemList"
                         :label="item.systemId"
                         :key="item.systemId">{{item.systemName}}</el-checkbox>
          </li>
        </el-checkbox-group>
      </div>
    </div>

    <div class="cascader-table-list">
      <div class="cascader-table-list-title">
        <ul>
          <li>
            <el-checkbox :indeterminate="isIndeterminateDeviceType"
                         v-model="checkAllDeviceType"
                         @change="handleCheckAll('deviceType',$event)">全选</el-checkbox>
          </li>
          <!-- <li>
            系统编号
          </li> -->
          <li>设备类型</li>
        </ul>
      </div>
      <div class="cascader-table-list-li">
        <el-checkbox-group v-model="checkedDeviceType"
                           @change="changeChecked('deviceType',$event)">
          <li>
            <el-checkbox v-for="item in deviceTypeList"
                         :label="item.deviceTypeId"
                         :key="item.deviceTypeId">{{item.deviceTypeName}}</el-checkbox>
          </li>
        </el-checkbox-group>
      </div>
    </div>

    <div class="cascader-table-list">
      <div class="cascader-table-list-title">
        <ul>
          <li>
            <el-checkbox :indeterminate="isIndeterminateSeries"
                         v-model="checkAllSeries"
                         @change="handleCheckAll('series',$event)">全选</el-checkbox>
          </li>
          <!-- <li>
            系统编号
          </li> -->
          <li>设备系列</li>
        </ul>
      </div>
      <div class="cascader-table-list-li">
        <el-checkbox-group v-model="checkedSeries"
                           @change="changeChecked('series',$event)">
          <li>
            <el-checkbox v-for="item in seriesList"
                         :label="item.seriesId"
                         :key="item.seriesId">{{item.seriesName}}</el-checkbox>
          </li>
        </el-checkbox-group>
      </div>
    </div>

    <div class="cascader-table-list">
      <div class="cascader-table-list-title">
        <ul>
          <li>
            <el-checkbox :indeterminate="isIndeterminateModel"
                         v-model="checkAllModel"
                         @change="handleCheckAll('model',$event)">全选</el-checkbox>
          </li>
          <!-- <li>
            系统编号
          </li> -->
          <li>设备型号</li>
        </ul>
      </div>
      <div class="cascader-table-list-li">
        <el-checkbox-group v-model="checkedModel"
                           @change="changeChecked('model',$event)">
          <li>
            <el-checkbox v-for="item in modelList"
                         :label="item.versiontypeId"
                         :key="item.versiontypeId">{{item.versiontypeName}}</el-checkbox>
          </li>
        </el-checkbox-group>
      </div>
    </div>

    <div class="cascader-table-list">
      <div class="cascader-table-list-title">
        <ul>
          <li>
            <el-checkbox :indeterminate="isIndeterminateDevice"
                         v-model="checkAllDevice"
                         @change="handleCheckAll('device',$event)">全选</el-checkbox>
          </li>
          <!-- <li>
            系统编号
          </li> -->
          <li>设备</li>
        </ul>
      </div>
      <div class="cascader-table-list-li">
        <el-checkbox-group v-model="checkedDevice"
                           @change="changeChecked('device',$event)">
          <li>
            <el-checkbox v-for="item in deviceList"
                         :label="item.deviceId"
                         :key="item.deviceId">{{item.deviceNumber}}</el-checkbox>
          </li>
        </el-checkbox-group>
      </div>
    </div>
  </div>
</template>
<script>
import systemMirror from '@/resource/systemMirror'
import { mapState, mapActions } from 'vuex'
import timeReg from '@/utils/timeReg'
export default {
  props: {
    projectId: {
      type: String,
      default: '1'
    }
  },
  data () {
    return {
      checkAllSystem: false,//全选 ---系统
      checkAllDeviceType: false,  //全选
      checkAllSeries: false,//全选
      checkAllModel: false,
      checkAllDevice: false,
      checkedSystem: [],//绑定选中  ---系统
      checkedDeviceType: [],//绑定选中
      checkedSeries: [],//绑定选中
      checkedModel: [],
      checkedDevice: [],
      systemList: [], // 引用的数据 ---系统
      deviceTypeList: [],// 引用的数据
      seriesList: [],// 引用的数据
      modelList: [],
      deviceList: [],
      isIndeterminate: false, //-- - 系统
      isIndeterminateDeviceType: false,
      isIndeterminateSeries: false,
      isIndeterminateModel: false,
      isIndeterminateDevice: false,
      systemListData: [], //系统数据源
      deviceTypeListData: [], //数据源
      seriesListData: [], //数据源
      modelListData: [], //数据源
      deviceListData: [], //数据源

    }
  },
  mounted () {

  },

  methods: {
    //全选
    handleCheckAll (type, val) {
      console.log('val', val)
      switch (type) {
        case 'system':
          this.systemList.forEach(item => {  //当全选被选中的时候，循环遍历源数据，把数据的每一项加入到默认选中的数组去
            this.systemListData.push(item.systemId)
          })
          this.checkedSystem = val ? this.systemListData : [];
          this.isIndeterminate = false;
          break;
        case 'deviceType':
          this.deviceTypeList.forEach(item => {  //当全选被选中的时候，循环遍历源数据，把数据的每一项加入到默认选中的数组去
            this.checkedDeviceType.push(item.deviceTypeId)
          })
          this.checkedDeviceType = val ? this.checkedDeviceType : [];
          this.isIndeterminateDeviceType = false;
          break;
        case 'series':
          this.seriesList.forEach(item => {  //当全选被选中的时候，循环遍历源数据，把数据的每一项加入到默认选中的数组去
            this.checkedSeries.push(item.seriesId)
          })
          this.checkedSeries = val ? this.checkedSeries : [];
          this.isIndeterminateSeries = false;
          break;
        case 'model':
          this.modelList.forEach(item => {  //当全选被选中的时候，循环遍历源数据，把数据的每一项加入到默认选中的数组去
            this.checkedModel.push(item.versiontypeId)
          })
          this.checkedModel = val ? this.checkedModel : [];
          this.isIndeterminateModel = false;
          break;
        case 'device':
          this.deviceList.forEach(item => {  //当全选被选中的时候，循环遍历源数据，把数据的每一项加入到默认选中的数组去
            this.checkedDevice.push(item.deviceId)
          })
          this.checkedDevice = val ? this.checkedDevice : [];
          this.isIndeterminateDevice = false;
          break;

        default:
          break;
      }
    },
    // 选中
    changeChecked (type, value) {
      console.log('选中---value', value)
      console.log('选中---checked', event.target.checked)
      // console.log('选中---checkedSystem', this.checkedSystem)
      // console.log('选中---checkedDeviceType', this.checkedDeviceType)
      // console.log('选中---checkedSeries', this.checkedSeries)
      // console.log('选中---checkedModel', this.checkedModel)
      // console.log('选中---checkedDevice', this.checkedDevice)
      let checkedCount = value.length;
      switch (type) {
        case 'system':
          this.checkAllSystem = checkedCount === this.systemList.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.systemList.length;
          let params1 = {
            projectId: this.projectId,
            systemId: this.checkedSystem[this.checkedSystem.length - 1]
          }
          if (this.checkedSystem.length) {
            this.getListTypeBySystem(params1)
          }
          break;
        case 'deviceType':
          this.checkAllDeviceType = checkedCount === this.deviceTypeList.length;
          this.isIndeterminateDeviceType = checkedCount > 0 && checkedCount < this.deviceTypeList.length;
          let params2 = {
            projectId: this.projectId,
            systemId: this.checkedSystem[this.checkedSystem.length - 1],
            deviceTypeId: this.checkedDeviceType[this.checkedDeviceType.length - 1],
          }
          if (this.checkedDeviceType.length) {
            this.getListTypeByDevice(params2)
          }
          break;
        case 'series':
          this.checkAllSeries = checkedCount === this.seriesList.length;
          this.isIndeterminateSeries = checkedCount > 0 && checkedCount < this.seriesList.length;
          let params3 = {
            projectId: this.projectId,
            systemId: this.checkedSystem[this.checkedSystem.length - 1],
            deviceTypeId: this.checkedDeviceType[this.checkedDeviceType.length - 1],
            seriesId: this.checkedSeries[this.checkedSeries.length - 1],
          }
          if (this.checkedSeries.length) {
            this.getListTypeBySeries(params3)
          }
          break;
        case 'model':
          this.checkAllModel = checkedCount === this.modelList.length;
          this.isIndeterminateModel = checkedCount > 0 && checkedCount < this.modelList.length;
          let params4 = {
            projectId: this.projectId,
            systemId: this.checkedSystem[this.checkedSystem.length - 1],
            deviceTypeId: this.checkedDeviceType[this.checkedDeviceType.length - 1],
            seriesId: this.checkedSeries[this.checkedSeries.length - 1],
            versiontype: this.checkedModel[this.checkedModel.length - 1],
          }
          if (this.checkedSeries.length) {
            this.getListTypeByVersion(params4)
          }
          break;
        case 'device':
          this.checkAllDevice = checkedCount === this.deviceList.length;
          this.isIndeterminateDevice = checkedCount > 0 && checkedCount < this.deviceList.length;
          break;
        default:
          break;
      }
    },
    // 获取项目的部署的系统列表
    getListByProjectId (params) {
      systemMirror.getListByProjectId(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          console.log('获取项目的部署的系统列表', result)
          this.systemList = result
        }
      })
    },
    // 获取设备类型列表
    getListTypeBySystem (params) {
      systemMirror.getListTypeBySystem(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.deviceTypeList = result
          if (this.deviceTypeList.length) {
            this.deviceTypeList.forEach(item => {
              item.systemId = params.systemId
            })
          }
          console.log('获取设备类型列表', result)
        }
      })
    },
    // 获取设备系列列表
    getListTypeByDevice (params) {
      systemMirror.getListTypeByDevice(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.seriesList = result
          if (this.seriesList.length) {
            this.seriesList.forEach(item => {
              item.systemId = params.systemId
              item.deviceTypeId = params.deviceTypeId

            })
          }
          console.log('获取设备系列列表', result)
        }
      })
    },
    // 获取设备型号列表
    getListTypeBySeries (params) {
      systemMirror.getListTypeBySeries(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.modelList = result
          if (this.modelList.length) {
            this.modelList.forEach(item => {
              item.systemId = params.systemId
              item.deviceTypeId = params.deviceTypeId
              item.seriesId = params.seriesId
            })
          }
          console.log('获取设备型号列表', result)
        }
      })
    },
    // 获取硬件设备列表
    getListTypeByVersion (params) {
      systemMirror.getListTypeByVersion(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.deviceList = result
          if (this.deviceList.length) {
            this.deviceList.forEach(item => {
              item.systemId = params.systemId
              item.deviceTypeId = params.deviceTypeId
              item.seriesId = params.seriesId
              item.versiontype = params.versiontype
            })
          }
          console.log('获取硬件设备列表', result)
        }
      })
    },
    resourceIntegration () {
      let systemIdList = this.checkedSystem
      let deviceTypeIdList = []
      let seriesIdList = []
      let versionTypeIdList = []
      let deviceIdList = []
      // console.log('选中---checkedSystem', this.checkedSystem) //systemList
      // console.log('选中---checkedDeviceType', this.checkedDeviceType, this.deviceTypeList) //deviceTypeList
      // console.log('选中---checkedSeries', this.checkedSeries, this.seriesList) //seriesList
      // console.log('选中---checkedModel', this.checkedModel, this.modelList) //modelList
      // console.log('选中---checkedDevice', this.checkedDevice, this.deviceList) //deviceList
      this.deviceTypeList.forEach(item => {
        this.checkedDeviceType.forEach(it => {
          if (item.deviceTypeId === it) {
            deviceTypeIdList.push({
              deviceTypeId: item.deviceTypeId,
              systemId: item.systemId,
            })
          }
        })
      })

      this.seriesList.forEach(item => {
        this.checkedSeries.forEach(it => {
          if (item.seriesId === it) {
            seriesIdList.push({
              deviceTypeId: item.deviceTypeId,
              systemId: item.systemId,
              seriesId: item.seriesId
            })
          }
        })
      })


      this.modelList.forEach(item => {
        this.checkedModel.forEach(it => {
          if (item.versiontypeId === it) {
            versionTypeIdList.push({
              deviceTypeId: item.deviceTypeId,
              systemId: item.systemId,
              seriesId: item.seriesId,
              versionTypeId: item.versiontypeId
            })
          }
        })
      })

      this.deviceList.forEach(item => {
        this.checkedDevice.forEach(it => {
          if (item.deviceId === it) {
            deviceIdList.push({
              deviceTypeId: item.deviceTypeId,
              systemId: item.systemId,
              seriesId: item.seriesId,
              versionTypeId: item.versionTypeId,
              deviceId: item.deviceId
            })
          }
        })
      })
      // console.log('systemIdList---', systemIdList)
      // console.log('deviceTypeIdList---', deviceTypeIdList)
      // console.log('seriesIdList---', seriesIdList)
      // console.log('versionTypeIdList---', versionTypeIdList)
      // console.log('deviceIdList---', deviceIdList)
      let params = {
        projectId: this.projectId, //项目
        level: '', // 设备级别
        maintenance: '',
        auditor: '',
        type: '', // 配置模式
        systemIdList: systemIdList,
        deviceTypeIdList: deviceTypeIdList,
        seriesIdList: seriesIdList,
        versionTypeIdList: versionTypeIdList,
        deviceIdList: deviceIdList
      }
      return params
    },

  }
}
</script>
<style lang="less" scoped>
.cascader-table {
  display: flex;
  height: 100%;
  margin-top: 20px;
  &-list {
    width: 300px;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    margin-right: 20px;
    // overflow-y: auto;
    height: 100%;
    &-title {
      height: 48px;
      line-height: 48px;
      width: 100%;
      background: #f5f7fa;
      border-bottom: 1px solid #ebeef5;
      padding: 0 20px;
      ul {
        display: flex;
        li {
          width: 33%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    &-li {
      padding: 0 20px;
      display: flex;
      height: calc(100% - 48px);
      overflow-y: auto;
      li {
        padding-top: 6px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>