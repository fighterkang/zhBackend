<template>
  <div class="container" id="container">
    <div class="h-handle">
      <el-button key="select" size="medium" @click="initSelect" v-if="selectApi">筛选</el-button>
      <el-button type="primary" @click="addFn" v-if="addUrl" key="add" size="medium">新增</el-button>
    </div>
    <div class="h-table">
      <div class="box h-table-top" v-if="$route.name==='Lesson'">
        <div class="box h-item" date-key="classlist">
          <div class="h-label box box-item">分类</div>
          <el-select v-model="lesson.oneClassId" @change="changeTwoClassList" placeholder="请选择">
            <el-option v-for="item in lessonOneSelectList" :key="item.id" :label="item.courseClassName" :value="item.id">
            </el-option>
          </el-select>
          <el-select v-model="lesson.courseId" placeholder="请选择" @change="lessonClassIdChangeFn">
            <el-option v-for="item in lessonTwoSelectList" :key="item.id" :label="item.courseClassName" :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="box h-item">
          <div class="h-label box box-item">费用</div>
          <el-select v-model="lesson.free" placeholder="请选择" @change="lessonFreeChangeFn">
            <el-option v-for="item in [{key: undefined, value: '全部'}, {key: 1, value: '免费'}, {key: 2, value: '收费'}]" :key="item.key" :label="item.value" :value="item.key">
            </el-option>
          </el-select>
        </div>
        <div class="box h-item">
          <div class="h-label box box-item">排序</div>
          <el-select v-model="lesson.price" placeholder="请选择" @change="lessonPriceChangeFn">
            <el-option v-for="item in [{key: 'asc', value: '升序'}, {key: 'desc', value: '降序'}]" :key="item.key" :label="item.value" :value="item.key">
            </el-option>
          </el-select>
        </div>
        <div class="box h-item">
          <div class="h-label box box-item">种类</div>
          <el-select v-model="lesson.newes" placeholder="请选择" @change="lessonNewesChangeFn">
            <el-option v-for="item in [{key: 1, value: '最新'}, {key: 2, value: '最热'}]" :key="item.key" :label="item.value" :value="item.key">
            </el-option>
          </el-select>
        </div>
        <div class="box box-y-center box-x-right box-col-flex">
          <el-input placeholder="请输入搜索内容" prefix-icon="el-icon-search" v-model="searchText" :on-icon-click="jsonSelect" @keyup.enter="jsonSelect">
          </el-input>
          <el-button type="primary" @click="addFn" v-if="addUrl" key="add">新增</el-button>
        </div>
      </div>
      <div class="box h-table-top" v-if="$route.name==='UserList'">
        <div class="box box-y-center box-x-right box-col-flex">
          <el-input placeholder="请输入搜索内容" prefix-icon="el-icon-search" v-model="searchText" :on-icon-click="jsonSelect" @keyup.enter="jsonSelect">
          </el-input>
          <el-button type="primary" @click="addFn" v-if="addUrl" key="add">新增</el-button>
        </div>
      </div>
      <Itable :tableData="tableData" :showList="showList" :tableIn="tableIn" :showAction="false" :canCheck="false" :tableKey="topActive">
      </Itable>
      <div class="viod-status box box-x-center" v-if="tableData && tableData.length === 0">
        暂无任何数据！
      </div>
    </div>
    <el-pagination :current-page.sync="tableIn" :page-size="10" layout="prev, pager, next" :total="tablePageTotal">
    </el-pagination>
  </div>
</template>

