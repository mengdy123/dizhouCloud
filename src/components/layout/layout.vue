<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: mandy
 * @Date: 2021-03-04 12:42:28
 * @LastEditors: mandy
 * @LastEditTime: 2021-03-04 14:20:19
-->
<template>
  <div class="dz-scene">
    <div class="dz-scene-body">
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
  data () {
    return {
    }
  },
  methods: {

  },
  mounted () {

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
.dz-scene {
  width: 100%;
  height: 100%;
  // background: url("../../assets/scene_01.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  &-body {
    display: flex;
  }
}
</style>
