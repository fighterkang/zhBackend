

<template lang="html">
  <div class="container">
    <div class="model-item box">
      <div class="h-label box box-item">置顶等级</div>
      <el-input v-model="top" type="text" placeholder="请填写置顶等级"/>
    </div>
    <div class="model-item box btn-container">
      <div class="h-label box box-item"></div>
      <el-button style="margin-right:1vh;" @click="saveFn" type="primary">确认</el-button>
      <el-button @click="closeModel">取消</el-button>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      basicData: {},
      top: null,
    }
  },
  props: {
    params: {
      type: Object,
      default: {},
    },
  },
  computed: {},
  watch: {
    params() {
      this.basicData = { ...this.basicData, ...this.params }
    },
  },
  methods: {
    closeModel() {
      this.$Helper.emitAction('closeModel')
    },
    saveFn() {
      this.$Helper
      .ajax({
        url: `manage/course/updateCourseTop`,
        method: "GET",
        params: {
          courseId: this.basicData.id,
          top: this.top,
        },
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
    removeImage() {
      this.basicData.img = null
    },
    uploadSuccess({url}) {
      this.basicData.img = url
    },
  },
  created() {
    this.basicData = { ...this.basicData, ...this.params }
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
