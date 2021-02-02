<template>
  <div class="dz-left-video">
    <div class="dz-left-video-li">
      <videoItem></videoItem>
    </div>
    <div class="dz-left-video-li">
      <videoItem></videoItem>
    </div>
    <div class="dz-left-video-li">
      <videoItem></videoItem>
    </div>
    <div class="dz-left-video-li">
      <videoItem></videoItem>
    </div>

  </div>
</template>
<script>
import videoItem from '@/components/videoItem'
export default {
  name: '',
  components: { videoItem },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
.dz-left-video {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  justify-content: space-between;
  justify-items: flex-start;
  align-items: flex-start;
  margin: 4% 0;
  &-li {
    width: 45%;
    height: 40%;
    background: #000000;
  }
  &-li:nth-child(odd) {
    margin-right: 5%;
  }
}
</style>