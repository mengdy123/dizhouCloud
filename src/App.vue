<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    let params = {
      country: '',
      province: '',
      city: '',
      county: ''
    }
    this.$store.dispatch('getHomeIndexInfo', params)
  }
}
</script>

<style>
#app {
  font-size: 14px;
  width: 100vw;
  height: 100vh;
  font-weight: 400;
}
</style>
