<!--suppress ALL -->
<template>
  <div id="container">
    <div class="detail-box"
         ref="detailBox"
         :style="boxStyle"
         v-if="showDetailBox"></div>
  </div>
</template>
<script>
import * as THREE from 'three'
import { OBJLoader, MTLLoader } from 'three-obj-mtl-loader'
import { CSS2DRenderer, CSS2DObject } from 'three-css2drender'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 声明 raycaster 和 mouse 变量
let raycaster = new THREE.Raycaster(); //射线
let mouse = new THREE.Vector2()//鼠标位置
let hit = new THREE.Vector3(); //射线在参考面上的拾取点
const objLoader = new OBJLoader()
const mtlLoade = new MTLLoader()
const OrbitControls = require('three-orbit-controls')(THREE)
export default {
  name: 'threeMap',
  data () {
    return {
      scene: '',
      labelRenderer: '',
      light: '',
      camera: '',
      controls: '',
      renderer: '',
      geometry: '',
      material: '',
      fov: 45,
      biaozhudiv: '',
      img: '',
      biaozhuLabel: '',
      requestId: null,
      group: null,
      selectedObject: null,
      showDetailBox: false,
      boxStyle: {
        left: 0,
        right: 0
      },
      oldChildren: []
    }
  },
  mounted () {
    this.selectedObject = null
    this.init()
    this.addObj()
    this.animate()
    // window.addEventListener('click', this.onMouseClick, false);
  },

  methods: {
    empty (elem) {
      while (elem.lastChild) {
        elem.removeChild(elem.lastChild)
      }
    },
    init () {
      this.scene = new THREE.Scene()
      this.scene.add(new THREE.AmbientLight(0x999999))// 环境光
      this.light = new THREE.DirectionalLight(0xdfebff, 0.45)// 从正上方（不是位置）照射过来的平行光，0.45的强度
      this.light.position.set(50, 200, 100)
      this.light.position.multiplyScalar(0.3)
      this.scene.add(this.light)
      // 初始化相机
      this.camera = new THREE.PerspectiveCamera(this.fov, window.innerWidth / window.innerHeight, 0.1, 1000)
      this.camera.position.set(90, 90, 120)
      // this.camera.position.z = 5;
      this.camera.lookAt(this.scene.position)

      this.group = new THREE.Group();
      this.scene.add(this.group)


      // 初始化控制器
      this.controls = new OrbitControls(this.camera)
      this.controls.target.set(0, 0, 0)
      this.controls.minDistance = 10
      this.controls.maxDistance = 2400
      this.controls.maxPolarAngle = Math.PI / 3
      this.controls.update()
      // 渲染
      this.renderer = new THREE.WebGLRenderer({
        alpha: true // 开启抗锯齿，加载熟速度会变慢
      })// 会在body里面生成一个canvas标签,
      this.renderer.setPixelRatio(window.devicePixelRatio)// 为了兼容高清屏幕
      this.renderer.setSize(window.innerWidth, window.innerHeight)

      const container = document.getElementById('container')
      container.appendChild(this.renderer.domElement)
      // 标注渲染
      // this.labelRenderer = new CSS2DRenderer()
      // this.labelRenderer.setSize(window.innerWidth, window.innerHeight)
      // this.labelRenderer.domElement.style.position = 'absolute'
      // this.labelRenderer.domElement.style.top = 0
      // container.appendChild(this.labelRenderer.domElement)
      // window.addEventListener('resize', this.onWindowResize, false)// 添加窗口监听事件（resize-onresize即窗口或框架被重新调整大小）
      this.renderer.domElement.addEventListener('click', this.onMouseClick, false);
      window.addEventListener('resize', this.onWindowResize, false);
    },
    onWindowResize () {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      // this.labelRenderer.setSize(window.innerWidth, window.innerHeight)
    },
    animate () {
      this.requestId = requestAnimationFrame(this.animate.bind(this));
      // requestAnimationFrame(this.animate)
      this.render()
      if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function () {
          clearTimeout(this.requestId);
        };
      }
    },
    // render 执行渲染操作   指定场景、相机作为参数
    render () {
      this.renderer.render(this.scene, this.camera)
      // this.labelRenderer.render(this.scene, this.camera)
    },
    stop () {
      window.cancelAnimationFrame(this.requestId);
    },
    addObj () {
      // 场景
      // mtlLoade.setPath('/static/dz-model/modelFirst/').load('scene.mtl', materials => {
      //   materials.preload()
      //   objLoader.setMaterials(materials).setPath('/static/dz-model/modelFirst/').load('scene.obj', obj => {
      //     obj.scale.set(0.004, 0.004, 0.004)
      //     obj.position.set(-2000, -150, 0)
      // this.oldChildren = this.dealMeshMaterial(obj.children)
      //     this.scene.add(obj)
      //   })
      // })
      // 路灯1
      mtlLoade.setPath('/static/dz-model/modelFirst/').load('light.mtl', materials => {
        materials.preload()
        objLoader.setMaterials(materials).setPath('/static/dz-model/modelFirst/').load('light.obj', obj => {
          // console.log('obj---222', obj)
          console.log('obj---children', obj.children)
          obj.scale.set(0.025, 0.025, 0.025)
          obj.position.set(-100, -40, -10)
          obj.name = 'light1'
          obj.children.map(item => {
            item.name = 'light1'

          })
          this.dealMeshMaterial(obj.children)
          this.scene.add(obj)
          this.group.add(obj)
        })
      })
      // 路灯2
      mtlLoade.setPath('/static/dz-model/modelFirst/').load('light.mtl', materials => {
        materials.preload()
        objLoader.setMaterials(materials).setPath('/static/dz-model/modelFirst/').load('light.obj', obj => {
          obj.scale.set(0.025, 0.025, 0.025)
          obj.position.set(10, -45, -12)
          obj.name = 'light2'
          obj.children.map(item => {
            item.name = 'light2'
          })
          this.dealMeshMaterial(obj.children)
          this.scene.add(obj)
          this.group.add(obj)
        })
      })
      // 斑马线1
      mtlLoade.setPath('/static/dz-model/modelFirst/').load('zebra1.mtl', materials => {
        materials.preload();
        objLoader.setMaterials(materials).setPath('/static/dz-model/modelFirst/').load('zebra1.obj', obj => {
          obj.scale.set(0.08, 0.08, 0.04);
          obj.position.set(-90, -40, 0);
          obj.name = 'zebra1'
          obj.children.map(item => {
            item.name = 'zebra1'
          })
          this.dealMeshMaterial(obj.children)
          this.scene.add(obj)
          this.group.add(obj)
        })
      });
    },
    /**
     * 留住每个模型的 原材质
     */
    dealMeshMaterial (arrs) {
      let result = []
      for (let i = 0; i < arrs.length; i++) {
        let obj = {
          'name': arrs[i].name,
          'material': arrs[i].material,
          'parent': arrs[i].parent,
        }
        result.push(obj)
      }
      return result
    },
    addSprite (x, y, z, image, loc, text, Mash, callback) {
      // 添加div标签
      this.biaozhudiv = document.createElement('div')
      // 添加图标标签
      this.img = document.createElement('img')
      this.img.src = image
      this.img.style.marginLeft = loc + 'px'
      this.biaozhudiv.className = 'lable'
      // 两者的执行顺序
      this.biaozhudiv.textContent = text
      this.biaozhudiv.appendChild(this.img)
      // 标注的样式
      this.biaozhudiv.id = 'biaozhu'
      this.biaozhudiv.style.color = 'rgb(' + 0 + ',' + 0 + ',' + 0 + ')'
      this.biaozhudiv.style.fontSize = 15 + 'px'
      this.biaozhudiv.style.fontFamily = 'Georgia,serif'
      this.biaozhudiv.style.cursor = 'pointer'
      this.biaozhudiv.onclick = function () {
        callback(Mash)
      }
      this.biaozhuLabel = new CSS2DObject(this.biaozhudiv)
      this.biaozhuLabel.position.set(x, y, z)
      Mash.add(this.biaozhuLabel)
    },
    // 点击模块查看信息的3D界面
    viewDetailModel () {
      console.log('清除场景')
    },
    onMouseClick (event) {
      event.preventDefault();
      console.log('event', event)
      console.log('this.scene', this.scene.children)
      console.log('this.group', this.group.children)
      if (this.selectedObject) {
        this.selectedObject.material.color.set('#69f');
        this.selectedObject = null;
      }
      // 获取与射线相交的对象数组，其中的元素按照距离排序，越近的越靠前
      let intersects = this.getIntersects(event.clientX, event.clientY);
      console.log('intersects---选中的模型', intersects)
      //将所有的相交的模型的颜色设置为红色
      if (intersects.length > 0 && this.selectedObject != intersects[0].object) {
        this.selectedObject = intersects[0].object
        console.log('this.selectObject000', this.selectedObject)
        this.showObject(this.selectedObject, event);
      } else {
        this.showDetailBox = false
      }

    },
    getIntersects (x, y) {
      // 处理坐标
      this.showDetailBox = true
      this.boxStyle.top = y - 350 + 'px'
      this.boxStyle.left = x - 200 + 'px'
      // 通过鼠标点击位置,计算出 raycaster 所需点的位置,以屏幕为中心点,范围 -1 到 1
      x = (x / window.innerWidth) * 2 - 1;
      y = - (y / window.innerHeight) * 2 + 1;
      mouse.set(x, y, 0.05);
      raycaster.setFromCamera(mouse, this.camera);
      return raycaster.intersectObjects(this.group.children, true);
    },
    showObject (obj, event) {
      let key = obj.name
      console.log('key', key)
      console.log('this.oldChildren', this.oldChildren)
      // 显示内容，高亮
      // let oldOneMaterial = this.oldChildren.filter(item => item.name === key)[0]
      // let nameNode = this.scene.getObjectByName(this.selectedObject.name);
      // this.selectedObject.material.color.set('#f00')
      // console.log('this.selectedObject', this.selectedObject)
      // nameNode.material.color.set('#f00');
      // console.log('oldOneMaterial', oldOneMaterial)
      // oldOneMaterial.parent.name
      // if (oldOneMaterial) {
      //   this.group.children.forEach(item => {
      //     if (item.name = oldOneMaterial.parent.name) {
      //       console.log('item', item)
      //       item.children.forEach(it => {
      //         it.material = new THREE.MeshPhongMaterial({
      //           color: '#f00',
      //           map: oldOneMaterial.material.map
      //         });
      //       })
      //     }
      //   });
      // }
      // if (oldOneMaterial) {
      //   obj.material = new THREE.MeshPhongMaterial({
      //     color: '#69f',
      //     map: oldOneMaterial.material.map
      //   });
      // }


    }
  },
  beforeDestroy () {
    window.cancelAnimationFrame(this.requestId)
    this.renderer = null
    this.scene = null
    this.camera = null
    this.controls = null
  },
  // destroyed () {
  //   console.log("实例已经被销毁");
  //   window.cancelAnimationFrame(this.requestId) //停止动画
  //   this.renderer.domElement.addEventListener('click', null, false); //删除侦听器来渲染
  //   this.scene = null;
  //   this.camera = null;
  //   this.controls = null;
  //   // this.empty(this.modelContainer);
  // },
}
</script>

<style scoped>
#container {
  width: 100%;
  height: 100%;
  background: #121b31;
  position: relative;
}
.detail-box {
  width: 500px;
  height: 300px;
  background: rgba(red, green, blue, 0.1);
  position: absolute;
  border: 1px solid #124859;
}
</style>
