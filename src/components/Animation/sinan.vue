<template>
  <div class="wrap-container sn-container">
    <div class="pd-main">
      <div class="compass">
        <div class="compass-bg-1 compass-bg"></div>
        <div class="compass-bg-2 compass-bg"></div>
        <div class="compass-bg-3 compass-bg"></div>
        <div class="compass-bg-4 compass-bg"></div>
        <div class="compass-bg-5 compass-bg"></div>
        <div class="compass-bg-6 compass-bg"></div>
        <div class="compass-bg-7 compass-bg"></div>

        <div class="compass-bg-c-1"></div>

        <div class="line-sx">
          <div class="line-fs"></div>
          <div class="line-fs"></div>
          <div class="line-fs"></div>
          <div class="line-fs"></div>
          <div class="line-fs"></div>
          <div class="line-fs"></div>
          <div class="line-fs"></div>
          <div class="line-fs"></div>
          <div class="line-fs"></div>
        </div>
      </div>
      <div class="warp-total">{{total}}</div>
      <div class="warp-name">{{name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sinan",
  props: {
    total: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      timer: null,
      number: null,
      arr: [{
        id: 1,
        itemNum: 258,
        dataItem: 1288,
        dataSize: 12306,
        workUnit: 'JS'
      }, {
        id: 2,
        itemNum: 568,
        dataItem: 5623,
        dataSize: 12306,
        workUnit: 'Nodejs'
      }, {
        id: 3,
        itemNum: 208,
        dataItem: 1755,
        dataSize: 12043,
        workUnit: 'Vuejs'
      }, {
        id: 4,
        itemNum: 358,
        dataItem: 1812,
        dataSize: 12306,
        workUnit: 'CSS3'
      }, {
        id: 5,
        itemNum: 128,
        dataItem: 4718,
        dataSize: 12580,
        workUnit: 'jQuery'
      }]
    }
  },
  mounted () {
    setTimeout(() => {
      this.number = 0;
      this.initData();
    }, 4000)
  },
  methods: {
    initData () {
      this.number = this.number == this.arr.length ? 0 : this.number;
      this.timer = setTimeout(() => {
        this.number++;
        this.initData();
      }, 5000)
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer);
  }
};
</script>

