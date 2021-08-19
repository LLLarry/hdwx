<template>
    <div class="ic-list-manage position-relative bg-gray overflow-hidden">
        <ic-list-card class="manage-card position-relative margin-top-3" :value="card" :from="2"/>
        <hd-title>
            在线卡充值
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
                <van-button plain type="danger" size="small" class="flex-1" @click="handleVirtual(-card.money, -card.sendmoney)">清零</van-button>
            </div>
            <div class="d-flex margin-top-4 padding-top-1">
                <van-button type="info" size="normal" class="flex-1 begin-set" @click="handleCharge">立即充值</van-button>
            </div>
        </div>

        <hd-title>
            解绑操作
        </hd-title>

        <div class="delete-content padding-x-3 padding-y-4 bg-white d-flex justify-content-around align-items-center">
            <div class="delete-item shadow padding-3 d-flex justify-content-around align-items-center" @click="deleteUserOnCrad=true">
                <img :src="deleteUrl" class="delete-icon">
                <span>解绑用户</span>
            </div>
            <div class="delete-item shadow padding-3 d-flex justify-content-around align-items-center" @click="deleteCrad=true">
                <img :src="deleteUrl" class="delete-icon">
                <span>删除IC卡</span>
            </div>
        </div>

        <!-- 解绑用户 -->
        <hd-overlay :show="deleteUserOnCrad" title="解绑用户" @close="deleteUserOnCrad = false">
            <div class="text-center text-size-sm" v-if="card.relevawalt !== 1">
                当前<span class="text-danger">IC卡余额为(充值：{{card.money}}元、赠送：{{card.sendmoney}}元)</span>，解绑用户会自动清除卡余额
            </div>
            <div class="text-center text-size-sm" v-else>
                当前<span class="text-danger">IC卡已关联钱包</span>，解绑用户会不会清除卡余额
            </div>
            <h5 class="text-center text-size-sm margin-top-3 margin-bottom-2">
                会进行以下操作
            </h5>
            <ul class="text-size-sm" v-if="card.relevawalt !== 1">
                <li class="margin-bottom-1"><p>1、IC卡余额清零</p></li>
                <li class="margin-bottom-1"><p>2、解除IC卡与用户绑定的关系</p></li>
            </ul>
            <ul class="text-size-sm" v-else>
                <li class="margin-bottom-1"><p>1、解除IC卡与用户绑定的关系</p></li>
            </ul>
            <van-button type="info"  size="small" class="w-100 margin-top-2" @click="unbind">
                <span class="position-relative" >立即解绑</span>
            </van-button>
        </hd-overlay>

        <!-- 删除IC卡 -->
        <hd-overlay :show="deleteCrad" title="删除IC卡" @close="deleteCrad = false">
            <div class="text-center text-size-sm" v-if="card.relevawalt !== 1">
                当前<span class="text-danger">IC卡余额为(充值：{{card.money}}元、赠送：{{card.sendmoney}}元)</span>，删除IC卡会自动清除卡余额
            </div>
            <div class="text-center text-size-sm" v-else>
                当前<span class="text-danger">IC卡已关联钱包</span>，删除IC卡不会清除卡余额
            </div>
            <h5 class="text-center text-size-sm margin-top-3 margin-bottom-2">
                会进行以下操作
            </h5>
            <ul class="text-size-sm" v-if="card.relevawalt !== 1">
                <li class="margin-bottom-1"><p>1、IC卡余额清零</p></li>
                <li class="margin-bottom-1"><p>2、解除IC卡与用户的绑定关系</p></li>
                <li class="margin-bottom-1"><p>3、解除IC卡与商户的绑定的关系</p></li>
            </ul>
            <ul class="text-size-sm" v-else>
                <li class="margin-bottom-1"><p>1、解除IC卡与用户的绑定关系</p></li>
                <li class="margin-bottom-1"><p>2、解除IC卡与商户的绑定的关系</p></li>
            </ul>
            <van-button type="info"  size="small" class="w-100 margin-top-2" @click="deleteCard">
                <span class="position-relative">立即删除</span>
            </van-button>
        </hd-overlay>
    </div>
