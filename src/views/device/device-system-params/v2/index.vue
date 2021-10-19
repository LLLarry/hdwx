<template>
    <div class="v2-system bg-gray">
        <hd-title exec>功能开关</hd-title>
        <van-cell-group>
            <van-cell title="是否余额回收">
                <template>
                    <van-switch v-model="model.spRecMon" size="24px" active-color="rgb(7, 193, 96)" />
                </template>
            </van-cell>
            <van-cell title="是否断电自停">
                <template>
                    <van-switch v-model="model.spFullEmpty" size="24px" active-color="rgb(7, 193, 96)" />
                </template>
            </van-cell>
        </van-cell-group>

        <hd-title exec>参数配置</hd-title>
        <van-collapse v-model="activeNames" accordion>
            <van-collapse-item title="刷卡投币规则" name="1">
                <van-cell-group class="bg-gray border-1 border-ddd">
                    <van-cell title="投币充电时间" class="bg-transparent">
                        <template>
                            <van-field  class="d-inline-flex w-75 coll-input bg-transparent border-1 border-ddd" v-model="model.coinMin">
                                <template #right-icon>
                                    <span class="margin-left-1">分钟</span>
                                </template>
                            </van-field>
                        </template>
                    </van-cell>
                    <van-cell title="刷卡充电时间" class="bg-transparent">
                        <template>
                            <van-field  class="d-inline-flex w-75 coll-input bg-transparent border-1 border-ddd" v-model="model.cardMin">
                                <template #right-icon>
                                    <span class="margin-left-1">分钟</span>
                                </template>
                            </van-field>
                        </template>
                    </van-cell>
                    <van-cell title="单次投币最大使用电量" class="bg-transparent">
                        <template>
                            <van-field  class="d-inline-flex w-75 coll-input bg-transparent border-1 border-ddd" v-model="model.coinElec">
                              <template #right-icon>
                                    <span class="margin-left-1">度</span>
                                </template>
                            </van-field>
                        </template>
                    </van-cell>
                    <van-cell title="单次刷卡最大用电量" class="bg-transparent">
                        <template>
                            <van-field  class="d-inline-flex w-75 coll-input bg-transparent border-1 border-ddd" v-model="model.cardElec">
                             <template #right-icon>
                                    <span class="margin-left-1">度</span>
                                </template>
                            </van-field>
                        </template>
                    </van-cell>
                    <van-cell title="刷卡扣费金额" class="bg-transparent">
                        <template>
                            <van-field  class="d-inline-flex w-75 coll-input bg-transparent border-1 border-ddd" v-model="model.cst">
                             <template #right-icon>
                                    <span class="margin-left-1">元</span>
                                </template>
                            </van-field>
                        </template>
                    </van-cell>
                </van-cell-group>
            </van-collapse-item>
            <van-collapse-item title="功率档位匹配" name="2">
                <van-cell-group class="bg-gray border-1 border-ddd">
                    <van-cell title="一档最大充电功率" class="bg-transparent">
                        <template>
                            <van-field  class="d-inline-flex w-75 coll-input bg-transparent border-1 border-ddd" v-model="model.powerMax1">
                                <template #right-icon>
                                    <span class="margin-left-1">瓦</span>
                                </template>
                            </van-field>
                        </template>
                    </van-cell>
                    <van-cell title="二档最大充电功率" class="bg-transparent">
                        <template>
                            <van-field  class="d-inline-flex w-75 coll-input bg-transparent border-1 border-ddd" v-model="model.powerMax2">
                                <template #right-icon>
                                    <span class="margin-left-1">瓦</span>
                                </template>
                            </van-field>
                        </template>
                    </van-cell>
                    <van-cell title="三档最大充电功率" class="bg-transparent">
                        <template>
                            <van-field  class="d-inline-flex w-75 coll-input bg-transparent border-1 border-ddd" v-model="model.powerMax3">
                                <template #right-icon>
                                    <span class="margin-left-1">瓦</span>
                                </template>
                            </van-field>
                        </template>
                    </van-cell>
                    <van-cell title="四档最大充电功率" class="bg-transparent">
                        <template>
                            <van-field  class="d-inline-flex w-75 coll-input bg-transparent border-1 border-ddd" v-model="model.powerMax4">
                                <template #right-icon>
                                    <span class="margin-left-1">瓦</span>
                                </template>
                            </van-field>
                        </template>
                    </van-cell>
                    <van-cell title="二档充电时间百分比" class="bg-transparent">
                        <template>
                            <van-field  class="d-inline-flex w-75 coll-input bg-transparent border-1 border-ddd" v-model="model.powerTim2">
                                <template #right-icon>
                                    <span class="margin-left-1">%</span>
                                </template>
                            </van-field>
                        </template>
                    </van-cell>
                    <van-cell title="三档充电时间百分比" class="bg-transparent">
                        <template>
                            <van-field  class="d-inline-flex w-75 coll-input bg-transparent border-1 border-ddd" v-model="model.powerTim3">
                                <template #right-icon>
                                    <span class="margin-left-1">%</span>
                                </template>
                            </van-field>
                        </template>
                    </van-cell>
                    <van-cell title="四档充电时间百分比" class="bg-transparent">
                        <template>
                            <van-field  class="d-inline-flex w-75 coll-input bg-transparent border-1 border-ddd" v-model="model.powerTim4">
                                <template #right-icon>
                                    <span class="margin-left-1">%</span>
                                </template>
                            </van-field>
                        </template>
                    </van-cell>
                </van-cell-group>
            </van-collapse-item>
            <van-collapse-item title="其他配置" name="3">
                <van-cell-group class="bg-gray border-1 border-ddd">
                    <van-cell title="是否初始显示电量" class="bg-transparent">
                        <template>
                            <van-switch v-model="model.elecTimeFirst" size="24px" active-color="rgb(7, 193, 96)" />
                        </template>
                    </van-cell>
                    <van-cell title="最大浮充功率" class="bg-transparent">
                        <template>
                            <van-field  class="d-inline-flex w-75 coll-input bg-transparent border-1 border-ddd" v-model="model.fullPowerMin">
                                <template #right-icon>
                                    <span class="margin-left-1">瓦</span>
                                </template>
                            </van-field>
                        </template>
                    </van-cell>
                    <van-cell title="浮充时间" class="bg-transparent">
                        <template>
                            <van-field  class="d-inline-flex w-75 coll-input bg-transparent border-1 border-ddd" v-model="model.fullChargeTime">
                                <template #right-icon>
                                    <span class="margin-left-1">分钟</span>
                                </template>
                            </van-field>
                        </template>
                    </van-cell>
                </van-cell-group>
            </van-collapse-item>
        </van-collapse>
        <hd-nav :list="navList">
            <template v-slot="{row}">
                <van-button
                    size="small"
                    class="padding-x-4"
                    @click="row.onClick"
                    :icon="row.icon"
                    :type="row.type ? row.type : 'primary'"
                    round
                >{{row.text}}</van-button>
            </template>
        </hd-nav>

        <!-- 复用模板到其他设备 -->
        <hd-select
            :list="list"
            :isShow="isShow"
            title="选择以下设备复用此系统参数"
            keyString="code"
            @confirm="handleSelectSubmit"
            @cancel="isShow = false"
        >
            <template #title>
                <div class="flex-1 text-center">设备号</div>
                <div class="flex-1 text-center">设备名</div>
                <div class="flex-1 text-center">所属小区</div>
            </template>
            <template v-slot="{row}">
                <div class="flex-1 text-center">{{row.code}}</div>
                <div class="flex-1 text-center">{{row.remark}}</div>
                <div class="flex-1 text-center">{{row.areaname}}</div>
            </template>
        </hd-select>
    </div>
