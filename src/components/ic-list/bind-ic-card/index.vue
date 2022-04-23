<template>
  <div>
      <!-- 断开重连 -->
        <hd-overlay :show="isShowBindInfo" title="" @close="closed">
            <div class="text-center text-size-default margin-bottom-4 text-success" v-if="bindInfo.status === 1">
               {{ bindInfo.message }}
            </div>
            <div class="text-center text-size-default margin-bottom-4 text-danger" v-else>
                {{ bindInfo.message }}
            </div>
            <ul class="text-size-sm">
                <li class="margin-bottom-1">
                    <p>
                        <span class="margin-right-1">绑定IC卡号：</span><span class="text-000 font-weight-bold">{{ bindInfo.cardID }}</span>
                    </p>
                </li>
                <li class="margin-bottom-1">
                    <p>
                        <span class="margin-right-1">绑定小区：</span><span class="text-000 font-weight-bold">{{ bindInfo.name }}</span>
                    </p>
                </li>
                <li class="margin-bottom-1">
                    <p>
                        <span class="margin-right-1">本次绑定：</span><span><span class="text-success text-size-md font-weight-bold">{{ bindInfo.nowNums }}张</span></span>
                    </p>
                </li>
                <li class="margin-bottom-1">
                    <p>
                        <span class="margin-right-1">总绑定：</span><span><span class="text-success text-size-md font-weight-bold">{{ bindInfo.totalNums }}张</span></span>
                    </p>
                </li>
            </ul>
            <van-button type="info"  size="small" class="w-100 margin-top-2" @click="binds">
                继续绑定
            </van-button>
        </hd-overlay>

         <!-- 选择小区 -->
        <van-popup v-model="showAreaPicker" round position="bottom">
            <van-picker
                title="请选择小区列表"
                show-toolbar
                :columns="list"
                @confirm="onConfirmArea"
                @cancel="showAreaPicker = false"
            />
        </van-popup>
        <footer class="padding-x-3 padding-y-1 padding-y-7 shadow-y-md">
            <van-button type="primary" block size="small" style="width: 80%; margin: 0 auto;" @click="clickAddICcard">添加IC卡</van-button>
        </footer>
  </div>
</template>

<script>
import hdOverlay from '@/components/hd-overlay'
import { scanQRCode } from '@/utils/wechat-util'
import parseURL from '@/utils/parse-url'
import { dealerBindingOnlineCard } from '@/require/ic'
export default {
    props: {
        arealist: {
            type: Array,
            default: () => []
        }
    },
    watch: {
        arealist: {
            handler (list) {
                if (!Array.isArray(list)) {
                    list = []
                }
                this.list = [{ text: '未绑定', value: 0 }, ...list]
            },
            immediate: true
        }
    },
    data () {
        return {
            list: [{ text: '未绑定', value: 0 }], // 小区列表
            showAreaPicker: false,
            // addICAreaRow: {}, // 添加ic卡时，保存的小区信息
            isShowBindInfo: false,
            bindInfo: {
                status: -1, // 0 失败 1 成功
                cardID: '',
                name: '',
                aid: 0,
                nowNums: 0,
                totalNums: 0,
                message: 'IC卡绑定成功'
            }
        }
    },
    components: {
        hdOverlay
    },
    methods: {
        // 绑定在线卡时选择小区
        onConfirmArea (row) {
            this.bindInfo = {
                ...this.bindInfo,
                aid: row.value,
                name: row.text
            }
            this.showAreaPicker = false
            this.handleScanQRCode()
        },
        // 点击添加ic卡按钮
        clickAddICcard () {
            if (Array.isArray(this.arealist) && this.arealist.length >= 0) {
                this.showAreaPicker = true
            } else {
                this.$dialog.alert({
                    title: '提示',
                    message: '对不起，您当前还没有小区'
                })
            }
        },
        // 调取扫一扫
        handleScanQRCode () {
            scanQRCode()
            .then(res => {
                const { status, message, ...result } = parseURL(res)
                if (status !== 200) return this.$toast(message)
                if (!result.cardNumber) return this.$toast('请扫描IC卡的二维码')
                // 绑定IC卡
                this.bindICcard(result.cardNumber)
            })
            .catch(() => {
                this.$toast('异常错误')
            })
        },
        async bindICcard (cardID) {
            try {
                const { code, message } = await dealerBindingOnlineCard({
                    aid: this.bindInfo.aid,
                    cardID,
                    tenantId: this.tenantId
                })
                if (code === 200) {
                    this.bindInfo = {
                        ...this.bindInfo,
                        nowNums: 1,
                        totalNums: ++this.bindInfo.totalNums,
                        cardID,
                        status: 1,
                        message: '绑定成功'
                    }
                } else {
                    this.bindInfo = {
                        ...this.bindInfo,
                        nowNums: 0,
                        cardID,
                        status: 0,
                        message
                    }
                }
            } catch (error) {
                this.bindInfo = {
                    ...this.bindInfo,
                    nowNums: 0,
                    cardID,
                    status: 0,
                    message: '异常错误'
                }
            } finally {
                this.isShowBindInfo = true
            }
        },
        // 继续绑定
        binds () {
            this.isShowBindInfo = false
            this.handleScanQRCode()
        },
        // 关闭绑定
        closed () {
            this.isShowBindInfo = false
            setTimeout(() => {
                this.bindInfo = {
                    status: -1, // 0 失败 1 成功
                    cardID: '',
                    name: '',
                    aid: 0,
                    nowNums: 0,
                    totalNums: 0,
                    message: ''
                }
            }, 300)
        }
    }
}
</script>
