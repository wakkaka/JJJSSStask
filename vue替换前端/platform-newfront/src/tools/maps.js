/* eslint-disable */
export function MP () {
  return new Promise(function (resolve, reject) {
    window['init'] = () => {
      resolve(BMap)
    }
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'http://api.map.baidu.com/api?v=2.0&ak=1lvCDAsEB4YTsjM4uOGGLwkaXZpH03x3&callback=init'
    script.onerror = reject
    document.head.appendChild(script)

  })
}
