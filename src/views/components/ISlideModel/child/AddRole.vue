

<template lang="html">
  <div class="container">
    <div class="model-item box">
      <div class="h-label box box-item">名称</div>
      <el-input v-model="basicData.name" type="text" placeholder="请填写角色名称"/>
    </div>
    <div class="model-item box">
      <div class="h-label box box-item">类型</div>
      <el-input v-model="basicData.type" type="text" placeholder="请填写角色类型"/>
    </div>
    <div class="model-item box btn-container">
      <div class="h-label box box-item"></div>
      <el-button style="margin-right:1vh;" @click="saveFn" :type="testParams.length===0 ? 'primary' : 'info'">确认</el-button>
      <el-button @click="closeModel">取消</el-button>
    </div>
  </div>
</template>
<script>
import IUpload from '@/views/components/IUpload'
import md5 from 'js-md5'
export default {
  components: {
    IUpload,
  },
  data() {
    return {
      basicData: {
        name: null,
        type: null,
      },
    }
  },
  props: {
    params: {
      type: Object,
      default: {},
    },
  },
  computed: {
    testParams() {
      return this.$Helper.testParamsComplete({ params: this.basicData })
    }
  },
  watch: {
    params() {
      this.assignData()
    },
  },
  methods: {
    assignData() {
      this.basicData = { ...this.basicData, ...this.params }
    },
    closeModel() {
      this.$Helper.emitAction('closeModel')
    },
    saveFn() {
      if (this.testParams.length>0) {
        let config = {
          name: '名称',
          type: '类型',
        }
        this.$message({
          type: 'error',
          message: `请输入${config[this.testParams[0]]}信息`
        })
        return
      }
      this.$Helper
      .ajax({
        url: `manage/addRole`,
        method: "POST",
        params: { ...this.basicData },
      })
      .then(
        (data) => {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.closeModel()
          this.$store.dispatch('editerReload')
        },
        () => {
          this.$message({
            type: 'error',
            message: '新增失败'
          })
        }
      );
    },
  },
  created() {
    this.assignData()
  },
  mounted() {},
}
</script>

<style lang="less" scoped>
  // @import url('../../../theme/index.less');
  .container{
    height: 100%;
    padding: 3% 8% 3% 3%;
    .model-item {
      margin: 3.5vh 0;
      .h-label {
        width: 20%;
      }
      .h-link {
        margin-left: 4vh;
      }
      p {
        font-size: 12px;
        color: #5d5e5e;
      }
    }
    .upload-ul {
      li {
        border: 1px solid #eee;
        height: 65px;
        width: 65px;
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;
        margin-right: 10px;
        cursor: pointer;
      }
    }
    .btn-container {
      margin-top: 5vw;
    }
    .road-one {
      border: 1px solid #d8dce5;
      border-radius: 2px;
      padding: 1vh 0;
      margin: 1vh 0;
      & > div:nth-child(1) {
        width: 22%;
        font-size: 2vh;
      }
      & > div:nth-child(2) {
        & > .box {
          margin: 2vh;
          & > .h-label {
            margin-right: 2vh;
            font-weight: 500;
            font-size: 1.85vh;
            color: #777;
          }
          .el-input {
            width: 195px;
          }
        }
      }
    }
  }
</style>
