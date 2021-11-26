<template>
  <div class="register">
    <hd-scroll @getScroll="getScroll">
        <div>
            <van-contact-edit
                is-edit
                show-set-default
                @save="onSave"
                :contact-info="{ name: '123456', tel: '15093219054' }"
            />
            环境： {{ WECHAT_BROWSER_ENV }}
            <!-- <button @click="download">下载</button> -->

                <div  v-for="(one, index) in list"  :key="index" style="padding: 15px;  display: inline-block;" :data-title="one.title">
                    <hd-qrcode :qrcode="one" />
                </div>
                <button @click="scrollTo">滚动到指定位置</button>
                <div style="height: 10vh; background: pink;" v-for="item in num" :key="item">{{item}}</div>
                <button @click="finishScroll">完成滚动</button>
            </div>
    </hd-scroll>
  </div>
</template>

<script>
import ajax from '@/require/ajax'
import HdQrcode from '@/components/hd-qrcode'
import HdScroll from '@/components/hd-scroll/scroll'
// const baseUrl = process.env.NODE_ENV === 'production' ? '' : '/api'
const initData = `863488055282175  000193
863488055281979  000194
863488055282076  000195
863488055282084  000196
863488055282167  000197
863488055281995  000198
863488055282035  000199
863488055282068  000200
863488055281987  000201
863488055282126  000202
863488055277399  000203
863488055278264  000204
863488055282134  000205
863488055278272  000206
863488055278306  000207
863488055471034  000208
863488055454451  000209
863488055483765  000210
863488055448495  000211
863488055488756  000212
863488055577764  000213
863488055588456  000214
863488055578028  000215
863488055577723  000216
863488055586310  000217
863488055578630  000218
863488055577806  000219
863488055578077  000220
863488055585890  000221
863488055585882  000222
861714057206959  000333
861714057201919  000334
861714057205076  000335
861714057207908  000336
861714057208013  000337
861714057201844  000338
861714057204962  000339
861714057201885  000340
861714057201927  000341
861714057201950  000342`
export default {
    data () {
        return {
            WECHAT_BROWSER_ENV: window.HDWX.WECHAT_BROWSER_ENV,
            list: [],
            scroll: null,
            num: 30
        }
    },
    methods: {
        onSave ({ tel, name }) {
            // console.log(content)
            ajax({
                url: '/webenter/accountEnter',
                method: 'post',
                data: {
                    phone: tel,
                    password: name,
                    isolate: 1
                }
            }).then(res => {
                const flag = confirm(res.userInfo.message)
                if (flag) {
                    this.$router.replace({ path: '/' })
                }
            })
        },
        createdQrCode () {
            const list = []
            initData.split(/[\n\r]/).slice(30, 40).forEach((one, i) => {
                const imei = one.split(/\s/)[0]
                for (let index = 0; index < 10; index++) {
                    list.push({
                        title: `000${333 + i}-${index + 1}`,
                        value: `http://cdxt.nisennet.com.cn/cdzserver/wx/charge?imei=${imei}&port=${index + 1}`, // 二维码路径
                        background: '#FFFFFF', // 二维码背景色
                        size: 220, // 二维码大小
                        key: `000${303 + i}-${index + 1}` // 二维码唯一标识
                    })
                }
            })
            this.list = list
        },
        download () {
            const imgs = document.getElementsByTagName('img')
            console.log(imgs)
            Array.from(imgs).forEach((img, index) => {
                setTimeout(() => {
                    const a = document.createElement('a')
                    const event = new MouseEvent('click')
                    a.download = img.parentElement.parentElement.parentElement.getAttribute('data-title') + '.png'
                    a.href = img.src
                    a.dispatchEvent(event)
                }, (index + 1) * 1000)
            })
        },
        getScroll ({ scroll }) {
            this.scroll = scroll
            this.scroll.on('pullingUp', this.pullingUp)
        },
        pullingUp () {
            console.log(1235555)
        },
        finishScroll () {
            this.scroll && this.scroll.finishPullUp()
        },
        scrollTo () {
            this.num = 60
            this.scroll && this.scroll.refresh()
            // this.scroll && this.scroll.scrollTo(1000, 0)
        }
    },
    components: {
        HdQrcode,
        HdScroll
    },
    mounted () {
        // this.createdQrCode()
    }
}
</script>

<style lang="scss">
.register {
    height: 70vh;
}
</style>
