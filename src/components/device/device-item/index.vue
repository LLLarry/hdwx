<template>
  <div class="device-item text-size-sm text-666 shadow margin-x-2 rounded-md overflow-hidden" :class="{ active: !deviceBindOwn }">
    <hd-card class="padding-2">
         <hd-card-item>
            <span class="device-item-title text-666">设备号：</span>
            <span class="device-item-content text-999">{{value.code}}</span>
        </hd-card-item>
        <hd-card-item>
            <span class="device-item-title text-666">线上收益：</span>
            <span class="device-item-content text-999">{{value.totalOnlineEarn}}元</span>
        </hd-card-item>
        <hd-card-item v-if="showIncoins">
            <span class="device-item-title text-666">投币收益：</span>
            <span class="device-item-content text-999">{{value.totalCoinsEarn}}元</span>
        </hd-card-item>
        <hd-card-item>
            <span class="device-item-title text-666">设备名称：</span>
            <span class="device-item-content text-999">{{value.remark}}</span>
        </hd-card-item>
        <hd-card-item>
            <span class="device-item-title text-666">所属小区：</span>
            <span class="device-item-content text-999">{{value.name}}</span>
        </hd-card-item>
        <hd-card-item
            v-if="!['03', '04'].includes(value.hardversion) && value.state === 1"
        >
           <span>端口状态：</span>
           <span>
                <van-tag type="success" round class="margin-right-1">空闲 ({{value.freenum}})</van-tag>
                <van-tag type="danger" round class="margin-right-1">占用 ({{value.usenum}}) </van-tag>
                <van-tag type="warning" round class="margin-right-1">故障 ({{value.failnum}})</van-tag>
           </span>
        </hd-card-item>
        <div class="device-contral d-flex justify-content-end w-100 margin-top-1">
            <van-button
                type="primary"
                size="small"
                v-if="value.hardversion === '11'"
                :to="`/device/addr/${value.code}`"
            >从机</van-button>
            <van-button
                type="primary"
                size="small"
                v-if="!['03', '04', '11'].includes(value.hardversion) && value.device_type !== 2 && deviceBindOwn"
                :to="`/device/portstatus/${value.code}`"
            >状态</van-button>
            <van-button
                type="primary"
                size="small"
                v-if="deviceBindOwn"
                :to="`/device/manage/${value.code}`"
            >管理</van-button>
            <van-button
                type="primary"
                size="small"
                v-if="deviceBindOwn && value.state === 1 && value.device_type !== 2 && value.hardversion !== '11'"
                :to="`/remote/charge/${value.code}`"
            >远程</van-button>
            <van-button
                :type="value.state === 1 ? 'primary' : 'danger'" size="small"
                v-if="value.device_type !== 2"
            >
                <img class="singal-icon" :src="require(`../../../assets/images/singal/${singalIcon}`)" />
            </van-button>
            <van-button
                type="primary"
                size="small"
                :to="`/device/statis/${value.code}`"
            >统计</van-button>
            <van-button
                type="primary"
                size="small"
                :to="`/device/order/${value.code}`"
            >订单</van-button>
        </div>
    </hd-card>
  </div>
</template>

<script>
import hdCard from '@/components/hd-card'
import hdCardItem from '@/components/hd-card-item'
export default {
    props: {
        value: {
            type: Object
        }
    },
    components: {
        hdCard,
        hdCardItem
    },
    computed: {
        // 是否显示投币收益
        showIncoins () {
            return this.value.showincoins !== 2
        },
        // 是否是自己的设备 （设备分为自己的设备和合伙设备）
        deviceBindOwn () {
            return this.value.classify === 1
        },
        // 信号图标
        singalIcon () {
            let icon = ''
            const { state, csq, hardversionnum } = this.value
            const baseUrl = ['01', '04'].includes(hardversionnum) ? '4g' : '2g'
            if (state === 1) {
                if (csq >= 0 && csq <= 5) {
                    icon = '_singal_1.png'
                } else if (csq > 5 && csq <= 10) {
                    icon = '_singal_3.png'
                } else if (csq > 10 && csq <= 20) {
                    icon = '_singal_4.png'
                } else {
                    icon = '_singal_5.png'
                }
            } else {
                icon = '_singal_offline.png'
            }

            return baseUrl + icon
        }
    }
}
</script>

<style lang="scss">
.device-item {
    &.active {
        position: relative;
        &::after {
            content: '合伙设备';
            position: absolute;
            background: #07c160;
            color: #fff;
            font-size: 10px;
            padding: 5px;
            right: 20px;
            top: 9px;
            width: 80px;
            text-align: center;
            transform: translate(50%, 0) rotate(45deg);
        }
    }
    .hd-card {
        background: #fff;
        .hd-card-item {
            min-width: 50%;
            box-sizing: border-box;
        }
    }
    .device-contral {
        button {
            padding: 0 9px;
            margin: 0 3px;
            .singal-icon {
                width: 28px;
                position: relative;
                top: 2px;
            }
        }
    }
}
</style>