<style lang="less" scoped>
@import "../../style/color.less";
.sn-container {
  width: 400px;
  height: 100%;
  .pd-main {
    position: absolute;
    left: 0;
    top: 20px;
    height: 100%;
    width: 100%;
    z-index: 1;
    .compass {
      width: 100%;
      height: 100%;
      -webkit-transform: scale(0.7);
      -moz-transform: scale(0.7);
      -ms-transform: scale(0.7);
      -o-transform: scale(0.7);
      transform: scale(0.7);
      .compass-bg {
        position: absolute;
        bottom: 0px;
        left: 50%;
        -webkit-transform: rotateX(-80deg) rotateZ(45deg) rotateY(0deg);
        -moz-transform: rotateX(-80deg) rotateZ(45deg) rotateY(0deg);
        transform: rotateX(-80deg) rotateZ(45deg) rotateY(0deg);
      }
      .compass-bg-1 {
        margin-left: -250px;
        bottom: -200px;
        width: 500px;
        height: 500px;
        background: -webkit-repeating-radial-gradient(
          transparent,
          rgba(0, 138, 174, 0.2)
        );
        background: -moz-repeating-radial-gradient(
          transparent,
          rgba(0, 138, 174, 0.2)
        );
        background: -o-repeating-radial-gradient(
          transparent,
          rgba(0, 138, 174, 0.2)
        );
        background: repeating-radial-gradient(
          transparent,
          rgba(0, 138, 174, 0.2)
        );
        display: none;
      }
      .compass-bg-3 {
        margin-left: -190px;
        bottom: -140px;
        width: 380px;
        height: 380px;
        background: -webkit-repeating-radial-gradient(
          transparent,
          rgba(10, 58, 103, 0.2)
        );
        background: -moz-repeating-radial-gradient(
          transparent,
          rgba(10, 58, 103, 0.2)
        );
        background: -o-repeating-radial-gradient(
          transparent,
          rgba(10, 58, 103, 0.2)
        );
        background: repeating-radial-gradient(
          transparent,
          rgba(10, 58, 103, 0.2)
        );
      }
      .compass-bg-4 {
        margin-left: -160px;
        bottom: -110px;
        width: 320px;
        height: 320px;
        background: -webkit-repeating-radial-gradient(
          transparent,
          rgba(112, 67, 103, 0.2)
        );
        background: -moz-repeating-radial-gradient(
          transparent,
          rgba(112, 67, 103, 0.2)
        );
        background: -o-repeating-radial-gradient(
          transparent,
          rgba(112, 67, 103, 0.2)
        );
        background: repeating-radial-gradient(
          transparent,
          rgba(112, 67, 103, 0.2)
        );
      }
      .compass-bg-5 {
        margin-left: -130px;
        bottom: -80px;
        width: 260px;
        height: 260px;
        -webkit-box-shadow: inset 0 0 10px 10px rgba(44, 183, 190, 0.8);
        -moz-box-shadow: inset 0 0 10px 10px rgba(44, 183, 190, 0.8);
        box-shadow: inset 0 0 10px 10px rgba(44, 183, 190, 0.8);
      }
      .compass-bg-6 {
        margin-left: -100px;
        bottom: -50px;
        width: 200px;
        height: 200px;
        background: -webkit-repeating-radial-gradient(
          transparent,
          rgba(246, 116, 160, 0.2)
        );
        background: -moz-repeating-radial-gradient(
          transparent,
          rgba(246, 116, 160, 0.2)
        );
        background: -o-repeating-radial-gradient(
          transparent,
          rgba(246, 116, 160, 0.2)
        );
        background: repeating-radial-gradient(
          transparent,
          rgba(246, 116, 160, 0.2)
        );
        display: none;
      }
      .compass-bg-7 {
        margin-left: -70px;
        bottom: -20px;
        width: 140px;
        height: 140px;
        background: -webkit-repeating-radial-gradient(
          transparent,
          rgba(102, 97, 70, 0.2)
        );
        background: -moz-repeating-radial-gradient(
          transparent,
          rgba(102, 97, 70, 0.2)
        );
        background: -o-repeating-radial-gradient(
          transparent,
          rgba(102, 97, 70, 0.2)
        );
        background: repeating-radial-gradient(
          transparent,
          rgba(102, 97, 70, 0.2)
        );
        -webkit-animation: bgshadow 3s linear infinite;
        -moz-animation: bgshadow 3s linear infinite;
        -o-animation: bgshadow 3s linear infinite;
        animation: bgshadow 3s linear infinite;
      }

      .compass-bg-c-1 {
        width: 100%;
        height: 100%;
        background: url("../../assets/chart1/compass-bg-1.png") no-repeat 50%
          90%;
      }
      .line-sx {
        > div {
          &:nth-child(2) {
            height: 90%;
            -webkit-animation-duration: 2s;
            -moz-animation-duration: 2s;
            -o-animation-duration: 2s;
            animation-duration: 2s;
            -webkit-animation-delay: 1.5s;
            -moz-animation-delay: 1.5s;
            -o-animation-delay: 1.5s;
            animation-delay: 1.5s;
            bottom: 0;
            left: 51px;
          }
          &:nth-child(3) {
            height: 100%;
            -webkit-animation-duration: 3s;
            -moz-animation-duration: 3s;
            -o-animation-duration: 3s;
            animation-duration: 3s;
            -webkit-animation-delay: 0s;
            -moz-animation-delay: 0s;
            -o-animation-delay: 0s;
            animation-delay: 0s;
            bottom: 32px;
            left: 89px;
          }
          &:nth-child(4) {
            height: 100%;
            -webkit-animation-duration: 2.5s;
            -moz-animation-duration: 2.5s;
            -o-animation-duration: 2.5s;
            animation-duration: 2.5s;
            -webkit-animation-delay: 1s;
            -moz-animation-delay: 1s;
            -o-animation-delay: 1s;
            animation-delay: 1s;
            bottom: 3px;
            left: 179px;
            -webkit-filter: hue-rotate(180deg);
            filter: hue-rotate(180deg);
          }
          &:nth-child(5) {
            height: 90%;
            -webkit-animation-duration: 2s;
            -moz-animation-duration: 2s;
            -o-animation-duration: 2s;
            animation-duration: 2s;
            -webkit-animation-delay: 2s;
            -moz-animation-delay: 2s;
            -o-animation-delay: 2s;
            animation-delay: 2s;
            bottom: 42px;
            left: 229px;
          }
          &:nth-child(6) {
            height: 100%;
            -webkit-animation-duration: 2.5s;
            -moz-animation-duration: 2.5s;
            -o-animation-duration: 2.5s;
            animation-duration: 2.5s;
            -webkit-animation-delay: 0.5s;
            -moz-animation-delay: 0.5s;
            -o-animation-delay: 0.5s;
            animation-delay: 0.5s;
            bottom: 11px;
            right: 48px;
          }
          &:nth-child(7) {
            height: 90%;
            -webkit-animation-duration: 3s;
            -moz-animation-duration: 3s;
            -o-animation-duration: 3s;
            animation-duration: 3s;
            -webkit-animation-delay: 2.5s;
            -moz-animation-delay: 2.5s;
            -o-animation-delay: 2.5s;
            animation-delay: 2.5s;
            bottom: -22px;
            right: 174px;
            -webkit-filter: hue-rotate(180deg);
            filter: hue-rotate(180deg);
          }
          &:nth-child(8) {
            height: 90%;
            -webkit-animation-duration: 3s;
            -moz-animation-duration: 3s;
            -o-animation-duration: 3s;
            animation-duration: 3s;
            -webkit-animation-delay: 1.5s;
            -moz-animation-delay: 1.5s;
            -o-animation-delay: 1.5s;
            animation-delay: 1.5s;
            bottom: -22px;
            right: 100px;
          }
          &:nth-child(9) {
            height: 100%;
            -webkit-animation-duration: 2.5s;
            -moz-animation-duration: 2.5s;
            -o-animation-duration: 2.5s;
            animation-duration: 2.5s;
            -webkit-animation-delay: 2s;
            -moz-animation-delay: 2s;
            -o-animation-delay: 2s;
            animation-delay: 2s;
            bottom: -10px;
            right: 220px;
          }
          &:nth-child(10) {
            height: 95%;
            -webkit-animation-duration: 2s;
            -moz-animation-duration: 2s;
            -o-animation-duration: 2s;
            animation-duration: 2s;
            -webkit-animation-delay: 1s;
            -moz-animation-delay: 1s;
            -o-animation-delay: 1s;
            animation-delay: 1s;
            bottom: -41px;
            right: 182px;
          }
        }
        .line-fs {
          width: 14px;
          height: 100%;
          background: url(../../assets/chart1/line-fs.png) no-repeat;
          background-position: 50% 150%;
          position: absolute;
          z-index: -1;
          -webkit-animation: fs 3s cubic-bezier(1, 0, 0.6, 0.6) infinite;
          -moz-animation: fs 3s cubic-bezier(1, 0, 0.6, 0.6) infinite;
          -o-animation: fs 3s cubic-bezier(1, 0, 0.6, 0.6) infinite;
          animation: fs 3s cubic-bezier(1, 0, 0.6, 0.6) infinite;
        }
      }
    }
  }
  .warp-total {
    position: absolute;
    left: 50%;
    bottom: 22%;
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #35e9ff;
    margin-left: -50px;
    z-index: 2;
    font-size: 22px;
    font-weight: 600;
  }
}
.warp-name {
  position: absolute;
  left: 50%;
  bottom: 10%;
  width: 140px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  color: @white;
  margin-left: -70px;
  z-index: 2;
  font-size: 14px;
  background: url("../../assets/home/energy-bg.png") no-repeat;
  background-size: 100% 100%;
}

