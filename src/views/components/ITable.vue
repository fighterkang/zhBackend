<template>
  <div class="h-table-container">
    <ul class="h-table_ul h-table-head box">
      <li class="box box-item" style="width:50px;" @click.stop v-if="canCheck">
        <el-checkbox v-model="checkedAll" @change="checkAll"></el-checkbox>
      </li>
      <li class="box box-item box-col-flex" v-for="(item, key3) of showList" :key="key3" :data-type="item" :class="{account: item==='account'}">{{ getTableName(item) }}</li>
      <!-- <li class="box box-item box-col-flex" v-if="$route.name === 'adminList'" data-type="power">权限</li> -->
      <li class="box box-item box-col-flex" v-if="showAction" style="width:50px;">操作</li>
    </ul>
    <ul v-for="(item,key) of tableData" :key="key" :tableKey="$route.name" class="h-table_ul h-table-td box" @click="clickTable(item)" @contextmenu.prevent="contextMenuOpen($event, key, item)"> 
      <li class="box box-item" style="width:50px;" @click.stop v-if="canCheck">
        <el-checkbox v-model="checkedBox[key]" @change="changeCheck"></el-checkbox>
      </li>
      <li class="box box-item box-col-flex" v-for="(single, key2) of showList" :key="key2" :data-type="single" >
        <div v-if="getTableValue(item, single).type==='image' && getTableValue(item, single).value.indexOf('http')!==-1" class="box box-wrap">
          <img @click.stop="playImage(getTableValue(item, single).value)" :src="getTableValue(item, single).value" style="height:44px;width:44px;">
        </div>
        <div v-else-if="getTableValue(item, single).type==='tag'" class="box box-wrap">
          <div class="h-tag cursor" :data-status="getTableValue(item, single).status">
            {{ getTableValue(item, single).value }}
          </div>
        </div>
        <div v-else-if="getTableValue(item, single).type==='video'" class="box box-wrap">
          <i class="iconfont h-video" @click="playVideo(getTableValue(item, single).value)">&#xe609;</i>
        </div>
        <div v-else-if="getTableValue(item, single).type==='arr' && getTableValue(item, single) && $Helper.isType(getTableValue(item, single).value, [])" class="box box-wrap">
          <div v-for="(arrItem, arrKey) in getTableValue(item, single).value" :key="arrKey" class="h-tag cursor box box-item" :data-status="arrItem.status" @click.stop="modifyTwoClass(arrItem)">
            {{ arrItem.courseClassName }}
            <i class="iconfont" @click.stop="deleteTwoClass(arrItem)">&#xe612;</i>
          </div>
        </div>
        <p v-else>{{ getTableValue(item, single).value }}</p>
      </li>
      <!-- <li class="box-col-flex td" v-if="$route.name === 'adminList'" data-type="power" @click.stop>
        <el-checkbox v-model="item.role_reward">接受打赏</el-checkbox>
        <el-checkbox v-model="item.role_exchange">交流中心操作权限</el-checkbox>
        <el-checkbox v-model="item.role_match">游戏中心操作权限</el-checkbox>
        <el-checkbox v-model="item.role_comment">评论操作权限</el-checkbox>
        <el-checkbox v-model="item.role_matchpost">比赛中心发帖权限</el-checkbox>
      </li> -->
      <li class="box box-item box-col-flex" v-if="showAction" style="width:50px;">
        <div class="box box-wrap">
          <div class="h-default-btn" data-type="premary" @click.stop="item3.fn(item)" v-for="(item3,key3) in actionArr" :key="key3">{{ item3.text }}</div>
        </div>
      </li>
    </ul>
    <context-menu id="contextMenu" ref="contextMenu">
      <li>编辑</li>
      <li class="disabled">编辑选中所有行</li>
    </context-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import table from '@/config/table'
