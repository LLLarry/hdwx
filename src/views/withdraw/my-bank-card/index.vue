<template>
    <div class="">
        <hd-title exec v-if="isShowPersonalBankRefud">个人银行卡</hd-title>
        <div class="padding-bottom-3" v-if="isShowPersonalBankRefud">
            <div v-no-data="bankCardList.length <= 0"></div>
            <bank-card
                class="margin-bottom-3 margin-x-3"
                v-for="item in bankCardList"
                :key="item.id"
                :data="item"
            />
            <div class="text-white rounded-lg text-size-md d-flex flex-column align-items-center justify-content-center">
                <van-button type="primary" icon="plus" size="small" class="padding-x-4" @click="addBankCardFn(1)">添加银行卡</van-button>
            </div>
        </div>
        <hd-line height=".6rem" />
        <hd-title exec>对公银行卡</hd-title>
        <div class="padding-bottom-3">
            <div v-no-data="companyBnkCardList.length <= 0"></div>
            <bank-card
                class="margin-bottom-3 margin-x-3"
                v-for="item in companyBnkCardList"
                :key="item.id"
                :data="item"
                :type="2"
            />
            <div class="text-white rounded-lg text-size-md d-flex flex-column align-items-center justify-content-center">
                <van-button type="primary" icon="plus" size="small" class="padding-x-4" @click="addBankCardFn(2)" v-if="companyBnkCardList.length <= 0">添加银行卡</van-button>
            </div>
            <div class="margin-3 text-center text-p text-size-sm">每个账户仅支持添加一张“对公银行卡”</div>
        </div>
        <van-popup v-model="slideAddBankCardIsShow" position="top" :style="{ width: '100%', maxHeight: '70%' }" >
            <div class="padding-3">
                <h2 class="text-center text-size-default margin-bottom-3">添加个人银行卡</h2>
                 <handle-bank @handleBank="handleBank"/>
            </div>
        </van-popup>

        <van-popup v-model="slideAddCompanyBankCardIsShow" position="top" :style="{ width: '100%', maxHeight: '70%' }" >
            <div class="padding-3">
                <h2 class="text-center text-size-default margin-bottom-3">添加对公账户信息</h2>
                <handle-company-bank @handleBank="handleBank"/>
            </div>
        </van-popup>
    </div>
</template>

<script>
import BankCard from '@/components/withdraw/bank-card'
import { merBankCardData, addBankCardInfo } from '@/require/withdraw'
import { fmtBankCard } from '../helper'
import HandleCompanyBank from '@/components/withdraw/handle-company-bank'
import HandleBank from '@/components/withdraw/handle-bank'
import { mapGetters } from 'vuex'
export default {
    components: {
        BankCard,
        HandleCompanyBank,
        HandleBank
    },
    data () {
        return {
            slideAddBankCardIsShow: false, // 添加个人银行卡是否显示
            slideAddCompanyBankCardIsShow: false, // 添加对公账户是否显示
            errorMsg: '',
            bankCardList: [], // 个人银行卡
            companyBnkCardList: [] // 对公账户银行卡
        }
    },
    mounted () {
        this.getInitData()
    },
    computed: {
        ...mapGetters(['isShowPersonalBankRefud'])
    },
    methods: {
        async getInitData () {
            try {
                const { code, message, bankCardList = [], companyBnkCardList = [] } = await merBankCardData()
                if (code === 200) {
                    this.bankCardList = fmtBankCard(bankCardList)
                    this.companyBnkCardList = fmtBankCard(companyBnkCardList)
                } else {
                    this.$toast(message)
                }
            } catch (error) {
                this.$dialog.alert({
                    title: '提示',
                    message: '异常错误'
                }).then(() => {
                    wx.closeWindow()
                })
            }
        },
        // 添加银行卡函数
        handleBank ({ type, value }) {
            this.$dialog.confirm({
                title: '提示',
                message: '确认添加此账户吗？'
            })
            .then(async () => {
                 try {
                    const { code, message } = await addBankCardInfo({
                        type,
                        ...value
                    })
                    if (code === 200) {
                        this.$dialog.alert({
                            title: '提示',
                            message: '添加成功'
                        })
                        .then(() => {
                            this[type === 1 ? 'slideAddBankCardIsShow' : 'slideAddCompanyBankCardIsShow'] = false
                            this.getInitData()
                        })
                    } else {
                        this.$toast(message)
                    }
                } catch (error) {
                    this.$toast('异常错误')
                }
            })
        },
        addBankCardFn (type) {
            if (type === 1) {
                this.slideAddBankCardIsShow = true
            } else {
                this.slideAddCompanyBankCardIsShow = true
            }
        }
    }
}
</script>

<style lang="scss">
// .bank-card {
//     background-image: linear-gradient(to bottom, #51D2EF, #67B9F5);
// }
.w-grid {
    width: 50%
}
.tip-icon {
    // position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}
</style>
