<template>
  <div class="mainer-container box-col-flex">
    <TopBar></TopBar>
    <transition name="fade">
      <router-view class="router-view"></router-view>
    </transition>
  </div>
</template>

<script>
import TopBar from './TopBar'
export default {
  components: {
    TopBar,
  },
  data() {
    return {

    }
  },
  created(to, from, next) {

  },
  computed: {

  },
  watch: {

  },
  methods: {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.mainer-container {
  height: 100%;
  position: relative;
}
.router-view {
  position: absolute;
  // transition: all .3s cubic-bezier(.55, 0, .1, 1);
  transition: all 0.1s linear;
  left: 0;
  right: 0;
  top: 6.5vh;
  bottom:0;
}

.fade-enter-active,
.fade-leave-active {
  opacity: 1
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
