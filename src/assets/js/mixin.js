import Vue from 'vue'
Vue.mixin({
  metaInfo () {
      return {
          title: this.titleText
      }
  }
})
