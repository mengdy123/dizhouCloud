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
      <!-- 一级菜单 -->
      <template v-for="(item, index) in menuList">
        <el-submenu v-if="item.children && item.children.length"
                    :index="item.index"
                    :key="item.path">
          <template slot="title">
            <img v-if="index === 0"
                 class="img-icon"
                 src="../../../../assets/system_icon/01.png"
                 alt="">
            <img v-if="index === 2"
                 class="img-icon"
                 src="../../../../assets/system_icon/02.png"
                 alt="">
            <img v-if="index === 1"
                 class="img-icon"
                 src="../../../../assets/system_icon/03.png"
                 alt="">
            <img v-if="index === 3"
                 class="img-icon"
                 src="../../../../assets/system_icon/04.png"
                 alt="">
            <span slot="title">{{item.name}}</span>
          </template>
          <!-- 二级菜单 -->
          <template v-for="itemChild in item.children">
            <el-submenu v-if="itemChild.children && itemChild.children.length"
                        :index="itemChild.index"
                        :key="itemChild.index">
              <template slot="title">
                <span>{{itemChild.name}}</span>
              </template>
              <!-- 三级菜单 -->
              <el-menu-item v-for="itemChild_Child in itemChild.children"
                            :index="itemChild_Child.index"
                            :key="itemChild_Child.index"
                            @click="menuClick(itemChild_Child)">
                <span slot="title">{{itemChild_Child.name}}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else
                          :index="itemChild.index"
                          :key="itemChild.index"
                          @click="menuClick(itemChild)">
              <span slot="title">{{itemChild.name}}</span>
            </el-menu-item>
          </template>
        </el-submenu>

        <el-menu-item v-else
                      :index="item.index"
                      :key="item.index"
                      @click="menuClick(item)">
          <!-- <i :class="item.icon"></i> -->
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </template>
    </el-menu>
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
  mounted () {
  },
  methods: {
    ...mapActions(['changeMenuStatus']),
    handleOpen (key, keyPath) {
      console.log('key', key);
      console.log('keyPath', keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },
    changeMenu (type) {
      this.changeMenuStatus(type)
    },
    menuClick (item) {
      console.log('item', item)
      this.$router.push(item.path)
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
.img-icon {
  width: 14px;
  height: 14px;
}
</style>
