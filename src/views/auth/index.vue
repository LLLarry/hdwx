<template>
    <div class="auth position-relative">
        <div class="content d-flex flex-column justify-content-center align-items-center">
            <van-image
                width="2rem"
                height="2rem"
                fit="contain"
                class="rounded-md overflow-hidden"
                :src="require('../../assets/images/tengfuchong.jpg')"
            />
            <div class="title text-white text-size-lg margin-top-4">自助充电平台</div>

            <div class="card rounded-md text-center overflow-hidden">
                <div class="card-top bg-white padding-4 position-relative">正在授权中</div>
                <div class="card-content bg-white padding-4 position-relative d-flex flex-column justify-content-center align-items-center">
                    <van-loading size="2rem" color="#2cb34b" class="padding-y-4"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { sendCodeAndgetUserInfo } from '@/require/auth'
import { mapMutations } from 'vuex'
export default {
    created () {
        const code = this.$route.query.code
        if (code) {
            this.asySendCodeAndgetUserInfo(code)
        } else {
            this.$dialog.alert({
                title: '提示',
                message: '未获取到code信息'
            }).then(res => {
                wx.closeWindow()
            })
        }
        console.log(this.$router)
    },
    methods: {
        ...mapMutations(['setUser']),
       async asySendCodeAndgetUserInfo (code) {
           const { code: status, message, dealuser, openid } = await sendCodeAndgetUserInfo({ code })
           if (status === 200) {
               this.setUser({ ...dealuser, openid })
               this.$router.replace({ path: '/' })
           } else {
                this.$dialog.alert({
                    title: '验证失败',
                    message,
                    beforeClose (action, done) {
                        done()
                        wx.closeWindow()
                    }
                })
           }
       }
    }
}
</script>

<style lang="scss">
.auth {
    width: 100vw;
    min-height: 100vh;
    // background-image: linear-gradient(180deg, rgba(38, 133, 189, .65), #48b7ec);
    // background-image: linear-gradient(180deg, rgba(0, 56, 158, 0.65), #56c0f3);
     background-image: linear-gradient(180deg, #2cb34b, #a6dbfb);
    &::after{
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-image: url(../../assets/images/bottom_line.png);
        background-size: 100% auto;
        background-position: bottom;
        background-repeat: no-repeat;
    }
    .content {
        padding-top: 5vh;
        .card {
            width: 80vw;
            margin-top: 5vh;
            .card-top {
                &::before {
                    content: '';
                    width: .6rem;
                    height: .6rem;
                    border-radius: 50%;
                    background: #53BF83;
                    position: absolute;
                    bottom: -.3rem;
                    left: -.3rem;
                    z-index: 1;
                }
                 &::after {
                    content: '';
                    width: .6rem;
                    height: .6rem;
                    border-radius: 50%;
                    background: #53BF83;
                    position: absolute;
                    bottom: -.3rem;
                    right: -.3rem;
                    z-index: 1;
                }
            }
            .card-content {
                min-height: 5rem;
                &::before {
                    content: '';
                    width: calc(100% - .6rem);
                    height: 1px;
                    background: #53BF83;
                    position: absolute;
                    left: 50%;
                    top: 0;
                    z-index: 1;
                    transform: translateX(-50%);
                }
            }
        }
    }
}
</style>
