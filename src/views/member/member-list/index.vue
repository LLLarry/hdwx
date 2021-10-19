<template>
    <div class="member-list position-relative d-flex flex-column">
        <div class="section shadow padding-bottom-2" >
            <div class="search-form d-flex padding-x-2 margin-top-2 align-items-center">
                <van-dropdown-menu class="select-menu">
                    <van-dropdown-item get-container=".dropMenu" v-model="type" :options="option1" />
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
                    <van-dropdown-item  get-container=".dropMenu" v-model="value2" :options="option2"  @change="asyAjaxMemberCentre(true)" />
                    <van-dropdown-item  get-container=".dropMenu" v-model="value3" :options="option3"  @change="asyAjaxMemberCentre(true)" />
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
            <!-- :key="`${member.uid}-${member.aid}-${member.walletid}`" -->
                <div class="padding-top-3">
                    <member-list-card
                        v-for="(member, index) in list"
                        :key="(currentPage - 1) * 10 + index"
                        :value="member"
                        @changeArea="changeArea"
                    />
                    <div
                        class="text-center padding-bottom-3 text-666"
                    >{{ status === 2 ? '暂无更多数据' : '正在加载更多' }}</div>
                </div>
            </hd-scroll>
        </main>

        <van-action-sheet
            v-model="actionIsShow"
            :actions="actions"
            cancel-text="取消"
            :description="descMessage"
            close-on-click-action
            @select="handldConfirmChnageArea"
        />
        <!-- 下拉菜单挂载的节点 -->
        <div class="dropMenu" />
    </div>
</template>
<script>
import hdScroll from '@/components/hd-scroll'
import memberListCard from '@/components/member/member-list-card'
import { getMemberInfo, changeMemberAreaInfo } from '@/require/member'
import { getType } from '@/utils/util'
const REQUIRE_LENGTH = 35 // 请求返回值数量
export default {
    data () {
        return {
            keywords: '', // 搜索条件
            type: 1, // 搜索类型 和 option1 对应
            option1: [
                { text: '会员号', value: 1 },
                { text: '会员昵称', value: 2 },
                { text: '会员手机', value: 3 }
            ],
            value2: '',
            option2: [{ text: '所有小区', value: '' }],
            value3: 0,
            option3: [
                { text: '默认排序', value: 0 },
                { text: '金额从大到小', value: 1 },
                { text: '金额从小到大', value: 2 }
            ],
            actionIsShow: false,
            actionRow: {}, // 更改小区用户信息
            actions: [],
            // dropMenuStatus: 2, // 下拉菜单状态， 1 展开 2关闭
            status: 1, //  0 正在加载中 1 空闲状态 2 更多数据
            scroll: null, // 滚动实例
            list: [], // 列表数据
            currentPage: 1, // 当前页
            datasize: 0, // 在线卡数量
            datatopupmoney: 0, // 在线卡充值金额
            datasendmoney: 0 // 在线卡赠送金额
        }
    },
    mounted () {
        this.asyAjaxMemberCentre(true)
    },
    computed: {
        descMessage () {
            if (this.actionIsShow) {
                const nick = this.actionRow.nick ? this.actionRow.nick : ''
                return `更改${nick}（${this.actionRow.uid.toString().padStart(8, 0)}）用户的归属小区`
            }
            return ''
        }
    },
    components: {
        hdScroll,
        memberListCard
    },
    watch: {
        $route: {
            handler (newRoute, oldRoute) {
                if (oldRoute.name === 'member-list-manage') {
                    this.asyAjaxMemberCentre(true)
                }
                // 页面回退时刷新滚动实例
                this.scroll && this.scroll.refresh()
            }
        }
    },
    methods: {
        // 点击搜索按钮
        handleSearch () {
           this.asyAjaxMemberCentre(true)
        },
        // 保存 scroll 实例
        getScroll ({ scroll, index }) {
            this.scroll = scroll
        },
        pullingUpFn ({ scroll }) {
            if (this.status !== 2) {
                this.asyAjaxMemberCentre()
            }
        },
        /* 异步请求card list */
        async asyAjaxMemberCentre (init = false) {
            try {
                if (!init) { // 非初始化状态
                    if ([0, 2].includes(this.status)) return false // 正在加载中、无数据 取消请求
                    this.currentPage++
                } else {
                    this.currentPage = 1
                }
                this.status = 0
                const { memberdata, datasize, datatopupmoney, datasendmoney, areaData } = await getMemberInfo({
                    type: this.type,
                    keywords: this.keywords,
                    areaId: this.value2,
                    currentPage: this.currentPage,
                    ranktype: this.value3,
                    limit: REQUIRE_LENGTH
                }, '正在加载数据')
                // 如果是初始化，需要将list置空之后再进行赋值
                if (init) {
                    this.list = memberdata
                    this.datasize = datasize // 在线卡数量
                    this.datatopupmoney = datatopupmoney // 在线卡充值金额
                    this.datasendmoney = datasendmoney // 在线卡赠送金额
                    this.option2 = [{ text: '所有小区', value: '' }, ...areaData.map(({ name, id }) => ({ text: name, value: id }))]
                    this.actions = [{ name: '不绑定小区', id: 0 }, ...areaData.map(({ name, id }) => ({ name, id }))]
                } else {
                    this.list = [...this.list, ...memberdata]
                }
                if (memberdata.length < REQUIRE_LENGTH) {
                    this.status = 2 // 将状态置为无数据
                } else {
                    this.status = 1 // 将状态置为空闲
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
        // 为指定用户更换小区
        changeArea (member) {
            this.actions.forEach(item => {
                if (item.subname || item.color) {
                    delete item.subname
                    delete item.color
                }
            })
            const area = this.actions.find(item => member.aid === item.id)
            if (getType(area) === 'object') {
                area.subname = '当前归属小区'
                area.color = '#1989fa'
            }
            this.actionRow = member
            this.actionIsShow = true
        },
        // 修改小区时选择的小区 id 小区id name小区名称 subname描述信息，为undefined表示没有描述信息
        async handldConfirmChnageArea ({ id, name, subname }) {
            if (getType(subname) === 'undefined') {
                try {
                    // 发送请求
                    const { code, message } = await changeMemberAreaInfo({
                        id: this.actionRow.uid,
                        aid: id,
                        walletid: this.actionRow.walletid
                    })
                    if (code === 200) {
                        // 查询到会员信息
                        const member = this.list.find(item => (item.uid === this.actionRow.uid && item.aid === this.actionRow.aid))
                        if (getType(member) === 'object') {
                            this.$set(member, 'aid', id)
                            if (id !== 0) {
                                // 小区id不为0，修改小区名称
                                this.$set(member, 'areaname', name)
                            } else {
                                // 小区id为0，修改小区名称为空
                                this.$set(member, 'areaname', '')
                            }
                        }
                        this.$toast('修改成功')
                    } else {
                        this.$toast(message)
                    }
                } catch (e) {
                    this.$toast('异常错误')
                }
            }
        }
    }
}
</script>

<style lang="scss">
.member-list {
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
