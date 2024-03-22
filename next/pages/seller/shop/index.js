import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { useAuth } from '@/hooks/use-Auth'
import mainCheckToLogin from '@/hooks/use-mainCheckToLogin'
import { createShopExam } from '@/context/seller/create-shop-exam';
import { useRouter } from 'next/router'
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
  const router = useRouter()
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
   const [errorMessage, setErrorMessage] = useState('')
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
  const isDataChanged = JSON.stringify(formData) !== JSON.stringify(initialFormData)
  const [newMemberData, setNewMemberData] = useState([])
  // console.log(newMemberData)


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
        shop_site: memberData.shop_site || memberData.account,
        shop_info: memberData.shop_info || '',
        shop_valid: memberData.shop_valid || ''
      }
      setInitialFormData(data)
      setFormData(data)
      setNewMemberData(data)
    }
  }, [memberData])

  const handleShop = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData, 
      [name]: value
    }))
    //表單驗證的地方: context / createShopExam
    const Result = createShopExam({
      ...formData,
      [name]: value
    })
    setErrorMessage(Result)
  }

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
          updateMemberData(formData.shop_site)
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
  //上傳檔案
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    // console.log(file)

    if(file){
      setSelectedFile(file)
      previewFile(file)
    }
  }
  //預覽檔案
  const previewFile = (file) => {
    const reader = new FileReader() //fileReader是一個可以讀取檔案內容的web API(來做圖片預覽)

    reader.onloadend = () => {
      // console.log(reader.result) //生成的資料 URL用於顯示圖片預覽
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
      
      formData.append('file', file)
      console.log(formData.get('file'))
      console.log(selectedFile)
      try{
        const response = await fetch(`http://localhost:3005/api/seller/shop/shopCover`,{
          method: 'PUT',
          body: formData,
          credentials: 'include',
        }).catch(error => console.error('上傳過程中發生錯誤：', error))
        if (response.ok){
          // console.log('賣場封面上傳成功')
          Swal.fire({
            title: "賣場封面上傳成功",
            icon: "success",
            showConfirmButton: false,
            timer: 1400
          })
        } else {
          // console.error('賣場封面上傳失敗')
          Swal.fire({
              title: "外星人入侵!",
              text: "賣場封面上傳失敗",
              icon: "error"
            });
        }
      }catch(error){
        console.error('上傳過程中發生錯誤：', error)
      }
    }else{
      console.error('請選擇一個文件')
      Swal.fire({
        title: "請選擇一個封面圖檔",
        icon: "error"
      });
    }
  }

  //上傳預覽
  useEffect(() => {
    fileInputRef.current = document.getElementById('fileInput')
  }, [])

  const handleClick = () => {
    if(fileInputRef.current){
      fileInputRef.current.click()
      // console.log('File Input Clicked!')
    }else{
      console.error('FileInputRef is null')
    }
  }

  const updateMemberData = (updatedSite) => {
    setNewMemberData((prevData) => ({
      ...prevData,
      shop_site: updatedSite
    }))
  }
 

  return (
    <>
        <header>
        {memberData && 
          <SellerNavbar shopSite={newMemberData.shop_site}/>
        }
        </header>
        <div className={styles.mainContainer}>
          {memberData && (
            <>
              <Sidebar profilePhoto={bigPic} memberShopSite={memberData.shop_site} memberShopName={memberData.shop_name}/>
            </>
          )}
          <main className='flex-grow-1'>
            {/* cover */}
            {/* <div className={styles.coverB}>
          <Image height={170} width={1172} src={shopCover} alt="shop-cover" className={styles.fit} />
          </div> */}
            {/* {memberData && (
              <>
                <SellerCover shopCover={shopCover}/>
              </>
            )} */}
            <div className="d-flex flex-column d-lg-none container py-4 px-4">
              
              <div className="mb-1">
              <div className='d-flex align-items-center'>
                <h5 className='mb-2'>更新賣場資料</h5>
                <h6 className='mb-2 ms-2'>( <span className='text-danger '>* </span>為必填資料 )</h6>
              </div>
              <div className='d-flex align-items-center mb-1'>
                <h6>賣場封面</h6>
                <p className='text-light d-inline ms-2 mb-0'>( 接受的檔案格式: jpg, jpeg, png, webp )</p>
              </div>
                    <div className={styles.coverC}>
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
                    <button className='btn btn-danger btn-sm mt-2 mb-3 d-block' onClick={handleClick}>上傳照片</button>
                </div>
                <Form>
                <div className='d-flex'>
                  <div className={`${styles.profile} me-3`}>
                    <Image src={bigPic} alt="profile-photo" width={75} height={75} className={styles.fit} />
                  </div>
                  <Form.Group className="mb-3 flex-grow-1" controlId="shop_name">
                  <Form.Label className="">賣場名稱<small> (25字元以內) </small><span className='text-danger'>*</span></Form.Label>
                  <Form.Control 
                  type="text"
                  name="shop_name"
                  value={formData.shop_name} 
                  onChange={handleShop} 
                  placeholder="請輸入賣場名稱(25字元以內)"
                  />
                  </Form.Group>
                </div>
                <Form.Group className="mb-2" controlId="shop_site">
                  <Form.Label className="mb-1">賣場網址<small> (預設值為帳號名稱) </small><span className="text-danger">*</span></Form.Label>
                  <div className="d-flex align-items-center">
                    <h6 className="mb-0 fw-normal me-1">
                      http://www.yourswitchlife.com/
                    </h6>
                    <Form.Control
                        size="sm"
                        type="text"
                        name="shop_site"
                        placeholder="請輸入100字元內的賣場網址(僅限輸入數字英文大小寫)"
                        value={formData.shop_site}
                        onChange={handleShop}
                      />
                  </div>
                </Form.Group>
                <Form.Group
                  className="mb-2"
                  controlId="shop_info"
                >
                  <Form.Label className="">賣場介紹<small> (30~100字元以內) </small><span className='text-danger'>*</span></Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="請輸入30~100字的賣場介紹"
                    name="shop_info"
                    value={formData.shop_info}
                    onChange={handleShop}
                  />
                </Form.Group>
                <div style={{ height: '65px' }} className='mt-1 mb-2'>
                    <div className="error-message-container" style={{ visibility: errorMessage ? 'visible' : 'hidden' }}>
                      <div className="alert alert-danger">
                        {errorMessage}
                      </div>
                    </div>
                  </div>
                <div className="d-flex justify-content-center mb-4">
                  <button onClick={handleSubmit} type="button" className="btn btn-danger me-2" disabled={!isDataChanged}>
                  儲存
                  </button>
                  {/* <button type="submit" className={`btn btn-danger btn-sm ${styles.btnDangerOutlined} me-2`}>
                      儲存暫不上架賣場
                  </button> */}
                  <button onClick={() => {
                    router.push('./shop')
                  }} className={`btn btn-danger ${styles.btnGrayOutlined}`}>
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
                    <h6 className="text-secondary mb-0">
                      查看及更新您的賣場資料 ( <span className='text-danger '>* </span>為必填資料 )
                    </h6>
                  </div>
                  <div className="mb-3">
                  <div className='d-flex align-items-center'>
                    <h6 className="text-dark">賣場封面<span className="text-danger">*</span></h6>
                    <p className='text-secondary d-inline ms-2'>(接受的檔案格式: jpg, jpeg, png, webp)</p>
                  </div>
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
                    <Form.Label className="text-dark">賣場名稱<small> (25字元以內) </small><span className="text-danger">*</span></Form.Label>
                    <Form.Control 
                    type="text"
                    name="shop_name" 
                    placeholder="請輸入賣場名稱(25字元以內)" value={formData.shop_name} 
                  onChange={handleShop} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="shopSite">
                    <Form.Label className="text-dark">賣場網址<small> (預設值為帳號名稱) </small><span className="text-danger">*</span></Form.Label>
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
                    <Form.Label className="text-dark">賣場介紹<small> (30~100字元以內) </small><span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="請輸入30~100字的賣場介紹"
                      name="shop_info"
                      value={formData.shop_info}
                      onChange={handleShop}
                    />
                  </Form.Group>
                  <div style={{ height: '65px' }} className='mt-1 mb-2'>
                    <div className="error-message-container" style={{ visibility: errorMessage ? 'visible' : 'hidden' }}>
                      <div className="alert alert-danger">
                        {errorMessage && <h6>{errorMessage}</h6>}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button onClick={handleSubmit} type='button' className="btn btn-danger me-2" disabled={!isDataChanged}>
                      儲存賣場資料
                    </button>
                    {/* <button onClick={handleSubmit} type='button' className={`btn btn-danger ${styles.btnDangerOutlined} me-2`}>
                      儲存暫不上架賣場
                    </button> */}
                    <button type="button" onClick={() => {
                    router.push('./shop')
                  }} className={`btn btn-danger ${styles.btnGrayOutlined}`}>
                      取消
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </main>
        </div>
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
