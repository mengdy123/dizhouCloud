<template>
  <div class="dz-system">
    <div class="dz-system-title">满意度考评</div>
    <div class="dz-system-module">
      <ul v-for="(item, index) in evaluationType"
          :key="index">
        <li>{{item.label}}</li>
        <li>{{item.value}}</li>
      </ul>
    </div>
    <div class="dz-system-type">
      <ul v-for="(item, index) in chartList"
          :key="index">
        <li class="dz-system-type-title">{{item.title}}</li>
        <li class="dz-system-type-chart">
          <pieChart8 class="pie-chart"
                     :value='valuePie'
                     ref="valueChart"
                     :colors='colors'></pieChart8>
        </li>
      </ul>

    </div>
    <div class="dz-system-table">
      <myTable :tableData="tableDataNew"
               :tableConfigArr='tableConfigArr'
               :selection="false"
               :action='actionList'
               :height='heightTable'
               :http='http'
               :detail='false'
               name='满意度考评'
               @getList='getProgectList'
               @disebleTable='disebleTable'
               :index='true'></myTable>
    </div>
  </div>
</template>
<script>
import systemMirror from '@/resource/systemMirror'
import { mapState, mapActions } from 'vuex'
import timeReg from '@/utils/timeReg'
import myTable from "@/components/Table";
import pieChart8 from '@/components/charts/pieChart8.vue'
export default {
  components: { myTable, pieChart8 },
  data () {
    return {
      tableData: [],
      tableConfigArr: [
        {
          fixed: false,
          prop: 'userName',
          label: '用户姓名',
          width: '180px',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'userRole',
          width: '180px',
          label: '用户角色 ',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'perent',
          label: '综合服务评分    ',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'number',
          label: '维修设备数量',
          tooltip: false,
        },
      ],
      tableDataNew: [
        {
          userName: '张三',
          userRole: '员工',
          perent: '80',
          number: '100'
        },
        {
          userName: '张三',
          userRole: '员工',
          perent: '80',
          number: '100'
        },
        {
          userName: '张三',
          userRole: '员工',
          perent: '80',
          number: '100'
        },
        {
          userName: '张三',
          userRole: '员工',
          perent: '80',
          number: '100'
        },
        {
          userName: '张三',
          userRole: '员工',
          perent: '80',
          number: '100'
        },
        {
          userName: '张三',
          userRole: '员工',
          perent: '80',
          number: '100'
        },
      ],
      heightTable: 'calc(100vh - 640px)',
      http: '/manage/project/getProjectById?projectId=',
      actionList: [
        {
          name: '详情',
          style: 'view-screen'
        },
        {
          name: '删除',
          style: 'disable-button'
        },
      ],
      evaluationType: [
        {
          label: '维修人员数量（人）',
          value: '20'
        },
        {
          label: '维修设备数量（个）',
          value: '15968'
        },
        {
          label: '综合服务评分',
          value: '80'
        },
        {
          label: '综合服务级别',
          value: '优'
        }
      ],
      chartList: [
        {
          title: '考评级别占比'
        },
        {
          title: '考评级别设备占比'
        }
      ],
      valuePie: [],
      colors: ['#5470C6', '#EE6666', '#FC8452', '#91CC75', '#FFA321']
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
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
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
        currentPage: 1,
        pageSize: 1000,
      }
      systemMirror.getProjectList(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          // this.tableData = result.content
          // this.total = result.recordTotal
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
    disebleTable (row) {
      let params = {
        ...row,
      }
      params.updateTime = ''
      if (params.status === '4') {
        params.status = '1'
      } else {
        params.status = '4'
      }
      systemMirror.updateProject(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.$message.success(serviceMessage)
          this.getProgectList()
        }
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.getProgectList()
    },
  },
}
</script>
<style lang="less" scoped>
.dz-system {
  &-module {
    display: flex;
    margin: 30px 0;
    ul {
      width: 260px;
      height: 100px;
      border-radius: 4px;

      padding: 16px;
      margin-right: 70px;
      li:first-child {
        color: #666666;
        font-size: 14px;
      }
      li:last-child {
        font-weight: bold;
        font-size: 30px;
        margin-top: 10px;
      }
    }
    ul:nth-child(1),
    ul:nth-child(2) {
      background: #d5ebff;
      li:last-child {
        color: #333333;
      }
    }
    ul:nth-child(3),
    ul:nth-child(4) {
      background: #fff3db;
      li:last-child {
        color: #3ca272;
      }
    }
  }
  &-type {
    display: flex;
    ul {
      width: 400px;
      height: 280px;
      padding: 30px;
      margin-right: 20px;
      border-radius: 2px;
      margin: 20px 0;
    }
    &-title {
      font-weight: bold;
      font-size: 14px;
      color: #333333;
    }
    &-chart {
      width: 100%;
      height: 100%;
      .pie-chart {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>