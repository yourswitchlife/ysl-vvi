import React, { useState } from 'react'
import Image from 'next/image'
import { FaCartPlus, FaStore } from 'react-icons/fa'
import styles from '../../styles/products/product-card.module.scss'
import heartFill from 'assets/heart-fill.svg'
import heratIcon from 'assets/heart-white.svg'

// 引入use-cart鉤子
import { useCart } from '@/hooks/use-cart'

export default function ProductCard({
  id,
  name,
  releaseTime,
  display_price,
  price,
  product_quanty,
  img_cover,
  type,
  ratingId,
  member_id,
  fav,
  handleToggleFav,
  language,
}) {
  const ratingStyle = (v) => {
    let ratingId = '',
      bgc = ''
    switch (Number(v)) {
      case 1:
        ratingId = '0'
        bgc = '#65d432'
        break
      case 2:
        ratingId = '6'
        bgc = '#07a2f0'
        break
      case 3:
        ratingId = '12'
        bgc = '#ffca00'
        break
      case 4:
        ratingId = '18'
        bgc = '#ff0000'
        break
    }
    return { ratingId, bgc }
  }
  const rs = ratingStyle(ratingId)

  const typeChange = (v) => {
    let type = ''
    switch (Number(v)) {
      case 1:
        type = 'RPG'
        break
      case 2:
        type = 'AVG'
        break
      case 3:
        type = 'ETC'
        break
      case 4:
        type = 'ACT'
        break
      case 5:
        type = 'SLG'
        break
      case 6:
        type = 'RAC'
        break
      case 7:
        type = 'SPG'
        break
      case 8:
        type = 'STG'
        break
      case 9:
        type = 'FTG'
        break
    }
    return type
  }

  const memberIdChange = (v) => {
    let memberId = ''
    switch (Number(v)) {
      case 1:
        memberId = '玩具熊的小窩'
        break
      case 2:
        memberId = '煞氣欸路易吉'
        break
      case 3:
        memberId = '碧姬公主的玩具城堡'
        break
      case 4:
        memberId = '栗寶寶好物站'
        break
      case 5:
        memberId = '庫巴很酷吧'
        break
      case 6:
        memberId = '紅色死神的遊戲收藏'
        break
      case 7:
        memberId = '魔法兔子的玩具坊'
        break
      case 8:
        memberId = '星光小狐的玩樂世界'
        break
      case 9:
        memberId = '夢幻精靈的小店鋪'
        break
      case 10:
        memberId = '露西亞的小天地'
        break
      case 11:
        memberId = '奇幻螢火蟲的寶庫'
        break
      case 12:
        memberId = '糖果精靈的甜蜜天地'
        break
      case 13:
        memberId = '秘境小巷的驚奇寶盒'
        break
      case 14:
        memberId = '海盜船長的珍寶藏身處'
        break
      case 15:
        memberId = '奇幻仙境的集市'
        break
      case 16:
        memberId = '森林精靈的神秘市集'
        break
      case 17:
        memberId = '星際冒險家的未知商鋪'
        break
      case 18:
        memberId = '魔法城堡的奇蹟角落'
        break
      case 19:
        memberId = '奇幻之鑰的神秘櫥窗'
        break
      case 20:
        memberId = '傳說中的寶物堡壘'
        break
    }
    return memberId
  }

  

  const { addItem, notifySuccess } = useCart()

  return (
    <>
      <div className={styles.card}>
        <div className="d-flex justify-content-center pt-2">
          <Image
            // src={`/images/product/cover/${img_cover}`}
            src={`http://localhost:3005/productImg/cover/${img_cover}`}
            alt={img_cover}
            width={150}
            height={244}
            // priority={true}
            className="px-2 pb-3 pt-1"
            // layout="fixed"
          />
        </div>

        <div className="card-body p-3 pt-0">
          <div className="d-flex justify-content-between">
            <div className="pb-0 p-2 pt-1 border border-danger border-bottom-0 rounded-end-3 rounded-bottom-0">
              <p className="text-danger">
                <b>{typeChange(type)}</b>
              </p>{' '}
            </div>
            <div
              className="d-flex justify-content-center align-items-center"
            >
              <div
                onClick={(e) => {
                  e.stopPropagation()
                }}
                className="pb-1 p-0"
              >
                <Image
                  src={fav ? heartFill : heratIcon}
                  className="me-2"
                  alt=""
                  onClick={(e) => {
                    // e.stopPropagation()  
                    handleToggleFav(id)
                  }}
                />
              </div>
              {/* 加入購物車 */}
                {<FaCartPlus
                  className={`text-light h5 pb-1 ${styles.Chover}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    addItem({
                      name,
                      releaseTime,
                      display_price,
                      price,
                      img_cover,
                      type,
                      id,
                      member_id,
                      fav,
                      product_quanty,
                      language,
                      quantity: 1,
                    })
                    // console.log(language)
                  }}
                />}
              
            </div>
          </div>

          <h6
            className={`card-text mt-2 mb-1 text-white ${styles.textEllipsis}`}
          >
            {name}
          </h6>
          <p className="text-light">
            <FaStore className="me-1 mb-1" />
            {memberIdChange(member_id)}
          </p>
          <p className="text-white">發行日期 {releaseTime}</p>
          <div className="price d-flex justify-content-between mt-1 align-items-center">
            <h6>
              <b className="text-danger">NT${price}</b>
            </h6>
            {display_price == null || display_price == price ? (
              ''
            ) : (
              <p className="text-white-50 text-decoration-line-through">
                NT ${display_price}
              </p>
            )}

            <div
              style={{
                width: '22px',
                height: '22px',
                borderRadius: '5px',
                fontSize: '13px',
                textAlign: 'center',
                fontWeight: '700',
                lineHeight: '22px',
                color: 'black',
                backgroundColor: rs.bgc,
              }}
            >
              {rs.ratingId}⁺
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
