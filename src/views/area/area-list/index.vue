<template>
    <div class="area-list position-relative d-flex flex-column">
        <div class="section shadow padding-bottom-2">
            <van-tabs v-model="active" class="area-tab font-weight-bold">
                <van-tab :title="`小区 ${source[0].totalcount}`"></van-tab>
                <van-tab :title="`合伙小区 ${source[1].totalcount}`"></van-tab>
            </van-tabs>
            <div class="search-form d-flex padding-x-2 margin-top-2 align-items-center" >
                <span>小区名称</span>
                <van-search
                    v-model="parameter"
                    :placeholder="`请输入小区名称`"
                    class="search-input rounded-circle"
                />
                <!-- <van-field v-model="parameter" placeholder="请输入搜索条件" class="search-input bg-gray" /> -->
                <van-button plain type="info" class="search-button" @click="handleSearch">搜索</van-button>
            </div>
        </div>

        <main class="bg-gray">
            <van-tabs v-model="active" class="area-content" animated>
                <van-tab>
                    <hd-scroll
                        @pullingUpFn = "pullingUpFn"
                        @getScroll="getScroll"
                        :index="0"
                    >
                        <div class="padding-top-3">
                            <area-item v-for="item in source[0].list" :key="item.code" :value="item" class="margin-bottom-3"/>
                            <div
                                class="text-center padding-bottom-3 padding-top-3 text-666"
                                :class="{removePaddingTop: source[0].list.length !== 0}"
                            >{{ source[0].status === 2 ? '暂无更多数据' : '正在加载更多' }}</div>
                             <div style="height: 30px;"></div>
                        </div>
                    </hd-scroll>
                </van-tab>
                <van-tab>
                    <hd-scroll
                        @pullingUpFn = "pullingUpFn"
                        @getScroll="getScroll"
                        :index="1"
                    >
                        <div class="padding-top-3">
                            <area-item v-for="item in source[1].list" :key="item.code" :value="item" class="margin-bottom-3"/>
                            <div
                                class="text-center padding-bottom-3 padding-top-3 text-666"
                                :class="{removePaddingTop: source[1].list.length !== 0}"
                            >{{ source[1].status === 2 ? '暂无更多数据' : '正在加载更多' }}</div>
                            <div style="height: 30px;"></div>
                        </div>
                    </hd-scroll>
                </van-tab>
            </van-tabs>
        </main>
        <div class="padding-1 text-center shadow">
            <van-button type="primary" size="small"  class="bottom-btn" @click="addAreaIsShow=true">添加小区</van-button>
        </div>

        <!-- 新增小区 -->
        <add-area
            :addAreaIsShow="addAreaIsShow"
            @confirm="addAreaConfirm"
        />
    </div>
