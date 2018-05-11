<template lang="html">
  <IScroll @scrollToBottom="scrollToBottom" classList="container" >
    <div class="top">
      <el-button size="mini" @click="closeModel">
        返回
      </el-button>
    </div>
    <div class="content">
      <h1>{{ basicData.consultName }}</h1>
      <div class="box head">
        <img :src="basicData.photo" v-if="basicData.photo" alt="photo">
        <div>
          <div class="auther box box-y-center">
            <span class="name">{{ basicData.nickName }}</span>
            <span class="time">{{ $Helper.formatTime(basicData.createTime) }}</span>
          </div>
          <div class="info">
            <i class="iconfont">&#xe61f;</i> {{ basicData.num || 0 }}
            <i class="iconfont">&#xe611;</i> {{ basicData.commentNum || 0 }}
          </div>
        </div>
      </div>
      <img :src="basicData.consultImg" v-if="basicData.consultImg" alt="consultImg"/>
      <p v-html="basicData.consultDetail" />
      <!-- <IMenuBar class="commentTitle">
        发表评论
      </IMenuBar>
      <el-input v-model="comment" type="textarea" resize="none" :rows="6"/> -->
      <!-- <div class="box box-y-center box-x-right" style="padding:15px 0;">
        <el-button size="mini" @click="postComment" round>
          发送
        </el-button>
      </div> -->
      <IMenuBar class="commentTitle">
        评论列表
      </IMenuBar>
      <div class="commentList" v-if="commentList.length>0">
        <ICommentOne v-for="(item, key) in commentList" :basicData="item" :index="key" :key="key" />
      </div>
      <div class="empty box box-item" v-else>暂无评论</div>
    </div>
  </IScroll>
</template>
<script>
import IScroll from '@/views/components/IScroll'
import IMenuBar from '@/views/components/IMenuBar'
import ICommentOne from '@/views/components/ICommentOne'
export default {
  components: {
    IMenuBar,
    IScroll,
    ICommentOne,
  },
  data() {
    return {
      basicData: {},
      fetched: false,
      commentList: [],
      page: 1,
      comment: null,
    }
  },
  computed: {},
  props: {
    params: {
      type: Object,
      default: {},
    },
  },
  watch: {
    params() {
      this.basicData = { ...this.basicData, ...this.params }
    },
  },
  methods: {
    closeModel() {
      this.$Helper.emitAction('closeModel')
    },
    scrollToBottom() {
      this.getCommentList()
    },
    getCommentList(reset = false) {
      this.fetched = true
      this.$Helper.ajax({
        url: 'WeOpen.CommentList',
        method: 'GET',
        urlType: 'bbs',
        params: {
          page: this.page,
          type: 1,
          fid: this.basicData.id,
        },
      }).then(
        ({data}) => {
          this.commentList = (reset ? [] : this.commentList).concat(data.data)
          // this.hotList = data.data
          this.fetched = false
          if (data.data.length > 0) {
            this.page++
          } else {
            if (this.page !== 1) this.$message('暂无更多内容')
          }
        },
        () => {
          this.fetched = false
        }
      )
    },
    reloadComment() {
      this.page = 1
      this.comment = null
      this.getCommentList(true)
    },
    postComment() {
      this.$Helper.ajax({
        url: 'WeConsult.InsertComment',
        method: 'GET',
        urlType: 'bbs',
        params: {
          comment: this.comment,
          type: 1,
          fid: this.basicData.id,
        },
      }).then(
        ({data}) => {
          let {code, context} = data
          this.$message({
            message: context,
            type: code === 1 ? 'success' : 'info',
          })
          this.reloadComment()
        },
        () => {
          this.$message({
            message: '评论失败',
            type: 'error',
          })
        }
      )
    },
  },
  created() {
    this.basicData = { ...this.basicData, ...this.params }
    console.log(this.basicData)
    // get comment list
    this.getCommentList()
    this.$Helper.onAction('addLike', key => {
      this.$message('已点赞')
      this.commentList.splice(key, 1, {
        ...this.commentList[key],
        haslike: 1,
        likeNum: parseInt(this.commentList[key].likeNum) + 1,
      })
    })
    this.$Helper.onAction('commentReload', () => {
      this.reloadComment()
    })
  },
  mounted() {},
}
</script>

<style lang="less" scoped>
  // @import url('../../../theme/index.less');
  .container {
    overflow-y: auto;
    overflow-x: hidden;
    &>.top{
      padding:20px 20px 0 20px;
    }
    &>.content{
      // width: 700px;
      padding: 2vh 7vw;
      // margin:auto;
      // border: 1px solid red;
      &>h1{
        padding: 30px 0;
        font-size: 34px;
        font-weight: 700;
        line-height: 1.3;
        color: #333333;
      }
      &>.head{
        margin-bottom: 20px;
        &>img{
          width: 50px;
          height: 50px;
          border-radius: 100%;
        }
        &>div{
          padding-left: 15px;
          .name{
            margin-right: 10px;
            font-size: 16px;
            color: #666;
          }
          .time{
            font-size: 12px;
            color: #666;
          }
          &>.auther{
            padding-top:2px;
          }
          &>.info{
            margin-top:7px;
            font-size: 14px;
            color: #aaa;
            i{
              font-size: 14px;
              color: #b4b4b4;
              &:nth-child(1){
                margin: 0;
              }
              margin-left: 10px;
            }
          }
        }
      }
      &>img{
        width: 100%;
        margin-top: 20px;
        margin-bottom: 50px;
      }
      &>p {
        color: #2f2f2f;
        word-break: break-word!important;
        word-break: break-all;
        font-size: 16px;
        font-weight: 400;
        line-height: 1.7;
        min-height: 50vh;
      }
      &>.commentTitle{
        margin-top: 50px;
      }
      &>.empty{
        height: 200px;
        color:#666;
        font-size: 14px;
      }
    }
  }
</style>
