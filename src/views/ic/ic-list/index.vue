<template>
    <div class="ic-list position-relative d-flex flex-column">
        <div class="section shadow padding-bottom-2">
            <div class="search-form d-flex padding-x-2 margin-top-2 align-items-center">
                <van-dropdown-menu class="select-menu">
                    <van-dropdown-item get-container=".dropMenu" v-model="type" :options="option1" @open="dropMenuStatus=1" @closed="dropMenuStatus=2" />
                </van-dropdown-menu>
                <van-search
                    v-model="keywords"
                    :placeholder="`请输入${option1[type-1].text}`"
                    class="search-input rounded-circle"
                />
                <van-button plain type="info" class="search-button" @click="handleSearch">搜索</van-button>
            </div>
            <div class="padding-top-2">
                <van-dropdown-menu class="select-menu">
                    <van-dropdown-item get-container=".dropMenu" v-model="value2" :options="option2"  @open="dropMenuStatus=1" @change="asyInquireOnlineData(true)" />
                    <van-dropdown-item get-container=".dropMenu" v-model="value3" :options="option3"  @open="dropMenuStatus=1" @change="asyInquireOnlineData(true)" />
                    <van-dropdown-item get-container=".dropMenu" v-model="value4" :options="option4"  @open="dropMenuStatus=1" @change="asyInquireOnlineData(true)" />
                </van-dropdown-menu>
            </div>
            <div class="padding-top-2 padding-x-2 d-flex justify-content-around text-size-sm">
                <div><span>数量：</span><span class="text-success">{{datasize}}个</span></div>
                <div><span>充值：</span><span class="text-success">{{datatopupmoney}}元</span></div>
                <div><span>赠送：</span><span class="text-success">{{datasendmoney}}元</span></div>
            </div>
        </div>

        <main class="bg-gray">
            <hd-scroll
                @pullingUpFn = "pullingUpFn"
                @getScroll="getScroll"
            >
                <div class="padding-top-3">
                    <ic-list-card
                        v-for="card in list"
                        :key="card.id" :value="card"
                        @changeStatus="changeStatus"
                    />
                    <div
                        class="text-center padding-bottom-3 text-666"
                    >{{ status === 2 ? '暂无更多数据' : '正在加载更多' }}</div>
                </div>
            </hd-scroll>
        </main>
        <bind-ic-card :arealist="arealist" />
        <!-- 修改卡状态 -->
         <van-action-sheet
            v-model="actionIsShow"
            :actions="actions"
            cancel-text="取消"
            :description="descMessage"
            close-on-click-action
            @select="handldConfirmChangeStatus"
        />
        <!-- 下拉菜单挂载的节点 -->
        <div class="dropMenu" />
    </div>
