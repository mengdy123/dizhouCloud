<template>
  <div class="detail-module">
    <el-page-header @back="goBack">
    </el-page-header>
    <div class="detail-module-row">
      <titleDiv2 title='系统信息'></titleDiv2>
      <div class="detail-form">
        <el-form ref="form"
                 :model="form"
                 label-width="100px">
          <el-form-item label="系统编号">
            <el-input v-model="form.systemTypeNumber"
                      disabled></el-input>
          </el-form-item>
          <el-form-item label="系统类型">
            <el-input v-model="form.systemTypeName"
                      :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="系统数量">
            <el-input v-model="form.systemNumber"
                      disabled></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="detail-module-row">
      <titleDiv2 title='设备列表'></titleDiv2>
      <div class="detail-form history-table">
        <myTable :tableData="tableData"
                 :tableConfigArr='tableConfigArr'
                 :action='actionList'
                 :selection="false"
                 :height='"295"'
                 :index='true'></myTable>
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
  </div>
</template>
<script>
import titleDiv2 from "@/components/titleModule/titleSystemDetail.vue";
import myTable from "@/components/Table";
import { mapState, mapActions } from 'vuex'
import systemMirror from '@/resource/systemMirror'
import timeReg from '@/utils/timeReg'
export default {
  components: { titleDiv2, myTable },
  data () {
    return {
      form: {},
      tableData: [
        {
          date: '2016-05-02',
          number: '001',
          name: '松江新城可视化平台',
          shortName: '松江新城',
          address: '上海市松江区松江大学城',
          clientName: '李三',
          industry: '交通',
          responsible: '张思',
          status: '运行中',
          runTime: '2021-01-03'
        },
        {
          date: '2016-05-02',
          number: '001',
          name: '松江新城可视化平台',
          shortName: '松江新城',
          address: '上海市松江区松江大学城',
          clientName: '李三',
          industry: '交通',
          responsible: '张思',
          status: '运行中',
          runTime: '2021-01-03'
        },
        {
          date: '2016-05-02',
          number: '001',
          name: '松江新城可视化平台',
          shortName: '松江新城',
          address: '上海市松江区松江大学城',
          clientName: '李三',
          industry: '交通',
          responsible: '张思',
          status: '运行中',
          runTime: '2021-01-03'
        },
        {
          date: '2016-05-02',
          number: '001',
          name: '松江新城可视化平台',
          shortName: '松江新城',
          address: '上海市松江区松江大学城',
          clientName: '李三',
          industry: '交通',
          responsible: '张思',
          status: '运行中',
          runTime: '2021-01-03'
        },
        {
          date: '2016-05-02',
          number: '001',
          name: '松江新城可视化平台',
          shortName: '松江新城',
          address: '上海市松江区松江大学城',
          clientName: '李三',
          industry: '交通',
          responsible: '张思',
          status: '运行中',
          runTime: '2021-01-03'
        }
      ],
      tableConfigArr: [
        {
          fixed: false,
          prop: 'number',
          label: '设备编号',
        },
        {
          fixed: false,
          prop: 'shortName',
          label: '设备类型',
        },
        {
          fixed: false,
          prop: 'address',
          label: '设备系列',
        },
        {
          fixed: false,
          prop: 'status',
          label: '设备状态',
        },
        {
          fixed: false,
          prop: 'runTime',
          label: '告警时间',
        },
      ],
      spanIndex: '1',
      actionList: [],
      isDisabled: true,
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
    })
  },
  created () {
    let id = this.$route.query.id
    this.getSystemTypeById(id)
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
  mounted () {
    this.isDisabled = !this.editStatus
    this.form = this.detailInfo
    this.form.createTime = timeReg.getNowFormatDate(this.form.createTime)
  },
  methods: {
    ...mapActions(['saveDetailInfo', 'changeEditStatus']),
    goBack () {
      this.$router.push('/smartSystem')
    },
    editDetail () {
      this.changeEditStatus(true)
    },
    resetUpdateDetail () {
      this.changeEditStatus(false)
    },
    getSystemTypeById (id) {
      systemMirror.getSystemTypeById(id).then(res => {
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
      systemMirror.updateSysType(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.$message.success(serviceMessage)
          this.resetUpdateDetail()
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
</style>