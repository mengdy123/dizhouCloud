<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: mandy
 * @Date: 2021-03-12 10:10:29
 * @LastEditors: mandy
 * @LastEditTime: 2021-03-12 10:31:11
-->
<template>
  <div class="dz-menu-module">
    <div class="dz-menu-radio">
      <i class="el-icon-s-fold"
         v-if="!menuStatus"
         @click="changeMenu(true)"></i>
      <i class="el-icon-s-unfold"
         v-else
         @click="changeMenu(false)"></i>
    </div>
    <el-menu default-active="1-4-1"
             class="el-menu-vertical-demo"
             background-color="#001529"
             text-color="#fff"
             active-text-color="#fff"
             @open="handleOpen"
             @close="handleClose"
             :collapse="menuStatus">
      <el-submenu v-for="(item, index) in menuList"
                  :index="index + 1"
                  :key="item.name">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{item.name}}</span>
        </template>
        <el-menu-item v-for="(it, ind) in item.children"
                      :key="it.name"
                      :index="it.name + '-'+ ind+1">{{it.name}}</el-menu-item>
      </el-submenu>
    </el-menu>

    <!-- <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
					 unique-opened router v-show="!collapsed">
					<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				</el-menu> -->

  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
    };
  },
  computed: {
    ...mapState({
      menuStatus: state => state.system.menuStatus,
      menuList: state => state.system.menuList,
    })
  },
  methods: {
    ...mapActions(['changeMenuStatus']),
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },
    changeMenu (type) {
      this.changeMenuStatus(type)
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .el-menu-item.is-active {
  // color: #409EFF;
  background: #2761ff !important;
  font-weight: 600;
}
/deep/ .el-menu {
  border-right: 0 !important;
}
.dz-menu-module {
  position: relative;
  width: 100%;
}
.dz-menu-radio {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 2;
  i {
    font-size: 20px;
    color: rgba(255, 255, 255, 0.65);
    cursor: pointer;
  }
}
</style>
