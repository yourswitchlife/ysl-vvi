const AuthToken = {
  // 我在登入時候會用到 AuthToken.setToken(token)
  setToken: (token) => {
    // 設定 cookie，有效期為1小時
    document.cookie = `token=${token}; max-age=3600; path=/`
  },

  // 有人需要拿登入的token時候會用到 AuthToken.setToken(token) 
  // 從 httpcookie 中獲取 token
  getToken: () => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1]
    return token || 'token不存在'
  },

  // 登出時候會用到 AuthToken.removeToken()
  removeToken: () => {
    // 刪除 cookie
    document.cookie = 'token=; max-age=0; path=/'
  },
}

export default AuthToken
