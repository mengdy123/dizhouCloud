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
            <el-input v-model="form.num"></el-input>
          </el-form-item>
          <el-form-item label="项目名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="项目简称">
            <el-input v-model="form.shortName"></el-input>
          </el-form-item>
          <el-form-item label="项目地址">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item label="项目类型">
            <el-input v-model="form.industry"></el-input>
          </el-form-item>
          <el-form-item label="运行状态">
            <el-input v-model="form.status"></el-input>
          </el-form-item>
          <el-form-item label="运行时间">
            <el-input v-model="form.time"></el-input>
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
            <el-input v-model="form.clientName"></el-input>
          </el-form-item>
          <el-form-item label="项目负责人">
            <el-input v-model="form.person"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="form.phone"></el-input>
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
         v-if="editStatus">
      <el-button type="primary">确 定</el-button>
      <el-button>取 消</el-button>
    </div>
  </div>
</template>
<script>
import titleDiv2 from "@/components/titleModule/titleSystemDetail.vue";
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
      editStatus: false,
    }
  },
  methods: {
    goBack () {
      this.$router.push('/clientManage')
    },
    onSubmit () {
      console.log('submit!');
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