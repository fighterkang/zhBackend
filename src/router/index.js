import Vue from 'vue'
import Router from 'vue-router'
import { compositionConfig } from '@/config/level'
import Helper from '../util/helper'

import Login from '@/views/pages/Login'
import Control from '@/views/pages/Control'
import Editer from '@/views/pages/Control/Mainer/Editer'

Vue.use(Router)

// const subbarRoute = subbarConfig.map(({name}) => {
//   return {
//     path: name.toLowerCase(),
//     name,
//   }
// })

const subbarRoute = []
Helper.isType(compositionConfig, []) && compositionConfig.map((item) => {
  if (Helper.isType(item.sub, [])) {
    item.sub.map((item1) => {
      subbarRoute.push({
        path: item1.name.toLowerCase(),
        name: item1.name,
      })
    })
  } else {
    subbarRoute.push({
      path: item.name.toLowerCase(),
      name: item.name,
    })
  }
})
// console.log(subbarRoute)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/control',
      component: Control,
      children: [
        {
          path: '',
          redirect: 'editer',
        },
        {
          path: 'editer',
          component: Editer,
          children: [
            
          ].concat(subbarRoute),
        },
      ],
    },
  ],
})
