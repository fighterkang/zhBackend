export default {
  isType(obj1, obj2) {
    return Object.prototype.toString.call(obj1) === Object.prototype.toString.call(obj2)
  },
  get(ob, str) {       // only object
    if (!this.isType(ob, {})) {
      return undefined
    }
    if (!this.isType(str, '')) {
      return undefined
    }
    let value = ob
    let getParams = (obj, arr) => {
      if (this.isType(obj[arr[0]], undefined)) {
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
  clone() {

  },
}