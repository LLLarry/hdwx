<template>
  <div clas="register">
    <van-contact-edit
        is-edit
        show-set-default
        @save="onSave"
        :contact-info="{ name: '012092', tel: '15036012092' }"
    />
    环境： {{ WECHAT_BROWSER_ENV }}
  </div>
</template>

<script>
import ajax from '@/require/ajax'
// const baseUrl = process.env.NODE_ENV === 'production' ? '' : '/api'
export default {
    data () {
        return {
            WECHAT_BROWSER_ENV: window.HDWX.WECHAT_BROWSER_ENV
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
                alert(res.userInfo.message)
            })
        }
    }
}
</script>

<style lang="scss">

</style>
