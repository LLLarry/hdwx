<template>
  <div class="pay-area-list h-100" style="overflow: auto">
      <hd-card class="shadow-md padding-3 text-size-sm text-666 bg-white rounded-md margin-bottom-2 margin-x-3" v-for="item in initAreaList" :key="item.id">
          <hd-card-item class="w-100 text-success text-size-md">
              <span>小区名称：</span>
              <span>龙鼎</span>
          </hd-card-item>
          <hd-card-item>
              <span>设备数量：</span>
              <span>1台</span>
          </hd-card-item>
          <hd-card-item>
              <span>合伙人数：</span>
              <span>0台</span>
          </hd-card-item>
          <hd-card-item>
              <span>已到期设备：</span>
              <span>0台</span>
          </hd-card-item>
          <hd-card-item>
              <span>即将到期设备：</span>
              <span>0台</span>
          </hd-card-item>
          <div class="text-center w-100 margin-top-2">
              <van-button size="small" type="primary" plain class="w-50" to="/paymanage/areadevice">缴费</van-button>
          </div>
      </hd-card>
  </div>
</template>

<script>
import HdCard from '@/components/hd-card'
import HdCardItem from '@/components/hd-card-item'
import { inject } from '@vue/composition-api'
export default {
    components: {
        HdCard,
        HdCardItem
    },
    setup () {
        const initAreaList = inject('initAreaList')
        return {
            initAreaList
        }
    }
}
</script>
