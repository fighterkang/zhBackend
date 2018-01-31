<template>
  <div class="container">
    <div id="IModelBox" v-if="status && status!=='uploadImage'">
      <div class="layer" @click="closeModel"></div>
      <div id="IModelBox_container" :style="{top:modelConfig.top+'vh'}">
        <div class="box box-item" id="IModelBox_title">
          {{ modelConfig.title }}
          <i class="iconfont" @click="closeModel">&#xe600;</i>
        </div>
        <!--修改密码-->
        <div class="IModelBox-content changePassword" v-if="status === 'changePassword'">
          <div>
            原密码：
            <el-input type="password" v-model="changePassword.password">
            </el-input>
          </div>
          <div>
            新密码：
            <el-input type="password" v-model="changePassword.newpassword">
            </el-input>
          </div>
          <div>
            新密码确认：
            <el-input type="password" v-model="changePassword.repassword">
            </el-input>
          </div>
          <div class="box box-item" style="margin-top:30px;">
            <el-button style="margin-right:30px;" @click="closeModel" size="small">取消</el-button>
            <el-button type="primary" size="small" @click="changePasswordFn">确认</el-button>
          </div>
        </div>
        <!--提现信息-->
        <div class="IModelBox-content rechargeInfo" v-if="status === 'rechargeInfo'">
          <ul v-if="!params.error">
            <li class="box">
              <div class="h-label">用户姓名：</div>
              <div class="box box-item">{{ params.bankCardName }}</div>
            </li>
            <li class="box">
              <div class="h-label">用户ID：</div>
              <div class="box box-item">{{ params.userId }}</div>
            </li>
            <li class="box">
              <div class="h-label">身份证：</div>
              <div class="box box-item">{{ params.identityCard }}</div>
            </li>
            <li class="box">
              <div class="h-label">银行名称：</div>
              <div class="box box-item">{{ params.bankName }}</div>
            </li>
            <li class="box">
              <div class="h-label">银行卡号：</div>
              <div class="box box-item">{{ params.bankCardId }}</div>
            </li>
            <li class="box">
              <div class="h-label">银行地址：</div>
              <div class="box box-item">{{ params.bankAddress }}</div>
            </li>
            <li class="box">
              <div class="h-label">操作日期：</div>
              <div class="box box-item">{{ params.createTime ? params.createTime.substr(0, 10) : '' }}</div>
            </li>
          </ul>
          <div v-else class="box box-item" style="height:10vh;">
            {{ params.error }}
          </div>
          <div class="box box-item" style="margin-top:30px;">
            <el-button type="danger" size="small" @click="rechargeRefuse">驳回</el-button>
            <el-button type="primary" size="small" @click="rechargeComfirm" v-if="!params.error">打款</el-button>
          </div>
        </div>
        <!--编辑权限-->
        <div class="IModelBox-content editPermission" v-if="status === 'editPermission'">
          <ul>
            <li v-for="(item, key) in params.roleAll" :key="key" class="box box-y-center">
              <el-checkbox :checked="params.userRole.indexOf(item.id)!==-1" @change="changeRole(item.id)">{{ item.name }}</el-checkbox>
            </li>
          </ul>
          <div class="box box-item" style="margin-top:30px;">
            <el-button style="margin-right:30px;" @click="closeModel" size="small">取消</el-button>
            <el-button type="primary" size="small" @click="editRoleFn">确认</el-button>
          </div>
        </div>
        <!--推送消息-->
        <div class="IModelBox-content changePassword" v-if="status === 'pushMsg'">
          <div>
            标题：
            <el-input type="text" v-model="pushMsg.msgTitle">
            </el-input>
          </div>
          <div>
            内容：
            <el-input type="text" v-model="pushMsg.msgBody">
            </el-input>
          </div>
          <div>
            <div>透传类型：</div>
            <div class="box">
              <el-select v-model="pushMsg.transmissionType" placeholder="请选择">
                <el-option v-for="item in pushMsgTypeList" :key="item.key" :label="item.value" :value="item.key">
                </el-option>
              </el-select>
            </div>
          </div>
          <div v-if="pushMsg.transmissionType">
            {{ pushMsg.transmissionType===1 ? 'URL' : ( pushMsg.transmissionType===2 ? '文章ID' : '商品ID' ) }}:
            <el-input type="text" v-model="pushMsg.transmissionDetail">
            </el-input>
          </div>
          <div class="box box-item" style="margin-top:30px;">
            <el-button style="margin-right:30px;" @click="closeModel" size="small">取消</el-button>
            <el-button type="primary" size="small" @click="pushMegFn">确认</el-button>
          </div>
        </div>
        <!--新增管理员-->
        <div class="IModelBox-content changePassword" v-if="status === 'addAdmin'">
          <div>
            昵称：
            <el-input type="text" v-model="addAdmin.nickname">
            </el-input>
          </div>
          <div>
            手机号：
            <el-input type="text" v-model="addAdmin.phone">
            </el-input>
          </div>
          <div>
            邮箱：
            <el-input type="text" v-model="addAdmin.email">
            </el-input>
          </div>
          <div>
            密码：
            <el-input type="text" v-model="addAdmin.pswd">
            </el-input>
          </div>
          <div class="box box-item" style="margin-top:30px;">
            <el-button style="margin-right:30px;" @click="closeModel" size="small">取消</el-button>
            <el-button type="primary" size="small" @click="addAdminFn">确认</el-button>
          </div>
        </div>
        <!--常规确认框-->
        <div class="IModelBox-content comfirm" v-if="status === 'comfirm'">
          <div class="box box-item">{{ config.text }}</div>
          <div class="box box-item" style="margin-top:50px;" @click="closeModel">
            <el-button style="margin-right:30px;" type="primary" size="small" @click="config.fn">{{config.btnText || '确认'}}</el-button>
            <el-button size="small">取消</el-button>
          </div>
        </div>
        <!--常规prompt框-->
        <div class="IModelBox-content prompt" v-if="status === 'prompt'">
          <div class="box box-item">
            <el-input type="textarea" :rows="5" :placeholder="config.text" v-model="prompt.text">
            </el-input>
          </div>
          <div class="box box-item" style="margin-top:30px;" @click="closeModel">
            <el-button style="margin-right:30px;" size="small">取消</el-button>
            <el-button type="primary" size="small" @click="config.fn(prompt.text)">{{config.btnText || '确认'}}</el-button>
          </div>
        </div>
        <!--修改等级-->
        <div class="IModelBox-content changePassword" v-if="status === 'addLevel'">
          <div>
            等级名称：
            <el-input type="text" v-model="params.levelName">
            </el-input>
          </div>
          <div>
            折扣比例：
            <el-input type="number" v-model="params.levelDiscount">
            </el-input>
          </div>
          <div>
            所需金额：
            <el-input type="number" v-model="params.levelDeposit">
            </el-input>
          </div>
          <div>
            可领取数量：
            <el-input type="number" v-model="params.levelNum">
            </el-input>
          </div>
          <div class="box box-item" style="margin-top:30px;">
            <el-button style="margin-right:30px;" @click="closeModel" size="small">取消</el-button>
            <el-button type="primary" size="small" @click="levelFn">确认</el-button>
          </div>
        </div>
        <!--修改优惠券-->
        <div class="IModelBox-content addCard" v-if="status === 'addCard'">
          <div class="box">
            <div class="h-label box box-item">名称：</div>
            <el-input type="text" v-model="params.cardName">
            </el-input>
          </div>
          <div class="box">
            <div class="h-label box box-item">详情：</div>
            <el-input type="text" v-model="params.cardDetails">
            </el-input>
          </div>
          <div class="box">
            <div class="h-label box box-item">金额：</div>
            <el-input type="number" v-model="params.cardMoney" placeholder="输入优惠金额，正数">
            </el-input>
          </div>
          <div class="box">
            <div class="h-label box box-item">数量：</div>
            <el-input type="number" v-model="params.cardNum" placeholder="输入数字，-1代表不限">
            </el-input>
          </div>
          <div class="box">
            <div class="h-label box box-item">有效期：</div>
            <el-input type="number" v-model="addCard.cardOutTime" placeholder="输入有效天数，正数">
            </el-input>
          </div>
          <div class="box">
            <div class="h-label box box-item">类型：</div>
            <el-select v-model="params.type" placeholder="请选择">
              <el-option v-for="(item, key) in addCardList" :key="item.key" :label="item.value" :value="item.key">
              </el-option>
            </el-select>
          </div>
          <div class="box box-item" style="margin-top:30px;">
            <el-button style="margin-right:30px;" @click="closeModel" size="small">取消</el-button>
            <el-button type="primary" size="small" @click="addCardFn">确认</el-button>
          </div>
        </div>
        <!--修改角色-->
        <div class="IModelBox-content changePassword" v-if="status === 'addRole'">
          <div>
            角色名称：
            <el-input type="text" v-model="params.roleName">
            </el-input>
          </div>
          <div>
            角色类型：
            <el-input type="number" v-model="params.roleType">
            </el-input>
          </div>
          <div class="box box-item" style="margin-top:30px;">
            <el-button style="margin-right:30px;" @click="closeModel" size="small">取消</el-button>
            <el-button type="primary" size="small" @click="roleFn">确认</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Cookie from 'js-cookie'
