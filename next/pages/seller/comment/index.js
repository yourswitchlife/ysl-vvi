import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/use-Auth'
import mainCheckToLogin from '@/hooks/use-mainCheckToLogin'
import Image from 'next/image'
import { useRouter } from 'next/router';
//components
import SellerNavbar from '@/components/layout/navbar/seller-navbar'
import Sidebar from '@/components/seller/sidebar'
import SellerCover from '@/components/seller/sellerCover'
import Star from '@/components/shop/star'
import PhoneTabNav from '@/components/layout/navbar/phone-TabNav'
import SellerFooter from '@/components/layout/footer/footer-backstage'
import styles from '@/components/seller/seller.module.scss'
import { FaStar } from 'react-icons/fa'
import Pagination from '@/components/common/pagination'
//images
import profilePhoto from '@/public/images/profile-photo/default-profile-img.svg'
import cover from '@/public/images/shopCover/default-cover.jpg'
import gameCover from '@/public/images/profile-photo/default-profile-img.svg'
//React bootstrap
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Card from 'react-bootstrap/Card'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Modal from 'react-bootstrap/Modal';
//npm install
import Swal from 'sweetalert2'

export default function Comment() {
  //body style
  useEffect(() => {
    // 當元件掛載時添加樣式
    document.body.classList.add(styles.bodyStyleA)
    // 當元件卸載時移除樣式
    return () => {
      document.body.classList.remove(styles.bodyStyleA)
    }
  }, [])
  const router = useRouter()
  const { isLoggedIn, memberId, memberData } = useAuth()
  const [bigPic, setBigPic] = useState(profilePhoto)
  const [memberPic, setMemberPic] = useState(profilePhoto)
  const [shopCover, setShopCover] = useState(cover)
  const [comments, setComments] = useState([])
  const [shopRating, setShopRating] = useState("0.0")
  const [commentNum, setCommentNum] = useState(0)
  const [reply, setReply] = useState('')
  const [selectCid, setSelectCid] = useState(null)
  //Modal for reply comments
  const [showModal, setShowModal] = useState(false)
  const handleCloseModal = () => setShowModal(false)
  //執行tabs篩選
  const [selectedTab, setSelectedTab] = useState('all')
  //頁數
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(6)
  //搜尋
  const [searchQuery, setSearchQuery] = useState('')

  //修改Modal讓他可以接受comment的id
  const handleShowModal = (comment) => {
    setSelectCid(comment.id)
    setReply(comment.reply || '')
    setShowModal(true)
  }
  
  const fetchShopComments = async() => {
    try{
      const url = `http://localhost:3005/api/seller/comment?tab=${selectedTab}&search=${encodeURIComponent(searchQuery)}&page=${page}&limit=${limit}`
      // console.log('Fetching comments with URL:', url)
      const res = await fetch(url , { credentials: 'include'})
      if(!res.ok){
        throw new Error('網路請求失敗，找不到賣家資料')
      }
      let data = await res.json()
        //格式化日期再寫進去
        data.items = formatComments(data.items)
        setComments(data.items)
        // console.log(data)
        //取得評價平均
        // const totalRating = data.reduce((acc, cur) => acc + cur.rating, 0);
        // const averageRating = (totalRating / data.length).toFixed(1); // 保留一位小數
        // console.log(averageRating)
        setShopRating(parseFloat(data.items[0]?.avg_rating || 0).toFixed(1))
        //取得評價總數
        setCommentNum(data.items[0]?.total_comments || 0)
        // router.push(`comment?tab=${selectedTab}`)
        // router.push(`./comment?tab=${selectedTab}`)
        setTotalPages(data.totalPages)
        // router.push(`./comment?page=${page}`)
    }catch(e){
      console.error('回傳賣家評論錯誤：', e)
    }
  } 

  useEffect(() => {
    if(isLoggedIn) {
      fetchShopComments(selectedTab)
      const picUrl = memberData.pic ? (memberData.pic.startsWith("https://") 
        ? memberData.pic 
        : `http://localhost:3005/profile-pic/${memberData.pic}`) 
      : profilePhoto
      setBigPic(picUrl)
      const coverUrl = memberData.shop_cover ? (memberData.shop_cover.startsWith("https://") ? memberData.shop_cover : `http://localhost:3005/shopCover/${memberData.shop_cover}`) : cover
      setShopCover(coverUrl)
    }
  }, [isLoggedIn, memberId, memberData, selectedTab, page, limit])
  
  const handleTabChange = (selectedTab) => {
    //更新狀態
    setSelectedTab(selectedTab)
    //更新url的查詢參數（但不加載頁面）
    router.push(`/comment?tab=${selectedTab}`, undefined, { shallow: true })
  }
  //加上搜尋按鈕的點擊事件處理函數
  const handleSearch = () => {
    setPage(1) //重置到第一頁
    fetchShopComments()
  }

  useEffect(() => {
    //從url查詢中獲取tab值
    const { tab } = router.query
    //如果有tab值，更新狀態
    if(tab){
      setSelectedTab(tab)
    }
  }, [router.query])

  function formatComments(comments){
    return comments.map(comment => {
      const date = new Date(comment.created_at)
      const formattedDate = date.getFullYear() +'-'+ String(date.getMonth() + 1).padStart(2, '0') + // 月份從0開始，所以+1
      '-' + String(date.getDate()).padStart(2, '0') +
      ' ' + String(date.getHours()).padStart(2, '0') +
      ':' + String(date.getMinutes()).padStart(2, '0') +
      ':' + String(date.getSeconds()).padStart(2, '0')
      return {
        ...comment,
        created_at: formattedDate
      };
    })
  }

  const handleSubmitReply = async () => {
    //確認reply不是空的
    if(!reply.trim()){
      alert("請輸入回覆內容！")
      return
    }

    try{
      const response = await fetch(`http://localhost:3005/api/seller/comment/reply`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          cid: selectCid,
          reply: reply
        })
      })
      if(response.ok){
        //處理成功的邏輯，例如關閉Modal清空回覆內容
        const data = await response.json()
        Swal.fire({
          title: '成功回覆！',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000 // 1000毫秒 = 1秒
        })
        // console.log('回覆成功：', data)
        handleCloseModal()
        setReply('') //重置回覆內容
        setSelectCid(null) //重置cid
        fetchShopComments()//這裡可以增加刷新評論列表（增加顯示賣家的回覆）
      }else{
        throw new Error('回覆失敗')
      }
    }catch(error){
      console.error('回覆訊息錯誤：', error)
      alert('提交回覆時發生錯誤，請稍後再試')
    }
  }

  //處理刪除評論：寫空白的進去
  const handleDeleteReply = async (cid) => {
    //待會回去寫api
    Swal.fire({
      title: "確定要刪除回覆嗎？",
      text: "一旦刪除，您將無法恢復此條回覆！",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: '確認刪除',
      cancelButtonText: '取消'
    })
    .then(async(result) => {
      if(result.isConfirmed){
        try{
          const response = await fetch(`http://localhost:3005/api/seller/comment/delete`, {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ cid })
        });
        if (response.ok) {
          // 成功刪除後，Swal一下
          Swal.fire("成功刪除回覆！", {
            icon: 'success',
          })
          //更新評論列表
          fetchShopComments(); 
        } else {
          throw new Error('刪除回覆失敗');
        }
      }catch (error) {
        console.error('刪除回覆錯誤：', error)
        Swal.fire("刪除回覆失敗！", {
          icon: 'error',
        })
      }
    }else{
      Swal.fire("您的回覆還活著！")
    }
  })
  }

  const handlePageChange = (newpage) => {
    setPage(newpage)
  }

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
        {memberData && (
            <>
              <Sidebar profilePhoto={bigPic} memberShopSite={memberData.shop_site} memberShopName={memberData.shop_name}/>
            </>
          )}
        </div>
        <div>
          {/* cover */}
          {memberData && (
              <>
                <SellerCover shopCover={shopCover}/>
              </>
            )}
          <div className="d-flex flex-column d-lg-none container ps-4 pe-4">
            <div className="d-flex justify-content-around align-items-center mt-4 mb-2">
              <div className={`${styles.profile}`}>
              {memberData && <Image src={bigPic} width={75} height={75} alt="profile-photo" className={styles.fit} />}
              </div>
              <div className="d-flex flex-column align-items-start justify-content-center">
              {memberData && <h5 className="mb-1 fw-bold">{memberData.shop_name}</h5>}
              {memberData && <p className="mb-1">@{memberData.shop_site}</p>}
              </div>
              <div>
              {memberData &&
                <button className="btn btn-danger btn-sm" onClick={() => {
                  router.push(`/shop/${memberData.shop_site}`)
                }}>查看賣場</button>}
              </div>
            </div>
            <hr />
          </div>
          <div className={`d-none d-md-block ${styles.dashboardMargin}`}>
            <div className={`mb-4 ${styles.dashboardStyle}`}>
              <Form>
                <div className="d-flex justify-content-between align-items-end mb-4">
                  <div className="d-flex justify-content-start align-items-end">
                    <h5 className="text-dark mb-0 me-3">賣場評價</h5>
                    <h6 className="text-secondary fw-normal mb-0">
                      查看您的賣場評價
                    </h6>
                  </div>
                  <h6 className="text-secondary fw-normal mb-0">
                    <span className="text-danger fw-bold fs-4">{shopRating}</span> / 5.0
                  </h6>
                </div>
                <Form.Group className="mb-3" controlId="memberName">
                  <Form.Label className="text-dark">會員名稱</Form.Label>
                  <Form.Control 
                  type="text" 
                  placeholder="請輸入會員名稱"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                  }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="dateSelect">
                  <Form.Label className="text-dark">評價時間</Form.Label>
                  <div className="d-flex justify-content-between align-items-center">
                    <InputGroup className={`mb-0 ${styles.dateSelect}`}>
                      <Form.Control
                        type="date"
                        aria-label="dateSelectStart"
                        aria-describedby="dateSelectStart"
                        className={styles.dateInput}
                      />
                    </InputGroup>
                    <span className="text-dark mb-0 mx-2">-</span>
                    <InputGroup className={`mb-0 ${styles.dateSelect}`}>
                      <Form.Control
                        type="date"
                        aria-label="dateSelectEnd"
                        aria-describedby="dateSelectEnd"
                        className={styles.dateInput}
                      />
                    </InputGroup>
                  </div>
                </Form.Group>
                <div className="d-flex justify-content-center">
                  {/* <button
                    type="button"
                    href="/"
                    className="btn btn-danger me-2"
                    onChange={handleSubmit}
                  > */}
                  <button type="button" className="btn btn-danger me-2"
                  onClick={handleSearch}>
                    搜尋
                  </button>
                  <button type="button" className="btn btn-danger">
                    取消
                  </button>
                </div>
              </Form>
            </div>
            <div className={`mb-5 ${styles.dashboardStyle}`}>
              <Nav
                variant="tabs"
                defaultActiveKey="/comment/all"
                className="mb-4"
              >
                <Nav.Item>
                  <Nav.Link onClick={() => {
                    setSelectedTab('all')
                  }} className={selectedTab === 'all' ? "text-danger" : "text-secondary"}>
                    全部
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link onClick={() => {
                    setSelectedTab('unreply')
                  }} className={selectedTab === 'unreply' ? "text-danger" : "text-secondary"}>
                    待回覆
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link onClick={() => {
                    setSelectedTab('replied')
                  }} className={selectedTab === 'replied' ? "text-danger" : "text-secondary"}>
                    已回覆
                  </Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                  <Nav.Link eventKey="disabled" disabled>
                    Disabled
                  </Nav.Link>
                </Nav.Item> */}
              </Nav>
              <h5 className='ms-2 fw-bold text-dark'>{commentNum}則評論</h5>
              {/* <ButtonGroup aria-label="ratingSort" size="sm">
                <Button variant="secondary">全部</Button>
                <Button variant="secondary">5顆星(141)</Button>
                <Button variant="secondary">4顆星(1)</Button>
                <Button variant="secondary">3顆星(0)</Button>
                <Button variant="secondary">2顆星(0)</Button>
                <Button variant="secondary">1顆星(0)</Button>
              </ButtonGroup> */}
              <div className="container">
                {/*--------------Rating Subtitle------------------ */}
                <div
                  className={`row my-3 py-2 justify-content-center text-center ${styles.ratingST}`}
                >
                  <h6 className="mb-0 col-4 fw-normal">訂單資訊</h6>
                  <h6 className="mb-0 col-6 fw-normal">評價內容</h6>
                  <h6 className="mb-0 col-2 fw-normal">操作</h6>
                </div>
              </div>
              {/*--------------Rating Content------------------ */}
              {comments && (
                <>
                
                {comments.map((v,i) => {
                  return (
                    <Card border="light" style={{ width: '100%' }} className="mb-3" key={v.id}>
                  <Card.Header>
                    <div className="d-flex align-items-center">
                      <p className="mb-0 text-secondary me-1">會員名稱:</p>
                      <div className={`me-1 ${styles.shapeCircle}`}>
                        <Image
                          src={v.pic ? (v.pic.startsWith("https://") 
                                ? v.pic 
                                : `http://localhost:3005/profile-pic/${v.pic}`) 
                              : profilePhoto}
                          alt="member-profile"
                          width={25}
                          height={25}
                        />
                      </div>
                      <p className="mb-0 text-secondary">{v.account}</p>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title className="text-dark">
                      <p className="mb-0 text-secondary">訂單編號：{v.order_num}</p>
                    </Card.Title>
                    <div className="text-dark">
                      <div className="row align-items-center">
                        <div className="col-5">
                          <div className="d-flex justify-content-start align-items-center text-warning fs-6 mb-1">
                            <Star avgRating={v.rating}/>
                          </div>
                          <p className="mb-0 text-dark">
                            {v.content}
                          </p>
                          <small className="text-secondary">
                            {v.created_at}
                          </small>
                        </div>
                        <div className={`col-4 my-3 ${styles.reply}`}>
                        {v.reply && (
                          <>
                          <p className='mt-2'>我的回覆：</p>
                          <p>{v.reply}</p>
                          <p className="text-secondary mb-2">{v.replied_at}</p>
                          </>
                        )}
                        </div>
                        <div className="col-3 d-flex justify-content-center align-items-center">
                          {/* 根據有沒有回覆來顯示介面 */}
                          {v.reply ? (
                            <div className='d-flex flex-column'>
                              {/* 有回覆：編輯、刪除（輸入空白的資料） */}
                              <button
                                type="button"
                                className="btn btn-danger btn-sm mb-1"
                                onClick={() => {handleShowModal(v)}}
                              >
                                編輯
                              </button>
                              <button
                                type="button"
                                className={`btn btn-danger btn-sm ${styles.btnDangerOutlined}`}
                                onClick={() => {handleDeleteReply(v.id)}}
                              >
                                刪除
                              </button>
                            </div>
                          ) : (
                            <>
                            <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => {handleShowModal(v)}}
                            >
                              回覆
                            </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                    </Card>
                  )
                })}
                </>
              )}
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange}/>
            </div>
          </div>
          <div className="d-block d-md-none container ps-4 pe-4">
            <div className="d-flex justify-content-start align-items-end mb-3">
              <div className="d-flex justify-content-start align-items-end">
                <h6 className={`mb-0 me-3 fw-bold ${styles.subtitleFs}`}>賣場評價</h6>
              </div>
              <h6 className="fw-normal mb-0">
                <span className="text-danger fw-bold fs-4">{shopRating}</span> / 5.0
              </h6>
            </div>
            <Form className="mb-3">
              <Form.Group className="mb-3" controlId="memberName">
                <Form.Label>會員名稱</Form.Label>
                <Form.Control type="text" placeholder="請輸入會員名稱" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="dateSelect">
                <Form.Label>評價時間</Form.Label>
                <div className="d-flex justify-content-between align-items-center">
                  <InputGroup className={`mb-0 ${styles.dateSelect}`}>
                    <Form.Control
                      type="date"
                      aria-label="dateSelectStart"
                      aria-describedby="dateSelectStart"
                      className={styles.dateInput}
                      onChange={(e) => handleStartDateChange(e.target.value)} // 處理開始日期變更
                    />
                  </InputGroup>
                  <span className="mb-0 mx-2">-</span>
                  <InputGroup className={`mb-0 ${styles.dateSelect}`}>
                    <Form.Control
                      type="date"
                      aria-label="dateSelectEnd"
                      aria-describedby="dateSelectEnd"
                      className={styles.dateInput}
                      onChange={(e) => handleEndDateChange(e.target.value)} // 處理結束日期變更
                    />
                  </InputGroup>
                </div>
              </Form.Group>
              <div className="d-flex justify-content-center align-items-center mt-4">
                <button type="button" className="btn btn-danger btn-sm me-3">
                  搜尋
                </button>
                <button type="button" className="btn btn-danger btn-sm">
                  取消
                </button>
              </div>
            </Form>
            <hr />
            <Nav
                variant="tabs"
                defaultActiveKey="/comment/all"
                className="mb-4"
              >
                <Nav.Item>
                  <Nav.Link onClick={() => {
                    setSelectedTab('all')
                  }} className={selectedTab === 'all' ? "text-danger" : "text-secondary"}>
                    全部
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link onClick={() => {
                    setSelectedTab('unreply')
                  }} className={selectedTab === 'unreply' ? "text-danger" : "text-secondary"}>
                    待回覆
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link onClick={() => {
                    setSelectedTab('replied')
                  }} className={selectedTab === 'replied' ? "text-danger" : "text-secondary"}>
                    已回覆
                  </Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                  <Nav.Link eventKey="disabled" disabled>
                    Disabled
                  </Nav.Link>
                </Nav.Item> */}
              </Nav>
            {/* <div className="d-flex justify-content-around">
                  <Button variant="secondary" size="sm">
                    5顆星
                  </Button>
                  <Button variant="secondary" size="sm">
                    4顆星
                  </Button>
                  <Button variant="secondary" size="sm">
                    3顆星
                  </Button>
                  <Button variant="secondary" size="sm">
                    2顆星
                  </Button>
                  <Button variant="secondary" size="sm">
                    1顆星
                  </Button>
                </div> */}
                <h6 className="m-2">{commentNum}則評論</h6>
                {comments && (
                <>
                {comments.map((v,i) => {
                  return (
                    <Card border="light" style={{ width: '100%' }} className="mb-3" key={v.id}>
                  <Card.Header>
                    <div className="d-flex align-items-center">
                      <p className="mb-0 text-secondary me-1">會員名稱:</p>
                      <div className={`me-1 ${styles.shapeCircle}`}>
                        <Image
                          src={v.pic ? (v.pic.startsWith("https://") 
                                ? v.pic 
                                : `http://localhost:3005/profile-pic/${v.pic}`) 
                              : profilePhoto}
                          alt="member-profile"
                          width={25}
                          height={25}
                        />
                      </div>
                      <p className="mb-0 text-secondary">{v.account}</p>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title className="text-dark">
                      <p className="mb-0 text-secondary">
                        訂單編號：{v.order_num}
                      </p>
                    </Card.Title>
                    <div className="text-dark">
                      <div className="row align-items-center justify-content-center">
                        <div className="col-12 py-3">
                          <div className="d-flex justify-content-start align-items-center text-warning fs-6 mb-1">
                          <Star avgRating={v.rating}/>
                          </div>
                          <p className="mb-0 text-dark">
                          {v.content}
                          </p>
                          <small className="text-secondary">
                          {v.created_at}
                          </small>
                        </div>
                        <div className={`col-11 mb-3 ${styles.reply}`}>
                        {v.reply && (
                          <>
                          <p className='mt-2'>我的回覆：</p>
                          <p>{v.reply}</p>
                          <p className="text-secondary mb-2">{v.replied_at}</p>
                          </>
                        )}
                        </div>
                        <div className="col-12 d-flex justify-content-center align-items-center">
                        {v.reply ? (
                          <div className='d-flex'>
                              {/* 有回覆：編輯、刪除（輸入空白的資料） */}
                              <button
                                type="button"
                                className="btn btn-danger btn-sm me-2"
                                onClick={() => {handleShowModal(v)}}
                              >
                                編輯
                              </button>
                              <button
                                type="button"
                                className={`btn btn-danger btn-sm ${styles.btnDangerOutlined}`}
                                onClick={() => {handleDeleteReply(v.id)}}
                              >
                                刪除
                              </button>
                            </div>
                          ) : (
                            <>
                            <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => {handleShowModal(v)}}
                            >
                              回覆
                            </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                    </Card>
                  )
                })}
                </>
              )}
                <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange}/>
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
      {/* Modal 放這裡ㄛ */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title><h5 className='text-dark fw-bold'>回覆評論</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label><h6 className='text-dark fw-bold'>寫下回覆內容</h6></Form.Label>
              <Form.Control as="textarea" rows={3} value={reply} onChange={(e) => {
                setReply(e.target.value)
              }} autoFocus/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            取消
          </Button>
          <Button variant="primary" onClick={handleSubmitReply}>
            送出回覆
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export async function getServerSideProps(context) {
  return await mainCheckToLogin(context);
}

