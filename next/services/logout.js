import Swal from 'sweetalert2'

const logOut = async () => {
  try {
    const response = await fetch('http://localhost:3005/api/member/logout', {
      method: 'POST',
      credentials: 'include',
    })

    if (response.ok) {
      const memberIds = JSON.parse(localStorage.getItem('memberIds')) || []
      memberIds.forEach((memberId) => {
        localStorage.removeItem(`shippingMethod_${memberId}`)
      })
      localStorage.removeItem('cartItems')
      localStorage.removeItem('memberIds')
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('shippingMethod_')) {
          localStorage.removeItem(key)
        }
      })
      // 登出成功後的處理，例如重定向到登入頁面
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '已登出！',
        showConfirmButton: false,
        timer: 1200,
      }).then(() => {
        window.location.href = '/'
      })
    } else {
      throw new Error('登出失敗')
    }
  } catch (error) {
    console.error('登出過程中發生錯誤:', error)
  }
}

export default logOut
