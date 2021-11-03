import '@/utils/global'
import 'amfe-flexible'
import '@/utils/resizeFontSize'
// import '@/assets/js/stop-drop'
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
import wx from 'weixin-js-sdk'
import VueCompositionApi from '@vue/composition-api'
// import { isiOS } from '@/utils/util'
// import ECharts from 'vue-echarts'
// import { use } from 'echarts/core'
// import { CanvasRenderer } from 'echarts/renderers'
// import { /* BarChart, */ PieChart } from 'echarts/charts'
// import { /* GridComponent,  */TooltipComponent, TitleComponent, LegendComponent } from 'echarts/components'
import {
Tabbar, TabbarItem, Grid, GridItem, Image as VanImage, Loading, Dialog, Tab, Tabs, Form, Field, Button, DropdownMenu, DropdownItem, Tag, Overlay, ContactEdit,
Icon, Search, Col, Row, NumberKeyboard, Toast, ActionSheet, Popup, Calendar, Area, NavBar, Sticky, Empty, Skeleton, Divider, Stepper, Checkbox, CheckboxGroup,
RadioGroup, Radio, Switch, Collapse, CollapseItem, Cell, CellGroup, Picker, Popover, ImagePreview
} from 'vant'

// 解决 vue当页面应用在ios微信中，使用wxsdk, wx.config报错
window.sessionStorage.setItem('__init_url__', window.location.href)

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
Vue.use(ImagePreview)

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
Window.prototype.wx = wx

Vue.mixin({
  metaInfo () {
      return {
          title: this.titleText
      }
  }
})

// use([
//   CanvasRenderer,
//   // BarChart,
//   // GridComponent,
//   TooltipComponent,
//   TitleComponent,
//   LegendComponent,
//   PieChart
// ])
// Vue.component('v-chart', ECharts)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
