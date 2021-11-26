<template>
  <div class="v2-template">
        <van-sticky v-if="tempData.merid === 0 && type === 'edit'">
            <van-notice-bar left-icon="info-o">
                温馨提示：此模板为系统模板，不支持修改！
            </van-notice-bar>
        </van-sticky>
        <!-- 头部区域 -->
        <template-header
            :data="tempData"
            :isSystemTem="isSystemTem"
        ></template-header>
        <!-- 头部区域 -->
        <div class="">
            <!-- 是否强制钱包支付 -->
            <div class="post-session">
                <div class="padding-x-2 d-flex align-items-center padding-y-2">
                    <div style="width: 10em;" class="text-666 text-size-md">是否强制钱包支付:</div>
                    <van-switch
                        v-model="tempData.walletpay"
                        size="24px"
                        :disabled="isSystemTem"
                        active-color="#07c160"
                    />
                </div>
            </div>
            <charge-standard
                :tempData="tempData"
                :isSystemTem="isSystemTem"
                @deleteChild="deleteChild"
                @addChild="addChild"
            />
        </div>
        <div v-if="type ==='edit'">
            <hd-title>正在使用此模板的设备列表</hd-title>
            <van-sticky offset-top="0">
                <van-row class="d-flex post-border-row post-header margin-x-3 text-size-sm font-weight-bold">
                    <van-col :span="7" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">设备号</van-col>
                    <van-col :span="7" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">设备名称</van-col>
                    <van-col :span="7" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">所属小区</van-col>
                    <van-col :span="3" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">操作</van-col>
                </van-row>
            </van-sticky>
            <div class="">
                <van-row
                    class="d-flex post-border-row margin-x-3 text-size-sm text-666"
                    v-for="item in employDeviceinfo"
                    :key="item.code"
                >
                    <van-col :span="7" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">{{item.code}}</van-col>
                    <van-col :span="7" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">{{item.devicename || '— —'}}</van-col>
                    <van-col :span="7" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">{{item.areaname || '— —'}}</van-col>
                    <van-col :span="3" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">
                        <van-button
                            class="border-0 d-flex align-items-center justify-content-center padding-x-1"
                            style="height: 0.5rem;"
                            @click="removeDevice(item.code)"
                        >
                            <i class="iconfont icon-shanchu1 text-size-lg text-danger" />
                        </van-button>
                    </van-col>
                </van-row>
                <van-row class="d-flex post-border-row margin-x-3 text-size-sm text-666">
                    <van-col :span="24" class="post-border-col padding-y-1 padding-x-1 d-flex align-items-center justify-content-center">
                        <div class="d-flex w-100 justify-content-center">
                            <van-button
                                type="primary"
                                class="w-50"
                                size="small"
                                icon="plus"
                                @click="toggleRepeatIsShow"
                            >添加设备使用此模板</van-button>
                        </div>
                    </van-col>
                </van-row>
            </div>
        </div>

        <!-- 复用模板到其他设备 -->
        <hd-select
            :list="deviceList"
            :isShow="repeatIsShow"
            :title="repeatTitle"
            keyString="code"
            @confirm="repeatConfirm"
            @cancel="repeatIsShow = false"
        >
            <template #title>
                <div class="flex-1 text-center">设备号</div>
                <div class="flex-1 text-center">所属小区</div>
            </template>
            <template v-slot="{row}">
                <div class="flex-1 text-center">{{row.code}}</div>
                <div class="flex-1 text-center">{{row.areaname}}</div>
            </template>
        </hd-select>

        <!-- 底部导航 -->
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

         <van-action-sheet
            v-model="refundShow"
            :actions="refundList"
            cancel-text="取消"
            description="选择一种退费方式"
            close-on-click-action
            @select="changeRefundType"
        />
  </div>
</template>

<script>
import TemplateHeader from '@/components/template/template-header'
import ChargeStandard from '@/components/template/pulse/charge-standard'
import HdSelect from '@/components/hd-select'
import HdNav from '@/components/hd-nav'
import helper from './helper'
export default {
    components: {
        TemplateHeader,
        ChargeStandard,
        HdNav,
        HdSelect
    },
    data () {
        return {
            // isSystemTem: false,
            chargeType: 1
        }
    },
    setup (props, context) {
        const tempid = context.root._route.params.id // 主模板id
        const code = context.root._route.query.code
        const version = context.root._route.params.version // 硬件版本号
        const router = context.root._router
        return helper({ tempid, version, code, router })
    }
}
</script>

<style lang="scss">
.v2-template {
    padding-bottom: 65px;
    .post-arrow {
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
    }
    .post-border-row {
        &.post-header {
            background-color: #c8efd4;
        }
        border: 1px solid #add9c0;
        .post-border-col {
            border-right: 1px solid #add9c0;
        }
    }
    .bottom-style {
        padding: 0 !important;
        height: 45px !important;
        line-height: 1.8;
    }
}
</style>
