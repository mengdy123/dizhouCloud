<template>
  <div class="dz-time-div">
    <div class="time">{{nowTime}}</div>
    <div class="set"
         @click="goBackName('/system')">
      <icon-svg icon-class="chilun-o" />后台
      <!-- <router-link :to="{name:'system'}"> 后台</router-link> -->
    </div>
    <div class="user-info">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <icon-svg icon-class="touxiang" /> 超级管理员<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      nowTime: ''
    }
  },
  mounted () {
    this.nowTimes()
  },
  methods: {
    //显示当前时间（年月日时分秒）
    timeFormate (timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month = new Date(timeStamp).getMonth() + 1 < 10 ? "0" + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1;
      let date = new Date(timeStamp).getDate() < 10 ? "0" + new Date(timeStamp).getDate() : new Date(timeStamp).getDate();
      let hh = new Date(timeStamp).getHours() < 10 ? "0" + new Date(timeStamp).getHours() : new Date(timeStamp).getHours();
      let mm = new Date(timeStamp).getMinutes() < 10 ? "0" + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes();
      let ss = new Date(timeStamp).getSeconds() < 10 ? "0" + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds();
      let week = new Date(timeStamp).getDay();
      let weeks = ["日", "一", "二", "三", "四", "五", "六"];
      let getWeek = "星期" + weeks[week];
      this.nowTime = year + "年" + month + "月" + date + "日" + "      " + hh + ":" + mm + ':' + ss + "      " + getWeek;
    },
    nowTimes () {
      this.timeFormate(new Date());
      setInterval(this.nowTimes, 1000);
      this.clear()
    },
    clear () {
      clearInterval(this.nowTimes)
      this.nowTimes = null;
    },
    goBackName (name) {
      this.$router.push(name)
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../style/color.less";
/deep/ .el-dropdown {
  font-size: 12px;
}

.dz-time-div {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex: 1;
  line-height: 100%;
  .user-info,
  .set,
  .time {
    font-size: 12px;
    color: @white;
    padding-right: 6px;
    display: flex;
    a,
    /deep/ .el-dropdown {
      color: @white;
      display: flex;
      cursor: pointer;
      border: 0;
      text-decoration: none;
    }
  }
  .set {
    cursor: pointer;
  }
  /deep/ .svg-icon {
    width: 16px;
    height: 16px;
    fill: @white;
  }
}
</style>