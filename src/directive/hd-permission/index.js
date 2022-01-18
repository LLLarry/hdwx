/**
 * 权限指令
 * value参数： number[]
 * value数组包含auth时显示，否则隐藏
 */
import Vue from 'vue'
import store from '@/store'
Vue.directive('hd-permission', {
  bind: handler,
  inserted: handler,
  update: handler
})

function handler(el, { value }) {
  if (!Array.isArray(value)) return removeEl(el)
  const auth = store.state.user.auth
  const flag = value.includes(auth)
  if (!flag) {
    removeEl(el)
  }
}

function removeEl(el) {
  el && el.parentNode && el.parentNode.removeChild(el)
}
