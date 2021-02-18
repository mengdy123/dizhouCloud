<template>
  <div class="container-div">
    <div id="container">
    </div>
    <div ref='ProjectInfoBox'
         class="project-info-box"
         v-show="showProjectInfoBox">
      <projectInfo v-if="showProjectInfoBox"
                   :projectInfoData='projectInfoData'
                   @closeInfoWindow='closeInfoWindow'
                   @clearMarkerOnly='clearMarkerOnly'></projectInfo>
    </div>
  </div>
</template>
<script>
import { setCookie } from "@/utils/cookie";
import { mapState, mapActions } from 'vuex'
import projectInfo from '@/components/infoBox/projectInfo.vue'
import dataP1 from '../../data/projectList.json'
import eventBus from '@/utils/bus'
export default {
  components: { projectInfo },
  data () {
    return {
      map: null,
      markerOnly: null,
      circleMarker: [],
      overlayGroups: null,
      markerFillColor: '',
      clusterMarker: [],
      districtSearch: null,
      infoWindow: null,
      projectInfoData: {},
      showProjectInfoBox: false,
      layerGroup: null,
      selectBoundsLayer: [],
      projectLayer: null,
      projectIcon: require('../../assets/map-icon/p_04.svg'),
      featureOldData: [],
      addrArr: [],
      districtExplorer: null
    }
  },
  computed: {
    ...mapState({
      projectLayerData: state => state.map2D.projectLayerData,
      markerLayerData: state => state.map2D.markerLayerData,
      municipalityList: state => state.map2D.municipalityList,
      addressInfo: state => state.map2D.addressInfo,

    })
  },
  watch: {
    markerLayerData: {
      deep: true,
      handler (newVal) {
        if (newVal && newVal.data) {
          this.markerFillColor = newVal.color
          this.markerInit(newVal.data)
        } else {
          this.markerFillColor = ''
          this.removeOverlayGroup()
          this.removeRenderClusterMarker()
        }
        // console.log('newVal', newVal)
        // console.log('this.markerFillColor', this.markerFillColor)
      },
    },
    projectLayerData: {
      deep: true,
      handler (newVal) {
        if (newVal) {
          this.addMarkerOnly(newVal)
        } else {
          this.clearMarkerOnly()
        }
      },
    },
  },
  mounted () {
    const that = this
    this.$nextTick(() => {
      that.init()
      that.projectLayer = that.addMaker(that.projectIcon, dataP1.points)
      that.projectLayer.hide()
      that.map.on('zoomchange', function (e) {
        let zoomNum = this.getZoom()
        //地图层级变化，执行方法
        // console.log('当前缩放级别：', zoomNum)
        if (zoomNum > 4) {
          that.projectLayer.show()
        } else {
          that.projectLayer.hide()
        }
        that.scaleInit()
      })
      eventBus.$on('setZoomAndCenterFun', (e) => {
        that.setZoomAndCenterFun()
      })
      eventBus.$on('removeRenderClusterMarker', (e) => {
        that.removeRenderClusterMarker()
      })
      eventBus.$on('mapClear', (e) => {
        that.mapClear()
      })
      eventBus.$on('setFitViewByCode', data => {
        that.setFitViewByCode(data)
      })
      eventBus.$on('drawLineType', data => {
        that.drawLineType()
      })

    })
  },

  methods: {
    //  this.changeProjectData(data)
    ...mapActions(['saveScaleData', 'saveAddressInfo', 'changeProjectData']),
    async init () {
      // 创建地图实例
      let that = this
      that.map = new AMap.Map('container', {
        resizeEnable: true,   // 是否监控地图容器尺寸变化
        zoom: 4,  //设置地图显示的缩放级别
        zooms: [2, 18],
        center: [107.848005, 28.682565],//设置地图中心点坐标
        mapStyle: 'amap://styles/darkblue',  //设置地图的显示样式
      })
      // that.setLayer()
      that.toolBarInit()
      that.scaleInit()
      that.drawLineType()
      console.log('地图加载成功', that.map)
    },
    // 设置地图中心点/级别
    setZoomAndCenterFun () {
      this.map.setZoomAndCenter(4, [107.848005, 28.682565]);
    },
    setFitViewByCode (code) {
      this.map.setCity(code)
    },
    // 缩放
    toolBarInit () {
      let that = this
      AMap.plugin([
        'AMap.ToolBar',
      ], function () {
        // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
        that.map.addControl(new AMap.ToolBar({
          // 简易缩放模式，默认为 false
          liteStyle: true,
          position: [-120, -200]
        }));
      });
    },
    // 比例尺
    scaleInit () {
      let that = this
      AMap.plugin(["AMap.Scale"], function () {
        let scale = new AMap.Scale();
        that.map.addControl(scale);
        let scaleData = Math.round(that.map.getScale())
        that.saveScaleData(scaleData)
      });
    },
    // 设置图层
    setLayer () {
      const that = this
      const roadNetLayer = new AMap.TileLayer.RoadNet({
        zIndex: 10
      });

      that.layerGroup = new AMap.LayerGroup(roadNetLayer);
      that.layerGroup.setMap(this.map);
      that.layerGroup.setOptions({ opacity: 0.2 })
    },
    // echart撒点的方法
    markerInit (layerList) {
      let that = this
      if (that.overlayGroups) {
        that.removeOverlayGroup()
      }
      if (that.clusterMarker) {
        that.removeRenderClusterMarker()
      }
      that.circleMarker = []
      const iconList = {
        '#35E9FF': `<div style="background-color: hsla(187, 100%, 60%, 0.7); height: 12px; width: 12px; border: 8px solid hsl(180, 100%, 0.1); border-radius: 50%; box-shadow: hsla(187, 100%, 60%, 0.2) 0px 0px 1px;"></div>`,
        '#EE6666': `<div style="background-color: hsla(0, 80%, 67%, 0.7); height: 12px; width: 12px; border: 8px solid hsl(180, 100%, 0.1); border-radius: 50%; box-shadow: hsla(0, 80%, 67%, 0.2) 0px 0px 1px;"></div>`,
        '#FC8452': `<div style="background-color: hsla(18, 97%, 65%, 0.7); height: 12px; width: 12px; border: 8px solid hsl(180, 100%, 0.1); border-radius: 50%; box-shadow: hsla(18, 97%, 65%, 0.2) 0px 0px 1px;"></div>`,
        '#91CB74': `<div style="background-color: hsla(100, 46%, 63%, 0.7); height: 12px; width: 12px; border: 8px solid hsl(180, 100%, 0.1); border-radius: 50%; box-shadow: hsla(100, 46%, 63%, 0.2) 0px 0px 1px;"></div>`,
        '#FAC858': `<div style="background-color: hsla(41, 94%, 66%, 0.7); height: 12px; width: 12px; border: 8px solid hsl(180, 100%, 0.1); border-radius: 50%; box-shadow: hsla(41, 94%, 66%, 0.2) 0px 0px 1px;"></div>`,
        '#9A60B4': `<div style="background-color: hsla(281,36%, 54%, 0.7); height: 12px; width: 12px; border: 8px solid hsl(180, 100%, 0.1); border-radius: 50%; box-shadow: hsla(281,36%, 54%, 0.2) 0px 0px 1px;"></div>`,
        '#5470C6': `<div style="background-color: hsla(225, 50%, 55%, 0.7); height: 12px; width: 12px; border: 8px solid hsl(180, 100%, 0.1); border-radius: 50%; box-shadow: hsla(225, 50%, 55%, 0.2) 0px 0px 1px;"></div>`,
        '#F264DB': `<div style="background-color: hsla(310, 85%, 67%, 0.7); height: 12px; width: 12px; border: 8px solid hsl(180, 100%, 0.1); border-radius: 50%; box-shadow: hsla(310, 85%, 67%, 0.2) 0px 0px 1px;"></div>`,
        '#3CA272': `<div style="background-color: hsla(152, 46%, 44%, 0.7); height: 12px; width: 12px; border: 8px solid hsl(180, 100%, 0.1); border-radius: 50%; box-shadow: hsla(152, 46%, 44%, 0.2) 0px 0px 1px;"></div>`,
        '#73C0DE': `<div style="background-color: hsla(197, 62%, 66%, 0.7); height: 12px; width: 12px; border: 8px solid hsl(180, 100%, 0.1); border-radius: 50%; box-shadow: hsla(197, 62%, 66%, 0.2)) 0px 0px 1px;"></div>`

      }
      // for (let i = 0; i < layerList.length; i++) {
      //   let lnglat = layerList[i].lnglat;
      //   // 创建点实例
      //   that.circleMarker.push(new AMap.Marker({
      //     position: lnglat,
      //     size: new AMap.Size(200, 2),
      //     content: iconList[that.markerFillColor],
      //     // offset: new AMap.Pixel(-15, -15)
      //   }))
      // }


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
      // AMap.plugin(["AMap.MarkerClusterer"], function () {
      //   that.clusterMarker = new AMap.MarkerClusterer(that.map, that.circleMarker, {
      //     renderClusterMarker: _renderClusterMarker,
      //     gridSize: 80
      //   });
      // });
      AMapUI.load(['ui/geo/DistrictCluster', 'lib/$'], function (DistrictCluster, $) {
        that.clusterMarker = new DistrictCluster({
          map: that.map, //所属的地图实例
          zIndex: 11,
          //返回数据项中的经纬度位置
          getPosition: function (item) {
            console.log('item', item)
            if (!item) {
              return null;
            }
            var parts = item.lnglat

            //返回经纬度
            return [parseFloat(parts[0]), parseFloat(parts[1])];
          },
          renderOptions: {
            //基础样式
            featureStyle: {
              cursor: 'default',
              bubble: true,
              strokeColor: 'rgba(188,159,135,1)', //线颜色
              lineWidth: 1, //描边线宽
              fillStyle: 'rgba(51,102,204,.1)', //填充色
            },
            featureStyleByLevel: {
              //全国
              country: {
                fillStyle: 'rgba(51,102,204,0.1)',
                lineWidth: 1, //描边线宽
              },
              //省
              province: {
                fillStyle: 'rgba(51,102,204,0.1)',
                lineWidth: 1, //描边线宽
              },
              //市
              city: {
                fillStyle: 'rgba(51,102,204,0.1)',
                lineWidth: 1, //描边线宽
              },
              //区县
              district: {
                fillStyle: 'rgba(51,102,204,0.1)',
                lineWidth: 1, //描边线宽
              }
            },
            //显示在所辖数据点的平均位置
            getClusterMarkerPosition: DistrictCluster.ClusterMarkerPositionStrategy.AVERAGE_POINTS_POSITION,
            getClusterMarker: function (feature, dataItems, recycledMarker) {

              //label内容
              var content = feature.properties.name + ' (' + dataItems.length + ')';
              var label = {
                offset: new AMap.Pixel(16, 18), //修改label相对于marker的位置
                content: content
              };
              //存在可回收利用的marker
              if (recycledMarker) {
                //直接更新内容返回
                recycledMarker.setLabel(label);
                return recycledMarker;
              }
              //返回一个新的Marker
              return new AMap.Marker({
                label: label,
                size: new AMap.Size(200, 2),
                content: iconList[that.markerFillColor],
              });
            }
          },

        });
        console.log('that.clusterMarker', that.clusterMarker)
        //设置数据
        that.clusterMarker.setData(layerList);
      });
    },
    // 撒点通用方法
    addMaker (iconImg, layerList) {
      let that = this
      let layerName = null
      let icon = new AMap.Icon({
        size: new AMap.Size(32, 32),    // 图标尺寸
        image: iconImg,  // Icon的图像
        imageSize: new AMap.Size(32, 32)   // 根据所设置的大小拉伸或压缩图片
      });
      let layer = []
      for (let i = 0; i < layerList.length; i++) {
        let lnglat = layerList[i].lnglat;
        // 创建点实例
        let marker = new AMap.Marker({
          position: lnglat,
          icon: icon,
        })
        layer.push(marker)
        marker.on('click', that.markerClick);
      }

      layerName = new AMap.OverlayGroup(layer);
      that.map.add(layerName);
      return layerName
      console.log('layerName', layerName)
      // AMap.plugin(["AMap.MarkerClusterer"], function () {
      //   that.clusterMarker = new AMap.MarkerClusterer(that.map, layer, {
      //     // renderClusterMarker: _renderClusterMarker,
      //     gridSize: 80
      //   });
      // });
    },
    // 点击项目的图标
    markerClick (e) {
      console.log('点击项目的图标', e)
      let row = {
        row: ['扬州文昌路1', '扬州', '运行中', '交通', '43', '789']
      }
      let jw = e.lnglat
      let data = {
        ...row,
        type: 'project',
        jw: [jw.lng, jw.lat]
      }
      this.changeProjectData(data)
      this.customizationInfoWindow(data)
    },
    // 点击地图，获取信息
    getMapClick (e) {
      let lnglat = [e.lnglat.lng, e.lnglat.lat]
      // console.log('getMapClick', e)
      this.mapGeocoder(lnglat)
    },
    // 逆向地理编码方法
    mapGeocoder (lnglat) {
      const _this = this
      AMap.plugin('AMap.Geocoder', function () {
        const geocoder = new AMap.Geocoder({
          // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
          city: '010'
        })
        geocoder.getAddress(lnglat, function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            // result为对应的地理位置详细信息
            console.log('result-------', result)
            // let province = result.regeocode.addressComponent.province || null
            // let adcode = result.regeocode.addressComponent.adcode || null
            // _this.drawDistrict(province)
          }
        })
      })
    },
    getColorByDGP (adcode) {
      const GDPSpeed = {
        '520000': 10,//贵州
        '540000': 10,//西藏
        '530000': 8.5,//云南 
        '500000': 8.5,//重庆
        '360000': 8.5,//江西
        '340000': 8.0,//安徽
        '510000': 7.5,//四川
        '350000': 8.5,//福建
        '430000': 8.0,//湖南
        '420000': 7.5, //湖北
        '410000': 7.5,//河南
        '330000': 7.0,//浙江
        '640000': 7.5,//宁夏
        '650000': 7.0,//新疆
        '440000': 7.0,//广东
        '370000': 7.0,//山东
        '450000': 7.3,//广西
        '630000': 7.0,//青海
        '320000': 7.0,//江苏
        '140000': 6.5,//山西
        '460000': 7,// 海南
        '310000': 6.5,//上海
        '110000': 6.5, // 北京
        '130000': 6.5, // 河北
        '230000': 6, // 黑龙江
        '220000': 6,// 吉林
        '210000': 6.5, //辽宁
        '150000': 6.5,//内蒙古
        '120000': 5,// 天津
        '620000': 6,// 甘肃
        '610000': 8.5,// 甘肃
        '710000': 2.64, //台湾
        '810000': 3.0, //香港
        '820000': 4.7 //澳门

      }
      let colors = {}
      if (!colors[adcode]) {
        var gdp = GDPSpeed[adcode];
        if (!gdp) {
          colors[adcode] = 'rgb(227,227,227)'
        } else {
          var rg = 255 - Math.floor((gdp - 5) / 5 * 255);
          colors[adcode] = 'rgba(' + rg + ',' + rg + ',255,0.5)';
        }
      }
      return colors[adcode]
    },
    // 点击地图，绘制边界线
    drawLineType () {
      const that = this
      //just some colors
      const colors = [
        "#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00",
        "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707",
        "#651067", "#329262", "#5574a6", "#3b3eac"
      ];
      AMapUI.load(['ui/geo/DistrictExplorer', 'lib/$'], function (DistrictExplorer, $) {
        that.districtExplorer = new DistrictExplorer({
          map: that.map
        });
        function listenMouseEvents () {
          let isLocating = false;
          that.map.on('click', function (e) {
            if (isLocating) {
              return;
            }
            isLocating = true;
            // $('#locTip').html('定位中......');
            that.districtExplorer.locatePosition(e.lnglat, function (err, features) {
              isLocating = false;
              if (err) {
                console.error(err);
                return;
              }
              if (features.length > 0 && features[0].properties.adcode == 100000) {
                // addrArr.push(features[0].properties.adcode)
                if (that.addrArr.length == 2) {
                  let adcode = features[1].properties.adcode.toString()
                  if (that.municipalityList.indexOf(adcode)) {
                    if (that.featureOldData && that.featureOldData[2] && that.featureOldData[2].properties.adcode == features[2].properties.adcode) {
                      that.addrArr[2] = (features[2].properties.adcode)
                    } else {

                    }
                  } else {
                    if (that.featureOldData && that.featureOldData[3] && that.featureOldData[3].properties.adcode == features[3].properties.adcode) {
                      // 同一个区
                      that.addrArr[2] = (features[3].properties.adcode)
                    } else {
                      // 不是同一个区
                    }
                  }
                }
                if (that.addrArr.length == 1) {
                  let adcode = features[1].properties.adcode.toString()
                  if (that.municipalityList.indexOf(adcode)) {
                    that.addrArr[1] = (adcode.slice(0, 3) + '100')
                    // 
                  } else {
                    if (that.featureOldData && that.featureOldData[2] && that.featureOldData[2].properties.adcode == features[2].properties.adcode) {
                      // 同一个市
                      that.addrArr[1] = (features[2].properties.adcode)
                    } else {
                      // 不是同一个市
                    }
                  }
                }
                if (!(that.featureOldData && that.featureOldData[1] && that.featureOldData[1].properties.adcode == features[1].properties.adcode)) {
                  console.log(222)
                  // that.featureOldData = []
                  that.addrArr = []
                  that.addrArr = [features[1].properties.adcode]
                }
                if (that.addrArr.length == 0) {
                  if (that.featureOldData && that.featureOldData[1] && that.featureOldData[1].properties.adcode == features[1].properties.adcode) {
                    // 同一个省
                    that.addrArr[0] = (features[1].properties.adcode)
                    // that.municipalityList   直辖市
                    // 110100
                  } else {
                    that.featureOldData = []
                    // 不是同一个省
                    that.addrArr[0] = (features[1].properties.adcode)
                  }
                }
                console.log('that.districtExplorer', that.districtExplorer)
              } else {
                that.$message.warning('choose china!!')
                // that.districtExplorer.clearFeaturePolygons();
                return false
              }
              that.saveAddressInfo(that.addrArr)
              that.featureOldData = features // 首次赋值
              let featuresArr = []
              featuresArr.push(features[that.addressInfo.length])

              renderFeatures(featuresArr);
              // 设置中心点，层级
              that.map.setZoomAndCenter(that.addressInfo.length + 6, features[that.addressInfo.length].properties.center)
            }, {
              levelLimit: 4
            });
          });
        }
        // 点击事件的
        listenMouseEvents();
        function renderFeatures (features) {
          //清除已有的绘制内容
          that.districtExplorer.clearFeaturePolygons();
          if (!features.length) {
            renderCountry(false);
            return;
          }
          for (var i = 0, len = features.length; i < len; i++) {
            var strokeColor = colors[i % colors.length];
            var fillColor = strokeColor;
            that.districtExplorer.renderFeature(features[i], {
              cursor: 'default',
              bubble: true,
              strokeColor: strokeColor, //线颜色
              strokeOpacity: 1, //线透明度
              strokeWeight: 1, //线宽
              fillColor: fillColor, //填充色
              fillOpacity: 0.15, //填充透明度
            });
          }
        }
        // 全国
        function renderCountry (setBounds) {
          that.districtExplorer.loadCountryNode(function (err, countryNode) {
            if (setBounds) {
              that.map.setBounds(countryNode.getBounds());
            }
            that.districtExplorer.renderParentFeature(countryNode, {
              cursor: 'default',
              bubble: true,
              strokeColor: 'rgba(188,159,135,1)', //线颜色
              strokeOpacity: 1, //线透明度
              strokeWeight: 1, //线宽
              fillColor: colors[0], //填充色
              fillOpacity: 0.1, //填充透明度
            });
          });
        }
        renderCountry(true);
      })
    },
    drawDistrict (address) {
      const _this = this
      AMap.plugin('AMap.DistrictLayer', function () {
        const disCountry = new AMap.DistrictLayer.Country({
          zIndex: 10,
          SOC: 'CHN',
          depth: 2,
          styles: {
            // 'nation-stroke': '#22ffff',
            // 'coastline-stroke': [0.8, 0.63, 0.94, 1],
            // 'province-stroke': 'white',
            'city-stroke': 'rgba(188,159,135,0.5)',//中国特有字段
            'fill': function (props) {//中国特有字段
              console.log('props.adcode_pro', props.adcode_pro)
              // return _this.getColorByDGP(props.adcode_pro)
            }
          }
        })
        disCountry.setMap(_this.map);
        _this.map.setFitView()
      })
    },
    getColorByAdcode (adcode) {
      let colors = {};
      if (!colors[adcode]) {
        var gb = Math.random() * 155 + 50;
        colors[adcode] = 'rgba(' + gb + ',' + gb + ',255,0.3)';
      }

      return colors[adcode];
      // return 'rgba(204,243,255,0.1)'
    },
    removeOverlayGroup () {
      this.map.remove(this.overlayGroups);
    },
    removeRenderClusterMarker () {
      if (this.clusterMarker) {
        this.map.remove(this.clusterMarker);
      }
      this.map.clearInfoWindow();
    },
    addMarkerOnly (data) {
      const that = this
      if (that.markerOnly) {
        that.map.remove(that.markerOnly)
      }
      that.markerOnly = new AMap.Marker({
        position: data.jw,
        size: new AMap.Size(20, 2),
        offset: new AMap.Pixel(-13, -30),
        icon: that.projectIcon,
      });
      that.map.setFitView(that.markerOnly);
      that.markerOnly.setMap(that.map);
      that.customizationInfoWindow(data, that.markerOnly)
      // }, 800)

      // });
    },
    // 自定义的信息窗口
    customizationInfoWindow (data) {
      const that = this
      const infoBox = this.$refs.ProjectInfoBox
      that.infoWindow = new AMap.InfoWindow({
        isCustom: true,  //使用自定义窗体
        content: infoBox,
        offset: new AMap.Pixel(-6, -35)
      });
      //鼠标点击marker弹出自定义的信息窗体
      that.projectInfoData = data
      // setTimeout(() => {
      that.infoWindow.open(that.map, data.jw);
      that.showProjectInfoBox = true
    },
    //关闭信息窗体
    closeInfoWindow () {
      this.map.clearInfoWindow();
    },
    clearMarkerOnly () {
      this.map.remove(this.markerOnly);
    },
    mapClear () {
      this.map.clear()
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .amap-icon {
  width: 100%;
  height: 100%;
}
.container-div {
  width: 100%;
  height: 100%;
}

#container {
  width: 100%;
  height: 100%;
}
.project-info-box {
  color: #fff;
  font-size: 14px;
  width: 320px;
  height: 200px;
  border: 1px solid #354881;
}
</style>
