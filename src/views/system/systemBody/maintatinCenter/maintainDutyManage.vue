
<template>
  <div class="dz-system">
    <div class="dz-system-title">运维职责管理</div>
    <div class="dz-system-search">
      <div class="dz-system-search-ruleForm">
        <el-form :model="ruleForm"
                 ref="ruleForm"
                 label-width="100px">
          <el-form-item>
            <span class="label-key">关键字</span>
            <!-- 设备编号， 系统名称、项目名称、项目编号，设备安装区域、设备安装位置（位置编号）、维修人员、审核人员-->
            <el-input v-model="ruleForm.key"
                      style="width: 260px"
                      placeholder="请输入关键字"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="项目名称"
                        prop="industry">
            <el-select v-model="ruleFormHeight.projectType"
                       placeholder="请选择项目名称"
                       style="width: 260px"
                       clearable>
              <el-option v-for="item in setTypeList"
                         :label="item.label"
                         :key="item.value"
                         :value="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="配置模式"
                        prop="industry">
            <el-select v-model="ruleFormHeight.setType"
                       @change="changeSetType"
                       placeholder="请选择配置模式"
                       style="width: 260px"
                       clearable>
              <el-option v-for="item in setTypeList"
                         :label="item.label"
                         :key="item.value"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="ruleFormHeight.type"
                       :placeholder="placeholderInfo"
                       style="width: 160px"
                       clearable>
              <el-option v-for="item in setTypeList"
                         :label="item.label"
                         :key="item.value"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="button-list">
          <el-button type="primary"
                     @click="submitForm('ruleForm')">搜索</el-button>
          <el-button type="primary"
                     @click="maintainFun('level')">维修级别</el-button>
          <el-button type="primary"
                     @click="maintainFun('person')">维修人员</el-button>
        </div>
      </div>
    </div>
    <div class="dz-system-table">
      <myTable :tableData="tableDataNew"
               :tableConfigArr='tableConfigArr'
               :selection="true"
               :action='actionList'
               :height='heightTable'
               :expand='true'
               :detail='false'
               name='运维职责管理'
               @getList='getProgectList'
               :index='true'>
        <slot slot='rowMain'>
          <div class="row-main">
            <myTable :tableData="tableDataNew"
                     :tableConfigArr='tableConfigArr'
                     :selection="true"
                     :action='actionList'
                     :height='heightTable'
                     :expand='true'
                     :detail='false'
                     name='运维职责管理'
                     @getList='getProgectList'
                     :index='true'>
            </myTable>
          </div>
        </slot>
      </myTable>
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
  </div>
</template>
<script>
import systemMirror from '@/resource/systemMirror'
import { mapState, mapActions } from 'vuex'
import timeReg from '@/utils/timeReg'
import myTable from "@/components/Table";
export default {
  components: { myTable },
  data () {
    return {
      ruleForm: {},
      ruleFormHeight: {},
      tableData: [],
      tableConfigArr: [
        {
          fixed: false,
          prop: 'id',
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
      tableConfigArr2: [],
      tableConfigArr3: [
      ],
      tableConfigArr4: [
        {
          fixed: false,
          prop: 'id',
          label: '设备编号',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'deviceType',
          label: '设备型号',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'name',
          label: '设备系列',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'deviceType',
          label: '设备类型',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'deviceNumber',
          label: '系统名称',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'deviceType',
          label: '项目名称',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'deviceNumber',
          label: '项目编号',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'deviceType',
          width: '160px',
          label: '设备安装区域',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'deviceNumber',
          width: '160px',
          label: '设备安装位置',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'deviceType',
          label: '维护级别',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'deviceType',
          label: '维修人员',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'deviceType',
          width: '160px',
          label: '维修人员联系方式',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'deviceType',
          label: '审核人员',
          tooltip: true,
        },
        {
          fixed: false,
          width: '160px',
          prop: 'deviceType',
          label: '审核人员联系方式',
          tooltip: true,
        },
      ],
      tableDataNew: [
        {
          id: '12987122',
          name: '好滋好味鸡蛋仔1',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987123',
          name: '好滋好味鸡蛋仔2',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987125',
          name: '好滋好味鸡蛋仔3',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987126',
          name: '好滋好味鸡蛋仔4',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }
      ],
      currentPage: 1,
      pageSize: 10,
      total: 1000,
      addProjectStatus: false,
      heightStatus: false,
      heightTable: 'calc(100vh - 402px)',
      http: '',
      actionList: [
        {
          name: '编辑',
          style: 'view-screen'
        },
      ],
      setTypeList: [
        {
          label: '系统',
          value: '1'
        },
        {
          label: '设备',
          value: '2'
        },
        {
          label: '安装区域',
          value: '3'
        }
      ],
      placeholderInfo: ''
    };
  },
  computed: {
    ...mapState({
      projectType: state => state.common.projectType,
      projectStatus: state => state.common.projectStatus,
    })
  },
  mounted () {
    // this.getProgectList()
  },
  methods: {
    handleClick (row) {
      console.log(row);
    },
    //搜索按钮
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getProgectList()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 修改配置模式
    changeSetType (type) {
      switch (type) {
        case 1:
          this.placeholderInfo = '请选择系统类型'
          break
        case 2:
          this.placeholderInfo = ''
          break
        case 3:
          this.placeholderInfo = '请选择安装区域'
          break
      }
      console.log('ruleFormHeight.setType', this.ruleFormHeight.setType)
    },
    //设置 维修人员  维修级别
    maintainFun (type) {
      switch (type) {
        case 'level':
          //设置 维修级别
          break
        case 'person':
          //设置 维修人员
          break
      }
    },
    //获取列表
    getProgectList () {
      let startTime, endTime
      if (this.ruleFormHeight.time) {
        startTime = this.ruleFormHeight.time[0]
        endTime = this.ruleFormHeight.time[1]
      }
      let params = {
        projectName: this.ruleForm.key,
        projectLeader: this.ruleFormHeight.leader,
        projectType: this.ruleFormHeight.projectType,
        projectSite: this.ruleFormHeight.address,
        status: this.ruleFormHeight.status,
        startTime: startTime,
        endTime: endTime,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      }
      systemMirror.getProjectList(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          // this.tableData = result.content
          this.total = result.recordTotal
          const totalPage = Math.ceil((this.total - 1) / this.pageSize)
          this.currentPage = this.currentPage > totalPage ? totalPage : this.currentPage
          this.currentPage = this.currentPage < 1 ? 1 : this.currentPage
        }
        this.tableData.forEach((item, index) => {
          item.createTime = timeReg.getNowFormatDate(item.createTime)
          this.projectType.forEach(it => {
            if (item.projectType && item.projectType === it.id) {
              item.projectTypeLable = it.name
            }
          })
          this.projectStatus.forEach(it => {
            if (item.status && item.status === it.id) {
              item.statusLable = it.name
            }
          })
        })
        this.tableDataNew = this.tableData
      })
    },

    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.getProgectList()
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
</style>
