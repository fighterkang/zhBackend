<template>
  <div class="control-container box">
    <SubBar></SubBar>
    <Mainer></Mainer>
  </div>
</template>

<script>
import SubBar from './SubBar'
import Mainer from './Mainer'
import router from '@/router'
export default {
  components: {
    SubBar,
    Mainer,
  },
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {
    testLogin() {
      let basicCookie = JSON.parse(this.$Helper.getCookie('basic'))
      if (!basicCookie) {
        router.push({name:'Login'})
      } else {
        this.$store.dispatch('basic/setLoginData',basicCookie)
      }
    },
  },
  created() {
    this.testLogin()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.control-container {
  height: 100%;
  background: #fafafa;
  overflow: hidden;
}
</style>
