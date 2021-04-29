<template>
  <div class="dz-title">
    <dv-border-box-10 class="dz-title-span">{{title}}</dv-border-box-10>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '地洲智慧云平台'
    }
  },
  mounted () {
    if (this.$route.path === '/sceneIndex') {
      this.title = '松江新城地铁站'
    } else {
      this.title = '地洲智慧云平台'
    }
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
@import "../../style/color.less";
.dz-title {
  width: 100%;
  height: 100%;
  &-span {
    font-size: 20px;
    color: @titleTopBlue;
    display: block;
    // border: 1px solid @borderBlue;
    // background: @bgTopBlue;
    // border-radius: 50px;
    display: block;
  }
}
</style>