<template>
  <div class="pay-manage d-flex flex-column justify-content-between bg-gray">
    <div class="margin-3 d-flex border-1 border-success rounded text-333 toggle-box">
        <div
            class="flex-1 text-center border-right-1 border-success"
            :class="{active: selectIndex === 1}"
            @click="selectIndex=1"
        ><span>设备列表</span></div>
        <div
            class="flex-1 text-center"
            :class="{active: selectIndex === 2}"
            @click="selectIndex=2"
        ><span>小区列表</span></div>
    </div>
    <main class="flex-1 overflow-hidden">
       <div v-if="selectIndex === 1" class="h-100">
            <Device :reload="reload" />
       </div>
       <div v-if="selectIndex === 2" class="h-100">
            <area-list />
       </div>
    </main>
  </div>
</template>

<script>
import { inject, ref } from '@vue/composition-api'
import Device from './device'
import AreaList from './area-list'
import { useInitDeviceList, useInitProvide } from './helper'
export default {
    components: {
        Device,
        AreaList
    },
    setup () {
        const selectIndex = ref(1)
        const refWrapper = useInitProvide()
        const reload = useInitDeviceList(refWrapper)
        const initList = inject('initList')
        return {
            selectIndex,
            initList,
            reload
        }
    }
}
</script>

<style lang="scss">
.pay-manage {
    height: 100vh;
    box-sizing: border-box;
    .toggle-box {
        line-height: 2;
        &>div {
            &.active {
                background: #28a745;
                color: #ffffff;
            }
        }
    }
}
</style>
