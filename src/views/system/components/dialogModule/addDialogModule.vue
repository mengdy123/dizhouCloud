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
      <!-- <innerDialog ref="mapDialog"></innerDialog> -->
      <main>
        <slot name='dialogMain'></slot>
      </main>
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
    changeInnerVisible (status) {
      this.$refs.mapDialog.changeDialogVisible(status)
    },
    changeProjectBoxFun (status) {
      this.$refs['addForm'].submitForm()
    },

  }
};
</script>
