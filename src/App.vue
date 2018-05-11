<template>
  <div id="app">
    <IToast/>
    <IModelBox/>
    <IImagePreview/>
    <ILoading/>
    <IContextMenu/>
    <ISlideModel/>
    <IPlayer/>
    <router-view></router-view>
  </div>
</template>

<script>
import IToast from './views/components/IToast'
import IContextMenu from './views/components/IContextMenu'
import IModelBox from './views/components/IModelBox'
import IImagePreview from './views/components/IImagePreview'
import ILoading from './views/components/ILoading'
import ISlideModel from './views/components/ISlideModel'
import IPlayer from './views/components/IPlayer'
export default {
  name: 'app',
  components: {
    IToast,
    IModelBox,
    IImagePreview,
    ILoading,
    IContextMenu,
    ISlideModel,
    IPlayer,
  },
  methods: {
  },
  created() {
  },
  computed: {
  },
  watch: {
    '$route'() {
      this.$store.dispatch('modelbox/close')
    },
  },
}
</script>

<style lang="less">
// @import url('./public/css/app.less');
.router-view {
  position: absolute;
  /*transition: all .5s cubic-bezier(.55, 0, .1, 1);*/
  transition: all .2s linear;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.fade-enter-active,
.fade-leave-active {
  opacity: 1
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

.scale-small-enter,
.scale-large-leave-active {
  opacity: 0;
  -webkit-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
  -webkit-transform: scale(1.2, 1.2);
  transform: scale(1.2, 1.2);
}

.scale-small-leave-enter,
.scale-large-enter {
  opacity: 0;
  -webkit-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
  -webkit-transform: scale(0.9, 0.9);
  transform: scale(0.9, 0.9);
}

















/*定义基础类*/

*,
body,
p {
  margin: 0;
  padding: 0;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-weight: 400;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  // -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

html,
body {
  height: 100%;
  overflow: hidden;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
}

div {
  font-size: 16px;
}

/*去掉input自动补全后的黄色样式*/  
input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active {  
  -webkit-transition-delay: 99999s;  
  -webkit-transition: color 99999s ease-out, background-color 99999s ease-out;
}

@font-face {
  font-family: 'iconfont';  /* project id 307577 */
  src: url('//at.alicdn.com/t/font_307577_f7xll9gui85b3xr.eot');
  src: url('//at.alicdn.com/t/font_307577_f7xll9gui85b3xr.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_307577_f7xll9gui85b3xr.woff') format('woff'),
  url('//at.alicdn.com/t/font_307577_f7xll9gui85b3xr.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_307577_f7xll9gui85b3xr.svg#iconfont') format('svg');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}



.h-input {
  display: block;
  background: transparent;
  box-shadow: none;
  outline: none;
  border: 1px solid #cfdadd;
  color: #333;
  font-size: 14px;
  padding: 6px 10px;
  border-radius: 2px;
  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  line-height: 120%;
  &:focus{
    border: 1px solid #409EFF;
  }
  &:disabled{
    border: 1px solid #f0f0f0;
    background: #fafafa;
    opacity: .8;
  }
}

.h-label {
  color: #5d5e5e;
  font-size: 14px;
  font-weight: bold;
}

.h-link {
  color: #409EFF;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  &.error{
    color:#5d5e5e;
  }
}

.no-touch {
  pointer-events: none;
}

.cursor {
  cursor: pointer;
}

.bac-image {
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}


.h-tag {
  background: #ecf0f1;
  display: inline-block;
  height: 22px;
  line-height: 23px;
  padding: 0 6px;
  border-radius: 22px;
  // cursor: pointer;
  font-size: 12px;
  margin-right: 3px;
  margin-bottom: 5px;
  white-space: nowrap;
  min-width: 35px;
  text-align: center;
  color:#2c3e50;
  border:1px solid #2c3e50;
  &>.iconfont{
    font-size: 12px !important;
    color:inherit !important;
    margin-left:2px;
    position: relative;
    top:-1px;
  }
  &[data-status="error"]{
    background: #feeeee;
    color: #f75659;
    border-color: #fccfd0;
  }
  &[data-status="info"]{
    background: #fdf5e9;
    color: #eca942;
    border-color: #f9e3c2;
  }
  &[data-status="success"]{
    background: #d5edcb;
    color: #6ac044;
    border-color: #6ac044;
  }
  &[data-status="primary"]{
    background: #ecf5ff;
    color: #409EFF;
    border-color: #cbe4fe;
  }
}



.h-btn {
  border: 1px solid #ccd2d4;
  display: inline-block;
  height: 22px;
  line-height: 21px;
  padding: 0 5px;
  border-radius: 1px;
  cursor: pointer;
  margin-right: 3px;
  font-size: 12px;
}

.h-btn.md {
  height: 25px;
  line-height: 24px;
  padding: 0 10px;
}

.h-y-btn {
  height: 32px;
  width: 70px;
  border-radius: 26px;
  background: #81868c;
  color: white;
  font-size: 16px;
  cursor: pointer;
  line-height: 100%;
}

.ts-btn {
  background: #57adec;
  height: 5.2vh;
  width: 26vh;
  border-radius: .3vh;
  color: white;
  font-size: 2.2vh;
  margin-top: 3vh;
  cursor: pointer;
  font-weight: 600;
  letter-spacing: 2px;
}
.ts-btn.error{
  background: #fd4b4f;
}
.ts-btn:hover {
  opacity: .8;
}



.layer {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1000;
}


.no-touch {
  pointer-events: none;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  font-size: 16px;
  position: relative;
  // font-family: 'PingFangSC-Regular';
}



.box {
  display: -webkit-box;
  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
  display: -moz-box;
  /* 老版本语法: Firefox (buggy) */
  display: -ms-flexbox;
  /* 混合版本语法: IE 10 */
  display: -webkit-flex;
  /* 新版本语法: Chrome 21+ */
  display: flex;
  /* 新版本语法: Opera 12.1, Firefox 22+ */

  // 默认水平布局
  -moz-box-orient: horizontal; /*Firefox*/
  -webkit-box-orient: horizontal; /*Safari,Opera,Chrome*/
  box-orient: horizontal;
  flex-direction:row;
  -webkit-flex-direction:row;
}

// .box>div,
// .box>li,
// .box>ul,
// .box>h1,
// .box>p {
//   height: 100%;
// }
.box-x-center {
  -webkit-box-pack: center;
  -moz-justify-content: center;
  -webkit-justify-content: center;
  justify-content: center;
}

.box-x-left {
  -webkit-box-pack: start;
  -moz-justify-content: flex-start;
  -webkit-justify-content: flex-start;
  justify-content: flex-start;
}

.box-x-right {
  -webkit-box-pack: end;
  -moz-justify-content: flex-end;
  -webkit-justify-content: flex-end;
  justify-content: flex-end;
}

.box-y-center {
  -webkit-box-align: center;
  -moz-align-items: center;
  -webkit-align-items: center;
  align-items: center;
}

.box-y-bottom {
  -webkit-box-align: end;
  -moz-align-items: end;
  -webkit-align-items: flex-end;
  align-items: flex-end;
}

.box-item {
  -webkit-box-pack: center;
  -moz-justify-content: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -moz-align-items: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-flex: 1.0;
  -moz-flex-shrink: 0;
  -webkit-flex-shrink: 0;
  flex-shrink: 0;
}


.box-wrap {
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  -moz-box-lines: multiple; /*Firefox*/
  -webkit-box-lines: multiple; /*Safari,Opera,Chrome*/
  box-lines: multiple;
}
// 垂直排列
.box-row{
  -moz-box-orient: vertical; /*Firefox*/
  -webkit-box-orient: vertical; /*Safari,Opera,Chrome*/
  box-orient: vertical;
  flex-direction:column;
  -webkit-flex-direction:column;
}

.box-row-flex {
  -webkit-box-flex: 1.0;
  -moz-flex-grow: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  height: 1%;
}

.box-col-flex {
  -webkit-box-flex: 1.0;
  -moz-flex-grow: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 1%;
}

.box-space-bettwen{
  -webkit-box-pack: justify;
  -moz-justify-content: space-between;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -webkit-box-align: center;
  -moz-align-items: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-flex: 1.0;
  -moz-flex-shrink: 0;
  -webkit-flex-shrink: 0;
  flex-shrink: 0;
}

.box-col-1 {
  width: (1/12)*100%;
}

.box-col-2 {
  width: (2/12)*100%;
}

.box-col-3 {
  width: (3/12)*100%;
}

.box-col-4 {
  width: (4/12)*100%;
}

.box-col-5 {
  width: (5/12)*100%;
}

.box-col-6 {
  width: (6/12)*100%;
}

.box-col-7 {
  width: (7/12)*100%;
}

.box-col-8 {
  width: (8/12)*100%;
}

.box-col-9 {
  width: (9/12)*100%;
}

.box-col-10 {
  width: (10/12)*100%;
}

.box-col-11 {
  width: (11/12)*100%;
}

.box-col-12 {
  width: (12/12)*100%;
}

.box-offset-1 {
  margin-left: (1/12)*100%;
}

.box-offset-2 {
  margin-left: (2/12)*100%;
}

.box-offset-3 {
  margin-left: (3/12)*100%;
}

.box-offset-4 {
  margin-left: (4/12)*100%;
}

.box-offset-5 {
  margin-left: (5/12)*100%;
}

.box-offset-6 {
  margin-left: (6/12)*100%;
}

.box-offset-7 {
  margin-left: (7/12)*100%;
}

.box-offset-8 {
  margin-left: (8/12)*100%;
}

.box-offset-9 {
  margin-left: (9/12)*100%;
}

.box-offset-10 {
  margin-left: (10/12)*100%;
}

.box-offset-11 {
  margin-left: (11/12)*100%;
}

.box-x-center {
  -webkit-box-pack: center;
  -moz-justify-content: center;
  -webkit-justify-content: center;
  justify-content: center;
}

.box-y-center {
  -webkit-box-align: center;
  -moz-align-items: center;
  -webkit-align-items: center;
  align-items: center;
}

.half-x-line {
  height: 1px;
  background: #9b9b9b;
  transform-origin: 0 0;
  transform: scale(1, 0.2);
  -webkit-transform-origin: 0 0;
  -webkit-transform: scale(1, 0.2);
}

.half-y-line {
  width: 1px;
  height: 100%;
  background: #333;
  transform-origin: 0 0;
  transform: scale(.2, 1);
  -webkit-transform-origin: 0 0;
  -webkit-transform: scale(.2, 1);
}



// element

.el-range-input {
  width: 36% !important;
}
.el-date-editor .el-range-separator{
  color:#ccc !important;
}
</style>
