<template>
     <div class="mid mid2  border-bottom-1 border-ddd" v-hd-mask:[hdMask3Text]="hdMask3">
        <hd-title exec position="center"> 按照金额充电（临时充电） </hd-title>
        <p class="text-p text-center margin-bottom-1">(充电时间：单位：元)</p>
        <hd-drag
          :list="tempData.temmoney"
          :disabled="isSystemTem"
          from="temmoney"
          @sortList="sortList"
        >
          <div class="post-session d-flex justify-content-between padding-x-2 padding-y-1" v-for="ctemp in tempData.temmoney" :key="ctemp.id">
              <div style="width: 45%;" class="margin-right-4">
                <template-input
                  title="显示名称："
                  :titleStyle="{width: '2rem', color: '#666', fontSize: '0.32rem'}"
                >
                <template #input>
                    <input
                      class="padding-x-1 padding-y-1 border-1 border-ccc outline-none"
                      v-model="ctemp.sonname"
                      :disabled="isSystemTem"
                      style="width: calc(100% - 2.5rem); font-size: 0.32rem"
                    />
                </template>
                </template-input>
              </div>
              <div style="width: 45%;" class="margin-right-2">
                <template-input
                title="付款金额："
                :titleStyle="{width: '2rem', color: '#666', fontSize: '0.32rem'}"
              >
                <template #input>
                    <input
                      class="padding-x-1 padding-y-1 border-1 border-ccc outline-none"
                      v-model="ctemp.paymoney"
                      :disabled="isSystemTem"
                      style="width: calc(100% - 2.5rem); font-size: 0.32rem"
                    />
                </template>
              </template-input>
              </div>
              <van-button  :disabled="isSystemTem" class="border-0 d-flex align-items-center justify-content-center padding-x-1" @click="handleRemoveChild(ctemp.id)">
                <i class="iconfont icon-shanchu1 text-size-lg text-danger" :style="deleteIconStyle"></i>
              </van-button>
          </div>
        </hd-drag>
        <div class="d-flex justify-content-center margin-y-2">
          <van-button type="primary" class="w-50" size="small" icon="plus" :disabled="isSystemTem" @click="handAddCtem">添加一行</van-button>
        </div>
        <p class="text-p padding-x-2 margin-bottom-1 text-size-sm">备注：默认按照金额给予小功率电动车充电时间，如果电动车功率大，费用用完会提前自动停止。如果费用没有用完，且支持退费，那么余额就退回虚拟钱包，下次充电可用。如果不支持退费，无论费用是否用完，都不退回退回虚拟钱包！</p>
      </div>
</template>

<script>
import TemplateInput from '@/components/template/template-input'
import HdDrag from '@/components/hd-drag'
export default {
    components: {
        TemplateInput,
        HdDrag
    },
    props: {
        isSystemTem: { // 是否是系统模板
            type: Boolean,
            default: false
        },
        tempData: { // 模板信息
            type: Object,
            default: () => {}
        },
        sortList: {
          type: Function
        }
    },
    computed: {
        hdMask3 () { // 按金额充电遮罩层是否显示
            return this.tempData.ifwalletpay === 2
        },
        // 当系统模板时，颜色变为半透明
        deleteIconStyle () {
            return { opacity: this.isSystemTem ? 0.5 : 1 }
        }
    },
    data () {
        return {
            hdMask3Text: `
              <p class="text-danger">未开启临时充电</p>
              <p class="text-danger text-size-md margin-top-1">（可在上面“是否支持按金额充电”中开启）</p>
            `
        }
    },
    methods: {
      handAddCtem (from) {
        this.$emit('addChild', { from: 'temmoney' })
      },
      handleRemoveChild (id) {
        this.$emit('removeChild', { from: 'temmoney', id })
      }
    }
}
</script>

<style>

</style>
