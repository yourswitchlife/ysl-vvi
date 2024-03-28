import styles from './empty.module.scss'
import Image from 'next/image'
import Link from 'next/link'

export default function Empty() {
  return (
    <>
      <div className="container">
        <section className={styles.emptyFrame}>
          <div className={`ratio ratio-1x1 ${styles.ratio}`}>
            <Image
              src="/images/cart/Empty.png"
              width={150}
              height={150}
              className={styles.img}
            />
          </div>
          <div className={styles.text}>你的購物車中沒有商品</div>
          <div className={styles.btnFrame}>
            <Link href="/" type="button" className={`btn btn-info ${styles.button}`}>
              回首頁逛逛
            </Link>
            <Link href="/member/fav-product" type="button" className={`btn btn-danger ${styles.button}`}>
              我的收藏清單
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
