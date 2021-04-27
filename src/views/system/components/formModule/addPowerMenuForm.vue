<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: mandy
 * @Date: 2021-03-23 10:19:37
 * @LastEditors: mandy
 * @LastEditTime: 2021-03-23 10:51:02
-->
<template>
  <div class="form-module">
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm">
      <!-- 权限菜单 -->

      <div class="menu-div">
        <div class="menu-div-tree">
          <div class="menu-div-tree-title">
            <span>权限菜单</span>
            <span>
              <el-checkbox :indeterminate="isIndeterminateMenu"
                           v-model="checkAllMenu"
                           @change="handleCheckAllMenu">全选</el-checkbox>
            </span>
          </div>
          <el-tree :data="menuArr"
                   show-checkbox
                   default-expand-all
                   node-key="id"
                   ref="menuTree"
                   highlight-current
                   :props="defaultProps"
                   :default-checked-keys="checkedKeys"
                   :check-on-click-node='true'
                   @node-click="handleNodeClick"
                   @check-change="handleCheckChange">
          </el-tree>
        </div>
        <div class="menu-div-box">
          <div class="menu-div-box-title">
            <el-checkbox :indeterminate="isIndeterminate"
                         v-model="checkAll"
                         @change="handleCheckAllOperation">全选</el-checkbox>
          </div>
          <div class="menu-div-box-list">
            <el-checkbox-group v-model="checkedCities"
                               @change="handleCheckedCitiesChange"
                               disabled>
              <el-checkbox v-for="(city,i) in cities"
                           :label="city.name"
                           :key="i">{{city.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
    </el-form>
    <div class="form-footer">
      <el-button type="primary"
                 @click="submitForm">确 定</el-button>
      <el-button @click="handleClose">取 消</el-button>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import systemManageMirror from '@/resource/systemManageMirror'
export default {
  data () {
    return {
      ruleForm: {
        name: '',
        role: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        role: [
          { required: true, message: '请输入角色权限', trigger: 'change' },
        ],
      },
      defaultProps: {
        children: 'childrenMenu',
        label: 'menuName',
      },
      isIndeterminateMenu: false,
      checkAllMenu: false,
      selectMenuList: [],
      menuArr: [],
      checkedKeys: [],
      checkAll: false,
      cities: [], //数据源
      checkedCities: [], //绑定默认选中
      isIndeterminate: false, //设置 indeterminate 状态，只负责样式控制
      nowSelectBox: [],// 当前选中的节点
    };
  },
  computed: {
    ...mapState({
      menuStatus: state => state.system.menuStatus,
      menuList: state => state.system.menuList,
      operationList: state => state.operation.operationList,
    })
  },
  mounted () {
    console.log('operationList', this.operationList)
    this.getMenuByPermissionId(1)
  },
  methods: {
    ...mapActions(['saveDetailInfo']),
    submitForm () {
      // console.log('submitForm11111', this.$refs.menuTree.getCheckedKeys())
      // console.log('submitForm22222', this.$refs.menuTree.getCheckedNodes())
      let list = this.$refs.menuTree.getCheckedNodes()
      let params = {}
      let arrId = []
      let permissionId
      if (list.length) {
        list.forEach(item => {
          permissionId = item.permissionId
          arrId.push({
            id: item.id,
            permissionId: item.permissionId,
            level: item.level
          })
        })
      }
      params = {
        permissionId: permissionId,
        listMenu: arrId
      }
      this.addPermissionmenu(params)
    },
    addPermissionmenu (params) {
      systemManageMirror.addPermissionmenu(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.$message.success(serviceMessage)
          this.$emit('getList')
          this.$emit('changeProjectBox', false)
        } else {
          this.$message.error(serviceMessage)
        }

      })
    },
    //获取权限菜单 
    getMenuByPermissionId (id) {
      let params = {
        id: id
      }
      systemManageMirror.getMenuByPermissionId(params).then(res => {
        this.checkedKeys = []
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          // console.log('getMenuByPermissionId', result)
          this.menuArr = result
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
    // 菜单权限的全选、非全选
    handleCheckAllMenu () {
      if (this.checkAllMenu) {
        //全选
        this.$refs.menuTree.setCheckedNodes(this.menuArr);
      } else {
        //取消选中
        this.$refs.menuTree.setCheckedKeys([]);
      }
    },
    // 节点被点击时的回调 共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。
    handleNodeClick (data, node) {
      console.log('节点被点击时的回调', data, node);
    },
    // 节点选中状态发生变化时的回调 共三个参数，依次为：
    // 传递给 data 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点
    handleCheckChange (data, checked, indeterminate) {
      console.log('节点选中状态发生变化时的回调', data, checked, indeterminate);
      this.cities = []
      this.nowSelectBox = []
      this.nowSelectBox = Object.assign({}, data)
      this.operationList.forEach(item => {
        if (item.id === data.id) {
          this.cities = item.list
        }
      })
      console.log('this.nowSelectBox', this.nowSelectBox)

      if (this.nowSelectBox.level === '1') {
        this.checkAll = true
      } else {
        this.checkAll = false
      }
    },
    //清空复选框
    resetChecked () {
      this.$refs.menuTree.setCheckedKeys();
    },
    handleClose () {
      this.$refs['ruleForm'].resetFields();
      this.$emit('changeProjectBox', false)
      this.saveDetailInfo({})
    },
    resetChecked () {
      this.$refs.menuTree.setCheckedKeys([]);
    },
    // 操作权限 全选 --- 当绑定值变化时触发的事件
    handleCheckAllOperation (val) {
      console.log('handleCheckAllOperation', val) // this.nowSelectBox.id
      if (val) {
        this.nowSelectBox.level = '1'
      } else {
        this.nowSelectBox.level = '0'
      }
      console.log('操作权限', val) //val的值是一个布尔值，点中全选为false，取消全选为true
      this.cities.forEach(item => {  //当全选被选中的时候，循环遍历源数据，把数据的每一项加入到默认选中的数组去
        this.checkedCities.push(item.name)
      })
      this.checkedCities = val ? this.checkedCities : []; //三元表达式，如果val的值为true，那么就把当前默认选中的值赋值给自身，这样页面页面上所有的元素就都选中了。如果为false，就是取消全选
      this.isIndeterminate = false;  //官网说这是个样式控制，是来控制，什么时候半选的，要不要都无所谓，看你需求
      let list = this.$refs.menuTree.getCheckedNodes()
      list.forEach(item => {
        if (this.nowSelectBox.id === item.id) {
          console.log('item', item)
          item.level = this.nowSelectBox.level
        }
      })

    },
    // 操作权限 checkbox选中 --- 当绑定值变化时触发的事件
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length;   //选中值的长度
      this.checkAll = checkedCount === this.cities.length;  //如果选中值的长度和源数据的长度一样，返回true，就表示你已经选中了全部checkbox，那么就把true赋值给this.checkAll
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length; //同全选按钮事件里面的那个样式控制
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .el-tree-node.is-current > .el-tree-node__content {
  background: #f0f4ff;
  color: #3c77fe;
  font-weight: bold;
}
.menu-div {
  display: flex;
  width: 100%;
  height: 360px;
  justify-content: space-between;
  &-tree {
    width: 200px;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    overflow: scroll;
    &-title {
      height: 40px;
      line-height: 40px;
      background: #f5f7fa;
      margin: 0;
      padding-left: 15px;
      border-bottom: 1px solid #ebeef5;
      box-sizing: border-box;
      color: #000;
      display: flex;
      justify-content: space-between;
      padding-right: 20px;
    }
  }
  &-box {
    width: 200px;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    overflow: scroll;
    &-title {
      height: 40px;
      line-height: 40px;
      background: #f5f7fa;
      margin: 0;
      padding-left: 15px;
      border-bottom: 1px solid #ebeef5;
      box-sizing: border-box;
      color: #000;
    }
    &-list {
      padding: 16px;
    }
  }
}
/deep/ label {
  margin-bottom: 0;
}
</style>