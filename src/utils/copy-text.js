import ClipboardJS from 'clipboard'
import { Toast } from 'vant'
const btnID = '__copy_text_btn__'

/**
 * 复制邀请码
 * @param {*} text 复制的文字
 * @param {*} showTip 时候显示提示
 * @returns Promise
 */
export default function copyText (text, showTip = true) {
    return new Promise((resolve, reject) => {
        const btn = createBtnAndSetText(text)
        const clipboard = new ClipboardJS(`#${btnID}`)
        clipboard.on('success', (e) => {
            if (showTip) {
                Toast('复制成功')
            }
            resolve('复制成功')
            e.clearSelection()
        })
        clipboard.on('error', (e) => {
            if (showTip) {
                Toast('复制失败')
            }
            reject(new Error('复制失败'))
        })
        btn.click()
        clipboard.destroy()
    })
}

function createBtnAndSetText (text) {
    let btn = document.getElementById(btnID)
    if (!btn) {
        btn = document.createElement('button')
        btn.setAttribute('style', 'display: none;')
        btn.setAttribute('id', btnID)
        btn.setAttribute('class', btnID)
        document.body.appendChild(btn)
    }
    btn.setAttribute('data-clipboard-text', text)
    return btn
}
