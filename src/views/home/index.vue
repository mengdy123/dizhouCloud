<template>
  <div class="dz-content">
    <div class="dz-content-left">
      <leftDiv></leftDiv>
    </div>
    <div class="dz-content-right">
      <rightDiv></rightDiv>
    </div>
    <div class="dz-content-bottom">
      <bottomDiv></bottomDiv>
    </div>
  </div>
</template>
<script>
import leftDiv from './components/homeLeftModule'
import rightDiv from './components/homeRightModule'
import bottomDiv from './components/homeBottomModule'
import { getCookie } from "@/utils/cookie";
import { mapState } from 'vuex'
export default {
  components: { leftDiv, rightDiv, bottomDiv },
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  mounted () {
    console.log('---------------', getCookie('name'))
    console.log('---------------', this.userInfo)
  }
}
</script>
<style lang="less" scoped>
@import "../../style/color.less";
.dz-content {
  display: flex;
  color: @white;
  &-left {
    width: 420px;
    height: calc(100vh - 60px);
    background: @bgBlue;
    padding: 20px 20px;
    position: fixed;
    left: 0;
    top: 60px;
  }
  &-right {
    width: 420px;
    height: calc(100vh - 60px);
    // background: @bgBlue;
    position: fixed;
    right: 0;
    top: 60px;
  }
  &-bottom {
    width: calc(100% - 860px);
    height: 250px;
    // background: @bgBlue;
    position: fixed;
    left: 430px;
    bottom: 0px;
  }
}
</style>