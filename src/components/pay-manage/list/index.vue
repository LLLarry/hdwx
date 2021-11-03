<template>
  <div class="table-pay">
      <van-sticky>
            <van-row class="d-flex post-border-row post-header margin-x-3 text-size-sm font-weight-bold">
                <van-col :span="4" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">设备号</van-col>
                <van-col :span="6" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">设备名</van-col>
                <van-col :span="6" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">到期时间</van-col>
                <van-col :span="5" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">应缴金额</van-col>
                <van-col :span="4" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">选择</van-col>
            </van-row>
        </van-sticky>
        <div class="scroll-wrapper">
            <van-checkbox-group v-model="selectList">
                <van-row class="d-flex post-border-row margin-x-3 text-size-sm text-666" v-for="item in initList" :key="item.code">
                    <van-col :span="4" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">{{item.code}}</van-col>
                    <van-col :span="6" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">{{ item.remark || '— —'  }}</van-col>
                    <van-col :span="6" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center" :class="item.class">{{ item.expiratimes }}</van-col>
                    <van-col :span="5" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">{{ item.money }}</van-col>
                    <van-col :span="4" class="post-border-col padding-y-2 padding-x-1 d-flex align-items-center justify-content-center">
                        <van-checkbox :name="item.code"></van-checkbox>
                    </van-col>
                </van-row>
            </van-checkbox-group>
        </div>
  </div>
</template>

<script>
import { inject } from '@vue/composition-api'
export default {
    setup () {
        // 选择的设备列表
        const selectList = inject('selectList')
        const initList = inject('initList')
        return {
            selectList,
            initList
        }
    }
}
</script>

<style lang="scss">
.table-pay {
    height: calc(100% - 50px);
    .scroll-wrapper {
        height: calc(100% - 40px);
        overflow: auto;
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
    .red {
        color: #ee0a24 !important;
    }
    .orange {
        color: #ff976a !important;
    }
}
</style>
