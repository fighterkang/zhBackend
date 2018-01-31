<template lang="html">
  <div class="idetail-container" @scroll="scroll">
    <div class="idetail-content" :class="[classList]" :style="styleList">
      <slot/>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  components: {},
  data() {
    return {
      scrollTop: 0,
    }
  },
  props: {
    classList: {
      type: String,
      default: '',
    },
    styleList: {
      type: Object,
      default() {
        return {}
      },
    },
    noScroll: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(['showBar']),
  },
  watch: {},
  methods: {
    scroll(e) {
      let scrollTop = e.target.scrollTop
      let scrollBettwen = Math.abs(scrollTop - this.scrollTop)
      if (scrollBettwen > 20 && this.showBar === scrollTop > this.scrollTop && !this.noScroll) this.$store.dispatch('ToggleBar', scrollTop < this.scrollTop)
      if (e.target.scrollTop - this.scrollTop > 0 && e.target.scrollHeight - e.target.offsetHeight - e.target.scrollTop <= 30) this.$emit('scrollToBottom')
      this.scrollTop = scrollTop
    },
  },
  created() {},
  mounted() {},
}
</script>

<style lang="less" scoped>
  // @import url('../../theme/index.less');
  .idetail-container{
    overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
    width: 100%;
    .idetail-content{
      position: relative;
    }
  }
</style>
