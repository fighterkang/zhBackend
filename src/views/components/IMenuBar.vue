<template lang="html">
  <div class="h-menu-bar box box-y-center">
    <div class="half-x-line"/>
    <span class="box">
      <slot/>
    </span>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
}
</script>

<style lang="less" scoped>
  .h-menu-bar{
    position: relative;
    padding:0;
    margin-bottom: 10px;
    // border: 1px solid red;
    .half-x-line{
      position: absolute;
      left:0;
      right: 0;
      top:0;
    }
    span{
      border-top: 3px solid #000000;
      height: 100%;
      padding-top:10px;
      font-size: 15px;
      font-weight: 500;
      color: #666;
    }
  }
</style>
