<template>
  <div>
    <van-overlay
      :show="isShow"
      :custom-style="{
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '40vh'
      }"
    >
      <div class="hd-loading-content d-flex flex-column align-items-center padding-4 text-size-sm rounded-md">
        <van-loading size="40px"></van-loading>
        <div class="loading-text margin-top-3 padding-x-1">{{ title || '加载中···' }}</div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
export default {
  watch: {
    isShow: {
      handler (value) {
        // 隐藏之后将实例删除掉
        if (!value) {
          setTimeout(() => {
            try {
              this.$el.parentNode.removeChild(this.$el)
            } catch (error) {
              this.$el.remove()
            }
          }, 500)
        }
      }
    }
  }
}
</script>

<style lang="scss">
.hd-loading-content {
    background: rgba(0, 0, 0, .7);
    color: #fff;
}
[theme="dark"] {
  .hd-loading-content {
      background: rgba(255, 255, 255, .7);
      color: #000;
  }
}
</style>
