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
  data () {
    return {
      config: {
        headerBGC: '',
        oddRowBGC: '',
        evenRowBGC: '',
        hoverPause: true,
        header: ['名称', '位置', '状态', '类型', '系统数量', '设备数量'],
        data: [
          ['扬州文昌路1', '扬州', '运行中', '交通', '43', '789'],
          ['扬州文昌路2', '扬州', '运行中', '交通', '21', '1025'],
          ['扬州文昌路3', '扬州', '运行中', '交通', '36', '333'],
          ['扬州文昌路4', '扬州', '运行中', '交通', '83', '569'],
          ['扬州文昌路5', '扬州', '运行中', '交通', '63', '1024'],
          ['扬州文昌路6', '扬州', '运行中', '交通', '48', '356'],
          ['扬州文昌路7', '扬州', '运行中', '交通', '55', '256'],
          ['扬州文昌路8', '扬州', '运行中', '交通', '33', '896'],
          ['扬州文昌路9', '扬州', '运行中', '交通', '13', '1236'],
          ['扬州文昌路10', '扬州', '运行中', '交通', '89', '1025'],
        ]
      }
    }
  },
  methods: {
    tableClick (row) {
      console.log('所在行数据', row)
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