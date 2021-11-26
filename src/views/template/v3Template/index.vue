<template>
  <div class="v3Template">
    <van-sticky v-if="tempData.merid === 0">
      <van-notice-bar left-icon="info-o">
        温馨提示：此模板为系统模板，不支持修改！
      </van-notice-bar>
    </van-sticky>
    <template-header :data="tempData" :isSystemTem="isSystemTem"></template-header>
    <!-- 顶部控制区域 -->
    <div class="">
      <div class="padding-x-2 d-inline-block">
        <template-input>
          <span class="text-666 text-size-md">充电计费方式：</span>
          <template #input>
            <input
              readonly
              v-model="chargeType"
              :disabled="isSystemTem"
              @click="openChargeType"
              placeholder="请选择充电方式"
              class="padding-x-1 padding-y-1 border-1 border-ccc outline-none"/>
          </template>
          <template #exec>
            <van-icon name="arrow-down" class="position-absolute post-arrow text-666" size="18"/>
          </template>
        </template-input>
      </div>
    </div>
    <div class="">
      <div class="padding-x-2 d-inline-block">
        <template-input
          unit="分钟"
        >
          <span class="text-666 text-size-md">刷卡最大充电时间：</span>
          <template #input>
            <input
              style="width: 2.5rem;"
              class="padding-x-1 padding-y-1 border-1 border-ccc outline-none"
              v-model="tempData.slotcardtime"
              :disabled="isSystemTem"
            >
          </template>
        </template-input>
      </div>
    </div>
    <div class="border-bottom-1 border-ddd">
      <div class="padding-x-2 d-flex align-items-center padding-y-2">
        <div class="text-666 text-size-md">是否支持支付宝充电：</div>
        <van-switch
          v-model="tempData.alipay"
          size="24px"
          :disabled="isSystemTem"
          active-color="#07c160"
        />
      </div>
      <p class="text-p padding-x-2 margin-bottom-1 text-size-sm">提示：支付宝充电暂不支持部分退费</p>
    </div>
    <!-- 按电量计费开始 -->
    <charge-elec :isSystemTem="isSystemTem" :tempData="tempData" />
    <!-- 按电量计费结束 -->

    <!-- 按功率计费开始 -->
    <charge-power
      :isSystemTem="isSystemTem"
      :tempData="tempData"
      @removeChild="deleteChild"
      @addChild="addChild"
      :sortList="sortList"
    />
    <!-- 按功率计费结束 -->
    <div class="mid border-bottom-1 border-ddd">
       <!-- 收费说明 -->
      <div class="padding-x-2 margin-bottom-2">
        <div class="margin-y-2 text-p">收费说明：</div>
        <textarea
          v-model="tempData.hintMessage"
          class="d-block w-100"
          rows="5"
          placeholder="请输入充电说明"
          :disabled="isSystemTem"
        ></textarea>
      </div>
    </div>
    <!-- 按照时间充电开始 -->
    <charging-time
      :isSystemTem="isSystemTem"
      :tempData="tempData"
      @removeChild="deleteChild"
      @addChild="addChild"
      :sortList="sortList"
    />
    <!-- 按照时间充电结束 -->
    <div class="border-bottom-1 border-ddd">
      <div class="post-session padding-bottom-2">
          <div class="padding-x-2 d-flex align-items-center padding-y-2">
            <div style="width:10em;">是否支持按金额充电:</div>
            <van-switch v-model="tempData.walletpay" size="24px" :disabled="isSystemTem" active-color="#07c160" />
          </div>
          <p class="text-p padding-x-2 margin-bottom-1 text-size-sm">说明：按金额充电即为临时充电</p>
      </div>

      <div class="post-session padding-bottom-2">
          <div class="padding-x-2 d-flex align-items-center padding-y-2">
            <div style="width:10em;">是否支持退费:</div>
            <van-switch
              v-model="tempData.permit"
              size="24px"
              :disabled="isSystemTem || forbidPermitOrStype"
              active-color="#07c160"
            />
          </div>
          <p class="text-p padding-x-2 margin-bottom-1 text-size-sm">提示：充不完的费用 退回到虚拟钱包，下次充电可用</p>
      </div>

      <div class="post-session">
          <div class="padding-x-2 d-flex align-items-center padding-y-2">
            <div style="width:10em;">默认按金额充电:</div>
            <van-switch
              v-model="tempData.grade"
              size="24px"
              :disabled="isSystemTem || forbidPermitOrStype"
              active-color="#07c160"
            />
          </div>
          <p class="text-p padding-x-2 margin-bottom-1 text-size-sm">说明：开启默认按金额充电，用户扫码时默认选中“按金额充电”选项</p>
      </div>
    </div>
      <charging-money
        :isSystemTem="isSystemTem"
        :tempData="tempData"
        @removeChild="deleteChild"
        @addChild="addChild"
        :sortList="sortList"
      />
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
        v-model="chargeTypeIsShow"
        :actions="actions"
        cancel-text="取消"
        description="选择一种充电计费方式"
        close-on-click-action
        @select="changeChargeType"
      />
  </div>
