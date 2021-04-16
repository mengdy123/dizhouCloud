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
            <el-input v-model="form.seriesNumber"
                      disabled></el-input>
          </el-form-item>
          <el-form-item label="设备类型">
            <el-input v-model="form.seriesName"></el-input>
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
                 :tableData="tableData"
                 :tableConfigArr='tableConfigArr'
                 :action='actionList'
                 name='设备系列'
                 :detail='false'
                 :expand='true'
                 :editRow='false'
                 :selection="false"
                 :height='tableHeight'
                 @getList='getModelList'
                 @disebleTable='disebleTable'
                 @changeProjectBox='changeSeriesBox'
                 @getDetail='getDetail'
                 :index='true'>
          <slot slot='rowMain'>
            <div class="row-main">
              <ul v-for="(item, index) in rowData"
                  :key="index">
                <li>
                  <span>设备型号：</span>
                  <span>{{item.versiontypeName}}</span>
                </li>
                <li>
                  <span>设备数量：</span>
                  <span>{{item.deviceNumber}}</span>
                </li>
              </ul>
              <div class="dz-system-device-add"
                   @click="changeModelBox(true)">新增型号</div>
            </div>
          </slot>
        </myTable>
      </div>
    </div>
    <div class="button-list"
         v-if="editStatus">
      <el-button type="primary"
                 @click="updateDetail">确 定</el-button>
      <el-button @click="goBack">取 消</el-button>
    </div>
    <addBox v-if="addDeviceSeries"
            name='设备系列'
            @getList='getSeriesList'
            title='新增'>
      <slot slot='dialogMain'>
        <addDeviceSeries v-if="name==='设备系列'"
                         ref="addForm"
                         @changeProjectBox='changeSeriesBox'></addDeviceSeries>
      </slot>
    </addBox>
    <addBox v-if="addDeviceModel"
            name='设备型号'
            @getList='getModelList'
            title='新增'>
      <addDeviceSeries v-if="name==='设备系列'"
                       ref="addForm"
                       @changeProjectBox='changeModelBox'></addDeviceSeries>
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
          label: '系列数量',
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
      addDeviceModel: false
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
  created () {
    let id = this.$route.query.id
    this.getDeviceById(id)
  },
  mounted () {
    this.form = this.detailInfo
    this.form.createTime = timeReg.getNowFormatDate(this.form.createTime)
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
    ...mapActions(['saveDetailInfo']),
    goBack () {
      this.$router.push('/smartSet')
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
          this.goBack()
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
    changeModelBox (status) {
      this.addDeviceModel = status
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
          this.rowData = result.content
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
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
.row-main {
  display: flex;
  flex-direction: column;
  ul {
    width: 100%;
    margin: 10px 20px 5px 0;
    display: flex;
    li {
      display: flex;
      width: 15%;
      span {
        display: block;
        color: #333333;
      }
      span:nth-child(odd) {
        color: #999999;
      }
    }
  }
  .dz-system-device-add {
    color: #2761ff;
    cursor: pointer;
    text-align: left;
    height: 44px;
    line-height: 44px;
    font-size: 14px;
    font-weight: 500;
  }
}
</style>