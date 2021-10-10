<template>
  <div class="sub-account bg-gray">
      <header>
            <div class="header-top padding-x-3 padding-y-3">
                <h1 class="text-center margin-bottom-3">子账号功能</h1>
                <p class="text-size-md">
                  为方便各运营商操作，我们推出“财务子账号”和“维修子账号”功能；运营商可以通过邀请码邀请指定用户来成为“子账户功能”。
                  <van-popover
                    v-model="showPopover"
                    trigger="click"
                  >
                    <template #reference>
                      <span class="text-size-md text-center text-primary font-weight-bold" style="">如何使用邀请码？</span>
                    </template>
                    <template>
                      <div class="text-size-sm padding-3 text-666 use-tip">
                        <ul class="padding-left-3">
                          <li class="margin-bottom-2" style="list-style: decimal"><p>用户进入“自助充电平台”公众号，进入“充电中心”</p></li>
                          <li class="margin-bottom-2" style="list-style: decimal"><p>在下方导航栏点击“个人中心”，进入“我的”页面，再点击“个人中心”，进入“个人信息”页面</p></li>
                          <li style="list-style: decimal"><p>在“个人信息”页面，找到“成为子账户”，输入“邀请码”，并选择“子账号”类型即可</p></li>
                        </ul>
                      </div>
                    </template>
                  </van-popover>

                </p>
            </div>

            <div class="header-card padding-x-3">
              <ul class="d-flex justify-content-between padding-3 shadow bg-white rounded-md text-666">
                <li class="d-flex flex-column align-items-center">
                    <i class="padding-bottom-2 iconfont icon-erweima header-card-icon"></i>
                    <span class="text-size-sm">生成邀请码</span>
                </li>
                <li class="d-flex flex-column align-items-center justify-content-between">
                    <i class="iconfont icon-a-youjiantouzhixiangyoujiantou header-card-icon"></i>
                </li>
                <li class="d-flex flex-column align-items-center">
                    <i class="padding-bottom-2 iconfont icon-tianchongxing- header-card-icon"></i>
                    <span class="text-size-sm">用户使用邀请码</span>
                </li>
                <li class="d-flex flex-column align-items-center">
                    <i class="iconfont icon-a-youjiantouzhixiangyoujiantou header-card-icon"></i>
                </li>
                <li class="d-flex flex-column align-items-center">
                    <i class="padding-bottom-2 iconfont icon-yingyong header-card-icon"></i>
                    <span class="text-size-sm">选择子账号类型</span>
                </li>
              </ul>
            </div>
        </header>
        <main>
          <div class="sub-qr margin-3 padding-1 rounded-lg shadow-lg">
            <div class="sub-qr-box padding-3 rounded-lg">
                <div class="d-flex">
                    <div class="left flex-2">
                      <ul class="text-size-sm text-666 padding-left-3">
                        <li class="margin-bottom-1">邀请码是用户成为子账户的唯一凭证</li>
                        <li class="margin-bottom-1">邀请码每次只能生成一个</li>
                        <li>邀请码有效使用时间为24小时，如在有效期内邀请码被使用，则使用过后会立即失效</li>
                      </ul>
                    </div>
                    <div class="right flex-1">
                      <div class="h-100 d-flex flex-column align-items-center justify-content-center" v-if="captcha">
                          <qrcode
                            :value="captcha"
                            :size="qrSize"
                          />
                          <span class="font-weight-bold" @click="copyText(captcha)">{{captcha}}</span>
                        <span class="text-size-sm text-666 margin-top-1" @click="copyText(captcha)">复制邀请码</span>
                        <!-- <span>到期时间： {{ expireData }}</span> -->
                      </div>
                      <div class="create-code h-100 d-flex flex-column align-items-center justify-content-center" v-else>
                        <button class="create-code-btn" @click="handleCreateCaptcha">生成邀请码</button>
                      </div>
                    </div>
                </div>
                <div class="text-center text-333 text-size-sm margin-top-1" v-if="captcha">剩余有效时间：{{expireData}}</div>
            </div>
          </div>

          <div class="">
              <hd-title>
              子账号管理
              <!-- <template #desc>
                <div class="padding-y-1 padding-left-2" style="font-size: 0;">
                  <van-icon name="add-o" size=".6rem" color="#07c160" />
                </div>
              </template> -->
            </hd-title>
            <div class="bg-white padding-y-3">
              <van-tabs type="card" color="#07c160">
                <van-tab :title="`维修子账号（${childList.length}）`">
                  <hd-line height=".3rem"></hd-line>
                  <div class="bg-white margin-x-3" v-for="item in childList" :key="item.id">
                      <div class="d-flex justify-content-between align-items-center padding-y-2">
                          <div class="d-flex align-items-center">
                              <div class="avatar margin-right-2">
                                <van-image
                                    width="1.6rem"
                                    height="1.6rem"
                                    fit="fill"
                                    round
                                    :src="item.headimgurl | fmtAvatar"
                                  />
                              </div>
                              <div class="user-info">
                                <div class="margin-bottom-2 text-000 font-weight-bold">{{item.username}}</div>
                                <div class="text-p ">{{item.phone}}</div>
                              </div>
                          </div>
                          <div class="contral">
                            <van-button type="primary" class="margin-right-2" size="small" @click="handleToggle(item)">切换</van-button>
                            <van-button type="danger" size="small"  @click="handleDelete(item)">删除</van-button>
                          </div>
                      </div>
                      <hd-line height=".3rem"></hd-line>
                  </div>
                </van-tab>
                <van-tab :title="`财务子账号（${financeList.length}）`">
                  <hd-line height=".3rem"></hd-line>
                  <div class="bg-white margin-x-3" v-for="item in financeList" :key="item.id">
                      <div class="d-flex justify-content-between align-items-center padding-y-2">
                          <div class="d-flex align-items-center">
                              <div class="avatar margin-right-2">
                                <van-image
                                    width="1.6rem"
                                    height="1.6rem"
                                    fit="fill"
                                    round
                                    :src="item.headimgurl | fmtAvatar"
                                  />
                              </div>
                              <div class="user-info">
                                <div class="margin-bottom-2 text-000 font-weight-bold">{{item.username}}</div>
                                <div class="text-p ">{{item.phone}}</div>
                              </div>
                          </div>
                          <div class="contral">
                            <van-button type="primary" class="margin-right-2" size="small" @click="handleToggle(item)">切换</van-button>
                            <van-button type="danger" size="small"  @click="handleDelete(item)">删除</van-button>
                          </div>
                      </div>
                      <hd-line height=".3rem"></hd-line>
                  </div>
                </van-tab>
              </van-tabs>
            </div>
          </div>
        </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { createCaptcha, inquireMerChildUser, switchoverChildUser, deleteChildUser } from '@/require/mine'
