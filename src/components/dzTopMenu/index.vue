<template>
  <div class="dz-time-div">
    <div class="time">2021年01月26日 星期二 13:43</div>
    <div class="set">
      <icon-svg icon-class="chilun-o" />后台
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
<style lang="less" scoped>
@import "../../style/color.less";
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
    /deep/ .el-dropdown {
      color: @white;
      display: flex;
      cursor: pointer;
      border: 0;
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