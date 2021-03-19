<template>
  <div class="dz-title">
    <span v-for="(item, index) in title"
          :key="index"
          :class="[{'span-selected': titleEd === index}]"
          @click.stop="changeResource(item,index)">{{item.name}}</span>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: Array,
      default: function () {
        return []
      }
    },
    titleEd: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
    }
  },
  methods: {
    changeResource (data, index) {
      // console.log('data', data)
      // console.log('123456', event)
      this.$emit('changeResource', index)
      // event.preventDefault();
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../style/color.less";
.span-selected {
  color: #35e9ff !important;
}
.dz-title {
  font-size: 14px;
  display: flex;
  line-height: 16px;
  span {
    color: @white;
    margin-right: 20px;
    cursor: pointer;
    font-weight: 600;
  }
}
.dz-title::before {
  content: "";
  width: 3px;
  height: 12px;
  background: @themeBlue;
  display: block;
  margin-right: 6px;
  margin-top: 2px;
}
</style>