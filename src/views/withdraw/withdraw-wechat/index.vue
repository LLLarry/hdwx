<template>
    <div class="withdrap-wechat">
        <div class="d-flex bg-gray padding-y-4">
            <div class="padding-x-4">
                到账方式
            </div>
            <div class="flex-1 padding-x-3">
                <div class="d-flex justify-content-between align-items-center" @click="show = true">
                    <span>微信零钱</span>
                    <van-icon name="arrow" size="16" />
                </div>
                <div class="d-flex justify-content-between align-items-center margin-top-1">
                    <p class="text-size-sm text-p">实时到账</p>
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
            <van-button type="primary" block class="comfirm" @click="confirm">实时到账，确认提现</van-button>
        </div>

        <!-- 弹出层-选择提现方式 -->
        <van-popup v-model="show" position="bottom" round >
            <div class="shadow padding-y-3">
                <p class="text-center">选择提现方式</p>
            </div>
            <section :style="{ maxHeight: '70vh' }" class="overflow-auto">
                <hd-title exec>微信列表</hd-title>
                <bank-card class="margin-bottom-3 margin-x-3" showStar v-for="num in 1" :key="num" selected/>
                <hd-title exec>银行卡列表</hd-title>
                <bank-card class="margin-bottom-3 margin-x-3" showStar v-for="num in 2" :key="num"/>
                <hd-title exec>对公账户列表</hd-title>
                <bank-card class="margin-bottom-3 margin-x-3" showStar v-for="num in 1" :key="num"/>
            </section>
        </van-popup>
    </div>
</template>

<script>
import BankCard from '@/components/withdraw/bank-card'
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
            show: false
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
    methods: {
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
        }
    }
}
</script>

<style lang="scss">
.withdrap-wechat {
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
