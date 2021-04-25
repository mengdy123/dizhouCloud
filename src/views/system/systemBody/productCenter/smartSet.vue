<template>
  <div class="dz-system">
    <div class="dz-system-title">智能设备</div>
    <div class="dz-system-search">
      <div class="dz-system-search-ruleForm">
        <el-form :model="ruleForm"
                 ref="ruleForm"
                 label-width="100px"
                 class="demo-ruleForm">
          <el-form-item>
            <span class="label-key">关键字</span>
            <el-input v-model="ruleForm.key"
                      clearable
                      style="width: 320px"
                      placeholder="请输入关键字"
                      @clear="submitForm('ruleForm')"
                      @keyup.enter.native="submitForm('ruleForm')"></el-input>
          </el-form-item>
        </el-form>
        <div class="button-list">
          <!-- <el-button @click="heightSearch">{{heightStatus ? '关闭高级' : '高级'}}搜索</el-button> -->
          <el-button type="primary"
                     @click="submitForm('ruleForm')">搜索</el-button>
        </div>
      </div>
    </div>
    <div class="dz-system-table">
      <div class="dz-system-table-add"><span @click="showBox">新增</span></div>
      <myTable ref="myTable"
               :tableData="tableDataNew"
               :tableConfigArr='tableConfigArr'
               :selection="false"
               :action='actionList'
               :height='heightTable'
               :http='http'
               :showIndex='true'
               indexAlign='left'
               :indexWidth='"60px"'
               name='智能设备'
               @getList='getList'
               @getDetail='getDetail'
               @disebleTable='disebleTable'
               @changeProjectBox='changeProjectBox'
               :index='true'></myTable>
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
            name='智能设备'
            @getList='getList'
            title='新增'>
      <slot slot='dialogMain'>
        <addSmartSetForm ref="addForm"
                         @getList='getList'
                         @changeProjectBox='changeProjectBox'></addSmartSetForm>
      </slot>
    </addBox>
  </div>

</template>
<script>
import addBox from '../../components/dialogModule/addDialogModule'
import myTable from "@/components/Table";
import systemMirror from '@/resource/systemMirror'
import { mapState, mapActions } from 'vuex'
import timeReg from '@/utils/timeReg'
// import addSmartSetForm from '../formModule/addSmartSetForm'
import addSmartSetForm from '../../components/formModule/addSmartSetForm'
export default {
  components: { addBox, myTable, addSmartSetForm },
  data () {
    return {
      ruleForm: {},
      tableData: [],
      tableConfigArr: [
        {
          fixed: false,
          prop: 'deviceTypeNumber',
          label: '设备类型编号',
          tooltip: false,
        },
        {
          fixed: false,
          prop: 'deviceTypeName',
          label: '设备类型',
          tooltip: false,
        },
        {
          fixed: false,
          prop: 'deviceNumber',
          label: '设备数量',
          tooltip: false,
        },
      ],
      http: '/manage/device/getDeviceTypeById?deviceTypeId=',
      ruleFormHeight: {},
      tableDataNew: [],
      currentPage: 1,
      pageSize: 10,
      total: 1000,
      addProjectStatus: false,
      heightTable: 'calc(100vh - 402px)',
      heightStatus: false,
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
          name: '删除',
          style: 'disable-button'
        },
        // {
        //   name: '启用',
        //   style: 'edit-button'
        // }
      ]
    };
  },
  computed: {
    ...mapState({
      projectType: state => state.common.projectType,
      systemType: state => state.common.systemType,
      deviceType: state => state.common.deviceType,
    })
  },
  mounted () {
    this.getList()
  },
  methods: {
    ...mapActions(['saveDetailInfo']),
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.heightStatus) {
            this.getListHeight()
          } else {
            this.getList()
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getList () {
      let params = {
        seek: this.ruleForm.key,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      }
      systemMirror.getListByDevice(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.tableDataNew = result.content
          this.total = result.recordTotal
        }
        this.tableDataNew.forEach((item, index) => {
          item.createTime = timeReg.getNowFormatDate(item.createTime)
          this.deviceType.forEach(it => {
            if (item.deviceType && item.deviceType === it.id) {
              item.deviceTypeLable = it.name
            }
          })
        })
      })
    },
    getListHeight () {
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      }
      systemMirror.getListByPar(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.tableDataNew = result.content
          this.total = result.recordTotal
        }
        this.tableDataNew.forEach((item, index) => {
          item.createTime = timeReg.getNowFormatDate(item.createTime)
          if (item.status === '1') {
            item.statusName = '正常'
          } else {
            item.statusName = '已禁用'
          }
          this.deviceType.forEach(it => {
            if (item.deviceType && item.deviceType === it.id) {
              item.deviceTypeLable = it.name
            }
          })
        })
      })
    },
    disebleTable (row) {
      let params = {
        ...row,
      }
      params.updateTime = ''
      params.createTime = ''
      if (params.status === '1') {
        params.status = '2'
      } else {
        params.status = '1'
      }
      systemMirror.updateDeviceType(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.$message.success(serviceMessage)
          this.getList()
        }
      })
    },
    // 点击获取的详情
    getDetail (data) {
      this.dialogData = Object.assign({}, data)
      this.saveDetailInfo(this.dialogData)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.getList()
    },
    showBox () {
      this.saveDetailInfo({})
      this.changeProjectBox(true)
    },
    changeProjectBox (status) {
      this.addProjectStatus = status
    },
  },
}
</script>
<style lang="less" scoped>
.item-content-div {
  display: flex;
  background: #f5f5f5;
  margin-bottom: 10px;
  /* padding: 30px; */
  padding-top: 30px;
  position: relative;
  // justify-content: space-between;
  /deep/ .el-form {
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}
.item-content-div:before {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #f5f5f5;
  display: block;
  content: "";
  position: absolute;
  right: 160px;
  top: -10px;
}
/deep/ .el-table td,
/deep/ .el-table th {
  padding-left: 10px;
}
</style>