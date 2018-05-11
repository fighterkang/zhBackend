<template>
  <div class="container">
    <transition name="fade">
      <div class="layer no-touch" v-show="active"></div>
    </transition>
    <div class="box box-item no-touch" id="Itoast" :class="{active:active}" :data-type="type">
      <div class="box box-item Itosat-container">
        <i class="iconfont" data-type="success">&#xe6f3;</i>
        <i class="iconfont" data-type="error">&#xe641;</i>
        <i class="iconfont" data-type="info">&#xe669;</i>
        <div id="Itosat-content">{{ content }}</div>
      </div>
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
      active: false,
      setTimer: null,
    }
  },
  created(to, from, next) {

  },
  computed: {
    ...mapState('toast', [
      'type',
      'content',
      'time',
      'status',
    ]),
  },
  watch: {
    status() {
      if (this.setTimer) clearTimeout(this.setTimer)
      this.active = true
      this.setTimer = setTimeout(() => {
        this.active = false
      }, this.time)
    },
  },
  methods: {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.layer{
  background:rgba(0,0,0,.1);
  transition: all .3s linear;
}
#Itoast {
  position: fixed;
  top: 5vh;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 1;
  opacity: 0;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
}

#Itoast.active {
  top: 10vh;
  opacity: 1;
  z-index:10000;
}

.Itosat-container {
  background: white;
  padding: 12px;
  color: #666;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .1);
  font-size: 2.8vw;
}

#Itoast i {
  font-size: 19px;
  margin-right: 6px;
  color: rgba(0, 160, 10, .7);
  display: none;
}

#Itoast[data-type="success"] i[data-type="success"] {
  display: block;
}

#Itoast[data-type="error"] i[data-type="error"] {
  display: block;
  color: #f05714;
}

#Itoast[data-type="info"] i[data-type="info"] {
  display: block;
  color: #fed700;
  position: relative;
  top: -2px;
}
</style>
