<template>
    <div class="wisdom-v3-port d-flex flex-column">
        <!-- 顶部区域 -->
        <Header
            :code="code"
            :areaname="areaname"
            :serverPhone="serverPhone"
            :chargeTip="chargeTip"
            :isPort="isPort"
            :uid="uid"
            @openOrClose="openOrClose"
            ref="header"
        ></Header>
        <main class="padding-top-2 flex-1">
            <charge-v3-contral
                :selectPort="selectPort"
                :temporaryc="temporaryc"
                :chageType="chageType"
                :templateTimelist="templateTimelist"
                :selectTimeTempId="selectTimeTempId"
                :templateMoneylist="templateMoneylist"
                :selectMoneyTempId="selectMoneyTempId"
                :selectPaytype="selectPaytype"
                :selectPayTypeNum="selectPayTypeNum"
                :openid="openid"
                :aid="aid"
                :merid="merid"
                @changeValue="changeValue"
            />
        </main>
        <!-- 底部区域 -->
        <Footer :level="level">
            {{chargePayTip}}
        </Footer>
        <!-- 收费说明提示挂载元素 -->
        <div id="charge-tip" />
        <!-- 钱包余额不足提示 -->
        <charge-overlay ref="chargeOverlay"
            :money="tourtopupbalance"
            :sendmoney="touristsendbalance"
            :url="walletRechargeUrl"
        ></charge-overlay>
    </div>
</template>

