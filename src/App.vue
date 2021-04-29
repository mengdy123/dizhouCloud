<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: mandy
 * @Date: 2021-01-31 21:54:06
 * @LastEditors: mandy
 * @LastEditTime: 2021-04-28 10:45:31
-->
<template>
  <div id="app"
       :class="[{'zoom-1':zoom === 1}, {'zoom-125':zoom === 1.25},{'zoom-150':zoom === 1.5}]">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      zoom: 1,
      isRouterAlive: true
    }
  },
  provide () {
    return {
      reload: this.reload
    };
  },
  methods: {
    reload () {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    }
  },
  mounted () {
    let params = {
      country: '',
      province: '',
      city: '',
      county: ''
    }
    this.$store.dispatch('getHomeIndexInfo', params)
    this.zoom = window.devicePixelRatio
    // console.log('%c window.devicePixelRatio', 'color:red', this.zoom)
  }
}
</script>

<style>
#app {
  font-size: 14px;
  width: 100vw;
  height: 100vh;
}
.zoom-1 {
  zoom: 1;
}
/* .zoom-125 {
  zoom: 0.85;
}
.zoom-150 {
  zoom: 0.75;
} */
</style>
