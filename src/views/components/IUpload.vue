<template lang="html">
  <div class="container" :id="imageUploadBtnId">
    <slot/>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      imageUploadBtnId: null,
    }
  },
  props: {
    imgKey: {
      type: String,
    },
    hander: {
      default: this.imageUploadBtnId,
    },
  },
  computed: {},
  watch: {},
  methods: {},
  created() {
    this.imageUploadBtnId = `imageUploadBtnId_${this.$Helper.getTime()}`
  },
  mounted() {
    // init image select
    this.$Helper.initUploadImage(
      this.imageUploadBtnId,
      (data) => {
        this.$emit('uploadSuccess', {
          hander: this.hander,
          url: data,
        })
      },
      this.imgKey || this.imageUploadBtnId
    )
  },
}
</script>

<style lang="less" scoped>
  .container {
    
  }
</style>
