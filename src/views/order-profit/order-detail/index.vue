<template>
  <div class="income-dr bg-gray">
      <hd-line height=".4rem" />
      <hd-order :list="list">
          <template #title>
              付款金额 <span class="text-size-lg">&yen; {{partrecord.money | fmtMoney}}</span>
          </template>
          <template #focus>
              <span>订单状态</span>
              <span v-if="partrecord.status === 1">正常</span>
              <span v-if="partrecord.status !== 1">
                  <span v-if="paysource === 1 && order.number === 2" style="color: #f0ff0c;">部分退款</span>
                  <span v-else class="text-danger">退款</span>
              </span>
              <!-- <span style="color: #f0ff0c;">正常</span> -->
          </template>
          <!-- <template #child v-slot:default="{row}">
                <div class="d-flex justify-content-between padding-y-1">
                    <div>设备编号</div>
                    <div class="text-666">{{ 123 }}</div>
                </div>
          </template> -->
      </hd-order>

      <hd-nav :list="[{}]">
          <div class="w-100 d-flex justify-content-end align-items-center">
                <van-button type="primary" size="small" :to="`/order/powercurve/${order.id}`" v-if="paysource === 1">功率曲线</van-button>
                <van-button  type="info"  size="small" class="margin-x-3" v-if="cashAble.show" :disabled="!cashAble.cash" @click="cashFn()">
                   <span v-if="cashAble.show === '退款'">&nbsp;&nbsp;退&nbsp;&nbsp;&nbsp;&nbsp;款&nbsp;&nbsp;</span>
                   <span v-if="cashAble.show === '撤回'">&nbsp;&nbsp;退&nbsp;&nbsp;&nbsp;&nbsp;款&nbsp;&nbsp;</span>
                </van-button>
          </div>
      </hd-nav>
  </div>
</template>

