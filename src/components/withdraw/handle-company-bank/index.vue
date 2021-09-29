<template>
    <van-form @submit="onSubmit" >
        <van-field
            v-model="bankCardForm.company"
            name="company"
            label="公司名称"
            placeholder="公司名称"
            :rules="[{ required: true, message: '请填写公司名称' }]"
        />
        <van-field
            v-model="bankCardForm.realname"
            name="realname"
            label="联系人"
            placeholder="联系人"
            :rules="[{ required: true, message: '请填写联系人' }]"
        />
        <van-field
            v-model="bankCardForm.bankcardnum"
            name="bankcardnum"
            label="银行卡号"
            placeholder="请填写银行卡号"
            :rules="[{ required: true }]"
        />
        <van-field
            v-model="bankCardForm.bankname"
            name="bankname"
            label="开户行"
            placeholder="请填写开户行"
            :rules="[{ required: true }]"
        />
        <div class="margin-top-3">
            <van-button round block type="primary" native-type="submit">提交</van-button>
        </div>
    </van-form>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: () => {}
        }
    },
    data () {
        return {
            bankCardForm: {}
        }
    },
    watch: {
        data: {
            handler (value = {}) {
                this.bankCardForm = value
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        onSubmit (value) {
            this.$emit('handleBank', { type: 2, value: this.bankCardForm }) // type：1个人 2对公； value： value值
        }
    }
}
</script>

<style>

</style>
