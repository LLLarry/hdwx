<template>
    <div class="withdraw-page">
        <div class="d-flex bg-gray padding-y-4">
            <div class="padding-x-4">
                到账方式
            </div>
            <div class="flex-1 padding-x-3">
                <div class="d-flex justify-content-between align-items-center" @click="handleToggle">
                    <div>
                        {{accountInfo.bankname}}
                        <span class="text-p text-size-sm" v-if="accountInfo.type === 2">（对公账户）</span>
                    </div>
                    <van-icon name="arrow" size="16" />
                </div>
                <div class="d-flex justify-content-between align-items-center margin-top-1" v-if="accountInfo.type !== 3 && accountInfo.bankcardnum">
                    ({{accountInfo.bankcardnum}})
                </div>
                <div class="d-flex justify-content-between align-items-center margin-top-1">
                    <p class="text-size-sm text-p">{{accountTime}}</p>
                </div>
            </div>
        </div>
        <div class="bg-white padding-y-3 padding-x-4">
            <div class="text-666">提现金额</div>
            <div class="money-box d-flex justify-content-between align-items-center margin-top-1">
                <span class="money-icon">&yen;</span>
                <van-field
                    class="money-input"
                    v-model="money"
                    placeholder="提现金额"
                />
            </div>
            <div class="margin-top-3">
                <p class="text-p" v-if="money.length <= 0">
                    总金额：{{ totolMoney }} 元
                    <span style="color: #0984B5;" class="margin-left-1" @click="cashAll">全部提现</span>
                </p>
                <p class="text-p" v-else>
                    额外扣除 &yen;{{feeRateMoney}} 服务费 （费率{{rate * 100}}%）
                </p>
            </div>
        </div>

        <div class="padding-x-4">
            <van-button type="primary" block class="comfirm" @click="confirm">{{accountTime}}，确认提现</van-button>
        </div>

        <!-- 弹出层-选择提现方式 -->
        <van-popup v-model="show" position="bottom" round >
            <div class="shadow padding-y-3">
                <p class="text-center">选择提现方式</p>
            </div>
            <section :style="{ maxHeight: '70vh' }" class="overflow-auto">
                <hd-title exec>微信列表</hd-title>
                <bank-card
                    class="margin-bottom-3 margin-x-3"
                    :type="3"
                    showStar
                    v-for="item in wechatList"
                    :key="item.id"
                    :data="item"
                    @handleSelect="handleSelect"
                    :selected="item.id === accountInfo.id"
                />
                <hd-title exec>银行卡列表</hd-title>
                <bank-card
                    class="margin-bottom-3 margin-x-3"
                    :type="1"
                    showStar
                    v-for="item in bankCardList"
                    :key="item.id"
                    @handleSelect="handleSelect"
                    :data="item"
                    :selected="item.id === accountInfo.id"
                />
                <hd-title exec>对公账户列表</hd-title>
                <bank-card
                    class="margin-bottom-3 margin-x-3"
                    :type="2"
                    showStar
                    v-for="item in companyBnkCardList"
                    :key="item.id"
                    @handleSelect="handleSelect"
                    :data="item"
                    :selected="item.id === accountInfo.id"
                />
            </section>
        </van-popup>
    </div>
</template>

