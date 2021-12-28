<template>
    <div class="home bg-gray">
        <div class="data-content position-relative text-white padding-bottom-3 padding-top-1">
            <div class="circular-1 rounded-circle position-absolute"></div>
            <div class="circular-2 rounded-circle position-absolute"></div>
            <div class="circular-3 rounded-circle position-absolute"></div>
            <div class="circular-4 rounded-circle position-absolute"></div>
            <!--<div class="circular-5 rounded-circle position-absolute"></div> -->
            <div class="today-data d-flex flex-column justify-content-center align-items-center margin-top-4 margin-bottom-3">
                <div class="item-title margin-bottom-2">今日收益</div>
                <div class="item-result font-weight-bold text-size-lg" v-if="!isHide">
                    <i class="iconfont icon-fl-renminbi margin-right-2 position-relative yen"></i>
                    <span>{{ todayMoney | fmtMoney }}</span>
                </div>
                <div class="item-result font-weight-bold text-size-lg" v-else>
                    <i class="iconfont icon-hao margin-right-1 text-size-md" />
                    <i class="iconfont icon-hao margin-right-1 text-size-md" />
                    <i class="iconfont icon-hao text-size-md" />
                </div>
            </div>
            <van-grid
                :border="false"
                :column-num="3"
                class="text-size-md"
                :class="{isShowIcon: isShowIcon}"
            >
                <van-grid-item v-for="one in list" :key="one.title">
                    <div class="item-title margin-bottom-4">{{one.title}}</div>
                    <div class="item-result font-weight-bold" v-if="!isHide">{{one.value}}</div>
                    <div class="item-result font-weight-bold" v-else>
                        <i class="iconfont icon-hao margin-right-1 text-size-md" />
                        <i class="iconfont icon-hao margin-right-1 text-size-md" />
                        <i class="iconfont icon-hao text-size-md" />
                    </div>
                </van-grid-item>
            </van-grid>
            <div class="padding-x-4 text-center margin-x-3">
                更新时间：<span>{{ updateTime }}</span>
            </div>
            <!--
            <div class="padding-x-4 text-center margin-x-3"></div>
            <div class="padding-x-4 text-center margin-x-3">
                <span>2021-06-28 11:10:31</span>
                <span>刷新</span>
                <span>隐藏</span>
            </div>
            -->
            <div class="position-absolute contral">
                <div class="icon-box margin-right-2 rounded-circle d-inline-block">
                    <i
                        class="iconfont icon-refresh d-block hd_animate"
                        :class="{hd_animate_rotate: loading}"
                        @click="handleUpdate"
                    ></i>
                </div>
                <div class="icon-box margin-right-2 rounded-circle d-inline-block">
                    <i
                        class="iconfont rounded-circle"
                        :class="[ isHide ? 'icon-eye' : 'icon-yanjing' ]"
                         @click="isHide = !isHide"
                    ></i>
                </div>
            </div>

            <div class="redirect-old-version position-absolute">
                <div><a href="/merchant/index" class="text-white">返回旧版本</a></div>
            </div>
        </div>
        <section class="home-menu">
            <van-grid :column-num="3">
                <van-grid-item
                    v-for="(item, index) in menuList"
                    :key="item.title"
                    :icon="require(`../../assets/images/home_${(index+1).toString().padStart(2, '0')}.png`)"
                    :text="item.title"
                    :to="item.url"
                    @click="handleClick(item)"
                >
                    <van-image class="menu-icon margin-bottom-1" :src="require(`../../assets/images/home_${(index+1).toString().padStart(2, '0')}.png`)" />
                    <div class="menu-title margin-bottom-1">{{item.title}}</div>
                    <div class="menu-desc text-size-sm" v-if="item.title === '设备管理'">在线{{item.online}}/{{item.total}}台</div>
                    <div class="menu-desc text-size-sm" v-else-if="item.title === 'IC卡管理'">{{item.total}}张</div>
                    <div class="menu-desc text-size-sm" v-else-if="item.title === '会员管理'">{{item.total}}人</div>
                    <div class="menu-desc text-size-sm" v-else-if="item.title === '小区管理'">{{item.total}}个</div>
                    <div class="menu-desc text-size-sm" v-else>&nbsp;</div>
                </van-grid-item>
            </van-grid>
        </section>
    </div>
</template>

