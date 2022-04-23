<template>
  <div>
    <hd-title class="bg-white" v-hd-permission="[0, 2, 4]">我的银行卡</hd-title>
    <van-cell-group v-hd-permission="[0, 2, 4]">
      <van-cell title="我的银行卡" is-link to="/withdraw/mybankcard">
        <template #icon>
          <img
            class="icon-img margin-right-1"
            src="../../../assets/images/mine/卡片.png"
            alt=""
          />
        </template>
      </van-cell>
    </van-cell-group>
    <hd-line v-hd-permission="[0, 2, 4]" />

    <hd-title class="bg-white">提现管理</hd-title>
    <van-collapse v-model="activeNames">
      <van-collapse-item name="1" v-hd-permission="[0, 2, 4]">
        <template #title>
          <div class="d-flex align-items-center">
            <img
              class="icon-img margin-right-1"
              src="../../../assets/images/mine/提现.png"
              alt=""
            />
            <span>提现</span>
          </div>
        </template>
        <van-cell-group>
          <van-cell
            title="提现到微信零钱"
            label="实时到账"
            is-link
            v-if="isShowWechatRefud"
            to="/withdraw/page/3"
          ></van-cell>
          <van-cell
            title="提现到银行卡"
            label="第二个工作日到账"
            is-link
            v-if="isShowPersonalBankRefud"
            @click="handleGoWithdraw(1)"
          ></van-cell>
          <van-cell
            title="提现到对公账户"
            label="七个工作日内到账"
            is-link
            @click="handleGoWithdraw(2)"
          ></van-cell>
        </van-cell-group>
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames">
      <van-collapse-item name="2">
        <template #title>
          <div class="d-flex align-items-center">
            <img
              class="icon-img margin-right-1"
              src="../../../assets/images/mine/团型说明.png"
              alt=""
            />
            <span>提现说明</span>
          </div>
        </template>
        <div class="text-666">
          <div class="text-000 font-weight-bold">提示</div>
          <ul class="text-size-sm padding-left-2 margin-top-1">
            <li>1.提现到零钱：需微信实名认证，实时到账，限额10000</li>
            <li>2.提现到银行卡：需要审核，第二个工作到账</li>
            <li>3.提现到对公账户：七个工作日内到账</li>
          </ul>
        </div>
      </van-collapse-item>
    </van-collapse>
    <van-cell-group>
      <van-cell title="提现记录" is-link to="/withdraw/record">
        <template #icon>
          <img
            class="icon-img margin-right-1"
            src="../../../assets/images/mine/订单 (1).png"
            alt=""
          />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { checkAndGo } from '@/views/withdraw/helper'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      activeNames: []
      // bankCardList: [], // 个人银行卡
      // companyBnkCardList: [] // 对公账户银行卡
    }
  },
  methods: {
    // 跳转到 提现到银行卡 / 对公账户
    handleGoWithdraw(type) {
      checkAndGo(type)
      // try {
      //     const { bankCardList = [], companyBnkCardList = [] } = await getBankList()
      //     this.bankCardList = bankCardList
      //     this.companyBnkCardList = companyBnkCardList
      //     const one = this[type === 1 ? 'bankCardList' : 'companyBnkCardList'][0]
      //     if (one) {
      //         this.$router.push({ path: `/withdraw/page/${type}`, query: { id: one.id } })
      //     } else {
      //         this.$dialog.alert({
      //             title: '提示',
      //             message: type === 1 ? '对不起，您暂时未添加银行卡，请先添加银行卡！' : '对不起，您暂时未添加对公账户，请先添加对公账户！'
      //         })
      //     }
      // } catch (error) {
      //     this.$toast(error)
      // }
    }
  },
  computed: {
    ...mapGetters(['isShowWechatRefud', 'isShowPersonalBankRefud'])
  }
}
</script>
