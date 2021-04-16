<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: mandy
 * @Date: 2021-03-22 09:17:26
 * @LastEditors: mandy
 * @LastEditTime: 2021-03-23 10:21:19
-->
<template>
  <div class="add-module">
    <el-dialog :title="title"
               :visible.sync="dialogVisible"
               :modal-append-to-body='true'
               :close-on-click-modal='false'
               width="500px"
               :before-close="handleClose">
      <innerDialog ref="mapDialog"></innerDialog>
      <main>
        <slot name='dialogMain'></slot>
      </main>
      <!-- <addProjectForm v-if="name==='项目管理'"
                      ref="addForm"
                      @changeInnerVisible='changeInnerVisible'
                      @changeProjectBox='changeProjectBox'></addProjectForm>
      <addClientForm v-if="name==='客户管理'"
                     @changeProjectBox='changeProjectBox'
                     ref="addForm"></addClientForm>
      <addIndustryForm v-if="name==='行业管理'"
                       ref="addForm"
                       @changeProjectBox='changeProjectBox'></addIndustryForm>
      <addSmartSetForm v-if="name==='智能设备'"
                       ref="addForm"
                       @changeProjectBox='changeProjectBox'></addSmartSetForm>
      <addSystemForm v-if="name==='智能系统'"
                     ref="addForm"
                     @changeProjectBox='changeProjectBox'></addSystemForm>
      <addUserForm v-if="name==='用户管理'"
                   ref="addForm"
                   @changeProjectBox='changeProjectBox'></addUserForm>
      <addPowerForm v-if="name==='权限管理'"
                    ref="addForm"
                    @changeProjectBox='changeProjectBox'></addPowerForm>
      <addDeviceSeries v-if="name==='设备系列'"
                       ref="addForm"
                       @changeProjectBox='changeProjectBox'></addDeviceSeries>
      <addDeviceModel v-if="name==='设备型号'"
                      ref="addForm"
                      @changeProjectBox='changeProjectBox'></addDeviceModel>
      <addBreakdown v-if="name==='故障类型管理'"
                    ref="addForm"
                    @changeProjectBox='changeProjectBox'></addBreakdown> -->

      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="changeProjectBoxFun">确 定</el-button>
        <el-button @click="handleClose">取 消</el-button>
      </span>

    </el-dialog>
  </div>
</template>

<script>
import addProjectForm from '../formModule/addProjectForm'
import addClientForm from '../formModule/addClientForm'
import addIndustryForm from '../formModule/addIndustryForm'
import addSmartSetForm from '../formModule/addSmartSetForm'
import addSystemForm from '../formModule/addSystemForm'
import addUserForm from '../formModule/addUserForm'
import addPowerForm from '../formModule/addPowerForm'
import innerDialog from '../mapBox/index'
import addDeviceSeries from '../formModule/addDeviceSeries'
import addDeviceModel from '../formModule/addDeviceModel'
import addBreakdown from '../formModule/addBreakdown'
export default {
  components: {
    addProjectForm, addClientForm, addIndustryForm, addSmartSetForm, addSystemForm, addUserForm, addPowerForm, innerDialog,
    addDeviceSeries, addDeviceModel, addBreakdown
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      dialogVisible: true,
      innerVisible: true,
    };
  },
  methods: {
    handleClose () {
      this.$emit('changeProjectBox', false)
    },
    changeProjectBox (status) {
      this.$emit('getList')
      this.$emit('changeProjectBox', status)
    },
    changeInnerVisible (status) {
      this.$refs.mapDialog.changeDialogVisible(status)
    },
    changeProjectBoxFun (status) {
      this.$refs['addForm'].submitForm()
    },

  }
};
</script>
