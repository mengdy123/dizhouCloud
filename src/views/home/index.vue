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
    <div class="dz-content-change">
      <div class="change-map-div"
           @click="clearMapLayer">
        <!-- <img src="../../assets/icon/zuixing-81.png"
             alt=""> -->
        <i class="el-icon-refresh"></i>
      </div>
    </div>
    <div class="dz-content-control">
      <div class="dz-content-control-label">当前比例尺 1:{{scaleData}}</div>
      <div class="dz-content-control-city">
        <div class="zoom-map-div"
             @click="clickMapCircle('country')"><i>国</i></div>
        <!-- :class="{'gray-color': !provinceShow}" -->
        <div class="zoom-map-div"
             @click="clickMapCircle('province')"><i>省</i></div>
        <!-- :class="{'gray-color': !districtShow}" -->
        <div class="zoom-map-div"
             @click="clickMapCircle('district')">
          <i>市</i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import leftDiv from './components/homeLeftModule'
import rightDiv from './components/homeRightModule'
import bottomDiv from './components/homeBottomModule'
import { getCookie } from "@/utils/cookie";
import eventBus from '@/utils/bus'
import { mapState } from 'vuex'
export default {
  components: { leftDiv, rightDiv, bottomDiv },
  data () {
    return {
      provinceShow: false,
      districtShow: false
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      scaleData: state => state.map2D.scaleData,
      addressInfo: state => state.map2D.addressInfo,
    })
  },
  watch: {
    addressInfo: {
      deep: true,
      handler (newVal, oldVal) {
        console.log('newVal', newVal)
        if (newVal && newVal.length === 1) {
          this.provinceShow = true
        } else if (newVal && newVal.length > 1) {
          this.districtShow = true
        } else {
          this.provinceShow = false
          this.districtShow = false
        }
      },
      immediate: true
    }
  },
  methods: {
    clickMapCircle (type) {
      if (type === 'country') {
        eventBus.$emit('setZoomAndCenterFun')
      }
      // else if (type === 'province') {
      //   eventBus.$emit('setFitViewByCode', this.addressInfo[0])
      // } else if (type === 'district') {
      //   eventBus.$emit('setFitViewByCode', this.addressInfo[1])
      // } else {
      //   return
      // }

    },
    clearMapLayer () {
      eventBus.$emit('removeRenderClusterMarker')
    }
  },
  mounted () {
    // console.log('---------------', getCookie('name'))
    console.log('addressInfo', this.addressInfo)
  }
}
</script>
<style lang="less" scoped>
@import "../../style/color.less";
.gray-color {
  color: #333 !important;
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
  .zoom-map-div {
    width: 36px;
    height: 36px;
    background: url("../../assets/home/circle-map.png") no-repeat;
    background-size: 100% 100%;
    line-height: 36px;
    color: @white;
    text-align: center;
    cursor: pointer;
    margin: 6px auto;
    i {
      color: @titleTopBlue;
      font-style: normal;
    }
  }
  &-change {
    width: 60px;
    background: @bgBlue;
    position: fixed;
    right: 430px;
    bottom: 356px;
    padding: 6px;
    .change-map-div {
      width: 36px;
      height: 36px;
      // background: url("../../assets/home/3d.png") no-repeat;
      background: url("../../assets/home/circle-map.png") no-repeat;
      background-size: 100% 100%;
      line-height: 44px;
      color: @white;
      text-align: center;
      cursor: pointer;
      margin: 0px auto;

      img {
        width: 20px;
        height: 20px;
      }
      i {
        font-size: 16px;
        color: #35e9ff;
      }
    }
  }
  &-control {
    background: @bgBlue;
    position: fixed;
    left: 430px;
    bottom: 260px;
    padding: 6px;
    &-label {
      font-size: 12px;
      margin: 0 6px;
    }
    &-city {
      display: flex;
      color: @white;
      justify-content: start;
      .zoom-map-div {
        margin: 6px 2px;
      }
    }
  }
}
</style>