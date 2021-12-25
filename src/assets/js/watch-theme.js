import store from '@/store'
// /** 监听当前主题的改变  */
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
function darkModeHandler () {
    // 正式环境禁止使用
    if (HDWX.ENV === 'production') return
    if (mediaQuery.matches) {
        store.commit('setGlobalData', { theme: 'dark' })
    } else {
        store.commit('setGlobalData', { theme: '' })
    }
}

// 判断当前模式
darkModeHandler()
// 监听模式变化
mediaQuery.addListener(darkModeHandler)
