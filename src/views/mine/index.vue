<template>
    <div class="mine bg-gray">
        <div class="header">
            <div class="header-box">
                <div class="userinfo d-flex padding-x-3">
                    <div class="avatar rounded-circle overflow-hidden">
                        <img :src="user.headimgurl" alt="">
                    </div>
                    <div class="padding-left-3 text-size-default d-flex flex-column justify-content-around">
                        <p>
                            <span>{{user.username}}</span>
                            <span v-if="user.realname">- {{user.realname}}</span>
                        </p>
                        <p>{{user.phoneNum}}</p>
                    </div>
                </div>
                <div class="account margin-top-4 padding-bottom-2 d-flex justify-content-around">
                    <div class="d-flex flex-column align-items-center justify-content-center">
                        <div class="btn-box">余额明细</div>
                    </div>
                    <div class="d-flex flex-column align-items-center justify-content-center">
                        <div class="title margin-bottom-1">账户余额</div>
                        <div class="math-num money">&yen; {{merincome | fmtMoney}}</div>
                    </div>
                    <div class="d-flex flex-column align-items-center justify-content-center">
                        <div class="btn-box" @click="$router.push({ path: '/withdraw/page/3' })">提现到微信</div>
                    </div>
                </div>
            </div>
        </div>
        <main>
            <!-- 提现管理 -->
            <withdraw-manager />
            <hd-line />
            <!-- 子账号管理 -->
            <hd-title class="bg-white">子账号管理</hd-title>
            <van-cell-group>
                <van-cell title="子账号管理" is-link>
                    <template #icon>
                        <img class="icon-img margin-right-1" src="../../assets/images/mine/账号信息.png" alt="">
                    </template>
                </van-cell>
            </van-cell-group>
            <hd-line />
            <!-- 设置管理 -->
            <setting :authority="authority" :servephone="servephone"/>
        </main>
    </div>
</template>

<script>
import { skipPersonCenter } from '@/require/mine'
import { mapState } from 'vuex'
import WithdrawManager from '@/components/mine/withdraw-manager'
import Setting from '@/components/mine/setting'
export default {
    components: {
        WithdrawManager,
        Setting
    },
    data () {
        return {
            activeNames: [],
            checked: true,
            merincome: 0, // 账户余额
            servephone: '', // 服务手机号
            authority: {} // 设置的信息
        }
    },
    computed: {
        ...mapState(['user'])
    },
    mounted () {
        this.getInitData()
    },
    methods: {
        async getInitData () {
            try {
                const { code, message, merincome, servephone, authority } = await skipPersonCenter()
                if (code === 200) {
                    this.merincome = merincome
                    this.servephone = servephone
                    this.authority = authority
                } else {
                    this.$toast(message)
                }
            } catch (error) {
                this.$dialog.alert({
                    title: '提示',
                    message: '异常错误'
                })
            }
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
          width: 24px;
          height: 24px;
          font-size: 0;
      }
  }
}
</style>
