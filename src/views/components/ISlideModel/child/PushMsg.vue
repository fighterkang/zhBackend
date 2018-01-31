

<template lang="html">
  <div class="container">
    <div class="model-item box">
      <div class="h-label box box-item">类型</div>
      <el-select v-model="userType" placeholder="请选择">
        <el-option v-for="item in [{key: 0, value: '所有用户'}, {key: 1, value: '单个用户'}]" :key="item.key" :label="item.value" :value="item.key">
        </el-option>
      </el-select>
    </div>
    <div class="model-item box" v-if="userType">
      <div class="h-label box box-item">用户</div>
      <el-input v-model="basicData.userId" type="text" placeholder="请填写用户ID"/>
    </div>
    <div class="model-item box">
      <div class="h-label box box-item">标题</div>
      <el-input v-model="basicData.msgTitle" type="text" placeholder="请填写标题"/>
    </div>
    <div class="model-item box">
      <div class="h-label box box-x-center">内容</div>
      <el-input v-model="basicData.msgBody" type="textarea" :rows="10" placeholder="请填写内容"/>
    </div>
    <div class="model-item box btn-container">
      <div class="h-label box box-item"></div>
      <el-button style="margin-right:1vh;" @click="saveFn" type="primary">确认</el-button>
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
      userType: 0,
      basicData: {
        userId: null,
        msgTitle: null,
        msgBody: null,
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
      this.$Helper
      .ajax({
        url: `manage/pushMsg`,
        method: "POST",
        params: { ...this.basicData, userId: this.basicData.userId || 0 },
      })
      .then(
        (data) => {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.closeModel()
        },
        () => {
          this.$message({
            type: 'error',
            message: '操作失败'
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
        -webkit-box-flex: 1.0;
        -moz-flex-shrink: 0;
        -webkit-flex-shrink: 0;
        flex-shrink: 0;
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
