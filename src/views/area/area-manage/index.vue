<template>
    <div class="area-manage position-relative d-flex flex-column bg-white">
        <van-nav-bar
            title="回忆小区"
            left-text="返回"
            left-arrow
            class="header-fixed"
        />
        <main>
            <hd-line height="1.6rem"/>
            <hd-title exec>小区合伙人</hd-title>
            <div class="bg-white overflow-hidden margin-bottom-3">
                <!-- v-no-data:[noDataText1]="noData" -->
                <div>
                    <div v-show="!noData" class="area-box-1 padding-x-3 padding-y-3 position-relative margin-x-3 margin-bottom-3  margin-top-1 rounded shadow-md" v-for="item in 3" :key="item">
                        <div class="top d-flex align-items-center">
                                <van-image
                                    width="45"
                                    height="45"
                                    :src="cardUrl"
                                />
                            <div class="flex-1 margin-left-2 d-flex justify-content-between align-items-center">
                                <div class="">
                                    <div class="font-weight-bold text-000 text-size-default card-num">测试昵称（张明）</div>
                                    <div class="margin-top-1 text-666">15665654564</div>
                                </div>
                                <div class="text-success text-size-default font-weight-bold">
                                    20%
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-end align-items-center">
                            <van-button type="primary" plain size="mini" class="margin-right-2 padding-x-3" @click="editPartner">编辑</van-button>
                            <van-button type="danger" plain size="mini" class="padding-x-3">删除</van-button>
                        </div>
                    </div>
                </div>
                <div class="add-partner d-flex justify-content-center align-items-center margin-x-3 rounded margin-top-2" @click="addPArtner">
                    添加合伙人
                </div>
            </div>
            <hd-line height="30px" />
            <hd-title exec>小区设备</hd-title>

            <div class="padding-bottom-3">
                <hd-card class="area-box-2 padding-x-3 padding-y-3 position-relative margin-x-3 margin-bottom-3  margin-top-1 rounded shadow-md"  v-for="item in 3" :key="item">
                    <div class="d-flex justify-content-between align-items-center w-100">
                        <div class="">
                            <div class="font-weight-bold text-000 text-size-default card-num">009632（天悦城03）</div>
                            <div class="margin-top-1 text-666">V3版本十路智慧款</div>
                        </div>
                        <!--
                        <div class="text-success text-size-default font-weight-bold">
                            在线
                        </div>
                        -->
                        <div class="text-danger text-size-default font-weight-bold">
                            离线
                        </div>
                    </div>
                    <div class="d-flex justify-content-end align-items-center w-100 margin-top-2">
                        <van-button type="primary" plain size="mini" class="margin-right-2 padding-x-3">管理</van-button>
                        <van-button type="danger" plain size="mini" class="padding-x-3">解绑</van-button>
                    </div>
                </hd-card>
                <div
                    class="add-partner d-flex justify-content-center align-items-center margin-x-3 rounded margin-top-2"
                    @click="isShowAddDevice = true"
                >
                    添加设备
                </div>
            </div>

            <!-- 钱包充值模板 -->
            <div class="bg-white">
                <hd-line height="30px" />
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

            <!-- 在线卡充值模板 -->
            <div class="bg-white">
                <hd-line height="30px" />
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

            <div class="bg-white">
                <hd-line height="30px" />
                <hd-title exec>删除小区</hd-title>
                <div class="padding-x-3 padding-bottom-4">
                    <van-button type="danger" class="w-100">删除小区</van-button>
                </div>
            </div>
        </main>
        <!-- <footer class="shadow"></footer> -->

        <!-- 添加合伙人 -->
        <van-popup
            v-model="isShowAddPartner"
            :close-on-click-overlay="false"
            position="top"
            :style="{ width: '100%', maxHeight: '70%'  }"
            @click-overlay="isShowAddPartner = !isShowAddPartner"
        >
            <div class="filter-box">
                <div>
                    <hd-title>添加合伙人</hd-title>
                    <div class="search-form d-flex padding-x-2 align-items-center">
                        <span>搜索商户</span>
                        <van-search
                            :placeholder="`请输入要查询的商户电话`"
                            class="search-input rounded-circle flex-1"
                        />
                        <!-- @click="handleSearch" -->
                        <van-button plain type="info" class="search-button">搜索</van-button>
                    </div>
                    <div v-if="partnerModule !== null">
                        <hd-line height="15px" />
                        <!-- <van-divider>搜索结果</van-divider> -->
                        <ul class="padding-x-3 padding-bottom-3 padding-bottom-2">
                            <li class="padding-y-1 margin-bottom-1">
                                <div class="d-flex">
                                    <span class="flex-1"><i class="iconfont icon-user-fill margin-right-2 text-success "></i>商户昵称：</span>
                                    <span class="flex-2 text-666">{{partnerModule.username}}</span>
                                </div>
                            </li>
                            <li class="padding-y-1 margin-bottom-1">
                                <div class="d-flex">
                                    <span class="flex-1"><i class="iconfont icon-mingpian margin-right-2 text-success"></i>商户姓名：</span>
                                    <span class="flex-2 text-666">{{partnerModule.realname}}</span>
                                </div>
                            </li>
                            <li class="padding-y-1 margin-bottom-1">
                                <div class="d-flex">
                                    <span class="flex-1"><i class="iconfont icon-dianhua margin-right-2 text-success"></i>商户电话:</span>
                                    <span class="flex-2 text-666">{{partnerModule.phone}}</span>
                                </div>
                            </li>
                            <li class="padding-y-1">
                                <div class="d-flex">
                                    <span class="flex-1"><i class="iconfont icon-bili margin-right-2 text-success"></i>分成百分比:</span>
                                    <span class="flex-2 d-flex align-items-center">
                                        <van-stepper  v-model="partnerModule.percent" theme="round" button-size="22" class="percent-input d-inline-block" />
                                        <span class="margin-left-1">%</span>
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="filter-bottom position-absolute d-flex padding-3">
                <van-button type="default" class="flex-1">重置</van-button>
                <van-button type="primary" class="flex-2 margin-left-2" >确定</van-button>
            </div>
        </van-popup>
        <!-- 添加合伙人 -->
        <hd-select
            :list="list"
            @confirm="addDeviceConfirm"
            @cancel="isShowAddDevice = false"
            :isShow="isShowAddDevice"
            radio
        >
            <template #title>
                <div class="flex-1 text-center">设备号</div>
                <div class="flex-1 text-center">设备名</div>
            </template>
            <template v-slot="{row}">
                <div class="flex-1 text-center">设备号{{row.id}}</div>
                <div class="flex-1 text-center">设备名{{row.id}}</div>
            </template>
        </hd-select>
    </div>
</template>
<script>
import hdCard from '@/components/hd-card'
import hdSelect from '@/components/hd-select'
export default {
    data () {
        return {
            cardUrl: require('@/assets/images/home_02.png'),
            noData: 0, // 0 正常 1 loading 2 noData
            noDataText1: {
                description: '本小区暂无合伙人'
            },
            noDataText2: {
                description: '本小区暂无绑定的设备'
            },
            isShowAddPartner: false,
            partnerModule: null,
            isShowAddDevice: false,
            list: []
        }
    },
    mounted () {
        for (let i = 0; i < 20; i++) {
            this.list.push({ id: i, name: ('a' + i), selected: i === 10 })
        }
    },
    components: {
        hdCard,
        hdSelect
    },
    methods: {
        // 展示添加合伙人弹出层
        addPArtner () {
            this.partnerModule = null
            this.isShowAddPartner = true
        },
        editPartner () {
            this.partnerModule = {
                username: '测试昵称',
                realname: '测试姓名',
                phone: '15693245648',
                percent: 20
            }
            this.isShowAddPartner = true
        },
        // yonghu
        addDeviceConfirm (result) {
            this.isShowAddDevice = false
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
