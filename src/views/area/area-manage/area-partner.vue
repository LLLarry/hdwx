<template>
    <div>
        <div class="bg-white overflow-hidden margin-bottom-3 padding-bottom-3">
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
    </div>
</template>

<script>
export default {
    props: {
        noData: Number
    },
    data () {
        return {
            cardUrl: require('@/assets/images/home_02.png'),
            noDataText1: {
                description: '本小区暂无合伙人'
            },
            isShowAddPartner: false,
            partnerModule: null
        }
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
        }
    }
}
</script>
