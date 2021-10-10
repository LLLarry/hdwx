/**
  * 禁止浏览器下拉回弹
  */

(() => {
    const body = document.querySelector('body') || document.getElementsByTagName('body')[0]
    const test = document.querySelector('#test')
    let lastY // 最后一次y坐标点
    body.addEventListener('touchstart', (event) => {
        lastY = event.changedTouches[0].clientY
    }, { passive: false })
    body.addEventListener('touchmove', (event) => {
        const y = event.changedTouches[0].clientY
        const st = body.scrollTop || window.scrollY
        test.innerHTML = st
        console.log(lastY, y, st)
        if (y >= lastY && st <= 0) {
            lastY = y
            event.preventDefault()
        }
        lastY = y
    }, { passive: false })
})()
