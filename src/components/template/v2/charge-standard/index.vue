<template>
    <!-- 按电量计费 -->
    <div class="charge-standard mid border-bottom-1 border-ddd border-top-1">
      <hd-title exec position="center"> 收费标准 </hd-title>
      <div class="post-session padding-x-2 d-flex" v-for="item in tempData.tempson" :key="item.id">
          <hd-card>
              <hd-card-item style="padding: 0">
                  <template-input
                        title="显示名称："
                        :titleStyle="{color: '#666', fontSize: '0.32rem'}"
                    >
                        <template #input>
                            <input
                                style="width: 1.9rem; font-size: 0.32rem"
                                class="padding-x-1 padding-y-1 border-1 border-ccc outline-none"
                                v-model="item.sonname"
                                :disabled="isSystemTem"
                            >
                        </template>
                    </template-input>
              </hd-card-item>

              <hd-card-item style="padding: 0">
                  <template-input
                        title="充电价格："
                        :titleStyle="{color: '#666', fontSize: '0.32rem'}"
                    >
                        <template #input>
                            <input
                                style="width: 1.2rem; font-size: 0.32rem"
                                class="padding-x-1 padding-y-1 border-1 border-ccc outline-none"
                                v-model="item.paymoney"
                                :disabled="isSystemTem"
                            >
                        </template>
                        <template #exec>
                           <span class="text-p text-size-sm margin-left-1">元</span>
                        </template>
                    </template-input>
              </hd-card-item>

              <hd-card-item style="padding: 0">
                   <template-input
                        title="充电时间："
                        :titleStyle="{color: '#666', fontSize: '0.32rem'}"
                    >
                        <template #input>
                            <input
                                style="width: 1.2rem; font-size: 0.32rem"
                                class="padding-x-1 padding-y-1 border-1 border-ccc outline-none"
                                v-model="item.chargeTime"
                                :disabled="isSystemTem"
                            >
                        </template>
                        <template #exec>
                           <span class="text-p text-size-sm margin-left-1">分钟</span>
                        </template>
                    </template-input>
              </hd-card-item>

               <hd-card-item style="padding: 0">
                   <template-input
                        title="消耗电量："
                        :titleStyle="{color: '#666', fontSize: '0.32rem'}"
                    >
                        <template #input>
                            <input
                                style="width: 1.2rem; font-size: 0.32rem"
                                class="padding-x-1 padding-y-1 border-1 border-ccc outline-none"
                                v-model="item.chargeQuantity"
                                :disabled="isSystemTem"
                            >
                        </template>
                        <template #exec>
                           <span class="text-p text-size-sm margin-left-1">度</span>
                        </template>
                    </template-input>
              </hd-card-item>
          </hd-card>
          <div class="delete-one d-flex align-items-center">
                <van-button
                    :disabled="isSystemTem"
                    class="border-0 d-flex align-items-center justify-content-center padding-x-1"
                    @click="deleteChildFn(item)"
                >
                    <i class="iconfont icon-shanchu1 text-size-lg text-danger" />
                </van-button>
          </div>
      </div>
      <div class="d-flex justify-content-center margin-y-2">
            <van-button
                type="primary"
                class="w-50"
                size="small"
                icon="plus"
                :disabled="isSystemTem"
                @click="addChildFn"
            >添加一行</van-button>
      </div>
    </div>
</template>

<script>
import TemplateInput from '@/components/template/template-input'
import HdCard from '@/components/hd-card'
import HdCardItem from '@/components/hd-card-item'
export default {
    components: {
        TemplateInput,
        HdCard,
        HdCardItem
    },
    props: {
        tempData: {
            type: Object,
            default: () => ({})
        },
        isSystemTem: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        deleteChildFn (item) {
            this.$emit('deleteChild', item)
        },
        addChildFn () {
            this.$emit('addChild')
        }
    }
}
</script>

<style lang="scss" scoped>
.charge-standard {
    .post-session {
        position: relative;
        margin-bottom: 10px;
        &::after {
            content: '';
            position: absolute;
            left: 10px;
            bottom: 0;
            right: 10px;
            height: 1px;
            background: #ddd;
        }
    }
}
</style>

<style lang="scss">
[theme="dark"] {
   .charge-standard {
        .post-session {
            &::after {
                background: #222;
            }
        }
   }
}
</style>
