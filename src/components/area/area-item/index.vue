<template>
  <div class="area-item text-size-sm text-666 shadow margin-x-2 rounded-md overflow-hidden">
    <hd-card class="padding-2">
        <hd-card-item class="w-100 title">
            <h3 class="text-000">{{value.name}}</h3>
            <p class="text-size-sm padding-y-1" v-if="value.address">{{value.addresspath+value.address}}</p>
        </hd-card-item>
        <hd-card-item>
            <span class="area-item-title text-666">设备数量：</span>
            <span class="area-item-content text-999">{{value.equcount}}</span>
        </hd-card-item>
        <hd-card-item>
            <span class="area-item-title text-666">昨日设备使用率：</span>
            <span class="area-item-content text-999">{{value.usagerate | fmtMoney}}%</span>
        </hd-card-item>
        <hd-card-item>
            <span class="area-item-title text-666">总在线收益：</span>
            <span class="area-item-content text-999">{{value.total_online_earn | fmtMoney}}元</span>
        </hd-card-item>
         <hd-card-item>
            <span class="area-item-title text-666">今日在线收益：</span>
            <span class="area-item-content text-999">{{value.totalOnlineEarn | fmtMoney}}元</span>
        </hd-card-item>
        <hd-card-item>
            <span class="area-item-title text-666">总消费金额：</span>
            <span class="area-item-content text-999">{{value.totalconsumemoney | fmtMoney}}元</span>
        </hd-card-item>
         <hd-card-item>
            <span class="area-item-title text-666">今日消费金额：</span>
            <span class="area-item-content text-999">{{value.consumemoney | fmtMoney}}元</span>
        </hd-card-item>
        <hd-card-item>
           <span>端口状态：</span>
           <span>
                <van-tag type="success" round class="margin-right-1">空闲 ({{value.leisureport}})</van-tag>
                <van-tag type="danger" round class="margin-right-1">占用 ({{value.occupyport}}) </van-tag>
                <van-tag type="warning" round class="margin-right-1">故障 ({{value.faultport}})</van-tag>
           </span>
        </hd-card-item>
        <div class="area-contral d-flex justify-content-end w-100 margin-top-1">
            <van-button type="primary" size="small" @click="handleEdit(value)">编辑</van-button>
            <van-button type="primary" size="small" :to="`/area/manage/${value.id}`">管理</van-button>
            <van-button type="primary" size="small" :to="`/area/statis/${value.id}`">统计</van-button>
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
        areaBindOwn () {
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
    },
    methods: {
        handleEdit (row) {
            this.$emit('getChildData', { key: 'editAreaRow', value: row })
        }
    }
}
</script>

<style lang="scss">
.area-item {
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
            &.title {
                border-bottom: 1px dotted #ccc;
            }
        }
    }
    .area-contral {
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
