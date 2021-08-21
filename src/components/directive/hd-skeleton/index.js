import Vue from 'vue'
import hdSkeletonComponent from './hd-skeleton.vue'
const HdSkeletonConstructor = Vue.extend(hdSkeletonComponent)
Vue.directive('no-data', {
    bind (el, { arg = {}, value }) {
        if (!el) return
        const { image, description = '暂无数据', ...exec } = arg
        el._dom = new HdSkeletonConstructor({
            el,
            data () {
              return {
                image,
                description,
                type: value,
                exec
              }
            }
        })
        if (value) {
            el.appendChild(el._dom.$el)
        }
    },
    update (el, binding) {
        if (!el) return
        if (binding.value) {
            el._dom.type = binding.value
            el.appendChild(el._dom.$el)
        } else {
            if (el.contains(el._dom.$el)) {
                el.removeChild(el._dom.$el)
            }
        }
    }
})
