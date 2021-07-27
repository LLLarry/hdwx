import 'amfe-flexible'
import '@/utils/resizeFontSize'
import '@/utils/global'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Navigation from 'vue-navigation'
import HdLine from '@/components/hd-line'
import HdTitle from '@/components/hd-title'
import loadingIndex from '@/components/hd-loading/loadingIndex'
import '@/components/directive/hd-skeleton'
import qrcode from 'vue-qrcode2'
import {
Tabbar, TabbarItem, Grid, GridItem, Image as VanImage, Loading, Dialog, Tab, Tabs, Field, Button, DropdownMenu, DropdownItem, Tag, Overlay, ContactEdit,
Icon, Search, Col, Row, NumberKeyboard, Toast, ActionSheet, Popup, Calendar, Area, NavBar, Sticky, Empty, Skeleton, Divider, Stepper, Checkbox, CheckboxGroup,
RadioGroup, Radio, Switch
} from 'vant'

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

Vue.config.productionTip = false
Vue.use(Navigation, { router, store })
Vue.component('hd-line', HdLine)
Vue.component('hd-title', HdTitle)
Vue.use(require('vue-wechat-title'))

Vue.use(qrcode)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
