<template>
  <div class="navigation-page">
    <header></header>
    <div class="post-menu d-flex">
      <div class="slide flex-1">
        <ul>
          <li v-for="(item, index) in map" :key="item.title" @click="handleSelect(index)">
            <div class="text-center text-999 padding-y-2" :class="{ 'text-success': active === index }">{{item.title}}</div>
          </li>
        </ul>
      </div>
      <div class="content bg-gray flex-3">
        <div class="wrapper">
          <div class="block overflow-hidden" v-for="item in map" :key="item.title">
            <van-divider>{{item.title}}</van-divider>
            <ul class="d-flex flex-wrap">
              <li class="w-50 text-center" v-for="one in item.list" :key="one.name">
                <div style="height: 80px; line-height: 80px;">{{one.name}}</div>
              </li>
            </ul>
          </div>
          <div class="bottom-race"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const map = [
  {
    title: '设备',
    list: [
      { name: '设备管理', url: '' },
      { name: '设备绑定', url: '' }
    ]
  },
  {
    title: '管理',
    list: [
      { name: 'IC卡管理', url: '' },
      { name: '会员管理', url: '' },
      { name: '小区管理', url: '' },
      { name: '子账号管理', url: '' },
      { name: '缴费管理', url: '' }
    ]
  },
  {
    title: '统计',
    list: [
      { name: '订单统计', url: '' },
      { name: '历史收益', url: '' },
      { name: '余额明细', url: '' }
    ]
  },
  {
    title: '提现',
    list: [
      { name: '提现到微信', url: '' },
      { name: '提现到银行卡', url: '' },
      { name: '提现到对公', url: '' },
      { name: '银行卡管理', url: '' },
      { name: '提现记录', url: '' }
    ]
  }
]
export default {
  data () {
    return {
      map,
      active: '',
      heightList: []
    }
  },
  mounted () {
      this.getHeightList()
      this.bindEvent()
  },
  methods: {
      getHeightList () {
          const list = [0]
          const blocks = document.querySelectorAll('.wrapper .block')
          for (let i = 0; i < blocks.length; i++) {
              const he = list.reduce((acc, item) => {
                  acc += item
                  return acc
              }, 0)
              list.push(blocks[i].offsetHeight + he)
          }
          this.heightList = list
      },
      bindEvent () {
          const content = document.querySelector('.post-menu .content')
        //   console.log(content)
          content.addEventListener('scroll', (event) => {
            //   console.log(content.scrollTop)
              const one = this.heightList.find((item) => {
                  return content.scrollTop < item
              })
              const index = this.heightList.findIndex((item) => item === one)
              this.active = index - 1
          })
      },
      handleSelect (index) {
          const content = document.querySelector('.post-menu .content')
          content.scrollTop = this.heightList[index]
      }
  }
}
</script>

<style lang="scss">
.navigation-page {
    height: 100vh;
    header {
        height: 200px;
    }
    .post-menu {
        height: calc(100% - 200px);
        .slide {

        }
        .content {
            height: 100%;
            overflow-y: auto;
            .bottom-race {
                height: 612px;
            }
        }
    }
}
</style>
