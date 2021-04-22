<template>
  <div class="detail-module">
    <el-page-header @back="goBack">
    </el-page-header>
    <div class="detail-module-row">
      <titleDiv2 title='基础信息'></titleDiv2>
      <div class="detail-form">
        <el-form ref="form"
                 :model="form"
                 label-width="100px">
          <el-form-item label="类型编号">
            <el-input v-model="form.deviceTypeNumber"
                      disabled></el-input>
          </el-form-item>
          <el-form-item label="设备类型">
            <el-input v-model="form.deviceTypeName"
                      :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="设备数量">
            <el-input v-model="form.deviceNumber"
                      disabled></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="detail-module-row">
      <titleDiv2 title='设备系列'></titleDiv2>
      <div class="history-table">
        <div class="dz-system-table-add"><span @click="addDeviceSeriesFun">新增</span></div>
        <myTable ref="myTable"
                 class="my-table"
                 :tableData="tableData"
                 :tableConfigArr='tableConfigArr'
                 :action='actionList'
                 name='设备系列'
                 :detail='false'
                 :expand='true'
                 :editRow='false'
                 :selection="false"
                 :height='tableHeight'
                 @getModelList='getModelList'
                 @getSeriesList='getSeriesList'
                 @disebleTable='disebleTable'
                 @changeProjectBox='changeSeriesBox'
                 @getDetail='getDetail'
                 @changeModelBox='changeModelBox'
                 @changeSeriesId='changeSeriesId'
                 :rowData="rowData"
                 :index='true'>
        </myTable>
      </div>
    </div>
    <div class="button-list"
         v-if="editStatus">
      <el-button type="primary"
                 @click="updateDetail">确 定</el-button>
      <el-button @click="resetUpdateDetail">取 消</el-button>
    </div>
    <div class="button-list"
         v-else>
      <el-button @click="editDetail">编辑</el-button>
    </div>
    <addBox v-if="addDeviceSeries"
            name='设备系列'
            @getSeriesList='getSeriesList'
            @changeProjectBox='changeSeriesBox'
            title='新增'>
      <slot slot='dialogMain'>
        <addDeviceSeries ref="addForm"
                         name='设备系列'
                         @getSeriesList='getSeriesList'
                         @changeProjectBox='changeSeriesBox'
                         :seriesId='seriesId'></addDeviceSeries>
      </slot>
    </addBox>
    <addBox v-if="addDeviceModel"
            name='设备型号'
            @getModelList='getModelList'
            @getSeriesList='getSeriesList'
            @changeProjectBox='changeModelBox'
            title='新增'>
      <slot slot='dialogMain'>
        <addDeviceModel ref="addForm"
                        name='设备型号'
                        @getModelList='getModelList'
                        @getSeriesList='getSeriesList'
                        @changeProjectBox='changeModelBox'
                        :seriesId='seriesId'></addDeviceModel>
      </slot>
    </addBox>
  </div>
</template>
<script>
import titleDiv2 from "@/components/titleModule/titleSystemDetail.vue";
import myTable from "@/components/Table";
import { mapState, mapActions } from 'vuex'
import systemMirror from '@/resource/systemMirror'
import timeReg from '@/utils/timeReg'
import addBox from '../dialogModule/addDialogModule'
import addDeviceSeries from '../../components/formModule/addDeviceSeries'
import addDeviceModel from '../../components/formModule/addDeviceModel'

