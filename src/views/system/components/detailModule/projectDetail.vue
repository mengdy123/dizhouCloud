<template>
  <div class="detail-module">
    <el-page-header @back="goBack">
    </el-page-header>
    <div class="detail-module-row">
      <titleDiv2 title='项目信息'></titleDiv2>
      <div class="detail-form">
        <el-form ref="form"
                 :model="form"
                 label-width="100px">
          <el-form-item label="项目编号">
            <el-input v-model="form.projectCode"
                      disabled></el-input>
          </el-form-item>
          <el-form-item label="项目名称">
            <el-input v-model="form.projectName"
                      :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="项目简称">
            <el-input v-model="form.projectAbbreviation"
                      :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="项目地址">
            <el-input v-model="form.projectSite"
                      :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="项目类型">
            <el-select v-model="form.projectType"
                       placeholder="请选择项目类型"
                       :disabled="isDisabled">
              <el-option v-for="item in projectType"
                         :label="item.name"
                         :key="item.id"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目状态">
            <el-select v-model="form.status"
                       placeholder="请选择项目状态"
                       :disabled="isDisabled">
              <el-option v-for="item in projectStatus"
                         :label="item.name"
                         :key="item.id"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="运行时间">
            <el-input v-model="form.createTime"
                      :disabled="isDisabled"> </el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="detail-module-row">
      <titleDiv2 title='客户信息'></titleDiv2>
      <div class="detail-form">
        <el-form ref="form"
                 :model="form"
                 label-width="100px">
          <el-form-item label="客户名称">
            <el-input v-model="form.companyName"
                      :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="项目负责人">
            <el-input v-model="form.projectLeader"
                      :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="form.phone"
                      :disabled="isDisabled"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="detail-module-row">
      <titleDiv2 title='历史记录'></titleDiv2>
      <div class="detail-form history-table">
        <el-table :data="tableData"
                  :header-cell-style="{background:'#fafafa',fontWeight: '500',height: '54px'}"
                  style="width: 100%">
          <el-table-column label="序号"
                           align="center"
                           type="index">
          </el-table-column>
          <el-table-column prop="number"
                           label="项目编号"
                           width="100">
          </el-table-column>
          <el-table-column prop="name"
                           :show-overflow-tooltip="true"
                           label="项目名称">
          </el-table-column>
          <el-table-column prop="shortName"
                           label="项目简称">
          </el-table-column>
          <el-table-column prop="address"
                           :show-overflow-tooltip="true"
                           label="项目地址">
          </el-table-column>
          <el-table-column prop="clientName"
                           label="客户名称">
            <!-- <el-select v-model="ruleForm.companyId"
                   filterable
                   placeholder="请选择">
          <el-option v-for="item in companyList"
                     :key="item.companyId"
                     :label="item.companyName"
                     :value="item.companyId">
          </el-option>
        </el-select> -->
          </el-table-column>
          <el-table-column prop="industry"
                           label="项目类型">
          </el-table-column>
          <el-table-column prop="responsible"
                           label="项目负责人">
          </el-table-column>
          <el-table-column prop="status"
                           label="项目状态">
          </el-table-column>
          <el-table-column prop="runTime"
                           label="运行时间">
          </el-table-column>

        </el-table>
      </div>
    </div>
    <div class="button-list"
         v-show="editStatus">
      <el-button type="primary"
                 @click="updateDetail(true)">确 定</el-button>
      <el-button @click="updateDetail(false)">取 消</el-button>
    </div>
  </div>
</template>
<script>
import titleDiv2 from "@/components/titleModule/titleSystemDetail.vue";
import { mapState, mapActions } from 'vuex'
import systemMirror from '@/resource/systemMirror'
import timeReg from '@/utils/timeReg'
export default {
  components: { titleDiv2 },
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
      isDisabled: true
    }
  },
  computed: {
    ...mapState({
      detailInfo: state => state.system.detailInfo,
      projectType: state => state.common.projectType,
      projectStatus: state => state.common.projectStatus,
      editStatus: state => state.system.editStatus,
    })
  },
  watch: {
    editStatus (newVal, oldVal) {
      if (newVal) {
        this.isDisabled = false
      }
    }
  },
  created () {
    let id = this.$route.query.id
    this.getProjectById(id)
  },
  mounted () {
    this.isDisabled = !this.editStatus
    this.form = this.detailInfo
    this.form.createTime = timeReg.getNowFormatDate(this.form.createTime)
  },
  methods: {
    ...mapActions(['saveDetailInfo', 'changeEditStatus']),
    goBack () {
      this.$router.push('/system')
    },
    getProjectById (id) {
      systemMirror.getProjectById(id).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.form = result
          this.saveDetailInfo(result)
          this.form.createTime = timeReg.getNowFormatDate(this.form.createTime)
        }
      })
    },
    updateDetail (status) {
      if (status) {
        let params = {
          ...this.form,
        }
        params.updateTime = ''
        console.log('ruleForm', params)
        systemMirror.updateProject(params).then(res => {
          console.log('updateDetail', res.data)
          let { code, result, serviceMessage } = res.data
          if (code === 200) {
            this.$message.success(serviceMessage)
            // this.goBack()
          }
        })
      } else {
        this.changeEditStatus(false)
      }
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