</template>
<script>
import icListCard from '@/components/ic-list/ic-list-card'
import hdOverlay from '@/components/hd-overlay'
import { getType } from '@/utils/util'
import { skipVirtualTopupPage, virtualPayMoney } from '@/require/member'
import { unbindOnlineCard, deleteOnlineCard } from '@/require/ic'
export default {
    data () {
        return {
            id: '',
            card: {},
            virtual: {}, // 虚拟充值容器
            deleteUrl: require('../../../assets/images/delete_icon.png'),
            deleteUserOnCrad: false, // 解绑用户
            deleteCrad: false // 删除IC卡
        }
    },
    mounted () {
        this.id = this.$route.params.id
        this.handleGetInitData({ id: this.id })
    },
    components: {
        icListCard,
        hdOverlay
    },
    methods: {
         async handleGetInitData (data) {
            try {
                const { code, message, ...result } = await skipVirtualTopupPage({
                    ...data,
                    type: 2 //  1:用户  2:在线卡
                })
                if (code === 200) {
                  this.card = {
                        aid: result.aid,
                        areaname: result.areaname,
                        cardID: result.cardID,
                        create_time: result.createTime,
                        touristnick: result.touristnick,
                        figure: result.figure,
                        id: result.id,
                        merid: result.merid,
                        money: result.money,
                        relevawalt: result.relevawalt,
                        remark: null,
                        sendmoney: result.sendmoney,
                        status: result.status,
                        touristphone: result.touristphone,
                        type: result.type,
                        uid: result.uid
                    }
                } else {
                    this.$toast(message)
                }
            } catch (e) {
                this.$toast('异常错误')
            }
        },
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
            this.virtualPayMoneyFn({ money, sendmoney, type: 2, id: this.id, aid: this.card.aid })
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
        },
        async virtualPayMoneyFn (data) {
            try {
                const { code, message } = await virtualPayMoney(data, '虚拟充值中')
                if (code === 200) {
                    const money = this.card.money + data.money < 0 ? 0 : this.card.money + data.money
                    const sendmoney = this.card.sendmoney + data.sendmoney < 0 ? 0 : this.card.sendmoney + data.sendmoney
                    this.$dialog.alert({
                        title: '虚拟充值成功',
                        message: this.getHtml(data, money, sendmoney),
                        theme: 'round-button'
                    })
                    this.$set(this.card, 'money', money)
                    this.$set(this.card, 'sendmoney', sendmoney)
                } else {
                    this.$toast(message)
                }
            } catch (e) {
                this.$toast('异常错误')
            }
        },
        getHtml (card, money, sendmoney) {
            return `<div class="text-left" style="line-height: 0.9;">
                        <div class="margin-b-1">您已成功虚拟充值【${this.card.cardID}】在线卡</div>
                        <div class="bg-gray rounded margin-bottom-1 padding-x-3 padding-y-1">
                            <div>虚拟充值</div>
                            <div>充值金额：<span class="text-success">${card.money}元</span></div>
                            <div>赠送金额：<span class="text-success">${card.sendmoney}元</span></div>
                        </div>
                        <div class="bg-gray rounded padding-2">
                            <div>卡余额为</div>
                            <div>充值金额：<span class="text-success">${money}元</span></div>
                            <div>赠送金额：<span class="text-success">${sendmoney}元</span></div>
                        </div>
                    </div>`.replace(/[\n\r]/g, '')
        },
        // 解绑在线卡
        unbind () {
            unbindOnlineCard({ onlineid: this.id, conti: 2 })
            .then(res => {
                if (res.code === 200) {
                    this.$dialog.alert({
                        title: '提示',
                        message: '在线卡解绑成功',
                        theme: 'round-button',
                        beforeClose: (action, done) => {
                            done()
                            this.$router.replace({ path: '/ic/list' })
                        }
                    })
                } else {
                    this.$toast(res.message)
                }
            })
        },
        // 删除在线卡
        deleteCard () {
            deleteOnlineCard({ onlineid: this.id })
            .then(res => {
                if (res.code === 200) {
                    this.$dialog.alert({
                        title: '提示',
                        message: '在线卡删除成功',
                        theme: 'round-button',
                        beforeClose: (action, done) => {
                            done()
                            this.$router.replace({ path: '/ic/list' })
                        }
                    })
                } else {
                    this.$toast(res.message)
                }
            })
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
            background-image: linear-gradient(-45deg, rgba(11, 156, 255, .5), rgba(107, 152, 234, .81));
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
