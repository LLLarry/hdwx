<template>
  <div class="income-dr bg-gray">
      <!-- <div class="margin-x-3 rounded-md overflow-hidden">
          <section class="bg-success text-white padding-top-3 padding-bottom-2">
              <div class="text-center margin-bottom-4 text-size-default">充电收益</div>
              <div class="d-flex justify-content-between money-contral padding-top-2 padding-x-3">
                  <span>金额</span>
                  <span>&yen; 3.00</span>
              </div>
          </section>
          <section class="bg-white padding-y-2">
              <ul>
                  <li class="padding-x-3">
                      <div class="d-flex justify-content-between padding-y-1">
                          <div>设备编号</div>
                          <div class="text-666">000003</div>
                      </div>
                  </li>
                  <li class="padding-x-3">
                      <div class="d-flex justify-content-between padding-y-1">
                          <div>设备编号</div>
                          <div class="text-666">000003</div>
                      </div>
                  </li>
              </ul>
          </section>
      </div> -->
      <van-skeleton title :row="5" :loading="laoding" />
      <hd-order :list="list" v-if="!laoding">
          <template #title>
              {{ title }}
          </template>
          <template #focus>
              <span>金额</span>
              <span>&yen; {{ symbol }} {{ resultdata.money | fmtMoney }}</span>
          </template>
          <!-- <template #child v-slot:default="{row}">
              {{row}}
              9631
          </template> -->
      </hd-order>
      <hd-nav :list="[{}]" v-if="[0, 1, 2].includes(resultdata.payResult)">
          <template>
              <van-button
                type="primary"
                size="small"
                class="w-50"
                v-if="[0, 1].includes(resultdata.payResult)"
                :disabled="resultdata.payResult === 1"
                @click="refund"
            >全额退款</van-button>
              <van-button
                type="warning"
                size="small"
                class="w-50"
                v-else-if="resultdata === 2"
                @click="reback"
            >撤回</van-button>
          </template>
      </hd-nav>
  </div>
</template>

