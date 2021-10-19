<template>
  <div class="set-bank-card">
      <van-nav-bar
        :title="`编辑${type === 1 ? '个人' : '对公'}账户`"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
    />
    <hd-line />
    <div class="margin-3">
        <!-- 个人账户start -->
        <handle-bank :data="bankcard" @handleBank="handleBank" v-if="type === 1" />
        <!-- 个人账户end -->

        <!-- 对公账户start -->
        <handle-company-bank :data="bankcard" @handleBank="handleBank" v-else />
        <!-- 对公账户end -->

         <div class="margin-y-3">
            <van-button round block type="danger" @click="handleDelete">删除此银行卡</van-button>
        </div>
    </div>
  </div>
</template>

<script>
import HandleCompanyBank from '@/components/withdraw/handle-company-bank'
import HandleBank from '@/components/withdraw/handle-bank'
import { inquireBankCardInfo, editBankCardInfo, deleteBankcardByid } from '@/require/withdraw'
export default {
    components: {
        HandleCompanyBank,
        HandleBank
    },
    data () {
        return {
            id: '', // 银行卡id
            type: 1, // 1 个人， 2 对公
            bankcard: {}
        }
    },
    mounted () {
        const { id, type = 1 } = this.$route.params
        this.id = id
        this.type = Number(type)
        this.getInitData({ id })
    },
    methods: {
        async getInitData (data) {
            try {
                const { code, message, bankcard } = await inquireBankCardInfo(data)
                if (code === 200) {
                    this.bankcard = bankcard
                } else {
                    this.$toast(message)
                }
            } catch (error) {
                this.$dialog.alert({
                    title: '提示',
                    message: '异常错误'
                }).then(() => {
                    wx.closeWindow()
                })
            }
        },
        // 修改银行卡函数
        handleBank ({ type, value }) {
            this.$dialog.confirm({
                title: '提示',
                message: '确认编辑此账户吗？'
            })
            .then(async () => {
                 try {
                    const { code, message } = await editBankCardInfo({
                        type,
                        ...value
                    })
                    if (code === 200) {
                        this.$toast('修改成功')
                    } else {
                        this.$toast(message)
                    }
                } catch (error) {
                    this.$toast('异常错误')
                }
            })
        },
        handleDelete () {
            this.$dialog.confirm({
                title: '提示',
                message: '确认删除吗？'
            })
            .then(async () => {
                try {
                    const { code, message } = await deleteBankcardByid({
                       id: this.id
                    })
                    if (code === 200) {
                        this.$dialog.alert({
                            title: '提示',
                            message: '修改成功'
                        })
                        .then(() => {
                            this.$router.replace({ path: '/withdraw/mybankcard' })
                        })
                    } else {
                        this.$toast(message)
                    }
                } catch (error) {
                    console.log(error)
                    this.$toast('异常错误')
                }
            })
        },
        // 个人银行卡 输入卡号时，失去焦点查看卡号对应的银行卡
        handleCheckBank () {

        }
    }
}
</script>

<style>

</style>
