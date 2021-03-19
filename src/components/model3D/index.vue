<!--suppress ALL -->
<template>
  <div id="container">
    <div class="detail-box"
         ref="detailBox"
         :style="boxStyle"
         v-if="showDetailBox">
      <borderBox :infoData='infoData'
                 :editableTabs='editableTabs'
                 @closeBox='changeBorderBoxStatus'
                 @saveTabsTitle='saveTabsTitle'></borderBox>
    </div>
  </div>
</template>
<script>
import * as THREE from 'three'
import { OBJLoader, MTLLoader } from 'three-obj-mtl-loader'
import { CSS2DRenderer, CSS2DObject } from 'three-css2drender'
import borderBox from '@/components/infoBox/borderBox.vue'
// 声明 raycaster 和 mouse 变量
let raycaster = new THREE.Raycaster(); //射线
let mouse = new THREE.Vector2()//鼠标位置
const objLoader = new OBJLoader()
const mtlLoade = new MTLLoader()
const OrbitControls = require('three-orbit-controls')(THREE)
export default {
  name: 'threeMap',
  components: { borderBox },
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
      oldChildren: [],
      infoData: {},
      infoData2: {
        operation: [
          {
            label: '编号',
            value: '544893',
            url: require('../../assets/icon/ecs-running.png')
          },
          {
            label: '类型',
            value: '交通',
            url: require('../../assets/icon/ecs-running.png')
          },
          {
            label: '名称',
            value: '立柱3号',
            url: require('../../assets/icon/ecs-running.png')
          },
          {
            label: '型号LZ7889',
            value: '低',
            url: require('../../assets/icon/ecs-running.png')
          },
          {
            label: '安装位置',
            value: '姚北路延展路交叉口东500米',
            url: require('../../assets/icon/ecs-running.png')
          },
          {
            label: '现场图片',
            value: '1215.jpg',
            url: require('../../assets/icon/ecs-running.png')
          }
        ],
        secondList: [
          {
            name: '基本数据',
            type: 'operation'
          },
          {
            name: '设备参数',
            type: 'equipment'
          },
          {
            name: '3D动画',
            type: 'animate'
          }
        ],
        equipment: [
          {
            label: '工作电压',
            value: '15V',
            url: require('../../assets/icon/ecs-running.png')
          },
          {
            label: '工作功率',
            value: '120W',
            url: require('../../assets/icon/ecs-running.png')
          },
          {
            label: '防水防尘等级',
            value: '5',
            url: require('../../assets/icon/ecs-running.png')
          },
          {
            label: '工作温度范围',
            value: '-20~40℃',
            url: require('../../assets/icon/ecs-running.png')
          },
          {
            label: '外观',
            value: '白色',
            url: require('../../assets/icon/ecs-running.png')
          },
          {
            label: '尺寸',
            value: '45cm*45cm',
            url: require('../../assets/icon/ecs-running.png')
          },
        ],
        animate: []
      },
      infoData3: {
        secondList: [
          {
            name: '基本数据',
            type: 'table'
          }
        ],
        table: [
          {
            label: '编号',
            value: '544893',
            url: require('../../assets/icon/ecs-running.png')
          },
          {
            label: '类型',
            value: '交通',
            url: require('../../assets/icon/ecs-running.png')
          },
          {
            label: '名称',
            value: '立柱3号',
            url: require('../../assets/icon/ecs-running.png')
          },
          {
            label: '型号LZ7889',
            value: '低',
            url: require('../../assets/icon/ecs-running.png')
          },
          {
            label: '安装位置',
            value: '姚北路延展路交叉口东500米',
            url: require('../../assets/icon/ecs-running.png')
          },
          {
            label: '现场图片',
            value: '1215.jpg',
            url: require('../../assets/icon/ecs-running.png')
          }
        ],
      },
      infoData4: {
        operation: [
          {
            label: '状态',
            value: '运行中',
            url: require('../../assets/icon/ecs-running.png')
          },
          {
            label: '运行信息',
            value: '正常运行',
            url: require('../../assets/icon/ecs-running.png')
          },
          {
            label: '通讯信号',
            value: '强',
            url: require('../../assets/icon/ecs-running.png')
          },
          {
            label: '电池电量',
            value: '低',
            url: require('../../assets/icon/ecs-running.png')
          },
          {
            label: '水位监测',
            value: '正常',
            url: require('../../assets/icon/ecs-running.png')
          },
          {
            label: '温湿度',
            value: '18℃ 20%',
            url: require('../../assets/icon/ecs-running.png')
          },
          {
            label: '电控锁',
            value: '开启',
            url: require('../../assets/icon/ecs-running.png')
          },
          {
            label: '有毒气体',
            value: '正常',
            url: require('../../assets/icon/ecs-running.png')
          },
          {
            label: '太阳能发电量',
            value: '26度',
            url: require('../../assets/icon/ecs-running.png')
          },

        ],
        secondList: [
          {
            name: '基本数据',
            type: 'operation'
          },
          {
            name: '设备参数',
            type: 'equipment'
          },
          {
            name: '3D动画',
            type: 'animate'
          }
        ],
        equipment: [
          {
            label: '硬件编号',
            value: 'NO.123456',
            url: require('../../assets/icon/bianhao.png')
          },
          {
            label: '地理信息',
            value: '121.125897  39.2356',
            url: require('../../assets/icon/ecs-running.png')
          },
          {
            label: '安装位置',
            value: '上海市松江区方松街道嘉松南路332号九号商业广场',
            url: require('../../assets/icon/mingcheng.png')
          },
          {
            label: '工作电压',
            value: 'DC9V',
            url: require('../../assets/icon/IOTtubiao_huabanfuben.png')
          },
          {
            label: '工作功率',
            value: '220W',
            url: require('../../assets/icon/shebeidianya.png')
          },
          {
            label: '工作温度',
            value: '-20~90 ℃',
            url: require('../../assets/icon/shuiwei.png')
          },
        ],
        animate: []
      },
      infoData1: {
        secondList: [
          {
            name: '人/车流量',
            type: 'flow'
          },
          {
            name: '实时监控',
            type: 'video'
          },
          {
            name: '屏幕显示',
            type: 'screen'
          },
          {
            name: '传感器数据',
            type: 'sensor'
          }
        ],
        sensor: [

        ],
        flow: {
          type: 'barChart',
          title: ['人流量', '车流量'],
          xAxisData: ['07:00', '07:15', , '07:30', '07:45', '08:00', '08:15', '08:30', '08:45', '09:00', '09:15'],
          yAxisData: [
            [180, 170, 160, 150, 140, 130, 120, 110, 100, 90],
            [90, 80, 76, 70, 66, 60, 55, 50, 40, 30]
          ]
        },
        video: [''],
        screen: [
          {
            label: '屏幕提示语',
            value: '您已闯红灯，请退回安全线内等候',
            url: require('../../assets/icon/ecs-running.png')
          },
          {
            label: '屏幕宣传视频',
            url: require('../../assets/icon/ecs-running.png')
          }
        ],
        sensor: [
          {
            label: '温/湿度',
            value: '20℃/30%',
            url: require('../../assets/icon/ecs-running.png')
          },
          {
            label: '噪音',
            value: '45db',
            url: require('../../assets/icon/ecs-running.png')
          },
          {
            label: 'PM2.5',
            value: '12',
            url: require('../../assets/icon/ecs-running.png')
          },
          {
            label: 'PM10',
            value: '0.2',
            url: require('../../assets/icon/ecs-running.png')
          },
          {
            label: 'SO2',
            value: '12',
            url: require('../../assets/icon/ecs-running.png')
          },
          {
            label: 'NOx',
            value: '1',
            url: require('../../assets/icon/ecs-running.png')
          },
          {
            label: 'O3',
            value: '0.3',
            url: require('../../assets/icon/ecs-running.png')
          },
        ],
      },
      tabsTitle: null,
      editableTabs: {
        showTabs: true,
        showParameterSetButton: true,
        data: [
          {
            title: '运营数据',
            name: '0',
            content: 'Tab 1 content',
          },
          {
            title: '硬件信息',
            name: '1',
            content: 'Tab 2 content'
          },
          {
            title: '报警信息',
            name: '2',
            content: 'Tab 3 content'
          }
        ]
      },
    }
  },
  mounted () {
    this.init()
    this.addObj()
    this.animate()
    this.selectedObject = null
    window.addEventListener('click', this.onMouseClick, false);
    this.infoData = this.infoData1
  },

  methods: {
    changeBorderBoxStatus (val) {
      this.showDetailBox = val
    },
    saveTabsTitle (name) {
      this.tabsTitle = name
      // this.infoData = this.infoData
      console.log('this.tabsTitle', this.tabsTitle)
      if (this.tabsTitle == '0') {
        this.infoData = this.infoData1
      } else if (this.tabsTitle == '1') {
        this.infoData = this.infoData2
      } else if (this.tabsTitle == '2') {
        this.infoData = this.infoData3
      }
    },
    empty (elem) {
      while (elem.lastChild) {
        elem.removeChild(elem.lastChild)
      }
    },
    init () {
      this.scene = new THREE.Scene()
      this.scene.background = new THREE.Color(0x121b31);
      this.scene.add(new THREE.AmbientLight(0x999999))// 环境光
      this.light = new THREE.DirectionalLight(0xdfebff, 0.45)// 从正上方（不是位置）照射过来的平行光，0.45的强度
      this.light.position.set(150, 250, 200)
      this.light.position.multiplyScalar(0.3)
      this.scene.add(this.light)
      // 初始化相机 
      // 构造函数格式
      // OrthographicCamera( left, right, top, bottom, near, far )  正投影
      // this.camera = new THREE.PerspectiveCamera(this.fov, window.innerWidth / window.innerHeight, 0.1, 1000)
      let width = window.innerWidth; //窗口宽度
      let height = window.innerHeight; //窗口高度
      let k = width / height; //窗口宽高比
      let s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
      //创建相机对象
      this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 0.1, 1000);
      // this.camera.position.set(90, 90, 120)
      this.camera.position.set(50, 0, 600)
      this.camera.lookAt(this.scene.position)

      // let grid3 = new THREE.GridHelper(400, 20);
      // grid3.rotation.y = Math.PI / 3;
      // this.scene.add(grid3)
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
      this.labelRenderer = new CSS2DRenderer()
      this.labelRenderer.setSize(window.innerWidth, window.innerHeight)
      this.labelRenderer.domElement.style.position = 'absolute'
      this.labelRenderer.domElement.style.top = 0
      container.appendChild(this.labelRenderer.domElement)
      // window.addEventListener('resize', this.onWindowResize, false)// 添加窗口监听事件（resize-onresize即窗口或框架被重新调整大小）
      // this.renderer.domElement.addEventListener('click', this.onMouseClick, false);
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
      this.labelRenderer.render(this.scene, this.camera)
    },
    stop () {
      window.cancelAnimationFrame(this.requestId);
    },
    addSvg (obj) {
      this.addSprite(-230, -40, 20, '/static/dz-model/modelFirst/well_1.svg', -70, 'SKECH', obj, function () {
      });
    },
    cloneModel (obj, x, y, z, s1, s2, s3, name) { //params: 模型， 坐标xyz，自定义数据
      const cloneObj = obj.clone();
      if (name != 'light1') {
        cloneObj.children.map((v, i) => { //克隆材质
          if (v.material) {
            v.material = obj.children[i].material.clone();
          }
        });
      } else {
        // this.addSprite(-600, -20, -1000, '/static/dz-model/modelFirst/well.png', 8, '', obj, () => {
        //   // this.viewDetailModel();
        //   console.log('123456')
        // });
      }
      cloneObj.scale.set(s1, s2, s3)
      cloneObj.$data = {
        name: name,
        id: 2
      }
      cloneObj.name = name
      cloneObj.children.map(item => {
        item.name = name
      })
      // console.log('cloneObj', cloneObj)
      // console.log('obj', obj)
      this.dealMeshMaterial(cloneObj.children)
      cloneObj.position.set(x, y, z);
      this.scene.add(cloneObj);
      /**增加文字标签 */
      // const sprite = this.createSprite(cloneObj.$data);
      // sprite.position.set(x, y + 2, z);
      // this.scene.add(sprite);
    },
    addObj () {
      // 场景
      // mtlLoade.setPath('/static/dz-model/modelFirst/').load('scene.mtl', materials => {
      //   materials.preload()
      //   objLoader.setMaterials(materials).setPath('/static/dz-model/modelFirst/').load('scene.obj', obj => {
      //     // obj.scale.set(0.004, 0.004, 0.004)
      //     obj.scale.set(0.004, 0.004, 0.004)
      //     obj.position.set(-2000, -150, 0)
      //     this.oldChildren = this.dealMeshMaterial(obj.children)
      //     this.scene.add(obj)
      //   })
      // })
      // 红外线感应柱
      mtlLoade.setPath('/static/dz-model/modelFirst/').load('stand_column.mtl', materials => {
        materials.preload()
        objLoader.setMaterials(materials).setPath('/static/dz-model/modelFirst/').load('stand_column.obj', obj => {
          this.cloneModel(obj, -140, -20, 0, 0.2, 0.5, 0.2, 'redBar_1')
          this.cloneModel(obj, 100, -20, 20, 0.2, 0.5, 0.2, 'redBar_2')
          this.cloneModel(obj, -150, -20, -268, 0.2, 0.5, 0.2, 'redBar_3')
          this.cloneModel(obj, 90, -20, -260, 0.2, 0.5, 0.2, 'redBar_4')
        })
      })
      // 路灯
      mtlLoade.setPath('/static/dz-model/modelFirst/').load('light.mtl', materials => {
        materials.preload()
        objLoader.setMaterials(materials).setPath('/static/dz-model/modelFirst/').load('light.obj', obj => {
          // obj.scale.set(0.15, 0.2, 0.15)
          // obj.position.set(140, -20, 0)
          // obj.name = 'light3'
          // obj.children.map(item => {
          //   item.name = 'light3'
          // })

          this.cloneModel(obj, 140, -20, 0, 0.15, 0.2, 0.15, 'light1')

          // this.dealMeshMaterial(obj.children)
          // this.scene.add(obj)

        })
      })
      // 斑马线
      mtlLoade.setPath('/static/dz-model/modelFirst/').load('zebra6.mtl', materials => {
        materials.preload();
        objLoader.setMaterials(materials).setPath('/static/dz-model/modelFirst/').load('zebra6.obj', obj => {
          this.cloneModel(obj, -120, -20, 0, 0.05, 0.05, 0.05, 'zebra1')
          this.cloneModel(obj, -120, -20, -260, 0.05, 0.05, 0.05, 'zebra2')
        })
      });
      // 斑马线
      mtlLoade.setPath('/static/dz-model/modelFirst/').load('zebra3.mtl', materials => {
        materials.preload();
        objLoader.setMaterials(materials).setPath('/static/dz-model/modelFirst/').load('zebra3.obj', obj => {
          this.cloneModel(obj, -160, -20, -60, 0.05, 0.1, 0.12, 'zebra3')
          this.cloneModel(obj, 80, -26, -60, 0.05, 0.1, 0.12, 'zebra4')
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
      this.img.style.width = '20px'
      this.img.style.height = '20px'
      // this.img.style.marginLeft = loc + 'px'
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
    onMouseClick (event) {
      event.preventDefault();
      // console.log('event', event)
      console.log('this.scene1', this.scene)
      if (this.selectedObject) {
        console.log('this.selectedObject', this.selectedObject)
        this.selectedObject = null;
        // this.selectedObject.material.color.set('#35e9ff');
      }
      // 获取与射线相交的对象数组，其中的元素按照距离排序，越近的越靠前
      let intersects = this.getIntersects(event.clientX, event.clientY);
      console.log('intersects---选中的模型', intersects)
      //将所有的相交的模型的颜色设置为红色
      if (intersects.length > 0 && this.selectedObject != intersects[0].object) {
        this.selectedObject = intersects[0].object
        // console.log('this.selectObject000', this.selectedObject)
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
      return raycaster.intersectObjects(this.scene.children, true);
    },
    showObject (obj, event) {
      let key = obj.name
      // console.log('key', key)
      // console.log('this.oldChildren', this.oldChildren)
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
    console.log("实例已经被销毁-beforeDestroy");
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
  /* background: #121b31; */
  position: relative;
}
.detail-box {
  width: 500px;
  height: 300px;
  background: rgba(red, green, blue, 0.1);
  position: fixed;
  z-index: 99999999;
  /* border: 1px solid #124859; */
}
</style>
