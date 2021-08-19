<template>
    <div class="area-manage position-relative d-flex flex-column bg-gray h-100">
        <van-nav-bar
            title="管理【回忆小区】"
            left-text="返回"
            left-arrow
            class="header-fixed"
        />
        <main>
            <hd-line height="1.6rem"/>
            <!-- <hd-title exec>小区合伙人</hd-title> -->
            <van-tabs v-model="active">
                <van-tab title="合伙人管理">
                    <hd-title class="bg-white" exec>合伙人管理</hd-title>
                    <area-partner :noData="noData" />
                </van-tab>
                <van-tab title="设备管理">
                    <hd-title class="bg-white" exec>设备管理</hd-title>
                    <areaAdevice :list="list" />
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
                        <ul class="d-flex flex-wrap temp-warp padding-x-3">
                            <li class="padding-2 margin-bottom-3 text-center rounded" v-for="item in 5" :key="item">
                                <div>充100元送10元</div>
                                <div class="margin-top-1 text-size-sm text-999"><span class="margin-right-2">充值100元</span> <span>到账110元</span></div>
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
                        <ul class="d-flex flex-wrap temp-warp padding-x-3">
                            <li class="padding-2 margin-bottom-3 text-center rounded" v-for="item in 5" :key="item">
                                <div>充100元送10元</div>
                                <div class="margin-top-1 text-size-sm text-999"><span class="margin-right-2">充值100元</span> <span>到账110元</span></div>
                            </li>
                        </ul>
                    </div>
                </van-tab>
            </van-tabs>
            <hd-nav :list="[{ text: '删除小区' }]">
                <van-button type="danger" size="small"  class="w-50">删除小区</van-button>
            </hd-nav>
        </main>
        <!-- <footer class="shadow"></footer> -->
    </div>
</template>
<script>
import areaPartner from './area-partner'
import areaAdevice from './area-device'
import hdNav from '@/components/hd-nav'
import { inquireAreaDataById } from '@/require/area'
export default {
    data () {
        return {
             id: '',
            active: 0,
            noData: 0, // 0 正常 1 loading 2 noData
            noDataText2: {
                description: '本小区暂无绑定的设备'
            },
            list: []
        }
    },
    mounted () {
        for (let i = 0; i < 20; i++) {
            this.list.push({ id: i, name: ('a' + i), selected: i === 10 })
        }
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
                await inquireAreaDataById({
                    id: this.id
                })
            } catch (error) {
            }
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
