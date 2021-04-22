<template>
  <div class="upload-modules">
    <div class="upload-div"
         v-if="uploadLoading">
      <span>请上传文件</span>
      <el-upload class="upload-demo"
                 action="https://jsonplaceholder.typicode.com/posts/"
                 :on-preview="handlePreview"
                 :on-remove="handleRemove"
                 :before-remove="beforeRemove"
                 accept=".xls, .xlsx"
                 multiple
                 :limit="1"
                 :auto-upload='false'
                 :on-exceed="handleExceed"
                 :file-list="fileList">
        <el-button size="small"
                   type="primary">选择文件</el-button>
        <div slot="tip"
             class="el-upload__tip">只能上传.xls, .xlsx文件，且不超过5MB</div>
      </el-upload>
      <div class="line"></div>
      <div class="button-list">
        <el-button type="primary"
                   @click="closeUploadBox">导 入</el-button>
        <el-button @click="closeUploadBox">取 消</el-button>
      </div>
    </div>
    <div class="upload-success"
         v-else>
      <span>导入设备总数：{{uploadInfo.total}}，导入成功数量：{{uploadInfo.successNumber}}，导入失败数量：{{uploadInfo.fialdNumber}}</span>
      <span>失败数据已生成表格文件，请下载查看。</span>
      <div class="fial-files">
        <i class="el-icon-download"></i>
        松江新城第一批产品-导入失败数据.xlsx
      </div>
      <div class="line"></div>
      <div class="button-list">
        <el-button type="primary"
                   @click="closeUploadBox">确 定</el-button>
        <el-button @click="closeUploadBox">取 消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      uploadInfo: {
        total: '1000',
        successNumber: '990',
        fialdNumber: '10'
      },
      uploadLoading: true,
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]
    };
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePreview (file) {
      console.log(file);
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    closeUploadBox () {
      this.$emit('changeProjectBox', false)
    }
  }
}
</script>
<style lang="less" scoped>
.upload-div {
  span {
    font-size: 14px;
    line-height: 24px;
  }
  span::before {
    content: "*";
    font-size: 14px;
    color: #f5212d;
    padding: 10px 4px;
  }
}
.upload-success {
  span {
    color: #333333;
  }
  .fial-files {
    color: #2761ff;
    cursor: pointer;
    margin: 20px 0;
  }
}
/deep/ label {
  font-size: 14px !important;
}
.button-list {
  display: flex;
  justify-content: center;
  /deep/ .el-button {
    width: 90px;
    margin-bottom: 20px;
    text-align: center;
  }
}
.line {
  margin: 20px 0;
  width: 100%;
  height: 1px;
  background: #ffffff;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.10088);
  transform: rotate(-180deg);
}
</style>