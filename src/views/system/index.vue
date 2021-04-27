<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: mandy
 * @Date: 2021-02-04 12:54:08
 * @LastEditors: mandy
 * @LastEditTime: 2021-03-12 10:32:11
-->
<template>
  <div class="dz-system-body">
    <div class="dz-system-menu"
         :class="[{'small-menu': !menuStatus},{'big-menu': menuStatus}]">
      <systemTitle></systemTitle>
      <menuBox></menuBox>
    </div>
    <div class="dz-system-content"
         :class="[{'small-content': !menuStatus},{'big-content': menuStatus}]">
      <div class="dz-system-content-top">
        <div @click="showVersionsLogs">
          <i class="el-icon-info"></i>
        </div>
        <div @click="goHomeIndex">
          <i class="el-icon-picture-outline-round"></i>
          <span>智慧看板</span>
        </div>
        <div>
          <i class="el-icon-user"></i>
          <el-dropdown>
            <!-- <span>超级管理员</span> -->
            <span class="el-dropdown-link">
              {{userInfo.userName || 'null'}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="toPath('/information')">个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="toPath('/changePassword')">修改密码</el-dropdown-item>
              <el-dropdown-item>登出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="dz-system-content-bottom">
        <router-view></router-view>
      </div>
      <el-drawer title="版本日志"
                 :visible.sync="versionsLogsStatus"
                 :direction="direction"
                 :before-close="handleClose">
        <versionsDiv></versionsDiv>
      </el-drawer>
    </div>
  </div>
</template>
<script>
import menuBox from './components/menuModule'
import systemTitle from './components/systemTitle'
import { mapState, mapActions } from 'vuex'
import systemMirror from '@/resource/systemMirror'
import systemManageMirror from '@/resource/systemManageMirror'
import versionsDiv from './systemBody/versionsLogs'
export default {
  components: { menuBox, systemTitle, versionsDiv },
  data () {
    return {
      versionsLogsStatus: false,
      direction: 'rtl',
      userInfo: {}
    }
  },
  created () {
    this.getList()
  },
  computed: {
    ...mapState({
      menuStatus: state => state.system.menuStatus,
    })
  },
  mounted () {
    this.userInfo = JSON.parse(this.Cookie.get("userInfo"))
    // console.log('this.userInfo', this.userInfo)
  },
  methods: {
    ...mapActions(['saveProjectList', 'saveSystemList', 'saveCompanyList', 'saveFailTypeList', 'saveRoleList', 'saveDeviceTypeList']),
    goHomeIndex () {
      this.$router.push('mainIndex')
    },
    handleClose (done) {
      done();
    },
    showVersionsLogs () {
      this.versionsLogsStatus = true
    },
    getList () {
      let params = {
        currentPage: 1,
        pageSize: 10000,
      }
      systemMirror.getProjectList(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.saveProjectList(result.content)
        }
      })
      systemMirror.getListBySeek(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.saveSystemList(result.content)
        }
      })
      systemMirror.getCompanyList(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.saveCompanyList(result.content)
        }
      })
      systemMirror.getFailTypeList(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.saveFailTypeList(result.content)
        }
      })
      // systemManageMirror.getPermissionAll(params).then(res => {
      //   let { code, result, serviceMessage } = res.data
      //   if (code === 200) {
      //     this.saveRoleList(result.content)
      //   }
      // })
      systemManageMirror.getRoleAll(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.saveRoleList(result)
        }
      })

      systemMirror.getListByDevice(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.saveDeviceTypeList(result.content)
        }
      })

    },
    toPath (path) {
      console.log('dropdown', path)
      this.$router.push(path)
    }
  },
  beforeDestroy () {
    this.Cookie.set('defaultActive', '')
  }

}
</script>
<style lang="less" scoped>
.dz-system-body {
  width: 100%;
  height: 100%;
  display: flex;
  .dz-system-menu {
    height: 100%;
    background: #001529;
    box-shadow: 2px 0px 6px rgba(0, 21, 41, 0.35);
  }
  .dz-system-content {
    height: 100%;
    background: #f2f2f2;
    display: flex;
    flex-flow: column;
    &-top {
      width: 100%;
      height: 48px;
      background: #ffffff;
      box-shadow: 0px 1px 4px rgba(0, 21, 41, 0.12);
      display: flex;
      justify-content: flex-end;
      div {
        display: flex;
        margin-right: 20px;
        line-height: 48px;
        cursor: pointer;
        i,
        img {
          width: 14px;
          height: 14px;
          margin: 17px 10px;
        }
        span {
          font-size: 12px;
          color: #333333;
        }
      }
    }
    &-bottom {
      width: calc(100% - 40px);
      height: calc(100% - 88px);
      background: #ffffff;
      border-radius: 2px;
      margin: 20px;
      padding: 30px;
    }
  }
  .small-menu {
    width: 240px;
    // overflow-y: scroll;
  }
  .big-menu {
    width: 64px;
  }
  .small-content {
    // width: 240px;
    width: calc(100% - 240px);
  }
  .big-content {
    // width: 80px;
    width: calc(100% - 64px);
  }
}
</style>