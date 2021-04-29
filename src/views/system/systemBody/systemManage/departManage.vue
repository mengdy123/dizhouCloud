<template>
  <div class="dz-system">
    <div class="dz-system-title">部门管理</div>
    <div class="dz-system-tree">
      <div>
        <el-button type="primary"
                   @click="addOrganization">新增组织架构</el-button>
      </div>
      <div>
        <div class="tree-list"
             v-for="(item, index) in treeData"
             :key="index">
          <TreeChart :json="item"
                     :class="{landscape: isVertical}"
                     :isDetail="isDetail"
                     @add="addStock"
                     @delete="deleteStock" />
        </div>
      </div>

    </div>
    <addBox v-if="dialogVisible"
            name='部门管理'
            @getList='getDepartmentAll'
            @changeProjectBox='clearDialog'
            title='部门管理'>
      <slot slot='dialogMain'>
        <addDepartForm ref="addForm"
                       @getList='getDepartmentAll'
                       @changeProjectBox='clearDialog'></addDepartForm>
      </slot>
    </addBox>
  </div>
</template>
<script>
import addBox from '../../components/dialogModule/addDialogModule'
import systemManageMirror from '@/resource/systemManageMirror'
import treeDiv from '@/components/Tree'
import TreeChart from '@/components/Tree/treeData'
import { mapState, mapActions } from 'vuex'
import addDepartForm from '../../components/formModule/addDepartForm'

export default {
  components: { addBox, addDepartForm, treeDiv, TreeChart },
  data () {
    return {
      treeData: {},
      isVertical: false, // 是否是竖方向,只给最外层的添加
      isDetail: false, // 是否是详情,不可编辑操作
      dialogVisible: false, // 添加股东弹框
      ruleForm: {
        type: 1,
        name: "",
      },
      shareholderTypeOptions: [
        {
          labelEn: "organization",
          labelZh: "组织架构",
          value: 1
        },
        {
          labelEn: "depart",
          labelZh: "部门",
          value: 2
        },
        {
          labelEn: "duty",
          labelZh: "职务",
          value: 3
        }
      ], // 股东类型
      lastId: 11, // 最后一级id
      currentTreeData: {}
    }
  },
  mounted () {
    this.getDepartmentAll()
  },
  methods: {
    ...mapActions(['saveDetailInfo', 'changeEditStatus']),
    getDepartmentAll () {
      let params = {}
      systemManageMirror.getDepartmentAll(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.treeData = result
        }
      })
    },
    changeBoxStatus (status) {
      this.dialogVisible = status
    },
    // 新增编辑,val: 0 新增, 1 编辑
    addStock (data) {
      this.dialogData = Object.assign({}, data.data)
      if (data.val) {
        // 不使用=赋值,内存相同,改变后,treeData数据也会改变
        this.saveDetailInfo(this.dialogData)
        this.changeEditStatus(true)
      } else {
        // 使用=赋值,编辑时改变currentTreeData, 源数据treeData也会改变
        let parmas = this.dialogData
        parmas.type = 2
        parmas.name = ''
        this.saveDetailInfo(parmas)
        this.changeEditStatus(false)
      }
      this.changeBoxStatus(true)
    },
    addOrganization () {
      let parmas = {
        type: 2,
        name: '',
        level: "1",
        seq: 1,
        remark: "",
        code: '1'
      }
      this.changeBoxStatus(true)
      this.saveDetailInfo(parmas)
      this.changeEditStatus(true)
    },
    // 删除
    deleteStock (data) {
      console.log('deleteStock', data)
      this.$confirm('确认删除？')
        .then(_ => {
          this.confimdelete(data.id)
        })
        .catch(_ => { });
      // this.currentTreeData = data
    },
    // 确定删除
    confimdelete (id) {
      let params = {
        id: id
      }
      systemManageMirror.deleteDepartment(params).then(res => {
        let { code, result, serviceMessage } = res.data
        if (code === 200) {
          this.getDepartmentAll()
        }
      })
    },
    clearDialog () {
      this.dialogVisible = false
    },



  },
}
</script>
<style lang="less" scoped>
.dz-system {
  &-tree {
    margin: 30px 0;
    overflow: auto;
    height: calc(100% - 60px);
  }
}
/deep/ label {
  margin-bottom: 0;
}
</style>