<script>
import BankCard from '@/components/withdraw/bank-card'
import { getBankList } from '@/views/withdraw/helper'
export default {
    components: {
        BankCard
    },
    data () {
        return {
            totolMoney: 5563.32, // 总资产
            money: '', // 输入的金额
            rate: 0.006, // 提现的费率
            feeRateMoney: '', // 手续费
            show: false,
            accountInfo: {}, // 当前选择的账户
            wechatList: [{ bankname: '微信零钱', id: -1, type: 3 }], // 微信列表
            bankCardList: [], // 个人银行卡
            companyBnkCardList: [] // 对公账户银行卡
        }
    },
    computed: {
        titleText () {
            switch (this.accountInfo.type) {
                case 1 : return '提现到银行卡'
                case 2 : return '提现到对公账户'
                case 3 : return '提现到微信零钱'
                default: return '提现'
            }
        },
        // 到账时间
        accountTime () {
            switch (this.accountInfo.type) {
                case 1 : return '第二个工作日到账'
                case 2 : return '七个工作日内到账'
                case 3 : return '实时到账'
                default: return '提现'
            }
        }
    },
    watch: {
        money (value) {
            if (!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d{0,})$/.test(value)) {
                value = parseFloat(value)
                value = isNaN(value) ? '' : Math.abs(value)
            }
            // 根据提现金额计算出提现手续费
            const copyMoney = parseFloat(value)
            if (!isNaN(copyMoney)) {
                this.feeRateMoney = (copyMoney * this.rate).toFixed(2)
            }
            // 当提现金额大于最大金额时，使用最大金额作为提现金额
            if (copyMoney > this.totolMoney) {
                value = this.totolMoney
            }
            this.money = value
        }
    },
    mounted () {
        this.init()
    },
    methods: {
        async init () {
            try {
                // 获取银行卡列表
                const { bankCardList = [], companyBnkCardList = [] } = await getBankList()
                this.bankCardList = bankCardList
                this.companyBnkCardList = companyBnkCardList
                const { type } = this.$route.params
                const { id } = this.$route.query
                switch (Number(type)) {
                    case 1 :
                    this.accountInfo = this.bankCardList.find(item => item.id === Number(id))
                        break
                    case 2 :
                    this.accountInfo = this.companyBnkCardList.find(item => item.id === Number(id))
                        break
                    case 3 :
                    this.accountInfo = this.wechatList[0]
                        break
                    default :
                        this.$dialog.alert({
                            title: '提示',
                            message: '异常错误'
                        }).then(() => {
                            this.$router.go(-1)
                        })
                        break
                }
            } catch (error) {
                this.$dialog.alert({
                    title: '提示',
                    message: '异常错误'
                }).then(() => {
                    this.$router.go(-1)
                })
            }
        },
        cashAll () {
            this.money = this.totolMoney
        },
        confirm () {
            const moeny = parseFloat(this.money)
            if (isNaN(moeny)) {
                return this.$dialog.alert({
                    title: '提示',
                    message: '提现金额为非法数字或未输入提现金额，请重新输入'
                })
            }
            if (moeny <= 0) {
                return this.$dialog.alert({
                    title: '提示',
                    message: '提现金额必须为正数'
                })
            }
            this.$dialog.alert({
                message: moeny
            })
            console.log(moeny)
        },
        // 切换提现方式
        handleToggle () {
            this.show = true
        },
         // 获取银行卡账户
        // async getBankCard () {
        //     try {
        //         const { code, message, bankCardList = [], companyBnkCardList = [] } = await merBankCardData()
        //         if (code === 200) {
        //             this.bankCardList = fmtBankCard(bankCardList)
        //             this.companyBnkCardList = fmtBankCard(companyBnkCardList)
        //         } else {
        //             this.$toast(message)
        //         }
        //     } catch (error) {
        //         this.$dialog.alert({
        //             title: '提示',
        //             message: '异常错误'
        //         }).then(() => {
        //             wx.closeWindow()
        //         })
        //     }
        // },
        // 选择到账方式
        handleSelect (value) {
            this.accountInfo = value
            this.show = false
        }
    }
}
</script>

<style lang="scss">
.withdraw-page {
    min-height: 100vh;
    background: #f8f8f8;
    .money-box {
        border-bottom: 1px solid #f7f7f7;
        .money-icon {
            font-size: 40px;
        }
        .money-input {
            font-size: 28px;
            input {
                &::-webkit-input-placeholder {
                    font-size: 16px;
                    color: #aaa;
                }
            }
        }
    }
    .comfirm {
        height: 38px;
        margin-top: 25px;
    }
}
</style>