</template>
<script>
// import hdScroll from '@/components/hd-scroll'
import hdScroll from '@/components/hd-scroll/scroll'
import IcListCard from '@/components/ic-list/ic-list-card'
import BindIcCard from '@/components/ic-list/bind-ic-card'
import { inquireOnlineData, changeOnlineCardStatus } from '@/require/ic'
const REQUIRE_LENGTH = 35 // 请求返回值数量
export default {
    data () {
        return {
            keywords: '', // 搜索条件
            type: 1, // 搜索类型 和 option1 对应
            option1: [
                { text: 'IC卡号', value: 1 },
                { text: '手机号', value: 2 }
            ],
            value2: '',
            option2: [
                { text: '所有小区', value: '' }
            ],
            value3: 0,
            option3: [
                { text: '全部', value: 0 },
                { text: '正常', value: 1 },
                { text: '挂失', value: 2 },
                { text: '未绑定', value: 3 }
            ],
            value4: 0,
            option4: [
                { text: '默认排序', value: 0 },
                { text: '金额从大到小', value: 1 },
                { text: '金额从小到大', value: 2 }
            ],
            dropMenuStatus: 2, // 下拉菜单状态， 1 展开 2关闭
            status: 1, //  0 正在加载中 1 空闲状态 2 更多数据
            scroll: null, // 滚动实例
            leaveScrollY: 0,
            list: [], // 列表数据
            currentPage: 1, // 当前页
            datasize: 0, // 在线卡数量
            datatopupmoney: 0, // 在线卡充值金额
            datasendmoney: 0, // 在线卡赠送金额
            actionIsShow: false, // 是否现在线卡状态
            actions: [
                { name: '正常', id: 1 },
                { name: '挂失', id: 2 },
                { name: '未绑定', id: 0 }
            ],
            actionRow: {}, // 更改在显卡状态
            arealist: [] // 小区列表
        }
    },
    mounted () {
        this.asyInquireOnlineData(true)
    },
    components: {
        hdScroll,
        IcListCard,
        BindIcCard
    },
    computed: {
        descMessage () {
            if (this.actionIsShow) {
                const cardID = this.actionRow.cardID ? this.actionRow.cardID : ''
                return `更改${cardID}卡状态`
            }
            return ''
        }
    },
    beforeRouteLeave (to, from, next) {
        if (this.scroll) {
            this.leaveScrollY = this.scroll.state.scrollTop
        }
        next()
    },
    watch: {
        $route: {
            handler () {
                if (this.scroll) {
                    this.scroll.scrollTo(this.leaveScrollY, 0)
                    this.scroll.refresh()
                }
            }
        }
    },
    methods: {
        // 点击搜索按钮
        async handleSearch () {
            this.asyInquireOnlineData(true)
            if (this.scroll) {
                this.scroll.refresh()
                this.scroll.scrollTo(0, 0, 0, undefined, {})
            }
        },
        // 保存 scroll 实例
        getScroll ({ scroll, index }) {
            this.scroll = scroll
        },
        pullingUpFn ({ scroll }) {
            if (this.status !== 2) {
                console.log('status', status)
                this.asyInquireOnlineData()
            }
        },
        /* 异步请求card list */
        async asyInquireOnlineData (init = false) {
            try {
                if (!init) { // 非初始化状态
                    if ([0, 2].includes(this.status)) return false // 正在加载中、无数据 取消请求
                    this.currentPage++
                } else {
                    this.currentPage = 1
                }
                this.status = 0
                const { code, message, result } = await inquireOnlineData({
                    type: this.type,
                    keywords: this.keywords,
                    areaId: this.value2,
                    cardtype: this.value3, // 卡类型   1:正常卡  2:挂失卡  3:未绑定卡
                    cardrank: this.value4, // 1:充值金额按从大到小  2:充值金额按从小到大
                    currentPage: this.currentPage,
                    limit: REQUIRE_LENGTH,
                    source: 2 // 来源； 手机端 默认固定传值 2
                }, '正在加载数据')
                if (code === 200) {
                    // 如果是初始化，需要将list置空之后再进行赋值
                    const { datalist, datasize, datatopupmoney, datasendmoney, areaData } = result
                    if (init) {
                        this.list = datalist
                        this.datasize = datasize // 在线卡数量
                        this.datatopupmoney = datatopupmoney // 在线卡充值金额
                        this.datasendmoney = datasendmoney // 在线卡赠送金额
                        this.arealist = areaData.reduce((acc, item) => {
                            acc.push({ text: item.name, value: item.id })
                            return acc
                        }, [])
                        this.option2 = [{ text: '所有小区', value: '' }, ...this.arealist]
                    } else {
                        this.list = [...this.list, ...datalist]
                    }
                    if (datalist.length < REQUIRE_LENGTH) {
                        this.status = 2 // 将状态置为无数据
                    } else {
                        this.status = 1 // 将状态置为空闲
                    }
                } else {
                    this.$toast(message)
                }
            } catch (e) {
                this.$toast('异常错误')
            } finally {
                if (this.scroll) {
                    this.$nextTick(() => {
                        if (init) {
                            this.scroll.refresh()
                            this.scroll.finishPullUp()
                            this.scroll.scrollTo(0, 0, 0, undefined, {})
                        } else {
                            this.scroll.finishPullUp()
                        }
                    })
                }
            }
        },
        /* 更改在线卡状态 */
        async asyChangeOnlineCardStatus (data) {
            try {
                const { code, message } = await changeOnlineCardStatus(data)
                console.log(code)
                if (code === 200) {
                    this.$set(this.actionRow, 'status', data.status)
                    // this.actionRow.status = data.status
                    this.$toast(`【${this.actionRow.cardID}】卡状态修改成功`)
                } else {
                    this.$toast(message)
                }
            } catch (e) {
                this.$toast('异常错误')
            }
        },
        // 商户选择卡状态后的回调
        handldConfirmChangeStatus ({ id, name, subname }) {
            // 调用修改卡状态方法
            this.asyChangeOnlineCardStatus({ id: this.actionRow.id, status: id })
        },
        changeStatus (row) {
            this.actionRow = row
            this.actions.forEach(item => {
                if (item.id === row.status) {
                    item.subname = '当前所属状态'
                    item.color = '#1989fa'
                } else {
                    delete item.subname
                    delete item.color
                }
            })
            this.actionIsShow = true
        }
    }
}
</script>

<style lang="scss">
.ic-list {
    height: 100vh;
    .section {
        position:  relative;
        z-index: 1;
        // transform: translateZ(2px);
        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            box-shadow: 1rem 1rem 1rem rgba(255, 255, 0, 1);
        }
        .select-menu {
            .van-dropdown-menu__bar {
                height: 0;
                background-color: transparent;
                box-shadow: none;
                padding: 14px 14px 14px 0;
                .van-dropdown-menu__title {
                    font-size: 14px;
                }
            }
        }
        .search-form {
            .van-field__body {
                height: 100%;
                input {
                    height: 100%;
                }
            }
            .search-input {
                flex: 1;
                border-radius: 36px;
                padding-top: 0;
                padding-bottom: 0;
                &.van-cell {
                    padding: 3px 15px;
                }
            }
            .search-button {
                padding: 14px 10px;
                height: 0;
                border: none;
            }
        }
    }
    main {
        flex: 1;
        overflow-y: auto;
    }
    .dropMenu {
        position:  relative;
        z-index: 2;
    }
}
</style>
