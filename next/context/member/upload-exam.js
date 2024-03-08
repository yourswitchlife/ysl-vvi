export function uploadExam(values) {
    const { name, address, birthday, phone } = values;

    // 檢查必填欄位
    if (!name || !address || !birthday || !phone) {
        return '請輸入必填欄位';
    }

    // 檢查手機10碼
    if (!/^09\d{8}$/.test(phone)) {
        return '手機號碼格式錯誤';
    }

    // 所有檢查都通過時，啥都不顯示
    return null;
}
