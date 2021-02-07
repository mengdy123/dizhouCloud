<template>
  <div class="table-scroll-body">
    <dv-scroll-board :config="config"
                     headerBGC
                     oddRowBGC
                     evenRowBGC
                     hoverPause
                     ref="scrollBoard"
                     @click="tableClick" />
  </div>
</template>
<script>
export default {
  props: {
    config: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {

    }
  },
  methods: {
    tableClick (row) {
      this.$emit('getTableRow', row)
    }
  }

}
</script>
<style lang="less" scoped>
.table-scroll-body {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>