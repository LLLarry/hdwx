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
          <van-tabbar-item icon="search" replace to="/navigation">导航</van-tabbar-item>
          <van-tabbar-item icon="setting-o" replace to="/mine">我的</van-tabbar-item>
      </van-tabbar>
  </div>
</template>

<script>
    import { mapState } from 'vuex'
    import accessRecord from '@/assets/js/access-record'
    import { generateNewStyle, writeStyle } from '@/utils/theme'
    import color from 'css-color-function'
    import rgbHex from 'rgb-hex'
    console.log(rgbHex(color.convert('color(rgba(0 ,0 , 0) tint(100%))')))
    export default {
        data () {
            return {
                active: 0,
                showTabBar: false
            }
        },
        mounted () {
          accessRecord()
        },
        computed: {
          ...mapState(['global'])
        },
        watch: {
          $route: {
            handler (route) {
              this.showTabBar = route.meta.showTabBar
              const { path } = this.$route
              this.active = path === '/' ? 0 : path === '/navigation' ? 1 : 2
            }
          },
          // 监听主题值的改变，设置项目主题
          'global.theme': {
            handler (theme) {
              try {
                const styles = Array.from(document.querySelectorAll('.reset-style'))
                for (const style of styles) {
                  style && style.remove()
                }
                const html = document.documentElement || document.querySelector('html') || document.getElementsByTagName('html')[0]
                if (theme === 'dark') {
                  generateNewStyle('#000000').then(cssText => {
                    writeStyle(cssText)
                    html && html.setAttribute('theme', 'dark')
                  })
                } else {
                  html && html.removeAttribute('theme')
                }
              } catch (error) {

              }
            },
            immediate: true
          }
        }
    }
</script>

<style lang="scss">
@import './assets/style/base.scss';
@import './assets/style/hdwx-bootstrap.scss';
// @import './assets/style/iconfont.css';
@import './assets/style/animate.css';
@font-face {
    font-family: "mathNum";
    src: url("./assets/fonts/number/DINMITTELSCHRIFT.woff2") format("woff2"),
        url("./assets/fonts/number/DINMITTELSCHRIFT.woff") format("woff"),
        url("./assets/fonts/number/DINMITTELSCHRIFT.ttf") format("truetype"),
        url("./assets/fonts/number/DINMITTELSCHRIFT.eot") format("embedded-opentype"),
        url("./assets/fonts/number/DINMITTELSCHRIFT.svg") format("svg");
}
.math-num {
    font-family: "mathNum";
}
#app {
  min-height: 100vh;
}
.v-enter-active, .v-leave-active {
  transition: all .3s;
}
.v-enter {
  transform: translateX(100%);
}
.v-leave-to {
  transform: translateX(-100%);
}
.v-enter-active {
  transition-delay: .3s;
}
</style>
