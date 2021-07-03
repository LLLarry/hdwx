<template>
    <div class="member-list-card position-relative text-size-md text-666 shadow margin-x-2 rounded-md overflow-hidden margin-bottom-3 bg-white">
        <div class="top padding-x-2 padding-top-2 d-flex align-items-center">
            <van-image
                width="45"
                height="45"
                :src="cardUrl"
            />
            <div class="flex-1 margin-left-2 d-flex justify-content-between align-items-center">
                <div class="">
                    <div class="font-weight-bold text-000 text-size-default card-num">{{value.nick}}</div>
                    <div>{{value.id.toString().padStart(8, '0')}}</div>
                </div>
            </div>
        </div>
        <hd-card class="padding-2 text-size-md" :class="{ reSizeColor: from === 2}">
            <hd-card-item>
                <span class="card-item-title text-333">充值金额：</span>
                <span class="card-item-content text-666">{{value.topupmoney}}元</span>
            </hd-card-item>
            <hd-card-item>
                <span class="card-item-title text-333">赠送金额：</span>
                <span class="card-item-content text-666">{{value.sendmoney}}元</span>
            </hd-card-item>
            <hd-card-item>
                <span class="card-item-title text-333">绑定人：</span>
                <span class="card-item-content text-666">{{value.nick}}</span>
            </hd-card-item>
            <hd-card-item>
                <span class="card-item-title text-333">电话：</span>
                <span class="card-item-content text-666">{{value.cellphone}}</span>
            </hd-card-item>
            <hd-card-item>
                <span class="card-item-title text-333">归属小区：</span>
                <span class="card-item-content text-666">{{value.arename}}</span>
            </hd-card-item>
        </hd-card>
        <div class="bottom padding-x-2 padding-bottom-2 d-flex justify-content-end" v-if="from === 1">
            <van-button type="primary" size="mini" class="margin-right-1" plain round :url="`/member/manage/${value.id}?aid=${value.aid}&wallerid=${value.wallerid}`">管理会员</van-button>
            <van-button type="info" size="mini" class="margin-right-1" plain round >消费记录</van-button>
            <van-button type="warning" size="mini" plain round @click="$emit('changeArea', value)">更改小区</van-button>
        </div>
    </div>
</template>
<script>
import hdCard from '@/components/hd-card'
import hdCardItem from '@/components/hd-card-item'
export default {
    props: {
        value: {
            type: Object
        },
        from: {
            type: Number,
            default: 1 // 1 默认从列表中传值， 2 从管理中传值
        }
    },
    data () {
        return {
            cardUrl: require('@/assets/images/home_02.png')
        }
    },
    components: {
        hdCard,
        hdCardItem
    }
}
</script>

<style lang="scss">
.member-list-card {
    .card-num {
        margin-bottom: 3px;
    }
    .reSizeColor {
        .card-item-title {
            color: #000;
        }
        .card-item-content {
            color: #333;
        }
    }
}
</style>
