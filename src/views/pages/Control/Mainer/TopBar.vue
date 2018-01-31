<template>
  <div class="topbar-container">
    <div class="top">
      <ITopMenu v-if="topList.length>0" :items="topList" :active="active" @select="handleSelect"/>
      <ul class="head box box-y-center box-x-right">
        <li class="box box-item" @click="pushMsg">
          <i class="iconfont">&#xe725;</i>
          推流
        </li>
        <li class="box box-item" @click="loginOut">
          <i class="iconfont">&#xe691;</i>
          登出
        </li>
      </ul>
    </div>
    <div class="half-x-line"/>
  </div>
</template>

<script>
import { compositionConfig } from '@/config/level'
import { mapState } from 'vuex'
import ITopMenu from '@/views/components/ITopMenu'
import router from '@/router'
export default {
  components: {
    ITopMenu,
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      topBarActiveItem: state => state.topBarActiveItem
    }),
    subData() {
      let returnData = {}
      for (let i in compositionConfig) {
        let { sub = [] } = compositionConfig[i]
        let item = sub.filter(({name}) => name === this.$route.name)
        if (item.length > 0) {
          returnData = item[0]
          break
        }
      }
      return returnData
    },
    topList() {
      // console.log(this.subData)
      return this.subData.sub || []
    },
    active() {
      return this.topBarActiveItem || this.topList[0].name
    },
  },
  methods: {
    handleSelect(index) {
      this.$store.dispatch('ToggleTopBarActive', index)
    },
    loginOut() {
      this.$store.dispatch('modelbox/show', {
        status: 'comfirm',
        config: {
          title: '退出登录',
          text: '确认退出登录吗？',
          fn: () => {
            this.$Helper.setCookie('basic','')
            router.push({ name: 'Login' })
          },
        }
      })
    },
    pushMsg() {
      this.$store.dispatch('slidemodel/show', { status: 'PushMsg' })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.topbar-container {
  background: white;
  z-index: 10;
  height: 60px;
  position: relative;
  transition: none!important;
  .btn-content{
    height:100%;
    padding:0 20px;
  }
  .half-x-line{
    background: #666;
    position: absolute;
    bottom: 0;
    left:0;
    right: 0;
  }
  .app-topmenu{
    width: 100%;
    padding-left:20px;
  }
  .el-menu--horizontal{
    border-bottom: none;
  }
  .top{
    height: 100%;
    .head{
      position: absolute;
      top:0;
      bottom: 0;
      right:0;
      li{
        height: 100%;
        padding:0 1.7vw;
        font-size: 1.1vw;
        border-left: 1px solid #eee;
        color: #666;
        cursor: pointer;
        i{
          font-size: 1.5vw;
          margin-right: 3px;
        }
      }
    }
  }
}
</style>
