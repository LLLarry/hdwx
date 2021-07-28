<template>
  <div id="app" class="text-size-md">
      <navigation>
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
      </navigation>

      <van-tabbar v-model="active" v-if="showTabBar">
          <van-tabbar-item icon="home-o" replace to="/">home</van-tabbar-item>
          <van-tabbar-item icon="search" replace to="/about">about</van-tabbar-item>
          <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
          <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
      </van-tabbar>
  </div>
</template>

<script>
    export default {
        data () {
            return {
                active: 1,
                showTabBar: false
            }
        },
        watch: {
          $route: {
            handler (route) {
              this.showTabBar = route.meta.showTabBar
            }
          }
        }
    }
</script>

<style lang="scss">
@import './assets/style/base.css';
@import './assets/style/hdwx-bootstrap.css';
// @import './assets/style/iconfont.css';
@import './assets/style/animate.css';
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
