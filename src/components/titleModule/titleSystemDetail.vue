<template>
  <div class="dz-title">
    {{title}}
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {

    }
  }
}
</script>
<style lang="less" scoped>
.dz-title {
  font-size: 14px;
  color: #333333;
  display: flex;
  font-weight: 600;
  line-height: 16px;
}
.dz-title::before {
  content: "";
  width: 3px;
  height: 12px;
  background: #2761ff;
  display: block;
  margin-right: 6px;
  margin-top: 2px;
}
</style>