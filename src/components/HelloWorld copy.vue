<template>
  <div class="container-div">
    <map2D></map2D>
  </div>
</template>

<script>
import map2D from './map2D'
export default {
  name: 'HelloWorld',
  components: { map2D },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container-div {
  width: 100%;
  height: 100%;
}
</style>
