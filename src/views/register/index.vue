<template>
  <div clas="register">
    <van-contact-edit
        is-edit
        show-set-default
        @save="onSave"
        :contact-info="{ name: '012092', tel: '15036012092' }"
    />
  </div>
</template>

<script>
import ajax from '@/require/ajax'
export default {
    methods: {
        onSave ({ tel, name }) {
            // console.log(content)
            ajax({
                url: '/api/webenter/accountEnter',
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