<script>
import Header from '@/components/template/preview/header'
import Footer from '@/components/template/preview/footer'
import chargeOverlay from '@/components/template/preview/charge-overlay'
import { paytypeMap } from '@/components/template/preview/select-paytype'
import { fmtMoney, getType } from '@/utils/util'
import { deviceTemplatePreview } from '@/require/template'
import ChargeV3Contral from '@/components/template/preview/charge-v3-contral'
export default {
    components: {
        Header,
        Footer,
        chargeOverlay,
        ChargeV3Contral
    },
    data () {
        return {
            isPort: true, // 是否是扫端口页面
            chageType: 0, // 充电类型： 0 按时间充电 1 按金额充电
            // grade: 2, // 默认支付在那个选择上面： 1按 金额付费    2 按时间付费
            temporaryc: 1, // 是否支持临时充电  1 支持临时充电
            code: this.$route.query.code,
            tempid: this.$route.query.tempid,
            openid: '',
            serverPhone: '',
            areaname: '',
            titleText: '智慧款充电', // titleText
            orderid: '', // 续充订单的订单id
            aid: '', // 设备所属小区id
            merid: '', // 设备所属商户id
            uid: '', // 用户id
            touraid: '', // 用户所属小区id
            walletid: '', // 钱包id
            tourtopupbalance: 0, // 充值金额
            touristsendbalance: 0, // 赠送金额
            chargeTip: {
                chargeInfo: null, // 收费标准
                payhint: '' // 收费说明，下次不再提醒是否展示
                // defaultShow: true // 默认充电提示是否显示
            },
            selectPort: -1, // 选中的端口号
            show: false,
            show01: false,
            templateTimelist: [], // 按照时间充电模板列表
            templateMoneylist: [], // 按照金额充电模板列表
            selectTimeTempId: -1, // 选中时间充电模板id
            selectMoneyTempId: -1, // 选中按照金额充电模板id
            selectPaytype: ['微信支付', '钱包支付'/* , { title: '包月支付', slot: '123456' } */],
            selectPayTypeNum: paytypeMap['微信支付'], // 默认选中微信支付,
            level: false, // footer的层级
            walletRechargeUrl: '' // 钱包充值跳转路径
        }
    },
    computed: {
        // 充电支付提示
        chargePayTip () {
            if (this.selectPort < 0) {
                return '请先选择充电端口'
            } else {
                if (this.chageType === 0) { // 按时间充电
                    const item = this.templateTimelist.find(item => item.id === this.selectTimeTempId)
                    if (item) {
                        const time = parseFloat((item.chargeTime / 60).toFixed(2))
                        return `充电时长: ${item.name === '充满自停' ? '充满自停' : `${time}小时`}`
                    } else {
                         return '充电时长: '
                    }
                } else { // 按金额充电
                    const item = this.templateMoneylist.find(item => item.id === this.selectMoneyTempId)
                    if (item) {
                        const money = parseFloat(item.money)
                        return `支付金额: ${money}元`
                    } else {
                         return '支付金额: '
                    }
                }
            }
        }
    },
    mounted () {
        const { code, openid, port = 1 } = this.$route.query
        this.code = code
        this.openid = openid
        this.selectPort = Number(port)
        this.getInitData({
            code,
            openid
        })
    },
    watch: {
        // 监听充电菜单的变化，更改支付方式的显示和默认选择
        chageType: {
                handler (newVal, oldValue) {
                if (newVal === oldValue) return
                const walletItem = this.selectPaytype.find(item => {
                    return (getType(item) === 'object' && item.title === '钱包支付') || (item === '钱包支付')
                })
                if (newVal === 0) {
                    this.selectPaytype = [walletItem]
                    // this.selectPayTypeNum = paytypeMap['钱包支付']
                } else {
                    this.selectPaytype = ['微信支付', walletItem]
                    // this.selectPayTypeNum = paytypeMap['微信支付']
                }
                this.selectWalletByBalance()
            },
            immediate: true
        }
    },
    methods: {
        changeValue ({ key, value }) {
            this.$set(this, key, value)
        },
        // 当扫描端口二维码时header中充电提示显示与否回调
        openOrClose (flag) {
            if (flag) { // 提示信息将要展示
                if (!this.show) { // 判断当前控制菜单为隐藏状态
                    this.closed() // 调用方法，降低footer层级和展示提示信息
                } else { // 判断当前控制菜单为展示状态
                    this.show = false // 改变控制菜单为隐藏状态，当隐藏完之后会调用closed函数
                }
            } else { // 提示信息将要关闭
                this.show = true // 改变控制菜单为展示状态
            }
        },
        closed () {
            this.level = false
            this.$refs.header.show = true
        },
        async getInitData (data) {
            try {
                const {
                code, templateTimelist, templateMoneylist, servephone, areaname, brandname,
                tourtopupbalance, touristsendbalance, chargeInfo, payhint, defaultindex = 0,
                deviceaid, merid, touruid, grade, temporaryc, touraid, walletid
                } = await deviceTemplatePreview({ code: this.code, tempid: this.tempid })
                if (code === 200) {
                    this.templateTimelist = templateTimelist || []
                    this.templateMoneylist = templateMoneylist || []
                    this.serverPhone = servephone
                    this.areaname = areaname
                    this.titleText = brandname
                    this.tourtopupbalance = tourtopupbalance
                    this.touristsendbalance = touristsendbalance
                    this.aid = deviceaid
                    this.merid = merid
                    this.uid = touruid
                    this.temporaryc = temporaryc
                    this.touraid = touraid
                    this.walletid = walletid
                    if (grade === 1 && temporaryc === 1) { // grade 1按 金额付费    2 按时间付费; temporaryc 1 支持按金额付费
                        this.chageType = 1 // 按时间充电
                    }
                    this.chargeTip = {
                        ...this.chargeTip,
                        chargeInfo, // 收费标准
                        payhint, // 收费说明，下次不再提醒是否展示
                        defaultShow: payhint === 1
                    }
                    // 加载完成就判断有没有下次不再加载信息，没有的话就直接展示控制栏
                    if (payhint !== 1) {
                        this.show = true
                    }
                    this.selectTimeTempId = (templateTimelist[0] || { id: -1 }).id // 按时间充电默认选中第一个
                    this.selectMoneyTempId = templateMoneylist[defaultindex || 0]?.id // 按金额充电默认选中后台传过来的索引
                    // 设置支付方式
                    // 设置支付方式 找到旧的钱包索引，拿新的替换旧的
                    const walletItem = {
                        title: '钱包支付',
                        slot: `充值：${fmtMoney(tourtopupbalance)} ， 赠送：${fmtMoney(touristsendbalance)}`,
                        icon: {
                            className: 'iconfont icon-ti-shi',
                            onClick: () => {
                                // 发送请求
                                this.$refs.walletList.getData({
                                    uid: this.uid,
                                    devaid: this.aid,
                                    merid: this.merid,
                                    aid: this.touraid,
                                    walletid: this.walletid
                                })
                            }
                        }
                    }
                    const walletItemIndex = this.selectPaytype.findIndex(item => (item === '钱包支付' || item.title === '钱包支付'))
                    if (walletItemIndex !== -1) {
                        this.selectPaytype.splice(walletItemIndex, 1, walletItem)
                    }
                    this.selectWalletByBalance()
                } else {
                    // this.alert(message).then(() => {
                    //     wx.closeWindow()
                    // })
                }
            } catch (error) {
                console.log(error)
                // this.alert('异常错误', { error, vm: this, line: 284 }).then(() => {
                //     wx.closeWindow()
                // })
            }
        },
        // 判断钱包余额，如果大于指定值，则默认选中钱包
        selectWalletByBalance () {
            const balance = this.touristsendbalance + this.tourtopupbalance
            if (this.chageType === 0) {
                this.selectPayTypeNum = paytypeMap['钱包支付']
            } else {
                if (balance >= 2) {
                    this.selectPayTypeNum = paytypeMap['钱包支付']
                } else {
                    this.selectPayTypeNum = paytypeMap['微信支付']
                }
            }
        }
    }
}
</script>

<style lang="scss">
.wisdom-v3-port {
    height: 100vh;
    main {
        padding-bottom: 80px;
        overflow-y: auto;
    }
    .van-tabs__nav--card {
        border-radius: 0.18rem;
    }
    .contral-wrapper .item {
        border-radius: 5px;
    }
}
</style>
