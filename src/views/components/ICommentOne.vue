<template lang="html">
  <div class="commentOne">
    <div class="box comment">
      <img :src="basicData.photo" v-if="basicData.photo" alt="photo">
      <div>
        <div class="auther box box-y-center">
          {{ basicData.nickName }}
        </div>
        <div class="name">
          {{ index + 1 }}楼 &nbsp;{{ $Helper.formatTime(basicData.createTime) }}
        </div>
      </div>
      <div class="info box box-col-flex box-x-right">
        <!-- <div class="box box-y-center info-item cursor" :class="{ active: basicData.haslike !== '0' }" @click="addLike(index, basicData.haslike)">
          <i class="iconfont">&#xe60e;</i> {{ basicData.likeNum }}
        </div>
        <div class="box box-y-center info-item cursor" @click="addComment">
          <i class="iconfont">&#xe626;</i>
        </div> -->
        <div class="box box-y-center info-item cursor" @click="deleteComment">
          <i class="iconfont">&#xe61c;</i>
        </div>
      </div>
    </div>
    <p>{{ basicData.pid ? `@${basicData.pidNickName}:  ` : '' }}{{ basicData.comment }}</p>
    <!-- <div class="input-container" v-if="showComment">
      <el-input v-model="commentDetail" type="textarea" resize="none" :rows="6"/>
      <ul class="box box-y-center box-x-right">
        <el-button size="mini" round>
          取消
        </el-button>
        <el-button size="mini" type="primary" round>
          发布
        </el-button>
      </ul>
    </div> -->
    <!-- <div class="info">
      <i class="iconfont">&#xe60e;</i> {{ basicData.likeNum }}
    </div> -->
    <div class="half-x-line" />
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {}
  },
  props: {
    basicData: {
      type: Object,
      default: {},
    },
    index: {
      default: 0,
    },
  },
  computed: {},
  watch: {},
  methods: {
    addLike(key, isActvie) {
      console.log(isActvie)
      if (isActvie !== '0') {
        this.$message('您刚刚赞过')
        return
      }
      this.$Helper.emitAction('addLike', key)
      this.$Helper.ajax({
        url: 'WeConsult.InsertCommentLike',
        method: 'GET',
        urlType: 'bbs',
        params: {
          fid: this.basicData.id,
        },
      }).then(
        ({data}) => {
          // console.log(data)
          // this.$Helper.message.toast({
          //   text: '已点赞',
          //   long: 2000,
          // })
        },
        () => {
          this.$message('点赞失败')
        }
      )
    },
    deleteComment() {
      this.$confirm('确认要删除该评论吗？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$Helper.ajax({ url: 'WeConsult.DeleteComment', urlType: 'bbs',params: { id: this.basicData.id },method: 'GET'}).then(
          (response) => {
            this.$store.dispatch('toast/update', { type: 'success', content: `已删除`, time: 2000 })
            this.$Helper.emitAction('commentReload')
          }
        )
      }).catch(() => {});
    },
  },
  created() {},
  mounted() {},
}
</script>

<style lang="less" scoped>
  .commentOne{
    padding-top: 20px;
    padding-bottom: 10px;
    position: relative;
    .half-x-line {
      height: 1px;
      background: #eee;
      transform-origin: 0 0;
      transform: scale(1, 0.8);
      -webkit-transform-origin: 0 0;
      -webkit-transform: scale(1, 0.8);
    }
    &>.comment{
      margin-bottom: 20px;
      &>img{
        width: 40px;
        height: 40px;
        border-radius: 100%;
      }
      &>div{
        padding-left: 15px;
        .auther{
          margin-right: 10px;
          margin-top:2px;
          margin-bottom:5px;
          font-size: 15px;
          color: #666;
        }
        .name{
          font-size: 10px;
          color: #666;
        }
      }
      &>.info{
        &>.info-item{
          &.active{
            color: #53a8ff;
            i{
              color: #53a8ff;
            }
          }
          font-size: 14px;
          color: #666;
          i{
            font-size: 20px;
            color: #666;
            margin-right: 5px;
            margin-left: 15px;
          }
        }
      }
    }
    &>p{
      font-size: 14px;
      line-height: 1.5;
      color: #666;
    }
    &>.input-container{
      padding-top:20px;
      position: relative;
      &>ul{
        position: absolute;
        bottom: 10px;
        left:0;
        right: 10px;
      }
    }
    &>.half-x-line{
      position: absolute;
      bottom: 0;
      left:0;
      right: 0;
    }
  }
</style>
