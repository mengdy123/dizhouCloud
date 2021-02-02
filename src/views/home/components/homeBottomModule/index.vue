<template>
  <div class="dz-content-bottom-module">
    <div class="dz-content-bottom-table">
      <titleDiv title='项目信息'></titleDiv>
      <scrollTable></scrollTable>
    </div>
    <div class="dz-content-bottom-detail"></div>
  </div>
</template>
<script>
import scrollTable from '@/components/Table/scrollTable.vue'
import titleDiv from "@/components/titleModule";
export default {
  components: { scrollTable, titleDiv },
  data () {
    return {

    }
  }
}
</script>
<style lang="less" scoped>
.dz-content-bottom-module {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  .dz-content-bottom-table {
    width: 60%;
    height: 100%;
    padding: 20px;
    background: linear-gradient(180deg, #090e45 0%, rgba(8, 13, 68, 0.8) 100%);
  }
  .dz-content-bottom-detail {
    width: 39%;
    height: 100%;
    background: linear-gradient(180deg, #090e45 0%, rgba(8, 13, 68, 0.8) 100%);
  }
}
</style>