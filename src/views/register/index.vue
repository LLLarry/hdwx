<template>
  <div class="register">
      <div class="bg-box">
          <div class="race race-1" />
            <div class="race race-2" />
            <div class="race race-3" />
      </div>
      <div class="register-box">
          <div class="content bg-white padding-4 border-box">
            <!-- <div class="logo-box d-flex justify-content-center align-items-center margin-top-4">
                <img src="../../assets/images/logo.png" alt="logo">
                <h1 class=""></h1>
            </div> -->

            <div class="logo-box d-flex justify-content-center align-items-center margin-top-4">
                <img class="logo" :src="logoModel.logo" alt="logo">
                <img class="title" :src="logoModel.title" :style="`height: ${logoModel.scale * 1.06667}rem`" alt="title">
            </div>

            <form action="">
                <div class="form-item bg-gray padding-x-3 border-box rounded-md d-flex align-items-center margin-bottom-3">
                    <div class="d-flex align-items-center overflow-hidden form-item-box" style="width: 6rem">
                        <i class="iconfont icon-user text-999 text-left"></i>
                        <input placeholder="请输入注册手机号" v-model="mobile" />
                    </div>
                </div>

                <div class="form-item bg-gray padding-x-3 border-box rounded-md d-flex align-items-center margin-bottom-3">
                    <div class="d-flex align-items-center overflow-hidden form-item-box" style="width: 9rem">
                        <i class="iconfont icon-anjian text-999 text-left"></i>
                        <input placeholder="请输入邀请码" v-model="invitecode" />
                    </div>
                    <van-popover v-model="showPopover" trigger="click" placement="top-end" >
                        <div class="text-size-sm padding-3 rounded-md" style="width: 60vw">
                            <div class="margin-bottom-2 text-000">关于邀请码的说明</div>
                            <ul>
                                <li class="padding-y-1">
                                    <p>1、邀请码输入【销售电话】您将会注册为商户</p>
                                </li>
                                <li class="padding-y-1">
                                    <p>2、邀请码输入【代理商电话】您将会注册为代理商名下的商户</p>
                                </li>
                            </ul>
                        </div>
                        <template #reference>
                            <van-icon name="warning-o" size=".5rem" class="text-666" />
                        </template>
                    </van-popover>
                </div>

                <div class="form-item bg-gray padding-x-3 border-box rounded-md d-flex align-items-center justify-content-between margin-bottom-3">
                    <div class="d-flex align-items-center overflow-hidden form-item-box" style="width: 4rem">
                        <i class="iconfont icon-mimasuo text-999 text-left"></i>
                        <input placeholder="请输入验证码" v-model="captcha" />
                    </div>
                    <div class="text-success text-size-sm get-code flex-1 text-right" v-if="expireTime <= 0" @click="getCaptcha">获取验证码</div>
                    <div class="text-success text-size-sm time flex-1 text-right" v-else>倒计时：{{expireTime}}s</div>
                </div>

                <div class="border-box rounded-md d-flex align-items-center padding-top-3">
                    <van-button type="primary" block round @click.prevent="submit">注册</van-button>
                </div>
            </form>
            <div class="text-p text-size-sm text-center margin-top-4">当前页面仅供商户注册，充电用户不需要注册</div>
        </div>
      </div>
  </div>
</template>

<script>
import helper from './helper'
export default {
    setup (props, context) {
        const router = context.root._router
        const route = context.root._route
        const store = context.root.$store
        return helper(router, route, store)
    }
}
</script>

<style lang="scss" scoped>
.register {
    position: relative;
    .register-box {
        z-index: 2;
        padding: 10vh 0;
        .content {
            width: 90vw;
            margin: 0 5vw;
            height: 80vh;
            min-height: 500px;
            /* background: #fff; */
            border-radius: 15px;
            position: relative;
            z-index: 2;
            .logo-box {
                user-select: none;
                pointer-events: none;
                padding-top: 20px;
                .logo {
                    width: 60px;
                    height: 60px;
                }
                .title {
                    height: 40px;
                }
                /* h1 {
                    width: 200px;
                    height: 40px;
                    background-image: url(../../assets/images/zzcdpt.png);
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                } */
            }
            form {
                margin-top: 40px;
                .form-item {
                    height: 45px;
                    i {
                        width: 30px;
                    }
                    input {
                        height: 36px;
                        border: none;
                        width: calc(100% - 30px);
                    }
                    .get-code {
                        text-decoration: underline;
                        white-space: nowrap;
                        &:active {
                            color: #069048;
                        }
                    }
                    .time {
                        white-space: nowrap;
                        &:active {
                            color: #069048;
                        }
                    }
                }
            }
        }
    }
    .bg-box {
        position: absolute;
        height: 100%;
        width: 100vw;
        background: #25395d;
        overflow: hidden;
        z-index: 1;
        .race {
            width: 100px;
            height: 100px;
            border-radius: 100px;
            overflow: hidden;
            /* background-image: linear-gradient(to bottom, #51D2EF, #67B9F5); */
            background-image: linear-gradient(45deg, #4B94B7, #16294A);
            box-shadow: 5px 5px 10px rgba(0, 0, 0, .6);
        }
        .race-1 {
            width: 180px;
            height: 180px;
            border-radius: 180px;
            position: absolute;
            right: -55px;
            top: -50px;
            z-index: 1;
        }
        .race-2 {
            width: 80px;
            height: 80px;
            border-radius: 80px;
            position: absolute;
            right: -30px;
            top: 50px;
            z-index: 1;
        }
        .race-3 {
            width: 160px;
            height: 160px;
            border-radius: 160px;
            position: absolute;
            left: -55px;
            bottom: -50px;
            z-index: 1;
        }
    }
}
</style>
