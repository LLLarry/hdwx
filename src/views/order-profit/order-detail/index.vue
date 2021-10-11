<template>
  <div class="income-dr bg-gray">
      <hd-line height=".4rem" />
      <div class="margin-x-3 rounded-md overflow-hidden">
          <section class="bg-success text-white padding-top-3 padding-bottom-2">
              <div class="text-center margin-bottom-4 text-size-default">充电收益</div>
              <div class="d-flex justify-content-between money-contral padding-top-2 padding-x-3">
                  <span>金额</span>
                  <span>&yen; 3.00</span>
              </div>
          </section>
          <section class="bg-white padding-y-2">
              <ul>
                  <li class="padding-x-3">
                      <div class="d-flex justify-content-between padding-y-1">
                          <div>设备编号</div>
                          <div class="text-666">000003</div>
                      </div>
                  </li>
                  <li class="padding-x-3">
                      <div class="d-flex justify-content-between padding-y-1">
                          <div>设备编号</div>
                          <div class="text-666">000003</div>
                      </div>
                  </li>
              </ul>
          </section>
      </div>
      <hd-order :list="list">
          <template #title>
              付款金额 <span class="text-size-lg">&yen; 3.00</span>
          </template>
          <template #focus>
              <span>订单状态</span>
              <span>正常</span>
              <!-- <span style="color: #f0ff0c;">正常</span> -->
          </template>
          <!-- <template #child v-slot:default="{row}">
              {{row}}
              9631
          </template> -->
      </hd-order>

      <hd-nav :list="[{}]">
          <div class="w-100 d-flex justify-content-end align-items-center">
                <van-button type="primary" size="small">功率曲线</van-button>
                <van-button disabled type="info"  size="small" class="margin-x-3">&nbsp;&nbsp;退&nbsp;&nbsp;&nbsp;&nbsp;款&nbsp;&nbsp;</van-button>
          </div>
      </hd-nav>
  </div>
</template>

<script>
import HdOrder from '@/components/hd-order'
import HdNav from '@/components/hd-nav'
export default {
    components: {
        HdOrder,
        HdNav
    },
    data () {
        return {
            list: [
                { title: '设备编号1', content: '999' }
            ]
        }
    }
}
</script>

<style lang="scss">
</style>
