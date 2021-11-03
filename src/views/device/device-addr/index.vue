<template>
    <div class="device-addr d-flex flex-column">
        <header class="position-relative">
            <van-nav-bar
                :title="`${code}从机`"
                left-text="返回"
                right-text="按钮"
                left-arrow
                class="shadow"
            >
                <template #right>
                    <div class="d-flex justify-content-end align-items-center" style="margin-right: -0.5rem" @click.prevent>
                        <div class="contral-item text-size-sm padding-x-2 d-flex flex-column justify-content-center" @click="addAddr">
                            <van-icon name="plus" size=".5rem" />
                            <div class="text-999">添加</div>
                        </div>
                        <div class="contral-item text-size-sm padding-x-2 d-flex flex-column justify-content-center" @click="reload">
                            <van-icon name="replay" size=".5rem"  />
                            <div class="text-999">更新</div>
                        </div>
                        <div class="contral-item text-size-sm padding-x-2 d-flex flex-column justify-content-center" @click="isShowSearch = true">
                            <van-icon name="search" size=".5rem"  />
                            <div class="text-999">搜索</div>
                        </div>
                    </div>
                </template>
            </van-nav-bar>
            <div
                class="position-absolute search-box w-100 h-100 bg-white d-flex align-items-center"
                :class="{ active: isShowSearch }"
            >
                <van-search
                    v-model="keywords"
                    show-action
                    placeholder="请输入搜索关键词"
                    class="flex-1"
                    @cancel="isShowSearch = false"
                />
            </div>
        </header>
        <main class="flex-1 bg-gray ">
            <div class="padding-3" v-no-data:[nodata]="list.length <= 0">
                <ul>
                    <li class="margin-bottom-3" v-for="item in list" :key="item">
                        <div class="d-flex bg-white padding-y-2 shadow rounded">
                            <div class="left d-flex align-items-center padding-2">
                                <i class="iconfont icon-diannao text-success addr-icon"></i>
                            </div>
                            <div class="right flex-1 d-flex flex-column justify-content-between padding-right-2">
                                <div class="text-size-default">{{item}}</div>
                                <div class="d-flex justify-content-end">
                                    <van-button type="danger" size="mini" @click="unbind(item)">解绑</van-button>
                                    <van-button type="primary" size="mini" :to="`/remote/charge/${code}?addr=${item}`">远程</van-button>
                                    <van-button type="primary" size="mini" :to="`/device/portstatus/${code}?addr=${item}`">状态</van-button>
                                    <van-button type="primary" size="mini" @click="showQrcode(item)">二维码</van-button>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </main>
        <!-- 从机二维码 -->
        <hd-overlay :show="qrIsShow" title="从机二维码" @close="hideQrcode">
            <div>
                <hd-qrcode
                    v-if="qrIsShow"
                    :qrcode="qrcode"
                    :style="{width: `${global.clientWidth * 0.6}px`}"
                />
                <p class="text-center text-size-sm text-666">长按识别或保存二维码</p>
            </div>
        </hd-overlay>
        <!-- 从机二维码 -->
    </div>
</template>

<script>
import { toRefs } from '@vue/composition-api'
import { useSearchook, useAddrList, useQrcode, useAddAddr, filterList, unbindAddr } from './helper'
import HdQrcode from '@/components/hd-qrcode'
import HdOverlay from '@/components/hd-overlay'
import { mapState } from 'vuex'
export default {
    components: {
        HdQrcode,
        HdOverlay
    },
    computed: {
        ...mapState(['global'])
    },
    setup (props, context) {
        const code = context.root.$route.params.code
        const { keywords, isShowSearch } = useSearchook()
        const [initList, reload] = useAddrList(code)
        const { qrWrapper, showQrcode, hideQrcode } = useQrcode(context, code)
        const addAddr = () => useAddAddr(context)
        const list = filterList(keywords, initList)
        const unbind = (addr) => {
            unbindAddr(context, code, addr)
        }
        return {
            list,
            keywords,
            isShowSearch,
            code, // 设备号
            ...toRefs(qrWrapper),
            showQrcode,
            hideQrcode,
            addAddr,
            unbind,
            reload,
            nodata: {
                description: '暂无从机地址'
            }
        }
    }
}
</script>

<style lang="scss">
.device-addr {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    .van-nav-bar__left:active, .van-nav-bar__right:active {
        opacity: 1;
    }
    .contral-item {
        &:active {
            opacity: .7;
        }
    }
    .search-box {
        top: 0;
        left: 0;
        z-index: 2;
        transform: translateX(100%);
        transition: transform .4s ease-in-out;
        .van-search {
            padding: 0 0.32rem;
        }
        &.active {
            transform: translateX(0);
        }
    }
    main {
        overflow: auto;
        .addr-icon {
            font-size: 36px;
        }
    }
    #qr_box {
        position: absolute;
        z-index: -1;
    }
}
</style>
