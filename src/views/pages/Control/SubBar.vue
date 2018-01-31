<template>
  <div class="container" :class="{close: subBarClose}">
    <div class="content">
      <div class="container-head box box-item">
        {{ subBarClose? 'ZH' : 'ZhBackend' }}
      </div>
      <div class="toggleBar box box-item cursor" @click="toggleSubBarClose">
        <i class="iconfont" :class="{ active: !subBarClose }">&#xe623;</i>
      </div>
      <div class="s-subbar" @mouseover.stop="showTooltip($event, true)" @mouseout.stop="showTooltip($event, false)">
        <li class="s-li s-item box box-y-center" v-for="(item, key) of compositionConfig" v-if="!item.sub || item.sub.length===0" :key="key" :tooltip="item.text" @click="pushRoute(item.name)" :class="{active: $route.name === item.name}">
          <i class="iconfont no-touch" v-html="item.icon"/>
          {{ item.text }}
        </li>
        <ul class="s-ul" v-for="(item, key) of compositionConfig" v-if="item.sub && item.sub.length>0" :key="key">
          <li class="s-head s-li box box-y-center" @click="toggleSubItemActive(item, key)" v-if="!subBarClose">
            <i class="iconfont" v-html="item.icon" :class="{ active: item.active }"/>
            {{ item.text }}
          </li>
          <ul class="s-list" :class="{ active: subBarClose || item.active }">
            <li class="s-li s-item box box-y-center" v-for="(item2, key2) of item.sub" :key="key2" :tooltip="item2.text" @click="pushRoute(item2.name)" :class="{active: $route.name === item2.name}">
              <i class="iconfont no-touch" v-html="item2.icon"/>
              {{ item2.text }}
            </li>
          </ul>
        </ul>
      </div>
      <div class="h_menu-bottom" v-if="!subBarClose">
        <div class="box box-item" v-html="systemDate"></div>
        <div class="box box-item" v-html="systemTime"></div>
      </div>
    </div>
    <div class="tooltip box box-item" :style="{top: tooltipTop + 'px'}">{{ tooltipText }}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import router from "@/router";
