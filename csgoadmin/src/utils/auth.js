// import Cookies from 'js-cookie'

const TokenKey = 'eoms_token'

export function getToken() {
  // return Cookies.get(TokenKey)
  return window.localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return window.localStorage.setItem(TokenKey, token, { expires: 365 })
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}
