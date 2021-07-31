<template>
  <div class="scroll-content overflow-hidden position-relative" ref="wrapper">
      <slot></slot>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import Pullup from '@better-scroll/pull-up'
import MouseWheel from '@better-scroll/mouse-wheel'
import ScrollBar from '@better-scroll/scroll-bar'
BScroll.use(ObserveDOM)
BScroll.use(Pullup)
BScroll.use(MouseWheel)
  BScroll.use(ScrollBar)

export default {
    props: {
        click: {
            type: Boolean,
            default: true
        },
        probeType: {
            type: Number,
            default: 0
        },
        bounce: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            scroll: null
        }
    },
    mounted () {
        this.scroll = this.initBScroll()
        this.$emit('getScroll', {
            scroll: this.scroll,
            ...this.$attrs
        })
        if (this.scroll !== null) {
            this.scroll.on('pullingUp', () => {
                console.log('底部')
                this.$emit('pullingUpFn', {
                    scroll: this.scroll,
                    ...this.$attrs
                })
                // this.scroll.finishPullUp() // 上拉加载动作完成后调用此方法告诉BScroll完成一次上拉动作
            })
        }
    },
    methods: {
        initBScroll () {
            const wrapper = this.$refs.wrapper
            return new BScroll(wrapper, {
                scrollY: true,
                click: true,
                observeDOM: true, // 监听dom的变化
                bounce: this.bounce, // 当滚动超过边缘的时候会有一小段回弹动画。设置为 true 则开启动画。
                mouseWheel: true, // 支持鼠标滚动
                scrollbar: true, // 出现滚动条
                HWCompositing: false, // 关闭硬件加速，取消translateZ(1px)
                pullUpLoad: {
                    // 当上拉距离超过30px时触发 pullingUp 事件
                    threshold: 40
                }
            })
        }
    }
}
</script>

<style lang="scss">
.scroll-content {
    width: 100%;
    height: 100%;
}
</style>
