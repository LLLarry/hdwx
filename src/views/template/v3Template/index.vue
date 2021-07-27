<template>
  <div class="v3Template">
    <template-header :data="tempData"></template-header>
    <!-- 顶部控制区域 -->
    <div class="border-bottom-1 border-ddd">
      <div class="padding-x-2 d-inline-block">
        <template-input placeholder="请选择充电方式" readonly v-model="chargeType">
          充电计费方式：
          <template #exec>
            <van-icon name="arrow-down" class="position-absolute post-arrow text-666" size="18"/>
          </template>
        </template-input>
      </div>
    </div>
    <div class="border-bottom-1 border-ddd">
      <div class="padding-x-2 d-inline-block">
        <template-input input-style="width: 2.5rem;" unit="分钟" v-model="number">
          刷卡最大充电时间：
        </template-input>
      </div>
    </div>
    <div class="border-bottom-1 border-ddd">
      <div class="padding-x-2 d-flex align-items-center padding-y-2">
        <div>是否支持支付宝充电：</div>
        <van-switch v-model="alipay" size="24px" />
      </div>
      <p class="text-p padding-x-2 margin-bottom-1">提示：支付宝充电暂不支持部分退费</p>
    </div>
    <!-- 按电量计费 -->
    <div class="mid mid1  border-bottom-1 border-ddd">
      <hd-title exec position="center"> 收费标准 （按电量计费）</hd-title>
      <div class="post-session padding-x-2">
          <template-input title="每度电收费：" unit="元" input-style="width: 1.5rem;" v-model="tempData.common3"></template-input>
      </div>
    </div>

    <!-- 按电量计费 -->
    <div class="mid mid2  border-bottom-1 border-ddd">
      <hd-title exec position="center"> 收费标准 （按功率计费）</hd-title>
      <p class="text-p text-center margin-bottom-1">(每小时收费：单位：元，功率区间：单位：瓦)</p>
      <div class="post-session d-flex justify-content-between padding-x-2 padding-y-1" v-for="ctemp in tempData.gather1" :key="ctemp.id">
          <div style="width: 35%;" class="margin-right-1">
            <template-input title="每小时：" title-style="width: 1.7rem;" input-style="width: calc(100% - 2.2rem);" v-model="ctemp.money"></template-input>
          </div>
          <div style="width: 55%;" class="margin-right-2">
            <template-input title="功率区间：" title-style="width: 2rem;">
              <template #input>
                <input v-model="ctemp.common1" class="padding-x-1 padding-y-1 border-1 border-ccc outline-none" style="width: calc(50% - 1.5rem)"/>
                &nbsp; <span> ~ </span>&nbsp;
                <input v-model="ctemp.common2" class="padding-x-1 padding-y-1 border-1 border-ccc outline-none" style="width: calc(50% - 1.5rem)"/>
              </template>
            </template-input>
          </div>
          <div class="d-flex align-items-center justify-content-center padding-x-1">
            <i class="iconfont icon-shanchu1 text-size-lg text-danger"></i>
          </div>
      </div>
      <div class="d-flex justify-content-center margin-y-2">
        <van-button type="primary" class="w-50" size="small" icon="plus">添加一行</van-button>
      </div>
      <p class="text-p margin-bottom-1 padding-x-2">注意：设备能承受的最大功率由机器决定</p>
      <div class="padding-x-2 margin-bottom-2">
        <div class="margin-y-2 text-p">收费说明：</div>
        <textarea v-model="tempData.chargeInfo" class="d-block w-100" rows="5" placeholder="请输入充电说明"></textarea>
      </div>
    </div>

    <div class="mid mid2  border-bottom-1 border-ddd">
      <hd-title exec position="center"> 按照时间充电 </hd-title>
      <p class="text-p text-center margin-bottom-1">(充电时间：单位：分钟)</p>
      <div class="post-session d-flex justify-content-between padding-x-2 padding-y-1" v-for="ctemp in tempData.gather2" :key="ctemp.id">
          <div style="width: 45%;" class="margin-right-4">
            <template-input v-model="ctemp.name" title="显示名称：" title-style="width: 2rem;" input-style="width: calc(100% - 2.5rem);"></template-input>
          </div>
          <div style="width: 45%;" class="margin-right-2">
            <template-input v-model="ctemp.chargeTime" title="充电时间：" title-style="width: 2rem;" input-style="width: calc(100% - 2.5rem);"></template-input>
          </div>
          <div class="d-flex align-items-center justify-content-center padding-x-1">
            <i class="iconfont icon-shanchu1 text-size-lg text-danger"></i>
          </div>
      </div>
      <div class="d-flex justify-content-center margin-y-2">
        <van-button type="primary" class="w-50" size="small" icon="plus">添加一行</van-button>
      </div>
    </div>

    <div class="border-bottom-1 border-ddd">
      <div class="post-session padding-bottom-2">
          <div class="padding-x-2 d-flex align-items-center padding-y-2">
            <div style="width:10em;">是否支持按金额充电:</div>
            <van-switch v-model="alipay" size="24px" />
          </div>
          <p class="text-p padding-x-2 margin-bottom-1">说明：按金额充电即为临时充电</p>
      </div>

      <div class="post-session padding-bottom-2">
          <div class="padding-x-2 d-flex align-items-center padding-y-2">
            <div style="width:10em;">是否支持退费:</div>
            <van-switch v-model="alipay" size="24px" />
          </div>
          <p class="text-p padding-x-2 margin-bottom-1">提示：充不完的费用 退回到虚拟钱包，下次充电可用</p>
      </div>

      <div class="post-session">
          <div class="padding-x-2 d-flex align-items-center padding-y-2">
            <div style="width:10em;">默认按金额充电:</div>
            <van-switch v-model="alipay" size="24px" />
          </div>
          <p class="text-p padding-x-2 margin-bottom-1">说明：开启默认按金额充电，用户扫码时默认选中“按金额充电”选项</p>
      </div>
    </div>

    <div class="mid mid2  border-bottom-1 border-ddd">
        <hd-title exec position="center"> 按照金额充电（临时充电） </hd-title>
        <p class="text-p text-center margin-bottom-1">(充电时间：单位：元)</p>
        <div class="post-session d-flex justify-content-between padding-x-2 padding-y-1" v-for="ctemp in tempData.gather3" :key="ctemp.id">
            <div style="width: 45%;" class="margin-right-4">
              <template-input v-model="ctemp.name" title="显示名称：" title-style="width: 2rem;" input-style="width: calc(100% - 2.5rem);"></template-input>
            </div>
            <div style="width: 45%;" class="margin-right-2">
              <template-input v-model="ctemp.money" title="付款金额：" title-style="width: 2rem;" input-style="width: calc(100% - 2.5rem);"></template-input>
            </div>
            <div class="d-flex align-items-center justify-content-center padding-x-1">
              <i class="iconfont icon-shanchu1 text-size-lg text-danger"></i>
            </div>
        </div>
        <div class="d-flex justify-content-center margin-y-2">
          <van-button type="primary" class="w-50" size="small" icon="plus">添加一行</van-button>
        </div>
        <p class="text-p padding-x-2 margin-bottom-1">备注：默认按照金额给予小功率电动车充电时间，如果电动车功率大，费用用完会提前自动停止。如果费用没有用完，如果支持退回虚拟钱包，就退回虚拟钱包，下次充电可用。如果不支持退费，不承担充电过程中的风险</p>
      </div>
       <van-button type="primary" class="w-50" size="small" @click="handleSave">保存</van-button>
  </div>
</template>

<script>
import TemplateHeader from '@/components/template/template-header'
import TemplateInput from '@/components/template/template-input'
import { getV3TempData } from '@/require/member'
export default {
    components: {
        TemplateHeader,
        TemplateInput
    },
    data () {
      return {
        alipay: true,
        number: 99,
        tempData: {}
      }
    },
    computed: {
      // 充电类型
      chargeType () {
        const type = this.tempData.common2
        return type === 1 ? '按照最大功率计费' : type === 2 ? '按照实时功率计费' : type === 3 ? '按照电量计费' : ''
      }
    },
    async mounted () {
      const { templatev3 } = await getV3TempData({})
      if (templatev3) {
        console.log(templatev3)
        this.tempData = templatev3
      }
    },
    methods: {
      handleSave () {
        console.log(JSON.stringify(this.tempData, null, 2))
      }
    }
}
</script>

<style lang="scss" scoped>
.v3Template {
  .post-arrow {
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
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
}
</style>
