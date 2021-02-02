<template>
  <div class="dz-main">
    <map3D></map3D>
    <div class="dz-main-body">
      <div class="dz-main-body-top">
        <div class="dz-title-module">
          <dzTitle></dzTitle>
        </div>
        <div class="dz-time-module">
          <dzTopTime></dzTopTime>
        </div>

      </div>
      <div class="dz-main-body-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import map3D from '../map3D'
import dzTitle from '../dzTitle'
import dzTopTime from '../dzTopTime'
export default {
  name: 'mainIndex',
  components: { map3D, dzTitle, dzTopTime },
  data () {
    return {
      screenWidth: null
    }
  },
  methods: {

  },
  mounted () {
    const that = this


  }
}
</script>
<style lang="less" scoped>
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
  &-body {
    display: flex;
  }
}
</style>
