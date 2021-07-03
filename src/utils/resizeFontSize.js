const resizeFn = () => {
    const html = document.documentElement || document.getElementsByTagName('html')[0]
    const fontSize = Number.parseFloat(getComputedStyle(html)['font-size'])
    if (fontSize > 50) {
      html.style.fontSize = '50px'
    }
}
window.addEventListener('resize', resizeFn)
resizeFn()
