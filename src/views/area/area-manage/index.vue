<template>
    <div class="area-manage position-relative d-flex flex-column bg-gray h-100">
        <van-nav-bar
            title="管理【回忆小区】"
            left-text="返回"
            left-arrow
            class="header-fixed"
            @click-left="$router.go(-1)"
        />
        <main>
            <hd-line height="1.6rem"/>
            <!-- <hd-title exec>小区合伙人</hd-title> -->
            <van-tabs v-model="active">
                <van-tab title="设备管理">
                    <hd-title class="bg-white" exec>设备管理</hd-title>
                    <areaAdevice :existdevice="existdevice" :noexistdevice="noexistdevice" @reflesh="reflesh" />
                </van-tab>
                <van-tab title="合伙人管理">
                    <hd-title class="bg-white" exec>合伙人管理</hd-title>
                    <area-partner :noData="noData" :partlist="partlist" @reflesh="reflesh" />
                </van-tab>
                <van-tab title="钱包模板">
                    <!-- 钱包充值模板 -->
                    <div class="bg-white">
                        <hd-title exec>
                            钱包充值模板
                            <template #desc>
                                <div class="d-flex align-items-center text-success">
                                    更改模板 <van-icon name="arrow" />
                                </div>
                            </template>
                        </hd-title>
                        <div v-no-data="!walletTemplate"></div>
                        <ul class="d-flex flex-wrap temp-warp padding-x-3" v-if="walletTemplate">
                            <li class="padding-2 margin-bottom-3 text-center rounded"
                                v-for="item in walletTemplate.gather"
                                :key="item.id">
                                <div>{{item.name}}</div>
                                <div class="margin-top-1 text-size-sm text-999"><span class="margin-right-2">充值{{item.money}}元</span> <span>到账{{item.remark}}元</span></div>
                            </li>
                        </ul>
                    </div>
                </van-tab>
                <van-tab title="在线卡模板">
                    <!-- 在线卡充值模板 -->
                    <div class="bg-white">
                        <!-- <hd-line height="20px" /> -->
                        <hd-title exec>
                            在线卡充值模板
                            <template #desc>
                                <div class="d-flex align-items-center text-success">
                                    更改模板 <van-icon name="arrow" />
                                </div>
                            </template>
                        </hd-title>
                        <div v-no-data="!oncardTemplate"></div>
                        <ul class="d-flex flex-wrap temp-warp padding-x-3" v-if="oncardTemplate">
                            <li class="padding-2 margin-bottom-3 text-center rounded" v-for="item in oncardTemplate.gather" :key="item.id">
                                <div>{{item.name}}</div>
                                <div class="margin-top-1 text-size-sm text-999"><span class="margin-right-2">充值{{item.money}}元</span> <span>到账{{item.remark}}元</span></div>
                            </li>
                        </ul>
                    </div>
                </van-tab>
            </van-tabs>
            <hd-nav :list="[{ text: '删除小区' }]">
                <van-button type="danger" size="small"  class="w-50" @click="handleDelete">删除小区</van-button>
            </hd-nav>
        </main>
        <!-- <footer class="shadow"></footer> -->
    </div>
</template>
<script>
import areaPartner from './area-partner'
import areaAdevice from './area-device'
import hdNav from '@/components/hd-nav'
import { inquireAreaDataById, dealeteAreaInfo } from '@/require/area'
export default {
    data () {
        return {
             id: '',
            active: 0,
            noData: 0, // 0 正常 1 loading 2 noData
            noDataText2: {
                description: '本小区暂无绑定的设备'
            },
            partlist: [], // 合伙人列表
            existdevice: [], // 已绑定的设备
            noexistdevice: [], // 未绑定的设备
            oncardTemplate: {}, // 在线卡模板
            walletTemplate: {}, // 钱包模板
            list: []
        }
    },
    mounted () {
        this.id = this.$route.params.id
        this.init()
    },
    components: {
        areaPartner,
        areaAdevice,
        hdNav
    },
    methods: {
        async init () {
            try {
                const { code, message, partlist, existdevice, noexistdevice, oncardTemplate, walletTemplate } = await inquireAreaDataById({
                    id: this.id
                })
                if (code === 200) {
                    this.partlist = partlist
                    this.existdevice = existdevice
                    this.noexistdevice = noexistdevice
                    this.oncardTemplate = oncardTemplate
                    this.walletTemplate = walletTemplate
                } else {
                    this.$toast(message)
                }
            } catch (error) {
                this.$toast('异常错误')
            }
        },
        reflesh () {
            this.init()
        },
        // 删除小区
        handleDelete () {
            this.$dialog.confirm({
                title: '提示',
                message: '是否删除当前小区？',
                beforeClose: async (action, done) => {
                    if (action === 'confirm') {
                        const { code: status, message } = await dealeteAreaInfo({ aid: this.id })
                        done()
                        if (status === 200) {
                            setTimeout(() => {
                                return this.$dialog.alert({
                                title: '提示',
                                    message: '已成功删除当前小区'
                                }).then(() => {
                                    this.$router.replace({ path: '/area/list' })
                                })
                            }, 300)
                        } else {
                            this.$toast(message)
                        }
                    } else {
                        done()
                    }
                }
            })
        }
    }
}
</script>

<style lang="scss">
.area-manage {
    height: 100vh;
    .header-fixed {
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
    }
    .area-box-1 {
        background-image: -webkit-linear-gradient(-45deg, rgba(23, 162, 184, .26), transparent);
    }
    .add-partner {
        height: 35px;
        border: 1px dotted #07c160;
        color: #07c160;
        &:active {
            background: rgba(220, 222, 224, .7);
        }
    }
    .area-box-2 {
        background-image: -webkit-linear-gradient(-45deg, rgba(23, 162, 184, .26), transparent);
    }
    footer {
        position: fixed;
        width: 100%;
        bottom: 0;
        left: 0;
        height: 46px;
        box-shadow: 0 -2px 12px rgba(100, 101, 102, 0.24);
    }
    .temp-warp {
        li {
            width: 45%;
            margin-right: 5%;
            background: rgba(200, 201, 204, .36);
            border: 1px dotted rgba(50, 50, 51, .25);
            box-sizing: border-box;
            &:nth-child(2n) {
                margin-right: 0%;
            }
            i {
                font-size: 14px;
                color: yellow;
            }
        }
    }
    .filter-box {
        padding-bottom: 60px;
    }
    .search-button {
        padding: 14px 10px;
        height: 0;
        border: none;
    }
    .filter-bottom {
        left: 0;
        right: 0;
        bottom: 0;
    }
    .van-tabs__content {
        max-height: calc(100vh - 154px);
        overflow: auto;
    }
    // .percent-input {
    //     .van-stepper__plus {
    //         background-color: #07c160;
    //     }
    //     .van-stepper__minus {
    //         color: #07c160;
    //         border-color: #07c160;
    //     }
    // }
}

</style>
