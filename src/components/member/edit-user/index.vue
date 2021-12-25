<template>
  <van-popup :value="value" position="top"  @click-overlay="close">
    <div class="padding-x-3 padding-top-3 bg-gray">
        <van-form @submit="onSubmit">
            <div class="d-flex justify-content-center margin-bottom-3">
                <van-image
                    fit="fill"
                    round
                    width="2rem"
                    height="2rem"
                    :src="user.headimgurl | fmtAvatar"
                />
            </div>
            <van-field
                v-model="user.username"
                name="username"
                label="用户名"
                placeholder="用户名"
                disabled
            />
            <van-field
                v-model.trim="user.cellphone"
                name="cellphone"
                label="手机号"
                placeholder="手机号"
            />
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">提交修改</van-button>
            </div>
        </van-form>
    </div>
</van-popup>
</template>

<script>
import { updateAccountPhoneById } from '@/require/member'
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    user: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    async onSubmit () {
      const { cellphone } = this.user
      if (cellphone !== null && cellphone !== '') {
        if (!/^1[3|4|5|6|7|8|9]\d{9}$/.test(cellphone)) {
          return this.toast('请输入正确的手机号')
        }
      }
      this.changePhone()
    },
    close () {
     this.$emit('input', false)
    },
    async changePhone () {
      const { cellphone, uid } = this.user
      try {
        const { code, message } = await updateAccountPhoneById({
          uid,
          phone: cellphone,
          type: 2
        })
        if (code === 200) {
          this.close()
          this.toast('修改成功')
        } else {
          this.toast(message)
          this.$emit('reset')
        }
      } catch (e) {
        this.toast('异常错误')
        this.$emit('reset')
      }
    }
  }
}
</script>

<style>

</style>
