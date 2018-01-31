<template>
  <div class="post-container">
    <div class="post-content">
      <ul class="post-ul box box-wrap">
        <li v-for="(item, key) in permissionAll" :key="key" class="box box-y-center">
          <el-checkbox :checked="role_permission.indexOf(item.id)!==-1" @change="changePermission(item.id)">{{ item.name }}</el-checkbox>
        </li>
      </ul>
      <div class="box box-item bottom">
        <el-button @click="closeModel" >取消</el-button>
        <el-button @click="postFn" v-if="permissionId" type="primary">保存</el-button>
      </div>

    </div>
  </div>
</template>

<script>
import router from '@/router'
import apiConfig from '@/config/api'
import tableConfig from '@/config/table'
import { mapState } from 'vuex'
import _ from 'lodash'
export default {
  components: {
  },
  data() {
    return {
      role_permission: [],
      permissionAll: [],
      permissionId: undefined,
    }
  },
  computed: {
    ...mapState('basic', [
      'basic'
    ]),
  },
  props: ['params'],
  created() {
    this.permissionId = this.params.id
    this.getAllPermission(this.params.id)
  },
  watch: {
  },
  methods: {
    closeModel() {
      this.$Helper.emitAction('closeModel')
    },
    getAllPermission(roldId) {
      if (roldId === '') roldId = undefined
      this.$Helper.ajax({ url: 'manage/findPermissionByRole',params: { roldId },method: 'GET'}).then(
        ({ message, status, data }) => {
          if (status === 1) {
            let { permissionAll, role_permission } = data
            this.permissionAll = permissionAll
            let arr = []
            role_permission.map(item=>{
              if(arr.indexOf(item.id)===-1) arr.push(item.id)
            })
            this.role_permission = arr
          } else {
            console.log('获取所有权限失败')
          }
        }
      )
    },
    changePermission(id) {
      if (this.role_permission.indexOf(id)!==-1) {
        this.role_permission.map((item,key) => {
          if (item === id) this.role_permission.splice(key, 1)
        })
      } else {
        this.role_permission.push(id)
      }
    },
    postFn() {
      if (this.role_permission.length<1) {
        this.$store.dispatch('toast/update', { type: 'error', content: '至少选择一种权限', time: 2000 })
        return
      } 
      this.$Helper.ajax({
        url: `manage/updateRoldandPermission`,
        params: {
          roId: this.permissionId,
          permissionIds: this.role_permission,
        }
      }).then(({ status, message }) => {
        let type = 'info'
        if (status === 1) {
          type = 'success'
          message = '保存成功'
          setTimeout(() => {
            this.closeModel()
          }, 400)
        }
        this.$store.dispatch('toast/update', { type, content: message, time: 2000 })
      })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.post-container {
  padding: 15px;
  overflow-x:hidden;
  overflow-y: auto;
  .post-content {
    background: white;
    padding: 30px 50px;
    .post-ul{
      li{
        height: 8vh;
        width:20%;
      }
    }
    .p-one {
      // border:1px solid red;
      min-height: 40px;
      margin-bottom: 20px;
      .h-label {
        width: 6vw;
      }
    }

    .bottom {
      position: absolute;
      bottom: 6vh;
      left: 0;
      right: 0;
      margin: auto;
      .el-button{
        margin: 15px;
      }
    }


    .img-content {
      // padding: 3vh 0;
      li {
        width: 10vh;
        height: 10.1vh;
        margin-right: 2vh;
        position: relative;
        border: 1px solid #ddd;
        cursor: pointer;
        i.remove-image {
          position: absolute;
          right: -8px;
          top: -8px;
          font-size: 16px;
          color: #ff7373;
        }
      }
      .add-image {
        border: 1px solid #d6d6d6;
        i {
          color: #aaa;
          font-size: 3vw;
        }
      }
    }




    img {
      height: 60px;
      border: 1px solid #ddd;
    }
    p {
      height: 50%;
      font-size: 2vh;
      padding-left: 16px;
    }
    .el-textarea {
      margin-top: 20px;
      width: 90%;
    }
    .radio-conatiner {
      padding: 2vh 0;
    }
  }
}
</style>
