<template>
  <div
    class="wallet-refund delete-item shadow padding-3 d-flex justify-content-around align-items-center"
    @click="handleShow"
  >
    <svg-icon icon="wallet_refund" class="wallet_refund" />
    <span>钱包退款</span>

    <!-- 删除钱包 -->
    <hd-overlay
      :show="refundVisible"
      title="钱包退款"
      @close="refundVisible = false"
    >
      <svg-icon icon="undraw_discount_d-4-bd" :style="styleMap" />
      <h5 class="text-center text-size-sm margin-top-3 margin-bottom-2">
        退款说明
      </h5>
      <div class="text-center text-size-sm">
        当前退费仅对“充值余额”（<span
          class="text-success text-size-md font-weight-bold"
          >¥{{ topupmoney }}</span
        >）进行退费;“赠送余额”不予退费;退费成功后支付金额“将原路退回”并且“赠送余额”也会随之清零;
      </div>

      <van-button
        type="info"
        size="small"
        class="w-100 margin-top-2"
        @click="onConfirm"
      >
        <span class="position-relative">确认退款</span>
      </van-button>

      <van-button
        size="small"
        class="w-100 margin-top-2"
        @click="refundVisible = false"
      >
        <span class="position-relative">暂不退款</span>
      </van-button>
    </hd-overlay>
  </div>
</template>

<script>
import hdOverlay from '@/components/hd-overlay'
export default {
  components: {
    hdOverlay
  },
  data() {
    return {
      refundVisible: false,
      topupmoney: '— —'
    }
  },
  computed: {
    styleMap() {
      return {
        fontSize: '100px',
        display: 'block',
        margin: '0 auto'
      }
    }
  },
  methods: {
    handleShow() {
      const { topupmoney } = this.$parent.$data.member
      this.topupmoney = topupmoney
      this.refundVisible = true
    },
    onConfirm() {
      this.refundVisible = false
    }
  }
}
</script>
