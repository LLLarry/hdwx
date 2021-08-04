import Vue from 'vue'
import hdMask from './index.vue'
const HdMaskConstructor = Vue.extend(hdMask)
Vue.directive('hd-mask', {
    bind: function (el, binding) {
        const position = getComputedStyle(el).position
        const type = typeof binding.arg
        if (!['relative', 'absolute', 'fixed'].includes(position)) {
            el.style.position = 'relative'
        }
        const dom = document.createElement('div')
        const hdMaskComponent = new HdMaskConstructor({
            el: dom,
            data () {
                return {
                    isShow: binding.value,
                    text: type === 'string' ? binding.arg : type === 'undefined' ? '' : binding.arg.text,
                    style: binding.arg || {}
                }
            }
        })
        el.appendChild(hdMaskComponent.$el)
        el._hdMask_ = hdMaskComponent
    },
    update: function (el, binding) {
        if (el._hdMask_) {
            el._hdMask_.isShow = binding.value
        }
    }
})
