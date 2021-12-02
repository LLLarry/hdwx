import { watch } from '@vue/composition-api'
// 控制层 switch 生成收费说明
export default ({ tempData }) => {
    // 监听 permit walletpay alipay
    watch([
        () => tempData.value.month
    ], ([month]) => {
        tempData.value.ifmonth = month ? 1 : 2
    })
}
