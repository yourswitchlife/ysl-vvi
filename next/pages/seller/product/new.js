import React, { useEffect } from 'react'
import SellerNavbar from '@/components/layout/navbar/seller-navbar'
import Sidebar from '@/components/seller/sidebar'
import SellerCover from '@/components/seller/sellerCover'
import styles from '@/components/seller/seller.module.scss'
import { FaStar, FaPlus, FaRegHeart } from 'react-icons/fa'
import Link from 'next/link'
import profileImg from '@/public/images/profile-photo/peach.png'
import defaultHead from '@/public/images/profile-photo/default-profile-img.svg'
import gameCover from '@/public/images/seller/product-cover/crymachina.jpg'
import Image from 'next/image'
import SellerFooter from '@/components/layout/footer/footer-backstage'
import InputGroup from 'react-bootstrap/InputGroup'
import { FaCalendarAlt } from 'react-icons/fa'
import { BsFiles, BsSignStopLightsFill, BsHeart, BsFlag } from 'react-icons/bs'
import { IoBagCheckOutline } from 'react-icons/io5'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Pagination from '@/components/common/pagination'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Card from 'react-bootstrap/Card'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import PhoneTabNav from '@/components/layout/navbar/phone-TabNav'
import BreadCrumb from '@/components/common/breadcrumb'

