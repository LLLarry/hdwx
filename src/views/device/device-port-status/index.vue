<template>
    <div class="device-prot-status">
        <header class="padding-3">
            <div class="d-flex align-items-center">
                <h1 class="d-inline-block margin-right-1 text-success"><i class="iconfont icon-diannao text-size-lg"></i> {{code}}</h1>
                <div class="d-inline-block text-333" v-if="result.devicename">（{{ result.devicename }}）</div>
            </div>
            <div class="text-999 margin-top-2" >
                {{ result.hvName || '默认出产设置'  }}
                <span v-if="result.areaname">
                    | {{result.areaname}}
                </span>
            </div>
        </header>
        <hd-line />
        <van-tabs v-model="active">
            <van-tab title="端口状态">
                <div class="padding-x-3 tabContent bg-gray" ref="tabContent" :style="{height: maxHeight+'px'}">
                    <div class="padding-top-3">
                        <div v-no-data="allPortStatusList.length <= 0"></div>
                        <hd-card class="card rounded padding-2 margin-bottom-3 bg-white" v-for="item in allPortStatusList" :key="item.port">
                            <hd-card-item class="w-100 card-title margin-bottom-1 d-flex justify-content-between">
                                <template>
                                    <div>
                                        <span class="device-item-title text-333">端口号：</span>
                                        <span class="device-item-content text-666">{{ item.port.padStart(2, '0') }}</span>
                                    </div>

                                    <div v-if="addr">
                                        <van-tag type="danger" v-if="item.portStatus == 2">使用</van-tag>
                                        <van-tag type="success" v-else-if="item.portStatus == 1">空闲</van-tag>
                                        <van-tag color="#969799" v-else-if="item.portStatus == 3">禁用端口</van-tag>
                                        <van-tag color="#969799" v-else-if="item.portStatus == 4">端口故障</van-tag>
                                         <van-tag type="success" v-else-if="item.portStatus == 5">充满，浮充</van-tag>
                                        <van-tag color="#969799" v-else>— —</van-tag>
                                    </div>
                                    <div v-else>
                                        <van-tag type="danger" v-if="item.portStatus == 2">使用</van-tag>
                                        <van-tag type="success" v-else-if="item.portStatus == 1">空闲</van-tag>
                                        <van-tag color="#969799" v-else>故障</van-tag>
                                    </div>
                                </template>
                            </hd-card-item>
                            <hd-card-item class="">
                                <template>
                                    <span class="device-item-title text-333">充电时间：</span>
                                    <span class="device-item-content text-666">{{ item.time }} 分钟</span>
                                </template>
                            </hd-card-item>
                            <hd-card-item class="">
                                <template>
                                    <span class="device-item-title text-333">充电功率：</span>
                                    <span class="device-item-content text-666">{{ item.power }} W</span>
                                </template>
                            </hd-card-item>
                            <hd-card-item class="">
                                <template>
                                    <span class="device-item-title text-333">充电功率：</span>
                                    <span class="device-item-content text-666">{{ item.elec / 100 }} 度</span>
                                </template>
                            </hd-card-item>
                            <hd-card-item class="" v-if="item.updateTime">
                                <template>
                                    <span class="device-item-title text-333">更新时间：</span>
                                    <span class="device-item-content text-666">{{ item.updateTime | fmtDate }}</span>
                                </template>
                            </hd-card-item>
                            <hd-card-item class="w-100">
                                <template>
                                    <van-button type="primary" class="padding-x-2 float-right" size="mini" @click="handleUpdateStatus(item)">更新</van-button>
                                    <van-button type="danger" class="padding-x-2 float-right margin-right-2" size="mini" @click="handleRemoteClose(item)">断电</van-button>
                                </template>
                            </hd-card-item>
                        </hd-card>
                    </div>
                </div>
            </van-tab>
            <van-tab title="远程充电">
                <div class="padding-x-3 tabContent bg-gray" :style="{height: maxHeight+'px'}">
                    <div class="margin-top-3 border-1 border-ccc rounded">
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
                            <div class="text-center margin-top-2"><van-button type="primary" class="w-50" size="small" @click="handlerRemoteCharge">远程下发充电</van-button></div>
                        </van-cell-group>
                    </div>
                </div>
            </van-tab>
            <!-- <van-tab title="报警状态">
                <div class="padding-x-3 tabContent bg-gray" ref="tabContent" :style="{height: maxHeight+'px'}">
                    <hd-card class="card rounded padding-2 margin-top-3 bg-white">
                        <hd-card-item class="w-100 card-title margin-bottom-1 d-flex justify-content-between">
                            <template>
                                <div>
                                    <span class="device-item-title text-333">当前温度</span>
                                </div>
                                <div>
                                    <van-button
                                        type="primary"
                                        class="padding-x-2 float-right margin-right-2"
                                        size="mini"
                                        @click="handleUpdateDevice(1)"
                                    >更新</van-button>
                                </div>
                            </template>
                        </hd-card-item>
                        <hd-card-item class="" >
                            <template>
                                <span class="device-item-title text-333">温度：</span>
                                <span class="device-item-content text-666">℃</span>
                            </template>
                        </hd-card-item>
                        <hd-card-item class="w-100" >
                            <template>
                                <span class="device-item-title text-333">更新时间：</span>
                                <span class="device-item-content text-666"></span>
                            </template>
                        </hd-card-item>
                    </hd-card>

                    <hd-card class="card rounded padding-2 margin-top-3 bg-white">
                        <hd-card-item class="w-100 card-title margin-bottom-1 d-flex justify-content-between">
                            <template>
                                <div>
                                    <span class="device-item-title text-333">当前烟感</span>
                                </div>
                                <div>
                                    <van-button
                                        type="primary"
                                        class="padding-x-2 float-right margin-right-2"
                                        size="mini"
                                        @click="handleUpdateDevice(2)"
                                    >更新</van-button>
                                </div>
                            </template>
                        </hd-card-item>
                        <hd-card-item class="" >
                            <template>
                                <span class="device-item-title text-333">烟感：</span>
                                <span class="device-item-content text-666"></span>
                            </template>
                        </hd-card-item>
                        <hd-card-item class="w-100" >
                            <template>
                                <span class="device-item-title text-333">更新时间：</span>
                                <span class="device-item-content text-666"></span>
                            </template>
                        </hd-card-item>
                    </hd-card>

                    <hd-card class="card rounded padding-2 margin-top-3 bg-white">
                        <hd-card-item class="w-100 card-title margin-bottom-1 d-flex justify-content-between">
                            <template>
                                <div>
                                    <span class="device-item-title text-333">当前总功率</span>
                                </div>
                                <div>
                                    <van-button
                                        type="primary"
                                        class="padding-x-2 float-right margin-right-2"
                                        size="mini"
                                        @click="handleUpdateDevice(3)"
                                    >更新</van-button>
                                </div>
                            </template>
                        </hd-card-item>
                        <hd-card-item class="" >
                            <template>
                                <span class="device-item-title text-333">总功率：</span>
                                <span class="device-item-content text-666">W</span>
                            </template>
                        </hd-card-item>
                        <hd-card-item class="w-100" >
                            <template>
                                <span class="device-item-title text-333">更新时间：</span>
                                <span class="device-item-content text-666"></span>
                            </template>
                        </hd-card-item>
                    </hd-card>
                </div>
            </van-tab> -->
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
import { getDeviceVersionName, getInfoByHdVersion } from '@/utils/util'
import { inquireDeviceStatus, querystate, queryPortStatus, stopRechargeByPort, stopCharge, testpaytoport, startCharge, getDeviceNowArgument } from '@/require/device'
export default {
    components: {
        hdCard,
        hdCardItem
    },
    data () {
        return {
            code: this.$route.params.code, // 设备号
            addr: this.$route.query.addr, // 从机地址
            active: '端口状态',
            maxHeight: 500,
            remoteModel: {
                port: 1,
                time: 240,
                elec: 1
            },
            showPicker: false,
            columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            allPortStatusList: [],
            result: {}
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
    mounted () {
        this.init()
    },
    methods: {
        async init () {
            try {
                const { code, message, allPortStatusList, ...result } = await inquireDeviceStatus({ code: this.code, addr: this.addr })
                if (code === 200) {
                    this.allPortStatusList = allPortStatusList
                    this.result = {
                        ...result,
                        hvName: getDeviceVersionName(result.deviceversion)
                    }
                    this.columns = new Array(getInfoByHdVersion(result.deviceversion).portNum).fill(1).map((item, index) => (index + 1))
                } else {
                    this.$toast(message)
                }
            } catch (error) {
                this.$toast('异常错误')
            }
        },
        // 更新端口状态 querystate, queryPortStatus
        handleUpdateStatus (item) {
            const index = this.allPortStatusList.findIndex(one => one.port === item.port)
            if (this.addr) { // 从机
                queryPortStatus({ code: this.code, port: item.port, addr: this.addr }).then(res => {
                    if (res.wolfcode === '1000' || res.returncode === 200) {
                        this.allPortStatusList.splice(index, 1, res.result)
                    } else {
                        this.$toast(res.message || res.wolfmsg)
                    }
                })
            } else { // 设备
                querystate({ code: this.code, port: item.port }).then(res => {
                    if (res.code === 200) {
                        this.allPortStatusList.splice(index, 1, { port: item.port, ...res.data })
                    } else {
                        this.$toast(res.message)
                    }
                })
            }
        },
        // 远程充电
        handlerRemoteCharge () {
            const { port, time, elec } = this.remoteModel
            if (this.addr) { // 从机
                startCharge({
                    code: this.code,
                    addr: this.addr,
                    port,
                    time,
                    elec,
                    money: 1
                })
                .then(res => {
                    if (res.wolfcode === '1000' || res.returncode === 200) {
                        this.$dialog.alert({
                            title: '提示',
                            message: `${port}号端口，远程充电成功`
                        })
                        .then(() => {
                            this.handleUpdateStatus({ port })
                        })
                    } else {
                        this.$toast(res.message || res.wolfmsg)
                    }
                })
                .catch(() => {
                    this.$toast('异常错误')
                })
            } else { // 设备
                testpaytoport({
                    code: this.code,
                    payport: port,
                    time,
                    elec
                })
                .then(res => {
                    if (res.wolfcode === '1000' || res.returncode === 200) {
                        this.$dialog.alert({
                            title: '提示',
                            message: `${port}号端口，远程充电成功`
                        })
                        .then(() => {
                            this.handleUpdateStatus({ port })
                        })
                    } else {
                        this.$toast(res.message || res.wolfmsg)
                    }
                })
                .catch(() => {
                    this.$toast('异常错误')
                })
            }
        },
        // 远程断电
        handleRemoteClose (item) {
            this.$dialog.confirm({
                title: '提示',
                message: '确认远程断电吗？'
            })
            .then(() => {
                if (this.addr) { // 从机远程断电
                    stopCharge({
                        code: this.code,
                        addr: this.addr,
                        port: item.port
                    })
                    .then(res => {
                        if (res.wolfcode === '1000' || res.returncode === 200) {
                            this.$toast(`${item.port}号端口，断电成功！`)
                            setTimeout(() => {
                                this.handleUpdateStatus(item) // 更新端口状态
                            }, 2000)
                        } else {
                            this.$toast(res.message || res.wolfmsg)
                        }
                    })
                    .catch(() => {
                        this.$toast('异常错误')
                    })
                } else { // 设备远程断电
                    stopRechargeByPort({
                        code: this.code,
                        port: item.port
                    })
                    .then(res => {
                        if (res.wolfcode === '1000' || res.returncode === 200) {
                            this.$toast(`${item.port}号端口，断电成功！`)
                            setTimeout(() => {
                                this.handleUpdateStatus(item) // 更新端口状态
                            }, 2000)
                        } else {
                            this.$toast(res.message || res.wolfmsg)
                        }
                    })
                    .catch(() => {
                        this.$toast('异常错误')
                    })
                }
            })
        },
        // 更新 温度1 烟感2 总功率3
        handleUpdateDevice (type) {
            getDeviceNowArgument({
                code: this.code,
                type
            })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        },
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