<script>
import HdOrder from '@/components/hd-order'
import HdNav from '@/components/hd-nav'
import { inquireMerEarnDetailInfo } from '@/require/mine'
import { fmtDate, fmtMoney } from '@/utils/util'
import { refundUtil, recall } from '@/utils/refund-util'
export default {
    components: {
        HdOrder,
        HdNav
    },
    data () {
        return {
            ordernum: this.$route.params.ordernum,
            id: this.$route.query.id,
            // list: [
            //     { title: '设备编号1', content: '999' },
            //     { title: '设备编号2', content: '1000' }
            // ],
            resultdata: {},
            laoding: false
        }
    },
    computed: {
        title () {
            const { status, paysource, payResult } = this.resultdata
            if (status === 1) { // 收益
                if (paysource === 1) {
                    return '充电订单'
                } else if (paysource === 3 || paysource === 5 || paysource === 6) {
                    return '充值订单'
                } else if (paysource === 4) {
                    return '提现订单'
                } else if (paysource === 8) {
                    return '缴费订单'
                }
            } else {
                if (paysource === 4) {
                    return '提现订单'
                } else if (payResult === 1) {
                    return '全额退费订单'
                } else if (payResult === 2) {
                    return '部分退费订单'
                } else if (paysource === 8) {
                    return '缴费收入订单'
                }
            }
            return '未知订单'
        },
        list () {
            let {
                paysource, paytype, createTime, balance, ordernum, payResult, payMoney,
                status, consumeQuantity, consumeTime, uid, cardNum, bankname, bankcardnum, servicecharge
            } = this.resultdata
            const paytypeStr = paytype === 1 ? '钱包支付' : paytype === 2 ? '微信支付' : paytype === 3 ? '支付宝支付' : paytype === 4 ? '银联支付' : '未知'
            createTime = fmtDate(createTime)
            balance = fmtMoney(balance)
            payMoney = fmtMoney(payMoney)
            if (paysource === 1) { // 充电订单
                return [
                    { title: '订单号', content: ordernum },
                    { title: '支付方式', content: paytypeStr },
                    { title: '订单状态', content: payResult === 0 ? '正常' : payResult === 1 ? '全额退费' : payResult === 2 ? '部分退费' : '未知' },
                    { title: '使用电量', content: `${consumeQuantity}度` },
                    { title: '使用时间', content: `${consumeTime}分钟` },
                    { title: '用户付款金额', content: payMoney },
                    { title: '余额', content: balance },
                    { title: '创建时间', content: createTime }
                ]
            } else if ([3, 5, 6].includes(paysource)) { // 充值订单
                // 充值类型
                const cType = paysource === 3 ? '充值离线卡' : paysource === 5 ? '充值钱包' : paysource === 6 ? '充值在线卡' : paysource === 7 ? '充值包月' : '未知'
                return [
                    { title: '订单号', content: ordernum },
                    { title: '支付方式', content: paytypeStr },
                    { title: '充值类型', content: cType },
                    {
                        title: paysource === 3 ? '离线卡号' : paysource === 5 ? '用户id' : paysource === 6 ? '在线卡卡号' : '',
                        content: paysource === 3 ? cardNum : paysource === 5 ? (String(uid)).padStart(8, '0') : paysource === 6 ? cardNum : '未知'
                    },
                    { title: '充值类型', content: cType },
                    { title: '用户付款金额', content: payMoney },
                    { title: '余额', content: balance },
                    { title: '创建时间', content: createTime }
                ]
            } else if (paysource === 4) { // 提现订单
                return [
                    { title: '订单号', content: ordernum },
                    { title: '订单状态', content: status === 1 ? '拒绝' : status === 2 ? '待处理/成功' : '未知' },
                    { title: '提现银行卡', content: bankname },
                    (bankcardnum === '0' ? undefined : { title: '银行卡号', content: bankcardnum }),
                    { title: '手续费', content: `${servicecharge}元` },
                    { title: '余额', content: `${balance}元` },
                    { title: '创建时间', content: createTime }
                ]
            } else if (paysource === 8) { // 缴费订单
                return [
                    { title: '订单号', content: ordernum },
                    { title: '余额', content: `${balance}元` },
                    { title: '创建时间', content: createTime }
                ]
            }
            return []
        },
        symbol () {
            const { status, paysource } = this.resultdata
            if (paysource === 8) {
                if (status === 1) {
                    return '-'
                } else {
                    return '+'
                }
            } else {
                 if (status === 1) {
                    return '+'
                } else {
                    return '-'
                }
            }
        }
    },
    mounted () {
        this.initData()
    },
    methods: {
        async initData () {
            try {
                this.laoding = true
                const { code, message, resultdata } = await inquireMerEarnDetailInfo({ ordernum: this.ordernum, id: this.id })
                if (code === 200) {
                    this.laoding = false
                    this.resultdata = resultdata
                } else {
                    this.toast(message)
                }
            } catch (e) {
                this.toast('异常错误')
            }
        },
        refund () {
            const { paytype, returnId, refundsource } = this.resultdata
            // 退费类型
            const type = paytype === 2 ? 1 : paytype === 3 ? 6 : -1
            if (type <= 0) return this.toast('对不起，当前订单不支持退费')
            this.confirm('确定全额退款吗？')
            .then(() => {
                refundUtil(type, {
                    id: returnId,
                    refundState: refundsource,
                    pwd: 0,
                    utype: 2
                }).then(res => {
                    this.alert(res)
                    .then(() => {
                        this.initData()
                    })
                })
                .catch(err => {
                    this.toast(err)
                })
            })
        },
        reback () {
            this.confirm('确定撤回吗？')
            .then(() => {
                recall({
                    id: returnId
                })
                .then(() => {
                    this.alert('撤回成功')
                    .then(() => {
                        this.initData()
                    })
                })
            })
        }
    }
}
</script>

<style lang="scss">
.income-dr {
    min-height: 100vh;
    .money-contral {
        border-top: 1px dotted #fff;
    }
}
</style>
