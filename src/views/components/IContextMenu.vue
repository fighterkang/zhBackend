<template>
  <div id="IContextMenu" v-show="status" @click="closeModel">
    <div class="layer"></div>
    <ul id="IContextMenu_container" :style="{top: `${position[0]}px`, left:`${position[1]}px`}">
      <li v-for="(item, key) in items" :key="key" :class="{ disable: isMultiple && !item.multiple }" @click="clickFn(item)">{{ item.text }}</li>
    </ul>
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
    ...mapState('contextmenu', [
      'status',
      'position',
      'items',
      'isMultiple'
    ]),
  },
  methods: {
    clickFn(item) {
      if (this.isMultiple && !item.multiple) return
      item.event.bind(this)
      item.event()
    },
    closeModel() {
      this.$store.dispatch('contextmenu/update', { status: false })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.container {}

#IContextMenu {
  transition: all .1s linear;
}

.layer {
  background: rgba(0, 0, 0, .1);
  z-index: 11
}

#IContextMenu_container {
  background: #ffffff;
  position: fixed;
  left: 0;
  top: 0;
  border-radius: 2px;
  overflow: hidden;
  z-index: 2000;
  box-shadow: 0 0 5px #ccc;
  // border:1px solid #eee;
  li{
    padding:9px 12px;
    width:140px;
    font-size:13px;
    font-weight: 500;
    color:#666;
    transition: all 300ms linear;
    display:block;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    cursor: pointer;
    &:hover{
      background: #ecf5ff;
      color:#409EFF;
    }
    &.disable{
      cursor: not-allowed;
      color: #bbb;
    }
  }
}

</style>