import router from '@/router'
import store from '@/store'
import apiConfig from '@/config/api'
import tableConfig from '@/config/table'
import md5 from 'js-md5'
export default {
  components: {
  },
  data() {
    return {
      changePassword: null,
      addAdmin: null,
      pushMsg: null,
      addCard: null,
      resetData: {
        prompt: {
          text: null,
        },
        changePassword: {
          password: null,
          newpassword: null,
          repassword: null,
        },
        addAdmin: {
          nickname: null,
          phone: null,
          email: null,
          pswd: null,
        },
        pushMsg: {
          msgTitle: null,
          msgBody: null,
          transmissionDetail: null,
          transmissionType: 0,
        },
        addCard: {
          cardOutTime: null,
        }
      },
      pushMsgTypeList: [
        {
          key: 0,
          value: '无'
        },
        {
          key: 1,
          value: 'url'
        },
        {
          key: 2,
          value: '文章'
        },
        {
          key: 3,
          value: '商品'
        },
      ],
      addCardList: [
        {
          key: 1,
          value: '普通型'
        },
        {
          key: 2,
          value: '新用户赠送'
        },
        {
          key: 3,
          value: '老用户赠送'
        },
      ],
    }
  },
  created(to, from, next) {
    this.resetDataFn()
    this.$Helper.onAction('setUploadHeadImg', (url) => {
      this.addStaff.headimgurl = url
    })
  },
  computed: {
    ...mapState('modelbox', [
      'status',
      'params',
      'config',
    ]),
    ...mapState('basic', [
      'basic',
    ]),
    modelConfig() {
      let top, title
      switch (this.status) {
        case 'comfirm':
          top = 32
          title = this.config.title || '确认'
          break
        case 'prompt':
          top = 30
          title = this.config.title || '确认'
          break
        case 'addLevel':
          top = 25
          title = '等级操作'
          break
        case 'addRole':
          top = 25
          title = '新增角色'
          break
        case 'addCard':
          top = 10
          title = '优惠券操作'
          break
        case 'addAdmin':
          top = 18
          title = '新增管理员'
          break
        case 'modifyshuffling':
          top = 25
          title = '轮播操作'
          break
        case 'pushMsg':
          top = 18
          title = '推送消息'
          break
        case 'editPermission':
          top = 22
          title = '选择角色'
          break
        case 'rechargeInfo':
          top = 25
          title = '提现详情'
          break
        default:
          break
      }
      return { top, title }
    },
  },
  watch: {
    'params.cardOutTime'() {
      if (_.get(this, 'params.cardOutTime') !== undefined) {
        this.addCard = {
          cardOutTime: this.params.cardOutTime / (60*60*24),
        }
      }
    },
  },
  methods: {
    resetDataFn() {
      for (var i in this.resetData) {
        this[i] = Object.assign({}, this.resetData[i])
      }
    },
    closeModel() {
      this.resetDataFn()
      this.$store.dispatch('modelbox/close')
    },
    rechargeComfirm() {
      let orderId = this.params.orderId
      this.closeModel()
      setTimeout(() => {
        this.$store.dispatch('modelbox/show', {
          status: 'prompt',
          config: {
            title: '提现确认',
            text: '请输入备注信息',
            fn: (note) => {
              if (!note) {
                this.$store.dispatch('toast/update', { type: 'error', content: '请输入处理意见', time: 2000 })
                return
              }
              this.$Helper.ajax({
                url: 'manage/money/takeMoneyOn',
                params: {
                  orderId,
                  note,
                },
                success: ({ status, message, data }) => {
                  let type = 'info'
                  if (status === 1) {
                    type = 'success'
                    this.$store.dispatch('editerReload')
                  }
                  setTimeout(() => { this.closeModel() }, 800)
                  this.$store.dispatch('toast/update', { type, content: message, time: 2000 })
                },
              })
            },
          }
        })
      }, 100)
    },
    rechargeRefuse() {
      let orderId = this.params.orderId
      this.closeModel()
      setTimeout(() => {
        this.$store.dispatch('modelbox/show', {
          status: 'prompt',
          config: {
            title: '提现反驳',
            text: '请输入反驳理由',
            fn: (note) => {
              if (!note) {
                this.$store.dispatch('toast/update', { type: 'error', content: '请输入处理意见', time: 2000 })
                return
              }
              this.$Helper.ajax({
                url: 'manage/money/takeMoneyOff',
                params: {
                  orderId,
                  note,
                },
                success: ({ status, message, data }) => {
                  let type = 'info'
                  if (status === 1) {
                    type = 'success'
                    this.$store.dispatch('editerReload')
                  }
                  setTimeout(() => { this.closeModel() }, 800)
                  this.$store.dispatch('toast/update', { type, content: message, time: 2000 })
                },
              })
            },
          }
        })
      }, 100)
    },
    changePasswordFn() {
      if (!(this.changePassword.password && this.changePassword.newpassword)) {
        this.$store.dispatch('toast/update', { type: 'error', content: '请填写完整信息', time: 2000 })
        return
      }
      if (this.changePassword.newpassword !== this.changePassword.repassword) {
        this.$store.dispatch('toast/update', { type: 'error', content: '两次输入的密码不一致', time: 2000 })
        return
      }
      const _this = this
      this.$Helper.ajax({
        url: 'Open.ChangePWD',
        params: {
          pwd: this.changePassword.password,
          new_pwd: this.changePassword.newpassword,
        },
        success({ code, context }) {
          const { dispatch } = store
          dispatch('toast/update', { type: 'info', content: context, time: 2000 })
          if (code === 1) {
            _this.$store.dispatch('modelbox/show', 'passwordSuccess')
            setTimeout(() => { _this.closeModel() }, 2000)
          }
        },
      })
    },
    staffUploadImage() {
      this.$store.dispatch('ToggleUpload', true)
    },
    levelFn() {
      // 检测数据完整性
      let lackArr = this.$Helper.testParamsComplete({params: this.params})
      if (!_.isEmpty(lackArr)) {
        this.$store.dispatch('toast/update', { type: 'error', content: `请输入${ tableConfig[lackArr[0]] || lackArr[0] }信息`, time: 2000 })
      } else {
        // begin post
        this.$Helper.ajax({
          url: 'manage/user/updateLevel',
          params: this.params,
          success: ({ status, message }) => {
            let type = 'info'
            if (status === 1) {
              type = 'success'
              message = '保存成功'
              setTimeout(() => {
                this.closeModel()
              }, 800)
            }
            this.$store.dispatch('toast/update', { type, content: message, time: 2000 })
          },
        })
      }
    },
    roleFn() {
      // 检测数据完整性
      let lackArr = this.$Helper.testParamsComplete({params: this.params})
      if (!_.isEmpty(lackArr)) {
        this.$store.dispatch('toast/update', { type: 'error', content: `请输入${ tableConfig[lackArr[0]] || lackArr[0] }信息`, time: 2000 })
      } else {
        // begin post
        this.$Helper.ajax({
          url: 'manage/addRole',
          params: {
            name: this.params.roleName,
            type: this.params.roleType,
          },
          success: ({ status, message }) => {
            let type = 'info'
            if (status === 1) {
              type = 'success'
              message = '保存成功'
              this.$store.dispatch('editerReload')
              setTimeout(() => {
                this.closeModel()
              }, 800)
            }
            this.$store.dispatch('toast/update', { type, content: message, time: 2000 })
          },
        })
      }
    },
    addAdminFn() {
      // 检测数据完整性
      let lackArr = this.$Helper.testParamsComplete({params: this.addAdmin})
      if (!_.isEmpty(lackArr)) {
        this.$store.dispatch('toast/update', { type: 'error', content: `请输入${ tableConfig[lackArr[0]] || lackArr[0] }信息`, time: 2000 })
      } else {
        let params = { ...this.addAdmin,pswd: md5(this.addAdmin.pswd) }
        // begin post
        this.$Helper.ajax({
          url: 'manage/addUser',
          params,
          success: ({ status, message }) => {
            let type = 'info'
            if (status === 1) {
              type = 'success'
              message = '保存成功'
              setTimeout(() => {
                this.closeModel()
              }, 800)
            }
            this.$store.dispatch('toast/update', { type, content: message, time: 2000 })
          },
        })
      }
    },
    pushMegFn() {
      let { msgTitle, msgBody, transmissionType, transmissionDetail } = this.pushMsg
      if ( !msgTitle || !msgBody || ( transmissionType && !transmissionDetail )) {
        this.$store.dispatch('toast/update', { type:'error', content: '请输入完整内容', time: 2000 })
        return
      }
      let params = {
        userId: this.params.userId,
        msgTitle,
        msgBody
      }
      if (transmissionType) {
        params.transmission = {
          cmdId: parseInt(transmissionType) + 1,
          body: transmissionDetail
        }
      }
      this.$Helper.ajax({
        url: 'manage/pushMsg',
        params,
        success: ({ status, message }) => {
          let type = 'info'
          if (status === 1) {
            type = 'success'
            message = '推送成功'
            setTimeout(() => {
              this.closeModel()
            }, 800)
          }
          this.$store.dispatch('toast/update', { type, content: message, time: 2000 })
        },
      })
    },
    changeRole(id) {
      if (this.params.userRole.indexOf(id)!==-1) {
        this.params.userRole.map((item,key) => {
          if (item === id) this.params.userRole.splice(key, 1)
        })
      } else {
        this.params.userRole.push(id)
      }
    },
    editRoleFn() {
      if (this.params.userRole.length<1) {
        this.$store.dispatch('toast/update', { type: 'error', content: '至少选择一个角色', time: 2000 })
        return
      } 
      this.$Helper.ajax({
        url: 'manage/updateUserAndRole',
        params: {
          userId: this.params.userId,
          roIds: this.params.userRole,
        }
      }).then(
        ({ status, message }) => {
          let type = 'info'
          if (status === 1) {
            type = 'success'
            message = '保存成功'
            setTimeout(() => {
              this.closeModel()
            }, 800)
          }
          this.$store.dispatch('toast/update', { type, content: message, time: 2000 })
        }
      )
    },
    addCardFn() {
      // 检测数据完整性
      let lackArr = this.$Helper.testParamsComplete({params: this.params, contain: ['cardName', 'cardDetails', 'cardMoney', 'cardNum', 'type']}).concat(this.$Helper.testParamsComplete({params: this.addCard, contain: ['cardOutTime']}))
      if (!_.isEmpty(lackArr)) {
        this.$store.dispatch('toast/update', { type: 'error', content: `请输入${ tableConfig[lackArr[0]] || lackArr[0] }信息`, time: 2000 })
      } else {
        let params = { ...this.params, cardOutTime: this.addCard.cardOutTime * 60 * 60 * 24, cardNum: parseInt(this.params.cardNum) }
        // begin post
        this.$Helper.ajax({
          url: this.params.id !== undefined ? 'manage/card/updateCard' : 'manage/card/insertCard',
          params,
          success: ({ status, message }) => {
            let type = 'info'
            if (status === 1) {
              type = 'success'
              message = '保存成功'
              this.$store.dispatch('editerReload')
              setTimeout(() => {
                this.closeModel()
              }, 800)
            }
            this.$store.dispatch('toast/update', { type, content: message, time: 2000 })
          },
        })
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.container {}

#IModelBox {
  transition: all .1s linear;
}

.layer {
  background: rgba(0, 0, 0, .5);
  z-index: 11
}

#IModelBox_container {
  width: 350px;
  min-height: 200px;
  background: #f8f8f8;
  position: fixed;
  left: 0;
  right: 0;
  margin: auto;
  top: 16vh;
  border-radius: 2px;
  overflow: hidden;
  z-index: 2000;
}

#IModelBox_title {
  height: 35px;
  background: #f0f0f0;
  font-size: 16px;
  font-weight: 700;
  color: #555;
  position: relative;
  .iconfont {
    position: absolute;
    right: 10px;
    top: 8px;
    font-size: 18px;
    cursor: pointer;
  }
}


#IModelBox_btn_container {
  height: 25%;
  color: #333;
  font-size: 14px
}

