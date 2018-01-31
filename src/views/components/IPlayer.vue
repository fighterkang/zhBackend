<template>
  <div class="container layer box box-x-center" v-if="status && url" @click.self="closePlayer">
    <div class="card">
      <div class="box box-x-center" v-if="!canPlay">
        <div class="icon" v-if="!playError"></div>
        <span>{{ playError ? '该视频无法播放': '正在缓冲...' }}</span>
      </div>
      <video :src="url" controls="controls" autoplay @ended="ended" @canplay="canPlayFn" @loadstart="loadstart">
        您的浏览器不支持 video 标签。
      </video>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {
  },
  data() {
    return {
      canPlay: false,
      playError: false,
      Timer: null,
    }
  },
  created(to, from, next) {

  },
  computed: {
    ...mapState('player', [
      'status',
      'url',
    ]),
  },
  watch: {
    status() {
      this.canPlay = false
      this.playError = false
    },
  },
  methods: {
    closePlayer() {
      this.$store.dispatch('player/update', { status: false, url: null })
    },
    ended() {
      this.closePlayer()
    },
    canPlayFn() {
      this.canPlay = true
    },
    loadstart() {
      if (this.Timer) clearInterval(this.Timer)
      this.Timer = setTimeout(() => {
        this.playError = true
      }, 20000)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.layer{
  background:rgba(0,0,0,.3);
  transition: all .3s linear;
  .card{
    width:107vh;
    height: 60vh;
    position: absolute;
    left:0;
    right:0;
    top:15vh;
    margin:auto;
    background: rgba(0,0,0,.9);
    &>div{
      position: absolute;
      top:0;
      bottom: 0;
      left:0;
      right: 0;
      color: white;
      font-size: 2vh;
      padding-top:25vh;
      span{
        margin-top:6px;
      }
      .icon{
        width:30px;
        height:30px;
        margin-right: 1vw;
        border-radius: 100%;
        border:2px solid #409EFF;
        border-bottom-color: transparent;
        -webkit-animation: rotate 1s 0s linear infinite;
        animation: rotate 1s 0s linear infinite;
      }
      @-webkit-keyframes rotate {
        0% {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
        }

        100% {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }

      @keyframes rotate {
        0% {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
        }

        100% {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }
    }
    video{
      width:100%;
      height: 100%;
    }
  }

}
</style>
