import Vue from 'vue'
import VueRouter from 'vue-router'
import authentication from './authentication'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/home/index.vue'),
    meta: {
      showTabBar: true,
      title: '首页',
      wxsdk: true, // 当前页面是否调用微信sdk
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/navigation',
    name: 'navigation',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "navigation" */ '../views/navigation/index.vue'
      ),
    meta: {
      showTabBar: true,
      title: '导航',
      auth: [0, 2, 3, 4]
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () =>
      import(/* webpackChunkName: "auth" */ '../views/auth/index.vue'),
    meta: {
      title: '授权页',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/home/bindresult',
    name: 'bind-result',
    component: () =>
      import(
        /* webpackChunkName: "bind-result" */ '../views/home/bind-result/index.vue'
      ),
    meta: {
      title: '绑定结果',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/device/list',
    name: 'device-list',
    component: () =>
      import(
        /* webpackChunkName: "device-list" */ '../views/device/device-list/index.vue'
      ),
    meta: {
      title: '设备列表',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () =>
      import(/* webpackChunkName: "register" */ '../views/register/index.vue'),
    meta: {
      title: '商户注册',
      auth: [0, 1, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/register/login.vue'),
    meta: {
      title: '商户登录',
      auth: [0, 1, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/device/manage/:code',
    name: 'device-manage',
    component: () =>
      import(
        /* webpackChunkName: "device-manage" */ '../views/device/device-manage/index.vue'
      ),
    meta: {
      title: '设备管理',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/device/portqrcode/:code',
    name: 'device-port-qrcode',
    component: () =>
      import(
        /* webpackChunkName: "device-port-qrcode" */ '../views/device/device-port-qrcode/index.vue'
      ),
    meta: {
      title: '设备端口二维码',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/ic/list',
    name: 'ic-list',
    component: () =>
      import(/* webpackChunkName: "ic-list" */ '../views/ic/ic-list/index.vue'),
    meta: {
      title: 'IC卡列表',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/ic/manage/:id',
    name: 'ic-list-manage',
    component: () =>
      import(
        /* webpackChunkName: "ic-list-manage" */ '../views/ic/ic-list-manage/index.vue'
      ),
    meta: {
      title: 'IC卡管理',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/ic/record/:id',
    name: 'ic-consume-record',
    component: () =>
      import(
        /* webpackChunkName: "ic-consume-record" */ '../views/ic/ic-consume-record/index.vue'
      ),
    meta: {
      title: 'IC卡消费记录',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/member/list',
    name: 'member-list',
    component: () =>
      import(
        /* webpackChunkName: "member-list" */ '../views/member/member-list/index.vue'
      ),
    meta: {
      title: '会员列表',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/member/manage/:id',
    name: 'member-list-manage',
    component: () =>
      import(
        /* webpackChunkName: "member-list-manage" */ '../views/member/member-list-manage/index.vue'
      ),
    meta: {
      title: '会员管理',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/member/record/:id',
    name: 'member-consume-record',
    component: () =>
      import(
        /* webpackChunkName: "member-consume-record" */ '../views/member/member-consume-record/index.vue'
      ),
    meta: {
      title: '会员消费记录',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/area/list',
    name: 'area-list',
    component: () =>
      import(
        /* webpackChunkName: "area-list" */ '../views/area/area-list/index.vue'
      ),
    meta: {
      title: '小区列表',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/area/manage/:id',
    name: 'area-manage',
    component: () =>
      import(
        /* webpackChunkName: "area-manage" */ '../views/area/area-manage/index.vue'
      ),
    meta: {
      title: '小区管理',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/area/reportform/:id',
    name: 'report-form',
    component: () =>
      import(
        /* webpackChunkName: "report-form" */ '../views/area/report-form/index.vue'
      ),
    meta: {
      title: '小区报表',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/area/exportreport',
    name: 'export-report',
    component: () =>
      import(
        /* webpackChunkName: "export-report" */ '../views/area/export-report/index.vue'
      ),
    meta: {
      title: '导出小区报表',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/area/authmanage/:id',
    name: 'auth-manage',
    component: () =>
      import(
        /* webpackChunkName: "auth-manage" */ '../views/area/auth-manage/index.vue'
      ),
    meta: {
      title: '小区管理',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/template/addv3/:version',
    name: 'template-v3-add',
    component: () =>
      import(
        /* webpackChunkName: "template-v3" */ '../views/template/v3Template/index.vue'
      ),
    meta: {
      title: '新增v3收费模板',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/template/v3/:id',
    name: 'template-v3-edit',
    component: () =>
      import(
        /* webpackChunkName: "template-v3" */ '../views/template/v3Template/index.vue'
      ),
    meta: {
      title: 'v3收费模板',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/template/addv2/:version',
    name: 'template-v2-add',
    component: () =>
      import(
        /* webpackChunkName: "template-v2" */ '../views/template/v2Template/index.vue'
      ),
    meta: {
      title: '新增v2收费模板',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/template/v2/:id',
    name: 'template-v2-edit',
    component: () =>
      import(
        /* webpackChunkName: "template-v2" */ '../views/template/v2Template/index.vue'
      ),
    meta: {
      title: 'v2收费模板',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/template/car/:id',
    name: 'template-car-edit',
    component: () =>
      import(
        /* webpackChunkName: "template-car" */ '../views/template/carTemplate/index.vue'
      ),
    meta: {
      title: '汽车桩收费模板',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/template/addv2-car/:version',
    name: 'template-car-add',
    component: () =>
      import(
        /* webpackChunkName: "template-car" */ '../views/template/carTemplate/index.vue'
      ),
    meta: {
      title: '新增汽车桩收费模板',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/template/addpulse/:version',
    name: 'template-pulse-add',
    component: () =>
      import(
        /* webpackChunkName: "template-pulse" */ '../views/template/pulseTemplate/index.vue'
      ),
    meta: {
      title: '新增脉冲收费模板',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/template/addoffline/:version',
    name: 'template-offline-add',
    component: () =>
      import(
        /* webpackChunkName: "template-offline" */ '../views/template/offlineTemplate/index.vue'
      ),
    meta: {
      title: '新增离线充值模板',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/template/pulse/:id',
    name: 'template-pulse-edit',
    component: () =>
      import(
        /* webpackChunkName: "template-pulse" */ '../views/template/pulseTemplate/index.vue'
      ),
    meta: {
      title: '脉冲收费模板',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/template/offline/:id',
    name: 'template-offline-edit',
    component: () =>
      import(
        /* webpackChunkName: "template-offline" */ '../views/template/offlineTemplate/index.vue'
      ),
    meta: {
      title: '离线充值模板',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/device/templatelist/:code',
    name: 'device-template-list',
    component: () =>
      import(
        /* webpackChunkName: "device-template-list" */ '../views/device/deivce-template-list/index.vue'
      ),
    meta: {
      title: '模板列表',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/device/system/v2/:code',
    name: 'device-system-v2',
    component: () =>
      import(
        /* webpackChunkName: "device-system-v2" */ '../views/device/device-system-params/v2/index.vue'
      ),
    meta: {
      title: 'v2系统模板',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/device/system/car/:code',
    name: 'device-system-car',
    component: () =>
      import(
        /* webpackChunkName: "device-system-car" */ '../views/device/device-system-params/car/index.vue'
      ),
    meta: {
      title: '汽车桩系统参数',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/device/alarm/:code',
    name: 'device-alarm',
    component: () =>
      import(
        /* webpackChunkName: "device-alarm" */ '../views/device/device-alarm/index.vue'
      ),
    meta: {
      title: '设备报警系统',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/device/channelvale/:code',
    name: 'device-channelvale',
    component: () =>
      import(
        /* webpackChunkName: "device-channelvale" */ '../views/device/device-channelvale/index.vue'
      ),
    meta: {
      title: '信道操作',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/device/portstatus/:code',
    name: 'device-port-status',
    component: () =>
      import(
        /* webpackChunkName: "device-port-status" */ '../views/device/device-port-status/index.vue'
      ),
    meta: {
      title: '设备端口状态',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/device/order/:code',
    name: 'device-order',
    component: () =>
      import(
        /* webpackChunkName: "device-order" */ '../views/device/device-order/index.vue'
      ),
    meta: {
      title: '设备订单',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/device/statis/:code',
    name: 'device-statis',
    component: () =>
      import(
        /* webpackChunkName: "device-statis" */ '../views/device/device-statis/index.vue'
      ),
    meta: {
      title: '设备统计',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/history/profit',
    name: 'history-profit',
    component: () =>
      import(
        /* webpackChunkName: "history-profit" */ '../views/history-profit/index.vue'
      ),
    meta: {
      title: '历史收益统计',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/order/profit',
    name: 'order-profit',
    component: () =>
      import(
        /* webpackChunkName: "order-profit" */ '../views/order-profit/index.vue'
      ),
    meta: {
      title: '订单统计',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/mine',
    name: 'mine',
    component: () =>
      import(/* webpackChunkName: "mine" */ '../views/mine/index.vue'),
    meta: {
      showTabBar: true,
      title: '个人中心',
      auth: [0, 2, 3, 4, 7]
    }
  },
  {
    path: '/withdraw/mybankcard',
    name: 'mybankcard',
    component: () =>
      import(
        /* webpackChunkName: "my-bank-card" */ '../views/withdraw/my-bank-card/index.vue'
      ),
    meta: {
      title: '我的银行卡',
      auth: [0, 2, 3, 4, 7]
    }
  },
  {
    path: '/withdraw/page/:type',
    name: 'withdrawPage',
    component: () =>
      import(
        /* webpackChunkName: "withdraw-page" */ '../views/withdraw/withdraw-page/index.vue'
      ),
    meta: {
      title: '提现',
      auth: [0, 2, 3, 4, 7]
    }
  },
  {
    path: '/withdraw/setbankcard/:type/:id',
    name: 'set-bank-card',
    component: () =>
      import(
        /* webpackChunkName: "set-bank-card" */ '../views/withdraw/set-bank-card/index.vue'
      ),
    meta: {
      title: '设置银行卡',
      auth: [0, 2, 3, 4, 7]
    }
  },
  {
    path: '/withdraw/record',
    name: 'withdraw-record',
    component: () =>
      import(
        /* webpackChunkName: "withdraw-record" */ '../views/withdraw/withdraw-record/index.vue'
      ),
    meta: {
      title: '提现记录',
      auth: [0, 2, 3, 4, 7]
    }
  },
  {
    path: '/subAccount',
    name: 'sub-account',
    component: () =>
      import(
        /* webpackChunkName: "sub-account" */ '../views/mine/sub-account/index.vue'
      ),
    meta: {
      title: '子账号',
      auth: [0, 2, 3, 4, 7]
    }
  },
  {
    path: '/income',
    name: 'income-details',
    component: () =>
      import(
        /* webpackChunkName: "income-details" */ '../views/mine/income-details/index.vue'
      ),
    meta: {
      title: '商户收益明细',
      auth: [0, 2, 3, 4, 7]
    }
  },
  {
    path: '/income/record/:ordernum',
    name: 'income-details-record',
    component: () =>
      import(
        /* webpackChunkName: "income-details-record" */ '../views/mine/income-details-record/index.vue'
      ),
    meta: {
      title: '收益详情',
      auth: [0, 2, 3, 4, 7]
    }
  },
  {
    path: '/order/detail/:id',
    name: 'order-detail-id',
    component: () =>
      import(
        /* webpackChunkName: "order-detail-id" */ '../views/order-profit/order-detail/index.vue'
      ),
    meta: {
      title: '订单列表详情',
      auth: [0, 2, 3, 4, 7]
    }
  },
  {
    path: '/order/powercurve/:id',
    name: 'power-curve',
    component: () =>
      import(
        /* webpackChunkName: "power-curve" */ '../views/order-profit/power-curve/index.vue'
      ),
    meta: {
      title: '订单功率曲线',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/device/info/:code',
    name: 'device-info',
    component: () =>
      import(
        /* webpackChunkName: "device-info" */ '../views/device/device-info/index.vue'
      ),
    meta: {
      title: '设备信息',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/area/statis/:id',
    name: 'area-statis',
    component: () =>
      import(
        /* webpackChunkName: "area-statis" */ '../views/area/area-statis/index.vue'
      ),
    meta: {
      title: '小区统计',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/remote/charge/:code',
    name: 'remote-charge',
    component: () =>
      import(
        /* webpackChunkName: "remote-charge" */ '../views/device/remote-charge/index.vue'
      ),
    meta: {
      title: '远程充电',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/remote/recharge/:code',
    name: 'remote-recharge',
    component: () =>
      import(
        /* webpackChunkName: "remote-recharge" */ '../views/device/remote-recharge/index.vue'
      ),
    meta: {
      title: '远程充值',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/device/addr/:code',
    name: 'device-addr',
    component: () =>
      import(
        /* webpackChunkName: "device-addr" */ '../views/device/device-addr/index.vue'
      ),
    meta: {
      title: '从机列表',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/paymanage',
    name: 'pay-manage',
    component: () =>
      import(
        /* webpackChunkName: "pay-manage" */ '../views/pay-manage/index.vue'
      ),
    meta: {
      title: '缴费管理',
      auth: [0, 2, 3, 4, 7]
    }
  },
  {
    path: '/paymanage/areadevice/:aid',
    name: 'pay-manage-areadevice',
    component: () =>
      import(
        /* webpackChunkName: "pay-manage-areadevice" */ '../views/pay-manage/area-device/index.vue'
      ),
    meta: {
      title: '缴费管理',
      auth: [0, 2, 3, 4, 7]
    }
  },
  {
    path: '/preview/v3',
    name: 'preview-v3',
    component: () =>
      import(
        /* webpackChunkName: "preview-v3" */ '../views/template/preview/v3/index.vue'
      ),
    meta: {
      title: '预览模板',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/preview/v2',
    name: 'preview-v2',
    component: () =>
      import(
        /* webpackChunkName: "preview-v2" */ '../views/template/preview/v2/index.vue'
      ),
    meta: {
      title: '预览模板',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/preview/pulse',
    name: 'preview-pulse',
    component: () =>
      import(
        /* webpackChunkName: "preview-pulse" */ '../views/template/preview/pulse/index.vue'
      ),
    meta: {
      title: '预览模板',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/preview/offline',
    name: 'preview-offline',
    component: () =>
      import(
        /* webpackChunkName: "preview-offline" */ '../views/template/preview/offline/index.vue'
      ),
    meta: {
      title: '离线充值预览模板',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/chargemanage',
    name: 'charge-manage',
    component: () =>
      import(
        /* webpackChunkName: "charge-manage" */ '../views/charge-manage/index.vue'
      ),
    meta: {
      title: '充值管理',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/chargemanage/list',
    name: 'charge-manage-list',
    component: () =>
      import(
        /* webpackChunkName: "wallet-online-list" */ '../views/charge-manage/wallet-online-list/index.vue'
      ),
    meta: {
      title: '充值模板列表',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/chargemanage/charge/:id',
    name: 'charge-manage-charge',
    component: () =>
      import(
        /* webpackChunkName: "charge-manage-charge" */ '../views/charge-manage/chargeTemplate/index.vue'
      ),
    meta: {
      title: '充值模板',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/chargemanage/addcharge',
    name: 'charge-manage-charge',
    component: () =>
      import(
        /* webpackChunkName: "charge-manage-charge" */ '../views/charge-manage/chargeTemplate/index.vue'
      ),
    meta: {
      title: '新增充值模板',
      auth: [0, 2, 3, 4, 6, 7]
    }
  },
  {
    path: '/chargemanage/month',
    name: 'charge-manage-month',
    component: () =>
      import(
        /* webpackChunkName: "charge-manage-month" */ '../views/charge-manage/monthTemplate/index.vue'
      ),
    meta: {
      title: '包月模板',
      auth: [0, 2, 3, 4, 6, 7]
    }
  }
]
// process.env.BASE_URL
const router = new VueRouter({
  mode: 'history',
  base: '/merwx',
  routes,
  scrollBehavior(to, from, ...args) {
    return { x: 0, y: 0 }
  }
})

// 鉴权函数
authentication(router)

export default router
