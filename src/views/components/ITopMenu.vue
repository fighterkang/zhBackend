<template>
  <ul class="box">
    <li class="box box-item" :class="{active: item.name===activeItem}" @click="toggleItem(item.name)" v-for="(item, key) of items" :key="key">
      {{ item.text }}
    </li>
  </ul>
</template>

<script>
import _ from 'lodash'
export default {
  components: {
  },
  data() {
    return {
      activeItem: null,
    }
  },
  props: ['items', 'active'],
  created(to, from, next) {
    this.activeItem = this.active || _.get(this, 'items[0].name')
  },
  watch: {
    active() {
      this.activeItem = this.active
    },
  },
  computed: {
  },
  methods: {
    toggleItem(key) {
      this.activeItem = key
      this.$emit('select', key)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  ul{
    height: 100%;
    padding: 0 20px 1px 20px;
    li{
      height: 100%;
      padding:0 23px;
      min-width: 70px;
      color:#878d98;
      font-size:14px;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      transition: all 0.2s linear;
      font-weight: 500;
      &.active{
        border-bottom: 2px solid #409EFF;
        color: #555;
      }
    }
  }
</style>
