<template>
  <div class="detail-module">
    <el-page-header @back="goBack">
    </el-page-header>
    <div class="detail-module-row">
      <titleDiv2 title='基本信息'></titleDiv2>
      <div class="detail-form">
        <el-form ref="form"
                 :model="form"
                 label-width="100px">
          <el-form-item label="设备编号">
            <el-input v-model="form.systemNumber"
                      disabled></el-input>
          </el-form-item>
          <el-form-item label="设备型号">
            <el-input v-model="form.systemName"></el-input>
          </el-form-item>
          <el-form-item label="设备系列">
            <el-select v-model="form.systemType"
                       style="width: 312px"
                       placeholder="请选择设备系列">
              <el-option v-for="item in systemType"
                         :label="item.name"
                         :key="item.id"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="系列编号">
            <el-input v-model="form.systemName"></el-input>
          </el-form-item>
          <el-form-item label="设备类型">
            <el-select v-model="form.projectType"
                       placeholder="请选择设备类型"
                       style="width: 312px">
              <el-option v-for="item in projectType"
                         :label="item.name"
                         :key="item.id"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备类型编号">
            <el-input v-model="form.systemName"></el-input>
          </el-form-item>
          <el-form-item label="系统名称">
            <el-select v-model="form.systemName"
                       style="width: 312px"
                       placeholder="请选择系统名称">
              <el-option v-for="item in projectList"
                         :label="item.projectName"
                         :key="item.projectId"
                         :value="item.projectId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="系统编号">
            <el-select v-model="form.systemName"
                       placeholder="请选择系统编号"
                       style="width: 312px">
              <el-option v-for="item in projectList"
                         :label="item.projectName"
                         :key="item.projectId"
                         :value="item.projectId"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="detail-module-row">
      <titleDiv2 title='项目信息'></titleDiv2>
      <div class="detail-form">
        <el-form ref="form"
                 :model="form"
                 label-width="100px">
          <el-form-item label="项目名称">
            <el-input v-model="form.projectName"></el-input>
          </el-form-item>
          <el-form-item label="项目编号">
            <el-input v-model="form.projectNumber"></el-input>
          </el-form-item>
          <el-form-item label="安装区域">
            <el-input v-model="form.projectArea"></el-input>
          </el-form-item>
          <el-form-item label="安装位置">
            <el-input v-model="form.projectSit"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="detail-module-row">
      <titleDiv2 title='维修日志'></titleDiv2>
      <div class="detail-form history-table logs-list">
        <logsDiv></logsDiv>
      </div>
    </div>
    <div class="button-list"
         v-if="editStatus">
      <el-button type="primary"
                 @click="updateDetail">确 定</el-button>
      <el-button @click="goBack">取 消</el-button>
    </div>
  </div>
</template>
<script>
import titleDiv2 from "@/components/titleModule/titleSystemDetail.vue";
import myTable from "@/components/Table";
import logsDiv from '@/components/Logs'
import { mapState, mapActions } from 'vuex'
import systemMirror from '@/resource/systemMirror'
import timeReg from '@/utils/timeReg'
export default {
  components: { titleDiv2, myTable, logsDiv },
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
      spanIndex: '1'
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
    this.getSystemById(id)
  },
  mounted () {
    console.log('projectList', this.detailInfo)
    this.form = this.detailInfo
    this.form.createTime = timeReg.getNowFormatDate(this.form.createTime)
  },
  methods: {
    ...mapActions(['saveDetailInfo']),
    goBack () {
      this.$router.push('/setManage')
    },
    getSystemById (id) {
      systemMirror.getSystemById(id).then(res => {
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
      systemMirror.updateSystem(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.$message.success(serviceMessage)
          this.goBack()
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
.logs-list {
  height: 200px;
  overflow-y: scroll;
}
</style>