</template>

<script>
import hdNav from '@/components/hd-nav'
import hdSelect from '@/components/hd-select'
import { getDeviceSystemParam, setSysParam, searchDeviceData } from '@/require/device'
// 参数阈值map对照表
const thresholdMap = {
    coinMin: {
        title: '投币充电时间',
        range: [0, 999]
    }, // 投币充电时间
    cardMin: {
        title: '单次投币最大用电量',
        range: [0, 999]
    }, // 刷卡充电时间
    coinElec: {
        title: '单次投币最大用电量',
        range: [0.1, 15]
    }, // 单次投币最大用电量
    cardElec: {
        title: '单次刷卡最大用电量',
        range: [0.1, 15]
    }, // 单次刷卡最大用电量
    cst: {
        title: '刷卡扣费金额',
        range: [0.1, 15]
    }, // 刷卡扣费金额
    powerMax1: {
        title: '一档最大充电功率',
        range: [0, 8000]
    }, // 一档最大充电功率
    powerMax2: {
        title: '二档最大充电功率',
        range: [0, 8000]
    }, // 二档最大充电功率
    powerMax3: {
        title: '三档最大充电功率',
        range: [0, 8000]
    }, // 三档最大充电功率
    powerMax4: {
        title: '四档最大充电功率',
        range: [0, 8000]
    }, // 四档最大充电功率
    powerTim2: {
        title: '二档充电时间百分比',
        range: [0, 100]
    }, // 二档充电时间百分比
    powerTim3: {
        title: '三档充电时间百分比',
        range: [0, 100]
    }, // 三档充电时间百分比
    powerTim4: {
        title: '四档充电时间百分比',
        range: [0, 100]
    }, // 四档充电时间百分比
    fullPowerMin: {
        title: '最大浮充功率',
        range: [0, 200]
    }, // 最大浮充功率
    fullChargeTime: {
        title: '浮充时间',
        range: [30, 240]
    } // 浮充时间
}
export default {
    data () {
        return {
            code: this.$route.params.code,
            activeNames: ['1'],
            hardversion: '',
            navList: [
                { text: '获取参数', icon: 'replay', onClick: this.handleGet },
                { text: '复用参数', icon: 'idcard', onClick: this.handleGetDeviceList },
                { text: '保存参数', icon: 'pending-payment', onClick: this.handleSave, type: 'info' }
            ],
            model: {
                spRecMon: true, // 是否余额回收
                spFullEmpty: true, // 是否断电自停
                coinMin: 240, // 投币充电时间
                cardMin: 240, // 刷卡充电时间
                coinElec: 1, // 单次投币最大用电量
                cardElec: 1, // 单次刷卡最大用电量
                cst: 1, // 刷卡扣费金额
                powerMax1: 200, // 一档最大充电功率
                powerMax2: 400, // 二档最大充电功率
                powerMax3: 600, // 三档最大充电功率
                powerMax4: 800, // 四档最大充电功率
                powerTim2: 75, // 二档充电时间百分比
                powerTim3: 50, // 三档充电时间百分比
                powerTim4: 25, // 四档充电时间百分比
                elecTimeFirst: true, // 是否初始显示电量
                fullPowerMin: 20, // 最大浮充功率
                fullChargeTime: 180 // 浮充时间
            },
            list: [
                // { code: '000130', remark: '回忆小区-南栋01', areaname: '回忆小区', aid: 1 },
                // { code: '000132', remark: '回忆小区-南栋02', areaname: '回忆小区', aid: 1, selected: true, disabled: true },
                // { code: '000133', remark: '回忆小区-南栋03', areaname: null, aid: 0 },
                // { code: '000134', remark: '回忆小区-南栋04', areaname: '明港路花园565456487812', aid: 2 }
            ],
            selectList: [], // 选中的list
            isShow: false
        }
    },
    components: {
        hdNav,
        hdSelect
    },
    watch: {
        model: {
            handler (model) {
                this.checkedFn(model)
            },
            deep: true
        }
    },
    mounted () {
        this.handleGet()
    },
    methods: {
        handleGet () {
            this.getSystemParmas({ code: this.code })
        },
        handleSave () {
            this.setSysParamFn(this.code)
        },
        async setSysParamFn (code) {
            if (!this.checkedFn(this.model)) return false
            const data = {
                ...this.model,
                spRecMon: this.model.spRecMon ? 1 : 2,
                spFullEmpty: this.model.spFullEmpty ? 1 : 2,
                elecTimeFirst: this.model.elecTimeFirst ? 1 : 2,
                code
            }
            delete data.updateTime
            return await this.setSystemParmas(data)
        },
        async handleGetDeviceList () {
            const { code, message, devicelist } = await searchDeviceData({
                code: this.code,
                hwVerson: this.hardversion
            })
            if (code === 200) {
                this.list = devicelist.map(item => {
                    return {
                        ...item,
                        remark: item.devicename,
                        selected: item.code === this.code,
                        disabled: item.code === this.code
                    }
                })
                this.isShow = true
            } else {
                this.$toast(message)
            }
        },
        async handleSelectSubmit (value) {
            if (Array.isArray(value)) {
                this.selectList = value.filter(item => item !== this.code)
                const code = this.selectList[0]
                if (code) {
                    this.repeat(code, 0)
                }
            }
            this.isShow = false
        },
        repeat (code, index) {
            this.setSysParamFn(code).then(() => {
                const ind = index++
                if (this.selectList[ind]) {
                    repeat(list[ind], ind)
                }
            })
        },
        // 获取系统参数
        async getSystemParmas (data) {
            try {
                const { code, message, sysparam: params, hardversion } = await getDeviceSystemParam(data)
                const sysparam = params || {}
                if (code === 200) {
                    this.model = Object.assign({}, {
                        ...sysparam,
                        spRecMon: sysparam.spRecMon === 1, // 是否余额回收
                        spFullEmpty: sysparam.spFullEmpty === 1, // 是否断电自停
                        elecTimeFirst: sysparam.elecTimeFirst === 1 // 是否初始显示电量
                    })
                    this.hardversion = hardversion
                } else {
                    this.$toast(message)
                }
            } catch (e) {
                this.$toast('异常错误')
            }
        },
        // 设置系统参数
        async setSystemParmas (data) {
            try {
                const { message } = await setSysParam(data)
                this.$dialog.alert({
                    title: '提示',
                    message: message
                })
                return true
            } catch (e) {
                this.$toast('异常错误')
                return false
            }
        },
        // 校验参数
        checkedFn (model) {
            for (const [key, { title, range }] of Object.entries(thresholdMap)) {
                const [minVal, maxVal] = range
                const value = Number(model[key])
                if (value < minVal || value > maxVal) {
                    this.$toast(`${title}的值范围为：${minVal}~${maxVal}`)
                    return false
                }
            }
           return true
        }
    }
}
</script>
<style lang="scss">
.v2-system {
    min-height: 100vh;
    .van-collapse-item__content {
        padding: 0 !important;
    }
    .coll-input {
        padding: 3px 10px;
    }
}
</style>
