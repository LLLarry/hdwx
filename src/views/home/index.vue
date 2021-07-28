<template>
    <div class="home">
        <div class="data-content position-relative text-white padding-bottom-3 padding-top-1">
            <div class="circular-1 rounded-circle position-absolute"></div>
            <div class="circular-2 rounded-circle position-absolute"></div>
            <div class="circular-3 rounded-circle position-absolute"></div>
            <div class="circular-4 rounded-circle position-absolute"></div>
            <!--<div class="circular-5 rounded-circle position-absolute"></div> -->
            <div class="today-data d-flex flex-column justify-content-center align-items-center margin-top-4 margin-bottom-3">
                <div class="item-title margin-bottom-2">今日收益</div>
                <div class="item-result font-weight-bold text-size-lg">
                    <i class="iconfont icon-fl-renminbi margin-right-2 position-relative yen"></i>
                    <span>48.31</span>
                </div>
            </div>
            <van-grid
                :border="false"
                :column-num="isShowIcon ? 3 : 2"
                class="text-size-sm"
                :class="{isShowIcon: isShowIcon}"
            >
                <van-grid-item>
                    <div class="item-title margin-bottom-4">线上收益</div>
                    <div class="item-result font-weight-bold">48.31</div>
                </van-grid-item>
                <van-grid-item>
                    <div class="item-title margin-bottom-4">线上收益</div>
                    <div class="item-result font-weight-bold">48.31</div>
                </van-grid-item>
                <van-grid-item>
                    <div class="item-title margin-bottom-4">线上收益</div>
                    <div class="item-result font-weight-bold">48.31</div>
                </van-grid-item>
                <van-grid-item>
                    <div class="item-title margin-bottom-4">线上收益</div>
                    <div class="item-result font-weight-bold">48.31</div>
                </van-grid-item>
                <van-grid-item>
                    <div class="item-title margin-bottom-4">线上收益</div>
                    <div class="item-result font-weight-bold">48.31</div>
                </van-grid-item>
                <van-grid-item>
                    <div class="item-title margin-bottom-4">线上收益</div>
                    <div class="item-result font-weight-bold">48.31</div>
                </van-grid-item>
                <van-grid-item>
                    <div class="item-title margin-bottom-4">线上收益</div>
                    <div class="item-result font-weight-bold">48.31</div>
                </van-grid-item>
                <van-grid-item>
                    <div class="item-title margin-bottom-4">线上收益</div>
                    <div class="item-result font-weight-bold">48.31</div>
                </van-grid-item>
                <van-grid-item>
                    <div class="item-title margin-bottom-4">线上收益</div>
                    <div class="item-result font-weight-bold">48.31</div>
                </van-grid-item>
            </van-grid>
            <div class="padding-x-4 text-center margin-x-3">
                更新时间：<span>2021-06-28 11:10:31</span>
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
                    <i class="iconfont icon-refresh d-block hd_animate hd_animate_rotate"></i>
                </div>
                <div class="icon-box margin-right-2 rounded-circle d-inline-block">
                    <i class="iconfont icon-yanjing rounded-circle"></i>
                </div>
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
        <hd-line height="1.3rem" />
    </div>
</template>

<script>
    // import { Notify } from 'vant'
    import { getDealHomePageData } from '@/require/home'
    export default {
        data () {
            return {
                active: 1,
                menuList: [
                    { title: '设备管理', url: '/device/list', online: 5, total: 10 },
                    { title: 'IC卡管理', url: '/ic/list', total: 20 },
                    { title: '会员管理', url: '/member/list', total: 1596 },
                    { title: '小区管理', total: 12, url: '/area/list' },
                    { title: '设备绑定' },
                    { title: '历史收益' },
                    { title: '订单统计' },
                    { title: '充值管理' },
                    { title: '缴费管理', url: '/register' }
                ],
                isShowIcon: true // 是否显示投币收益
            }
        },
        mounted () {
            // setTimeout(() => {
            //     Notify({
            //         type: 'primary',
            //         message: '当前数据非最新数据，如想查看最新数据，请点击下方“”按钮'
            //     })
            // }, 2000)
            // this.$dialog.alert({
            //     title: '提示',
            //     message: JSON.stringify(this.$store.state),
            //     beforeClose (action, done) {
            //         done()
            //         wx.closeWindow()
            //     }
            // })
            this.getInitData()
        },
        methods: {
            async getInitData (data) {
                try {
                    const { code, message, ...result } = await getDealHomePageData(data)
                    alert(JSON.stringify(result))
                } catch (e) {
                    alert(message)
                }
            }
        }
    }
</script>

<style lang="scss">
    .home {
        padding-bottom: 1.4rem;
        .data-content {
            width: 100%;
            min-height: 40vh;
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
    }
</style>
