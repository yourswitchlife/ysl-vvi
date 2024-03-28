import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import SellerNavbar from '@/components/layout/navbar/seller-navbar'
import Sidebar from '@/components/seller/sidebar'
import SellerCover from '@/components/seller/sellerCover'
import styles from '@/components/seller/seller.module.scss'
// import Link from 'next/link'
import SellerFooter from '@/components/layout/footer/footer-backstage'
// import Form from 'react-bootstrap/Form'
import PhoneTabNav from '@/components/layout/navbar/phone-TabNav'
import BreadCrumb from '@/components/common/breadcrumb'
import { useAuth } from '@/hooks/use-Auth'
import mainCheckToLogin from '@/hooks/use-mainCheckToLogin'
import Swal from 'sweetalert2'
import axios from 'axios'

//images
import profilePhoto from '@/public/images/profile-photo/default-profile-img.svg'
import cover from '@/public/images/shopCover/default-cover.jpg'
import profileImg from '@/public/images/profile-photo/peach.png'
import defaultHead from '@/public/images/profile-photo/default-profile-img.svg'
import gameCover from '@/public/images/seller/product-cover/crymachina.jpg'

export default function New() {
  //抓會員資料
  const { isLoggedIn, memberId, memberData } = useAuth()
  const [bigPic, setBigPic] = useState(profilePhoto)
  const [shopCover, setShopCover] = useState(cover)
  const router = useRouter()
  const { pid } = router.query
  const [product, setProduct] = useState({
    pName: '',
    pCover: '',
    pImgs: [],
    pType: 0,
    pRating: '',
    pLanguage: [],
    pPrice: '',
    pDiscribe: '',
    release_time: '',
  })
  const [initProduct, setInitProduct] = useState({
    pName: '',
    pCover: '',
    pImgs: [],
    pType: 0,
    pRating: '',
    pLanguage: [],
    pPrice: '',
    pDiscribe: '',
    release_time: '',
  })
  const [errorMsg, setErrorMsg] = useState('')
  const typeOptions = [
    'RPG - 角色扮演',
    'AVG - 冒險遊戲',
    'ETC - 其他類型',
    'ACT - 動作遊戲',
    'SLG - 策略遊戲',
    'RAC - 競速遊戲',
    'SPG - 體育遊戲',
    'STG - 射擊遊戲',
    'FTG - 格鬥遊戲',
  ]
  const ratingOptions = ['普遍級', '保護級', '輔導級', '限制級']
  const languageOptions = ['CH-中文', 'EN-英文', 'JP-日文']
  const isDataChanged = JSON.stringify(product) !== JSON.stringify(initProduct)
  const [newProduct, setNewProduct] = useState([])
  // const MySwal = withReactContent(Swal)
  // console.log(memberId)
  //body style
  useEffect(() => {
    // 當元件掛載時添加樣式
    document.body.classList.add(styles.bodyStyleA)
    // 當元件卸載時移除樣式
    return () => {
      document.body.classList.remove(styles.bodyStyleA)
    }
  }, [])

  //抓會員資料：cover and profile photo
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
    }
  }, [isLoggedIn, memberId, memberData])

  const handleProduct = (e) => {
    const {name, value} = e.target
    setProduct((prevData) => ({
      ...prevData,
      [name]: value
    }))
    //表單驗證的地方
  }

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      const files = e.target.files
      if (e.target.multiple) {
        const fileName = Array.from(files).map((file) => file.name)
        setProduct({ ...product, [e.target.name]: fileName })
      } else {
        if (files.length > 0) {
          const file = files[0]
          setProduct({ ...product, [e.target.name]: file.name })
        }
      }
    } else if (e.target.type === 'checkbox') {
      const tv = e.target.value
      const checked = e.target.checked
      const name = e.target.name
      if (checked) {
        const update = product.pLanguage.includes(tv)
          ? product.pLanguage
          : [...product.pLanguage, tv]
        setProduct({ ...product, [name]: update })
      } else {
        const update = product.pLanguage.filter((v) => v !== tv)
        setProduct({ ...product, [name]: update })
      }
    } else setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const handleForm = async (e) => {
    // console.log(e.target)
    e.preventDefault()
    if (
      !product.pName ||
      !product.pDiscribe ||
      !product.pCover ||
      !product.pPrice ||
      !product.pLanguage ||
      !product.pRating ||
      !product.pImgs ||
      !product.pType
    ) {
      alert('請檢查是否輸入完整欄位資訊')
      return
    } else {
      const fd = new FormData(e.target)
      // console.log(fd.get('pLanguage'))
      fetch(
        `http://localhost:3005/api/products/edit/${pid}`,
        {
          credentials: 'include',
          method: 'PUT',
          body: fd,
        }
      )
        .then((res) => res.json())
        .then(
          Swal.fire({
            title: "賣場更新成功!",
            text: "快來上架二手遊戲一起販售商品吧！",
            icon: "success",
            showConfirmButton: true,
            timer: 1200
          })
          // setTimeout(() => {
          //   router.push('./product')
          // }, 1000)
        )
        .catch((error) => {
          console.error('error', error)
          Swal.fire({
            title: "儲存失敗",
            text: "請確認欄位資料正確！",
            icon: "error"
          })
        })
    }
  }
