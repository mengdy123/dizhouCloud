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
    <!-- <div class="dz-content-button">
      <controlDiv></controlDiv>
    </div> -->
    <!-- <Dialog dialogTitle="过去24小时AQI指数"
            popupWidth='40%'
            :visible.sync="dialogVisible"
            @updateVisible="updateVisible"
            @resetPopupData="resetPopupData"
            @submitPopupData="submitPopupData"
            @handleClose="handleClose">
    </Dialog> -->
  </div>
</template>
<script>
import leftDiv from './components/sceneLeftModule'
import rightDiv from './components/sceneRightModule'
import bottomDiv from './components/sceneBottomModule'
import controlDiv from './components/sceneControl'
import { getCookie } from "@/utils/cookie";
import eventBus from '@/utils/bus'
import { mapActions, mapState } from 'vuex'
import Dialog from '@/components/Dialog'
export default {
  components: { leftDiv, rightDiv, bottomDiv, controlDiv, Dialog },
  data () {
    return {
      provinceShow: false,
      cityShow: false,
      dialogVisible: true,
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      scaleData: state => state.map2D.scaleData,
      provinceSelectData: state => state.map2D.provinceSelectData,
      citySelectData: state => state.map2D.citySelectData,
    })
  },
  watch: {
    provinceSelectData: {
      deep: true,
      handler (newVal, oldVal) {
        if (newVal) {
          this.provinceShow = true
        } else {
          this.provinceShow = false
        }
      },
      immediate: true
    },
    citySelectData: {
      deep: true,
      handler (newVal, oldVal) {
        if (newVal) {
          this.cityShow = true
        } else {
          this.cityShow = false
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions(['getWeatherInfo', 'getAirInfo', 'getWarningInfo']),
    // 修改是否让页面显示与隐藏的事件
    updateVisible (val) {
      this.dialogVisible = val
    },
    // 点击取消的事件
    resetPopupData () {
      //  这里可重置数据
      this.dialogVisible = false
    },
    // 点击确定的按钮
    async submitPopupData () {
      this.dialogVisible = false
    },
    // 关闭弹框（头部的X）
    handleClose () {
      this.dialogVisible = false
    }
  },
  created () {
    this.getWeatherInfo()
    this.getAirInfo()
    this.getWarningInfo()
  }
}
</script>
<style lang="less" scoped>
@import "../../style/color.less";
.gray-color {
  color: #999 !important;
  pointer-events: none !important;
  cursor: not-allowed !important;
}
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
    background: @bgBlue;
    padding: 20px 20px;
    position: fixed;
    right: 0;
    top: 60px;
  }
  &-bottom {
    width: calc(100% - 860px);
    height: 246px;
    position: fixed;
    left: 430px;
    bottom: 0px;
  }
  &-button {
    width: calc(100% - 860px);
    height: 46px;
    position: fixed;
    left: 430px;
    bottom: 254px;
  }
}
</style>