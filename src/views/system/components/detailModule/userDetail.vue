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
          <el-form-item label="用户编号">
            <el-input v-model="form.userNumber"
                      disabled></el-input>
          </el-form-item>
          <el-form-item label="用户姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="用户角色">
            <el-input v-model="form.roleName"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="账号状态">
            <el-select v-model="form.status"
                       placeholder="请选择设备状态">
              <el-option label="正常"
                         value="1"></el-option>
              <el-option label="异常"
                         value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="detail-module-row">
      <titleDiv2 title='相关项目'></titleDiv2>
      <div class="detail-form">
        <myTable :tableData="tableData"
                 :tableConfigArr='tableConfigArr'
                 :selection="false"
                 :height='"180"'
                 :index='true'></myTable>
      </div>
    </div>
    <div class="detail-module-row">
      <titleDiv2 title='历史记录'></titleDiv2>
      <div class="detail-form history-table">
        <myTable :tableData="tableData"
                 :tableConfigArr='tableConfigArr'
                 :selection="false"
                 :height='"180"'
                 :index='true'></myTable>

        </el-table>
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
          createTime: '2016-05-02',
          projectCode: '001',
          projectName: '松江新城可视化平台',
          projectAbbreviation: '松江新城',
          projectSite: '上海市松江区松江大学城',
          companyName: '李三',
          projectTypeLable: '交通',
          projectLeader: '张思',
          statesLable: '运行中',
        },
        {
          createTime: '2016-05-02',
          projectCode: '001',
          projectName: '松江新城可视化平台',
          projectAbbreviation: '松江新城',
          projectSite: '上海市松江区松江大学城',
          companyName: '李三',
          projectTypeLable: '交通',
          projectLeader: '张思',
          statesLable: '运行中',
        },
        {
          createTime: '2016-05-02',
          projectCode: '001',
          projectName: '松江新城可视化平台',
          projectAbbreviation: '松江新城',
          projectSite: '上海市松江区松江大学城',
          companyName: '李三',
          projectTypeLable: '交通',
          projectLeader: '张思',
          statesLable: '运行中',
        },
        {
          createTime: '2016-05-02',
          projectCode: '001',
          projectName: '松江新城可视化平台',
          projectAbbreviation: '松江新城',
          projectSite: '上海市松江区松江大学城',
          companyName: '李三',
          projectTypeLable: '交通',
          projectLeader: '张思',
          statesLable: '运行中',
        },
      ],
      tableConfigArr: [
        {
          fixed: false,
          prop: 'projectCode',
          label: '项目编号',
          width: '100px',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'projectName',
          label: '项目名称',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'projectAbbreviation',
          label: '项目简称',
          tooltip: false,
        },
        {
          fixed: false,
          prop: 'projectSite',
          label: '项目地址',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'companyName',
          label: '客户名称',
          tooltip: false,
        },
        {
          fixed: false,
          prop: 'projectTypeLable',
          label: '项目类型',
          tooltip: false,
        },
        {
          fixed: false,
          prop: 'projectLeader',
          label: '项目负责人',
          tooltip: false,
        },
        {
          fixed: false,
          prop: 'statesLable',
          label: '项目状态',
          tooltip: false,
        },
        {
          fixed: false,
          prop: 'createTime',
          label: '运行时间',
          tooltip: true,
        },
      ]
    }
  },
  computed: {
    ...mapState({
      detailInfo: state => state.system.detailInfo,
      editStatus: state => state.system.editStatus,
    })
  },
  created () {
    let id = this.$route.query.id
    this.getUserById(id)
  },
  mounted () {
    this.form = this.detailInfo
    this.form.createTime = timeReg.getNowFormatDate(this.form.createTime)
  },
  methods: {
    goBack () {
      this.$router.push('/userManage')
    },
    getUserById (id) {
      systemMirror.getUserById(id).then(res => {
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
      systemMirror.updateUser(params).then(res => {
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
.detail-module {
  &-row {
    margin-top: 30px;
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
    /deep/ .el-table__body-wrapper {
      height: 190px;
      overflow-y: scroll;
    }
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