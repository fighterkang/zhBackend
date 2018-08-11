export const levelConfig = {
  1: {
    name: '超管',
    subBar: [
      'Lesson',
      'Loop',
      'ClassList',
      'User',
      'Role',
      'Apply',
      'Activity',
      'ForumLoop',
      'ForumPost',
      'ActivityLoop',
      'UserList',
      'HelpList',
      'Classify',
    ],
  },
}

export const compositionConfig = [
  {
    name: '文章',
    icon: '',
    sub: [
      {
        name: 'Lesson',
        text: '课程列表',
        icon: '&#xe63e;',
        api: 'open/course/screening',
        showList: ['id','sysCourseName','imgUrl','lecturer','courseCount','studentCount','twoClass','price', 'top'],
        // add: 'addSupplyer',
      },
      {
        name: 'ClassList',
        text: '课程分类',
        icon: '&#xe63e;',
        api: 'open/home/getClasslist',
        showList: ['id','courseClassName','ico','twoClassJpas', 'status'],
        add: 'AddClass',
      },
      {
        name: 'ForumPost',
        text: '帖子列表',
        icon: '&#xe63e;',
        api: 'WeOpen.ConsultList',
        urlType: 'bbs',
        showList: ['id','consultName', 'consultImg', 'num', 'commentNum', 'authorId', 'nickName', 'photo', 'createTime'],
        // add: 'AddForumPost',
      },
      {
        name: 'Activity',
        text: '活动管理',
        icon: '&#xe63e;',
        api: 'manageActivity/getActivityList',
        showList: ['id','activityTitle','activityType', 'activityAddress', 'activityImg', 'activityMoney','activityNum', 'hasNum', 'phone'],
      },
    ]
  },
  {
    name: '轮播',
    icon: '',
    sub: [
      {
        name: 'Loop',
        text: '首页轮播',
        icon: '&#xe63e;',
        api: 'manage/getShufflingAll',
        showList: ['id','title', 'note','url','skipId', 'activity', 'status', 'img'],
        add: 'AddLoop',
      },
      {
        name: 'ActivityLoop',
        text: '活动轮播',
        icon: '&#xe63e;',
        api: 'manage/getShufflingAllTwo',
        showList: ['id','title', 'activity', 'status', 'img'],
        add: 'AddActivityLoop',
      },
      {
        name: 'ForumLoop',
        text: '论坛轮播',
        icon: '&#xe63e;',
        api: 'WeOpen.BannerList',
        urlType: 'bbs',
        showList: ['id','top', 'type', 'status', 'imgUrl'],
        add: 'AddFourmLoop'
      },
    ]
  },
  {
    name: '用户',
    icon: '',
    sub: [
      {
        name: 'User',
        text: '管理列表',
        icon: '&#xe63e;',
        api: 'manage/userList',
        showList: ['id','nickname','phone', 'email','status'],
        add: 'AddUser',
      },
      {
        name: 'Role',
        text: '角色列表',
        icon: '&#xe63e;',
        api: 'manage/getRole',
        showList: ['id','name','type'],
        add: 'AddRole',
      },
      {
        name: 'UserList',
        text: '用户列表',
        icon: '&#xe63e;',
        api: 'manage/getUserList',
        showList: ['id','nickName', 'phone','level','credit', 'pid', 'sex', 'status'],
        // add: 'AddForumPost',
      },
    ]
  },
  {
    name: '反馈',
    icon: '',
    sub: [
      {
        name: 'Apply',
        text: '申请处理',
        icon: '&#xe63e;',
        api: 'manage/jcuserApplyList',
        showList: ['id','name','type', 'phone', 'company', 'userId','content'],
      },
      {
        name: 'HelpList',
        text: '反馈列表',
        icon: '&#xe63e;',
        api: 'manage/helpList',
        showList: ['id','name','userid', 'phone','question','resolveType', 'responseType'],
        // add: 'AddForumPost',
      },
    ]
  },
  {
    name: '考试中心',
    icon: '',
    sub: [
      {
        name: 'Classify',
        text: '分类',
        icon: '&#xe63e;',
        api: 'manage/examcenter/getOneClass',
        showList: [],
      },
    ]
  },
]
