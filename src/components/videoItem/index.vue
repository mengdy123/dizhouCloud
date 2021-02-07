<template>
  <div class="video-div">
    <video id="myvideo"
           :src="url"
           :poster="videoImg"
           :muted="muteStatus"
           autoplay
           loop
           class="input_video">
      your browser does not support the video tag
    </video>
    <span class="ico ico-sound"
          :class="{ active: isMute }"
          v-on:click="closeSoundClick()"></span>
    <span class="ico ico-skip"></span>
    <span class="ico ico-video"
          :class="{ hide: isPlay }"
          v-on:click="playClick()"></span>
  </div>
</template>
<script>
export default {
  name: 'BusImg',
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      _dom: "",
      videoSrc: '',
      // videoSrc: 'http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ',
      // videoImg: 'http://static.fdc.com.cn/avatar/usercenter/5996999fa093c04d4b4dbaf1_162.jpg',
      videoImg: '',
      playStatus: '',
      muteStatus: true,
      isMute: true,
      isPlay: false
    }
  },
  methods: {
    playClick () {
      this._dom = document.getElementById('myvideo');
      this.isPlay = !this.isPlay;
      this._dom.play();
    },
    closeSoundClick () {
      this.isMute = !this.isMute;
      if (this.isMute) {
        this.muteStatus = '';
      } else {
        this.muteStatus = 'muted';
      }
    },
    showOtherVideo () {
      let _this = this;
      setTimeout(function () {
        _this.flag = _this._dom.paused;
        if (!_this.flag) {
          _this.showOtherVideo();
          console.log(_this.flag);
        }

      }, 1000)
    }
  }
}
</script>
<style lang="less" scoped>
.video-div {
  width: 100%;
  height: 100%;
  // background: url("../../assets/video.png") no-repeat;
  background: #000000;
}
.input_video {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
</style>