#IModelBox_btn_container li {
  margin-left: 20px;
  height: 26px;
  line-height: 24px;
  width: 60px;
  border-radius: 3px;
}

#IModelBox_btn_container li:first-child {
  margin: 0;
  color: white;
  background: #7b94a6;
}

#IModelBox_btn_container li:nth-child(2) {
  border: 1px solid #7b94a6;
  color: #7b94a6;
}

.IModelBox-content {
  div {
    font-size: 14px;
    font-weight: 500;
    color:#444;
  }
}

.IModelBox-content.editPermission {
  // height: 140px;
  padding: 15px;
  ul{
    li{
      // border:1px solid red;
      height:40px;
      padding-left:20px;
    }
  }
  div {
    font-size: 16px;
    margin-top: 20px;
    .el-button {
      padding: 10px 30px;
    }
  }
}


.IModelBox-content.comfirm {
  height: 140px;
  padding-top: 15px;
  div {
    font-size: 16px;
    margin-top: 20px;
    .el-button {
      padding: 10px 30px;
    }
  }
}


.IModelBox-content.changePassword {
  padding: 20px 40px;
  font-size: 14px;
  div {
    margin-bottom: 10px;
    .el-input {
      margin-top: 10px;
    }
    .el-button {
      padding: 10px 30px;
    }
  }
}

