export const getParams = () => {
    let param = {}
    let url = window.location.href.split('?')
    if (url[1]) {
      let arr = url[1].split('&')
      for (let i = 0; i < arr.length; i++) {
        let obj = arr[i].split('=')
        param[obj[0]] = obj[1]
      }
    }
    // if (param.promo_code) {
    //   console.log(111)
    // } else {
    //   console.log(param)
    // }
    return param
}