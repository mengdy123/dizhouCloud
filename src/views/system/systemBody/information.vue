<template>
  <div class="dz-system detail-module">
    <div class="dz-system-title">个人中心</div>
    <div class="dz-system-information">
      <img src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
           alt="">
      <ul>
        <li v-for="(item, index) in baseInfo"
            :key="index">
          <span>{{item.label}}：</span>
          <span v-if="item.label !== '免冠照片'">{{item.value}}</span>
          <img v-if="item.label === '免冠照片'"
               :src="item.value"
               alt="">
        </li>
      </ul>

    </div>
    <div class="detail-module-row">
      <el-menu :default-active="activeIndex"
               class="el-menu-demo"
               mode="horizontal"
               @select="handleSelect">
        <el-menu-item v-for="(item, index) in menuItem"
                      :index="index"
                      :key="index">{{item.name}}</el-menu-item>
      </el-menu>
      <div class="detail-form history-table"
           v-if="activeIndex === 0">
        <myTable :tableData="tableDataNew"
                 :tableConfigArr='tableConfigArr'
                 :selection="false"
                 :action='actionList'
                 :height='heightTable'
                 name='项目管理'
                 @getList='getProgectList'
                 :index='true'></myTable>
      </div>
      <div class="detail-form history-table"
           v-if="activeIndex === 1">
        <myTable :tableData="tableMenu"
                 :tableConfigArr='menuConfigArr'
                 :selection="false"
                 :action='actionList'
                 :height='heightTable'
                 name='功能菜单'
                 @getList='getProgectList'
                 :index='true'></myTable>
      </div>
      <div v-if="activeIndex === 2"
           class="detail-form history-table">
        <logsDiv></logsDiv>
      </div>
    </div>
  </div>

</template>
<script>
import titleDiv2 from "@/components/titleModule/titleSystemDetail.vue";
import myTable from "@/components/Table";
import logsDiv from '@/components/Logs'
export default {
  components: { titleDiv2, myTable, logsDiv },
  data () {
    return {
      baseInfo: [
        {
          label: '用户名',
          value: '张三'
        },
        {
          label: 'ID号',
          value: '123456'
        },
        // {
        //   label: '登录密码',
        //   value: '****'
        // },
        {
          label: '联系方式',
          value: '15736888888'
        },
        {
          label: '部门',
          value: '研发部'
        },
        {
          label: '职务',
          value: '前端开发工程师'
        },
        {
          label: '角色',
          value: '研发'
        },
        {
          label: '权限',
          value: '三级权限'
        },
        // {
        //   label: '功能菜单',
        //   value: ''
        // },
        // {
        //   label: '项目列表',
        //   value: ''
        // },
        {
          label: '账号状态',
          value: '正常'
        },
        // {
        //   label: '操作日志',
        //   value: ''
        // },
        {
          label: '免冠照片',
          value: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        },
      ],
      tableConfigArr: [
        {
          fixed: false,
          prop: 'projectNumber',
          label: '项目编号',
          width: '100px',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'projectName',
          width: '200px',
          label: '项目名称',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'projectSite',
          width: '200px',
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
          prop: 'statusLable',
          label: '状态',
          tooltip: false,
        },
        {
          fixed: false,
          prop: 'createTime',
          label: '运行时间',
          tooltip: false,
        },
      ],
      tableDataNew: [],
      heightTable: '300px',
      currentPage: 1,
      pageSize: 10000,
      actionList: [],
      tableMenu: [],
      menuConfigArr: [
        {
          fixed: false,
          prop: 'menuName',
          label: '菜单名称',
          tooltip: true,
        },
        {
          fixed: false,
          prop: 'menuName',
          label: '权限',
          tooltip: true,
        },
      ],
      menuItem: [

        {
          name: '功能菜单',

        },
        {
          name: '项目列表',

        },
        {
          name: '操作日志',

        }
      ],
      activeIndex: 2
    }
  },
  mounted () {

  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath);
      this.activeIndex = key
    },
    getProgectList () { }
  }
}
</script>
<style lang="less" scoped>
.history-table {
  margin-top: 20px;
}
.dz-system {
  &-information {
    display: flex;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    ul {
      margin-left: 60px;
      display: flex;
      flex-wrap: wrap;
      li {
        display: flex;
        line-height: 24px;
        width: 20%;
        padding: 10px 0px 10px 0px;
        img {
          width: 60px;
          height: 60px;
          border-radius: 6px;
        }
      }
    }
  }
}
</style>