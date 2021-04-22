<template>
  <div class="dz-system">
    <div class="dz-system-title">权限管理</div>
    <div class="dz-system-table">
      <myTable ref="myTable"
               :tableData="tableDataNew"
               :tableConfigArr='tableConfigArr'
               :selection="false"
               :height='heightTable'
               indexAlign='left'
               :indexWidth='"300%"'
               :action='actionList'
               :index='true'
               :detail='false'
               @changeProjectBox='changeProjectBox'></myTable>
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
            name='权限配置'
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
import myTable from "@/components/Table";
import addBox from '../../components/dialogModule/addDialogModule'
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
          name: '超级管理员',
          modules: '查看与修改',
          level: '一级'
        },
        {
          name: '企业管理员',
          modules: '查看与部分修改',
          level: '二级'
        },
        {
          name: '管理员',
          modules: '查看与修改',
          level: '三级'
        },
        {
          name: '主管',
          modules: '查看与修改',
          level: '四级'
        },
        {
          name: '员工',
          modules: '仅查看',
          level: '五级'
        },
      ],
      tableConfigArr: [
        {
          fixed: false,
          prop: 'level',
          label: '权限等级',
        },
        {
          fixed: false,
          prop: 'name',
          label: '名称',
        },
        {
          fixed: false,
          prop: 'modules',
          label: '模块操作权限',
        },
      ],
      tableDataNew: [],
      currentPage1: 5,
      addProjectStatus: false,
      heightTable: 'calc(100vh - 402px)',
      actionList: [
        {
          name: '详情',
          style: 'edit-button'
        },
        {
          name: '编辑',
          style: 'edit-button'
        },
        {
          name: '权限配置',
          style: 'edit-button'
        },

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