(function flexible (window, document) {
    let docEl = document.documentElement
    let dpr = window.devicePixelRatio || 1
  
    // adjust body font size
    function setBodyFontSize () {
      if (document.body) {
        document.body.style.fontSize = (12 * dpr) + 'px'
      }
      else {
        document.addEventListener('DOMContentLoaded', setBodyFontSize)
      }
    }
    setBodyFontSize();
    // 设计稿的长度是1440px 设置为1rem=32px
    // set 1rem = viewWidth / 30
    function setRemUnit () {
      console.log(docEl.clientWidth,'我是宽度')
      console.log(docEl.clientHeight,'我是高度')
      let rem = docEl.clientWidth / 45
      docEl.style.fontSize = rem + 'px'
    }
  
    setRemUnit()
  
    // reset rem unit on page resize
    window.addEventListener('resize', setRemUnit)
    window.addEventListener('pageshow', function (e) {
      if (e.persisted) {
        setRemUnit()
      }
    })
  
    // detect 0.5px supports
    if (dpr >= 2) {
      let fakeBody = document.createElement('body')
      let testElement = document.createElement('div')
      testElement.style.border = '.5px solid transparent'
      fakeBody.appendChild(testElement)
      docEl.appendChild(fakeBody)
      if (testElement.offsetHeight === 1) {
        docEl.classList.add('hairlines')
      }
      docEl.removeChild(fakeBody)
    }
  }(window, document))