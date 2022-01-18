<template>
  <div class="navigation-page">
    <header class="bg-gray">
      <van-search
        v-model="searchValue"
        placeholder="请输入导航关键词"
        readonly
        @click="slideSearch = true"
      />
    </header>
    <div class="post-menu d-flex">
      <div class="slide flex-1 bg-gray">
        <ul>
          <li
            class="padding-y-1"
            v-for="(item, index) in map"
            :key="item.title"
            @click="handleSelect(index)"
            :class="{ 'bg-white': active === index }"
          >
            <div
              class="text-center text-999 padding-y-2"
              :class="{
                'text-success active font-weight-bold': active === index
              }"
            >
              {{ item.title }}
            </div>
          </li>
        </ul>
      </div>
      <div class="content flex-3">
        <hd-scroll @getScroll="getScroll">
          <div class="wrapper">
            <div
              class="block overflow-hidden"
              v-for="item in map"
              :key="item.title"
            >
              <van-divider>{{ item.title }}</van-divider>
              <ul class="d-flex flex-wrap">
                <li
                  class="w-50 text-center padding-y-3"
                  v-for="one in item.list"
                  :key="one.name"
                  @click="handleRouter(one)"
                >
                  <div class="margin-bottom-1">
                    <img :src="one.icon" :alt="one.name" class="icon-post" />
                  </div>
                  <div class="text-000">{{ one.name }}</div>
                </li>
              </ul>
            </div>
            <div
              class="bottom-race"
              :style="{ height: `${postMenuHeight * 0.8}px` }"
            ></div>
          </div>
        </hd-scroll>
      </div>
    </div>
    <!-- 搜索列表 -->
    <van-popup
      v-model="slideSearch"
      position="right"
      :style="{ height: '100%', width: '100%' }"
    >
      <section class="bg-gray d-flex flex-column">
        <div class="d-flex align-items-center bg-white">
          <van-search
            v-model="searchValue"
            class="flex-1"
            placeholder="请输入导航关键词"
          />
          <span
            class="padding-right-3 text-success padding-y-3"
            @click="slideSearch = false"
            >取消</span
          >
        </div>
        <div class="flex-1 padding-3">
          <ul
            class="search-post bg-white padding-2 rounded-md"
            v-if="filterList.length > 0"
          >
            <li
              class="padding-y-1 d-flex align-items-center"
              v-for="item in filterList"
              :key="item.name"
              @click="handleRouter(item)"
            >
              <div class="d-flex align-items-center flex-1">
                <img :src="item.icon" :alt="item.name" />
                <span class="margin-left-2">{{ item.name }}</span>
              </div>
              <van-icon name="arrow" color="#666666" size=".46rem" />
            </li>
          </ul>
        </div>
      </section>
    </van-popup>
    <!-- 搜索列表 -->
  </div>
</template>
<script>
import HdScroll from '@/components/hd-scroll'
import { mapState } from 'vuex'
import { scanQRCode } from '@/utils/wechat-util'
import parseURL from '@/utils/parse-url'
import { bindingDevice } from '@/require/home'
import { checkAndGo } from '@/views/withdraw/helper'
const map = [
  {
    title: '设备',
    list: [
      {
        name: '设备管理',
        url: '/device/list',
        icon: require('@/assets/images/home_01.png'),
        permission: [0, 2, 3, 4, 6, 7]
      },
      {
        name: '设备绑定',
        url: '',
        icon: require('@/assets/images/home_05.png'),
        permission: [0, 2, 3, 4, 6, 7]
      }
    ]
  },
  {
    title: '管理',
    list: [
      {
        name: 'IC卡管理',
        url: '/ic/list',
        icon: require('@/assets/images/home_02.png'),
        permission: [0, 2, 3, 4, 7]
      },
      {
        name: '会员管理',
        url: '/member/list',
        icon: require('@/assets/images/home_03.png'),
        permission: [0, 2, 3, 4, 7]
      },
      {
        name: '小区管理',
        url: '/area/list',
        icon: require('@/assets/images/home_04.png'),
        permission: [0, 2, 3, 4, 7]
      },
      {
        name: '子账号管理',
        url: '/subAccount',
        icon: require('@/assets/images/mine/账号信息.png'),
        class: 'sm-img',
        permission: [0, 2, 3, 4, 7]
      },
      {
        name: '缴费管理',
        url: '',
        icon: require('@/assets/images/home_08.png'),
        permission: [0, 2, 3, 4, 7]
      }
    ]
  },
  {
    title: '统计',
    list: [
      {
        name: '订单统计',
        url: '/order/profit',
        icon: require('@/assets/images/home_07.png'),
        permission: [0, 2, 3, 4, 7]
      },
      {
        name: '历史收益',
        url: '/history/profit',
        icon: require('@/assets/images/home_06.png'),
        permission: [0, 2, 3, 4, 7]
      },
      {
        name: '余额明细',
        url: '/income',
        icon: require('@/assets/images/银行类app图标_08.png'),
        permission: [0, 2, 3, 4, 7]
      }
    ]
  },
  {
    title: '提现',
    list: [
      {
        name: '提现到微信',
        url: '/withdraw/page/3',
        icon: require('@/assets/images/mine/提现.png'),
        class: 'sm-img',
        permission: [0, 2, 4]
      },
      {
        name: '提现到银行卡',
        url: '/withdraw/page/1',
        icon: require('@/assets/images/mine/提现.png'),
        class: 'sm-img',
        permission: [0, 2, 4]
      },
      {
        name: '提现到对公',
        url: '/withdraw/page/2',
        icon: require('@/assets/images/mine/提现.png'),
        permission: [0, 2, 4]
      },
      {
        name: '银行卡管理',
        url: '/withdraw/mybankcard',
        icon: require('@/assets/images/mine/卡片.png'),
        class: 'sm-img',
        permission: [0, 2, 4]
      },
      {
        name: '提现记录',
        url: '/withdraw/record',
        icon: require('@/assets/images/mine/订单 (1).png'),
        class: 'sm-img',
        permission: [0, 2, 3, 4, 7]
      }
    ]
  }
]

