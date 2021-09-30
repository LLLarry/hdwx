<template>
    <div>
        <hd-title class="bg-white">设置</hd-title>
        <van-collapse v-model="activeNames">
            <van-collapse-item name="3">
                <template #title>
                    <div class="d-flex align-items-center">
                        <img class="icon-img margin-right-1" src="../../../assets/images/mine/设置@2x.png" alt="">
                        <span>设置</span>
                    </div>
                </template>
                <van-cell-group>
                    <van-cell v-for="one in wrapper" :key="one.key" :title="one.title">
                        <template #right-icon>
                            <van-switch size="24px" active-color="rgb(7, 193, 96)" v-model="one.checked" />
                        </template>
                    </van-cell>
                </van-cell-group>
            </van-collapse-item>
             <van-collapse-item name="4">
                <template #title>
                    <div class="d-flex align-items-center">
                        <img class="icon-img margin-right-1" src="../../../assets/images/mine/线性客服耳机.png" alt="">
                        <span>客服电话</span>
                    </div>
                </template>
                <div class="">
                    <p class="text-size-sm text-p padding-x-3" style="line-height: 1.8;">
                       充电页面展示的售后电话优先级为：
                       <strong class="text-success">“模板电话”</strong> > <strong class="text-success">“客服电话”</strong> > <strong class="text-success">“商户注册电话”</strong>
                    </p>
                    <van-form>
                        <van-field
                            v-model="phone"
                            name="phone"
                            label="客服电话"
                            placeholder="请输入客服电话"
                            clearable
                            :readonly="!editting"
                        />
                    </van-form>
                    <div style="margin: 16px;" class="d-flex">
                        <van-button
                            :disabled="editting"
                            round
                            block
                            size="small"
                            class="padding-y-3 margin-right-4"
                            type="info"
                            native-type="submit"
                            @click="editting = true"
                        >编辑</van-button>
                         <van-button
                            :disabled="!editting"
                            round
                            block
                            size="small"
                            class="padding-y-3 margin-right-4"
                            type="primary"
                            native-type="submit"
                        >保存</van-button>
                    </div>
                </div>
            </van-collapse-item>
        </van-collapse>
    </div>
</template>

<script>
export default {
    props: {
        authority: {
            type: Object,
            default: () => {}
        },
        servephone: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            activeNames: [],
            checked: true,
            wrapper: [
                { title: '提现通知', key: 'withmess', checked: false },
                { title: '订单通知', key: 'ordermess', checked: false },
                { title: '是否显示投币收益 ', key: 'showincoins', checked: false },
                { title: '是否开通脉冲模块自动退费  ', key: 'incoinrefund', checked: false },
                { title: '是否开启自动提现  ', key: 'autoWithdraw', checked: false },
                { title: '是否开通合伙人自动分摊缴费  ', key: 'apportion', checked: false },
                { title: '是否开启用户钱包通用', key: 'walletcommon', checked: false }
            ],
            phone: '', // 客服电话
            editting: false // 是否正在编辑
        }
    },
    watch: {
        authority: {
            handler (list) {
                this.wrapper = this.wrapper.map(item => {
                    return {
                        ...item,
                        checked: list[item.key] === 1
                    }
                })
            },
            immediate: true,
            deep: true
        },
        servephone: {
            handler (value) {
                this.phone = value
            },
            immediate: true
        }
    }
}
</script>
