<template>
    <div>
        <div class="bg-white overflow-hidden margin-bottom-3 padding-bottom-3">
            <!-- v-no-data:[noDataText1]="noData" -->
            <div v-if="partlist.length > 0">
                <div v-show="!noData" class="area-box-1 padding-x-3 padding-y-3 position-relative margin-x-3 margin-bottom-3  margin-top-1 rounded shadow-md" v-for="item in partlist" :key="item.id">
                    <div class="top d-flex align-items-center">
                            <van-image
                                width="45"
                                height="45"
                                :src="item.headimgurl || cardUrl"
                            />
                        <div class="flex-1 margin-left-2 d-flex justify-content-between align-items-center">
                            <div class="">
                                <div class="font-weight-bold text-000 text-size-default card-num">{{item.nickname}}{{ item.realname && `（${item.realname}）` }}</div>
                                <div class="margin-top-1 text-666">{{item.phone}}</div>
                            </div>
                            <div class="text-success text-size-default font-weight-bold">
                                {{item.percent * 100}}%
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-end align-items-center">
                        <van-button type="primary" plain size="mini" class="margin-right-2 padding-x-3" @click="editPartner(item)">编辑</van-button>
                        <van-button type="danger" plain size="mini" class="padding-x-3" @click="deletePartner(item)">删除</van-button>
                    </div>
                </div>
            </div>
            <div v-else v-no-data:[noDataConfig]="partlist.length <= 0"></div>
            <div
                class="add-partner d-flex justify-content-center align-items-center margin-x-3 rounded margin-top-2"
                @click="addPArtner"
                v-if="partlist.length < 4"
            >
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
            <div class="filter-box" :style="{'padding-bottom' : (!partnerModule ? '10px' : '1.6rem')}">
                <div>
                    <hd-title>{{ type === 'add' ? '添加合伙人' : '编辑合伙人' }}</hd-title>
                    <div class="search-form d-flex padding-x-2 align-items-center" v-if="type === 'add'">
                        <span>搜索商户</span>
                        <van-search
                            :placeholder="`请输入要查询的商户电话`"
                            class="search-input rounded-circle flex-1"
                            v-model="keyword"
                        />
                        <van-button plain type="info" class="search-button" @click="handleSearch">搜索</van-button>
                    </div>
                    <!-- 搜索信息提示 -->
                    <div class="padding-x-3" v-hd-msg-tip="searchTip"  v-if="type === 'add'" />
                    <div v-if="partnerModule !== null">
                        <hd-line height="15px" />
                        <!-- <van-divider>搜索结果</van-divider> -->
                        <ul class="padding-x-3 padding-bottom-3 padding-bottom-2 padding-top-2">
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
                                        <van-stepper
                                            v-model="partnerModule.percent"
                                            theme="round"
                                            button-size="22"
                                            :step="10"
                                            :min="0"
                                            :max="100"
                                            class="percent-input d-inline-block"
                                        />
                                        <span class="margin-left-1">%</span>
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="filter-bottom position-absolute d-flex padding-3" v-if="partnerModule !== null">
                <van-button type="default" class="flex-1" @click="reset">重置</van-button>
                <van-button type="primary" class="flex-2 margin-left-2" @click="confirm">确定</van-button>
            </div>
        </van-popup>
        <!-- 添加合伙人 -->
    </div>
</template>

<script>
import { checkAndGetAccount, bindAreaPartner, editBindAreaPartner, removeAreaPartner } from '@/require/area'
export default {
    props: {
        noData: Number,
        partlist: {
            type: Array,
            default: () => []
        }
    },
    data () {
        return {
            cardUrl: require('@/assets/images/home_02.png'),
            aid: '',
            noDataText1: {
                description: '本小区暂无合伙人'
            },
            isShowAddPartner: false,
            partnerModule: null,
            keyword: '',
            searchTip: '',
            type: 'add',
            noDataConfig: {
                description: '暂无合伙人'
            }
        }
    },
    mounted () {
        this.aid = this.$route.params.id
    },
    methods: {
        // 展示添加合伙人弹出层
        addPArtner () {
            this.type = 'add'
            this.partnerModule = null
            this.isShowAddPartner = true
        },
        editPartner (item) {
            this.type = 'edit'
            this.partnerModule = {
                username: item.nickname,
                realname: item.realname,
                phone: item.phone,
                percent: item.percent * 100
            }
            this.isShowAddPartner = true
        },
        deletePartner (item) {
            this.$dialog.confirm({
                title: '提示',
                message: '是否移除当前合伙人？',
                beforeClose: async (action, done) => {
                    if (action === 'confirm') {
                        const { code, message } = await removeAreaPartner({
                            id: item.id
                        })
                        done()
                        if (code === 200) {
                            setTimeout(() => {
                                return this.$dialog.alert({
                                title: '提示',
                                    message: '当前合伙人已成功移除'
                                }).then(() => {
                                    this.$emit('reflesh')
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
        },
        async handleSearch () {
            this.searchTip = ''
            this.partnerModule = null
            const { code, message, userinfo } = await checkAndGetAccount({
                mobile: this.keyword,
                aid: this.aid
            })
            if (code === 200) {
                this.partnerModule = {
                    username: userinfo.username,
                    realname: userinfo.realname,
                    phone: userinfo.phoneNum,
                    percent: 0
                }
            } else {
                this.searchTip = message
            }
        },
        reset () {
            this.partnerModule.percent = 0
        },
        async confirm () {
            if (!this.checkPercent()) {
                return this.$dialog.alert({
                    title: '提示',
                    message: '合伙人分成比总和不能大于100'
                })
            }
            const { phone, percent = 0 } = this.partnerModule
            const { code, message } = await (this.type === 'add' ? bindAreaPartner : editBindAreaPartner)({
                aid: this.aid,
                type: 2, // 1:管理员  2:合伙人
                phone,
                percent,
                id: this.type === 'add' ? undefined : this.partlist.find(item => item.phone === phone).id
            })
            if (code === 200) {
                this.$dialog.alert({
                    title: '提示',
                    message: this.type === 'add' ? '合伙人添加成功' : '合伙人分成修改成功',
                    beforeClose: (action, done) => {
                        this.$emit('reflesh')
                        done()
                    }
                })
            } else {
                this.$toast(message)
            }
            this.isShowAddPartner = false
        },
        // 校验输入的值是否符合规范
        checkPercent () {
            const { percent = 0, phone } = this.partnerModule
            if (this.type === 'add') {
                const result = this.partlist.reduce((acc, item) => {
                    acc += item.percent
                    return acc
                }, 0)
               return percent / 100 + result <= 1
            } else {
                const result = this.partlist.reduce((acc, item) => {
                    if (phone === item.phone) {
                        acc += percent / 100
                    } else {
                        acc += item.percent
                    }
                    return acc
                }, 0)
                return result <= 1
            }
        }
    }
}
</script>
