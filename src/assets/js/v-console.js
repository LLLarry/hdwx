const { ENV } = HDWX
;(function () {
  try {
    if (ENV !== 'production') {
      const body = document.querySelector('body') || document.body
      const script = document.createElement('script')
      script.src = 'https://cdn.bootcdn.net/ajax/libs/vConsole/3.3.0/vconsole.min.js'
      const script2 = document.createElement('script')
      script.onload = () => {
        script2.innerHTML = `
          var vConsole = new VConsole();
          console.log(vConsole)
        `
      }
      body.appendChild(script)
      body.appendChild(script2)
    }
  } catch (error) {
    console.error('load vConsole is Error!')
  }
})()
