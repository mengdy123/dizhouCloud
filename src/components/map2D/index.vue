<template>
  <div class="test">
    <div id="container"></div>
  </div>
</template>
<script>
import MapLoader from '@/utils/AMap'
export default {
  data () {
    return {
      map: null
    }
  },
  mounted () {
    this.init()
    // let that = this
    // MapLoader().then(
    //   (AMap) => {
    //     console.log('地图加载成功')
    //     that.map = new AMap.Map('container', {
    //       center: [121.335658, 31.198233],
    //       zoom: 11,
    //       mapStyle: 'amap://styles/darkblue' // 设置地图的显示样式
    //     })
    //   },
    //   (e) => {
    //     console.log('地图加载失败', e)
    //   }
    // )
  },
  methods: {
    init () {
      // 创建地图实例

      let that = this
      MapLoader().then(
        (AMap) => {
          console.log('地图加载成功')
          that.map = new AMap.Map('container', {
            center: [121.335658, 31.198233],
            zoom: 11,
            viewMode: '3D',
            mapStyle: 'amap://styles/darkblue' // 设置地图的显示样式
          })
        },
        (e) => {
          console.log('地图加载失败', e)
        }
      )
      // var map = new AMap.Map('container', {
      //   viewMode: '3D'
      // })

      // 创建Object3DLayer图层
      var object3Dlayer = new AMap.Object3DLayer()
      that.map.add(object3Dlayer)

      // // 加载AMap.GltfLoader插件
      // AMap.plugin(['AMap.GltfLoader'], function () {
      //   // 创建AMap.GltfLoader插件实例
      //   var gltf = new AMap.GltfLoader()

      //   // 调用load方法，加载 glTF 模型资源
      //   var urlDuck = 'https://a.amap.com/jsapi_demos/static/gltf/Duck.gltf' // 模型资源文件路径，远程/本地文件均可
      //   gltf.load(urlDuck, function (gltfCity) {
      //     // gltfCity 为解析后的gltf对象
      //   })

      //   // 可多次调用load方法，加载多个 glTF 模型资源
      //   var urlCity = 'https://a.amap.com/jsapi_demos/static/gltf-online/shanghai/scene.gltf'
      //   gltf.load(urlCity, function (gltfDuck) {
      //     // gltfDuck 为解析后的gltf对象
      //   })
      // })
    }
  }
}
</script>
<style lang="less" scoped>
.test {
  width: 100%;
  height: 100%;
}
#container {
  width: 100%;
  height: 100%;
}
</style>
