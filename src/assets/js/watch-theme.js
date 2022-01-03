import store from '@/store'
import { generateNewStyle, writeStyle } from '@/utils/theme'
// /** 监听当前主题的改变  */
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
function darkModeHandler () {
    // 正式环境禁止使用
    if (HDWX.ENV !== 'production' && mediaQuery.matches) {
        store.commit('setGlobalData', { theme: 'dark' })
    } else {
        store.commit('setGlobalData', { theme: '' })
    }
}

// 判断当前模式
darkModeHandler()
// 监听模式变化
mediaQuery.addListener(darkModeHandler)

export default theme => {
    try {
        const styles = Array.from(document.querySelectorAll('.reset-style'))
        for (const style of styles) {
          style && style.remove()
        }
        const html = document.documentElement || document.querySelector('html') || document.getElementsByTagName('html')[0]
        if (theme === 'dark') {
          generateNewStyle('#000000').then(cssText => {
            writeStyle(cssText)
            html && html.setAttribute('theme', 'dark')
          })
        } else {
          html && html.removeAttribute('theme')
        }
      } catch (error) {

      }
}