.IModelBox-content.addCard{
  padding: 5px 40px 5px 20px;
  font-size: 14px;
  .h-label{
    width:60px;
  }
  div {
    margin: 10px 0;
    .el-input {
      margin-top: 10px;
    }
    .el-button {
      padding: 10px 30px;
    }
  }
}

.IModelBox-content.rechargeInfo {
  padding: 20px 40px;
  font-size: 14px;
  li{
    margin: 3px;
  }
  .el-button {
    padding: 10px 30px;
  }
}


.IModelBox-content.addAgent {
  padding: 20px 40px;
  font-size: 14px;
  div {
    margin-bottom: 10px;
    .el-input {
      margin-top: 10px;
    }
    .el-select {
      margin-top: 10px;
    }
    .el-button {
      padding: 10px 30px;
    }
  }
}

.IModelBox-content.changeAgentPassword {
  padding: 40px 40px 20px 40px;
  font-size: 14px;
  div {
    margin-bottom: 10px;
    .el-input {
      margin-top: 10px;
    }
    .el-select {
      margin-top: 10px;
    }
  }
}


.IModelBox-content.chuli {
  height: 140px;
  padding-top: 15px;
  div {
    font-size: 16px;
    margin-top: 20px;
    .el-button {
      padding: 10px 30px;
    }
  }
}


.IModelBox-content.prompt {
  padding: 30px 0;
  div {
    margin: 0;
    font-size: 16px;
    .el-button {
      padding: 10px 30px;
    }
    .el-textarea {
      width: 80%;
      margin: 0;
    }
  }
}

.IModelBox-content.DomainExport {
  padding: 20px 40px 10px 40px;
  div {
    font-size: 16px;
    margin-bottom: 10px;
    .el-button {
      padding: 10px 20px;
    }
  }
}

.addstaff-headupload {
  width:58px;
  height:58px;
  border-radius: 100%;
  border:1px solid #ddd;
  position: relative;
  top:6px;
  cursor:pointer;
  background-size:auto 100%; 
  img{
    position: absolute;
    width:18px;
    right:0px;
    bottom:5px;
  }
}

.login-input {
  background: transparent;
  border: 1px solid #9E9E9E;
  outline: none;
  box-shadow: none;
  color: #444;
  font-size: 1vw; // text-align: center;
  width: 40px;
  padding: 5px;
  border-radius: 3px;
  margin: 0 5px;
}

.login-input:focus {
  border: 1px solid #409EFF;
}
</style>
