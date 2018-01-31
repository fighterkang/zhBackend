
import Vue from 'vue'
import apiConfig from '@/config/api'
import Router from '@/router'
import store from '@/store'
import Cookie from 'store'
import md5 from 'js-md5'
import 'whatwg-fetch';

import { UploaderBuilder } from 'qiniu4js'
const THIS = new Vue()
const { dispatch } = store
const Helper = {
  isTest() {
    return process.env.NODE_ENV !== 'production'
  },
  preSetParams(params) {
    let newData = {}
    for (let i in params) {
      if (params[i] !== null && params[i] !== undefined && params[i] !== '') {
        newData[i] = _.trim(params[i])
      }
    }
    return newData
  },
  ajax({ params = {}, method = 'POST', url, urlType = 'api' }) {
    if (!url) throw new Error('Ajax error,without url!')
    let basicCookie = Helper.getCookie('basic')
    let accesstoken = _.get(!basicCookie ? {} : JSON.parse(basicCookie), 'token')
    params = method === 'GET' && accesstoken ? Object.assign(params, { accesstoken }) : params
    url = apiConfig[urlType] + url
    return new Promise((resolve, reject) => {
      THIS.$http(
        {
          method,
          url,
          params: method === 'GET' ? params : { accesstoken },
          body: method === 'POST' ? JSON.stringify(params) : {},
          // headers: {
          //   'Content-Type': 'application/json',
          // },
        }
      ).then(
        ({ bodyText = '{}' }) => {
          let data = JSON.parse(bodyText)
          if (data.status === 10005) {
            Router.push({ name: 'Login' })
            dispatch('toast/update', { content: data.msg || '登录信息有误', long: 2000 })
          } else {
            resolve(data)
          }
        },
        () => {
          dispatch('toast/update', { content: '网络繁忙，请稍候再试', long: 2000 })
          reject()
        },
      )
    })
  },
  // fetch({ params = {}, method = 'POST', url, category}) {
  //   const methodArr = ['POST', 'GET', 'PUT', 'DELETE']
  //   return new Promise((resolve, reject) => {
  //     if (!url) reject(new Error('Fetch error:without url!'))
  //     if (methodArr.indexOf(method.toUpperCase()) === -1) reject(new Error('Fetch error:unsuport method!'))
  //     if (method === 'GET') {
  //       let paramsArray = [];
  //       Object.keys(params).forEach(key => {
  //         if (params[key]!==undefined) paramsArray.push(key + '=' + params[key])
  //       })
  //       if (paramsArray.length > 0) {
  //         if (url.search(/\?/) === -1) {
  //           url += '?' + paramsArray.join('&')
  //         } else {
  //           url += '&' + paramsArray.join('&')
  //         }
  //       }
  //     }
  //     let option = { 
  //       method,
  //       credentials: 'include',
  //       body: ['POST', 'PUT', 'DELETE'].indexOf(method) !== -1 ? !Helper.isType(params, '') && category !== 'file' ? JSON.stringify(params) : params : null,
  //     }
  //     console.log(apiConfig['api'] + url)
  //     fetch(
  //       apiConfig['api'] + url,
  //       option
  //     )
  //     .then((response) => {
  //       return response
  //         .json()
  //         .then((data = {}) => {
  //           if (response.status >= 200 && response.status < 300) {
  //             resolve(data)
  //           } else {
  //             reject(data)
  //           }
  //         })
  //         .catch((e) => {
  //           if (response.status === 500) {
  //             reject(new Error('code 500'))
  //           }
  //           if (response.status === 200) resolve({status: 200})
  //           if (response.status) reject(e)
  //         });
  //     })
  //     .catch(err => reject(err));
  //   })
  // },
  formatTime(time) {
    let timeBetween = (new Date().getTime() - new Date(time.replace(/-/g, '/')).getTime()) / 1000      // 秒
    let returnData
    if (timeBetween < 15) {
      returnData = '刚刚'
    } else if (timeBetween >= 15 && timeBetween < 60) {
      returnData = parseInt(timeBetween) + '秒前'
    } else if (timeBetween >= 60 && timeBetween < 3600) {
      returnData = parseInt(timeBetween / 60) + '分钟前'
    } else if (timeBetween >= 3600 && timeBetween < 86400) {
      returnData = parseInt(timeBetween / 3600) + '小时前'
    } else if (timeBetween >= 86400 && timeBetween < 2592000) {
      returnData = parseInt(timeBetween / 86400) + '天前'
    } else if (timeBetween >= 2592000 && timeBetween < 31104000) {
      returnData = parseInt(timeBetween / 2592000) + '月前'
    } else if (timeBetween > 31104000) {
      returnData = time
    }
    return returnData
  },
  getCookie(key) {
    return Cookie.get(key)
  },
  setCookie(key, data) {
    if (key === 'basic') {
      dispatch('basic/setLoginData', data)
    }
    data = JSON.stringify(data)
    Cookie.set(key, data, { expires: 0.04 })
  },
  clearCookie() {
    Cookie.clearAll()
  },
  emitAction(type, data) {
    THIS.$emit(type, data)
  },
  onAction(type, callback) {
    THIS.$on(type, callback)
  },
  pushRoute(params) {
    params = typeof params === 'object' ? params : { name: params }
    Router.push(params)
  },
  getTime() {
    return new Date().getTime()
  },
  testParamsComplete({ params = {}, except = [], contain = [] }) {
    let obj = !_.isEmpty(contain) ? contain : params
    let emptyArr = []
    let isEmpty = (o) => {
      return (typeof(o) === 'object' && _.isEmpty(o)) || (typeof(o) === 'string' && _.trim(o) === '') || _.isUndefined(o)
    }
    for (let i in obj) {
      let key = _.isEmpty(contain) ? i : obj[i]
      let item = params[key]
      if (isEmpty(item) && except.indexOf(key) === -1) emptyArr.push(key)
    }
    return emptyArr
  },
  isArray: (obj) => {
    return Object.prototype.toString.call(obj) === '[object Array]'
  },
  isNumber: (value, isPlus = false) => {
    return isPlus ? /^\d.?\d+$/.test(value) : /^-?\d.?\d+$/.test(value)
  },
  isType(obj1, obj2) {
    return Object.prototype.toString.call(obj1) === Object.prototype.toString.call(obj2)
  },
  getData(ob, str) {       // only object
    if (!this.isType(ob, {})) {
      return undefined
    }
    if (!this.isType(str, '')) {
      return undefined
    }
    let value = ob
    let getParams = (obj, arr) => {
      if (this.isType(obj[arr[0]], undefined) || this.isType(obj[arr[0]], null)) {
        return undefined
      } else {
        if (arr.length > 1) {
          let s = value[arr.shift()]
          return getParams(s, arr)
        } else {
          return obj[arr[0]]
        }
      }
    }
    return getParams(value, str.split('.'))
  },
  initUploadImage(btnId, success = () => {}, key) {
    // get upliod token and url
    Helper.ajax({
      url: 'qiniu/getToken',
      method: 'GET',
    }).then(({data}) => {
      this.uptokenData = data
      this.createUpload({
        ...data,
        btnId,
        success,
        key,
      })
    })
  },
  createUpload({ btnId, token, cdnUrl, success = () => { console.log('withOut callback Fn!') }, key = `defaultImageKey_${Helper.getTime()}` }) {
    // 创建上传对象
    new UploaderBuilder()
    .debug(true)
    .button(btnId)
    .domain({http: 'http://up-z2.qiniu.com'})
    .retry(0)
    .chunk(true)
    .scale([1000, 0])
    .auto(true)
    .multiple(true)
    .accept(['image/*', 'video/*'])
    .tokenShare(true)
    .tokenFunc((setToken, task) => {
      setToken(token)
    })
    .listener({
      onReady(tasks) {
        // console.log('onReady', tasks)
      },
      onStart(tasks) {
        dispatch(`loading/update`, {
          status: true,
          text: `开始上传...`,
        })
      },
      onTaskGetKey: () => {
        return key
      },
      onTaskProgress: (task) => {
        dispatch('loading/update', {
          status: true,
          text: `正在上传, 进度${task.progress}%`,
        })
      },
      onTaskSuccess: (task) => {
        success(cdnUrl + '/' + task.result.key)
      },
      onFinish(tasks) {
        dispatch(`loading/update`, {
          status: false,
        })
      },
    })
    .build()
  },
  initEditor(editorSelector) {
    let editor = new Weditor(editorSelector)
    editor.customConfig.zIndex = 10
    editor.customConfig.menus = [
      'head',  // 标题
      'bold',  // 粗体
      'italic',  // 斜体
      'underline',  // 下划线
      'strikeThrough',  // 删除线
      'foreColor',  // 文字颜色
      'backColor',  // 背景颜色
      'link',  // 插入链接
      // 'list',  // 列表
      'justify',  // 对齐方式
      'quote',  // 引用
      // 'emoticon',  // 表情
      // 'image',  // 插入图片
      'table',  // 表格
      // 'video',  // 插入视频
      'code',  // 插入代码
      'undo',  // 撤销
      'redo',  // 重复
    ]
    editor.create()
    // 创建编辑器
    return editor
  },
}
export default Helper