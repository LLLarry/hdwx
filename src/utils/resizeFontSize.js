import store from '@/store'
const resizeFn = () => {
    // 设置字体大小
    const html = document.documentElement || document.getElementsByTagName('html')[0]
    const fontSize = Number.parseFloat(getComputedStyle(html)['font-size'])
    if (fontSize > 50) {
      html.style.fontSize = '50px'
    }
    // 设置浏览器宽度
    const clientWidth = html.clientWidth || html.offsetWidth
    store.commit('setGlobalData', { clientWidth })
}
window.addEventListener('resize', resizeFn)
resizeFn()
