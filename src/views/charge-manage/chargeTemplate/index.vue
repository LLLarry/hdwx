<template>
  <div class="charge-template">
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
            <charge-standard
                :tempData="tempData"
                :isSystemTem="isSystemTem"
                @deleteChild="deleteChild"
                @addChild="addChild"
            />
        </div>
        <div v-if="type ==='edit'">
            <div class="d-flex justify-content-center padding-y-3">
                <van-button
                    type="danger"
                    block
                    size="small"
                    class="w-75"
                    :disabled="isSystemTem"
                    @click="deleteTemp"
                >删除模板</van-button>
            </div>

            <div class="">
                <hd-title>【钱包充值】正在使用此模板的小区列表</hd-title>
                <van-row class="d-flex post-border-row post-header margin-x-3 text-size-sm font-weight-bold">
                    <van-col :span="20" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">小区名称</van-col>
                    <van-col :span="4" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">操作</van-col>
                </van-row>
                <van-row
                    class="d-flex post-border-row margin-x-3 text-size-sm text-666"
                    v-for="item in resultwallet"
                    :key="item.id"
                >
                    <van-col :span="20" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">{{item.name}}</van-col>
                    <van-col :span="4" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">
                        <van-button
                            class="border-0 d-flex align-items-center justify-content-center padding-x-1"
                            style="height: 0.5rem;"
                            @click="removeDevice(item.id, 1)"
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
                                @click="toggleRepeatIsShow(tempData.id, 1)"
                            >添加设备使用此模板</van-button>
                        </div>
                    </van-col>
                </van-row>
            </div>

            <div class="">
                <hd-title>【在线卡充值】正在使用此模板的小区列表</hd-title>
                <van-row class="d-flex post-border-row post-header margin-x-3 text-size-sm font-weight-bold">
                    <van-col :span="20" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">小区名称</van-col>
                    <van-col :span="4" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">操作</van-col>
                </van-row>
                <van-row
                    class="d-flex post-border-row margin-x-3 text-size-sm text-666"
                    v-for="item in resultonline"
                    :key="item.id"
                >
                    <van-col :span="20" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">{{item.name}}</van-col>
                    <van-col :span="4" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">
                        <van-button
                            class="border-0 d-flex align-items-center justify-content-center padding-x-1"
                            style="height: 0.5rem;"
                            @click="removeDevice(item.id, 2)"
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
                                @click="toggleRepeatIsShow(tempData.id, 2)"
                            >添加设备使用此模板</van-button>
                        </div>
                    </van-col>
                </van-row>
            </div>

        </div>

        <!-- 复用模板到其他设备 -->
        <hd-select
            :list="areaList"
            :isShow="repeatIsShow"
            :title="repeatTitle"
            keyString="value"
            @confirm="repeatConfirm"
            @cancel="repeatIsShow = false"
        >
            <template #title>
                <div class="flex-1 text-center">小区名称</div>
            </template>
            <template v-slot="{row}">
                <div class="flex-1 text-center">{{row.text}}</div>
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
import ChargeStandard from '@/components/template/recharge/charge-standard'
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
        const router = context.root._router
        return helper({ tempid, router })
    }
}
</script>

<style lang="scss">
.charge-template {
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