</template>

<script>
import TemplateHeader from '@/components/template/template-header'
import TemplateInput from '@/components/template/template-input'
import ChargeElec from '@/components/template/v3/charge-elec'
import ChargePower from '@/components/template/v3/charge-power'
import ChargingTime from '@/components/template/v3/charging-time'
import ChargingMoney from '@/components/template/v3/charging-money'

import hdNav from '@/components/hd-nav'
import { useInitTemp, useChargeType, createNavList } from './helper'
export default {
    components: {
        TemplateHeader,
        TemplateInput,
        hdNav,
        ChargeElec,
        ChargePower,
        ChargingTime,
        ChargingMoney
    },
    setup (props, context) {
      const tempid = context.root._route.params.id // 主模板id
      const code = context.root._route.query.code // 主模板id
      const version = context.root._route.params.version // 硬件版本号
      const {
        tempDataRef, // 主模板ref
        isSystemTem, // 是否是系统模板,
        type, // 1 编辑 2 新增
        addChild, // 添加主模板函数
        deleteChild, // 删除子模板函数
        forbidPermitOrStype, // 是否禁止退费和默认金额充电点击
        editTemp, // 编辑主模板函数
        addTemp, // 添加主模板
        goBack, // 返回上一步
        sortList // 排序子模板
      } = useInitTemp(tempid, version)

      const chargeTypeMap = useChargeType(tempDataRef)
      // const navList = [
      //     { text: '返回', icon: 'share-o', onClick: () => goBack(context.root._router) },
      //     { text: '预览', icon: 'eye-o', onClick: () => context.root._router.push({ path: '/preview/v3', query: { code, tempid } }) },
      //     { ...(type.value === 1 ? { text: '保存', icon: 'pending-payment', onClick: editTemp, type: 'info' } : { text: '新增', icon: 'pending-payment', onClick: () => addTemp(context.root._router), type: 'info' }) }
      // ]
      const navList = createNavList({
        typeRef: type,
        addTemp,
        editTemp,
        goBack,
        router: context.root._router,
        code,
        tempid,
        isSystemTem
      })
      return {
        tempData: tempDataRef,
        isSystemTem,
        addChild,
        deleteChild,
        forbidPermitOrStype,
        editTemp,
        goBack,
        navList,
        type,
        sortList,
        ...chargeTypeMap
      }
    }
}
</script>

<style lang="scss" scoped>
.v3Template {
  padding-bottom: 70px;
  .post-arrow {
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  input {
    &[disabled] {
      color: #999 !important;
    }
  }
  textarea {
    &[disabled] {
      color: #999 !important;
    }
  }
  .post-session {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      left: 15px;
      bottom: 0;
      right: 0;
      height: 1px;
      background: #ddd;
    }
    &:last-child {
      &::after {
        height: 0;
      }
    }
  }
  textarea {
    padding: 10px 15px;
    -webkit-user-select: text;
    border: 1px solid rgba(0,0,0,.2);
    border-radius: 3px;
    outline: 0;
    background-color: #fff;
    -webkit-appearance: none;
    box-sizing: border-box;
    color: #666;
    font-size: 12px;
  }
  .nav {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    height: 46px;
    box-shadow: 0 -2px 12px rgba(100, 101, 102, 0.24);
  }
}
</style>
