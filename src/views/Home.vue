<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div>num: {{num}}</div>
    <div>
      <button @click="addNum">保存</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data () {
    return {
      num: 0
    }
  },
  mounted () {
    new Promise((resolve, reject) => {
      reject(new Error('失败156'))
    }).then(() => {}, reason => {
      console.log(reason)
    })
    const list = Array.of(1, 2, 3).map(num => num * 2)
    console.log(list)
  },
  components: {
    HelloWorld
  },
  methods: {
    addNum () {
      this.num++
    }
  }
}
</script>

<style lang="scss">
button {
  width: 60px;
  height: 38px;
  text-align: center;
  line-height: 38px;
}
</style>
