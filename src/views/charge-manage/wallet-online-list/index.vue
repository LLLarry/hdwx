<template>
  <div class="wallet-online-list bg-gray">
    <div class="padding-top-3" />
    <list-item
      v-for="item in templateData"
      :key="item.id"
      :tempData="item"
      @reload="reload"
    />
    <!-- 底部导航 -->
    <hd-nav :list="navList">
        <template v-slot="{row}">
          <van-button
              size="small"
              class="padding-x-4 w-50"
              @click="row.onClick"
              :icon="row.icon"
              :type="row.type ? row.type : 'primary'"
          >{{row.text}}</van-button>
        </template>
    </hd-nav>
  </div>
</template>

<script>
import ListItem from '@/components/charge-manage/list-item'
import { areaTopUpTemplatePreview } from '@/require/charge-manage'
import HdNav from '@/components/hd-nav'
export default {
  components: {
    ListItem,
    HdNav
  },
  data () {
    return {
      templateData: [],
      navList: [
        {
          text: '添加充值模板',
          icon: 'plus',
          onClick: () => this.$router.push({ path: '/chargemanage/addcharge' })
        }
      ]
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      try {
        const { code, message, templateData } = await areaTopUpTemplatePreview()
        if (code === 200) {
          this.templateData = templateData
        } else {
          this.toast(message)
        }
      } catch (error) {
        this.alert('异常错误')
      }
    },
    reload () {
      this.init()
    }
  }
}
</script>

<style lang="scss">
.wallet-online-list {
  min-height: 100vh;
  padding-bottom: 60px;
}
</style>
