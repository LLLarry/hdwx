<template>
    <div class="pay-manage-area d-flex flex-column justify-content-between">
        <div class="padding-bottom-3">
            <div class="text-size-md padding-x-3 padding-y-2">合伙人列表</div>
            <van-row class="d-flex post-border-row post-header margin-x-3 text-size-sm font-weight-bold">
                <van-col :span="7" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">昵称</van-col>
                <van-col :span="7" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">电话</van-col>
                <van-col :span="5" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">分成比</van-col>
                <van-col :span="5" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">应缴金额</van-col>
            </van-row>
             <van-row class="d-flex post-border-row margin-x-3 text-size-sm text-666" v-for="item in users.slice(1)" :key="item.id">
                <van-col :span="7" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">{{item.nickname || '— —'}}</van-col>
                <van-col :span="7" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">{{ item.phone }}</van-col>
                <van-col :span="5" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">{{ item.percent * 100 }}%</van-col>
                <van-col :span="5" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">&yen;{{ item.payMonet }}</van-col>
            </van-row>
        </div>
        <div class="flex-1 overflow-hidden">
            <List />
            <Footer @setUsers="setUsers" @reload="reload" />
        </div>
    </div>
</template>

<script>
import Footer from '@/components/pay-manage/footer'
import List from '@/components/pay-manage/list'
import { useInitDeviceList, useInitProvide } from '../helper'
import { ref } from '@vue/composition-api'
export default {
    components: {
        Footer,
        List
    },
    setup (props, context) {
        const areaId = context.root.$route.params.aid
        const refWrapper = useInitProvide()
        const reload = useInitDeviceList(refWrapper, { areaId })
        //
        const users = ref([])
        const setUsers = (value) => {
            users.value = value
        }
        return {
            users,
            setUsers,
            reload
        }
    }
}
</script>

<style lang="scss">
.pay-manage-area {
    height: 100vh;
    .post-border-row {
        &.post-header {
            background-color: #c8efd4;
        }
        border: 1px solid #add9c0;
        .post-border-col {
            border-right: 1px solid #add9c0;
        }
    }
}
</style>
