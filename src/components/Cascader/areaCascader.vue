<template>
  <div>
    <el-cascader :options="areafrom" change-on-select  :props="{ checkStrictly: true, value: 'label' }"
                                                        expand-trigger="hover"
                                                        class="wd400"
                                                       @change="handleChange"
                                                       clearable></el-cascader>
  </div>
</template>
<script>
import areaJs from '@/data/area.json'
export default {
  props: {

  },
  data () {
    return {
      areafrom: areaJs.children,
    }
  },
  methods: {
    handleChange (value) {
      console.log(value);
    }
  }
}
</script>