<template>
  <!-- 引用外部svg资源 -->
  <div
    v-if="isEternal"
    :style="styleEternalIcon"
    class="svg-eternal-icon svg-icon"
    :class="className"
  ></div>

  <!-- 引用内部svg资源 -->
  <svg
    v-else
    :class="className"
    class="svg-icon"
    aria-hidden="true"
    v-bind="attr"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import { isEternal as eternal } from '@/utils/util'
export default {
  props: {
    icon: {
      type: String,
      require: true
    },
    // 图标class类
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    // 判断当前资源是否是外部资源
    isEternal() {
      return eternal(this.icon)
    },
    styleEternalIcon() {
      return {
        mask: `url(${this.icon}) no-repeat`,
        '-webkit-mask': `url(${this.icon}) no-repeat`
      }
    },
    iconName() {
      return `#icon-${this.icon}`
    },
    attr() {
      console.log(this.$attrs)
      return this.$attrs
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.svg-eternal-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