export default {
  components: { titleDiv2, myTable, addBox, addDeviceSeries, addDeviceModel },
  data () {
    return {
      form: {},
      tableData: [],
      tableConfigArr: [
        {
          fixed: false,
          prop: 'seriesNumber',
          label: '系列编号',
        },
        {
          fixed: false,
          prop: 'seriesName',
          label: '系列名称',
        },
        {
          fixed: false,
          prop: 'deviceNumber',
          label: '设备型号数量',
        },
      ],
      spanIndex: '1',
      actionList: [
        {
          name: '编辑',
          style: 'view-screen'
        },
        // {
        //   name: '禁用',
        //   style: 'disable-button'
        // },
        // {
        //   name: '启用',
        //   style: 'view-screen'
        // }
      ],
      rowData: [],
      tableHeight: '100px',
      addDeviceSeries: false,
      addDeviceModel: false,
      isDisabled: true,
      seriesId: ''
    }
  },
  computed: {
    ...mapState({
      detailInfo: state => state.system.detailInfo,
      projectType: state => state.common.projectType,
      projectStatus: state => state.common.projectStatus,
      editStatus: state => state.system.editStatus,
      systemType: state => state.common.systemType,
      projectList: state => state.system.projectList,
      deviceType: state => state.common.deviceType,
      systemList: state => state.system.systemList,
    })
  },
  watch: {
    editStatus (newVal, oldVal) {
      if (newVal) {
        this.isDisabled = false
      } else {
        this.isDisabled = true
      }
    }
  },
  created () {
    let id = this.$route.query.id
    this.getDeviceById(id)
  },
  mounted () {
    this.isDisabled = !this.editStatus
    this.form = this.detailInfo
    this.getSeriesList()
    this.$nextTick(function () {
      this.tableHeight = String(window.innerHeight - this.$refs.myTable.$el.offsetTop - 50) + 'px';
      // 监听窗口大小变化
      let self = this;
      window.onresize = function () {
        self.tableHeight =
          String(window.innerHeight - self.$refs.myTable.$el.offsetTop - 50) + 'px';
      };
    });
  },
  methods: {
    ...mapActions(['saveDetailInfo', 'changeEditStatus']),
    goBack () {
      this.$router.push('/smartSet')
    },
    resetUpdateDetail () {
      this.changeEditStatus(false)
    },
    editDetail () {
      this.changeEditStatus(true)
    },
    changeSeriesId (id) {
      this.seriesId = id
    },
    changeModelBox (status) {
      this.addDeviceModel = status
    },
    getDeviceById (id) {
      let parmas = {
        deviceTypeId: id
      }
      systemMirror.getDeviceTypeById(parmas).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.form = result
          this.saveDetailInfo(result)
          this.form.createTime = timeReg.getNowFormatDate(this.form.createTime)
        }
      })
    },
    updateDetail () {
      let params = {
        ...this.form,
      }
      params.updateTime = ''
      params.createTime = ''
      systemMirror.updateDeviceType(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.$message.success(serviceMessage)
          this.resetUpdateDetail()
        }
      })
    },
    // 设备系列的禁用
    disebleTable (row) {
      let params = {
        ...row,
        deviceTypeId: id
      }
      params.updateTime = ''
      params.createTime = ''
      if (params.status === '1') {
        params.status = '2'
      } else {
        params.status = '1'
      }
      systemMirror.updateSeries(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.$message.success(serviceMessage)
          this.getList()
        }
      })
    },
    // 点击获取设备系列的详情
    getDetail (data) {
      this.dialogData = Object.assign({}, data)
      this.saveDetailInfo(this.dialogData)
    },
    //点击展示新增设备系列的box
    addDeviceSeriesFun () {
      this.saveDetailInfo({})
      this.changeSeriesBox(true)
    },
    // 修改新增设备系列的box的status
    changeSeriesBox (status) {
      this.addDeviceSeries = status
    },

    //获取设备系列列表
    getSeriesList () {
      let id = this.$route.query.id
      let params = {
        deviceTypeId: id,
        currentPage: 1,
        pageSize: 10000,
      }
      systemMirror.getListBySeries(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.tableData = result.content
          this.$nextTick(() => {
            this.tableData.forEach(row => {
              if (row.checkWeight == 0) {
                this.$refs.myTable.toggleRowSelection(row, true)
              }
            })
          })
        }
      })
    },
    //获取设备型号列表
    getModelList (id) {
      let params = {
        seriesId: id,
        currentPage: 1,
        pageSize: 10000,
      }
      systemMirror.getListByVer(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          // this.$nextTick(() => {
          //   this.rowData = result.content
          //   console.log('this.rowData', this.rowData)
          // })
          setTimeout(() => {
            this.rowData = result.content
            this.$forceUpdate()
          }, 0)


        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .el-table__body-wrapper {
  overflow-y: scroll !important;
  height: calc(100vh - 500px) !important;
}
.span-select {
  color: #333333 !important;
  font-weight: 600;
}
.detail-module {
  &-row {
    margin-top: 30px;
    &-tab {
      margin-top: 30px;
      span {
        color: #666666;
        font-size: 14px;
        margin-right: 20px;
        cursor: pointer;
        display: inline-block;
      }
    }
  }
  .detail-form {
    margin-top: 30px;
    /deep/ .el-form {
      display: flex;
      flex-wrap: wrap;
      .el-form-item {
        width: 33%;
        margin-bottom: 10px;
      }
      .el-form-item__content {
        width: 60%;
      }
    }
  }
  .history-table {
  }
  .button-list {
    display: flex;
    justify-content: center;
    position: fixed;
    left: 50%;
    margin-left: -50px;
    bottom: 40px;
    /deep/ .el-button {
      margin-right: 10px;
    }
  }
}
</style>