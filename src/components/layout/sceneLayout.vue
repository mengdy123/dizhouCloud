<template>
  <div class="dz-scene">
    <div class="dz-scene-3d">
      <!-- <model3D></model3D> -->
    </div>
    <div class="dz-scene-body">
      <div class="dz-scene-body-top">
        <div class="dz-title-module">
          <dzTitle></dzTitle>
        </div>
        <div class="dz-time-module">
          <dzTopMenu></dzTopMenu>
        </div>
      </div>
      <div class="go-back"
           @click="goBack">
        返回首页</div>
      <div class="dz-scene-body-content">
        <router-view></router-view>
      </div>

    </div>
  </div>
</template>

<script>
import model3D from '../model3D'
import dzTitle from '../dzTitle'
import dzTopMenu from '../dzTopMenu'
export default {

  name: 'mainIndex',
  components: { model3D, dzTitle, dzTopMenu },

  methods: {

    goBack () {
      this.$router.push('mainIndex')
    }
  },
  mounted () {
    const that = this

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
  width: 400px;
  height: 36px;
  line-height: 36px;
  position: fixed;
  right: 0;
  top: 30px;
  z-index: 2;
  text-align: right;
}
.dz-scene {
  width: 100%;
  height: 100%;
  background: url("../../assets/scene_01.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  display: flex;
  &-body {
    display: flex;
  }
  &-3d {
    position: absolute !important;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

.go-back {
  width: 80px;
  height: 24px;
  line-height: 24px;
  cursor: pointer;
  color: @white;
  margin: 20px;
  z-index: 9;
}
</style>