import copyText from '@/utils/copy-text'
let timer = null
export default {
  data () {
    return {
      captcha: '', // 邀请码
      expireTime: 0, // 邀请码过期时间
      childList: [], // 维修子账号
      financeList: [], // 财务子账号
      showPopover: false
    }
  },
  mounted () {
    // this.createTimeout()
    // 查询子账号
    this.handleGetSubAccount()
  },
  computed: {
    ...mapState(['global']),
    qrSize () {
      return 80 * this.global.clientWidth / 375
    },
    // 格式化到期时间
    expireData () {
      const returnSeconds = Number.parseInt(this.expireTime)
      const hours = Math.floor(returnSeconds / 3600)
      const mi = Math.ceil((returnSeconds % 3600) / 60)
      return `${hours}小时${mi}分钟`
    }
  },
  methods: {
    // 查询子账号
    async handleGetSubAccount () {
      try {
        const { code, message, captcha, valueTime, financeList, childList } = await inquireMerChildUser()
        if (code === 200) {
          if (captcha) {
            this.captcha = captcha
            this.expireTime = Number(valueTime)
            this.createTimeout()
          }
          this.childList = childList
          this.financeList = financeList
        } else {
          this.$toast(message)
        }
      } catch (error) {
        this.$toast('异常错误')
      }
    },
    // 创建子账号
    async handleCreateCaptcha () {
      try {
        const { code, message, result } = await createCaptcha()
        if (code === 200) {
          this.captcha = result.captcha
          this.expireTime = Number(result.valueTime)
          // 开启定时任务
          this.createTimeout()
        } else {
          this.$toast(message)
        }
      } catch (error) {
        this.$toast('异常错误')
      }
    },
    createTimeout () {
      if (timer) {
        clearInterval(timer)
      }
      timer = setInterval(() => {
        this.expireTime--
        if (this.expireTime <= 0) {
          clearInterval(timer)
        }
      }, 1000)
    },
    // 子账号切换
    handleToggle ({ username, type, phone }) {
      this.$dialog.confirm({
        title: '提示',
        message: `确认将【${username}】切换为“${type === 1 ? '财务子账号' : '维修子账号'}”吗？`,
        beforeClose: async (action, done) => {
          if (action === 'confirm') {
            try {
              const { code, message } = await switchoverChildUser({ phone, type: type === 1 ? 2 : 1 })
              if (code === 200) {
                setTimeout(() => {
                  this.$dialog.alert({
                    title: '提示',
                    message: '切换成功'
                  })
                  .then(() => {
                    this.handleGetSubAccount()
                  })
                }, 500)
              } else {
                this.$toast(message)
              }
            } catch (error) {
              this.$toast('异常错误')
            }
            done()
          } else {
            done()
          }
        }
      })
    },
    // 删除子账号
    handleDelete ({ username, type, phone }) {
      this.$dialog.confirm({
        title: '提示',
        message: `确认将【${username}】在“${type === 2 ? '财务子账号' : '维修子账号'}”中移除吗?`,
        beforeClose: async (action, done) => {
          if (action === 'confirm') {
            try {
              const { code, message } = await deleteChildUser({ phone })
              if (code === 200) {
                setTimeout(() => {
                  this.$dialog.alert({
                    title: '提示',
                    message: '删除成功'
                  })
                  .then(() => {
                    this.handleGetSubAccount()
                  })
                }, 500)
              } else {
                this.$toast(message)
              }
            } catch (error) {
              this.$toast('异常错误')
            }
            done()
          } else {
            done()
          }
        }
      })
    },
    copyText (text) {
      copyText(text)
    }
  }
}
</script>

