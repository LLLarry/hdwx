<template>
  <div class="mid mid2  border-bottom-1 border-ddd" v-hd-mask:[hdMask2Text]="hdMask2">
      <hd-title exec position="center"> 收费标准 （按功率计费）</hd-title>
      <p class="text-p text-center margin-bottom-1">(每小时收费：单位：元，功率区间：单位：瓦)</p>
      <hd-drag
        :list="tempData.tempower"
        :disabled="isSystemTem"
        from="tempower"
        @sortList="sortList"
      >
        <div class="post-session d-flex justify-content-between padding-x-2 padding-y-1" v-for="ctemp in tempData.tempower" :key="ctemp.id">
            <div style="width: 35%;" class="margin-right-1">
              <template-input
                title="每小时："
                :titleStyle="{width: '1.6rem', color: '#666', fontSize: '0.32rem'}"
              >
                <template #input>
                  <input
                      v-model="ctemp.paymoney"
                      :disabled="isSystemTem"
                      class="padding-x-1 padding-y-1 border-1 border-ccc outline-none"
                      style="width: calc(100% - 2.2rem); font-size: 0.32rem;"
                    />
                </template>
              </template-input>
            </div>
            <div style="width: 55%;" class="margin-right-2">
              <template-input
                title="功率区间："
                :titleStyle="{width: '2rem', color: '#666', fontSize: '0.32rem'}"
              >
                <template #input>
                  <input
                    v-model="ctemp.startpower"
                    :disabled="isSystemTem"
                    class="padding-x-1 padding-y-1 border-1 border-ccc outline-none"
                    style="width: calc(50% - 1.5rem); font-size: 0.32rem;"
                  />
                  &nbsp; <span> ~ </span>&nbsp;
                  <input
                    v-model="ctemp.stoppower"
                    :disabled="isSystemTem"
                    class="padding-x-1 padding-y-1 border-1 border-ccc outline-none"
                    style="width: calc(50% - 1.5rem)"
                  />
                </template>
              </template-input>
            </div>
            <van-button :disabled="isSystemTem" class="border-0 d-flex align-items-center justify-content-center padding-x-1" @click="handleRemoveChild(ctemp.id)">
              <i class="iconfont icon-shanchu1 text-size-lg text-danger" :style="deleteIconStyle"></i>
            </van-button>
        </div>
      </hd-drag>
      <div class="d-flex justify-content-center margin-y-2">
        <van-button type="primary" class="w-50" size="small" icon="plus" :disabled="isSystemTem" @click="handAddCtem('temmoney')">添加一行</van-button>
      </div>
      <p class="text-p margin-bottom-1 padding-x-2 text-size-sm">注意：设备能承受的最大功率由机器决定</p>
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
        hdMask2 () { // 按功率计费遮罩层是否显示
            return this.tempData.morm === 3
        },
        // 当系统模板时，颜色变为半透明
        deleteIconStyle () {
            return { opacity: this.isSystemTem ? 0.5 : 1 }
        }
    },
    data () {
        return {
            hdMask2Text: `
              <p class="text-danger">未开启功率计费</p>
              <p class="text-danger text-size-md margin-top-1">（可在上面“充电计费方式”中开启）</p>
            `
        }
    },
    methods: {
      handAddCtem (from) {
        this.$emit('addChild', { from: 'tempower' })
      },
      handleRemoveChild (id) {
        this.$emit('removeChild', { from: 'tempower', id })
      }
    }
}
</script>

<style lang="scss">
.post-session {
  &:active {
    background: rgba(0, 0, 0, .1);
  }
}
</style>
