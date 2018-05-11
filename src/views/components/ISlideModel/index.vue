<template>
  <div class="ISlideModel">
    <div class="layer" @click.self="closeModel" v-show="status"></div>
    <div class="slideRight-container" :class="{ active: status && type === 'slide-right' }">
      <AddLoop v-if="status==='AddLoop'" :params="basicData"/>
      <AddUser v-if="status==='AddUser'" :params="basicData"/>
      <AddRole v-if="status==='AddRole'" :params="basicData"/>
      <PushMsg v-if="status==='PushMsg'" :params="basicData"/>
      <AddClass v-if="status==='AddClass'" :params="basicData"/>
      <AddFourmLoop v-if="status==='AddFourmLoop'" :params="basicData"/>
      <AddActivityLoop v-if="status==='AddActivityLoop'" :params="basicData"/>
      <updateCourseTop v-if="status==='updateCourseTop'" :params="basicData"/>
    </div>
    <div class="slideBottom-container layer" :class="{ active: status && type === 'slide-bottom' }">
      <ModifyPermission v-if="status==='ModifyPermission'" :params="basicData"/>
      <PostDetail v-if="status==='PostDetail'" :params="basicData"/>
    </div>
  </div>
</template>

<script>
import AddLoop from "./child/AddLoop";
import AddUser from "./child/AddUser";
import AddRole from "./child/AddRole";
import PushMsg from "./child/PushMsg";
import ModifyPermission from "./child/ModifyPermission"
import AddClass from "./child/AddClass"
import AddFourmLoop from "./child/AddFourmLoop"
import PostDetail from "./child/PostDetail"
import AddActivityLoop from "./child/AddActivityLoop"
import updateCourseTop from "./child/updateCourseTop"
import { mapState } from "vuex";
export default {
  components: {
    AddLoop,
    AddUser,
    AddRole,
    PushMsg,
    ModifyPermission,
    AddClass,
    AddFourmLoop,
    PostDetail,
    AddActivityLoop,
    updateCourseTop,
  },
  data() {
    return {
      basicData: {}
    };
  },
  computed: {
    ...mapState("slidemodel", ["status", "params", "multiple", 'type'])
  },
  created() {
    this.resetDataFn();
    this.$Helper.onAction("closeModel", () => {
      this.closeModel();
    });
  },
  watch: {
    status() {
      if (this.status) {
        this.basicData = _.cloneDeep(this.params) || {};
      }
    }
  },
  methods: {
    resetDataFn() {
      this.basicData = {};
    },
    closeModel() {
      this.resetDataFn();
      this.$store.dispatch("slidemodel/close");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.container {
}

.ISlideModel {
  transition: all 0.1s linear;
  .layer {
    background: rgba(0, 0, 0, 0.3);
    z-index: 11;
  }

  .slideRight-container {
    background: #ffffff;
    width: 35vw;
    max-width: 500px;
    position: fixed;
    right: -36vw;
    top: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 20;
    box-shadow: -1px 0 4px #888;
    opacity: 0.5;
    transition: all 200ms ease;
    &.active {
      right: 0;
      opacity: 1;
      transition: all 400ms ease;
    }
  }
  .slideBottom-container {
    background: #ffffff;
    position: fixed;
    left: 11vw;
    right: 0;
    top: 90vw;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 20;
    box-shadow: -1px 0 4px #888;
    opacity: 0.5;
    transition: all 200ms ease;
    &.active {
      top: 0;
      opacity: 1;
      transition: all 400ms ease;
    }
  }
}
</style>
