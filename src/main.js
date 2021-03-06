import 'core-js/stable'
import 'regenerator-runtime/runtime'
import '@/utils/global'
import 'amfe-flexible'
import '@/utils/resizeFontSize'
// import '@/assets/js/stop-drop'
// 封装vant的辅助函数
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Navigation from 'vue-navigation'
import HdLine from '@/components/hd-line'
import HdTitle from '@/components/hd-title'
import loadingIndex from '@/components/hd-loading/loadingIndex'
import VueMeta from 'vue-meta'
import '@/components/directive/hd-skeleton'
import qrcode from 'vue-qrcode2'
import '@/filter'
import '@/directive'
import '@/assets/js/watch-theme'
import wx from 'weixin-js-sdk'
import VueCompositionApi from '@vue/composition-api'
import '@/assets/js/vant-helper'
import '@/assets/js/mixin'
import '@/assets/js/v-console'
import '@/assets/svgs'
import { getURLParams } from '@/utils/util'
import {
Tabbar, TabbarItem, Grid, GridItem, Image as VanImage, Loading, Dialog, Tab, Tabs, Form, Field, Button, DropdownMenu, DropdownItem, Tag, Overlay, ContactEdit,
Icon, Search, Col, Row, NumberKeyboard, Toast, ActionSheet, Popup, Calendar, Area, NavBar, Sticky, Empty, Skeleton, Divider, Stepper, Checkbox, CheckboxGroup,
RadioGroup, Radio, Switch, Collapse, CollapseItem, Cell, CellGroup, Picker, Popover, ImagePreview, NoticeBar, DatetimePicker
} from 'vant'

// 解决 vue当页面应用在ios微信中，使用wxsdk, wx.config报错
window.sessionStorage.setItem('__init_url__', window.location.href)
// 缓存tenantId, 缓存中获取不到tenantId,再从url中取tenantId，并保存在缓存中
if (!window.sessionStorage.getItem('__init_tenantId__')) {
  const tenantId = Number.parseInt(getURLParams().tenantId)
  window.sessionStorage.setItem('__init_tenantId__', Number.isNaN(tenantId) ? '' : tenantId)
}

Vue.use(VueCompositionApi)
Vue.use(loadingIndex)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(VanImage)
Vue.use(Loading)
Vue.use(Dialog)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Tag)
Vue.use(Overlay)
Vue.use(ContactEdit)
Vue.use(Icon)
Vue.use(Search)
Vue.use(Col)
Vue.use(Row)
Vue.use(NumberKeyboard)
Vue.use(Toast)
Vue.use(ActionSheet)
Vue.use(Popup)
Vue.use(Calendar)
Vue.use(Area)
Vue.use(NavBar)
Vue.use(Sticky)
Vue.use(Empty)
Vue.use(Skeleton)
Vue.use(Divider)
Vue.use(Stepper)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Switch)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Picker)
Vue.use(Popover)
Vue.use(NoticeBar)
Vue.use(ImagePreview)
Vue.use(DatetimePicker)

Vue.config.productionTip = false
Vue.use(Navigation, { router, store })
Vue.component('hd-line', HdLine)
Vue.component('hd-title', HdTitle)

Vue.use(require('vue-wechat-title'))

Vue.use(qrcode)

Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})

Vue.mixin({
  computed: {
    tenantId () {
      return store.getters.tenantId
    }
  }
})
Window.prototype.wx = wx

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
