<template>
  <div class="dz-system">
    <div class="dz-system-title">权限管理</div>
    <div class="dz-system-search">
      <div class="dz-system-search-ruleForm">
        <el-form :model="ruleForm"
                 ref="ruleForm"
                 label-width="100px"
                 class="demo-ruleForm">
          <el-form-item>
            <span class="label-key">关键字</span>
            <el-input v-model="ruleForm.name"
                      style="width: 320px"
                      clearable
                      placeholder="请输入请输入角色名称"></el-input>
          </el-form-item>
        </el-form>
        <div class="button-list">
          <el-button type="primary"
                     @click="submitForm('ruleForm')">搜索</el-button>
        </div>
      </div>
    </div>

    <div class="dz-system-table">
      <div class="dz-system-table-add"><span @click="changeProjectBox(true)">新增</span></div>
      <myTable ref="myTable"
               :tableData="tableDataNew"
               :tableConfigArr='tableConfigArr'
               :selection="false"
               :height='heightTable'
               indexAlign='left'
               :indexWidth='"300%"'
               :action='actionList'
               :index='true'
               :detail='false'></myTable>
    </div>
    <div class="dz-system-pagination">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page.sync="currentPage1"
                     :page-size="100"
                     layout="total, prev, pager, next"
                     :total="1000">
      </el-pagination>
    </div>
    <addBox v-if="addProjectStatus"
            name='权限管理'
            @getList='getList'
            @changeProjectBox='changeProjectBox'
            title='新增'>
      <slot slot='dialogMain'>
        <addPowerForm ref="addForm"
                      @changeProjectBox='changeProjectBox'></addPowerForm>
      </slot>
    </addBox>
  </div>
</template>
<script>
import addBox from '../../components/dialogModule/addDialogModule'
import myTable from "@/components/Table";
import addPowerForm from '../../components/formModule/addPowerForm'
export default {
  components: { addBox, myTable, addPowerForm },
  data () {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableData: [
        {
          name: '超级管理员1',
          power: '全部'
        },
        {
          name: '超级管理员2',
          power: '全部'
        },
        {
          name: '超级管理员3',
          power: '全部'
        },
        {
          name: '超级管理员4',
          power: '全部'
        },
        {
          name: '超级管理员5',
          power: '全部'
        },
      ],
      tableConfigArr: [
        {
          fixed: false,
          prop: 'name',
          label: '角色名称',
        },
        {
          fixed: false,
          prop: 'power',
          label: '角色权限',
        },
      ],
      tableDataNew: [],
      currentPage1: 5,
      addProjectStatus: false,
      heightTable: 'calc(100vh - 402px)',
      actionList: [
        {
          name: '编辑',
          style: 'edit-button'
        },
        {
          name: '禁用',
          style: 'disable-button'
        },
        {
          name: '启用',
          style: 'edit-button'
        }
      ]
    };
  },
  mounted () {
    this.tableDataNew = this.tableData
  },
  methods: {
    handleClick (row) {
      console.log(row);
    },
    getList () { },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
    },
    changeProjectBox (status) {
      this.addProjectStatus = status
    },

  },
}
</script>
<style lang="less" scoped>
.header-bg {
  background-color: red;
}
.item-content-div {
  height: 160px;
  display: flex;
  background: #f5f5f5;
  margin-bottom: 10px;
  padding: 30px;
  // justify-content: space-between;
  /deep/ .el-form {
    flex-wrap: wrap;
    justify-content: flex-start;
  }
}
/deep/ .el-table td,
/deep/ .el-table th {
  padding-left: 10px;
}
</style>