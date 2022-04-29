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
                <p class="text-p" v-else-if="(Number(money) >= 0) && (Number(money) < 5)">
                    最低提现金额为 5 元
                </p>
                <p class="text-p" v-else>
                    额外扣除 &yen;{{feeRateMoney}} 服务费 （费率{{accountInfo.rate}}‰）
                </p>
            </div>
        </div>

        <div class="padding-x-4">
            <van-button type="primary" block class="comfirm" @click="confirm" :disabled="!(Number(money) >= 5)">{{accountTime}}，确认提现</van-button>
        </div>

        <!-- 弹出层-选择提现方式 -->
        <van-popup v-model="show" position="bottom" round >
            <div class="shadow padding-y-3">
                <p class="text-center">选择提现方式</p>
            </div>
            <section :style="{ maxHeight: '70vh' }" class="overflow-auto">
               <template v-if="isShowWechatRefud">
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
               </template>
                <template v-if="isShowPersonalBankRefud">
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
                </template>
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

        <van-dialog
            v-model="dialogShow"
            title="提示"
            show-cancel-button
            @confirm="setRealname"
            @cancel="realnameVal = ''"
        >
            <div class="text-size-md padding-3 text-center text-p">请先填写真实姓名，填写的真实姓名要与微信实名一致</div>
            <van-field v-model="user.realname" placeholder="请先填写真实姓名" />
        </van-dialog>
    </div>
</template>

<script>
import BankCard from '@/components/withdraw/bank-card'
import { getBankList } from '@/views/withdraw/helper'
import { weChatWithdraw, weChatWithdrawaccess, withdrawaccess } from '@/require/withdraw'
import { mapGetters } from 'vuex'
export default {
    components: {
        BankCard
    },
    data () {
        return {
            totolMoney: 0, // 总资产
            money: '', // 输入的金额
            // rate: 0.006, // 提现的费率
            feeRateMoney: '', // 手续费
            show: false,
            accountInfo: {}, // 当前选择的账户
            wechatList: [{ bankname: '微信零钱', id: -1, type: 3, rate: 6 }], // 微信列表
            bankCardList: [], // 个人银行卡
            companyBnkCardList: [], // 对公账户银行卡
            subPartner: false, // 是不是特约合伙人
            user: {}, // 提现人信息
            dialogShow: false
        }
    },
    computed: {
        ...mapGetters(['isShowWechatRefud', 'isShowPersonalBankRefud']),
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
                this.feeRateMoney = (copyMoney * this.accountInfo.rate / 1000).toFixed(2)
            }
            // 当提现金额大于最大金额时，使用最大金额作为提现金额
            if (copyMoney > this.totolMoney) {
                value = this.totolMoney
            }
            this.money = value
        },
        rate (val) {
             this.feeRateMoney = (this.money * val).toFixed(2)
        }
    },
    async mounted () {
        await this.init()
        await this.initBank()
    },
    methods: {
        async initBank () {
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
        async init () {
            try {
                const { code, message, rate, user, subPartner, earningsmoney } = await weChatWithdraw()
                if (code === 200) {
                    this.subPartner = subPartner
                    this.wechatList[0].rate = rate
                    this.totolMoney = earningsmoney
                    this.user = user
                } else {
                    this.$dialog.alert({
                    title: '提示',
                        message
                    }).then(() => {
                        this.$router.go(-1)
                    })
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
            if (!this.checkParams()) return false
            this.$dialog.confirm({
                title: '提示',
                message: '确认提现吗？'
            })
            .then(() => {
                if (this.accountInfo.type === 1 || this.accountInfo.type === 2) {
                    this.cashToBank({
                        bankcardid: this.accountInfo.id,
                        money: this.money,
                        subPartner: this.subPartner
                    })
                } else if (this.accountInfo.type === 3) {
                    this.cashToWechat({
                        money: this.money,
                        realname: this.user.realname
                    })
                }
            })
        },
        // 切换提现方式
        handleToggle () {
            this.show = true
        },
        // 提现到微信零钱
        async cashToWechat (data) {
            try {
                const { code, message } = await weChatWithdrawaccess(data)
                if (code === 200) {
                    this.$dialog.alert({
                        title: '提示',
                        message: '成功'
                    }).then(() => {
                        this.init()
                    })
                } else {
                    this.$dialog.alert({
                        title: '提示',
                        message
                    })
                }
            } catch (error) {
                this.$toast('异常错误')
            }
        },
        // 提现到银行卡或对公账户
        async cashToBank (data) {
            try {
                const { code, message } = await withdrawaccess(data)
                if (code === 200) {
                    this.$dialog.alert({
                        title: '提示',
                        message: '成功'
                    }).then(() => {
                        this.init()
                    })
                } else {
                    this.$dialog.alert({
                        title: '提示',
                        message
                    })
                }
            } catch (error) {
                this.$toast('异常错误')
            }
        },
        // 选择到账方式
        handleSelect (value) {
            this.accountInfo = value
            this.show = false
        },
        checkParams () {
            const moeny = parseFloat(this.money)
            if (isNaN(moeny)) {
                this.$dialog.alert({
                    title: '提示',
                    message: '提现金额为非法数字或未输入提现金额，请重新输入'
                })
                return false
            }
            if (moeny <= 0) {
                this.$dialog.alert({
                    title: '提示',
                    message: '提现金额必须为正数'
                })
                return false
            }
            const realname = this.user.realname
            if (!realname) {
                this.dialogShow = true
                return false
            }
            return true
        },
        // 提交真实姓名弹框
        setRealname () {
            this.confirm()
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
