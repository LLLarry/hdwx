<template>
    <div class="">
        <hd-title exec>个人银行卡</hd-title>
        <div>
            <bank-card class="margin-bottom-3 margin-x-3" v-for="num in 3" :key="num"/>
            <bank-card class="margin-bottom-3 margin-x-3" add @cb="addBankCardFn"/>
        </div>
        <hd-title exec>对公银行卡</hd-title>
        <div>
            <bank-card class="margin-bottom-3 margin-x-3" v-for="num in 2" :key="num"/>
            <bank-card class="margin-bottom-3 margin-x-3" add @cb="addBankCardFn" :type="2"/>
        </div>
        <van-popup v-model="slideAddBankCardIsShow" position="top" :style="{ width: '100%', maxHeight: '70%' }" >
            <div class="padding-3">
                <h2 class="text-center text-size-default margin-bottom-3">添加个人银行卡</h2>
                <van-form @submit="onSubmit" >
                    <van-field
                        v-model="addBankCard.realname"
                        name="realname"
                        label="开户姓名"
                        placeholder="开户姓名"
                        :rules="[{ required: true, message: '请填写开户姓名' }]"
                    />
                    <div class="position-relative d-flex">
                        <van-field
                            v-model="addBankCard.bankcardnum"
                            name="bankcardnum"
                            label="银行卡"
                            placeholder="银行卡"
                            :rules="[
                                { required: true, message: '请填写银行卡' },
                                { trigger: 'onBlur', message: '银行卡号不正确/不在使用范围之内', validator: checkBankCrad }
                            ]"
                        />
                        <van-popover v-model="showPopover" trigger="click" placement="left-bottom" >
                            <h3 style="width: 75vw;" class="text-center text-size-default padding-top-3">微信官方仅支持下列银行卡</h3>
                            <van-grid
                                square
                                clickable
                                :border="true"
                                column-num="3"
                                style="width: 75vw;"
                            >
                                <van-grid-item
                                    v-for="i in bankNameList"
                                    :key="i"
                                    :text="i"
                                    icon="credit-pay"
                                    @click="showPopover = false"
                                />
                            </van-grid>
                            <template #reference>
                                <van-icon name="question-o" class="tip-icon padding-1" size="22px" />
                            </template>
                        </van-popover>
                    </div>
                    <van-field
                        v-model="addBankCard.bankname"
                        name="bankname"
                        label="开户行"
                        placeholder="开户行"
                        readonly
                        :rules="[{ required: true }]"
                    />
                    <div class="margin-top-3">
                        <van-button round block type="primary" native-type="submit">提交</van-button>
                    </div>
                </van-form>
            </div>
        </van-popup>

        <van-popup v-model="slideAddCompanyBankCardIsShow" position="top" :style="{ width: '100%', maxHeight: '70%' }" >
            <div class="padding-3">
                <h2 class="text-center text-size-default margin-bottom-3">添加对公账户信息</h2>
                <van-form @submit="onCompanySubmit" >
                    <van-field
                        v-model="addCompanyBankCard.company"
                        name="company"
                        label="公司名称"
                        placeholder="公司名称"
                        :rules="[{ required: true, message: '请填写公司名称' }]"
                    />
                    <van-field
                        v-model="addCompanyBankCard.name"
                        name="name"
                        label="联系人"
                        placeholder="联系人"
                        :rules="[{ required: true, message: '请填写联系人' }]"
                    />
                    <van-field
                        v-model="addCompanyBankCard.cardNum"
                        name="cardNum"
                        label="银行卡号"
                        placeholder="请填写银行卡号"
                        :rules="[{ required: true }]"
                    />
                    <van-field
                        v-model="addCompanyBankCard.info"
                        name="info"
                        label="开户行"
                        placeholder="请填写开户行"
                        :rules="[{ required: true }]"
                    />
                    <div class="margin-top-3">
                        <van-button round block type="primary" native-type="submit">提交</van-button>
                    </div>
                </van-form>
            </div>
        </van-popup>
    </div>
</template>

<script>
import BankCard from '@/components/withdraw/bank-card'
import axios from 'axios'
import Qs from 'qs'
const bankName = {
    CMB: '招商银行',
    ICBC: '工商银行',
    CCB: '建设银行',
    ABC: '农业银行',
    CMBC: '民生银行',
    CIB: '兴业银行',
    SPABANK: '平安银行',
    COMM: '交通银行',
    CITIC: '中信银行',
    CEB: '光大银行',
    HXBANK: '华夏银行',
    BOC: '中国银行',
    BJBANK: '北京银行',
    NBBANK: '宁波银行',
    PSBC: '邮政储蓄银行',
    SPDB: '浦发银行',
    GDB: '广发银行'
}
export default {
    components: {
        BankCard
    },
    data () {
        return {
            slideAddBankCardIsShow: false, // 添加个人银行卡是否显示
            slideAddCompanyBankCardIsShow: false, // 添加对公账户是否显示
            addBankCard: {},
            addCompanyBankCard: {},
            errorMsg: '',
            showPopover: false
        }
    },
    computed: {
        bankNameList () {
            return Object.values(bankName)
        }
    },
    methods: {
        onSubmit (value) {
            console.log(value)
        },
        onCompanySubmit (value) {
            console.log(value)
        },
        addBankCardFn (type) {
            if (type === 1) {
                this.slideAddBankCardIsShow = true
            } else {
                this.slideAddCompanyBankCardIsShow = true
            }
        },
        checkBankCrad (cardNo) {
            return new Promise((resolve) => {
                axios.post('https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?_input_charset=utf-8', Qs.stringify({ cardNo, cardBinCheck: true }))
                .then(({ data }) => {
                    if (data.validated) {
                        if (typeof bankName[data.bank] === 'undefined') {
                            this.errorMsg = '对不起，你输入的银行卡不在使用范围之内，请您更换银行卡！'
                            this.$dialog.alert({
                                message: this.errorMsg
                            })
                            resolve(false)
                        } else {
                            this.errorMsg = ''
                            this.addBankCard = {
                                ...this.addBankCard,
                                bankname: bankName[data.bank]
                            }
                            resolve(true)
                        }
                    } else {
                        this.errorMsg = '请输入正确的银行卡号'
                        this.$toast(this.errorMsg)
                        resolve(false)
                    }
                })
                .catch(e => {
                    console.log(e)
                })
            })
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
