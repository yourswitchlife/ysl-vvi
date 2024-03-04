export default function SignupExam(values) {
  const { email, password, confirmPassword } = values;

  // 檢查是否有輸入 email、password 和 confirmPassword
  if (!email || !password || !confirmPassword) {
    return '所有欄位都必須填寫';
  }

  // 檢查信箱格式
  const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$/;
  if (!emailRegex.test(email)) {
    return '信箱格式錯誤';
  }

  // 檢查密碼格式
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    return '密碼格式錯誤，請使用至少8個英文字母含數字';
  }

  // 檢查確認密碼是否一致
  if (password !== confirmPassword) {
    return '與確認密碼不一致';
  }

  // 所有檢查都通過時，啥都不顯示
  return null;
}
