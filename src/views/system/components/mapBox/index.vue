<template>
  <!-- v-show="dialogVisible" -->
  <div class="dz-map-box">
    <div class="close-map-box">
      <i class="el-icon-close"
         @click="closeMapBpx"></i>
    </div>
    <div id="container">
      <div class="map-input">
        <el-autocomplete class="inline-input"
                         popper-class="my-autocomplete"
                         placeholder="请输入地址"
                         v-model="address"
                         :fetch-suggestions="querySearch"
                         :trigger-on-focus="false"
                         @select="handleSelect">
          <template slot-scope="{ item }">
            <div class="name">{{ item.value }}</div>
            <span class="addr">{{ item.address }}</span>
          </template>
        </el-autocomplete>
      </div>
    </div>
    <div class="button-list">
      <el-button @click="closeMapBpx">取 消</el-button>
      <el-button type="primary"
                 @click="saveMapInfo">确 定</el-button>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      restaurants: [],
      dialogVisible: false,
      address: '',
      lnglat: [],
      map: null,
      placeSearch: null,
      mapGeocoderInfo: {
        name: '',
        lnglat: []
      }
    }
  },
  mounted () {
    this.address = ''
    setTimeout(() => {
      this.init()
    }, 500)
  },
  methods: {
    ...mapActions(['saveProjectAddress']),
    saveMapInfo () {
      this.mapGeocoderInfo.name = this.address
      this.mapGeocoderInfo.lnglat = this.lnglat
      this.saveProjectAddress(this.mapGeocoderInfo)
      this.$emit('changeProjectBox', false)
    },
    closeMapBpx () {
      this.saveProjectAddress(null)
      this.$emit('changeProjectBox', false)
    },
    init () {
      // 创建地图实例
      let that = this
      that.map = new AMap.Map('container', {
        resizeEnable: true,   // 是否监控地图容器尺寸变化
        zoom: 4,  //设置地图显示的缩放级别
        zooms: [2, 18],
        center: [107.848005, 28.682565],//设置地图中心点坐标
      })
      console.log('地图加载成功', that.map)
    },
    changeDialogVisible (status) {
      this.dialogVisible = status
    },
    autoInput () {
      let that = this
      AMap.plugin('AMap.PlaceSearch', function () {
        var autoOptions = {
          city: '全国'
        }
        AMap.plugin(["AMap.PlaceSearch"], function () {
          var placeSearch = new AMap.PlaceSearch(autoOptions);
          placeSearch.search(that.address, function (status, result) {
            // 搜索成功时，result即是对应的匹配数据
            // console.log('result---search', result)
            if (result && result.info === 'OK') {
              that.restaurants = result.poiList.pois
              that.restaurants.forEach(item => {
                item.value = item.name
              })
            }

          })
        });
      })
    },
    querySearch (queryString, cb) {
      this.autoInput()
      setTimeout(() => {
        console.log('this.restaurants', this.restaurants)
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      }, 500)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
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
            console.log('逆向地理编码方法-------', result.regeocode)
            _this.mapGeocoderInfo = result.regeocode
          }
        })
      })
    },
    handleSelect (item) {
      console.log('handleSelect', item);
      console.log('address', this.address);
      let lnglat = [item.location.lng, item.location.lat]
      this.lnglat = [item.location.lng, item.location.lat]
      this.mapGeocoder(lnglat)
    },
  }
}
</script>
<style>
.el-autocomplete-suggestion li {
  line-height: 20px !important;
}
</style>
<style lang="less" scoped>
.my-autocomplete {
  li {
    line-height: normal;
    line-height: 14px !important;
    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }
    .highlighted .addr {
      color: #ddd;
    }
  }
}
.dz-map-box {
  width: auto;
  position: fixed;
  top: 100px;
  left: 50%;
  margin-left: -400px;
  z-index: 6;
  width: 800px;
  height: 700px;
  background: #ffffff;
  border-radius: 4px;
  .close-map-box {
    width: 100%;
    height: 30px;
    display: flex;
    margin-top: 20px;
    justify-content: flex-end;
    border-bottom: 1px solid #eeeeee;
    i {
      font-size: 20px;
      padding-right: 30px;
      cursor: pointer;
    }
  }
  #container {
    width: 740px;
    height: 500px;
    margin: 30px auto;
    position: relative;
  }
  .map-input {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 200px;
    z-index: 9;
  }
}
.button-list {
  display: flex;
  justify-content: center;
}
</style>