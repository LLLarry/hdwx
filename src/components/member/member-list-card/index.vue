<template>
    <div class="member-list-card position-relative text-size-md text-666 shadow margin-x-2 rounded-md overflow-hidden margin-bottom-3 bg-white">
        <div class="top padding-x-2 padding-top-2 d-flex align-items-center">
            <van-image
                width="45"
                height="45"
                :src="copyValue.headimgurl | fmtAvatar"
                class="rounded-circle overflow-hidden"
            />
            <div class="flex-1 margin-left-2 d-flex justify-content-between align-items-center">
                <div class="">
                    <div>{{copyValue.username}}</div>
                </div>
            </div>
        </div>
        <hd-card class="padding-2 text-size-sm" :class="{ reSizeColor: from === 2}">
            <hd-card-item>
                <span class="card-item-title text-666">充值金额：</span>
                <span class="card-item-content text-999">{{ copyValue.topupmoney | fmtMoney }}元</span>
            </hd-card-item>
            <hd-card-item>
                <span class="card-item-title text-666">赠送金额：</span>
                <span class="card-item-content text-999">{{ copyValue.sendmoney | fmtMoney }}元</span>
            </hd-card-item>
            <hd-card-item>
                <span class="card-item-title text-666">用户ID：</span>
                <span class="card-item-content text-999">{{copyValue.uid && copyValue.uid.toString().padStart(8, '0')}}</span>
            </hd-card-item>
            <hd-card-item>
                <span class="card-item-title text-666">电话：</span>
                <span class="card-item-content text-999">
                    {{copyValue.cellphone}}
                    <van-icon
                        name="edit"
                        size=".45rem"
                        class="text-primary"
                        @click="userInfoShow = true"
                        v-if="from === 2"
                    />
                </span>
            </hd-card-item>
            <hd-card-item>
                <span class="card-item-title text-666">归属小区：</span>
                <span class="card-item-content text-999">{{copyValue.areaname}}</span>
            </hd-card-item>
        </hd-card>
        <div class="bottom padding-x-2 padding-bottom-2 d-flex justify-content-end" v-if="from === 1">
            <van-button
                type="primary"
                size="mini"
                class="margin-right-1"
                plain
                :to="`/member/manage/${copyValue.uid}?aid=${copyValue.aid === void 0 ? '' : copyValue.aid}&walletid=${copyValue.walletid === void 0 ? '' : copyValue.walletid}`"
            >管理会员</van-button>
            <van-button
                type="info"
                size="mini"
                class="margin-right-1"
                plain
                :to="`/member/record/${copyValue.uid}?aid=${copyValue.aid === void 0 ? '' : copyValue.aid}`"
            >消费记录</van-button>
            <van-button
                type="warning"
                size="mini"
                plain
                @click="$emit('changeArea', copyValue)"
            >更改小区</van-button>
        </div>
        <edit-user v-model="userInfoShow" :user.sync="copyValue" @reset="reset" />
    </div>
</template>
<script>
import hdCard from '@/components/hd-card'
import hdCardItem from '@/components/hd-card-item'
import EditUser from '@/components/member/edit-user'
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
            userInfoShow: false,
            copyValue: {}
        }
    },
    watch: {
        value: {
            handler (val) {
                this.copyValue = { ...val }
            },
            immediate: true
        }
    },
    methods: {
        reset () {
            this.copyValue = { ...this.value }
        }
    },
    components: {
        hdCard,
        hdCardItem,
        EditUser
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
