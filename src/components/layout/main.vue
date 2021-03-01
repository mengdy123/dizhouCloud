<template>
  <div class="dz-main">
    <map3D></map3D>
    <div class="dz-main-body">
      <div class="dz-main-body-top">
        <div class="dz-title-module">
          <dzTitle></dzTitle>
        </div>
        <div class="dz-time-module">
          <dzTopMenu></dzTopMenu>
        </div>
      </div>
      <div class="dz-main-body-content">
        <router-view></router-view>
      </div>
      <div class="dz-video-screen"
           v-if="videoData.status">
        <dv-border-box-13>
          <div class="dz-video-screen-img">
            <videoItem :url='videoData.url'
                       v-if="videoData.status && videoData.type === 'video'"></videoItem>
            <img :src='videoData.url'
                 v-if="videoData.status && videoData.type === 'img'"
                 alt="">
            <div class="dz-video-screen-close"
                 @click="closeScreenBox(false)">
              <icon-svg icon-class="guanbi" />
            </div>
          </div>
        </dv-border-box-13>

      </div>
    </div>
  </div>
</template>

<script>
import map3D from '../map3D'
import dzTitle from '../dzTitle'
import dzTopMenu from '../dzTopMenu'
import videoItem from '@/components/videoItem'
import eventBus from '@/utils/bus'
export default {
  name: 'mainIndex',
  components: { map3D, dzTitle, dzTopMenu, videoItem },
  data () {
    return {
      screenWidth: null,
      videoData: {
        status: false,
        url: '',
        type: ''
      }
    }
  },
  created () {
    // this.$store.dispatch('getHomeIndexInfo')
  },
  methods: {
    closeScreenBox (data) {
      this.videoData = data
    }
  },
  mounted () {
    const that = this
    eventBus.$on('closeScreenBox', data => {
      that.closeScreenBox(data)
    })
  }
}
</script>
<style lang="less" scoped>
@import "../../style/color.less";
.dz-title-module {
  width: 260px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  margin-top: 26px;
  position: fixed;
  margin-left: -130px;
  top: 0px;
  left: 50%;
  z-index: 2;
}
.dz-time-module {
  width: 360px;
  height: 36px;
  line-height: 36px;
  position: fixed;
  right: 0;
  top: 30px;
  z-index: 2;
  text-align: right;
}
.dz-main {
  width: 100%;
  height: 100%;
  position: relative;
  &-body {
    display: flex;
  }
}
.dz-video-screen {
  position: absolute;
  top: 100px;
  height: 650px;
  width: 1350px;
  left: 20%;
  &-img {
    width: 100%;
    height: 100%;
    padding: 30px;
    position: relative;
    z-index: 999;
    img {
      width: 100%;
      height: 100%;
    }
  }
  &-close {
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
    /deep/ .svg-icon {
      width: 16px;
      height: 16px;
      fill: @white;
      opacity: 0.7;
    }
  }
}
</style>
