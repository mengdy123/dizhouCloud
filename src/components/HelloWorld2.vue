<!--suppress ALL -->
<template>
  <div id="threes"
       @click="mouseClick">
    <div class="moveText"
         :style="{top:dragTop+'px',left:dragLeft+'px'}">
      <p>机柜编号: {{texts.code}}</p>
      <p>设备类型: {{texts.type}}</p>
    </div>
  </div>
</template>
 
<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { OBJLoader2 } from 'three/examples/jsm/loaders/OBJLoader2.js'
import { MtlObjBridge } from 'three/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js'
export default {
  name: 'threes',
  data () {
    return {
      texts: {
        code: '',
        type: ''
      },
      dragTop: -100,
      dragLeft: -200,
      widthBox: '',
      heightBox: '',
      cabinetData: [
        { code: 'Mesh1', type: '交换机' },
        { code: 'Mesh2', type: '路由器' }
      ],
      clock: '',
      renderer: '', // 渲染器
      camera: '', // 相机
      scene: '', // 场景
      light: '', // 光线
      mesh: '', // 网格
      controls: '',//控制
      baseUrl: process.env.BASE_URL
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.threeStart()
    })
  },
  methods: {
    /**
     * 初始化渲染器
     */
    initThree () {
      this.widthBox = document.getElementById('threes').clientWidth
      this.heightBox = document.getElementById('threes').clientHeight
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      this.renderer.setSize(this.widthBox, this.heightBox)
      document.getElementById('threes').appendChild(this.renderer.domElement)
      this.renderer.setClearAlpha(0.2);
    },

    /**
     * 初始化相机
     */
    initCamera () {
      this.camera = new THREE.PerspectiveCamera(45, this.widthBox / this.heightBox, 0.1, 2000)
      this.camera.position.set(150, 250, 200)
    },

    /**
     * 初始化场景
     */
    initScene () {
      this.scene = new THREE.Scene()
    },

    /**
     * 初始化灯光
     */
    initLight () {
      this.light = new THREE.AmbientLight(0xffffff)
      this.scene.add(this.light)
      let pointLight = new THREE.PointLight(0xe3e3e4)
      pointLight.position.set(300, 150, 350)
      this.scene.add(pointLight)
    },

    /**
     * 初始化模型
     */
    initObject () {
      let objLoader2 = new OBJLoader2()
      let mtlLoader = new MTLLoader()
      let _this = this
      let urls_mtl = `${this.baseUrl}` + '/webgl/test.mtl'
      let urls_obj = `${this.baseUrl}` + '/webgl/test.obj'

      mtlLoader.load(urls_mtl, function (mtlParseResult) {
        console.log(mtlParseResult)
        objLoader2.setLogging(true, true)
        objLoader2.addMaterials(MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult))
        objLoader2.load(urls_obj, function (calldata) {
          _this.oldChildren = _this.dealMeshMaterial(calldata.children)
          _this.scene.add(calldata)
        }, null, null, null)
      })
    },

    /**
     * 留住每个模型的 原材质
     */
    dealMeshMaterial (arrs) {
      let result = []
      for (let i = 0; i < arrs.length; i++) {
        let obj = {
          'name': arrs[i].name,
          'material': arrs[i].material
        }
        result.push(obj)
      }
      return result
    },

    /**
     * 用户交换事件
     */
    initControls () {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      // 拉近摄像头
      this.controls.minDistance = 5
      this.controls.maxDistance = 600
      // 垂直旋转
      this.controls.maxPolarAngle = Math.PI / 2
      this.controls.minPolarAngle = Math.PI / 4

      this.controls.target.set(0, 5, 0)
    },

    /**
     * 控制动画
     */
    animation () {
      this.controls.update()
      requestAnimationFrame(this.animation)
      this.renderer.render(this.scene, this.camera)
    },

    /**
     * 点击事件
     */
    mouseClick (event) {
      // 先还原
      this.restore(this.scene.children[2].children, this.oldChildren)
      // 获取 raycaster 和所有模型相交的数组，其中的元素按照距离排序，越近的越靠前
      let intersects = this.getIntersects(event)
      // 获取选中最近的 Mesh 对象
      if (intersects.length != 0 && intersects[0].object instanceof THREE.Mesh) {
        let selectObject = intersects[0].object;
        this.showObject(selectObject, event);
      }
    },
    restore (arrsNew, arrsOld) {
      for (let i = 0; i < arrsNew.length; i++) {
        for (let j = 0; j < arrsOld.length; j++) {
          if (arrsNew[i].name === arrsOld[j].name) {
            arrsNew[i].material = arrsOld[j].material
            break
          }
        }
      }
    },

    /**
     * 展示点击内容
     */
    showObject (obj, event) {
      console.log(obj)
      let key = obj.name
      let objs = this.cabinetData.filter(item => {
        return item.code === key
      })
      // 显示内容，高亮
      if (objs.length > 0) {
        let oldOneMaterial = this.oldChildren.filter(item => item.name === key)[0]
        obj.material = new THREE.MeshPhongMaterial({
          color: 0xff0000,
          map: oldOneMaterial.material.map
        });

        this.texts = objs[0]
        // 处理坐标
        this.dragTop = event.clientY - 50
        this.dragLeft = event.clientX - 100
      }
    },
    /**
     * 将屏幕坐标转换为3d 坐标
     */
    getIntersects (event) {
      event.preventDefault();
      var raycaster = new THREE.Raycaster();
      var mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, this.camera);
      var intersects = raycaster.intersectObjects(this.scene.children, true);
      return intersects;
    },

    threeStart () {
      this.initThree()
      this.initCamera()
      this.initScene()
      this.initLight()
      this.initObject()
      this.initControls()
      this.animation()
    }
  }

}
</script>
 
<style lang='less' scoped>
#threes {
  width: 100%;
  height: 100%;
  position: relative;

  .text {
    position: absolute;
    font-size: 40px;
    color: #47fff8;
    left: 40px;
    bottom: 60px;
    cursor: pointer;
    animation: glow-animation 2s linear infinite alternate;
  }
  .moveText {
    position: absolute;
    padding: 10px;
    background: rgba(154, 200, 225, 0.3);

    p {
      font-size: 20px;
      text-align: left;
      color: #fff;
    }
  }

  @keyframes glow-animation {
    0% {
      font-size: 40px;
    }
    50% {
      font-size: 42px;
    }
    100% {
      font-size: 44px;
    }
  }
}
</style>