//   console.log(product)

  const clearForm = ()=>{
    setProduct({
      pName: '',
      pCover: '',
      pImgs: [],
      pType: 0,
      pRating: '',
      pLanguage: [],
      pPrice: '',
      pDiscribe: '',
      release_time: '',
    })
    document.getElementById('pCover').value = ''
    document.getElementById('pImgs').value = ''
  }
  // console.log(fd)

  useEffect(() => {
    if(pid && isLoggedIn && memberData){
      console.log(pid)
      fetch(`http://localhost:3005/api/seller/product/${pid}`)
      .then(response => {
        if(!response.ok){
          throw new Error('Network res was not OK')
        }
        return response.json()
      }
      )
      .then(data =>
        {
          console.log(data)
        //axios會將response數據放在data屬性中
        // console.log(response.data)
        // const data = response.data
        const item = {
          pName: data.pName || '',
          pCover: data.pCover || '',
          pImgs: data.pImgs || [],
          pType: data.pType || 0,
          pRating: data.pRating || '',
          pLanguage: data.pLanguage || [],
          pPrice: data.pPrice || '',
          pDiscribe: data.pDiscribe || '',
          release_time: data.release_time || '',
        }
        setProduct(item)
        setInitProduct(item)
      })
      .catch(error => console.error('Error fetching data:', error))
    }
  }, [pid, memberData])

  return (
    <>
      <SellerNavbar />
      <div className={styles.mainContainer}>
      {memberData && (
            <>
            <Sidebar 
              profilePhoto={bigPic} 
              memberShopSite={memberData.shop_site || memberData.account} 
              memberShopName={memberData.shop_name || memberData.account}/>
            </>
          )}
        <main className='flex-grow-1'>
          <div className={`${styles.dashboardMargin}`}>
            <div className="d-lg-block d-none">
              <BreadCrumb />
            </div>
            <div className={`mb-4 mt-lg-0 ${styles.dashboardStyle}`}>
              <div className="d-flex justify-content-start align-items-center mb-3">
                <h5 className="text-dark fw-bold">商品基本資訊</h5>
                <h6 className="text-secondary ms-2">編輯您的賣場商品</h6>
              </div>

              <form
                className=""
                // method="post"
                // action={'/addNewProduct'}
                // encType="multipart/form-data"
                onSubmit={handleForm}
              >
                <div className="row">
                  {/* 商品名稱 */}
                  <div className="mb-3 col-12 d-flex justify-content-center align-items-center">
                    <label htmlFor="pName" className="h6 me-2 flex-shrink-0">
                      <h5 className="text-dark">
                        商品名稱<span className="text-danger">*</span>
                      </h5>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="pName"
                      name="pName"
                      value={product.pName}
                      placeholder="請輸入商品名稱"
                      onChange={handleChange}
                    />
                  </div>
                  {/* 商品封面照 */}
                  <div className="mb-3 col-12 d-flex justify-content-center align-items-center">
                    <label htmlFor="pCover" className="h6 me-2 flex-shrink-0">
                      <h5 className="text-dark">
                        商品封面照<span className="text-danger">*</span>
                      </h5>
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="pCover"
                      name="pCover"
                      accept="image/*"
                      // value={product.pCover}
                      onChange={handleChange}
                    />
                  </div>
                  {/* 商品詳細照 */}
                  <div className="mb-3 col-12 d-flex justify-content-center align-items-center">
                    <label
                      htmlFor="pImgs"
                      className="h6 me-2 flex-shrink-0 d-flex align-items-end"
                    >
                      <h5 className="text-dark mb-0">商品詳細照</h5>
                      <p className="text-secondary mb-1">
                        (1~3張)<span className="text-danger h5">*</span>
                      </p>
                    </label>
                    <input
                      type="file"
                      multiple
                      className="form-control"
                      id="pImgs"
                      name="pImgs"
                      // value={product.pImgs}
                      accept="image/*"
                      onChange={(e) => {
                        const files = e.target.files
                        if (files.length > 3) {
                          alert('最多只能上傳3張')
                          setProduct({ ...product, pImgs: [] })
                          e.target.value = ''
                          return
                        }
                        handleChange(e)
                      }}
                    />
                  </div>
                  {/* 遊戲類別 */}
                  <div className="mb-3 col-lg-6 col-12 d-flex justify-content-center align-items-center">
                    <label htmlFor="pType" className="me-2 flex-shrink-0">
                      <h5 className="text-dark">
                        遊戲類別<span className="text-danger">*</span>
                      </h5>
                    </label>
                    <select
                      name="pType"
                      value={product.pType}
                      onChange={handleChange}
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option defaultValue={0}>請選擇遊戲類別</option>
                      {typeOptions.map((v, i) => {
                        return (
                          <option key={i} value={i + 1}>
                            {v}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                  {/* 遊戲分級 */}
                  <div className="mb-3 col-lg-6 col-12 d-flex justify-content-center align-items-center">
                    <label htmlFor="pRating" className="me-2 flex-shrink-0">
                      <h5 className="text-dark">
                        遊戲分級<span className="text-danger">*</span>
                      </h5>
                    </label>
                    <select
                      name="pRating"
                      value={product.pRating}
                      onChange={handleChange}
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option defaultValue={0}>請選擇遊戲分級</option>
                      {ratingOptions.map((v, i) => {
                        return (
                          <option key={i} value={i + 1}>
                            {v}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                  {/* 商品發售時間 */}
                  <div className="mb-3 col-12 d-flex justify-content-center align-items-center">
                    <label
                      htmlFor="release_time"
                      className="h6 me-2 flex-shrink-0"
                    >
                      <h5 className="text-dark">
                        發售時間<span className="text-danger">*</span>
                      </h5>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="release_time"
                      name="release_time"
                      value={product.release_time}
                      // placeholder="請輸入商品名稱"
                      onChange={handleChange}
                    />
                  </div>
                  {/* 商品語言 */}
                  <div className="mb-3 col-lg-6 col-12 d-flex ">
                    <label
                      htmlFor="pLanguage"
                      className="h6 me-2 flex-shrink-0"
                    >
                      <h5 className="text-dark">
                        語言<span className="text-danger">*</span>
                      </h5>
                    </label>
                    {languageOptions.map((v, i) => {
                      return (
                        <label className="me-3 text-dark" key={i}>
                          <input
                            key={i}
                            type="checkbox"
                            className="form-check-input me-1"
                            checked={product.pLanguage.includes(v)}
                            value={v}
                            name="pLanguage"
                            onChange={handleChange}
                          />
                          {v}
                        </label>
                      )
                    })}
                  </div>
                  {/* 商品價格 */}
                  <div className="mb-3 col-lg-6 col-12 d-flex justify-content-center align-items-center">
                    <label htmlFor="pPrice" className="h6 me-2 flex-shrink-0">
                      <h5 className="text-dark">
                        商品價格<span className="text-danger">*</span>
                      </h5>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="pPrice"
                      name="pPrice"
                      value={product.pPrice}
                      placeholder="請輸入商品價格"
                      onChange={handleChange}
                    />
                  </div>

                  {/* 商品描述 */}
                  <div className="mb-3 col-12 d-flex justify-content-center align-items-center">
                    <label
                      htmlFor="pDiscribe"
                      className="h6 me-2 flex-shrink-0"
                    >
                      <h5 className="text-dark">
                        商品描述<span className="text-danger">*</span>
                      </h5>
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      id="pNapDiscribeme"
                      name="pDiscribe"
                      value={product.pDiscribe}
                      placeholder="請輸入商品描述"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                {/* buttons */}
                <div className="d-flex justify-content-center align-items-center mt-2">
                  <button type="button" onCLick={handleForm} className="btn btn-danger me-2" disabled={!isDataChanged}>
                    儲存
                  </button>
                  {/* <button
                    type="button"
                    className={`btn ${styles.btnDangerOutlined} me-2`}
                  >
                    儲存暫不上架
                  </button> */}
                  {/* 清空表單 */}
                  <button
                    type="button"
                    className={`btn ${styles.btnGrayOutlined}`}
                    onClick={() => {
                      // clearForm()
                      router.push('./')
                    }}
                  >
                    取消
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className={`d-block d-md-none ${styles.spaceForPhoneTab}`}></div>
        </main>
       </div>
      <PhoneTabNav />
      <div className="d-none d-md-block">
        <SellerFooter />
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  return await mainCheckToLogin(context)
}
