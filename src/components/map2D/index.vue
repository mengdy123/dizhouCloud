<template>
  <div class="container-div">
    <div id="container">
    </div>
    <div ref='ProjectInfoBox'
         class="project-info-box"
         v-show="showProjectInfoBox">
      <projectInfo v-if="showProjectInfoBox"
                   :projectInfoData='projectInfoData'
                   @closeInfoWindow='closeInfoWindow'></projectInfo>
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
      markerFillColor: '',
      clusterAreaMarker: null,
      infoWindow: null,
      projectInfoData: {},
      showProjectInfoBox: false,
      projectLayer: null,
      projectIcon: require('../../assets/map-icon/p_04.svg'),
      projectIconHeight: require('../../assets/map-icon/p_04_h.svg'),
      heightMarkerLayer: null,
      addrArr: [],
      districtExplorer: null,
      selectDistrictExplorer: null,
      colors: [
        "#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00",
        "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707",
        "#651067", "#329262", "#5574a6", "#3b3eac"
      ],
      //当前聚焦的区域
      currentAreaNode: null,
      mapGeocoderInfo: null,
      cityList: [],
      cityCode: ''

    }
  },
  computed: {
    ...mapState({
      projectLayerData: state => state.map2D.projectLayerData,
      markerLayerData: state => state.map2D.markerLayerData,
      municipalityList: state => state.map2D.municipalityList,
      addressInfo: state => state.map2D.addressInfo,
      provinceSelectData: state => state.map2D.provinceSelectData,
      citySelectData: state => state.map2D.citySelectData,
      countySelectData: state => state.map2D.countySelectData,
      boxTypeTitle: state => state.map2D.boxTypeTitle,
    })
  },
  watch: {
    markerLayerData: {
      deep: true,
      handler (newVal) {
        if (newVal && newVal.data.length > 0) {
          this.markerFillColor = newVal.color
          this.markerAreaInit(newVal.data)
        } else {
          this.markerFillColor = ''
          this.removeRenderClusterMarker()
        }
        // console.log('newVal', newVal)
        // console.log('this.markerFillColor', this.markerFillColor)
      },
    },
  },
  mounted () {
    const that = this
    this.$nextTick(() => {
      that.init()
      //地图层级变化，执行方法
      // console.log('当前缩放级别：', zoomNum)
      that.map.on('zoomchange', function (e) {
        that.scaleInit()
      })
      that.map.on('click', function (ev) {
        // 触发事件的地理坐标，AMap.LngLat 类型
        let lnglat = [ev.lnglat.lng, ev.lnglat.lat];
        that.mapGeocoder(lnglat)
        setTimeout(() => {
          let addressInfo = that.mapGeocoderInfo.addressComponent
          console.log('%c mapGeocoderInfo', 'color:green', that.mapGeocoderInfo)
          if (addressInfo) {
            let params = {
              country: addressInfo.country,
              province: addressInfo.province,
              city: addressInfo.city,
              county: addressInfo.district,
            }
            that.$store.dispatch('getHomeIndexInfo', params)
          }

        }, 500)
      })

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
      that.drawLineTypeNew()
    })
    eventBus.$on('afreshRenderFeatures', data => {
      that.afreshRenderFeatures(data)
    })
    eventBus.$on('changeProjectLayerStatus', data => {
      that.changeProjectLayerStatus(data)
    })
    eventBus.$on('addMarkerOnly', data => {
      that.addMarkerOnly(data)
    })

  },

  methods: {
    ...mapActions(['saveScaleData', 'saveAddressInfo', 'saveCitySelectData', 'saveProvinceSelectData', 'saveCountySelectData']),
    async init () {
      // 创建地图实例
      let that = this
      that.map = new AMap.Map('container', {
        resizeEnable: true,   // 是否监控地图容器尺寸变化
        zoom: 4,  //设置地图显示的缩放级别
        zooms: [2, 18],
        center: [107.848005, 28.682565],//设置地图中心点坐标
        // mapStyle: 'amap://styles/darkblue',  //设置地图的显示样式
        mapStyle: 'amap://styles/4cb622910571260c55fe4d457fe40461',  //设置地图的显示样式
      })
      that.toolBarInit()
      that.scaleInit()
      that.drawLineTypeNew()
      console.log('地图加载成功', that.map)
    },
    // 设置地图中心点/级别
    setZoomAndCenterFun () {
      let params = {
        country: '',
        province: '',
        city: '',
        county: '',
      }
      this.$store.dispatch('getHomeIndexInfo', params)
      this.map.setZoomAndCenter(4, [107.848005, 28.682565]);
      if (this.selectDistrictExplorer) {
        this.selectDistrictExplorer.clearFeaturePolygons();
      }
      this.switch2AreaNode(100000)
      this.saveProvinceSelectData(null)
      this.saveCitySelectData(null)
      this.saveCountySelectData(null)

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
    // echart撒点的方法 并且根据区域聚合
    markerAreaInit (layerList) {
      let that = this
      if (that.clusterAreaMarker) {
        that.clusterAreaMarker.hide()
      }
      AMapUI.load(['ui/geo/DistrictCluster', 'lib/$'], function (DistrictCluster, $) {
        // console.log('DistrictCluster', DistrictCluster)
        let parts = []
        that.clusterAreaMarker = new DistrictCluster({
          map: that.map, //所属的地图实例
          zIndex: 11,
          autoSetFitView: false,
          //返回数据项中的经纬度位置
          getPosition: function (item) {
            if (!item) {
              return null;
            }
            parts = item.lnglat
            //返回经纬度
            // console.log('that.clusterAreaMarker', [parseFloat(parts[0]), parseFloat(parts[1])])
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
            //按区划级别country,province,city,district定义的区划面样式，优先级高于 featureStyle 
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
            // zoomToShowSubFeatures: {

            // },
            //显示在所辖数据点的平均位置 CENTROID
            getClusterMarkerPosition: DistrictCluster.ClusterMarkerPositionStrategy.AVERAGE_POINTS_POSITION,
            getClusterMarker: function (feature, dataItems, recycledMarker) {
              let name = feature.properties.name
              // console.log('recycledMarker', recycledMarker)
              if (name === '新疆维吾尔自治区') {
                name = '新疆'
              } else if (name === '内蒙古自治区') {
                name = '内蒙古'
              } else if (name === '宁夏回族自治区') {
                name = '宁夏'
              } else if (name === '广西壮族自治区') {
                name = '广西'
              } else if (name === '西藏自治区') {
                name = '西藏'
              }
              let type
              if (that.boxTypeTitle === 'project') {
                type = '项目'
              } else if (that.boxTypeTitle === 'system') {
                type = '系统'
              } else if (that.boxTypeTitle === 'equipment') {
                type = '设备'
              }
              //label内容
              let content = name + '    ' + type + '    ' + dataItems.length
              // let content = dataItems.length
              let label = null
              // if (dataItems.length > 1) {
              label = {
                offset: new AMap.Pixel(0, 0), //修改label相对于marker的位置
                content: content,
                offset: new AMap.Pixel(-24, -30),
                zIndex: 9
              };
              // }
              //返回一个新的Marker
              const icon = new AMap.Icon({
                size: new AMap.Size(20, 20),    // 图标尺寸
                image: that.projectIcon,  // Icon的图像
                imageSize: new AMap.Size(20, 20),   // 根据所设置的大小拉伸或压缩图片
                zIndex: 8
              });
              if (dataItems.length > 0) {
                let Marker = new AMap.Marker({
                  label: label,
                  draggable: false,
                  icon: icon,
                  zIndex: 12,
                  // content: iconList[that.markerFillColor],
                });
                Marker.on('click', function (e) {
                  console.log('e', e)
                  console.log('dataItems', dataItems)
                  if (that.heightMarkerLayer) {
                    that.map.remove(that.heightMarkerLayer)
                  }
                  let row = {
                    row: ['扬州文昌路1', '扬州', '运行中', '交通', '43', '789']
                  }
                  // return
                  let lnglat = dataItems[0].dataItem.lnglat
                  let data = {
                    ...row,
                    type: 'project',
                    jw: lnglat
                  }
                  if (dataItems.length === 1) {
                    that.heightMarkerLayer = that.markerHeightLayer(that.projectIconHeight, lnglat)
                    that.customizationInfoWindow(data)
                  }
                  // that.heightMarkerLayer = that.markerHeightLayer(that.projectIconHeight, lnglat)
                  // that.customizationInfoWindow(data)
                });
                return Marker

              }
            },
            // getClusterMarkerPosition: function (item) {
            //   console.log('item', item)
            // },

          },
        });
        //设置数据
        that.clusterAreaMarker.setData(layerList);
      });
    },
    // 项目撒点方法
    addMaker (iconImg, layerList) {
      let that = this
      if (that.markerOnly) {
        that.map.remove(that.markerOnly)
      }
      let layer = []
      for (let i = 0; i < layerList.length; i++) {
        let lnglat = layerList[i].lnglat;
        // 创建点实例
        let marker = new AMap.Marker({
          position: lnglat,
          icon: iconImg,
          draggable: false,
          clickable: true,
        })
        layer.push(marker)
        marker.on('click', function () {
          if (that.heightMarkerLayer) {
            that.map.remove(that.heightMarkerLayer)
          }
          let row = {
            row: ['扬州文昌路1', '扬州', '运行中', '交通', '43', '789']
          }
          let data = {
            ...row,
            type: 'project',
            jw: lnglat
          }
          that.heightMarkerLayer = that.markerHeightLayer(that.projectIconHeight, lnglat)
          that.customizationInfoWindow(data)
        });
      }
      that.projectLayer = new AMap.OverlayGroup(layer);
      that.map.add(that.projectLayer);
    },
    // 高亮撒点  marker  
    markerHeightLayer (iconImg, data) {
      console.log('markerHeightLayer', data)
      const icon = new AMap.Icon({
        size: new AMap.Size(20, 20),    // 图标尺寸
        image: iconImg,  // Icon的图像
        imageSize: new AMap.Size(20, 20),   // 根据所设置的大小拉伸或压缩图片
        zIndex: 8
      });
      let marker = new AMap.Marker({
        position: data, // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        draggable: false,
        icon: icon,
      });
      this.map.add(marker);
      this.map.setFitView(marker)
      return marker
    },
    // 修改全部项目撒点的展示状态
    changeProjectLayerStatus (status) {
      let that = this
      if (status) {
        // this.projectLayer.show()
        that.markerAreaInit(dataP1.points)
      } else {
        // this.projectLayer.hide()
        that.clusterAreaMarker.hide()
      }
    },
    // 点击地图，获取信息
    getMapClick (e) {
      let lnglat = [e.lnglat.lng, e.lnglat.lat]
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
            // console.log('逆向地理编码方法-------', result.regeocode)
            _this.mapGeocoderInfo = result.regeocode

          }
        })
      })
    },
    //绘制边界线
    drawLineType () {
      const that = this
      AMapUI.load(['ui/geo/DistrictExplorer', 'lib/$', 'ui/misc/PointSimplifier'], function (DistrictExplorer, $, PointSimplifier) {
        that.districtExplorer = new DistrictExplorer({
          map: that.map,
          eventSupport: true, //打开事件支持
          preload: [100000] //预加载全国
        });
        that.selectDistrictExplorer = new DistrictExplorer({
          map: that.map
        });
        const adcode = 100000;
        // 点击事件的
        that.listenMouseEvents();
        that.districtExplorer.loadAreaNode(adcode, function (error, areaNode) {
          if (error) {
            console.error(error);
            return;
          }
          //绘制载入的区划节点
          that.renderCountry(true, areaNode);
        });

      })
    },
    // 根据某一区域的名称查询该区域所包含的子集列表
    getProvienceCity (name) {
      const that = this
      // console.log('某一区域', name)
      //行政区划查询
      AMap.plugin('AMap.DistrictSearch', function () {
        let districtSearch = new AMap.DistrictSearch({
          subdistrict: 1,   //返回下一级行政区
          showbiz: false  //最后一级返回街道信息
        })
        that.cityList = []
        // 搜索所有省/直辖市信息
        districtSearch.search(name, function (status, result) {
          // 查询成功时，result即为对应的行政区信息
          // console.log('行政区划查询', result)
          result.districtList.forEach(item => {
            if (item.name === name) {
              if (item.districtList.length > 0) {
                item.districtList.forEach(it => {
                  that.cityList.push(it)
                })
              }
            }
          })

        })
      })
    },
    // 省市
    afreshRenderFeatures (data) {
      // console.log('afreshRenderFeatures', data)
      // console.log('mapGeocoderInfo', this.mapGeocoderInfo)
      if (data === 'province') {
        this.switch2AreaNode(this.provinceSelectData)
      } else if (data === 'city') {
        this.switch2AreaNode(this.citySelectData)
      }
    },
    // 关于省市区的一些判断 
    drawLineTypeNew () {
      const that = this
      AMapUI.load(['ui/geo/DistrictExplorer', 'lib/$'], function (DistrictExplorer, $) {
        //创建一个实例
        that.districtExplorer = window.districtExplorer = new DistrictExplorer({
          eventSupport: true, //打开事件支持
          map: that.map
        });
        //当前聚焦的区域
        that.currentAreaNode = null;
        that.switch2AreaNode(100000)
        //feature被点击
        that.districtExplorer.on('featureClick', function (e, feature) {
          // 获取点击图层的adcode
          let featureType = feature.properties.level
          let adcode = feature.properties.adcode;
          // console.log('feature', feature)
          that.switch2AreaNode(adcode)
          if (featureType === 'province') {
            that.saveProvinceSelectData(adcode)
            that.saveCitySelectData(null)
            that.saveCountySelectData(null)
          } else if (featureType === "city") {
            that.saveCitySelectData(adcode)
            that.saveCountySelectData(null)
          } else if (featureType === 'district') {
            that.saveCountySelectData(adcode)
          }
        });
        //外部区域被点击
        that.districtExplorer.on('outsideClick', function (e) {
          let lnglat = [e.originalEvent.lnglat.lng, e.originalEvent.lnglat.lat]
          that.districtExplorer.locatePosition(e.originalEvent.lnglat, function (error, routeFeatures) {
            console.log('routeFeatures[1]', routeFeatures)
            if (routeFeatures && routeFeatures.length > 1) {
              let adcode = routeFeatures[1].properties.adcode
              let citycode
              // 首先获取点击这个点的adcode 通过点击的经纬度，进行逆地理编码  mapGeocoder
              that.mapGeocoder(lnglat)
              setTimeout(() => {
                // that.mapGeocoderInfo.addressComponent.city  下次
                citycode = that.mapGeocoderInfo.addressComponent.citycode
                that.getProvienceCity(routeFeatures[1].properties.name)
                setTimeout(() => {
                  that.cityList.forEach(item => {
                    if (citycode == item.citycode) {
                      adcode = item.adcode
                    }
                  })
                  let four1
                  let two1
                  if (that.citySelectData) {
                    four1 = that.citySelectData.toString().slice(0, 4)
                    two1 = that.citySelectData.toString().slice(0, 2)
                    // console.log('two1---2', two1)
                  } else {
                    four1 = that.mapGeocoderInfo.addressComponent.adcode.toString().slice(0, 4)
                    two1 = that.mapGeocoderInfo.addressComponent.adcode.toString().slice(0, 2)
                  }
                  console.log('that.adcode', adcode)
                  let provinceSelectData = that.provinceSelectData.toString().slice(0, 2) || null
                  const four2 = adcode.slice(0, 4)
                  const two2 = adcode.slice(0, 2)
                  console.log('two1', two1, two2, provinceSelectData, four1, four2)
                  if (four1 == four2 && provinceSelectData == two2) {
                    // 切换时，如果地图同省同市跨区 显示区
                    adcode = that.mapGeocoderInfo.addressComponent.adcode
                    that.saveCountySelectData(adcode)
                  } else if (two1 == two2 && four1 != four2 && provinceSelectData == two2) {
                    // 切换时，如果地图同省不同市跨区 显示市
                    adcode = four2 ? four2 + '00' : null
                    that.saveCitySelectData(adcode)
                    console.log('saveCitySelectData', four2)
                    that.saveCountySelectData(null)
                  } else {
                    // 切换时，如果地图不同省不同市跨区 显示省
                    adcode = routeFeatures[1].properties.adcode
                    that.saveProvinceSelectData(routeFeatures[1].properties.adcode)
                    that.saveCitySelectData(null)
                    that.saveCountySelectData(null)
                  }
                  console.log('一系列查询出来的adcode111', adcode)
                  // that.saveCitySelectData(adcode)
                  that.switch2AreaNode(adcode);
                }, 500)
              }, 500)
            } else {
              //切换到全国
              that.switch2AreaNode(100000);
              if (that.mapGeocoderInfo) {
                that.mapGeocoderInfo = null
                let params = {
                  country: '',
                  province: '',
                  city: '',
                  county: '',
                }
                that.$store.dispatch('getHomeIndexInfo', params)
              }

              return false
            }
          }, {
            levelLimit: 2
          });
        });
      })
    },
    //绘制某个区域的边界
    renderAreaPolygonsNew (areaNode) {
      // console.log('绘制某个区域的边界的areaNode', areaNode.adcode)
      const that = this
      //更新地图视野
      // that.map.setBounds(areaNode.getBounds(), null, null, true);
      //清除已有的绘制内容
      that.districtExplorer.clearFeaturePolygons();
      //绘制子区域
      that.districtExplorer.renderSubFeatures(areaNode, function (feature, i) {
        var fillColor = that.colors[i % that.colors.length];
        var strokeColor = that.colors[that.colors.length - 1 - i % that.colors.length];
        return {
          cursor: 'default',
          bubble: true,
          strokeColor: that.colors[0], //线颜色
          strokeOpacity: 0.35, //线透明度
          strokeWeight: 1, //线宽
          fillColor: null, //填充色
          fillOpacity: 0.1, //填充透明度
        };
      });
      //绘制父区域
      that.districtExplorer.renderParentFeature(areaNode, {
        cursor: 'default',
        bubble: true,
        // strokeColor: 'black', //线颜色
        strokeColor: 'rgba(188,159,135,1)', //线颜色
        strokeOpacity: 1, //线透明度
        strokeWeight: 1, //线宽
        fillColor: areaNode.getSubFeatures().length ? null : that.colors[0], //填充色
        fillOpacity: 0.1, //填充透明度
      });
      //更新地图视野以适合区划面
      that.map.setFitView(that.districtExplorer.getAllFeaturePolygons());
    },
    //切换区域后刷新显示内容
    refreshAreaNode (areaNode) {
      const that = this
      that.districtExplorer.setHoverFeature(null);
      that.renderAreaPolygonsNew(areaNode);
    },
    //切换区域
    switch2AreaNode (adcode, callback) {
      const that = this
      // console.log('切换区域---adcode', adcode)
      if (adcode === 100000) {
        if (that.currentAreaNode && that.currentAreaNode.adcode === 100000) {
          return
        }
        that.saveProvinceSelectData(null)
        that.saveCitySelectData(null)
        that.saveCountySelectData(null)
      }
      if (that.currentAreaNode && ('' + that.currentAreaNode.getAdcode() === '' + adcode)) {
        return;
      }
      that.districtExplorer.loadAreaNode(adcode, function (error, areaNode) {
        if (error) {
          if (callback) {
            callback(error);
          }
          return;
        }
        that.currentAreaNode = window.currentAreaNode = areaNode;
        // console.log('that.currentAreaNode-----', that.currentAreaNode)
        //设置当前使用的定位用节点
        that.districtExplorer.setAreaNodesForLocating([that.currentAreaNode]);
        that.refreshAreaNode(areaNode);
        if (callback) {
          callback(null, areaNode);
        }
      });
    },

    // 按钮清空图层
    removeRenderClusterMarker () {
      // 清空地图的区域绘制
      if (this.districtExplorer) {
        this.switch2AreaNode(100000)
      }
      // 清除项目撒点
      if (this.markerOnly) {
        this.map.remove(this.markerOnly)
      }
      if (this.projectLayer) {
        this.projectLayer.hide()
      }
      if (this.heightMarkerLayer) {
        this.map.remove(this.heightMarkerLayer)
      }
      // 清除echart区域聚合撒点
      if (this.clusterAreaMarker) {
        this.clusterAreaMarker.hide()
      }
      //清除项目弹框
      this.map.clearInfoWindow();
    },
    //点击项目列表撒点
    addMarkerOnly (data) {
      console.log('=-----addMarkerOnly', data)
      let city, province, citycode, cityAdcode, provinceAdcode
      if (this.markerOnly) {
        this.map.remove(this.markerOnly)
      }
      const icon = new AMap.Icon({
        size: new AMap.Size(20, 20),    // 图标尺寸
        image: this.projectIcon,  // Icon的图像
        imageSize: new AMap.Size(20, 20),   // 根据所设置的大小拉伸或压缩图片
        zIndex: 8
      });
      this.markerOnly = new AMap.Marker({
        position: data.jw,
        icon: icon,
        draggable: false,
        clickable: true,
      })
      this.map.add(this.markerOnly)
      this.mapGeocoder(data.jw)
      setTimeout(() => {
        city = this.mapGeocoderInfo.addressComponent.city
        province = this.mapGeocoderInfo.addressComponent.province
        citycode = this.mapGeocoderInfo.addressComponent.citycode
        this.getProvienceCity(province)
        setTimeout(() => {
          this.cityList.forEach(item => {
            if (item.citycode == citycode) {
              cityAdcode = item.adcode
            }
          })
          provinceAdcode = cityAdcode.toString().slice(0, 2) + '0000'
          this.saveProvinceSelectData(provinceAdcode)
          this.saveCitySelectData(cityAdcode)
        }, 500)
      }, 500)

      this.heightMarkerLayer = this.markerHeightLayer(this.projectIconHeight, data.jw)
      // console.log('点击项目列表撒点', data)
      this.customizationInfoWindow(data)
    },
    // 自定义的信息窗口
    customizationInfoWindow (data) {
      // console.log('自定义的信息窗口', data)
      const that = this
      const infoBox = this.$refs.ProjectInfoBox
      that.infoWindow = new AMap.InfoWindow({
        isCustom: true,  //使用自定义窗体
        content: infoBox,
        offset: new AMap.Pixel(0, -30)
      });
      //鼠标点击marker弹出自定义的信息窗体
      that.projectInfoData = data
      that.infoWindow.open(that.map, data.jw);
      that.showProjectInfoBox = true
      // that.map.panTo(data.jw)
      // that.map.setZoom(19)
    },
    //关闭信息窗体
    closeInfoWindow () {
      this.map.clearInfoWindow();
      if (this.heightMarkerLayer) {
        this.map.remove(this.heightMarkerLayer)
      }
    },
    clearMarkerOnly () {
      this.map.remove(this.markerOnly);
    },
    clearMarkerLayer (data) {
      if (data) {
        this.map.remove(data);
      }

    },
    mapClear () {
      this.map.clear()
      if (this.clusterAreaMarker) {
        this.clusterAreaMarker.hide()
      }
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .amap-icon {
  width: 100%;
  height: 100%;
}
/deep/ .amap-logo {
  display: none;
  opacity: 0 !important;
}
/deep/ .amap-copyright {
  opacity: 0;
}
/deep/ .amap-marker-label {
  color: #ebe2df;
  border: 0;
  background: none;
  text-align: center;
  background: #20242b;
  padding: 6px 10px;
  border-radius: 2px;
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

  border: 1px solid #354881;
}
</style>
