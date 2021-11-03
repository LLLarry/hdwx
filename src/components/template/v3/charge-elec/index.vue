<template>
  <!-- 按电量计费 -->
    <div class="mid mid1  border-bottom-1 border-ddd" v-hd-mask:[hdMask1Text]="hdMask1">
      <hd-title exec position="center"> 收费标准 （按电量计费）</hd-title>
      <div class="post-session padding-x-2">
          <template-input
            title="每度电收费："
            unit="元"
            input-style="width: 1.5rem;"
            v-model="tempData.elecnorm"
            :disabled="isSystemTem"
          ></template-input>
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
            return this.tempData.common2 !== 3
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
