<template>
    <div>
        <div class="padding-bottom-3 bg-white">
            <div v-if="existdevice.length > 0">
                <hd-card class="area-box-2 padding-x-3 padding-y-3 position-relative margin-x-3 margin-bottom-3  margin-top-1 rounded shadow-md"  v-for="item in existdevice" :key="item.id">
                    <div class="d-flex justify-content-between align-items-center w-100">
                        <div class="">
                            <div class="font-weight-bold text-000 text-size-default card-num">{{item.code}}{{ item.remark && `（${item.remark}）` }}</div>
                            <div class="margin-top-1 text-666" v-if="item.hardversion === '00'">00出厂默认设置</div>
                            <div class="margin-top-1 text-666" v-else-if="item.hardversion === '01'">01十路智慧款</div>
                            <div class="margin-top-1 text-666" v-else-if="item.hardversion === '02'">02电轿款</div>
                            <div class="margin-top-1 text-666" v-else-if="item.hardversion === '03'">03脉冲板子</div>
                            <div class="margin-top-1 text-666" v-else-if="item.hardversion === '04'">04离线充值机</div>
                            <div class="margin-top-1 text-666" v-else-if="item.hardversion === '05'">05十六路智慧款</div>
                            <div class="margin-top-1 text-666" v-else-if="item.hardversion === '06'">06二十路智慧款</div>
                            <div class="margin-top-1 text-666" v-else-if="item.hardversion === '07'">07单路交流桩</div>
                            <div class="margin-top-1 text-666" v-else-if="item.hardversion === '08'">08新版10路智慧款V3</div>
                            <div class="margin-top-1 text-666" v-else-if="item.hardversion === '10'">10新版20路智慧款V3</div>
                            <div class="margin-top-1 text-666" v-else-if="item.hardversion === '11'">11版1拖2</div>
                        </div>
                        <div class="text-success text-size-default font-weight-bold" v-if="item.state === 1">
                            在线
                        </div>
                        <div class="text-danger text-size-default font-weight-bold" v-else>
                            离线
                        </div>
                    </div>
                    <div class="d-flex justify-content-end align-items-center w-100 margin-top-2">
                        <van-button type="primary" plain size="mini" class="margin-right-2 padding-x-3" :to="`/device/manage/${item.code}`">管理</van-button>
                        <van-button type="danger" plain size="mini" class="padding-x-3" @click="handleDelete(item)">解绑</van-button>
                    </div>
                </hd-card>
            </div>
            <div v-else v-no-data:[noDataConfig]="existdevice.length <= 0"></div>
            <div
                class="add-partner d-flex justify-content-center align-items-center margin-x-3 rounded margin-top-2"
                @click="isShowAddDevice = true"
            >
                添加设备
            </div>
        </div>

        <hd-select
            :list="list"
            @confirm="addDeviceConfirm"
            @cancel="isShowAddDevice = false"
            :isShow="isShowAddDevice"
            title="选中设备添加到此小区"
            radio
        >
            <template #title>
                <div class="flex-1 text-center">设备号</div>
                <div class="flex-1 text-center">设备名</div>
            </template>
            <template v-slot="{row}">
                <div class="flex-1 text-center">{{row.id}}</div>
                <div class="flex-1 text-center">{{row.name || '— —'}}</div>
            </template>
        </hd-select>
    </div>
</template>

<script>
import hdCard from '@/components/hd-card'
import hdSelect from '@/components/hd-select'
import { addDeviceEnterArea, deleteAreaDevice } from '@/require/area'
export default {
    props: {
        existdevice: {
            type: Array,
            default: () => []
        },
        noexistdevice: {
            type: Array
        }
    },
    data () {
        return {
            isShowAddDevice: false,
            aid: this.$route.params.id,
            noDataConfig: {
                description: '暂无绑定设备'
            }
        }
    },
    computed: {
        list () {
            return this.noexistdevice.map(one => ({
                id: one.code,
                name: one.remark
            }))
        }
    },
    components: {
        hdCard,
        hdSelect
    },
    mounted () {
        console.log(this)
    },
    methods: {
       // yonghu
        async addDeviceConfirm (result) {
            const { code, message } = await addDeviceEnterArea({
                aid: this.aid,
                code: result
            }, '添加中')
            if (code === 200) {
                this.$dialog.alert({
                    title: '提示',
                    message: '添加成功',
                    beforeClose: (action, done) => {
                        this.$emit('reflesh')
                        done()
                    }
                })
            } else {
                this.$toast(message)
            }
            this.isShowAddDevice = false
        },
        handleDelete ({ code }) {
            this.$dialog.confirm({
                title: '提示',
                message: `是否解绑${code}设备？`,
                beforeClose: async (action, done) => {
                    if (action === 'confirm') {
                        const { code: status, message } = await deleteAreaDevice({ code })
                        if (status === 200) {
                            this.$toast(`${code}设备解绑成功`)
                            this.$emit('reflesh')
                        } else {
                            this.$toast(message)
                        }
                        done()
                    } else {
                        done()
                    }
                }
            })
        }
    }
}
</script>
