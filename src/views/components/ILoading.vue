<template>
  <div class="container layer box box-x-center" v-if="status">
    <div class="card">
      <div class="icon"></div>
      <p>{{ text }}</p>
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

    }
  },
  created(to, from, next) {

  },
  computed: {
    ...mapState('loading', [
      'status',
      'text',
    ]),
  },
  methods: {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.layer{
  background:rgba(255,255,255,.6);
  transition: all .3s linear;
  .card{
    width:300px;
    height:120px;
    // background: rgba(0,0,0,0.4);
    margin-top:35vh;
    border-radius: 5px;
    .icon{
      width:46px;
      height:46px;
      margin:auto;
      border-radius: 100%;
      border:2px solid #409EFF;
      border-bottom-color: transparent;
      -webkit-animation: rotate 1s 0s linear infinite;
      animation: rotate 1s 0s linear infinite;
    }
    p{
      text-align: center;
      font-size: 16px;
      color:#409EFF;
      margin:15px;
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

}
</style>
