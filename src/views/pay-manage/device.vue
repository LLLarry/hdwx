<template>
  <div class="pay-manage-device d-flex flex-column justify-content-between">
        <List />
        <Footer @reload="reload" />
  </div>
</template>

<script>
import Footer from '@/components/pay-manage/footer'
import List from '@/components/pay-manage/list'
export default {
    props: {
        reload: {
            type: Function,
            default: () => {}
        }
    },
    components: {
        Footer,
        List
    }
}
</script>

<style lang="scss">
.pay-manage-device {
    height: 100%;
}
</style>
