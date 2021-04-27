<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: mandy
 * @Date: 2021-03-22 09:17:26
 * @LastEditors: mandy
 * @LastEditTime: 2021-03-23 10:21:19
-->
<template>
  <div class="add-module">
    <el-dialog :title="title"
               :visible.sync="dialogVisible"
               :modal-append-to-body='true'
               :close-on-click-modal='false'
               width="500px"
               :before-close="handleClose">
      <main>
        <slot name='dialogMain'></slot>
      </main>
      <div class="line-div"></div>
    </el-dialog>

  </div>
</template>

<script>

export default {
  components: {
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      dialogVisible: true,
      innerVisible: true,
    };
  },
  methods: {
    handleClose () {
      this.$emit('changeProjectBox', false)
    },
  }
};
</script>
<style lang="less" scoped>
.add-module {
  position: relative;
  .line-div {
    position: absolute;
    bottom: 90px;
    left: 0;
    width: 100%;
    height: 1px;
    background: #eeeeee;
  }
}
</style>
