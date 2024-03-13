import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { useAuth } from '@/hooks/use-Auth'
import mainCheckToLogin from '@/hooks/use-mainCheckToLogin'
//Component
import SellerNavbar from '@/components/layout/navbar/seller-navbar'
import Sidebar from '@/components/seller/sidebar'
import SellerCover from '@/components/seller/sellerCover'
import styles from '@/components/seller/seller.module.scss'
import SellerFooter from '@/components/layout/footer/footer-backstage'
import PhoneTabNav from '@/components/layout/navbar/phone-TabNav'

import Form from 'react-bootstrap/Form'
import Swal from 'sweetalert2'
//images
import profilePhoto from '@/public/images/profile-photo/default-profile-img.svg'
import cover from '@/public/images/shopCover/default-cover.jpg'


export default function ShopSetting() {

  const { isLoggedIn, memberId, memberData } = useAuth()
  const [bigPic, setBigPic] = useState(profilePhoto)
  const [shopCover, setShopCover] = useState(cover)
   //控制賣場元件
   const [shopName, setShopName] = useState('')
   const [shopSite, setShopSite] = useState('')
   const [shopInfo, setShopInfo] = useState('')
   const [selectedFile, setSelectedFile] = useState(null);
   const [previewImage, setPreviewImage] = useState(null);
   const fileInputRef = useRef(null);
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


  //body style
  useEffect(() => {
    // 當元件掛載時添加樣式
    document.body.classList.add(styles.bodyStyleA)

    // 當元件卸載時移除樣式
    return () => {
      document.body.classList.remove(styles.bodyStyleA)
    }
  }, [])

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
        shop_site: memberData.shop_site || '',
        shop_info: memberData.shop_info || '',
        shop_valid: memberData.shop_valid || ''
      }
      setInitialFormData(data)
      setFormData(data)
    }
  }, [memberData])

  const handleShop = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData, 
      [name]: value
    }))
    //表單驗證的地方
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

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
          title: "賣場更新成功",
          text: "二手遊戲的新天地，一起販售商品吧！",
          icon: "success",
          showConfirmButton: false,
          timer: 1200
        })
      }else{
        // 更新失敗，顯示錯誤訊息
        // Swal.fire({
        //   title: "喔喔!",
        //   text: "您的個人資料更新錯誤！",
        //   icon: "error"
        // });
        console.error('資料更新失敗！');
      }
    }catch(error){
      console.error('資料更新發生錯誤:', error);
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    console.log(file)

    if(file){
      setSelectedFile(file)
      previewFile(file)
    }
  }
  //預覽檔案
  const previewFile = (file) => {
    const reader = new FileReader() //fileReader是一個可以讀取檔案內容的web API(來做圖片預覽)

    reader.onloadend = () => {
      console.log(reader.result) //生成的資料 URL用於顯示圖片預覽
      setPreviewImage(reader.result)
      handleUpload(file)
    }
    reader.readAsDataURL(file) //將檔案讀取為一個資料 URL(以 base64 編碼)包含了檔案的完整內容
    //特別適合於小型的檔案，如圖片，因為它可以直接被網頁中的元素使用
  }
  //上傳
  const handleUpload = async (file) => {
    if(file){
      const formData = new FormData()
      // console.log(formData)
      formData.append('file', file)
      // console.log(selectedFile)
      try{
        const response = await fetch(`http://localhost:3005/api/seller/shop/shopCover`,{
          method: 'PUT',
          body: formData,
          credentials: 'include',
        })
        if (response.ok){
          console.log('賣場封面上傳成功')
        } else {
          console.error('賣場封面上傳失敗')
        }
      }catch(error){
        console.error('上傳過程中發生錯誤：', error)
      }
    }else{
      console.error('請選擇一個文件')
    }
  }

  //上傳預覽
  useEffect(() => {
    fileInputRef.current = document.getElementById('fileInput')
  }, [])

  const handleClick = () => {
    if(fileInputRef.current){
      fileInputRef.current.click()
      console.log('File Input Clicked!')
    }else{
      console.error('FileInputRef is null')
    }
  }
 

  return (
    <>
        <header>
          <SellerNavbar />
        </header>
        <main className={styles.mainContainer}>
          <div className="d-none d-md-block">
          {memberData && (
            <>
              <Sidebar profilePhoto={bigPic} memberShopSite={memberData.shop_site} memberShopName={memberData.shop_name}/>
            </>
          )}
          </div>
          <div>
            {/* cover */}
            {/* {memberData && (
              <>
                <SellerCover shopCover={shopCover}/>
              </>
            )} */}
            <div className="d-flex flex-column d-lg-none container py-4">
              <Form>
              <Form.Group controlId="coverFile" className="mb-3">
                  <Form.Label className="">賣場封面</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
                <div className="d-flex justify-content-around align-items-center mt-4 mb-2">
                
                  <div className={`${styles.profile}`}>
                    <Image src={bigPic} alt="profile-photo" width={75} height={75} className={styles.fit} />
                  </div>
                  <div className="d-flex flex-column align-items-start justify-content-center">
                  <Form.Group className="mb-3" controlId="shop_name">
                  <Form.Label className="">賣場名稱</Form.Label>
                  <Form.Control 
                  type="text"
                  name="shop_name"
                  value={formData.shop_name} 
                  onChange={handleShop} 
                  placeholder="請輸入賣場名稱(25字元以內)" />
                </Form.Group>
                  </div>
                </div>
                <hr />
                <Form.Group className="mb-2" controlId="shop_site">
                  <Form.Label className="mb-1">賣場網址</Form.Label>
                  <div className="d-flex align-items-center">
                    <h6 className="mb-0 fw-normal me-1">
                      http://www.yourswitchlife.com/
                    </h6>
                    <Form.Control
                        size="sm"
                        type="text"
                        name="shop_site"
                        placeholder="請輸入賣場網址(僅限輸入數字英文大小寫)"
                        value={formData.shop_site}
                        onChange={handleShop}
                      />
                  </div>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="shop_info"
                >
                  <Form.Label className="">賣場介紹</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="請輸入30~50字的賣場介紹"
                    name="shop_info"
                    value={formData.shop_info}
                    onChange={handleShop}
                  />
                </Form.Group>
                <div className="d-flex justify-content-center mb-4">
                  <button type="submit" className="btn btn-danger btn-sm me-2">
                  儲存並上架賣場
                  </button>
                  <button type="submit" className={`btn btn-danger btn-sm ${styles.btnDangerOutlined} me-2`}>
                      儲存暫不上架賣場
                    </button>
                  <button type="button" href="/" className={`btn btn-danger btn-sm ${styles.btnGrayOutlined}`}>
                    取消
                  </button>
                </div>
              </Form>
            </div>
            {/* ----------------電腦版------------------- */}
            <div className={`d-none d-md-block ${styles.dashboardMargin}`}>
              <div className={`mb-4 ${styles.dashboardStyle}`}>
                
                  <div className="d-flex align-items-end mb-4">
                    <h5 className="text-dark fw-bold mb-0 me-3">
                      賣場基本資料
                    </h5>
                    <p className="text-secondary mb-0">
                      查看及更新您的賣場資料
                    </p>
                  </div>
                  <div className="mb-3">
                    <h6 className="text-dark">賣場封面<span className="text-danger">*</span></h6>
                    <p className='text-secondary d-inline ms-2'>(接受的檔案格式: jpg, jpeg, png, webp)</p>
                    <div className={styles.coverB}>
                    {previewImage ? (
                    // 如果有預覽圖片，顯示預覽圖片
                    <img width={216} height={1172} className={styles.fit} src={previewImage} alt="new-shop-cover" />
                    ) : (
                      <Image height={216} width={1172} src={shopCover} alt="shop-cover" className={styles.fit} />
                    )}
                    </div>
                    <input 
                      className='d-none'
                      type='file'
                      id='fileInput'
                      name='file'
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      accept='.png, .jpg, .jpeg, .webp'
                    />
                    <button className='btn btn-danger btn-sm my-2 d-block' onClick={handleClick}>上傳照片</button>
                  </div>
                  <Form>
                  <Form.Group className="mb-3" controlId="shopName">
                    <Form.Label className="text-dark">賣場名稱<span className="text-danger">*</span></Form.Label>
                    <Form.Control 
                    type="text"
                    name="shop_name" 
                    placeholder="請輸入賣場名稱(25字元以內)" value={formData.shop_name} 
                  onChange={handleShop} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="shopSite">
                    <Form.Label className="text-dark">賣場網址</Form.Label>
                    <div className="d-flex align-items-center">
                      <h6 className="text-dark mb-0 me-1">
                        http://www.yourswitchlife.com/</h6>
                        <Form.Control
                          size="sm"
                          type="text"
                          name="shop_site"
                          placeholder="請輸入賣場網址(僅限輸入數字英文大小寫)"
                          value={formData.shop_site}
                        onChange={handleShop}
                        />
                    </div>
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="shopInfo"
                  >
                    <Form.Label className="text-dark">賣場介紹</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="請輸入30~50字的賣場介紹"
                      name="shop_info"
                      value={formData.shop_info}
                      onChange={handleShop}
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-center">
                    <button onClick={handleSubmit} type='button' className="btn btn-danger me-2">
                      儲存並上架賣場
                    </button>
                    <button onClick={handleSubmit} type='button' className={`btn btn-danger ${styles.btnDangerOutlined} me-2`}>
                      儲存暫不上架賣場
                    </button>
                    <button type="button" href="/" className={`btn btn-danger ${styles.btnGrayOutlined}`}>
                      取消
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </main>
        <div className={`d-block d-md-none ${styles.spaceForPhoneTab}`}></div>
          <PhoneTabNav />
        <footer className='d-none d-md-block'>
          <SellerFooter />
        </footer>
    </>
  )
}

export async function getServerSideProps(context) {
  return await mainCheckToLogin(context);
}
