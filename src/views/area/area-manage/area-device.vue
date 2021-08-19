<template>
    <div>
        <div class="padding-bottom-3 bg-white">
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
    props: {
        list: {
            type: Array,
            default: () => []
        }
    },
    data () {
        return {
            isShowAddDevice: false
        }
    },
    components: {
        hdCard,
        hdSelect
    },
    methods: {
       // yonghu
        addDeviceConfirm (result) {
            this.isShowAddDevice = false
        }
    }
}
</script>