<script>
    // import { Notify } from 'vant'
    import { getDealHomePageData, bindingDevice } from '@/require/home'
    import { fmtMoney } from '@/utils/util'
    import { scanQRCode } from '@/utils/wechat-util'
    import parseURL from '@/utils/parse-url'
    import { mapState, mapMutations } from 'vuex'
    export default {
        data () {
            return {
                tt: false,
                active: 1,
                list: [
                    { title: '线上收益', value: 0 },
                    { title: '未提现', value: 0 },
                    // { title: '昨日收益', value: 0 },
                    // { title: '投币收益', value: 0 },
                    // { title: '今日投币', value: 0 },
                    { title: '昨日投币', value: 0 },
                    { title: '总耗电量', value: 0 },
                    { title: '今日耗电', value: 0 },
                    { title: '昨日耗电', value: 0 }
                ],
                menuList: [
                    { title: '设备管理', url: '/device/list', online: 0, total: 0 },
                    { title: 'IC卡管理', url: '/ic/list', total: 0 },
                    { title: '会员管理', url: '/member/list', total: 0 },
                    { title: '小区管理', url: '/area/list', total: 0 },
                    { title: '设备绑定' },
                    { title: '历史收益', url: '/history/profit' },
                    { title: '订单统计', url: '/order/profit' },
                    { title: '充值管理', url: '/chargemanage' },
                    { title: '缴费管理', url: '/paymanage' }
                ],
                todayMoney: 0, // 今日收益
                updateTime: '', // 更新时间
                showincoins: '', // 是否显示投币收益
                loading: false, // 是否正在更新数据
                isHide: false // 是否开启隐藏模式
            }
        },
        async mounted () {
            // setTimeout(() => {
            //     Notify({
            //         type: 'primary',
            //         message: '当前数据非最新数据，如想查看最新数据，请点击下方“”按钮'
            //     })
            // }, 2000)
            this.getInitData({}, '正在加载中')
        },
        computed: {
            ...mapState(['user']),
            isShowIcon () {
                if (this.showincoins === '') {
                    return this.user.showincoins === 1
                } else {
                    if (this.showincoins !== this.user.showincoins) {
                        this.setUser({ ...this.user, showincoins: this.showincoins })
                    }
                    return this.showincoins === 1
                }
            }
        },
        watch: {
            isShowIcon: {
                handler (value) {
                    if (value) {
                        this.list = [
                            { title: '线上收益', value: 0 },
                            { title: '未提现', value: 0 },
                            { title: '昨日收益', value: 0 },
                            { title: '投币收益', value: 0 },
                            { title: '今日投币', value: 0 },
                            { title: '昨日投币', value: 0 },
                            { title: '总耗电量', value: 0 },
                            { title: '今日耗电', value: 0 },
                            { title: '昨日耗电', value: 0 }
                        ]
                    } else {
                        this.list = [
                            { title: '线上收益', value: 0 },
                            { title: '未提现', value: 0 },
                            { title: '昨日收益', value: 0 },
                            { title: '总耗电量', value: 0 },
                            { title: '今日耗电', value: 0 },
                            { title: '昨日耗电', value: 0 }
                        ]
                    }
                },
                immediate: true
            }
        },
        methods: {
            ...mapMutations(['setUser']),
            async getInitData (data, isShowLoading) {
                try {
                    if (isShowLoading === false) {
                        if (this.loading) return // 重复执行会取消最新请求
                        this.loading = true
                    }
                    const { code, message, hasdata, ...result } = await getDealHomePageData(data, isShowLoading)
                    /**
                     * hasdata:
                     *  0: 缓存数据不存在、重新请求
                     *  1: 缓存数据在当天、数据正常，不重新请求
                     *  2: 缓存数据不在当天、数据异正常，重新请求
                     */
                    this.loading = false
                    if (hasdata === 0 || hasdata === 2) {
                        this.getInitData({ type: 1 }, '更新数据中')
                        return false
                    }
                    this.todayMoney = result.nowincomemoney
                    this.showincoins = result.showincoins
                    if (this.isShowIcon) {
                        this.list = [
                            { title: '线上收益', value: fmtMoney(result.totalincomemoney) },
                            { title: '未提现', value: fmtMoney(result.earnings) },
                            { title: '昨日收益', value: fmtMoney(result.yestincomemoney) },
                            { title: '投币收益', value: result.totalcoins },
                            { title: '今日投币', value: result.nowcoins },
                            { title: '昨日投币', value: result.yestcoins },
                            { title: '总耗电量', value: fmtMoney(result.totalConsume) },
                            { title: '今日耗电', value: fmtMoney(result.todayConsume) },
                            { title: '昨日耗电', value: fmtMoney(result.yesterdayConsume) }
                        ]
                    } else {
                        this.list = [
                            { title: '线上收益', value: fmtMoney(result.totalincomemoney) },
                            { title: '未提现', value: fmtMoney(result.earnings) },
                            { title: '昨日收益', value: fmtMoney(result.yestincomemoney) },
                            { title: '总耗电量', value: fmtMoney(result.totalConsume) },
                            { title: '今日耗电', value: fmtMoney(result.todayConsume) },
                            { title: '昨日耗电', value: fmtMoney(result.yesterdayConsume) }
                        ]
                    }
                    this.menuList = [
                        { title: '设备管理', url: '/device/list', online: result.onlines, total: result.onlines + result.disline },
                        { title: 'IC卡管理', url: '/ic/list', total: result.onlincardcount },
                        { title: '会员管理', url: '/member/list', total: result.clientsnum },
                        { title: '小区管理', url: '/area/list', total: result.areanum },
                        { title: '设备绑定' },
                        { title: '历史收益', url: '/history/profit' },
                        { title: '订单统计', url: '/order/profit' },
                        { title: '充值管理', url: '/chargemanage' },
                        { title: '缴费管理', url: '/paymanage' }
                    ]
                    this.updateTime = result.renewalTime
                    // 当上次更新时间大于2小时，则发送请求重新获取最新数据
                    // if ((new Date()).getTime() - (new Date(result.renewalTime)).getTime() > 2 * 60 * 60 * 1000) {
                    //     this.getInitData({ type: 1 }, false)
                    // }
                    /** hasdata
                     *  1:不存在数据
                     *   2:存在数据；且数据是当天数据
                     *  3:存在数据；但数据不为当天数据
                     *  4:获取的为当前查询的数据
                     */
                } catch (e) {
                    console.log(e)
                } finally {
                    if (isShowLoading === false) {
                        this.loading = false
                    }
                    this.tt = true
                }
            },
            // 更新数据
            handleUpdate () {
                this.getInitData({ type: 1 }, false)
            },
            handleClick ({ title }) {
                if (title !== '设备绑定') return false
                // 调取扫一扫，获取扫码信息
                scanQRCode()
                .then(res => {
                    const { status, message, ...result } = parseURL(res)
                    if (status !== 200) return this.$toast(message)
                    if (!result.code) return this.$toast('请扫描设备的二维码')
                    bindingDevice({
                        devicenum: result.code
                    })
                    .then(res => {
                        this.$toast(res.message)
                    })
                    .catch(e => {
                        this.$toast('异常错误')
                    })
                })
                .catch(err => {
                    console.log('errerr', err)
                })
            }
        }
    }
