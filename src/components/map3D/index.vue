<template>
  <div class="container-div">
    <div id="container">
    </div>
  </div>
</template>
<script>
import { setCookie } from "@/utils/cookie";
import { mapState } from 'vuex'
export default {
  data () {
    return {
      map: null,
      map3D: null,
      objectLayer: null,
      marker: null,
      circleMarker: [],
      overlayGroups: null,
      markerFillColor: '',
      clusterMarker: [],
      districtSearch: null
    }
  },
  computed: {
    ...mapState({
      projectLayer: state => state.map2D.projectLayer,
      markerLayerData: state => state.map2D.markerLayerData,
    })
  },
  watch: {
    markerLayerData: {
      deep: true,
      handler (newVal) {
        if (newVal && newVal.data) {
          this.markerInit(newVal.data)
          this.markerFillColor = newVal.color
        }
      }
    }
  },
  mounted () {
    this.init()
    const that = this
    setCookie('name', '马梦迪')
    // this.map.on('zoomchange', function (e) {
    //   //地图层级变化，执行方法
    //   console.log('当前缩放级别：', this.getZoom())
    //   // that.addCluster()
    // })
    // this.map.on('zoomend', function (e) {
    //   //地图进行缩放的时候监听该函数, 也就是点击的时候哈.缩放
    //   console.log(this.getZoom());
    //   console.log(this.getCenter().toString());
    // });
  },
  methods: {
    async init () {
      // 创建地图实例
      let that = this
      that.map = new AMap.Map('container', {
        resizeEnable: true,   // 是否监控地图容器尺寸变化
        zoom: 4,  //设置地图显示的缩放级别
        zooms: [2, 18],
        center: [116.397428, 39.90923],//设置地图中心点坐标
        mapStyle: 'amap://styles/darkblue',  //设置地图的显示样式
      })
      // that.drawBounds()
      that.setLayer()
      console.log('地图加载成功', that.map)
    },
    drawBounds () {
      const that = this
      AMap.plugin(["AMap.DistrictSearch"], () => {
        if (!that.districtSearch) {
          //实例化DistrictSearch
          let opts = {
            subdistrict: 0,   //获取边界不需要返回下级行政区
            extensions: 'all',  //返回行政区边界坐标组等具体信息
            level: 'district'  //查询行政级别为 市
          };

          that.districtSearch = new AMap.DistrictSearch(opts);
        }
        //行政区查询
        that.districtSearch.search('中国', (status, result) => {
          // 获取朝阳区的边界信息
          let bounds = result.districtList[0].boundaries
          let polygons = []
          if (bounds) {
            for (let i = 0, l = bounds.length; i < l; i++) {
              //生成行政区划polygon
              let polygon = new AMap.Polygon({
                strokeWeight: 1,
                path: bounds[i],
                fillOpacity: 0,
                fillColor: '#CCF3FF',
                strokeColor: 'red'
              });
              polygons.push(polygon);
            }
            that.map.add(polygons)
            // 地图自适应
            that.map.setFitView(polygons)
          }
        })

      });
    },
    setLayer () {
      var trafficLayer = new AMap.TileLayer.Traffic({
        zIndex: 11
      });
      var roadNetLayer = new AMap.TileLayer.RoadNet({
        zIndex: 10
      });

      var layerGroup = new AMap.LayerGroup([trafficLayer, roadNetLayer]);
      layerGroup.setMap(this.map);
      layerGroup.setOptions({ opacity: 0.2 })
    },
    markerInit (layerList) {
      let that = this
      if (that.overlayGroups) {
        that.removeOverlayGroup()
      }
      that.circleMarker = []
      const iconList = {
        '#35E9FF': `<div style="background-color: hsla(187, 100%, 60%, 0.7); height: 12px; width: 12px; border: 8px solid hsl(180, 100%, 0.1); border-radius: 50%; box-shadow: hsla(187, 100%, 60%, 0.2) 0px 0px 1px;"></div>`,
        '#EE6666': `<div style="background-color: hsla(0, 80%, 67%, 0.7); height: 12px; width: 12px; border: 8px solid hsl(180, 100%, 0.1); border-radius: 50%; box-shadow: hsla(0, 80%, 67%, 0.2) 0px 0px 1px;"></div>`,
        '#FC8452': `<div style="background-color: hsl(18, 97%, 65%, 0.7); height: 12px; width: 12px; border: 8px solid hsl(180, 100%, 0.1); border-radius: 50%; box-shadow: hsla(18, 97%, 65%, 0.2) 0px 0px 1px;"></div>`,
        '#91CB74': `<div style="background-color: hsla(100, 46%, 63%, 0.7); height: 12px; width: 12px; border: 8px solid hsl(180, 100%, 0.1); border-radius: 50%; box-shadow: hsla(100, 46%, 63%, 0.2) 0px 0px 1px;"></div>`,
        '#FAC858': `<div style="background-color: hsla(41, 94%, 66%, 0.7); height: 12px; width: 12px; border: 8px solid hsl(180, 100%, 0.1); border-radius: 50%; box-shadow: hsla(41, 94%, 66%, 0.2) 0px 0px 1px;"></div>`,
        '#9A60B4': `<div style="background-color: hsla(281,36%, 54%, 0.7); height: 12px; width: 12px; border: 8px solid hsl(180, 100%, 0.1); border-radius: 50%; box-shadow: hsla(281,36%, 54%, 0.2) 0px 0px 1px;"></div>`,
        '#5470C6': `<div style="background-color: hsla(225, 50%, 55%, 0.7); height: 12px; width: 12px; border: 8px solid hsl(180, 100%, 0.1); border-radius: 50%; box-shadow: hsla(225, 50%, 55%, 0.2) 0px 0px 1px;"></div>`,
        '#F264DB': `<div style="background-color: hsla(310, 85%, 67%, 0.7); height: 12px; width: 12px; border: 8px solid hsl(180, 100%, 0.1); border-radius: 50%; box-shadow: hsla(310, 85%, 67%, 0.2) 0px 0px 1px;"></div>`,
        '#3CA272': `<div style="background-color: hsla(152, 46%, 44%, 0.7); height: 12px; width: 12px; border: 8px solid hsl(180, 100%, 0.1); border-radius: 50%; box-shadow: hsla(152, 46%, 44%, 0.2) 0px 0px 1px;"></div>`,
        '#73C0DE': `<div style="background-color: hsla(197, 62%, 66%, 0.7); height: 12px; width: 12px; border: 8px solid hsl(180, 100%, 0.1); border-radius: 50%; box-shadow: hsla(197, 62%, 66%, 0.2)) 0px 0px 1px;"></div>`

      }
      for (let i = 0; i < layerList.length; i++) {
        let lnglat = layerList[i].lnglat;
        // 创建点实例
        that.circleMarker.push(new AMap.Marker({
          position: lnglat,
          size: new AMap.Size(200, 2),
          content: iconList[that.markerFillColor],
          // offset: new AMap.Pixel(-15, -15)
        }))
      }
      that.overlayGroups = new AMap.OverlayGroup(this.circleMarker);
      that.map.add(this.overlayGroups);
      let count = that.circleMarker.length;
      const _renderClusterMarker = function (context) {
        const factor = Math.pow(context.count / count, 1 / 18);
        const div = document.createElement('div');
        const Hue = 180 - factor * 180;
        const bgColor = 'hsla(' + Hue + ',100%,50%,0.2)';
        const fontColor = 'hsla(' + Hue + ',100%,20%,1)';
        const borderColor = 'hsla(' + Hue + ',100%,40%,0.2)';
        const shadowColor = 'hsla(' + Hue + ',100%,50%,1)';
        div.style.backgroundColor = bgColor;
        const size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 20);
        div.style.width = div.style.height = size + 'px';
        div.style.border = 'solid 1px ' + borderColor;
        div.style.borderRadius = size / 2 + 'px';
        div.style.boxShadow = '0 0 1px ' + shadowColor;
        div.innerHTML = context.count;
        div.style.lineHeight = size + 'px';
        div.style.color = '#ffffff';
        div.style.fontSize = '14px';
        div.style.textAlign = 'center';
        context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
        context.marker.setContent(div)
      };
      AMap.plugin(["AMap.MarkerClusterer"], function () {
        that.clusterMarker = new AMap.MarkerClusterer(that.map, that.circleMarker, {
          renderClusterMarker: _renderClusterMarker,
          gridSize: 80
        });
      });
    },
    removeOverlayGroup () {
      this.map.remove(this.overlayGroups);
    },
  }
}
</script>
<style lang="less" scoped>
.container-div {
  width: 100%;
  height: 100%;
}
.jingqu {
  background-color: hsla(180, 100%, 50%, 0.7);
  height: 10px;
  width: 10px;
  border: 4px solid hsl(180, 100%, 40%);
  border-radius: 50%;
  box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;
}
#container {
  width: 100%;
  height: 100%;
}
</style>
