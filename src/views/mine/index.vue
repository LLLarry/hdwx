<template>
  <div class="mine bg-gray">
    <div class="header position-relative bg-success">
      <div class="header-box">
        <div class="userinfo d-flex padding-x-3">
          <div class="avatar rounded-circle overflow-hidden">
            <img :src="user.headimgurl | fmtAvatar" alt="" />
          </div>
          <div
            class="padding-left-3 text-size-default d-flex flex-column justify-content-around"
          >
            <p>
              <span>{{ user.username }}</span>
              <span v-if="user.realname">- {{ user.realname }}</span>
            </p>
            <p>{{ user.phoneNum }}</p>
          </div>
        </div>
        <div
          class="account margin-top-4 padding-bottom-2 d-flex justify-content-around"
        >
          <div
            class="d-flex flex-column align-items-center justify-content-center flex-1"
          >
            <div class="btn-box" @click="$router.push({ path: '/income' })">
              余额明细
            </div>
          </div>
          <div
            class="d-flex flex-column align-items-center justify-content-center flex-1"
          >
            <div class="title margin-bottom-1">账户余额</div>
            <div class="math-num money">&yen; {{ merincome | fmtMoney }}</div>
          </div>
          <div
            class="d-flex flex-column align-items-center justify-content-center flex-1"
          >
            <div
              class="btn-box"
              @click="$router.push({ path: '/withdraw/page/3' })"
              v-if="!user.agent && isShowWechatRefud"
              v-hd-permission="[0, 2, 4]"
            >
              提现到微信
            </div>
          </div>
        </div>
      </div>
      <van-icon
        name="setting-o"
        class="header-seticon"
        size=".7rem"
        color="rgba(255, 255, 255, 0.8)"
        @click="handleChangeUserInfo"
      />
    </div>
    <main>
      <!-- 提现管理 -->
      <withdraw-manager />
      <hd-line />
      <!-- 子账号管理 -->
      <hd-title class="bg-white">子账号管理</hd-title>
      <van-cell-group>
        <van-cell title="子账号管理" is-link to="/subAccount">
          <template #icon>
            <img
              class="icon-img margin-right-1"
              src="../../assets/images/mine/账号信息.png"
              alt=""
            />
          </template>
        </van-cell>
      </van-cell-group>
      <hd-line />
      <!-- 设置管理 -->
      <setting
        :authority="authority"
        :servephone="servephone"
        @reloadData="reloadData"
      />
    </main>
    <van-popup v-model="userInfoShow" position="top">
      <div class="padding-x-3 padding-top-3 bg-gray">
        <van-form @submit="onSubmit">
          <div class="d-flex justify-content-center margin-bottom-3">
            <van-image
              fit="fill"
              round
              width="2rem"
              height="2rem"
              :src="copyUser.headimgurl | fmtAvatar"
            />
          </div>
          <van-field
            v-model="copyUser.username"
            name="username"
            label="用户名"
            placeholder="用户名"
            disabled
          />
          <van-field
            v-model="copyUser.phoneNum"
            name="phoneNum"
            label="注册手机号"
            placeholder="注册手机号"
            disabled
          />
          <van-field
            v-model="copyUser.createTime"
            name="createTime"
            label="注册日期"
            placeholder="注册日期"
            disabled
          />
          <van-field
            v-model="copyUser.realname"
            name="realname"
            label="真实姓名"
            placeholder="真实姓名"
          />
          <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit"
              >提交修改</van-button
            >
          </div>
        </van-form>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { skipPersonCenter, updateAccountData } from '@/require/mine'
import { mapState, mapMutations, mapGetters } from 'vuex'
import WithdrawManager from '@/components/mine/withdraw-manager'
import Setting from '@/components/mine/setting'
import { fmtDate } from '@/utils/util'
export default {
  components: {
    WithdrawManager,
    Setting
  },
  data() {
    return {
      activeNames: [],
      checked: true,
      merincome: 0, // 账户余额
      servephone: '', // 服务手机号
      authority: {}, // 设置的信息
      userInfoShow: false, // 用户信息展示
      copyUser: {}
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['isShowWechatRefud', 'isShowPersonalBankRefud'])
  },
  mounted() {
    this.getInitData()
  },
  methods: {
    ...mapMutations(['setUser']),
    async getInitData(exect = {}) {
      try {
        const {
          code,
          message,
          merincome,
          servephone,
          authority
        } = await skipPersonCenter(exect)
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
    },
    // 重新加载数据 type = 1 刷新缓存
    reloadData() {
      this.getInitData({ type: 1 })
    },
    handleChangeUserInfo() {
      this.copyUser = {
        ...this.user,
        createTime: fmtDate(this.user.createTime)
      }
      this.userInfoShow = true
    },
    // 修改商户的真实姓名
    onSubmit({ realname }) {
      this.$dialog
        .confirm({
          title: '提示',
          message: '确认修改真实姓名吗？'
        })
        .then(async () => {
          try {
            const { code, message } = await updateAccountData({
              uid: this.user.id,
              username: realname,
              type: 2
            })
            if (code === 200) {
              // 修改缓存中的用户真实姓名
              this.setUser({ ...this.user, realname })
              this.$dialog
                .alert({
                  title: '提示',
                  message: '真实姓名修改成功'
                })
                .then(() => {
                  this.reloadData()
                })
            } else {
              this.$toast(message)
            }
          } catch (error) {
            this.$toast('异常错误')
          }
          this.userInfoShow = false
        })
        .catch(() => {
          this.userInfoShow = false
        })
    }
  }
}
</script>

<style lang="scss">
.mine {
  min-height: 100vh;
  padding-bottom: 80px;
  .header {
    /* background-color: #07c160; */
    background-image: url('../../assets/images/bottom_wave.png');
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: 100%;
    padding-bottom: 50px;
    .header-seticon {
      position: absolute;
      right: 15px;
      top: 15px;
    }
    .header-box {
      padding-top: 15%;
      color: rgba(255, 255, 255, 0.8);
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
          background: rgba(255, 255, 255, 0.1);
          &:active {
            background: rgba(255, 255, 255, 0.2);
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
[theme='dark'] {
  .mine {
    .header {
      background-image: url('../../assets/images/bottom_wave_dark.png');
    }
  }
}
</style>
