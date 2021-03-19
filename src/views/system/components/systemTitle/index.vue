<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: mandy
 * @Date: 2021-03-12 10:23:09
 * @LastEditors: mandy
 * @LastEditTime: 2021-03-12 10:28:41
-->
<template>
  <div class="dz-system-title">
    <img src="../../../../assets/dz_system.png"
         alt=""
         @click="goHomeIndex">
    <span v-if="!menuStatus">地洲智慧云平台</span>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState({
      menuStatus: state => state.system.menuStatus,
    })
  },
  methods: {
    goHomeIndex () {
      this.$router.push('mainIndex')
    }
  }
}
</script>
<style lang="less" scoped>
.dz-system-title {
  width: 100%;
  height: 50px;
  display: flex;
  padding: 6px 16px;
  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    cursor: pointer;
  }
  span {
    font-weight: bold;
    font-size: 14px;
    line-height: 50px;
    color: #ffffff;
  }
}
</style>