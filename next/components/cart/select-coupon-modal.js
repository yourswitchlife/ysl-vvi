import React from 'react'
import { useState } from 'react'
import styles from './select-coupon-modal.module.scss'
import ProductCoupon from './product-coupon'
import DeliveryCoupon from './delivery-coupon'
import { FaCircleInfo } from 'react-icons/fa6'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export default function SelectCoupon({ show, handleClose }) {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={styles.couponHeader}>選擇優惠券</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.productFrame}>
            <div className={styles.title}>
              <div className={styles.text}>商品抵用券</div>
              <FaCircleInfo className={styles.icon} />
            </div>
            <div className={styles.couponBody}>
              {/* 單一商品優惠券 */}
              <ProductCoupon />
              <ProductCoupon />
            </div>
          </div>
          <div className={styles.deliveryFrame}>
            <div className={styles.title}>
              <div className={styles.text}>運費抵用券</div>
              <FaCircleInfo className={styles.icon} />
            </div>
            <div className={styles.couponBody}>
              {/* 單一運費優惠券 */}
              <DeliveryCoupon />
              <DeliveryCoupon />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            取消
          </Button>
          <Button variant="danger" onClick={handleClose}>
            完成
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
