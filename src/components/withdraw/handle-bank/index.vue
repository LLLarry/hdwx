<template>
    <van-form @submit="onSubmit" >
        <van-field
            v-model="bankCardForm.realname"
            name="realname"
            label="开户姓名"
            placeholder="开户姓名"
            :rules="[{ required: true, message: '请填写开户姓名' }]"
        />
        <div class="position-relative d-flex">
            <van-field
                v-model="bankCardForm.bankcardnum"
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
            v-model="bankCardForm.bankname"
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
</template>

<script>
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
    props: {
        data: {
            type: Object,
            default: () => {}
        }
    },
    data () {
        return {
            bankCardForm: {},
            showPopover: false
        }
    },
    computed: {
        bankNameList () {
            return Object.values(bankName)
        }
    },
    watch: {
        data: {
            handler (value = {}) {
                console.log(value)
                this.bankCardForm = value
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        onSubmit (value) {
            this.$emit('handleBank', { type: 1, value: this.bankCardForm }) // type：1个人 2对公； value： value值
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
                            this.bankCardForm = {
                                ...this.bankCardForm,
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

<style>

</style>
