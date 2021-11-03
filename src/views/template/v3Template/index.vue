<template>
  <div class="v3Template">
    <template-header :data="tempData" :isSystemTem="isSystemTem"></template-header>
    <!-- 顶部控制区域 -->
    <div class="border-bottom-1 border-ddd">
      <div class="padding-x-2 d-inline-block">
        <template-input>
          充电计费方式：
          <template #input>
            <input
              readonly
              v-model="chargeType"
              :disabled="isSystemTem"
              @click="handleClickChargeType"
              placeholder="请选择充电方式"
              class="padding-x-1 padding-y-1 border-1 border-ccc outline-none"/>
          </template>
          <template #exec>
            <van-icon name="arrow-down" class="position-absolute post-arrow text-666" size="18"/>
          </template>
        </template-input>
      </div>
    </div>
    <div class="border-bottom-1 border-ddd">
      <div class="padding-x-2 d-inline-block">
        <template-input
          input-style="width: 2.5rem;"
          unit="分钟" v-model="tempData.slotcardtime"
          :disabled="isSystemTem"
        >
          刷卡最大充电时间：
        </template-input>
      </div>
    </div>
    <div class="border-bottom-1 border-ddd">
      <div class="padding-x-2 d-flex align-items-center padding-y-2">
        <div>是否支持支付宝充电：</div>
        <van-switch
          v-model="tempData.alipay"
          size="24px"
          :disabled="isSystemTem"
          active-color="#07c160"
        />
      </div>
      <p class="text-p padding-x-2 margin-bottom-1">提示：支付宝充电暂不支持部分退费</p>
    </div>
    <!-- 按电量计费 -->
    <!-- <div class="mid mid1  border-bottom-1 border-ddd" v-hd-mask:[hdMask1Text]="hdMask1">
      <hd-title exec position="center"> 收费标准 （按电量计费）</hd-title>
      <div class="post-session padding-x-2">
          <template-input
            title="每度电收费："
            unit="元"
            input-style="width: 1.5rem;"
            v-model="tempData.common3"
            :disabled="isSystemTem"
          ></template-input>
      </div>
    </div> -->
    <charge-elec :isSystemTem="isSystemTem" :tempData="tempData" />

    <!-- 按电量计费 -->
    <!-- <div class="mid mid2  border-bottom-1 border-ddd" v-hd-mask:[hdMask2Text]="hdMask2">
      <hd-title exec position="center"> 收费标准 （按功率计费）</hd-title>
      <p class="text-p text-center margin-bottom-1">(每小时收费：单位：元，功率区间：单位：瓦)</p>
      <div class="post-session d-flex justify-content-between padding-x-2 padding-y-1" v-for="ctemp in tempData.gather1" :key="ctemp.id">
          <div style="width: 35%;" class="margin-right-1">
            <template-input
              title="每小时："
              title-style="width: 1.7rem;"
              input-style="width: calc(100% - 2.2rem);"
              v-model="ctemp.money"
              :disabled="isSystemTem"
            ></template-input>
          </div>
          <div style="width: 55%;" class="margin-right-2">
            <template-input title="功率区间：" title-style="width: 2rem;">
              <template #input>
                <input
                  v-model="ctemp.common1"
                  :disabled="true"
                  class="padding-x-1 padding-y-1 border-1 border-ccc outline-none"
                  style="width: calc(50% - 1.5rem)"
                />
                &nbsp; <span> ~ </span>&nbsp;
                <input
                  v-model="ctemp.common2"
                  :disabled="isSystemTem"
                  class="padding-x-1 padding-y-1 border-1 border-ccc outline-none"
                  style="width: calc(50% - 1.5rem)"
                />
              </template>
            </template-input>
          </div>
          <van-button :disabled="isSystemTem" class="border-0 d-flex align-items-center justify-content-center padding-x-1" @click="handRemoveCtem('gather1', ctemp)">
            <i class="iconfont icon-shanchu1 text-size-lg text-danger" :style="deleteIconStyle"></i>
          </van-button>
      </div>
      <div class="d-flex justify-content-center margin-y-2">
        <van-button type="primary" class="w-50" size="small" icon="plus" :disabled="isSystemTem" @click="handAddCtem('gather1')">添加一行</van-button>
      </div>
      <p class="text-p margin-bottom-1 padding-x-2">注意：设备能承受的最大功率由机器决定</p>
    </div> -->
    <charge-power
      :isSystemTem="isSystemTem"
      :tempData="tempData"
      @removeChild="removeChild"
      @addChild="addChild"
    />

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

    <!-- <div class="mid mid2  border-bottom-1 border-ddd">
      <hd-title exec position="center"> 按照时间充电 </hd-title>
      <p class="text-p text-center margin-bottom-1">(充电时间：单位：分钟)</p>
      <div class="post-session d-flex justify-content-between padding-x-2 padding-y-1" v-for="ctemp in tempData.gather2" :key="ctemp.id">
          <div style="width: 45%;" class="margin-right-4">
            <template-input
              v-model="ctemp.name"
              :disabled="isSystemTem"
              title="显示名称："
              title-style="width: 2rem;"
              input-style="width: calc(100% - 2.5rem);"
            ></template-input>
          </div>
          <div style="width: 45%;" class="margin-right-2">
            <template-input
              v-model="ctemp.chargeTime"
              :disabled="isSystemTem" title="充电时间："
              title-style="width: 2rem;"
              input-style="width: calc(100% - 2.5rem);"
            ></template-input>
          </div>
          <van-button :disabled="isSystemTem" class="border-0 d-flex align-items-center justify-content-center padding-x-1" @click="handRemoveCtem('gather2', ctemp)">
            <i class="iconfont icon-shanchu1 text-size-lg text-danger" :style="deleteIconStyle"></i>
          </van-button>
      </div>
      <div class="d-flex justify-content-center margin-y-2">
        <van-button type="primary" class="w-50" size="small" icon="plus" :disabled="isSystemTem" @click="handAddCtem('gather2')">添加一行</van-button>
      </div>
    </div> -->
    <charging-time :isSystemTem="isSystemTem" :tempData="tempData" />
    <div class="border-bottom-1 border-ddd">
      <div class="post-session padding-bottom-2">
          <div class="padding-x-2 d-flex align-items-center padding-y-2">
            <div style="width:10em;">是否支持按金额充电:</div>
            <van-switch v-model="tempData.walletpay" size="24px" :disabled="isSystemTem" active-color="#07c160" />
          </div>
          <p class="text-p padding-x-2 margin-bottom-1">说明：按金额充电即为临时充电</p>
      </div>

      <div class="post-session padding-bottom-2">
          <div class="padding-x-2 d-flex align-items-center padding-y-2">
            <div style="width:10em;">是否支持退费:</div>
            <van-switch v-model="tempData.permit" size="24px" :disabled="isSystemTem" active-color="#07c160" />
          </div>
          <p class="text-p padding-x-2 margin-bottom-1">提示：充不完的费用 退回到虚拟钱包，下次充电可用</p>
      </div>

      <div class="post-session">
          <div class="padding-x-2 d-flex align-items-center padding-y-2">
            <div style="width:10em;">默认按金额充电:</div>
            <van-switch v-model="tempData.grade" size="24px" :disabled="isSystemTem" active-color="#07c160" />
          </div>
          <p class="text-p padding-x-2 margin-bottom-1">说明：开启默认按金额充电，用户扫码时默认选中“按金额充电”选项</p>
      </div>
    </div>

      <!-- <div class="mid mid2  border-bottom-1 border-ddd" v-hd-mask:[hdMask3Text]="hdMask3">
        <hd-title exec position="center"> 按照金额充电（临时充电） </hd-title>
        <p class="text-p text-center margin-bottom-1">(充电时间：单位：元)</p>
        <div class="post-session d-flex justify-content-between padding-x-2 padding-y-1" v-for="ctemp in tempData.gather3" :key="ctemp.id">
            <div style="width: 45%;" class="margin-right-4">
              <template-input
                v-model="ctemp.name"
                :disabled="isSystemTem"
                title="显示名称："
                title-style="width: 2rem;"
                input-style="width: calc(100% - 2.5rem);"
              ></template-input>
            </div>
            <div style="width: 45%;" class="margin-right-2">
              <template-input
              v-model="ctemp.money"
              :disabled="isSystemTem"
              title="付款金额："
              title-style="width: 2rem;"
              input-style="width: calc(100% - 2.5rem);"
            ></template-input>
            </div>
            <van-button  :disabled="isSystemTem" class="border-0 d-flex align-items-center justify-content-center padding-x-1" @click="handRemoveCtem('gather3', ctemp)">
              <i class="iconfont icon-shanchu1 text-size-lg text-danger" :style="deleteIconStyle"></i>
            </van-button>
        </div>
        <div class="d-flex justify-content-center margin-y-2">
          <van-button type="primary" class="w-50" size="small" icon="plus" :disabled="isSystemTem" @click="handAddCtem('gather3')">添加一行</van-button>
        </div>
        <p class="text-p padding-x-2 margin-bottom-1">备注：默认按照金额给予小功率电动车充电时间，如果电动车功率大，费用用完会提前自动停止。如果费用没有用完，如果支持退回虚拟钱包，就退回虚拟钱包，下次充电可用。如果不支持退费，不承担充电过程中的风险</p>
      </div> -->
      <charging-money :isSystemTem="isSystemTem" :tempData="tempData" />
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
        @select="handleSelectChargeType"
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
// import { getV3TempData } from '@/require/member'
import { inquireDeviceTemlata } from '@/require/template'
import { addChildTemHelper, handRemoveChildTem } from './helper'
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
    data () {
      return {
        alipay: true,
        oldTempData: {}, // 旧的模板信息，目的是为了对比新的模板是否进行了更改
        tempData: {},
        navList: [
          { text: '返回', icon: 'share-o' },
          { text: '预览', icon: 'eye-o' },
          { text: '保存', icon: 'pending-payment', onClick: this.handleSave, type: 'info' }
        ],
        chargeTypeIsShow: false // 选择充电类型是否展示
        // hdMask1: false,
        // hdMask1Text: '<span class="text-danger">未开启按电量计费<span>',
        // hdMask2: false,
        // hdMask2Text: '<span class="text-danger">未开启功率计费<span>',
        // hdMask3: false,
        // hdMask3Text: '<span class="text-danger">未开启临时充电<span>'
      }
    },
    computed: {
      // 充电类型
      chargeType () {
        const type = this.tempData.morm
        return type === 1 ? '按照最大功率计费' : type === 2 ? '按照实时功率计费' : type === 3 ? '按照电量计费' : '按照最大功率计费'
      },
      // 是否是系统模板
      isSystemTem () {
        // return this.tempData.merchantid === 0
        return false
      },
      // // 当系统模板时，颜色变为半透明
      // deleteIconStyle () {
      //   return { opacity: this.isSystemTem ? 0.5 : 1 }
      // },
      actions () {
        const { common2 } = this.tempData
        return [
          { id: 1, name: '按照最大功率计费', subname: '按照充电设备上传的最大功率计费', color: (common2 !== 2 && common2 !== 3) ? '#07c160' : undefined },
          { id: 2, name: '按照实时功率计费', subname: '按照充电设备上传的实时功率计费', color: common2 === 2 ? '#07c160' : undefined },
          { id: 3, name: '按照电量计费', subname: '按照用户实际使用的电量计费', color: common2 === 3 ? '#07c160' : undefined }
        ]
      }
      // hdMask1 () { // 按电量计费遮罩层是否显示
      //   return this.tempData.common2 !== 3
      // },
      // hdMask2 () { // 按功率计费遮罩层是否显示
      //   return this.tempData.common2 === 3
      // },
      // hdMask3 () { // 按金额充电遮罩层是否显示
      //   return this.tempData.walletpay === 2
      // }
    },
    async mounted () {
      const { resultdata } = await inquireDeviceTemlata({ tempid: 4, version: '08' })
      if (resultdata) {
        this.tempData = resultdata
      }
    },
    methods: {
      handleSave () {
        console.log(JSON.stringify(this.tempData, null, 2))
      },
      handleSelectChargeType (row) {
          this.$set(this.tempData, 'common2', row.id)
      },
      handleClickChargeType () {
        this.chargeTypeIsShow = true
      },
      // 添加子模板
      addChild ({ from }) {
        addChildTemHelper.call(this, from)
      },
      // 删除子模板
      removeChild ({ from, id }) {
        handRemoveChildTem.call(this, from, id)
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
