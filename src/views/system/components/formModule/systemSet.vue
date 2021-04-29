<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: mandy
 * @Date: 2021-03-24 09:18:12
 * @LastEditors: mandy
 * @LastEditTime: 2021-04-28 09:50:36
-->
<template>
  <div class="form-module">
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="系统类型"
                    prop="systemTypeId">
        <el-select v-model="ruleForm.systemTypeId"
                   placeholder="请选择系统类型">
          <el-option v-for="item in systemList"
                     :label="item.systemTypeName"
                     :key="item.systemTypeId"
                     :value="item.systemTypeId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="系统配置"
                    prop="systemSet">
        <el-cascader :props="props"
                     style="width: 322px"
                     clearable
                     ref="systemTree"
                     @change='changeSystemSet'></el-cascader>
      </el-form-item>
    </el-form>
    <div class="form-footer">
      <el-button type="primary"
                 @click="submitForm">确 定</el-button>
      <el-button @click="handleClose">取 消</el-button>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import systemMirror from '@/resource/systemMirror'
export default {
  props: {
    detailInfo: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      ruleForm: {
      },
      rules: {
        systemTypeId: [
          { required: true, message: '请选择系统名称', trigger: 'change' },
        ],
        systemSet: [
          { required: true, message: '请选择系统配置', trigger: 'change' },
        ],
      },
      props: {
        lazy: true,
        multiple: true,
        checkStrictly: true,
        lazyLoad (node, resolve) {
          // console.log('node', node)
          // console.log('resolve', resolve)
          const { level } = node;
          let id = null
          id = node.value || null
          if (node.level == 0) {
            // console.log('加载系统类型列表')
            let params = {
              currentPage: 1,
              pageSize: 10000,
            }
            systemMirror.getListByDevice(params).then(res => {
              let { code, result, serviceMessage } = res.data
              if (code === 200) {
                let listNew = []
                let list = []
                // console.log('获取设备类型111', result.content)
                list = result.content
                if (list.length) {
                  list.forEach(item => {
                    listNew.push({
                      value: item.deviceTypeId,
                      label: item.deviceTypeName,
                      num: item.deviceTypeNumber
                    })
                  });
                }
                setTimeout(() => {
                  console.log('listNew111', listNew)
                  // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                  resolve(listNew);
                }, 500);
              }
            })
          } else if (node.level === 1) {
            console.log('加载第二列表')
            let params2 = {
              deviceTypeId: id,
              currentPage: 1,
              pageSize: 10000,
            }
            console.log('params2', params2)
            systemMirror.getListBySeries(params2).then(res => {
              let { code, result, serviceMessage } = res.data
              if (code === 200) {
                console.log('获取设备系列列表', result.content)
                let listNew = []
                let list = []
                // console.log('获取设备类型111', result.content)
                list = result.content
                if (list.length) {
                  list.forEach(item => {
                    listNew.push({
                      value: item.seriesId,
                      label: item.seriesName,
                      num: item.deviceNumber
                    })
                  });
                }
                setTimeout(() => {
                  console.log('listNew222', listNew)
                  // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                  resolve(listNew);
                }, 500);
              }
            })

          } else if (node.level === 2) {
            console.log('加载系统型号列表')
            node.hasChildren = false
            let params = {
              seriesId: id,
              currentPage: 1,
              pageSize: 10000,
            }
            systemMirror.getListByVer(params).then(res => {
              let { code, result, serviceMessage } = res.data
              if (code === 200) {
                let listNew = []
                let list = []
                // console.log('获取设备型号333', result.content)
                list = result.content
                if (list.length) {
                  list.forEach(item => {
                    listNew.push({
                      value: item.versiontypeId,
                      label: item.versiontypeName,
                      num: item.deviceNumber
                    })
                  });
                }
                setTimeout(() => {
                  console.log('listNew333', listNew)
                  resolve(listNew);
                }, 500);
              }
            })
          } else {

            return false
          }

        }
      },
      systemList: []
    };
  },
  mounted () {
    this.getSystemData()
  },
  methods: {
    ...mapActions(['saveDetailInfo', 'saveDeviceTypeList']),
    submitForm () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.addSystem()
        } else {
          console.log('error submit!!');
          return false
        }
      });
    },
    // 选择系统配置
    changeSystemSet (val) {
      if (val && val.length) {
        this.ruleForm.systemSet = val[0][val.length - 1]
      }
      console.log('点击选择系统配置---systemSet', val)
    },
    handleClose () {
      this.$refs['ruleForm'].resetFields();
      this.$emit('changeProjectBox', false)
      this.saveDetailInfo({})
    },
    // 获取智能系统列表
    getSystemData () {
      let params = {
        seek: '',
        currentPage: 1,
        pageSize: 100000,
      }
      systemMirror.getSystemTypeList(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.systemList = result.content
        }
      })
    },
    addSystem () {
      let list = this.$refs.systemTree.getCheckedNodes()
      let deviceList = []
      let seriesList = []
      let versionList = []
      if (list.length) {
        list.forEach(item => {
          if (item.level === 1) {
            deviceList.push(item.value)
          } else if (item.level === 2) {
            seriesList.push(item.value)
          } else if (item.level === 3) {
            versionList.push(item.value)
          }
        })
      }
      let params = {
        systemTypeId: this.ruleForm.systemTypeId,
        projectId: this.detailInfo.projectId,
        deviceList: deviceList,
        seriesList: seriesList,
        versionList: versionList,
      }
      systemMirror.addProjectRelation(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.$emit('changeProjectBox', false)
          this.$emit('getList')
          this.$message.success(serviceMessage)
        }
      })
    }
  }
}
</script>