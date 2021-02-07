<template>
  <div class="dz-left-video">
    <span v-if="showVideoStatus"
          class="dz-left-video-back"
          @click="backVideo">返回监控</span>
    <div class="dz-left-video-ul"
         v-if="!showVideoStatus">
      <div class="dz-left-video-ul-li"
           v-for="(item, index) in videoList"
           :key="index">
        <!-- <videoItem :url='item.url'></videoItem> -->
        <img :src="item.imgUrl"
             alt="">
        <img class="screen-big"
             @click="showScreenWindow(item.imgUrl,'img')"
             src="../../../../assets/home/screen-big.png">
        <span class="item-title">上海山北路北街系统</span>
      </div>

    </div>
    <div class="dz-left-video-ul"
         v-else>
      <videoItem :url='showVideoStatus.url'></videoItem>
      <img class="screen-big"
           @click="showScreenWindow(showVideoStatus.url,'video')"
           src="../../../../assets/home/screen-big.png">
    </div>
  </div>
</template>
<script>
import videoItem from '@/components/videoItem'
import { mapState, mapActions } from 'vuex'
import eventBus from '@/utils/bus'
export default {
  name: '',
  components: { videoItem },
  data () {
    return {
      videoList: [
        {
          name: '1',
          url: require('../../../../../static/video/3.mp4'),
          imgUrl: require('../../../../../static/image/1.png'),
        },
        {
          name: '2',
          url: require('../../../../../static/video/4.mp4'),
          imgUrl: require('../../../../../static/image/2.png'),
        },
        {
          name: '3',
          url: require('../../../../../static/video/6.mp4'),
          imgUrl: require('../../../../../static/image/3.png'),
        },
        {
          name: '4',
          url: require('../../../../../static/video/7.mp4'),
          imgUrl: require('../../../../../static/image/4.png'),
        }
      ]
    }
  },
  watch: {
    showVideoStatus (nv, ov) {
      console.log('showVideoStatus', nv)
    }
  },
  computed: {
    ...mapState({
      showVideoStatus: state => state.map2D.showVideoStatus,
    })
  },
  methods: {
    ...mapActions(['changeMarkerLayerData', 'changeVideoStatus']),
    backVideo () {
      this.changeVideoStatus(null)
    },
    showScreenWindow (imgUrl, type) {
      let data = {
        status: true,
        type: type,
        url: imgUrl,
      }
      eventBus.$emit('closeScreenBox', data)
    }
    // eventBus.$emit('closeScreenBox')
  },
  mounted () {

  }
}
</script>
<style lang="less" scoped>
@import "../../../../style/color.less";
.dz-left-video {
  width: 100%;
  height: 100%;
  margin: 4% 0 2% 0;
  position: relative;
  &-ul {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    justify-content: space-between;
    justify-items: flex-start;
    align-items: flex-start;
    position: relative;
    &-li {
      width: 49%;
      height: 47%;
      background: #000000;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }

      .item-title {
        position: absolute;
        bottom: 4px;
        left: 50%;
        height: 22px;
        line-height: 22px;
        width: 160px;
        text-align: center;
        margin-left: -80px;
        cursor: pointer;
        color: @white;
        background: url("../../../../assets/home/energy-bg.png") no-repeat;
        background-size: 100% 100%;
        font-size: 12px;
      }
    }
    &-li:nth-child(odd) {
      // margin-right: 5%;
    }
  }
  .screen-big {
    width: 16px;
    height: 16px;
    position: absolute;
    top: 6px;
    right: 6px;
    cursor: pointer;
  }
  &-back {
    position: absolute;
    right: 0;
    top: -36px;
    cursor: pointer;
  }
}
</style>