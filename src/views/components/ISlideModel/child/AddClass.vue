

<template lang="html">
  <div class="container">
    <div class="model-item box">
      <div class="h-label box box-item">名称</div>
      <el-input v-model="basicData.courseClassName" type="text" placeholder="请填写分类名称"/>
    </div>
    <div class="model-item box">
      <div class="h-label box box-item">置顶</div>
      <el-input v-model="basicData.top" type="text" placeholder="请填写分类置顶级别，数字越大越靠前"/>
    </div>
    <div class="model-item box">
      <div class="h-label box box-item">类别</div>
      <el-select v-model="basicData.status" placeholder="请选择">
        <el-option v-for="(item, key) in [{key: 1, value: '正常分类'}, {key: 2, value: '特殊分类'}]" :key="item.key" :label="item.value" :value="item.key">
        </el-option>
      </el-select>
    </div>
    <div class="model-item box">
      <div class="h-label box box-item">图片</div>
      <ul class="upload-ul box">
        <li v-if="basicData.ico" :style="{backgroundImage: `url('${basicData.ico}')`}" @click="removeImage"/>
        <IUpload v-else @uploadSuccess="uploadSuccess">
          <li class="box box-item"><i class="iconfont">&#xe603;</i></li>
        </IUpload>
      </ul>
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
        courseClassName: null,
        top: null,
        ico: null,
        status: 1,
        pid: -1,
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
      return this.$Helper.testParamsComplete({ params: this.basicData, except: ['pid', 'twoClassJpas'] })
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
      console.log(this.basicData)
      if (this.testParams.length>0) {
        this.$message({
          type: 'error',
          message: `缺少信息`
        })
        return
      }
      this.$Helper
      .ajax({
        url: `manage/course/updateCourseClass`,
        method: "POST",
        params: { ...this.basicData },
      })
      .then(
        ({message}) => {
          this.$message({
            type: 'success',
            message: message || '操作成功'
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
      this.basicData.ico = null
    },
    uploadSuccess({url}) {
      this.basicData.ico = url
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
