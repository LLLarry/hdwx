<template>
  <div id="app" class="text-size-md">
    <navigation>
      <!--
        <transition
          mode="out-in"
          v-if="$route.meta.title !== '授权页'"
        >
          <router-view v-slot="Component" v-wechat-title="$route.meta.title">
            <components :is="Component" />
          </router-view>
        </transition>
        <router-view v-slot="Component" v-wechat-title="$route.meta.title" v-else>
          <components :is="Component" />
        </router-view>
        -->
      <router-view v-slot="Component" v-wechat-title="$route.meta.title">
        <components :is="Component" />
      </router-view>
    </navigation>

    <van-tabbar v-model="active" v-if="showTabBar">
      <van-tabbar-item icon="home-o" replace to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="search" replace to="/navigation"
        >导航</van-tabbar-item
      >
      <van-tabbar-item icon="setting-o" replace to="/mine"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import watchThemeHandler from '@/assets/js/watch-theme'
import { provide } from '@vue/composition-api'
// import color from 'css-color-function'
// import rgbHex from 'rgb-hex'
// console.log(rgbHex(color.convert('color(rgba(0 ,0 , 0) tint(100%))')))
export default {
  data() {
    return {
      active: 0,
      showTabBar: false
    }
  },
  computed: {
    ...mapState(['global', 'user'])
  },
  watch: {
    $route: {
      handler(route) {
        if (this.user.auth === 6) {
          this.showTabBar = false
        } else {
          this.showTabBar = route.meta.showTabBar
        }
        const { path } = this.$route
        this.active = path === '/' ? 0 : path === '/navigation' ? 1 : 2
      }
    },
    // 监听主题值的改变，设置项目主题
    'global.theme': {
      handler(theme) {
        watchThemeHandler(theme)
      },
      immediate: true
    }
  },
  setup (props, context) {
    provide('$root', context.root)
  }
}
</script>

<style lang="scss">
@import './assets/style/base.scss';
@import './assets/style/hdwx-bootstrap.scss';
// @import './assets/style/iconfont.css';
@import './assets/style/animate.css';
@font-face {
  font-family: 'mathNum';
  src: url('./assets/fonts/number/DINMITTELSCHRIFT.woff2') format('woff2'),
    url('./assets/fonts/number/DINMITTELSCHRIFT.woff') format('woff'),
    url('./assets/fonts/number/DINMITTELSCHRIFT.ttf') format('truetype'),
    url('./assets/fonts/number/DINMITTELSCHRIFT.eot')
      format('embedded-opentype'),
    url('./assets/fonts/number/DINMITTELSCHRIFT.svg') format('svg');
}
.math-num {
  font-family: 'mathNum';
}
#app {
  min-height: 100vh;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}
.v-enter {
  transform: translateX(100%);
}
.v-leave-to {
  transform: translateX(-100%);
}
.v-enter-active {
  transition-delay: 0.3s;
}
</style>