export default function New() {
  //body style
  useEffect(() => {
    // 當元件掛載時添加樣式
    document.body.classList.add(styles.bodyStyleA)
    // 當元件卸載時移除樣式
    return () => {
      document.body.classList.remove(styles.bodyStyleA)
    }
  }, [])

  // function handleSubmit(e) {
  //   e.prevent.default()
  // }

  return (
    <>
      <header>
        <SellerNavbar />
      </header>
      <main className={styles.mainContainer}>
        <div className="d-none d-md-block">
          <Sidebar />
        </div>
        <div>
          {/* cover */}
          <div className='d-none d-md-block'><SellerCover /></div>
          <div className={`d-none d-md-block ${styles.dashboardMargin}`}>
            <div className="d-none d-md-block"><BreadCrumb/></div>
            <div className={`mb-4 ${styles.dashboardStyle}`}>
              <div className="d-flex justify-content-start align-items-center mb-3">
                <h5 className="text-dark fw-bold">商品基本資訊</h5>
                <h6 className="text-secondary ms-2">新增您的賣場商品</h6>
              </div>
              <Form className="row">
                  <Form.Group className="mb-3 col-12" controlId="productCover">
                    <div className="d-flex justify-content-center align-items-center">
                      <Form.Label className="mb-1 me-3 flex-shrink-0">
                        <h5 className="text-dark">
                          商品封面照<span className="text-danger">*</span>
                        </h5>
                      </Form.Label>
                      <Form.Control
                        type="file"
                        placeholder="請選擇商品封面照"
                      />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3 col-12" controlId="productCover">
                    <div className="d-flex justify-content-center align-items-center">
                      <Form.Label className="mb-1 me-3 flex-shrink-0 d-flex align-items-end">
                        <h5 className="text-dark mb-0">商品詳細照</h5>
                        <p className="text-secondary mb-1">
                          (1~3張)<span className="text-danger">*</span>
                        </p>
                      </Form.Label>
                      <Form.Control
                        type="file"
                        placeholder="請選擇商品封面照"
                        multiple
                      />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3 col-6" controlId="productName">
                    <div className="d-flex justify-content-center align-items-center">
                      <Form.Label className="mb-1 me-3 flex-shrink-0">
                        <h5 className="text-dark">
                          商品名稱<span className="text-danger">*</span>
                        </h5>
                      </Form.Label>
                      <Form.Control type="text" placeholder="請輸入商品名稱" />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3 col-6" controlId="typeName">
                    <div className="d-flex justify-content-center align-items-center">
                      <Form.Label className="mb-1 me-3 flex-shrink-0">
                        <h5 className="text-dark">
                          遊戲類別<span className="text-danger">*</span>
                        </h5>
                      </Form.Label>
                      <Form.Select aria-label="Default select example">
                        <option>請選擇遊戲類別</option>
                        <option value="1">RPG - 角色扮演</option>
                        <option value="2">AVG - 冒險遊戲</option>
                        <option value="3">ETC - 其他類型</option>
                        <option value="4">ACT - 動作遊戲</option>
                        <option value="5">SLG - 策略遊戲</option>
                        <option value="6">RAC - 競速遊戲</option>
                        <option value="7">SPG - 體育遊戲</option>
                        <option value="8">STG - 射擊遊戲</option>
                        <option value="9">FTG - 格鬥遊戲</option>
                      </Form.Select>
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3 col-6" controlId="typeName">
                    <div className="d-flex justify-content-center align-items-center">
                      <Form.Label className="mb-1 me-3 flex-shrink-0">
                        <h5 className="text-dark">
                          遊戲分級<span className="text-danger">*</span>
                        </h5>
                      </Form.Label>
                      <Form.Select aria-label="Default select example">
                        <option>請選擇遊戲級別</option>
                        <option value="1">普遍級</option>
                        <option value="2">保護級</option>
                        <option value="3">輔導級</option>
                        <option value="4">限制級</option>
                      </Form.Select>
                    </div>
                  </Form.Group>
                  {/* {['checkbox'].map((type) => (
                    <div key={`default-${type}`} className="mb-3">
                      <Form.Check // prettier-ignore
                        type={type}
                        id={`default-${type}`}
                        label={`default ${type}`}
                      />
                    </div>
                  ))} */}
                  <div key="lang-checkbox" className="mb-1 d-flex justify-content-start align-items-center col-6">
                      <Form.Label className="mb-1 me-3 flex-shrink-0">
                        <h5 className="text-dark">
                          語言<span className="text-danger">*</span>
                        </h5>
                      </Form.Label>
                      <Form.Check // prettier-ignore
                        type="checkbox"
                        id="lang-checkbox"
                        label="中文版"
                        className='text-dark me-2'
                      />
                      <Form.Check // prettier-ignore
                        type="checkbox"
                        id="lang-checkbox"
                        label="日文版"
                        className='text-dark me-2'
                      />
                      <Form.Check // prettier-ignore
                        type="checkbox"
                        id="lang-checkbox"
                        label="英文版"
                        className='text-dark me-2'
                      />
                    </div>
                    <Form.Group
                  className="mb-3 col-12"
                  controlId="product-details"
                >
                  <Form.Label>
                  <h5 className="text-dark">
                  商品描述<span className="text-danger">*</span>
                        </h5>
                        </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="請輸入商品描述"
                  />
                </Form.Group>
                
                <div className="d-flex justify-content-center align-items-center mt-2">
                  <button type="button" className="btn btn-danger me-2">
                    儲存並上架
                  </button>
                  <button type="button" className={`btn ${styles.btnDangerOutlined} me-2`}>
                    儲存暫不上架
                  </button>
                  <button type="button" className={`btn ${styles.btnGrayOutlined}`}>
                    取消
                  </button>
                </div>
              </Form>
            </div>
          </div>
          <div className='d-block d-md-none container px-3 pt-2'>
          <div className="d-flex justify-content-start align-items-center my-3">
                <h6 className="fw-bold">商品基本資訊</h6>
                <p className="ms-2">新增您的賣場商品</p>
              </div>
              <Form className="row">
                  <Form.Group className="mb-3 col-12" controlId="productCover">
                    <div className="d-flex justify-content-center align-items-center">
                      <Form.Label className="mb-1 me-3 flex-shrink-0">
                        <h6>
                          商品封面照<span className="text-danger">*</span>
                        </h6>
                      </Form.Label>
                      <Form.Control
                        type="file"
                        placeholder="請選擇商品封面照"
                      />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3 col-12" controlId="productCover">
                    <div className="d-flex justify-content-center align-items-center">
                      <Form.Label className="mb-1 me-3 flex-shrink-0 d-flex align-items-end">
                        <h6 className="mb-0">商品詳細照</h6>
                        <p className="mb-1">
                          (1~3張)<span className="text-danger">*</span>
                        </p>
                      </Form.Label>
                      <Form.Control
                        type="file"
                        placeholder="請選擇商品封面照"
                        multiple
                      />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3 col-12" controlId="productName">
                    <div className="d-flex justify-content-center align-items-center">
                      <Form.Label className="mb-1 me-3 flex-shrink-0">
                        <h6>
                          商品名稱<span className="text-danger">*</span>
                        </h6>
                      </Form.Label>
                      <Form.Control type="text" placeholder="請輸入商品名稱" />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3 col-12" controlId="typeName">
                    <div className="d-flex justify-content-center align-items-center">
                      <Form.Label className="mb-1 me-3 flex-shrink-0">
                        <h6>
                          遊戲類別<span className="text-danger">*</span>
                        </h6>
                      </Form.Label>
                      <Form.Select aria-label="Default select example">
                        <option>請選擇遊戲類別</option>
                        <option value="1">RPG - 角色扮演</option>
                        <option value="2">AVG - 冒險遊戲</option>
                        <option value="3">ETC - 其他類型</option>
                        <option value="4">ACT - 動作遊戲</option>
                        <option value="5">SLG - 策略遊戲</option>
                        <option value="6">RAC - 競速遊戲</option>
                        <option value="7">SPG - 體育遊戲</option>
                        <option value="8">STG - 射擊遊戲</option>
                        <option value="9">FTG - 格鬥遊戲</option>
                      </Form.Select>
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3 col-12" controlId="typeName">
                    <div className="d-flex justify-content-center align-items-center">
                      <Form.Label className="mb-1 me-3 flex-shrink-0">
                        <h6>
                          遊戲分級<span className="text-danger">*</span>
                        </h6>
                      </Form.Label>
                      <Form.Select aria-label="Default select example">
                        <option>請選擇遊戲級別</option>
                        <option value="1">普遍級</option>
                        <option value="2">保護級</option>
                        <option value="3">輔導級</option>
                        <option value="4">限制級</option>
                      </Form.Select>
                    </div>
                  </Form.Group>
                  {/* {['checkbox'].map((type) => (
                    <div key={`default-${type}`} className="mb-3">
                      <Form.Check // prettier-ignore
                        type={type}
                        id={`default-${type}`}
                        label={`default ${type}`}
                      />
                    </div>
                  ))} */}
                  <div key="lang-checkbox" className="mb-1 d-flex justify-content-start align-items-center col-12">
                      <Form.Label className="mb-1 me-5 flex-shrink-0">
                        <h6>
                          語言<span className="text-danger">*</span>
                        </h6>
                      </Form.Label>
                      <Form.Check // prettier-ignore
                        type="checkbox"
                        id="lang-checkbox"
                        label="中文版"
                        className='me-2'
                      />
                      <Form.Check // prettier-ignore
                        type="checkbox"
                        id="lang-checkbox"
                        label="日文版"
                        className='me-2'
                      />
                      <Form.Check // prettier-ignore
                        type="checkbox"
                        id="lang-checkbox"
                        label="英文版"
                        className='me-2'
                      />
                    </div>
                    <Form.Group
                  className="mb-3 col-12"
                  controlId="product-details"
                >
                  <Form.Label>
                  <h6>
                  商品描述<span className="text-danger">*</span>
                        </h6>
                        </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="請輸入商品描述"
                  />
                </Form.Group>
                <div className="d-flex justify-content-center align-items-center mt-2">
                  <button type="button" className="btn btn-danger me-2">
                    儲存並上架
                  </button>
                  <button type="button" className={`btn ${styles.btnDangerOutlined} me-2`}>
                    儲存暫不上架
                  </button>
                  <button type="button" className={`btn ${styles.btnGrayOutlined}`}>
                    取消
                  </button>
                </div>
              </Form>
          </div>
          
        </div>
        <div className={`d-block d-md-none ${styles.spaceForPhoneTab}`}></div>
        <div className="d-block d-md-none">
          <PhoneTabNav />
        </div>
        <div className="d-none d-md-block">
          <SellerFooter />
        </div>
      </main>
    </>
  )
}
