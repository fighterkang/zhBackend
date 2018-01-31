

<template lang="html">
  <div class="container">
    <div class="model-item box">
      <div class="h-label box box-item">置顶</div>
      <el-input v-model="basicData.top" type="text" placeholder="请填写置顶级别"/>
    </div>
    <div class="model-item box">
      <div class="h-label box box-item">类别</div>
      <el-select v-model="basicData.type" placeholder="请选择">
        <el-option v-for="(item, key) in selectArr" :key="key" :label="item" :value="key">
        </el-option>
      </el-select>
    </div>
    <div class="model-item box">
      <div class="h-label box box-item">{{ basicData.type==='1' ? 'ID' : '链接' }}</div>
      <el-input v-model="basicData.url" type="text" :placeholder="basicData.type==='1' ? '帖子ID' : '链接'"/>
    </div>
    <div class="model-item box">
      <div class="h-label box box-item">图片</div>
      <ul class="upload-ul box">
        <li v-if="basicData.imgUrl" :style="{backgroundImage: `url('${basicData.imgUrl}')`}" @click="removeImage"/>
        <IUpload v-else @uploadSuccess="uploadSuccess">
          <li class="box box-item"><i class="iconfont">&#xe603;</i></li>
        </IUpload>
      </ul>
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
export default {
  components: {
    IUpload,
  },
  data() {
    return {
      selectArr: {
        '1': '帖子',
        '3': '链接',
      },
      basicData: {
        top: null,
        url: null,
        imgUrl: null,
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
        url: !this.basicData.id ? 'BackBanner.InsertBanner' : 'BackBanner.UpdateBanner',
        method: "GET",
        params: this.basicData,
        urlType: 'bbs'
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
      this.basicData.imgUrl = null
    },
    uploadSuccess({url}) {
      this.basicData.imgUrl = url
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
