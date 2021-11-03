<template>
  <div class="pay-manage-device d-flex flex-column justify-content-between">
        <List />
        <Footer />
  </div>
</template>

<script>
import Footer from '@/components/pay-manage/footer'
import List from '@/components/pay-manage/list'
import { useInitDeviceList } from './helper'
export default {
    components: {
        Footer,
        List
    },
    setup () {
        const initList = useInitDeviceList()
        return {
            initList
        }
    }
}
</script>

<style lang="scss">
.pay-manage-device {
    height: 100%;
}
</style>