export default {
  data() {
    return {
      searchValue: '',
      map,
      active: 0,
      heightList: [],
      scroll: null,
      postMenuHeight: 612,
      slideSearch: false,
      filterList: []
    }
  },
  components: {
    HdScroll
  },
  mounted() {
    this.getHeightList()
    this.bindEvent()
  },
  computed: {
    ...mapState(['global', 'user'])
  },
  watch: {
    global: {
      handler() {
        const header = document.querySelector('header')
        this.postMenuHeight = this.global.clientHeight - header.offsetHeight
      }
    },
    searchValue(value) {
      this.fmtSearch(value)
    },
    'user.auth': {
      handler(auth) {
        this.map = this.map
          .map(({ title, list }) => {
            return {
              title,
              list: list.filter(one => one.permission.includes(auth)) // 筛选出符合权限的菜单
            }
          })
          .filter(({ title, list }) => list.length > 0) // 过滤掉list为空的每一项
      },
      immediate: true
    }
  },
  methods: {
    getHeightList() {
      const list = [0]
      const blocks = document.querySelectorAll('.wrapper .block')
      for (let i = 0; i < blocks.length; i++) {
        const he = list[list.length - 1]
        list.push(blocks[i].offsetHeight + he)
      }
      this.heightList = list
    },
    getScroll({ scroll }) {
      this.scroll = scroll
    },
    bindEvent() {
      if (this.scroll) {
        this.scroll.on('scroll', ({ y }) => {
          const one = this.heightList.find(item => {
            return Math.abs(y) < item
          })
          const index = this.heightList.findIndex(item => item === one)
          this.active = index - 1
        })
      }
    },
    handleSelect(index) {
      if (this.scroll) {
        this.scroll.scrollTo(0, -this.heightList[index], 400)
      }
    },
    fmtSearch(value) {
      value = value.trim()
      if (value.length <= 0) {
        this.filterList = []
        return false
      }
      const list = this.getChildList(this.map)
      const fmtFirstList = this.map.filter(({ title }) => title.includes(value))
      const fmtSecondList1 = this.getChildList(fmtFirstList)
      const fmtSecondList2 = list.filter(({ name }) => name.includes(value))
      const result = [...fmtSecondList1, ...fmtSecondList2].reduce(
        (acc, item) => {
          const index = acc.findIndex(one => one.name === item.name)
          if (index === -1) {
            acc.push(item)
          }
          return acc
        },
        []
      )
      this.filterList = result
    },
    getChildList(list) {
      return list.reduce((acc, item) => {
        acc = [...acc, ...item.list]
        return acc
      }, [])
    },
    handleRouter({ name, url }) {
      if (name === '提现到银行卡') {
        checkAndGo(1)
      } else if (name === '提现到对公') {
        checkAndGo(2)
      } else if (name === '设备绑定') {
        // 调取扫一扫，获取扫码信息
        scanQRCode()
          .then(res => {
            const { status, message, ...result } = parseURL(res)
            if (status !== 200) return this.$toast(message)
            if (!result.code) return this.$toast('请扫描设备的二维码')
            bindingDevice({
              devicenum: result.code
            })
              .then(res => {
                this.$toast(res.message)
              })
              .catch(e => {
                this.$toast('异常错误')
              })
          })
          .catch(err => {
            console.log('errerr', err)
          })
      } else {
        this.$router.push({ path: url })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.navigation-page {
  height: 100vh;
  header {
    height: 60px;
  }
  .post-menu {
    height: calc(100% - 60px);
    .slide {
      li {
        div {
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          &.active {
            border-left: 4px solid #07c160 !important;
          }
        }
      }
    }
    .content {
      height: 100%;
      overflow-y: auto;
      .icon-post {
        width: 40px;
        height: 40px;
      }
      .bottom-race {
        height: 612px;
      }
    }
  }
  section {
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    .search-post {
      li {
        border-bottom: 1px dotted #ccc;
        &:last-child {
          border-bottom-color: transparent;
        }
        img {
          width: 35px;
          height: 35px;
        }
      }
    }
  }
}
</style>