<style lang="scss">
.sub-account {
  min-height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  header {
    position: relative;
    z-index: 1;
  }
  .header-top {
    // background-image: -webkit-linear-gradient(bottom,#07c160,#fd8403,#ffffff);
    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
    // overflow-x: clip;
    position: relative;
    color: #ffffff;
    font-family: "STFangsong";
    &::after {
      content: '';
      position: absolute;
      left: -100vw;
      right: -100vw;
      bottom: -40px;
      height: 300vw;
      z-index: -1;
      background-color: #07c160;
      border-radius: 50%;
    }
    h1 {
      font-size: 25px;
    }
    p {
      text-indent: 2em;
      line-height: 1.6;
    }
  }
  .header-card {
    .header-card-icon {
      font-size: 24px;
    }
  }
  main {
    .sub-qr {
      background-image: linear-gradient(to bottom, #F7E3BE, #F2DEB3);
      .sub-qr-box {
        border: 1px solid #D1AF5C;
        .left {
          ul {
            li {
              list-style: decimal;
            }
          }
        }
        .right {
          .create-code {
            button {
                  background: #f2deb3;
                  border: 1px solid #ff603429;
                  padding: 5px;
                  color: #ff976a;
              &:active {
                background: rgba(40, 167, 69, 0.24);
              }
            }
          }
        }
      }
    }
  }
}
</style>
