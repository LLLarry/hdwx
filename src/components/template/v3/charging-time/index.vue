<template>
     <div class="mid mid2  border-bottom-1 border-ddd">
      <hd-title exec position="center"> 按照时间充电 </hd-title>
      <p class="text-p text-center margin-bottom-1">(充电时间：单位：分钟)</p>
      <hd-drag
        :list="tempData.temtime"
        :disabled="isSystemTem"
        from="temtime"
        @sortList="sortList"
      >
        <div class="post-session d-flex justify-content-between padding-x-2 padding-y-1" v-for="ctemp in tempData.temtime" :key="ctemp.id">
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
                    title="充电时间："
                    :titleStyle="{width: '2rem', color: '#666', fontSize: '0.32rem'}"
                >
                  >
                    <template #input>
                      <input
                        class="padding-x-1 padding-y-1 border-1 border-ccc outline-none"
                        v-model="ctemp.chargeTime"
                        :disabled="isSystemTem"
                        style="width: calc(100% - 2.5rem); font-size: 0.32rem"
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
        <van-button type="primary" class="w-50" size="small" icon="plus" :disabled="isSystemTem" @click="handAddCtem">添加一行</van-button>
      </div>
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
        // 当系统模板时，颜色变为半透明
        deleteIconStyle () {
            return { opacity: this.isSystemTem ? 0.5 : 1 }
        }
    },
    methods: {
      handAddCtem () {
        this.$emit('addChild', { from: 'temtime' })
      },
      handleRemoveChild (id) {
        this.$emit('removeChild', { from: 'temtime', id })
      }
    }
}
</script>

<style>

</style>
