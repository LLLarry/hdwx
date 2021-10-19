<template>
    <div class="device-order position-relative bg-gray overflow-hidden">
        <!-- 顶部操作 -->
      <van-nav-bar
          :title="`小区收益统计`"
          left-text="返回"
          class="shadow position-fixed w-100"
          left-arrow
          @click-left="$router.go(-1)"
      />
        <main>
           <van-sticky offset-top="1.3866666666666667rem" v-if="showincoins">
                <van-row class="d-flex post-border-row post-header margin-x-3 text-size-sm font-weight-bold">
                    <van-col :span="spanNum" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">时间</van-col>
                    <van-col :span="spanNum" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">线上收益</van-col>
                    <van-col :span="spanNum" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center" v-if="showincoins !== 2">投币收益</van-col>
                    <van-col :span="spanNum" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">消费金额</van-col>
                    <van-col :span="spanNum" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center" v-if="hardversion !== '03' && hardversion !== '04'">设备使用率</van-col>
                </van-row>
            </van-sticky>
            <hd-scroll @pullingUpFn = "pullingUpFn" @getScroll="({ scroll }) => this.scroll = scroll">
                <div class="padding-y-3">
                    <van-row class="d-flex post-border-row margin-x-3 text-size-sm text-666" v-for="item in list" :key="item.createTime">
                        <van-col :span="spanNum" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">{{ item.createTime | fmtDate('YYYY-MM-DD') }}</van-col>
                        <van-col :span="spanNum" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">{{item.onlineEarn | fmtMoney}}</van-col>
                        <van-col :span="spanNum" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center" v-if="showincoins !== 2">{{item.incomemoney | fmtMoney(0)}}</van-col>
                        <van-col :span="spanNum" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">{{item.consumemoney | fmtMoney}}</van-col>
                        <van-col :span="spanNum" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">{{item.usagerate | fmtMoney}}%</van-col>
                    </van-row>
                    <hd-bottom :status="status" class="bottom-style" />
                </div>
            </hd-scroll>
        </main>
    </div>
</template>
<script>
import hdScroll from '@/components/hd-scroll'
import hdBottom from '@/components/hd-bottom'
import { inquireAreaEarnRecord } from '@/require/area'
const LIMIT = 30
export default {
    data () {
        return {
            id: this.$route.params.id,
            scroll: null,
            currentPage: 1,
            ordernum: '',
            slideMenuIsShow: false, // 侧边菜单是否显示
            list: [],
            status: 1, // 0 正在加载中 1 空闲状态 2 暂无更多数据
            showincoins: '', // 是否显示投币收益
            hardversion: '' // 硬件版本号
        }
    },
    mounted () {
        // 初始化数据
        this.gatAreaStatis(true)
    },
    components: {
        hdScroll,
        hdBottom
    },
    computed: {
      spanNum () {
        let num = 3
        if (this.showincoins !== 2) {
          num++
        }
        return 24 / num
      }
    },
    methods: {
        async gatAreaStatis (init = false) {
            if (init) {
               this.currentPage = 1
            } else {
                ++this.currentPage
            }
            try {
                this.status = 0
                const { code, message, ...result } = await inquireAreaEarnRecord({
                    currentPage: this.currentPage,
                    aid: this.id,
                    limit: LIMIT
                })
                if (code === 200) {
                    // 判断是否是初始化，如果是初始化那么重新赋值，非初始化，再尾部追加值
                    if (init) {
                        this.list = result.resultdata
                        this.showincoins = (Array.isArray(result.resultdata) && result.resultdata[0]) ? result.resultdata[0].showincoins : 2
                    } else {
                        this.list = [...this.list, ...result.resultdata]
                    }
                    // 更改状态，看是否还有数据
                    if (result.resultdata.length >= LIMIT) {
                        this.status = 1
                    } else {
                        this.status = 2
                    }
                } else {
                    this.$toast(message)
                }
            } catch (e) {
                this.$toast('异常错误')
            } finally {
                if (this.scroll) {
                    if (init) {
                        // 初始化加载的时候刷新滚动对象，并滚动到起始位置
                        this.scroll.refresh()
                        this.scroll.scrollTo(0, 0, 0, undefined, {})
                        this.scroll.finishPullUp()
                    } else {
                        // 非初始化加载完成的时候完成上啦加载操作
                        this.scroll.finishPullUp()
                    }
                }
            }
        },
        // 触发上啦加载
        pullingUpFn ({ scroll }) {
            // 当请求空闲的时候发送请求
            if (this.status === 1) {
                this.gatAreaStatis()
            }
        }
    }
}
</script>

<style lang="scss">
.device-order {
    height: 100vh;
    .header {
        width: 100%;
        z-index: 9999;
    }
    .filter-box {
        padding-top: 84px;
        padding-bottom: 74px;
    }
    .filter-bottom {
        bottom: 0;
        left: 0;
        right: 0;
    }
    main {
        padding-top: 39px;
        height: 100vh;
        box-sizing: border-box;
        .post-border-row {
            &.post-header {
                background-color: #c8efd4;
            }
            border: 1px solid #add9c0;
            .post-border-col {
                border-right: 1px solid #add9c0;
            }
        }
        .bottom-style {
          padding: 0 !important;
          height: 45px !important;
          line-height: 1.8;
        }
    }
}
</style>