</script>

<style lang="scss">
    .home {
        min-height: 100vh;
        padding-bottom: 1.8rem;
        .data-content {
            width: 100%;
            background-image: -webkit-linear-gradient(-45deg, #2cb34b, #48b7ec);
            // &::after {
            //     content: '';
            //     position: absolute;
            //     left: 0;
            //     right: 0;
            //     top: 0;
            //     bottom: 0;
            //     background: url('../../assets/images/home_bg.png');
            //     background-size: 100% 100%;
            // }
            overflow: hidden;
            .contral {
                right: 10px;
                top: 25px;
                .icon-box {
                    background: rgba(0, 0, 0, .1);
                    color: rgba(255, 255, 255, .5);
                    box-shadow: -1px -1px 3px rgba(44 , 179, 75 , 0.01), 2px 2px 6px rgba(0, 0, 0, .3);
                    padding: 7px;
                }
            }
            .redirect-old-version {
                left: 10px;
                top: 25px;
                background: rgba(0, 0, 0, 0.1);
                padding: 7px;
                font-size: 12px;
                border-radius: 30px 30px 30px 30px;
                box-shadow: -1px -1px 3px rgba(44 , 179, 75 , 0.01), 2px 2px 6px rgba(0, 0, 0, .3);
            }
            .circular-1 {
                width: 25px;
                height: 25px;
                background: rgba(255, 255, 255, .2);
                // transform: translate(80vw, 2vh);
                left: 80vw;
                top: 8vh;
            }
            .circular-2 {
                width: 280px;
                height: 280px;
                background: rgba(255, 255, 255, .2);
                // transform: translate(-15vw, -10vh);
                left: -15vw;
                top: -10vh;
            }
            .circular-3 {
                width: 100px;
                height: 100px;
                background: rgba(255, 255, 255, .2);
                // transform: translate(28vw, 19vh);
                left: 28vw;
                top: 19vh;
            }
            .circular-4 {
                width: 120px;
                height: 120px;
                background: rgba(255, 255, 255, .2);
                // transform: translate(83vw, 50vw);
                left: calc(100vw - 18%);
                top: 50vw;
            }
            .today-data {
                .item-result {
                    .yen {
                        font-weight: normal;
                        bottom: 5px;
                    }
                    font-size: .9rem;
                }
            }
            .isShowIcon {
                .van-grid-item {
                    .isShowIcon {
                        &:nth-child(3n) {
                            &::after {
                                width: 0;
                            }
                        }
                    }
                }
            }
            .van-grid-item {
                &::after {
                    content: '';
                    position: absolute;
                    right: 0;
                    top: 50%;
                    width: 2px;
                    height: 65%;
                    transform: translateY(-50%);
                    background: rgba(255, 255, 255, .3);
                }
                .isShowIcon {
                    &:nth-child(2n) {
                        &::after {
                            width: 0;
                        }
                    }
                }
                .van-grid-item__content {
                    background: transparent;
                }
            }
        }
        .home-menu {
            .menu-icon {
                width: 35%;
            }
        }
        section {
            .van-grid-item__content--center {
                padding: 0.15rem 0.21333rem;
            }
        }
    }
    /* 暗黑模式 */
    [theme="dark"] {
        .home .data-content {
            background-image: -webkit-linear-gradient(-45deg, #165a26, #245c76);
        }
    }
</style>
