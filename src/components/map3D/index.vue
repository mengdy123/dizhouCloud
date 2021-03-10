<!--suppress ALL -->
<template>
  <div id="container">
  </div>
</template>
<script>
import * as THREE from 'three'
import { OBJLoader, MTLLoader } from 'three-obj-mtl-loader'
// import MTLLoader from  'three-mtl-loader';
// import OBJLoader from  'three-obj-loader';
import { CSS2DRenderer, CSS2DObject } from 'three-css2drender'

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
      cube: '',
      fov: 60,
      biaozhudiv: '',
      img: '',
      biaozhuLabel: '',
      selectObject: null,
    }
  },
  mounted () {
    this.init()
    this.addObj()
    this.animate()
    window.addEventListener('click', this.onMouseClick, false);
  },
  // destroyed(){
  //   console.log("实例已经被销毁");
  // },
  methods: {
    init () {
      this.scene = new THREE.Scene()
      this.scene.add(new THREE.AmbientLight(0x999999))// 环境光
      this.light = new THREE.DirectionalLight(0xdfebff, 0.45)// 从正上方（不是位置）照射过来的平行光，0.45的强度
      this.light.position.set(50, 200, 100)
      this.light.position.multiplyScalar(0.3)
      this.scene.add(this.light)
      // 初始化相机
      this.camera = new THREE.PerspectiveCamera(this.fov, window.innerWidth / window.innerHeight, 1, 1000)
      this.camera.position.set(-45, 90, 120)
      this.camera.lookAt(this.scene.position)
      // 初始化控制器
      this.controls = new OrbitControls(this.camera)
      this.controls.target.set(0, 0, 0)
      this.controls.minDistance = 10
      this.controls.maxDistance = 400
      this.controls.maxPolarAngle = Math.PI / 3
      this.controls.update()
      // 渲染
      this.renderer = new THREE.WebGLRenderer({
        alpha: true
      })// 会在body里面生成一个canvas标签,
      this.renderer.setPixelRatio(window.devicePixelRatio)// 为了兼容高清屏幕
      this.renderer.setSize(window.innerWidth, window.innerHeight)

      const container = document.getElementById('container')
      container.appendChild(this.renderer.domElement)
      // 标注渲染
      this.labelRenderer = new CSS2DRenderer()
      this.labelRenderer.setSize(window.innerWidth, window.innerHeight)
      this.labelRenderer.domElement.style.position = 'absolute'
      this.labelRenderer.domElement.style.top = 0
      container.appendChild(this.labelRenderer.domElement)
      window.addEventListener('resize', this.onWindowResize, false)// 添加窗口监听事件（resize-onresize即窗口或框架被重新调整大小）
    },
    onWindowResize () {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.labelRenderer.setSize(window.innerWidth, window.innerHeight)
    },
    animate () {
      requestAnimationFrame(this.animate)
      this.render()
    },
    // render 执行渲染操作   指定场景、相机作为参数
    render () {
      this.renderer.render(this.scene, this.camera)
      this.labelRenderer.render(this.scene, this.camera)
    },
    addObj () {
      // 包含材质
      new MTLLoader().setPath('/static/dz-model/modelFirst/').load('1.mtl', materials => {
        materials.preload();
        new OBJLoader().setMaterials(materials).setPath('/static/dz-model/modelFirst/').load('1.obj', obj => {
          obj.scale.set(0.8, 0.8, 0.8);
          obj.position.set(0, -50, 10);
          // this.addSprite(-165, -55, -170, '/static/image/vans.png', -58, 'VANS', obj, () => {
          //   this.viewDetailModel();
          // });
          // this.viewDetailModel();
          this.scene.add(obj)
        })
      });
      // 路灯1
      new MTLLoader().setPath('/static/dz-model/modelFirst/').load('light.mtl', materials => {
        console.log('materials', materials)
        materials.preload()
        new OBJLoader().setMaterials(materials).setPath('/static/dz-model/modelFirst/').load('light.obj', obj => {
          obj.scale.set(0.1, 0.1, 0.1)
          obj.position.set(0, -50, -10)
          this.addSprite(-165, -55, -170, '/static/image/vans.png', -58, '', obj, () => {
            this.viewDetailModel();
          });
          this.scene.add(obj)
        })
      })
      // new MTLLoader().setPath('/static/model/VANS/').load('VANS.mtl', materials => {
      //   materials.preload();
      //   new OBJLoader().setMaterials(materials).setPath('/static/model/VANS/').load('VANS.obj', obj => {
      //     obj.scale.set(0.8, 0.8, 0.8);
      //     obj.position.set(-40, -50, 10);
      //     this.addSprite(-165, -55, -170, '/static/image/vans.png', -58, 'VANS', obj, () => {
      //       this.viewDetailModel();
      //     });
      //     this.scene.add(obj)
      //   })
      // });
      // new MTLLoader().setPath('/static/model/LEVIS/').load('LEVIS.mtl', materials => {
      //   materials.preload();
      //   new OBJLoader().setMaterials(materials).setPath('/static/model/LEVIS/').load('LEVIS.obj', obj => {
      //     obj.scale.set(0.8, 0.8, 0.8);
      //     obj.position.set(-40, -50, 10);
      //     this.addSprite(-170, -40, -100, '/static/image/television.png', -64, 'LEVIS', obj, function () {

      //     });
      //     this.addSprite(-170, -35, -120, '/static/image/jac.png', -100, 'KORADIOP', obj, function () {

      //     });
      //     this.addSprite(-170, -40, -140, '/static/image/clo.png', -47, '天意', obj, function () {

      //     });
      //     this.scene.add(obj)
      //   })
      // });
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
    // 传感器详情界面
    alarmDetail () {
      this.$router.push('alarmPage')
      console.log('跳转到传感器详情界面')
    },
    // 点击模块查看信息的3D界面
    viewDetailModel () {
      console.log('清除场景')
    },
    onMouseClick (event) {
      console.log('event', event)
      // 获取 raycaster 和所有模型相交的数组，其中的元素按照距离排序，越近的越靠前
      let intersects = this.getIntersects(event);
      console.log('intersects1111', intersects)
      // 获取选中最近的 Mesh 对象
      if (intersects.length != 0 && intersects[0].object instanceof THREE.Mesh) {
        console.log('intersects', intersects)
        this.selectObject = intersects[0].object;
        this.changeMaterial(this.selectObject);
      } else {
        console.log("未选中 Mesh!");
      }
    },
    // 改变对象材质属性
    changeMaterial (object) {

      var material = new THREE.MeshLambertMaterial({
        color: 0xffffff * Math.random(),
        transparent: object.material.transparent ? false : true,
        opacity: 0.8
      });
      object.material = material;
    },
    // 获取与射线相交的对象数组
    getIntersects (event) {
      event.preventDefault();
      console.log("event.clientX:" + event.clientX)
      console.log("event.clientY:" + event.clientY)
      // 声明 raycaster 和 mouse 变量
      let raycaster = new THREE.Raycaster();
      let mouse = new THREE.Vector2();

      // 通过鼠标点击位置,计算出 raycaster 所需点的位置,以屏幕为中心点,范围 -1 到 1
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      //通过鼠标点击的位置(二维坐标)和当前相机的矩阵计算出射线位置
      raycaster.setFromCamera(mouse, this.camera);

      // 获取与射线相交的对象数组，其中的元素按照距离排序，越近的越靠前
      let intersects = raycaster.intersectObjects(this.scene.children);
      console.log('this.scene', this.scene)

      //返回选中的对象
      return intersects;
    }
  }
}
</script>

<style scoped>
#container {
  background: #214168;
}
</style>
