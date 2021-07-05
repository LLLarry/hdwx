<template>
    <div class="ic-list-manage position-relative bg-gray overflow-hidden">
        <member-list-card class="manage-card position-relative margin-top-3" :value="member" :from="2"/>
        <hd-title>
            钱包充值
            <!-- <template v-slot:desc >ssss</template> -->
        </hd-title>
        <div class="padding-x-3 padding-y-3 bg-white ">
            <van-row type="flex" align="center" gutter="15" class="margin-top-1">
                <van-col span="12">
                    <van-row type="flex" align="center">
                        <van-col span="10">充值金额</van-col>
                        <van-col span="14">
                            <van-search v-model="virtual.money" type="number" class="post-search" placeholder="充值金额" left-icon=''/>
                        </van-col>
                    </van-row>
                </van-col>
                <van-col span="12">
                    <van-row type="flex" align="center">
                        <van-col span="10">赠送金额</van-col>
                        <van-col span="14">
                            <van-search v-model="virtual.sendmoney" type="number" class="post-search" placeholder="赠送金额" left-icon=''/>
                        </van-col>
                    </van-row>
                </van-col>
            </van-row>
            <div class="d-flex margin-top-4 padding-top-1">
                <van-button plain type="info" size="small" class="flex-1 margin-right-2" @click="handleVirtual(20, 0)">20元</van-button>
                <van-button plain type="info" size="small" class="flex-1 margin-right-2" @click="handleVirtual(50, 0)">50元</van-button>
                <van-button plain type="info" size="small" class="flex-1 margin-right-2" @click="handleVirtual(100, 0)">100元</van-button>
                <van-button plain type="danger" size="small" class="flex-1" @click="handleVirtual(-member.money, -member.sendmoney)">清零</van-button>
            </div>
            <div class="d-flex margin-top-4 padding-top-1">
                <van-button type="info" size="normal" class="flex-1 begin-set" @click="handleCharge">立即充值</van-button>
            </div>
        </div>
    </div>
</template>
<script>
import memberListCard from '@/components/member/member-list-card'
import { getType } from '@/utils/util'
export default {
    data () {
        return {
            member: {
                address: '开元路',
                aid: 2193,
                arename: '洛阳悦府',
                cellphone: '15137984005',
                id: 743756,
                nick: '闫宇航',
                role: 5,
                rolename: '一级游客',
                sendmoney: 0,
                topupmoney: 673,
                wallerid: 743756,
                walletid: 743756
            },
            virtual: {}, // 虚拟充值容器
            deleteUrl: require('../../../assets/images/delete_icon.png'),
            deleteUserOnCrad: false, // 解绑用户
            deleteCrad: false // 删除IC卡
        }
    },
    mounted () {
    },
    components: {
        memberListCard
    },
    methods: {
        handleVirtual (money, sendmoney) {
            this.virtual = {
                money: money.toString(),
                sendmoney: sendmoney.toString()
            }
        },
        handleCharge () {
            let money = this.verifiMoney(this.virtual.money)
            let sendmoney = this.verifiMoney(this.virtual.sendmoney)
            if (money === '为非法数字' || sendmoney === '为非法数字') {
                if (money === '为非法数字') {
                    return this.$toast(`充值金额${money}`)
                }
                if (sendmoney === '为非法数字') {
                    return this.$toast(`赠送金额${sendmoney}`)
                }
            }
            if (money === '空字符串' && sendmoney === '空字符串') {
                return this.$toast('请输入要充值的金额')
            }
            money = money === '空字符串' ? 0 : money
            sendmoney = sendmoney === '空字符串' ? 0 : sendmoney
            alert(`${money},${sendmoney}`)
        },
        verifiMoney (money) {
            // eslint-disable-next-line no-debugger
            // debugger
            if (getType(money) === 'number') {
                if (Number.isNaN(money)) {
                    return '为非法数字'
                }
                return money
            } else if (getType(money) === 'string') {
                if (money.trim().length === 0) {
                    return '空字符串'
                } else {
                    money = Number.parseFloat(money)
                    if (Number.isNaN(money)) {
                        return '为非法数字'
                    }
                    return money
                }
            } else if (getType(money) === 'undefined') {
                return '空字符串'
            } else {
                return '为非法数字'
            }
        }
    }
}
</script>

<style lang="scss">
.ic-list-manage {
     min-height: 100vh;
    .manage-card {
        margin-bottom: 0;
        z-index: 1;
        background-image: url('../../../assets/images/card_bottom.png');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: bottom;
        background-position: 0 -140px;
        &::after {
            content: '';
            position: absolute;
            z-index: -1;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background-image: linear-gradient(-45deg, rgba(11, 156, 255, 0.5), rgba(107, 152, 234, 0.81));
            // background-image: linear-gradient(to -45deg, red, blue);
        }
    }
    .post-search {
        padding: 0;
        border: 1px solid #efefef;
    }
    .begin-set {
        background-image: linear-gradient(-45deg, rgba(11, 156, 255, .5), rgba(107, 152, 234, .81));
        height: 1rem;
    }
    .delete-content {
        .delete-item {
            width: 35%;
            .delete-icon {
                width: 50px;
            }
        }
    }
}
</style>
