<template>
  <div class="dz-system detail-module">
    <div class="dz-system-title">个人中心</div>
    <div class="dz-system-information">
      <img class="img"
           src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
           alt="">
      <ul>
        <li v-for="(item, index) in baseInfo"
            :key="index">
          <span>{{item.label}}：</span>
          <span v-if="item.label !== '免冠照片'">{{item.value}}</span>
          <el-image class="li-img"
                    v-if="item.label === '免冠照片'"
                    :src="item.value"
                    :preview-src-list="[item.value]">
          </el-image>
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
        <el-tree :data="menuArr"
                 default-expand-all
                 node-key="id"
                 ref="menuTree"
                 highlight-current
                 :props="defaultProps"
                 :check-on-click-node='true'>
        </el-tree>

      </div>
      <div class="detail-form history-table"
           v-if="activeIndex === 1">
        <myTable :tableData="tableData"
                 :tableConfigArr='tableConfigArr'
                 :selection="false"
                 :action='actionList'
                 :height='heightTable'
                 name='项目管理'
                 :index='true'></myTable>
      </div>
      <div v-if="activeIndex === 2"
           class="detail-form history-table">
        <logsDiv :activities='logList'
                 v-if="logList.length"
                 type='操作日志'></logsDiv>
        <span v-else>暂无数据</span>
      </div>
    </div>
  </div>

</template>
<script>
import titleDiv2 from "@/components/titleModule/titleSystemDetail.vue";
import myTable from "@/components/Table";
import logsDiv from '@/components/Logs'
import { mapState, mapActions } from 'vuex'
import systemManageMirror from '@/resource/systemManageMirror'
export default {
  components: { titleDiv2, myTable, logsDiv },
  data () {
    return {
      baseInfo: [
        {
          label: '用户名',
          value: '',
          type: 'userNumber'
        },
        {
          label: 'ID号',
          value: '',
          type: 'id'
        },
        {
          label: '真实姓名',
          value: '',
          type: 'name'
        },
        {
          label: '联系方式',
          value: '',
          type: 'phone'
        },
        {
          label: '部门',
          value: '',
          type: 'departmentName'
        },
        {
          label: '职务',
          value: '',
          type: 'jobName'
        },
        {
          label: '角色',
          value: '',
          type: 'roleName'
        },
        {
          label: '权限',
          value: '',
          type: 'permissionName'
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
          value: '',
          type: 'statusName'
        },
        // {
        //   label: '操作日志',
        //   value: ''
        // },
        {
          label: '免冠照片',
          value: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          type: ''
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
          prop: 'createTime',
          label: '运行时间',
          tooltip: false,
        },
      ],
      tableData: [],
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
      activeIndex: 2,
      userInfo: {},
      defaultProps: {
        children: 'childrenMenu',
        label: 'menuName',
      },
      menuArr: [],
      logList: [],
      // url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      // srcList: [
      //   'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //   'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      // ]
    }
  },
  mounted () {
    this.userInfo = JSON.parse(this.Cookie.get("userInfo"))
    // console.log('this.userInfo', this.userInfo)
    this.getUserById(this.userInfo.id)
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath);
      this.activeIndex = key
    },
    getUserById (id) {
      systemManageMirror.getUserById(id).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          // console.log('个人中心', result)
          let data = result
          this.baseInfo.forEach(item => {
            if (item.type) {
              item.value = data[item.type]
            }
          })
          this.tableDataNew = result.projectList
          this.menuArr = result.menuList
          if (this.menuArr && this.menuArr.length) {
            this.menuArr.forEach(item => {
              if (item.childrenMenu.length > 0) {
                // 即：this.recursionItem(item);在这地方添加的
                item.childrenMenu.forEach(items => {
                  // 下面的就是执行递归的方法，因为我是从第二层才开始需要往下挖的，所以这里多了个forEach,如果从第一层起，从item就好了，即：this.recursionItem(item);在上面添加
                  this.recursionItem(items); // 这里是源头，把一个对象开始递归，开始循环
                  // 如果想看完整数据，那么是在这里打印数据哦
                  console.log(items, '看我查看完整的数据哦')
                  if (items.flag) {
                    this.checkedKeys.push(items.id)
                  }
                  if (items.level === '1') {
                    this.checkAll = true
                  } else {
                    this.checkAll = false
                  }
                  // if (this.checkAll) {
                  //   items.level = '1'
                  // } else {
                  //   items.level = '0'
                  // }
                  // 因为上一步递归时，就已经把循环children的动作做完了，这里是验收递归方法的地方。
                })
              } else {
                // 如果第一层没有子项做的操作。。。。。
              }
            })
          }
        }
      })
    },
    //递归
    recursionItem (item) {
      // 一层一层往下面执行，循环，直到不满足情况的条件下，会自动跳出这个递归方法，然后又到上面方法的源头处，开始执行下一个对象。。。
      if (item.childrenMenu && item.childrenMenu.length > 0) {
        item.value = item.id
        item.label = item.menuName
        item.path = item.url
        item.level = item.level
        item.parentId = item.parentId
        item.permissionId = item.permissionId
        item.flag = item.flag
        // 因为三级联动的数据格式是value和label,所以需要自己手动添加，没有的忽略。
        item.childrenMenu.forEach(ff => {
          // 这里就是判断他的children下面还有没有值，有的话我就要往下挖，就又开始自己调用自己了
          this.recursionItem(ff)
        })
      } else {
        // 这里就是判断，如果我这一层的children下面没有东西的时候该做什么操作 
        item.value = item.id
        item.label = item.menuName
        item.path = item.url
        item.level = item.level
        item.parentId = item.parentId
        item.permissionId = item.permissionId
        item.flag = item.flag // 要添加value和label,否则会看不到标签名字和值
      }
    },
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
    .img {
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
        .li-img {
          width: 60px;
          height: 60px;
          border-radius: 6px;
        }
      }
    }
  }
}
</style>