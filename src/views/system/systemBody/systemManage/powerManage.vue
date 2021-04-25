<template>
  <div class="dz-system">
    <div class="dz-system-title">权限管理</div>
    <div class="dz-system-table">
      <myTable ref="myTable"
               :tableData="tableData"
               :tableConfigArr='tableConfigArr'
               :selection="false"
               :height='heightTable'
               name='权限配置'
               :http='http'
               indexAlign='left'
               :indexWidth='"300%"'
               :action='actionList'
               :index='true'
               @changeProjectBox='changePowerBox'
               @getDetail='getDetail'
               @changePowerMenuBox='changePowerMenuBox'></myTable>
    </div>
    <div class="dz-system-pagination">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page.sync="currentPage"
                     :page-size="pageSize"
                     layout="total, prev, pager, next"
                     :total="total">
      </el-pagination>
    </div>
    <addBox v-if="addProjectStatus"
            name='权限配置'
            @getList='getList'
            @changeProjectBox='changePowerMenuBox'
            title='新增'>
      <slot slot='dialogMain'>
        <addPowerMenuForm ref="addForm"
                          @getList='getList'
                          @changeProjectBox='changePowerMenuBox'></addPowerMenuForm>
      </slot>
    </addBox>
    <!-- <addBox v-if="addPowerStatus"
            name='权限配置'
            @getList='getList'
            @changeProjectBox='changePowerBox'
            title='修改'>
      <slot slot='dialogMain'>
        <addPowerForm ref="addForm"
                      @getList='getList'
                      @changeProjectBox='changePowerBox'></addPowerForm>
      </slot>
    </addBox> -->
  </div>
</template>
<script>
import myTable from "@/components/Table";
import addBox from '../../components/dialogModule/addDialogModule'
import addPowerForm from '../../components/formModule/addPowerForm'
import addPowerMenuForm from '../../components/formModule/addPowerMenuForm'
import systemManageMirror from '@/resource/systemManageMirror'
import { mapState, mapActions } from 'vuex'
export default {
  components: { addBox, myTable, addPowerForm, addPowerMenuForm },
  data () {
    return {
      ruleForm: {},
      tableData: [
        // {
        //   name: '超级管理员',
        //   modules: '查看与修改',
        //   level: '一级'
        // },
        // {
        //   name: '企业管理员',
        //   modules: '查看与部分修改',
        //   level: '二级'
        // },
        // {
        //   name: '管理员',
        //   modules: '查看与修改',
        //   level: '三级'
        // },
        // {
        //   name: '主管',
        //   modules: '查看与修改',
        //   level: '四级'
        // },
        // {
        //   name: '员工',
        //   modules: '仅查看',
        //   level: '五级'
        // },
      ],
      tableConfigArr: [
        {
          fixed: false,
          prop: 'level',
          label: '权限等级',
        },
        {
          fixed: false,
          prop: 'permissionName',
          label: '权限名称',
        },
        {
          fixed: false,
          prop: 'modules',
          label: '模块操作权限',
        },
      ],
      currentPage: 1,
      pageSize: 10,
      total: 1000,
      addProjectStatus: false,
      addPowerStatus: false,
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

      ],
      dialogData: {},
      http: '/permission/selectPermission?id='
    };
  },

  mounted () {
    this.getList()
  },
  methods: {
    ...mapActions(['saveDetailInfo']),
    handleClick (row) {
      console.log(row);
    },
    getList () {
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      }
      systemManageMirror.getPowerPermissionAll(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.tableData = result.content
          this.total = result.recordTotal
          const totalPage = Math.ceil((this.total - 1) / this.pageSize)
          this.currentPage = this.currentPage > totalPage ? totalPage : this.currentPage
          this.currentPage = this.currentPage < 1 ? 1 : this.currentPage
        }
      })
    },
    getDetail (data) {
      this.dialogData = Object.assign({}, data)
      this.saveDetailInfo(this.dialogData)
    },
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
    changePowerMenuBox (status) {
      this.addProjectStatus = status
    },
    changePowerBox (status) {
      this.addPowerStatus = status
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