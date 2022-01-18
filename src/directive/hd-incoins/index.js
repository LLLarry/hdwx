import Vue from 'vue'
import store from '@/store'
/**
 * value: 值分为两种：
 *  undefined: 删除el元素
 *  Boolean:
 *      true 删除el元素
 *      false 不删除el元素
 */
Vue.directive('hd-incoins', {
  bind: handler,
  inserted: handler,
  update: handler
})

function handler(el, { value }) {
  if (typeof value === 'boolean' && !value) return false
  const isHide = store.state.user.showincoins !== 1
  if (isHide) {
    el && el.parentNode && el.parentNode.removeChild(el)
  }
}
