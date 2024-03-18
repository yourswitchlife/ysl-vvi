import React, { createContext, useContext, useState } from 'react'

// 導出createContext方法
export const ShopContext = createContext()

// 導出全站Provider元件，集中要使用的狀態及邏輯函式
export function ShopProvider ({children}) {
    //現在的店家資訊
    const [formData, setFormData] = useState({
        shop_name: '',
        shop_site: '',
        shop_info: '',
        shop_valid: ''
      });

    const [initialFormData, setInitialFormData] = useState({
        shop_name: '',
        shop_site: '',
        shop_info: '',
        shop_valid: ''
    });

    useEffect(() => {
        if(isLoggedIn && memberData) {
          // console.log(memberData.shop_cover)
          const picUrl = memberData.pic ? (memberData.pic.startsWith("https://") 
            ? memberData.pic 
            : `http://localhost:3005/profile-pic/${memberData.pic}`) 
          : profilePhoto
          setBigPic(picUrl)
          const coverUrl = memberData.shop_cover ? (memberData.shop_cover.startsWith("https://") ? memberData.shop_cover : `http://localhost:3005/shopCover/${memberData.shop_cover}`) : cover
          setShopCover(coverUrl)
          // console.log(memberData)
          // getSellerData()
    
          const data = {
            shop_name: memberData.shop_name || '',
            shop_site: memberData.shop_site || memberData.account,
            shop_info: memberData.shop_info || '',
            shop_valid: memberData.shop_valid || ''
          }
          setInitialFormData(data)
          setFormData(data)
        }
      }, [memberData])

      const handleSubmit = async (e) => {
        e.preventDefault();
        const error = createShopExam(formData)
        setErrorMessage(error || '')
    
        // 如果沒有錯誤，執行提交表單的邏輯
        if(!error){
          try{
            const response = await fetch(`http://localhost:3005/api/seller/shop/edit`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                shop_name: formData.shop_name,
                shop_site: formData.shop_site,
                shop_info: formData.shop_info,
                shop_valid: formData.shop_valid
              }),
              credentials: 'include'
            })
            if (response.ok){
              Swal.fire({
                title: "賣場更新成功!",
                text: "快來上架二手遊戲一起販售商品吧！",
                icon: "success",
                showConfirmButton: true,
                // timer: 1200
              })
            }else{
              //處理錯誤情況
              const errorData = await response.json()
              console.log(errorData) //輸出錯誤資訊到控制台
              setErrorMessage(errorData.message)
              // 更新失敗，顯示錯誤訊息
              {errorMessage && Swal.fire({
                title: "儲存失敗",
                text: "請確認欄位資料正確！",
                icon: "error"
              }) }
              // console.error('資料更新失敗！');
            }
          }catch(error){
            console.error('資料更新發生錯誤:', error);
          }
        }
        
      }

  return (
    <ShopContext.Provider 
    value={{ formData, handleSubmit,}}>
        {children}
    </ShopContext.Provider>
  )
}