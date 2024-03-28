export  function createShopExam(values) {
    const { shop_name, shop_site, shop_info } = values

    //檢查必填欄位
    if(!shop_name || !shop_site || !shop_info){
        return '請輸入必填欄位'
    }
    //檢查shop_name < 25字元
    if(shop_name.length > 25){
        return '賣場名稱請控制在25字元內'
    }
    //檢查shop_site 是英文數字大小寫 < 25字元
    if(!/^[a-zA-Z0-9-_]{1,99}$/.test(shop_site)){
        return '網址僅可輸入100字元內的英文大小寫或數字！'
    }
    //檢查shop_info 有30-200字元內
    if(shop_info.length < 30){
        return '賣場介紹需要30字元以上'
    }
    //檢查shop_info 有30-200字元內
    if(shop_info.length > 200){
        return '賣場介紹不可超過200字元！'
    }
    //所有檢查通過，就不顯示錯誤訊息
    return null
}
