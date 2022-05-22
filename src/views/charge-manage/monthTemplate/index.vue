<template>
  <div class="month-template">
        <van-sticky v-if="tempData.merid === 0 && type === 'edit'">
            <van-notice-bar left-icon="info-o">
                温馨提示：此模板为系统模板，不支持修改！
            </van-notice-bar>
        </van-sticky>
        <!-- 头部区域 -->
        <template-month-header
            :data="tempData"
            :isSystemTem="isSystemTem"
        ></template-month-header>
        <!-- 头部区域 -->
        <div class="">
            <charge-standard
                :tempData="tempData"
                :isSystemTem="isSystemTem"
                @deleteChild="deleteChild"
                @addChild="addChild"
            />
        </div>
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
  </div>
</template>

<script>
import TemplateMonthHeader from '@/components/charge-manage/template-month-header'
import ChargeStandard from '@/components/template/month/charge-standard'
import HdNav from '@/components/hd-nav'
import helper from './helper'
export default {
    components: {
        TemplateMonthHeader,
        ChargeStandard,
        HdNav
    },
    data () {
        return {
            chargeType: 1
        }
    },
    setup (props, context) {
        const { tenantId } = context.root
        const router = context.root._router
        return helper({ router, tenantId })
    }
}
</script>

<style lang="scss">
.month-template {
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
