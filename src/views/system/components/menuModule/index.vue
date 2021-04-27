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
    <!-- default-active="1-4-1" -->
    <el-menu :default-active='defaultActive'
             class="el-menu-vertical-demo"
             background-color="#001529"
             text-color="#fff"
             active-text-color="#fff"
             @open="handleOpen"
             @close="handleClose"
             :collapse="menuStatus">
      <!-- 一级菜单 -->
      <template v-for="(item, index) in menuList">
        <el-submenu v-if="item.childrenMenu && item.childrenMenu.length"
                    :index="item.text"
                    :key="item.url">
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
            <span slot="title">{{item.menuName}}</span>
          </template>
          <!-- 二级菜单 -->
          <template v-for="itemChild in item.childrenMenu">
            <el-submenu v-if="itemChild.childrenMenu && itemChild.childrenMenu.length"
                        :index="itemChild.text"
                        :key="itemChild.text">
              <template slot="title">
                <span>{{itemChild.menuName}}</span>
              </template>
              <!-- 三级菜单 -->
              <el-menu-item v-for="itemChild_Child in itemChild.childrenMenu"
                            :index="itemChild_Child.text"
                            :key="itemChild_Child.text"
                            @click="menuClick(itemChild_Child)">
                <span slot="title">{{itemChild_Child.menuName}}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else
                          :index="itemChild.text"
                          :key="itemChild.text"
                          @click="menuClick(itemChild)">
              <span slot="title">{{itemChild.menuName}}</span>
            </el-menu-item>
          </template>
        </el-submenu>

        <el-menu-item v-else
                      :index="item.text"
                      :key="item.text"
                      @click="menuClick(item)">
          <!-- <i :class="item.icon"></i> -->
          <span slot="title">{{item.menuName}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import systemManageMirror from '@/resource/systemManageMirror'
export default {
  data () {
    return {
      userInfo: {},
      defaultActive: '',
      // menuList: []
    };
  },
  computed: {
    ...mapState({
      menuStatus: state => state.system.menuStatus,
      menuList: state => state.system.menuList,
    })
  },
  mounted () {
    this.userInfo = JSON.parse(this.Cookie.get("userInfo"))
    console.log('this.userInfo', this.userInfo)
    // this.getUserById(this.userInfo.id)
    this.defaultActive = this.Cookie.get('defaultActive') || 'project-1'
  },
  methods: {
    ...mapActions(['changeMenuStatus']),
    handleOpen (key, keyPath) {
      // console.log('key', key);
      // console.log('keyPath', keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },
    changeMenu (type) {
      this.changeMenuStatus(type)
    },
    menuClick (item) {
      // console.log('item', item)
      this.Cookie.set('defaultActive', item.text)
      this.$router.push(item.url)
    },
    getUserById (id) {
      systemManageMirror.getUserById(id).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          console.log('后台菜单', result.menuList)
          let data = result
          this.menuList = result.menuList
          if (this.menuList && this.menuList.length) {
            this.menuList.forEach(item => {
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
        item.url = item.url
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
        item.url = item.url
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
  height: calc(100vh - 130px);
  overflow-y: scroll;
}
.dz-menu-radio {
  position: fixed;
  bottom: 0px;
  left: 0px;
  z-index: 2;
  width: 240px;
  height: 60px;
  padding: 20px;
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