</template>
<script>
import hdScroll from '@/components/hd-scroll'
import areaItem from '@/components/area/area-item'
import addArea from '@/components/area/add-area'
import { inquireAreaInfor, insertAreaData } from '@/require/area'
const LIMIT = 4
export default {
    data () {
        return {
            active: 0,
            parameter: '', // 搜索条件
            searchForm: {},
            source: [
                {
                    totalcount: 0,
                    list: [],
                    status: 1, // 0 正在加载中 1 空闲状态 2 更多数据
                    currentPage: 1, // 当前页数
                    scroll: null, // 滚动实例
                    leaveScrollY: 0 // 离开时滚动的距离
                },
                {
                    totalcount: 0,
                    list: [],
                    status: 1, //  0 正在加载中 1 空闲状态 2 更多数据
                    currentPage: 1, // 当前页数
                    scroll: null, // 滚动实例
                    leaveScrollY: 0 // 离开时滚动的距离
                }
            ],
            addAreaIsShow: false
        }
    },
    mounted () {
        this.asyGetDeviceList(0, true)
        this.asyGetDeviceList(1, true)
    },
    components: {
        hdScroll,
        areaItem,
        addArea
    },
    watch: {
        // 监听路由的变化，当前路由调回来的时候将存储的位置信息重新赋值回来
        $route: {
            handler (value) {
                if (this.source[0].scroll) {
                    this.source[0].scroll.refresh()
                    this.source[0].scroll.scrollTo(0, this.source[0].leaveScrollY, 0, undefined, {})
                }
                if (this.source[1].scroll) {
                    this.source[1].scroll.refresh()
                    this.source[1].scroll.scrollTo(0, this.source[1].leaveScrollY, 0, undefined, {})
                }
            }
        }
    },
    // 在页面跳出之前存储当前滚动实例滚动的位置
    beforeRouteLeave (to, from, next) {
        if (this.source[0].scroll) {
            this.source[0].leaveScrollY = this.source[0].scroll.y
        }
        if (this.source[1].scroll) {
            this.source[1].leaveScrollY = this.source[1].scroll.y
        }
        next()
    },
    methods: {
        async pullingUpFn ({ scroll, index }) {
            if (this.source[index].status !== 2) {
                await this.asyGetDeviceList(index)
                this.$nextTick(() => {
                    scroll.finishPullUp()
                })
            }
        },
        /* 异步请求设备list */
        async asyGetDeviceList (index, init = false) {
            try {
                if (!init) {
                    if ([0, 2].includes(this.source[index].status)) return false
                    this.source[index].currentPage++
                } else {
                    this.source[index].currentPage = 1
                }
                this.$set(this.source[index], 'status', 0)
                const { code, resultlist: area, totalcount, message } = await inquireAreaInfor({
                    areaType: index + 1,
                    limit: LIMIT,
                    currentPage: this.source[index].currentPage,
                    ...this.searchForm
                }, '正在加载数据')
                if (code === 200) {
                    // 如果是初始化，需要将list置空之后再进行赋值
                    let list = []
                    if (init) {
                        list = area
                        this.source[index].totalcount = totalcount
                    } else {
                        list = [...this.source[index].list, ...area]
                    }
                    this.$set(this.source[index], 'list', list)
                    if (area.length < LIMIT) {
                        this.$set(this.source[index], 'status', 2) // 将状态置为无数据
                    } else {
                        this.$set(this.source[index], 'status', 1) // 将状态置为空闲
                    }
                } else {
                    this.$toast(message)
                    this.$set(this.source[index], 'status', 1) // 将状态置为空闲
                }
            } catch (e) {
                this.$toast('异常错误')
            } finally {
                const scroll = this.source[index].scroll
                if (scroll) {
                    this.$nextTick(() => {
                        if (init) {
                            scroll.refresh()
                            scroll.finishPullUp()
                            scroll.scrollTo(0, 0, 0, undefined, {})
                        } else {
                            scroll.finishPullUp()
                        }
                    })
                }
            }
        },
        // 点击搜索按钮
       handleSearch () {
           this.searchForm = {
               name: this.parameter
           }
            this.asyGetDeviceList(0, true)
            this.asyGetDeviceList(1, true)
        },
        // 保存 scroll 实例
        getScroll ({ scroll, index }) {
            this.source[index].scroll = scroll
        },
        // 获取新增小区信息
        async addAreaConfirm ({ name, address: street, selectAreaObj }) {
            try {
                const { city, county, province } = selectAreaObj
                const { code, message } = await insertAreaData({
                    name, // 小区名字
                    province: province.code, // 省份编码
                    city: city.code, // 市编码
                    county: county.code, // 县编码
                    street, // 街道地址
                    usage: 2 // 默认 2  区分来源于手机端还是电脑端 1:电脑端  2:手机端
                })
                if (code === 200) {
                    this.$toast('小区添加成功')
                    this.asyGetDeviceList(0, true)
                    this.asyGetDeviceList(1, true)
                } else {
                    this.$toast(message)
                }
            } catch (e) {
                this.$toast('异常错误')
            }
            this.addAreaIsShow = false
        }
    }
}
</script>

<style lang="scss">
.area-list {
    height: 100vh;
    .section {
        position:  relative;
        z-index: 1;
        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            box-shadow: 1rem 1rem 1rem rgba(255, 255, 0, 1);
        }
        .van-tabs__nav {
            background: transparent;
            .van-tab {
                font-size: 14px;
                &.van-tab--active  {
                    font-weight: bold;
                    color: #07c160;
                }
            }
            .van-tabs__line {
                background-color: #07c160;
            }
        }
        .search-form {
            .van-field__body {
                height: 100%;
                input {
                    height: 100%;
                }
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
        .area-content {
            height: 100%;
            .van-tabs__wrap {
                display: none;
            }
            .van-tabs__content {
                height: 100%;
                .van-tab__pane-wrapper {
                    height: 100%;
                    .van-tab__pane {
                        height: 100%;
                        // .area-item {
                        //     &:first-child {
                        //         margin-top: 15px;
                        //     }
                        // }
                    }
                }
                .removePaddingTop {
                    padding-top: 0 !important;
                    padding-bottom: 15px;
                }
            }
        }
    }
    .bottom-btn {
        width: 80%;
    }
}
</style>
