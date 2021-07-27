<template>
  <div class="area-item text-size-md text-666 shadow margin-x-2 rounded-md overflow-hidden">
    <hd-card class="padding-2">
        <!--
         <hd-card-item>
            <span class="area-item-title text-333">小区名称：</span>
            <span class="area-item-content text-666">{{value.code}}</span>
        </hd-card-item>
        <hd-card-item>
            <span class="area-item-title text-333">小区地址：</span>
            <span class="area-item-content text-666">{{value.totalOnlineEarn}}元</span>
        </hd-card-item>
        -->
        <hd-card-item class="w-100 title">
            <h3 class="text-000">{{value.name}}</h3>
            <p class="text-size-sm padding-y-1" v-if="value.address">{{value.addresspath+value.address}}</p>
        </hd-card-item>
        <hd-card-item>
            <span class="area-item-title text-333">设备数量：</span>
            <span class="area-item-content text-666">{{value.equcount}}元</span>
        </hd-card-item>
        <hd-card-item>
            <span class="area-item-title text-333">昨日设备使用率：</span>
            <span class="area-item-content text-666">{{value.usagerate}}%</span>
        </hd-card-item>
        <hd-card-item>
            <span class="area-item-title text-333">总在线收益：</span>
            <span class="area-item-content text-666">{{value.total_online_earn}}</span>
        </hd-card-item>
         <hd-card-item>
            <span class="area-item-title text-333">今日在线收益：</span>
            <span class="area-item-content text-666">{{value.totalOnlineEarn}}</span>
        </hd-card-item>
        <hd-card-item>
            <span class="area-item-title text-333">总消费金额：</span>
            <span class="area-item-content text-666">{{value.totalconsumemoney}}</span>
        </hd-card-item>
         <hd-card-item>
            <span class="area-item-title text-333">今日消费金额：</span>
            <span class="area-item-content text-666">{{value.consumemoney}}</span>
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
            <van-button type="primary" size="small" @click="$router.push(`/area/manage/${value.value}`)">管理</van-button>
            <van-button type="primary" size="small">统计</van-button>
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
