import Vue from 'vue'
import VueRouter from 'vue-router'
import authentication from './authentication'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
   return originalPush.call(this, location).catch(err => err)
}
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
   return originalReplace.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/index.vue'),
    meta: {
      showTabBar: true,
      title: '首页'
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      showTabBar: true,
      title: '关于页'
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/auth/index.vue'),
    meta: {
      title: '授权页'
    }
  },
  {
    path: '/device/list',
    name: 'device-list',
    component: () => import(/* webpackChunkName: "device-list" */ '../views/device/device-list/index.vue'),
    meta: {
      title: '设备列表'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/register/index.vue'),
    meta: {
      title: '商户注册'
    }
  },
  {
    path: '/device/manage/:code',
    name: 'device-manage',
    component: () => import(/* webpackChunkName: "device-manage" */ '../views/device/device-manage/index.vue'),
    meta: {
      title: '设备管理'
    }
  },
  {
    path: '/ic/list',
    name: 'ic-list',
    component: () => import(/* webpackChunkName: "ic-list" */ '../views/ic/ic-list/index.vue'),
    meta: {
      title: 'IC卡列表'
    }
  },
  {
    path: '/ic/manage/:cardId',
    name: 'ic-list-manage',
    component: () => import(/* webpackChunkName: "ic-list-manage" */ '../views/ic/ic-list-manage/index.vue'),
    meta: {
      title: 'IC卡管理'
    }
  },
  {
    path: '/ic/record/:id',
    name: 'ic-consume-record',
    component: () => import(/* webpackChunkName: "ic-consume-record" */ '../views/ic/ic-consume-record/index.vue'),
    meta: {
      title: 'IC卡消费记录'
    }
  },
  {
    path: '/member/list',
    name: 'member-list',
    component: () => import(/* webpackChunkName: "member-list" */ '../views/member/member-list/index.vue'),
    meta: {
      title: '会员列表'
    }
  },
  {
    path: '/member/manage/:id',
    name: 'member-list-manage',
    component: () => import(/* webpackChunkName: "member-list-manage" */ '../views/member/member-list-manage/index.vue'),
    meta: {
      title: '会员管理'
    }
  },
  {
    path: '/member/record/:id',
    name: 'member-consume-record',
    component: () => import(/* webpackChunkName: "member-consume-record" */ '../views/member/member-consume-record/index.vue'),
    meta: {
      title: '会员消费记录'
    }
  },
  {
    path: '/area/list',
    name: 'area-list',
    component: () => import(/* webpackChunkName: "area-list" */ '../views/area/area-list/index.vue'),
    meta: {
      title: '小区列表'
    }
  }
]
// process.env.BASE_URL
const router = new VueRouter({
  mode: 'history',
  base: '/wx',
  routes
})

// 鉴权函数
authentication(router)

export default router
