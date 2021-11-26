<template>
  <div class="charge-icon d-flex flex-column">
      <!-- header -->
      <Header :code="code" :areaname="areaname" :serverPhone="serverPhone"></Header>
      <main>
          <hd-title>请选择投币个数</hd-title>
            <div class="card padding-y-3 bg-white">
                <select-post :list="tempList" :selectIndex="selectPostIndex" @selectPostBack="handleSelectPost">
                    <template v-slot:default="{data}">
                        {{data.name}}
                    </template>
                </select-post>
            </div>
            <hd-line />
            <div>
                <select-paytype :list="selectPaytype" :select="selectPayTypeNum" @selectPayTypeBack="selectPayTypeBack">
                    <template v-slot:default="{data}">
                        <span
                        class="text-size-sm text-p"
                        v-if="
                            typeof data !== 'string'
                        ">（{{data.slot}}）</span>
                    </template>
                </select-paytype>
            </div>

            <div class="padding-x-3 padding-top-4">
                <van-button
                    type="primary"
                    block
                    class="margin-top-4"
                    @click="goCharge"
                >开始充电</van-button>
            </div>
      </main>

    <!--
      <div class="padding-x-3 margin-top-4 text-size-default">
          如有疑问，请联系：
          <a class="text-primary" href="tel:13521356652">13521356652</a>
      </div>
    -->
  </div>
</template>

<script>
import SelectPost from '@/components/template/preview/select-post'
import Header from '@/components/template/preview/header'
import SelectPaytype, { paytypeMap } from '@/components/template/preview/select-paytype'
import { deviceTemplatePreview } from '@/require/template'
import { fmtMoney } from '@/utils/util'
export default {
    components: {
        SelectPost,
        SelectPaytype,
        Header
    },
    data () {
        return {
            selectPostIndex: -1, // 选择投币个数索引
            selectPaytype: ['微信支付', '钱包支付'/* , { title: '包月支付', slot: '123456' } */],
            selectPayTypeNum: paytypeMap['微信支付'], // 默认选中微信支付,
            query: '',
            serverPhone: '', // 服务电话,
            code: '', // 设备号
            tempid: this.$route.query.tempid,
            openid: '', // 用户唯一标识
            areaname: '', // 小区名
            tempList: [], // 模板；列表
            titleText: '脉冲充电'
        }
    },
    mounted () {
        const { code, openid } = this.$route.query
        this.code = code
        this.openid = openid
        this.getInitData({
            code,
            openid,
            tempid: this.tempid
        })
    },
    methods: {
        handleSelectPost ([data, index]) {
            this.selectPostIndex = index
        },
        selectPayTypeBack (num) {
            this.selectPayTypeNum = num
        },
        // 获取初始化数据
        async getInitData (data) {
            try {
                const { code, message, servephone, areaname, templatelist, brandname = '脉冲充电', tourtopupbalance, touristsendbalance } = await deviceTemplatePreview(data)
                if (code === 200) {
                    this.serverPhone = servephone
                    this.areaname = areaname
                    this.tempList = templatelist
                    this.titleText = brandname
                    this.selectPaytype.splice(1, 1, { title: '钱包支付', slot: `充值：${fmtMoney(tourtopupbalance)} ， 赠送：${fmtMoney(touristsendbalance)}` })
                } else {
                    this.$dialog.alert({
                        title: '提示',
                        message: message,
                        beforeClose: (action, done) => {
                            done()
                            wx.closeWindow()
                        }
                    })
                }
            } catch (error) {
                this.alert('异常错误', { error, vm: this, line: 108 }).then(() => {
                    wx.closeWindow()
                })
            }
        },
        // 校验参数是否正确
        goCharge () {
        },
        // 微信支付
        async bywxpay () {
        },
        async bywalletpay () {
        }
    }
}
</script>

<style lang="scss">
/* .charge-icon {
    padding-top: 90px;
    .hd-title {
        div {
            color: #333;
            font-weight: bold;
        }
    }
} */
</style>
