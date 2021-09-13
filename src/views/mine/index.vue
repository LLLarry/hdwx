<template>
    <div class="mine bg-gray">
        <div class="header">
            <div class="header-box">
                <div class="userinfo d-flex padding-x-3">
                    <div class="avatar rounded-circle overflow-hidden">
                        <img src="http://thirdwx.qlogo.cn/mmopen/vzSjEuzQolEuhtIWVDSzshLekKhribMxKWqQuX1nH6iaJ8Vx28hryrTVDBh4woYKkHxjzNcbZCLibpjicmPbHq0pg2wMibUOK7gpl/132" alt="">
                    </div>
                    <div class="padding-left-3 text-size-default d-flex flex-column justify-content-around">
                        <p>永夜 - 任志超</p>
                        <p>15093219054</p>
                    </div>
                </div>
                <div class="account margin-top-4 padding-bottom-2 d-flex justify-content-around">
                    <div class="d-flex flex-column align-items-center justify-content-center">
                        <div class="btn-box">余额明细</div>
                    </div>
                    <div class="d-flex flex-column align-items-center justify-content-center">
                        <div class="title margin-bottom-1">账户余额</div>
                        <div class="math-num money">&yen; 3568.12</div>
                    </div>
                    <div class="d-flex flex-column align-items-center justify-content-center">
                        <div class="btn-box">提现到微信</div>
                    </div>
                </div>
            </div>
        </div>
        <main>
            <hd-title exec class="bg-white">我的银行卡</hd-title>
            <van-cell-group>
                <van-cell title="我的银行卡" is-link to="/withdraw/mybankcard">
                    <template #icon>
                        <img class="icon-img margin-right-1" src="../../assets/images/银行类app图标_14.png" alt="">
                    </template>
                </van-cell>
            </van-cell-group>
            <hd-line />

            <hd-title exec class="bg-white">提现管理</hd-title>
            <van-collapse v-model="activeNames">
                <van-collapse-item name="1">
                    <template #title>
                        <div class="d-flex align-items-center">
                            <img class="icon-img margin-right-1" src="../../assets/images/银行类app图标_14.png" alt="">
                            <span>提现</span>
                        </div>
                    </template>
                    <van-cell-group>
                        <van-cell title="提现到微信零钱" label="实时到账" is-link to="/withdraw/wechat"></van-cell>
                        <van-cell title="提现到银行卡" label="第二个工作日到账" is-link></van-cell>
                        <van-cell title="提现到对公账户" label="七个工作日内到账" is-link></van-cell>
                    </van-cell-group>
                </van-collapse-item>
            </van-collapse>
            <van-collapse v-model="activeNames">
                <van-collapse-item name="2">
                    <template #title>
                        <div class="d-flex align-items-center">
                            <img class="icon-img margin-right-1" src="../../assets/images/银行类app图标_14.png" alt="">
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
                <van-cell title="提现记录" is-link>
                    <template #icon>
                        <img class="icon-img margin-right-1" src="../../assets/images/银行类app图标_14.png" alt="">
                    </template>
                </van-cell>
            </van-cell-group>
            <hd-line />

            <hd-title exec class="bg-white">子账号管理</hd-title>
            <van-cell-group>
                <van-cell title="子账号管理" is-link>
                    <template #icon>
                        <img class="icon-img margin-right-1" src="../../assets/images/银行类app图标_14.png" alt="">
                    </template>
                </van-cell>
            </van-cell-group>
            <hd-line />

            <hd-title exec class="bg-white">设置</hd-title>
            <van-collapse v-model="activeNames">
                <van-collapse-item name="3">
                    <template #title>
                        <div class="d-flex align-items-center">
                            <img class="icon-img margin-right-1" src="../../assets/images/银行类app图标_14.png" alt="">
                            <span>设置</span>
                        </div>
                    </template>
                    <van-cell-group>
                        <van-cell title="提现通知">
                            <template #right-icon>
                                <van-switch size="24px" active-color="rgb(7, 193, 96)" v-model="checked" />
                            </template>
                        </van-cell>
                        <van-cell title="订单通知">
                            <template #right-icon>
                                <van-switch size="24px" active-color="rgb(7, 193, 96)" v-model="checked" />
                            </template>
                        </van-cell>
                        <van-cell title="是否显示投币收益 ">
                            <template #right-icon>
                                <van-switch size="24px" active-color="rgb(7, 193, 96)" v-model="checked" />
                            </template>
                        </van-cell>
                        <van-cell title="是否开通脉冲模块自动退费">
                            <template #right-icon>
                                <van-switch size="24px" active-color="rgb(7, 193, 96)" v-model="checked" />
                            </template>
                        </van-cell>
                        <van-cell title="是否开启自动提现">
                            <template #right-icon>
                                <van-switch size="24px" active-color="rgb(7, 193, 96)" v-model="checked" />
                            </template>
                        </van-cell>
                        <van-cell title="是否开通合伙人自动分摊缴费">
                            <template #right-icon>
                                <van-switch size="24px" active-color="rgb(7, 193, 96)" v-model="checked" />
                            </template>
                        </van-cell>
                        <van-cell title="是否开启用户钱包通用">
                            <template #right-icon>
                                <van-switch size="24px" active-color="rgb(7, 193, 96)" v-model="checked" />
                            </template>
                        </van-cell>
                    </van-cell-group>
                </van-collapse-item>
            </van-collapse>
        </main>
    </div>
</template>

<script>
export default {
    data () {
        return {
            activeNames: [],
            checked: true
        }
    }
}
</script>

<style lang="scss">
.mine {
    min-height: 100vh;
    padding-bottom: 60px;
  .header {
    // min-height: 30vh;
    background-color: #4d95ff;
    background-image: url('../../assets/images/bottom_wave.png');
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: 100%;
    padding-bottom: 50px;
    .header-box {
      padding-top: 15%;
      color: rgba(255, 255, 255, .8);
      .userinfo {
          .avatar {
              border: 2px solid rgba(255, 255, 255, 0.8);
              img {
                  display: block;
                  width: 60px;
                  height: 60px;
              }
          }
      }
      .account {
          .money {
              font-size: 20px;
          }
          .btn-box {
              border: 1px solid #fff;
              padding: 3px 10px;
              border-radius: 4px;
              background: rgba(255, 255, 255, .1);
              &:active {
                  background: rgba(255, 255, 255, .2);
              }
          }
      }
    }
  }
  main {
      .icon-img {
          width: 30px;
          font-size: 0;
      }
  }
}
</style>
