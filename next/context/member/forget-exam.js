export default function ForgetExam(values) {
  const {verificationCode, newPassword, confirmPassword } = values;

  if (!verificationCode) {
    return '請輸入驗證碼。';
  }
  // 檢查密碼格式
  const newPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!newPasswordRegex.test(newPassword)) {
    return '密碼格式錯誤，請使用至少8個英文字母含數字';
  }

  // 檢查確認密碼是否一致
  if (newPassword !== confirmPassword) {
    return '與確認密碼不一致';
  }

  // 所有檢查都通過時，啥都不顯示
  return null;
}
