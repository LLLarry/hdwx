<template>
    <div class="device-prot-status">
        <header class="padding-3">
            <div class="d-flex align-items-center">
                <h1 class="d-inline-block margin-right-1 text-success"><i class="iconfont icon-diannao text-size-lg"></i> 001865</h1>
                <div class="d-inline-block text-333">（21社区1号院01）</div>
            </div>
            <div class="text-999 margin-top-2" >v3智慧款版本 | 回忆小区</div>
        </header>
        <hd-line />
        <van-tabs v-model="active">
            <van-tab title="端口状态">
                <div class="padding-x-3 tabContent bg-gray" ref="tabContent" :style="{height: maxHeight+'px'}">
                    <div class="padding-top-3">
                        <hd-card class="card rounded padding-2 margin-bottom-3 bg-white" v-for="item in 5" :key="item">
                            <hd-card-item class="w-100 card-title margin-bottom-1 d-flex justify-content-between">
                                <template>
                                    <div>
                                        <span class="device-item-title text-333">端口号：</span>
                                        <span class="device-item-content text-666">01</span>
                                    </div>
                                    <!--
                                    <van-tag type="danger">使用</van-tag>
                                    <van-tag type="success">空闲</van-tag>
                                    -->
                                    <van-tag color="#969799">故障</van-tag>
                                </template>
                            </hd-card-item>
                            <hd-card-item class="">
                                <template>
                                    <span class="device-item-title text-333">充电时间：</span>
                                    <span class="device-item-content text-666">0 分钟</span>
                                </template>
                            </hd-card-item>
                            <hd-card-item class="">
                                <template>
                                    <span class="device-item-title text-333">充电功率：</span>
                                    <span class="device-item-content text-666">0 W</span>
                                </template>
                            </hd-card-item>
                            <hd-card-item class="">
                                <template>
                                    <span class="device-item-title text-333">充电功率：</span>
                                    <span class="device-item-content text-666">0 度</span>
                                </template>
                            </hd-card-item>
                            <hd-card-item class="w-100">
                                <template>
                                    <van-button type="primary" class="padding-x-2 float-right" round size="mini">更新</van-button>
                                    <van-button type="danger" class="padding-x-2 float-right margin-right-2" round size="mini">断电</van-button>
                                </template>
                            </hd-card-item>
                        </hd-card>
                    </div>
                </div>
            </van-tab>
            <van-tab title="远程充电">
                <div class="padding-x-3 tabContent bg-gray" :style="{height: maxHeight+'px'}">
                    <div class="margin-top-3">
                        <van-cell-group class="padding-3">
                            <van-field
                                v-model="remoteModel.port"
                                label="选择端口"
                                placeholder="选择端口"
                                readonly
                                right-icon="arrow"
                                @click="showPicker=true"
                            ></van-field>
                            <van-field v-model="remoteModel.time" label="充电时间" placeholder="充电时间">
                                <template #extra>
                                    分钟
                                </template>
                            </van-field>
                            <van-field v-model="remoteModel.elec" label="充电电量" placeholder="充电电量">
                                <template #extra>
                                    度
                                </template>
                            </van-field>
                            <div class="text-center margin-top-2"><van-button type="primary" class="w-50" size="small">远程下发充电</van-button></div>
                        </van-cell-group>
                    </div>
                </div>
            </van-tab>
            <van-tab title="报警状态">内容 3</van-tab>
        </van-tabs>

        <van-popup v-model="showPicker" round position="bottom">
            <van-picker
                title="选择远程充电的端口"
                show-toolbar
                :columns="columns"
                @confirm="onConfirm"
                @cancel="showPicker=false"
            />
        </van-popup>
    </div>
</template>

<script>
import hdCard from '@/components/hd-card'
import hdCardItem from '@/components/hd-card-item'
import { mapState } from 'vuex'
export default {
    components: {
        hdCard,
        hdCardItem
    },
    data () {
        return {
            active: '端口状态',
            maxHeight: 500,
            remoteModel: {
                port: 1,
                time: 240,
                elec: 1
            },
            showPicker: false,
            columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }
    },
    computed: {
        ...mapState(['global'])
    },
    watch: {
        // 监听高度的变化
        'global.clientHeight': {
            handler (value) {
                this.getMaxHeight()
            },
            immediate: true
        }
    },
    methods: {
        getMaxHeight () {
            this.$nextTick(() => {
                const top = this.$refs.tabContent.getBoundingClientRect().top
                this.maxHeight = this.global.clientHeight - top
            })
        },
        onConfirm (port) {
            this.remoteModel.port = port
            this.showPicker = false
        }
    }
}
</script>
<style lang="scss" scoped>
.device-prot-status {
    h1 {
        font-size: 19px;
    }
    .card {
        border: 1px solid #ccc;
        .card-title {
            border-bottom:1px dotted #ccc;
        }
    }
    .tabContent {
        overflow: auto;
    }
}
</style>
