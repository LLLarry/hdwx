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
        <!-- <hd-select
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
        </hd-select> -->

         <hd-select-filter
            :list="list"
            :repeatIsShow="isShow"
            repeatTitle="选择以下设备复用此系统参数"
            @submit="handleSelectSubmit"
            @close="isShow = false"
        />

        <hd-overlay :show="repeatOverlay" title="正在复用中" @close="repeatOverlay = false">
            <div class="text-center text-size-sm margin-bottom-2" v-if="repeatList[0].length + repeatList[1].length < selectList.length">
                正在复用系统参数中，请勿操作
            </div>
            <div class="text-center text-size-sm margin-bottom-2" v-else>
                复用完成
            </div>
            <ul class="text-size-md repeat-box">
                <li class="margin-bottom-1 d-flex"
                    v-for="code in selectList"
                    :key="code"
                >
                    <p class="flex-1 text-center">{{code}}</p>
                    <p class="flex-1 text-center text-success" v-if="repeatList[0].includes(code)">成功</p>
                    <p class="flex-1 text-center text-danger" v-else-if="repeatList[1].includes(code)">失败</p>
                    <p class="flex-1 text-center" v-else-if="code === repeating">
                        <van-loading type="spinner" color="#1989fa" size=".5rem" />
                    </p>
                    <p class="flex-1 text-center " v-else>
                    </p>
                </li>
            </ul>
        </hd-overlay>
    </div>
</template>

<script>
import hdNav from '@/components/hd-nav'
// import hdSelect from '@/components/hd-select'
import hdSelectFilter from '@/components/hd-select-filter'
import hdOverlay from '@/components/hd-overlay'
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
        range: [1, 240]
    } // 浮充时间
}
// 后台数据与前台字段映射字典
const map = {
    param1: 'coinMin',
    param2: 'cardMin',
    param3: {
        key: 'coinElec',
        format (value) {
            return Number.parseFloat(value) / 10
        }
    },
    param4: {
        key: 'cardElec',
        format (value) {
            return Number.parseFloat(value) / 10
        }
    },
    param5: {
        key: 'cst',
        format (value) {
            return Number.parseFloat(value) / 10
        }
    },
    param6: 'powerMax1',
    param7: 'powerMax2',
    param8: 'powerMax3',
    param9: 'powerMax4',
    param10: 'powerTim2',
    param11: 'powerTim3',
    param12: 'powerTim4',
    param13: {
        key: 'spRecMon',
        format (value) {
            return Number.parseFloat(value) === 1
        }
    },
    param14: {
        key: 'spFullEmpty',
        format (value) {
            return Number.parseFloat(value) === 1
        }
    },
    param15: 'fullPowerMin',
    param16: 'fullChargeTime',
    param17: {
        key: 'elecTimeFirst',
        format (value) {
            return Number.parseFloat(value) === 1
        }
    }
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
            isShow: false,
            repeatList: [[], []],
            repeatOverlay: false,
            repeating: '' // 正在复用的设备号
        }
    },
    components: {
        hdNav,
        // hdSelect,
        hdSelectFilter,
        hdOverlay
    },
    computed: {
        titleText () {
            if (!this.code) {
                return '系统模板'
            } else {
                return `${this.code}设备系统模板`
            }
        }
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
            .then(res => {
                this.alert(res)
            })
            .catch(message => {
                this.alert(message)
            })
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
                this.repeating = '' // 初始化正在复用的设备号
                this.repeatList = [[], []] // 初始化复用结果容器
                this.repeatOverlay = true
                if (code) {
                    this.repeat(code, 0)
                }
            }
            this.isShow = false
        },
        async repeat (code, index) {
            try {
                this.repeating = code
                await this.setSysParamFn(code, true)
                this.repeatList[0].push(code) // 成功容器
            } catch (error) {
                this.repeatList[1].push(code) // 失败容器
            } finally {
                const ind = ++index
                const nextCode = this.selectList[ind]
                if (typeof nextCode === 'string') {
                    this.repeat(nextCode, ind)
                }
            }
        },
        // 获取系统参数
        async getSystemParmas (data) {
            try {
                const { code, message, sysparam: params, hardversion } = await getDeviceSystemParam(data)
                const sysparam = params || {}
                if (code === 200) {
                    // this.model = Object.assign({}, {
                    //     ...sysparam,
                    //     spRecMon: Number(sysparam.spRecMon) === 1, // 是否余额回收
                    //     spFullEmpty: Number(sysparam.spFullEmpty) === 1, // 是否断电自停
                    //     elecTimeFirst: Number(sysparam.elecTimeFirst) === 1 // 是否初始显示电量
                    // })
                    this.model = Object.assign({}, this.formatParmas(sysparam))
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
                const { returncode, message } = await setSysParam(data)
                if (returncode === 1001) {
                    return Promise.reject(message)
                } else {
                    return Promise.resolve('设置成功')
                }
            } catch (e) {
                return Promise.reject(new Error('异常错误'))
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
        },
        // 格式化请求参数
        formatParmas (data = {}) {
            const params = {}
            for (const [key, value] of Object.entries(data)) {
                const type = typeof map[key]
                if (type === 'undefined') continue
                if (type === 'string') params[map[key]] = Number.parseFloat(value)
                if (type === 'object') {
                    params[map[key].key] = map[key].format(value)
                }
            }
            return params
        }
    }
}
</script>
<style lang="scss" scoped>
.v2-system {
    min-height: 100vh;
    .van-collapse-item__content {
        padding: 0 !important;
    }
    .coll-input {
        padding: 3px 10px;
    }
    .repeat-box {
        max-height: 50vh;
        overflow-y: auto;
    }
}
</style>