<script>
import HdOrder from '@/components/hd-order'
import HdNav from '@/components/hd-nav'
import { orderinquiredetails } from '@/require/order-profit'
import { refundUtil, recall } from '@/utils/refund-util'
export default {
    components: {
        HdOrder,
        HdNav
    },
    data () {
        return {
            list: [],
            id: '', // 交易id
            equip: {},
            order: {},
            partrecord: {},
            tourist: {},
            user: {},
            paysource: '',
            paytype: '',
            status: '',
            ordersource: '', // 退费refundState
            orderrefid: '' // 退费id
        }
    },
    mounted () {
        this.id = this.$route.params.id
        this.init()
    },
    computed: {
        // 是否可以退款
        /*
            {
                show: '退款',  按钮名称
                cash: true  是否能退款
            }
        */
        cashAble () {
            const { paysource, order } = this
            if (paysource === 1) {
                if (order.number === 0) {
                    switch (order.paytype) {
                        case 1 :
                            return {
                                show: '退款',
                                cash: true,
                                refund: 3
                            }
                        case 2 :
                            return {
                                show: '退款',
                                cash: true,
                                refund: 1
                            }
                        case 3 :
                            return {
                                show: '退款',
                                cash: true,
                                refund: 2
                            }
                        case 8 :
                            return {
                                show: '退款',
                                cash: true,
                                refund: 2
                            }
                        case 12 :
                            return {
                                show: '退款',
                                cash: true,
                                refund: 7
                            }
                    }
                    return {
                        show: '退款',
                        cash: true
                    }
                }
                if (order.number === 1) {
                    return {
                        show: '退款',
                        cash: false
                    }
                }
                if (order.number === 2 && order.paytype !== 7) {
                    return {
                        show: '撤回',
                        cash: true,
                        value: 2
                    }
                }
            }
            if (paysource === 2) {
                if ([4, 5, 7, 9, 11, 13].includes(order.handletype)) {
                    return {
                        show: '退款',
                        cash: false
                    }
                }
                if ([1, 2, 6, 8, 10, 12].includes(order.handletype)) {
                    switch (order.handletype) {
                        case 1 :
                            return {
                                show: '退款',
                                cash: true,
                                refund: 1
                            }
                        case 2 :
                            return {
                                show: '退款',
                                cash: true,
                                refund: 2
                            }
                        case 6 :
                            return {
                                show: '退款',
                                cash: true,
                                refund: 3
                            }
                        case 8 :
                            return {
                                show: '退款',
                                cash: true,
                                refund: 4
                            }
                        case 10 :
                            return {
                                show: '退款',
                                cash: true,
                                refund: 5
                            }
                        case 12 :
                            return {
                                show: '退款',
                                cash: true,
                                refund: 7
                            }
                    }
                }
            }

            if (paysource === 3) {
                if (order.handletype === 1) {
                    if ([3, 4, 6, 9].includes(order.paytype)) {
                        return {
                            show: '退款',
                            cash: false
                        }
                    }
                    if ([1, 2, 5, 8].includes(order.paytype)) {
                        switch (order.paytype) {
                            case 1 :
                                return {
                                    show: '退款',
                                    cash: true,
                                    refund: 1
                                }
                            case 2 :
                                return {
                                    show: '退款',
                                    cash: true,
                                    refund: 2
                                }
                            case 5 :
                                return {
                                    show: '退款',
                                    cash: true,
                                    refund: 3
                                }
                            case 8 :
                                return {
                                    show: '退款',
                                    cash: true,
                                    refund: 2
                                }
                        }
                    }
                }
            }
            if (paysource === 4) {
                if ([2, 3, 4, 5, 6, 8].includes(order.paytype)) {
                    return {
                        show: '退款',
                        cash: false
                    }
                }
                if ([0, 1, 7].includes(order.paytype)) {
                     switch (order.paytype) {
                            case 0 :
                                return {
                                    show: '退款',
                                    cash: true,
                                    refund: 1
                                }
                            case 1 :
                                return {
                                    show: '退款',
                                    cash: true,
                                    refund: 6
                                }
                            case 7 :
                                return {
                                    show: '退款',
                                    cash: true,
                                    refund: 2
                                }
                        }
                }
            }
            if (paysource === 5) {
                if (order.flag === 2) {
                    return {
                        show: '退款',
                        cash: false
                    }
                }
                if (order.flag === 1) {
                   if ([3, 6, 8, 10].includes(order.type)) {
                       switch (order.type) {
                            case 3 :
                                return {
                                    show: '退款',
                                    cash: true,
                                    refund: 1
                                }
                            case 6 :
                                return {
                                    show: '退款',
                                    cash: true,
                                    refund: 2
                                }
                            case 8 :
                                return {
                                    show: '退款',
                                    cash: true,
                                    refund: 6
                                }
                            case 10 :
                                return {
                                    show: '退款',
                                    cash: true,
                                    refund: 2
                                }
                        }
                   }
                }
            }
            if (paysource === 6) {
                if (order.status !== 2 && order.ifrefund === 0) {
                    return {
                        show: '退款',
                        cash: true,
                        refund: 1
                    }
                }
            }
            return {
                show: '',
                cash: false
            }
        }
    },
    methods: {
        async init () {
            try {
                const { code, message, equip, order, partrecord, tourist, user, paysource, paytype, status, ordersource, orderrefid } = await orderinquiredetails({ orderid: this.id })
                if (code === 200) {
                    this.equip = equip
                    this.order = order
                    this.partrecord = partrecord
                    this.tourist = tourist
                    this.user = user
                    this.paysource = paysource
                    this.paytype = paytype
                    this.status = status
                    this.ordersource = ordersource
                    this.orderrefid = orderrefid

                    const parType = partrecord.paytype === 1 ? '钱包支付'
                    : partrecord.paytype === 2 ? '微信支付'
                    : partrecord.paytype === 4 ? '微信小程序'
                    : partrecord.paytype === 5 ? '支付宝小程序'
                    : partrecord.paytype === 6 ? '虚拟充值'
                    : partrecord.paytype === 12 ? '银联支付' : '--'
                    if (ordersource === 1 || ordersource === 3) { // 充电
                        this.list = [
                            { title: '订单编号', content: order.ordernum },
                            { title: '付款方式', content: parType },
                            { title: '用户昵称', content: tourist.username },
                            { title: '用户ID', content: (partrecord.uid).toString().padStart(8, '0') },
                            { title: '小区名称', content: !equip.areaname ? '— —' : equip.areaname },
                            { title: '设备名称', content: !equip.remark ? '— —' : equip.remark },
                            { title: '设备编号', content: equip.code },
                            { title: '端口号', content: order.port }
                        ]
                    } else {
                        this.list = [
                            { title: '订单编号', content: order.ordernum },
                            { title: '付款方式', content: parType },
                            { title: '用户昵称', content: tourist.username },
                            { title: '用户ID', content: partrecord.uid.padStart(8, '0') },
                            { title: '小区名称', content: equip.areaname === null ? '— —' : equip.areaname },
                            { title: '设备名称', content: equip.remark === null ? '— —' : equip.remark },
                            { title: '设备编号', content: equip.code }
                        ]
                    }
                } else {
                    this.$toast(message)
                }
            } catch (error) {
                console.log(error)
                this.$toast('异常错误')
            }
        },
        // 退费/撤回按钮
        cashFn () {
            const { show } = this.cashAble
            this.$dialog.confirm({
                title: '提示',
                message: `确定【${show}】吗？`,
                beforeClose: (action, done) => {
                    if (action === 'confirm') {
                        if (show === '退款') {
                            this.refundFn()
                        } else { // 撤回
                            this.recallFn()
                        }
                    }
                    done()
                }
            })
        },
        // 退费
        refundFn () {
            const { refund } = this.cashAble
            let refundType // 退款类型
            switch (refund) {
                    case 1: refundType = 1; break // 微信退费
                    case 2: refundType = 2; break // 支付宝退费
                    case 3: refundType = 3; break // 钱包退费
                    case 4: refundType = 5; break // 微信小程序退费
                    case 5: refundType = 6; break // 支付宝小程序退费
                    case 6: refundType = 4; break // 虚拟充值退费
                    case 7: refundType = 7; break // 银联退费
                }
                // 调用退费接口
                refundUtil(refundType, {
                    id: this.orderrefid,
                    refundState: this.ordersource,
                    type: (this.ordersource === 4 ? 1 : this.ordersource === 5 ? 2 : undefined), // 钱包 1  在线卡 2
                    wolfkey: refundType === 5 ? 3 : refundType === 6 ? 4 : undefined //  微信小程序 3 支付宝小程序 4
                })
                .then(res => {
                    this.$dialog.alert({
                        title: '提示',
                        message: res
                    })
                    .then(() => {
                        this.init()
                    })
                })
                .catch(error => {
                    this.$dialog.alert({
                        title: '提示',
                        message: error
                    })
                })
        },
        // 撤回
        recallFn () {
            recall({
                id: this.orderrefid
            })
            .then(() => {
                this.init()
            })
        }
    }
}
</script>

<style lang="scss">
</style>
