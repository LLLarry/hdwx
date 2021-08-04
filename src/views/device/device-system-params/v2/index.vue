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
import { readsysteminfo, searchDeviceData } from '@/require/device'
export default {
    data () {
        return {
            code: '302864',
            checked: true,
            activeNames: ['1'],
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
                { code: '000130', remark: '回忆小区-南栋01', areaname: '回忆小区', aid: 1 },
                { code: '000132', remark: '回忆小区-南栋02', areaname: '回忆小区', aid: 1, selected: true, disabled: true },
                { code: '000133', remark: '回忆小区-南栋03', areaname: null, aid: 0 },
                { code: '000134', remark: '回忆小区-南栋04', areaname: '明港路花园565456487812', aid: 2 }
            ],
            isShow: false
        }
    },
    components: {
        hdNav,
        hdSelect
    },
    methods: {
        handleGet () {
            this.getSystemParmas({ code: '000138' })
        },
        handleSave () {
            const data = {
                ...this.model,
                spRecMon: this.model.spRecMon ? 1 : 2,
                spFullEmpty: this.model.spFullEmpty ? 1 : 2,
                elecTimeFirst: this.model.elecTimeFirst ? 1 : 2
            }
            console.log(data)
        },
        async handleGetDeviceList () {
            const info = await searchDeviceData({
                code: '000012',
                merid: 5039,
                hwVerson: '08'
            })
            console.log(info)
           this.isShow = true
        },
        handleSelectSubmit () {

        },
        async getSystemParmas (data) {
            try {
                const info = await readsysteminfo(data)
                console.log(info)
            } catch (e) {
                console.log(e)
            }
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
