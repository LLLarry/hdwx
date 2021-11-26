<template>
  <!-- 按电量计费 -->
    <div class="mid mid1  border-bottom-1 border-ddd" v-hd-mask:[hdMask1Text]="hdMask1">
      <hd-title exec position="center"> 收费标准 （按电量计费）</hd-title>
      <div class="post-session padding-x-2">
          <template-input
            title="每度电收费："
            :titleStyle="{color: '#666', fontSize: '0.32rem'}"
            class="d-flex justify-content-center"
          >
            <template #input>
                <input
                    style="width: 1.5rem; font-size: 0.32rem"
                    class="padding-x-1 padding-y-1 border-1 border-ccc outline-none"
                    v-model="tempData.elecnorm"
                    :disabled="isSystemTem"
                >
            </template>
            <template #exec>
                <span class="text-p text-size-sm margin-left-1">元</span>
            </template>
          </template-input>
      </div>
    </div>
</template>

<script>
import TemplateInput from '@/components/template/template-input'
export default {
    components: {
        TemplateInput
    },
    props: {
        isSystemTem: { // 是否是系统模板
            type: Boolean,
            default: false
        },
        tempData: { // 模板信息
            type: Object,
            default: () => {}
        }
    },
    computed: {
        hdMask1 () { // 按电量计费遮罩层是否显示
            return this.tempData.morm !== 3 && this.tempData.morm !== 4
        }
    },
    data () {
        return {
            hdMask1Text: '<span class="text-danger">未开启按电量计费<span>'
        }
    }
}
</script>

<style>

</style>
