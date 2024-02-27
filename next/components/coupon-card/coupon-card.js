import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'next/image'

import styles from './coupon-card.module.scss'

// import couponProduct from '@/public/images/coupon/couponProductBG.png'
// import couponFreShip from '@/public/images/coupon/couponFreeShipBG.png'
import logo from '@/public/images/coupon/logominiFig.png'

function CouponCard() {
  return (
    // <div className=''>
    <Row xs={1} md={2} className="">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Col key={idx} className='d-flex justify-content-center align-items-center mb-3'>
          <Card >
            <div className={`${styles.cardBG} p-5 d-flex justify-content-between`}>
              <div className={styles.left}>
                 <Image src={logo}/>
              </div>

              <div className={styles.right}>
                <div className='text-white fs-3 text-start'>角色扮演遊戲折價券</div>
               
                <div className={styles.couponPriceBTN}>
                  <div className={styles.priceMargin}>
                    <div className='text-white fs-3'>
                        $
                    </div>
                    <div className='text-white fs-1 '>
                        100
                    </div>
                  </div>
                  <div>
                        <button className={styles.btnCTA}>立即領取</button>
                  </div>
                </div>

                  <div className='text-white '>
                    效期至: 2024/04/15 23:59:59
                  </div>
                  
                </div>
               
                
            </div>
            
            {/* <Card.Img Img variant="top" src={couponProduct} /> */}
            {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
          </Card> 
        </Col>
      ))}
    </Row>
    // </div>0
  )
}

export default CouponCard
