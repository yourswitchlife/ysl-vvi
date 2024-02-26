import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'next/image'

import styles from '@/styles/coupon/coupon-card.module.scss'

import couponProduct from '@/public/images/coupon/couponProductBG.png'
import couponFreShip from '@/public/images/coupon/couponFreeShipBG.png'
import logo from '@/public/images/coupon/logominiFig.png'

function GridExample() {
  return (
    <Row xs={1} md={2} className="g-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Col key={idx}>
          {/* <Card className={` ${styles.cardBG}`}> */}
            {/* <div className={styles.couponBG}> */}
              {/* <Image src={couponProduct} /> */}
            {/* </div>  */}
            {/* 以上是我還在摸索我應該要以card設成優惠券樣式?還是另外開div包img成為優惠券樣式? */}
            <div className={`${styles.cardBG} p-5`}>
                <div className='text-white'>角色扮演遊戲折價券</div>
                <div className='d-flex'>
                    <div className='text-white'>
                        <Image src={logo}/>
                    </div>
                    <div className='text-white'>
                        $100
                    </div>
                    <div>
                        <button>立即領取</button>
                    </div>
                </div>
                <div>效期至: 2024/04/15 23:59:59</div>
                
            </div>
            
            {/* <Card.Img Img variant="top" src={couponProduct} /> */}
            {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
          {/* </Card> */}
        </Col>
      ))}
    </Row>
  )
}

export default GridExample
