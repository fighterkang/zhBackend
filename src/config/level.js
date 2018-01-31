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
      'ForumPost'
    ],
  },
}

export const compositionConfig = [
  {
    name: 'Lesson',
    text: '课程列表',
    icon: '&#xe63e;',
    api: 'open/course/screening',
    showList: ['id','sysCourseName','imgUrl','lecturer','courseCount','studentCount','twoClass','price'],
    // add: 'addSupplyer',
  },
  {
    name: 'Loop',
    text: '首页轮播',
    icon: '&#xe63e;',
    api: 'manage/getShufflingAll',
    showList: ['id','title', 'note','url','skipId', 'activity', 'status', 'img'],
    add: 'AddLoop',
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
    name: 'Apply',
    text: '申请处理',
    icon: '&#xe63e;',
    api: 'manage/jcuserApplyList',
    showList: ['id','name','type', 'phone', 'company', 'userId','content'],
  },
  {
    name: 'Activity',
    text: '活动管理',
    icon: '&#xe63e;',
    api: 'manageActivity/getActivityList',
    showList: ['id','activityTitle','activityType', 'activityAddress', 'activityImg', 'activityMoney','activityNum', 'hasNum', 'phone'],
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
  {
    name: 'ForumPost',
    text: '帖子列表',
    icon: '&#xe63e;',
    api: 'WeOpen.ConsultList',
    urlType: 'bbs',
    showList: ['id','consultName', 'consultImg', 'num', 'commentNum', 'authorId', 'nickName', 'photo', 'createTime'],
    // add: 'AddForumPost',
  },
]