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
          <el-tree :data="menuList"
                   show-checkbox
                   default-expand-all
                   node-key="id"
                   ref="menuTree"
                   highlight-current
                   :props="defaultProps">
          </el-tree>
        </div>
        <div class="menu-div-box">
          <div class="menu-div-box-title">
            <el-checkbox :indeterminate="isIndeterminate"
                         v-model="checkAll"
                         @change="handleCheckAllChange">全选</el-checkbox>
          </div>
          <div class="menu-div-box-list">
            <el-checkbox-group v-model="checkedCities"
                               @change="handleCheckedCitiesChange">
              <el-checkbox v-for="city in cities"
                           :label="city"
                           :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
    </el-form>
    <div class="form-footer">
      <el-button type="primary"
                 @click="submitForm">确 定</el-button>
      <el-button @click="handleClose">取 消</el-button>
      <!-- <el-button @click="getCheckedNodes">通过 node 获取</el-button>
      <el-button @click="getCheckedKeys">通过 key 获取</el-button>
      <el-button @click="setCheckedNodes">通过 node 设置</el-button>
      <el-button @click="setCheckedKeys">通过 key 设置</el-button>
      <el-button @click="resetChecked">清空</el-button> -->
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
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
      data: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [{
                id: 9,
                label: '三级 1-1-1'
              }, {
                id: 10,
                label: '三级 1-1-2'
              }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            }, {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      isIndeterminate: true,
      isIndeterminateMenu: false,
      checkAll: false,
      checkAllMenu: false,
      checkedCities: ['新增'],
      cities: ['新增', '编辑', '详情'],
      selectMenuList: []
    };
  },
  computed: {
    ...mapState({
      menuStatus: state => state.system.menuStatus,
      menuList: state => state.system.menuList,
    })
  },
  methods: {
    ...mapActions(['saveDetailInfo']),
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
    handleClose () {
      this.$refs['ruleForm'].resetFields();
      this.$emit('changeProjectBox', false)
      this.saveDetailInfo({})
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    getCheckedNodes () {
      console.log(this.$refs.tree.getCheckedNodes());
    },
    getCheckedKeys () {
      console.log(this.$refs.tree.getCheckedKeys());
    },
    setCheckedNodes () {
      this.$refs.tree.setCheckedNodes([{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 9,
        label: '三级 1-1-1'
      }]);
    },
    setCheckedKeys () {
      this.$refs.tree.setCheckedKeys([3]);
    },
    resetChecked () {
      this.$refs.tree.setCheckedKeys([]);
    },
    handleCheckAllChange (val) {
      this.checkedCities = val ? this.cities : [];
      this.isIndeterminate = false;
    },
    handleCheckAllMenu (val) {
      console.log('this.checkAllMenu', this.checkAllMenu)
      if (this.checkAllMenu) {
        //全选
        this.$refs['menuTree'].setCheckedNodes(this.menuList);
      } else {
        //取消选中
        this.$refs['menuTree'].setCheckedKeys([]);
      }
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    }
  }
}
</script>
<style lang="less" scoped>
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