@-webkit-keyframes fs {
  0% {
    background-position: 50% 150%;
  }
  50% {
    background-position: 50% -132%;
  }
  100% {
    background-position: 50% -264%;
    opacity: 0;
  }
}
@-moz-keyframes fs {
  0% {
    background-position: 50% 150%;
  }
  50% {
    background-position: 50% -132%;
  }
  100% {
    background-position: 50% -264%;
    opacity: 0;
  }
}
@-o-keyframes fs {
  0% {
    background-position: 50% 150%;
  }
  50% {
    background-position: 50% -132%;
  }
  100% {
    background-position: 50% -264%;
    opacity: 0;
  }
}
@keyframes fs {
  0% {
    background-position: 50% 150%;
  }
  50% {
    background-position: 50% -132%;
  }
  100% {
    background-position: 50% -264%;
    opacity: 0;
  }
}

@-webkit-keyframes bgshadow {
  0%,
  100% {
    -webkit-box-shadow: 0 0 0 rgba(255, 255, 255, 0);
    box-shadow: 0 0 0 rgba(255, 255, 255, 0);
  }
  50% {
    -webkit-box-shadow: 0 0 30em white;
    box-shadow: 0 0 30em white;
  }
}
@-moz-keyframes bgshadow {
  0%,
  100% {
    -moz-box-shadow: 0 0 0 rgba(255, 255, 255, 0);
    box-shadow: 0 0 0 rgba(255, 255, 255, 0);
  }
  50% {
    -moz-box-shadow: 0 0 30em white;
    box-shadow: 0 0 30em white;
  }
}
@-o-keyframes bgshadow {
  0%,
  100% {
    box-shadow: 0 0 0 rgba(255, 255, 255, 0);
  }
  50% {
    box-shadow: 0 0 30em white;
  }
}
@keyframes bgshadow {
  0%,
  100% {
    -webkit-box-shadow: 0 0 0 rgba(255, 255, 255, 0);
    -moz-box-shadow: 0 0 0 rgba(255, 255, 255, 0);
    box-shadow: 0 0 0 rgba(255, 255, 255, 0);
  }
  50% {
    -webkit-box-shadow: 0 0 30em white;
    -moz-box-shadow: 0 0 30em white;
    box-shadow: 0 0 30em white;
  }
}
</style>
