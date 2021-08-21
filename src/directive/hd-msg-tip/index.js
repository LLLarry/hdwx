import Vue from 'vue'
import hdMsgTip from './index.vue'
const HdMsgTipConstructor = Vue.extend(hdMsgTip)
Vue.directive('hd-msg-tip', {
    bind: function (el, binding) {
        const dom = document.createElement('div')
        const hdMsgTipComponent = new HdMsgTipConstructor({
            el: dom,
            data () {
                return {
                    msg: binding.value,
                    style: binding.arg || { color: '#ee0a24' }
                }
            }
        })
        el.appendChild(hdMsgTipComponent.$el)
        el._hd_msg_tip_ = hdMsgTipComponent
    },
    update: function (el, binding) {
        if (el._hd_msg_tip_) {
            el._hd_msg_tip_.msg = binding.value
        }
    }
})