<script>
import Itable from '@/views/components/ITable'
import { provinceAndCityData } from "element-china-area-data";
import { mapState } from 'vuex'
import { compositionConfig } from '@/config/level'
import subbarConfig from '@/config/subbar'
import router from '@/router'
import _ from 'lodash'
export default {
  components: {
    Itable,
  },
  data() {
    return {
      tableIn: 1,
      tableData: [],
      singleCount: 10,
      tablePageTotal: null,
      startDate: null,
      startTime: null,
      endTime: null,
      searchText: null,
      attributeSelectors: [],
      operators: {
        bool: [],
        number: [],
        string: [],
      },
      attributeSelect: 'supplyer',
      selectedArr: null,
      isSelect: false,
      timeQuantum: [
        {
          key: 1,
          value: '近1天',
        },
        {
          key: 3,
          value: '近3天',
        },
        {
          key: 7,
          value: '近一周',
        },
        {
          key: 15,
          value: '近半个月',
        },
        {
          key: 30,
          value: '近一个月',
        },
        {
          key: 60,
          value: '近两个月',
        },
        {
          key: 90,
          value: '近三个月',
        },
        {
          key: 180,
          value: '近半年',
        },
        {
          key: 365,
          value: '近一年',
        },
      ],
      provinceQuantum: provinceAndCityData,
      lessonOneSelectList: [],
      lessonTwoSelectList: [],
      lessonSave: {
        oneClassId: undefined,
        free: undefined,
        newes: undefined,
        courseId: undefined,
      },
      lesson: {},
    }
  },
  computed: {
    ...mapState({
      reloadTableData: state => state.editerReloadData,
      topBarActiveItem: state => state.topBarActiveItem
    }),
    ...mapState('basic', [
      'basic'
    ]),
    subData() {
      let returnData = {}
      for (let i in compositionConfig) {
        let composition = compositionConfig[i]
        let sub = composition.sub || [composition]
        let item = sub.filter(({name}) => name === this.$route.name)
        if (item.length > 0) {
          returnData = item[0]
          break
        }
      }
      return returnData
    },
    topData() {
      let { sub } = this.subData
      if (this.$Helper.isType(sub, []) && sub.length > 0) {
        let topActive = this.topBarActiveItem || sub[0].name
        return { ...sub.filter((item) => item.name === topActive)[0], name: topActive}
      } else {
        return this.subData
      }
    },
    topActive() {
      return this.topData.name
    },
    beforeApi() {
      return this.topData.api
    },
    selectApi() {
      return this.topData.selectApi
    },
    showList() {
      return this.topData.showList
    },
    addUrl() {
      return this.topData.add
    },
    openLevel() {
      return _.get(this, 'basic.level')
    },
  },
  watch: {
    '$route'() {
      this.searchText = null
      this.startDate = null
      this.tableIn = 1
      this.$store.dispatch('ToggleTopBarActive', null)
      // this.initTableData()
    },
    reloadTableData() {
      this.initTableData()
    },
    tableIn() {
      this.initTableData()
    },
    beforeApi() {
      if (this.isSelect) {
        this.closeSelect()
        return
      }
      this.initTableData()
    },
    searchText() {
      this.jsonSelect()
    },
  },
  created() {
    this.lesson = _.cloneDeep(this.lessonSave)
    this.initTableData()
    if (this.$route.name === 'Lesson') {
      this.getOneClassList()
    }
  },
  methods: {
    lessonClassIdChangeFn(item) {
      this.lesson = { ...this.lessonSave, oneClassId: this.lesson.oneClassId, courseId: item }
      this.initTableData()
    },
    lessonFreeChangeFn(item) {
      this.lesson = { ...this.lessonSave, free: item }
      this.initTableData()
    },
    lessonPriceChangeFn(item) {
      this.lesson = { ...this.lessonSave, price: item }
      this.initTableData()
    },
    lessonNewesChangeFn(item) {
      this.lesson = { ...this.lessonSave, newes: item }
      this.initTableData()
    },
    initTableData() {
      let params = {
        page: this.tableIn || 1,
        find: this.searchText || undefined
      }
      let method = 'GET'
      let urlType = this.topData.urlType || 'api'
      if (this.$route.name === 'Lesson') {
        params = { ...params, ...this.lesson, courseId: this.lesson.courseId === undefined ? -1 : this.lesson.courseId, findName: this.searchText }
        method = 'POST'
      } else if (['User', 'Apply', 'Activity', 'UserList'].indexOf(this.$route.name) !== -1) {
        method = 'POST'
      }
      this.$Helper.ajax({ url: this.beforeApi, params, method, urlType}).then(
        ({ total, data, pageSize, pageNum }) => {
          this.tablePageTotal = total || 1
          this.pageIn = pageNum
          if (urlType === 'bbs') {
            this.tableData = data.data
          } else {
            this.tableData = data
          }
          this.scrollTop()
        },
        () => {
          this.resetTableData()
        }
      )
    },
    resetTableData() {
      this.tablePageTotal = 1
      this.tableData = []
      this.pageIn = 1
      this.scrollTop()
    },
    getOneClassList(fn) {
      this.$Helper.ajax({
        url: 'open/home/getOneClasslist',
        method: 'GET',
      }).then(({data}) => {
        this.lessonOneSelectList = data
        this.getTwoClassList()
      })
    },
    getTwoClassList() {
      this.$Helper.ajax({
        url: 'open/home/findClassByClassId',
        params: {
          classId: this.lesson.oneClassId,
        },
        method: 'GET',
      }).then(({data}) => {
        this.lessonTwoSelectList = data
      })
    },
    changeTwoClassList() {
      this.lesson.classId = null
      this.getTwoClassList()
    },
    setSeachTime(value) {
      if (!value) {
        this.startTime = null
        this.endTime = null
        this.initTableData()
        return
      }
      this.searchText = null
      let timeArr = value.split(' / ')
      this.startTime = `${timeArr[0]} 00:00:00`
      this.endTime = `${timeArr[1]} 23:59:59`
      this.initTableData()
    },
    jsonSelect() {
      this.startDate = null
      clearTimeout(this.jsonSelectSetTimer)
      this.jsonSelectSetTimer = setTimeout(() => {
        this.initTableData()
      }, 500);
    },
    addFn(e) {
      this.$store.dispatch('slidemodel/show', { status: this.addUrl })
    },
    getSubData(key) {
      let returnData
      subbarConfig.map((item) => {
        if (item.name === this.$route.name) {
          returnData = item[key]
        }
      })
      return returnData
    },
    scrollTop() {
      document.getElementById('container').scrollTop = 0
    },
    getAttrData(attr) {
      return _.get(this.attributeSelectors.filter(({ attribute }) => attribute === attr), '[0]')
    },
    getAttrOption(attr) {
      return _.get(this.getAttrData(attr), 'options')
    },
    getAttrType(attr) {
      return _.get(this.getAttrData(attr), 'dataType')
    },
    getAttrTypeArr(attr) {
      return this.operators[this.getAttrType(attr)]
    },
    addSelect() {
      let singleTemplate = [
        {
          operator: null,
          attribute: null,
          value: null,
        },
      ]
      this.selectedArr.push(singleTemplate)
    },
    removeSelect(key) {
      this.selectedArr.splice(key, 1)
    },
    addSelectItem(li) {
      let singleTemplate = {
        operator: null,
        attribute: null,
        value: null,
      }
      li.push(singleTemplate)
    },
    removeSelectItem(li, key) {
      li.splice(key, 1)
    },
    attributeChange(li) {
      li.operator = null
      li.value = null
    },
    closeSelect() {
      this.isSelect = false
      this.selectedArr = [
        [
          {
            operator: null,
            attribute: null,
            value: null,
          },
        ]
      ]
      // 重新刷新
      this.initTableData()
    },
    initSelect() {
      if (this.isSelect) {
        this.closeSelect()
        return
      }
      const selectData = this.$Helper.getCookie(this.selectApi)
      const init = (item) => {
        this.attributeSelectors = item.attributeSelectors
        this.operators = item.operators
        this.isSelect = !this.isSelect
        this.selectedArr = [
          [
            {
              operator: null,
              attribute: null,
              value: null,
            },
          ]
        ]
      }
      if (selectData) {
        init(JSON.parse(selectData))
        return
      }
      this.$Helper.ajax({ url: this.selectApi,params: {},method: 'GET'}).then(
        (item) => {
          // save to cache
          this.$Helper.setCookie(this.selectApi, item)
          init(item)
        }
      )
    },
    beginSelect() {
      // bool类型的数据，预处理
      this.selectedArr.map(item => {
        item.map((item2) => {
          let dataType = this.getAttrType(item2.attribute)
          if (dataType === 'bool') {
            item2.value = item2.operator === '是'
            item2.operator = '是'
          }
        })
      })
      // test params complete
      this.initTableData(JSON.stringify(this.selectedArr))
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.container {
  overflow-x: hidden;
  overflow-y: auto;
  padding:20px;
  .h-handle{
    padding-bottom:20px;
  }
  .h-select{
    max-height: 1000px;
    background: white;
    margin-bottom: 30px;
    position: relative;
    border-radius: 4px;
    padding: 10px;
    transition: all 200ms linear;
    opacity: 1;
    box-shadow: 0 2px 12px #eee;
    &.hidden{
      overflow: hidden;
      padding: 0 10px;
      margin: 0;
      max-height: 0;
      opacity: 0;
    }
    &::before{
      content: '';
      position: absolute;
      top:-0.6vw;
      left:1vw;
      border-right:0.6vw solid transparent;
      border-left:0.6vw solid transparent;
      border-bottom:0.6vw solid white;
    }
    .select_item_ul{
      padding:10px 5px;
      .select-btn-container{
        margin-top:4vh;
      }
      li{
        border: 1px solid #ccc;
        padding:5px 0.5vw;
        margin:1vw 0;
        width: 100%;
        min-height: 7vh;
        position: relative;
        &.and{
          border:none;
          min-height: 0;
          padding:0;
          height: 8px;
          .iconfont{
            font-size: 2.7vh;
          }
        }
        .remove{
          position: absolute;
          top:-1.1vh;
          left:-1.1vh;
          font-size: 2.2vh;
          color: #aaa;
          cursor: pointer;
        }
        .add{
          color: #666;
          cursor: pointer;
        }
        .single{
          width: 47%;
          margin:0.5vw 1vw;
          height: 6.5vh;
          padding:0 1vw;
          background: white;
          border-radius: 2px;
          position: relative;
          &.add-item{
            background: transparent;
            border: 1px solid #ccc;
            color: #aaa;
          }
          .iconfont{
            margin-right: 10px;
            color: #aaa;
            font-size: 2.2vh;
            cursor: pointer;
            &.else{
              position: absolute;
              margin-right:0;
              right: -2.1vw;
              top:1vw;
              font-size: 2.7vh;
              color:#f36d6e;
            }
          }
          .el-select {
            width: 200px;
            margin-right: 10px;
          }
        }
      }
    }
    // .select_attr_ul{
    //   .el-select {
    //     width: 120px;
    //   }
    // }
  }
  .h-table {
    background: white;

    .h-table-top{
      padding: 3vh;
      .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner {
        width: 230px;
      }
      .el-date-editor .el-range-separator{
        color: #ccc;
      }
      .el-input {
        width: 15vw;
      }
      // .el-button {
      //   margin-left: 20px;
      // }
      .h-item{
        &[date-key="classlist"] {
          .el-select{
            width: 8vw;
            margin-right: 0.5vw;
          }
        }
        padding-right: 2vw;
        .h-label{
          margin-right:1vw;
        }
        .el-select{
          width: 10vw;
        }
      }
    }

    .viod-status {
      height: 72vh; // border: 1px solid #d7d7d7;
      border-top: none;
      padding-top: 20vh;
      color: #9D9D9D;
      font-size:2vh;
    }
  }
  .el-pagination {
    float: right;
    margin: 20px 10px;
  }
}
</style>