import Cookie from "js-cookie";
import _ from "lodash";
import { levelConfig, compositionConfig } from "@/config/level";
import subbarConfig from "@/config/subbar";
export default {
  components: {
  },
  data() {
    return {
      saveCache: false,
      subData: [],
      activeItem: null,
      systemDate: null,
      systemTime: null,
      compositionConfig: [],
      subBarClose: this.$Helper.getCookie('subBarClose') === 'true' || false,
      tooltipTop: -1000,
      tooltipText: '',
    };
  },
  created(to, from, next) {
    this.getTime();
    this.judgeAuthority();
    this.initComposition();
  },
  computed: {
    ...mapState("basic", ["basic"]),
    authority() {
      let role = _.get(this.basic, "level");
      return role && levelConfig[role] ? levelConfig[role].subBar : [];
    }
  },
  watch: {
    $route() {
      this.judgeAuthority();
    }
  },
  methods: {
    toggleSubItemActive(item, key) {
      let { active } = item
      this.compositionConfig.splice(key, 1, { ...item, active: !active})
      this.saveCache && this.$Helper.setCookie('compositionConfig', this.compositionConfig)
    },
    showTooltip(e, show) {
      if (this.subBarClose && e.target.className.indexOf('s-item') !== -1) {
        this.tooltipText = show ? e.target.innerText.substr(2) : ''
        this.tooltipTop = show ? e.target.offsetTop : -1000
      }
    },
    toggleSubBarClose() {
      this.subBarClose = !this.subBarClose
      this.saveCache && this.$Helper.setCookie('subBarClose', this.subBarClose)
    },
    initComposition() {
      let savedCompositionConfig = JSON.parse(this.$Helper.getCookie('compositionConfig') || '{}')
      if(!_.isEmpty(savedCompositionConfig)) {
        this.compositionConfig = savedCompositionConfig
        return
      }
      compositionConfig.map((item, key) => {
        let { icon, sub, name } = item
        item.icon = !icon ? '&#xe629;' : icon
        item.active = false
        if (sub && this.$Helper.isArray(sub)) {
          sub.map((item2, key2) => {
            if(this.authority.indexOf(item2.name) === -1) {   // 不在权限范围内，移除
              sub.splice(key2, 1, {})
            }
          })
        } else {
          if(this.authority.indexOf(name) === -1) {   // 不在权限范围内，移除
            compositionConfig.splice(key, 1, {})
          }
        }
      })
      // save to cache
      this.saveCache && this.$Helper.setCookie('compositionConfig', compositionConfig)
      this.compositionConfig = compositionConfig
    },
    pushRoute(name) {
      this.$Helper.pushRoute(name);
    },
    judgeAuthority() {
      if (!this.authority) {
        router.push({ name: "Login" });
        return;
      }
      // if (this.authority.indexOf(this.$route.name) === -1) {
      //   router.push({ name: this.authority[0] })
      // }
    },
    getTime() {
      this.systemDate = this.getSystemDate();
      this.systemTime = this.getSystemTime();
      setInterval(() => {
        this.systemDate = this.getSystemDate();
        this.systemTime = this.getSystemTime();
      }, 1000 * 60);
    },

    getSystemDate() {
      let date = new Date();
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    },
    getSystemTime() {
      let date = new Date();
      let week = date.getDay();
      let weekDay;
      switch (week) {
        case 0:
          weekDay = "日";
          break;
        case 1:
          weekDay = "一";
          break;
        case 2:
          weekDay = "二";
          break;
        case 3:
          weekDay = "三";
          break;
        case 4:
          weekDay = "四";
          break;
        case 5:
          weekDay = "五";
          break;
        case 6:
          weekDay = "六";
          break;
        default:
          weekDay = "";
          break;
      }
      let hour = date.getHours();
      hour = hour < 10 ? "0" + hour : hour;
      let minutes = date.getMinutes();
      minutes = minutes < 10 ? "0" + minutes : minutes;
      return `星期${weekDay} &nbsp;&nbsp;${hour} : ${minutes}`;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.container {
  width: 11vw;
  min-width: 150px;
  max-width: 200px;
  background: #333744;
  color: #fff;
  position: relative;
  transition: all 200ms linear 0s;
  &.close{
    width:3.4vw;
    min-width: 40px;
    .content{
      .container-head{
        font-size: 2.2vh;
      }
      .s-subbar {
        height: calc(~"88vh - 30px");
      }
    }
  }
  .tooltip{
    position: absolute;
    top:-100vh;
    left:3.8vw;
    // width:20vw;
    background: rgba(91,97,114,0.9);
    color:#fff;
    height:5.5vh;
    padding:0 1vw;
    z-index: 1000;
    font-size:1.7vh;
    white-space: nowrap;
    border-radius: 1px;
    &:before{
      content: '';
      position: absolute;
      top:0;
      bottom:0;
      margin:auto;
      left:-0.3vw;
      width:0;
      height:0;
      border-right:0.3vw solid rgba(91,97,114,0.9);
      border-top:0.3vw solid transparent;
      border-bottom:0.3vw solid transparent;
      // border-left:0.3vw solid transparent;
    }
  }
  .content{
    overflow: hidden;
    height: 100vh;
    .toggleBar{
      height:30px;
      background: #4b5163;
      i{
        font-size: 1.6vh;
        color:#8e97a2;
        transition: all 300ms ease-in-out 0s;
        &.active{
          transform: rotate(-90deg);
        }
      }
    }
    .s-subbar {
      &::-webkit-scrollbar{display: none}
      overflow-x: hidden;
      overflow-y: auto;
      height: calc(~"88vh - 100px");
      width:11vw;
      min-width: 150px;
      .s-li {
        cursor: pointer;
        height: 5.5vh;
        background: #333744;
        font-size: 1.6vh;
        padding: 0 1.2vw;
        letter-spacing: 1px;
        transition: all 300ms ease-in-out 0s;
        i {
          font-size: 2vh;
          margin-right: 1.2vw;
          color: #aeb9c1;
        }
        &:hover {
          background: #4b5163;
        }
        &.active{
          background: #409EFF;
          i{
            color: white;
          }
        }
      }
      .s-head {
        font-size: 1.7vh;
        font-weight: 500;
        background: #43495b;
        i {
          font-size: 1.6vh;
          margin-right: 1.2vw;
          margin-left:0.1vw;
          color: white;
          transition: all 300ms ease-in-out 0s;
          &.active{
            transform: rotate(90deg);
          }
        }
        // &:hover {
        //   background: #409EFF;
        // }
      }
      .s-list {
        overflow: hidden;
        max-height:0;
        transition: all 300ms ease-in-out 0s;
        &.active{
          max-height: 1000px;
        }
      }
    }
    .container-head {
      font-size: 2.3vh;
      font-weight: 600;
      color: white;
      // background: #161d20;
      height: 60px;
      font-style: italic;
      text-shadow: 0 0 1px #333;
    }

    .h_menu-bottom {
      height: 12vh;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      div {
        margin-top: 10px;
        font-size: 12px;
      }
    }
  }
}
</style>