import router from '@/router'
import _ from 'lodash'
import contextMenu from 'vue-context-menu'
export default {
  components: {
    contextMenu,
  },
  data() {
    return {
      canCheck: false,
      checkedAll: false,
      checkedBox: [],
    }
  },
  props: [
    'tableData', 'tableIn', 'singleCount', 'showList', 'tableIn', 'showAction', 'actionArr', 'tableKey'
  ],
  computed: {
    ...mapState('basic', [
      'basic',
    ])
  },
  watch: {
    tableData() {
      this.initCheckbox()
    }
  },
  created() {
    this.initCheckbox()
  },
  methods: {
    initCheckbox(canCheck = false) {
      this.canCheck = canCheck
      this.checkedAll = false
      this.checkedBox = this.tableData.map(() => false)
    },
    isChecked(key) {
      return this.checkedBox.indexOf(key) !== -1
    },
    changeCheck() {
      this.checkedAll = this.checkedBox.length === this.tableData.length && this.checkedBox.indexOf(false) === -1
    },
    checkAll() {
      let handle = this.checkedBox.length === 0 || (this.checkedBox.length!==0 && this.checkedBox.indexOf(false) !== -1)
      this.tableData.map((item, key) => this.checkedBox[key] = handle)
    },
    clickTable(item) {
      const openMenuArr = this.getOpenMenuConfig(item)[this.tableKey]
      if (this.$Helper.isType(openMenuArr, []) && openMenuArr.length > 0 && this.$Helper.isType(openMenuArr[0].event, () => {})) {
        openMenuArr[0].event.call(this)
      }
    },
    modifyTwoClass(info) {
      this.$store.dispatch('slidemodel/show', { status: 'AddClass', params: info })
    },
    deleteTwoClass(info) {
      this.$store.dispatch('modelbox/show', {
        status: 'comfirm',
        config: {
          title: `删除分类`,
          text: `确认要删除该二级分类吗？`,
          fn: () => {
            this.$Helper.ajax({ url: 'manage/course/delCourseClass',params: { classId: info.id },method: 'GET'}).then(
              ({ message }) => {
                this.$store.dispatch('toast/update', { type: 'success', content: message, time: 2000 })
                this.$store.dispatch('editerReload')
              }
            )
          },
        }
      })
    },
    getMultiple(params = 'id') {
      return this.tableData.filter((item, key) => this.checkedBox[key]).map(m => m[params])
    },
    showContextmenu(row, event) {
      event.preventDefault()
      this.$refs.table.toggleRowSelection(row, true)
      this.$refs.contextMenu.open(event, row)
    },
    getOpenMenuConfig(info) {
      return {
        Loop: [
          {
            text: '编辑',
            event: () => {
              this.$store.dispatch('slidemodel/show', { status: 'AddLoop', params: info })
            },
          },
          {
            text: ['启用', '禁用'][info.status],
            event: () => {
              this.$store.dispatch('modelbox/show', {
                status: 'comfirm',
                config: {
                  title: `${['启用', '禁用'][info.status]}轮播`,
                  text: `确认要${['启用', '禁用'][info.status]}该轮播吗？`,
                  fn: () => {
                    this.$Helper.ajax({ url: 'manage/setShuffling',params: { id: info.id, type: [3, 1][info.status] },method: 'POST'}).then(
                      (response) => {
                        this.$store.dispatch('toast/update', { type: 'success', content: `已${['启用', '禁用'][info.status]}`, time: 2000 })
                        this.$store.dispatch('editerReload')
                      }
                    )
                  },
                }
              })
            },
          },
          {
            text: '删除',
            event: () => {
              this.$store.dispatch('modelbox/show', {
                status: 'comfirm',
                config: {
                  title: `删除轮播`,
                  text: `确认要删除该轮播吗？`,
                  fn: () => {
                    this.$Helper.ajax({ url: 'manage/setShuffling',params: { id: info.id, type: 2 },method: 'POST'}).then(
                      (response) => {
                        this.$store.dispatch('toast/update', { type: 'success', content: `已删除`, time: 2000 })
                        this.$store.dispatch('editerReload')
                      }
                    )
                  },
                }
              })
            },
          },
        ],
        Lesson: [
          {
            text: '删除',
            event: () => {
              this.$store.dispatch('modelbox/show', {
                status: 'comfirm',
                config: {
                  title: `删除课程`,
                  text: `确认要删除该课程吗？`,
                  fn: () => {
                    this.$Helper.ajax({ url: 'manage/course/delCourse',params: { courseId: info.id },method: 'GET'}).then(
                      ({ message }) => {
                        this.$store.dispatch('toast/update', { type: 'success', content: message, time: 2000 })
                        this.$store.dispatch('editerReload')
                      }
                    )
                  },
                }
              })
            },
          },
        ],
        ClassList: [
          {
            text: '编辑分类',
            event: () => {
              this.$store.dispatch('slidemodel/show', { status: 'AddClass', params: info })
            }
          },
          {
            text: '新增二级分类',
            event: () => {
              this.$store.dispatch('slidemodel/show', { status: 'AddClass', params: { pid: info.id } })
            }
          },
          {
            text: '删除分类',
            event: () => {
              this.$store.dispatch('modelbox/show', {
                status: 'comfirm',
                config: {
                  title: `删除分类`,
                  text: `确认要删除该分类吗？`,
                  fn: () => {
                    this.$Helper.ajax({ url: 'manage/course/delCourseClass',params: { classId: info.id },method: 'GET'}).then(
                      ({ message }) => {
                        this.$store.dispatch('toast/update', { type: 'success', content: message, time: 2000 })
                        this.$store.dispatch('editerReload')
                      }
                    )
                  },
                }
              })
            },
          },
        ],
        User: [
          {
            text: '选择角色',
            event: () => {
              // 首先获取权限
              this.$Helper.ajax({
                url: `manage/getUserRole`,
                method: 'GET',
                params: {
                  userId: info.id,
                }
              }).then(
                ({ message, status, data }) => {
                  if (status === 1) {
                    let { userRole } = data
                    let user_role = userRole.map(role => role.id)
                    this.$store.dispatch('modelbox/show', {
                      status: 'editPermission',
                      params: { ...data, userRole: user_role, userId: info.id },
                    })
                  } else {
                    console.log('获取所有权限失败')
                  }
                }
              )
            }
          },
          {
            text: '删除',
            event: () => {
              this.$store.dispatch('modelbox/show', {
                status: 'comfirm',
                config: {
                  title: `删除管理员`,
                  text: `确认要删除该管理员吗？`,
                  fn: () => {
                    this.$Helper.ajax({ url: 'manage/delUser',params: { userId: info.id },method: 'POST'}).then(
                      ({ message }) => {
                        this.$store.dispatch('toast/update', { type: 'success', content: message, time: 2000 })
                        this.$store.dispatch('editerReload')
                      }
                    )
                  },
                }
              })
            },
          },
        ],
        Role: [
          {
            text: '编辑权限',
            event: () => {
              this.$store.dispatch('slidemodel/show', { status: 'ModifyPermission', type: 'slide-bottom', params: info })
            },
          },
          {
            text: '删除',
            event: () => {
              this.$store.dispatch('modelbox/show', {
                status: 'comfirm',
                config: {
                  title: `删除角色`,
                  text: `确认要删除该角色吗？`,
                  fn: () => {
                    this.$Helper.ajax({ url: 'manage/delRole',params: { roleId: info.id },method: 'GET'}).then(
                      ({ message }) => {
                        this.$store.dispatch('toast/update', { type: 'success', content: message, time: 2000 })
                        this.$store.dispatch('editerReload')
                      }
                    )
                  },
                }
              })
            },
          },
        ],
        Apply: [
          {
            text: '通过申请',
            event: () => {
              this.$store.dispatch('modelbox/show', {
                status: 'comfirm',
                config: {
                  title: `讲师申请`,
                  text: `确认要通过该申请吗？`,
                  fn: () => {
                    this.$Helper.ajax({ url: `manage/officalteachapplypass?id=${info.id}`, method: 'POST'}).then(
                      ({ message }) => {
                        this.$store.dispatch('toast/update', { type: 'success', content: message, time: 2000 })
                        this.$store.dispatch('editerReload')
                      }
                    )
                  },
                }
              })
            },
          },
          {
            text: '驳回申请',
            event: () => {
              this.$store.dispatch('modelbox/show', {
                status: 'comfirm',
                config: {
                  title: `讲师申请`,
                  text: `确认要驳回该申请吗？`,
                  fn: () => {
                    this.$Helper.ajax({ url: `manage/officalteachapplyfailed?id=${info.id}`, method: 'POST'}).then(
                      ({ message }) => {
                        this.$store.dispatch('toast/update', { type: 'success', content: message, time: 2000 })
                        this.$store.dispatch('editerReload')
                      }
                    )
                  },
                }
              })
            },
          },
        ],
        Activity: [
          {
            text: '通过申请',
            event: () => {
              this.$store.dispatch('modelbox/show', {
                status: 'comfirm',
                config: {
                  title: `活动申请`,
                  text: `确认要通过该申请吗？`,
                  fn: () => {
                    this.$Helper.ajax({ url: `manageActivity/upActivityType`, method: 'POST', params: { id: info.id, activityType: 2 }}).then(
                      ({ message }) => {
                        this.$store.dispatch('toast/update', { type: 'success', content: message, time: 2000 })
                        this.$store.dispatch('editerReload')
                      }
                    )
                  },
                }
              })
            },
          },
          {
            text: '驳回申请',
            event: () => {
              this.$store.dispatch('modelbox/show', {
                status: 'comfirm',
                config: {
                  title: `活动申请`,
                  text: `确认要驳回该申请吗？`,
                  fn: () => {
                    this.$Helper.ajax({ url: `manageActivity/upActivityType`, method: 'POST', params: { id: info.id, activityType: 3 }}).then(
                      ({ message }) => {
                        this.$store.dispatch('toast/update', { type: 'success', content: message, time: 2000 })
                        this.$store.dispatch('editerReload')
                      }
                    )
                  },
                }
              })
            },
          },
        ],
        ForumLoop: [
          {
            text: '编辑',
            event: () => {
              this.$store.dispatch('slidemodel/show', { status: 'AddFourmLoop', params: info })
            },
          },
          {
            text: '删除',
            event: () => {
              this.$store.dispatch('modelbox/show', {
                status: 'comfirm',
                config: {
                  title: `删除轮播`,
                  text: `确认要删除该轮播吗？`,
                  fn: () => {
                    this.$Helper.ajax({ url: 'BackBanner.UpdateBanner', urlType: 'bbs',params: { id: info.id, status: 0 },method: 'GET'}).then(
                      (response) => {
                        this.$store.dispatch('toast/update', { type: 'success', content: `已删除`, time: 2000 })
                        this.$store.dispatch('editerReload')
                      }
                    )
                  },
                }
              })
            },
          },
        ],
        ForumPost: [
          {
            text: '查看',
            event: () => {
              this.$store.dispatch('slidemodel/show', { status: 'PostDetail', params: info, type: 'slide-bottom' })
            },
          },
          {
            text: '删除',
            event: () => {
              this.$store.dispatch('modelbox/show', {
                status: 'comfirm',
                config: {
                  title: `删除轮播`,
                  text: `确认要删除该轮播吗？`,
                  fn: () => {
                    // this.$Helper.ajax({ url: 'BackBanner.UpdateBanner', urlType: 'bbs',params: { id: info.id, status: 0 },method: 'GET'}).then(
                    //   (response) => {
                    //     this.$store.dispatch('toast/update', { type: 'success', content: `已删除`, time: 2000 })
                    //     this.$store.dispatch('editerReload')
                    //   }
                    // )
                  },
                }
              })
            },
          },
        ],
      }
    },
    contextMenuOpen(e, key, info) {
      const openMenu = (status, items) => {
        if (status && items && items.length > 0) {
          // 如果有批量操作需求
          for (let i in items) {
            if (items[i].multiple) {
              items.push({
                text: this.canCheck ? '取消选择' : '批量选择',
                multiple: true,
                event: () => {
                  this.initCheckbox(!this.canCheck)
                },
              })
              break
            }
          }
          let { x, y } = e
          this.$store.dispatch('contextmenu/update', { 
            status: true,
            position: [y + 5, x + 5],
            items,
            isMultiple: this.canCheck
          })
        }
      }
      const openMenuConfig = this.getOpenMenuConfig(info)
      openMenu(this.tableKey, openMenuConfig[this.tableKey])
    },
    // showImage(item, single) {
    //   let url = this.getTableValue(item, single)
    //   return (single === 'photo' && url.indexOf('http://')!==-1) || this.isImage(url)
    // },
    getTableName(name) {
      let returnName = table[name]
      if (name === 'content' && this.$route.name === 'rejectRecord') returnName = '驳回理由'
      return returnName
    },
    deal(type, item) {
      this.$store.dispatch('modelbox/show', { status: type, params: { game_id: item.id } })
    },
    isImage(src) {
     return /^(http:\/\/)(\w+.)+(.png|.jpg|.gif|.bmp|.thumb)$/.test(src)
    },
    getTableValue(item, single) {
      // console.log(single, item)
      let value = item[single]
      let type = 'string'
      let status
      if (['online', 'doorOpened', 'fault'].indexOf(single)!==-1) {
        let statusConfig = {
          'fault': ['error', 'primary']
        }
        let statusArr = statusConfig[single] || ['primary', 'error']
        status = statusArr[value ? 0 : 1]
        value = value ? '是' : '否'
        type = 'tag'
      } else if (['status'].indexOf(single)!==-1) {
        type = 'tag'
        status = value === 1 || value == '1' ? 'primary' : 'error'
        value = value === 1 || value == '1' ? '启用' : '禁用'
      } else if (['type'].indexOf(single)!==-1 && this.$route.name === 'Apply') {
        let statusConfig = ['未处理', '已通过', '已驳回']
        let typeConfig = ['info', 'primary', 'error']
        type = 'tag'
        status = typeConfig[value]
        value = statusConfig[value]
      } else if (['type'].indexOf(single)!==-1 && this.$route.name === 'ForumLoop') {
        let statusConfig = ['', '帖子', '', '网页']
        type = 'tag'
        status = 'info'
        value = statusConfig[value]
      } else if (['activityType'].indexOf(single)!==-1) {
        let statusConfig = ['', '未处理', '已通过', '已驳回']
        let typeConfig = ['', 'info', 'primary', 'error']
        type = 'tag'
        status = typeConfig[value]
        value = statusConfig[value]
      } else if (['twoClass'].indexOf(single)!==-1) {
        type = 'tag'
        status = 'info'
      } else if (['addressType', 'category', 'brand', 'supplyer', 'item'].indexOf(single)!==-1) {
        value = _.get(value,'name')
      } else if (['img', 'imgUrl', 'ico', 'activityImg', 'consultImg', 'photo'].indexOf(single) !== -1) {
        type = 'image'
      } else if(['twoClassJpas'].indexOf(single) !== -1) {
        type = 'arr'
        value = value ? value.map(item => ({ ...item, type: 'tag', status: 'info' })) : []
      } else if (['video'].indexOf(single) !== -1) {
        value = _.get(value,'url')
        type = 'video'
      } else if (single === 'thumbnails') {
        value = _.get(value,'[0].url')
        type = 'image'
      } else if (single === 'device') {
        value = _.get(value,'[0].name')
      } else if (single === 'road') {
        value = _.get(value,'no')
      }
      return {
        value: !value && value!==0 ? '-' : value,
        type,
        status
      }
    },
    previewImage(src) {
      this.$store.dispatch('PreviewImage', {
        show: true,
        image: src,
      })
    },
    formatSeconds(value) {
      if(!value) return '-'
      let timeArr = [
        60*60*24*30*12, // year
        60*60*24*30, // month
        60*60*24, // day
        60*60, // hour
        60, // minte
        1,
      ]
      let name = ['年','个月','天','小时','分钟','秒']
      let sum = value
      let answer = ''
      timeArr.map((item, key) => {
        let caculate = parseInt(sum / item)
        if (caculate) answer += caculate + name[key]
        sum -= caculate * item
      })
      return answer
    },
    playVideo(url) {
      this.$store.dispatch('player/update', { status: true, url })
    },
    playImage(url) {
      this.$store.dispatch('PreviewImage', {
        show: true,
        image: url,
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.h-table-container {
  // border: 1px solid #d7d7d7;
}

.h-table_ul {
  padding: 0 10px;
  li {
    // border: 1px solid black;
    height: 7vh;
    // color: #666;
  }
}

.h-table-head {
  background: #e7e7e7;
  font-size: 2vh;
  color: #666;
  li{
    font-weight: 500;
  }
}

li.account {
  width: 12%;
  padding: 0 10px;
}

.h-table-td {
  color: #5a5e65;
  font-size: 1.6vh;
  background: #ffffff;
  border-top: 1px solid #f0f3fa;
  transition: all 300ms linear;
  li {
    height: 8vh;
    font-size: 1.6vh;
    img {
      height: 90%;
      margin-left: 5px;
    }
    p{
      text-align: center;
    }
  }
  &:hover{
    background: #f5f7fa;
  }
  // &:nth-child(odd) {
  //   background: #fafafa;
  // }
}

.h-table-td[tableKey="ClassList"] {
  li {
    height: 120px;
  }
}

li[data-type="twoClassJpas"] {
  width: 30vw;
}

.cursor {
  cursor: pointer;
}

// .h-table-td:nth-child(odd) {
//   background: #f3f2f2;
// }


.iconfont {
  font-size: 18px;
  font-weight: 600;
  color: #C0C0C0;
}


.h-default-btn {
  border: 1px solid #c1c1c1;
  padding: 1px 2px;
  min-width: 45px;
  text-align: center;
  font-size: 12px;
  color: #c1c1c1;
  border-radius: 2px;
  margin-right: 10px;
  cursor: pointer;
  margin-bottom: 6px;
}

.h-default-btn[data-type="premary"] {
  border-color: #409EFF;
  color: #409EFF;
}

.h-video{
  font-size:3vh;
  color:#888;
  cursor: pointer;
}

// li[data-type=""] {
//   height: 120px;
// }

// li[data-type="content"], li[data-type="goodsName"],li[data-type="articleName"] {
//   width: 120px;
//   padding: 0 20px; // overflow: hidden;
//   >p {
//     width: 100%;
//     display: -webkit-box;
//     text-align: center;
//     word-break: break-all;
//     overflow: hidden;
//     text-overflow: ellipsis;
//     -webkit-box-orient: vertical;
//     box-orient: vertical;
//     -webkit-line-clamp: 4;
//     line-clamp: 4;
//   }
// }
// li[data-type="addressID"] {
//   width: 140px;
//   padding: 0 20px; // overflow: hidden;
//   >p {
//     width: 100%;
//     text-align: center;
//     word-break: break-all;
//     font-size:12px;
//   }
// }

// li[data-type="elseOrderId"] {
//   width: 70px;
//   padding: 0 20px; // overflow: hidden;
//   >p {
//     width: 100%;
//     text-align: center;
//     word-break: break-all;
//     font-size:12px;
//   }
// }

// li[data-type="createTime"],
// li[data-type="updateTime"],
// li[data-type="account"] {
//   text-align: center;
// }

// li[data-type="orderId"] {
//   text-align: center;
//   padding:0 20px;
// }

// li[data-type="power"] {
//   width: 60px;
// }

// li[data-type="goodsClassModels"] {
//   width: 120px;
// }

// li.td[data-type="power"] {
//   padding-top: 10px;
//   padding-left: 40px;
//   .el-checkbox {
//     display: block;
//     font-size: 12px;
//   }
//   .el-checkbox+.el-checkbox {
//     margin: 3px 0;
//   }
// }

.iselect {
  position: absolute;
  top: 25px;
  left: 0;
  right: 0;
  margin: auto;
}

.ctx-menu{
  li{
    padding:10px;
    transition: all 300ms linear;
    &:hover{
      background: #f5f7fa;
    }
  }
}

</style>
