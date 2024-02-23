import Image from 'next/image'
import Link from 'next/link'
import styles from '../cart/cart-step.module.scss'
import { FaShoppingCart, FaCreditCard, FaClipboardCheck } from 'react-icons/fa'

export default function CartStep() {
  const focusBg = {
    backgroundImage: `url('data:image/svg+xml;utf8,%3Csvg%20width%3D%22120%22%20height%3D%22111%22%20viewBox%3D%220%200%20120%20111%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20filter%3D%22url%28%23filter0_d_1807_5124%29%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M20%206C14.4772%206%2010%2010.4771%2010%2016V71.863C10%2077.3858%2014.4772%2081.863%2020%2081.863H47.2908L55.653%2094.2518C57.6354%2097.1888%2061.9592%2097.1888%2063.9416%2094.2518L72.3037%2081.863H100C105.523%2081.863%20110%2077.3858%20110%2071.863V16C110%2010.4772%20105.523%206%20100%206H20Z%22%20fill%3D%22%23E41E49%22%2F%3E%3C%2Fg%3E%3Cdefs%3E%3Cfilter%20id%3D%22filter0_d_1807_5124%22%20x%3D%220%22%20y%3D%220%22%20width%3D%22120%22%20height%3D%22110.455%22%20filterUnits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%3CfeFlood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22%2F%3E%3CfeColorMatrix%20in%3D%22SourceAlpha%22%20type%3D%22matrix%22%20values%3D%220%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200%22%20result%3D%22hardAlpha%22%2F%3E%3CfeOffset%20dy%3D%224%22%2F%3E%3CfeGaussianBlur%20stdDeviation%3D%225%22%2F%3E%3CfeComposite%20in2%3D%22hardAlpha%22%20operator%3D%22out%22%2F%3E%3CfeColorMatrix%20type%3D%22matrix%22%20values%3D%220%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200.25%200%22%2F%3E%3CfeBlend%20mode%3D%22normal%22%20in2%3D%22BackgroundImageFix%22%20result%3D%22effect1_dropShadow_1807_5124%22%2F%3E%3CfeBlend%20mode%3D%22normal%22%20in%3D%22SourceGraphic%22%20in2%3D%22effect1_dropShadow_1807_5124%22%20result%3D%22shape%22%2F%3E%3C%2Ffilter%3E%3C%2Fdefs%3E%3C%2Fsvg%3E')`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    height: '111px',
    width: '120px',
  }
  const nextBg = {
    backgroundImage: `url(
      'data:image/svg+xml;utf8,%3Csvg%20width%3D%22120%22%20height%3D%22111%22%20viewBox%3D%220%200%20120%20111%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20filter%3D%22url%28%23filter0_d_1807_5131%29%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M20%206C14.4772%206%2010%2010.4771%2010%2016V71.863C10%2077.3858%2014.4772%2081.863%2020%2081.863H47.2908L55.653%2094.2518C57.6354%2097.1888%2061.9592%2097.1888%2063.9416%2094.2518L72.3037%2081.863H100C105.523%2081.863%20110%2077.3858%20110%2071.863V16C110%2010.4772%20105.523%206%20100%206H20Z%22%20fill%3D%22white%22%2F%3E%3C%2Fg%3E%3Cdefs%3E%3Cfilter%20id%3D%22filter0_d_1807_5131%22%20x%3D%220%22%20y%3D%220%22%20width%3D%22120%22%20height%3D%22110.455%22%20filterUnits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%3CfeFlood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22%2F%3E%3CfeColorMatrix%20in%3D%22SourceAlpha%22%20type%3D%22matrix%22%20values%3D%220%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200%22%20result%3D%22hardAlpha%22%2F%3E%3CfeOffset%20dy%3D%224%22%2F%3E%3CfeGaussianBlur%20stdDeviation%3D%225%22%2F%3E%3CfeComposite%20in2%3D%22hardAlpha%22%20operator%3D%22out%22%2F%3E%3CfeColorMatrix%20type%3D%22matrix%22%20values%3D%220%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200.25%200%22%2F%3E%3CfeBlend%20mode%3D%22normal%22%20in2%3D%22BackgroundImageFix%22%20result%3D%22effect1_dropShadow_1807_5131%22%2F%3E%3CfeBlend%20mode%3D%22normal%22%20in%3D%22SourceGraphic%22%20in2%3D%22effect1_dropShadow_1807_5131%22%20result%3D%22shape%22%2F%3E%3C%2Ffilter%3E%3C%2Fdefs%3E%3C%2Fsvg%3E'
    )`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    height: '111px',
    width: '120px',
  }
  const doneBg = {
    backgroundImage: `url('data:image/svg+xml;utf8,%3Csvg%20width%3D%22120%22%20height%3D%22111%22%20viewBox%3D%220%200%20120%20111%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20filter%3D%22url%28%23filter0_d_1807_2579%29%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M20%206C14.4772%206%2010%2010.4771%2010%2016V71.863C10%2077.3858%2014.4772%2081.863%2020%2081.863H47.2908L55.653%2094.2518C57.6354%2097.1888%2061.9592%2097.1888%2063.9416%2094.2518L72.3037%2081.863H100C105.523%2081.863%20110%2077.3858%20110%2071.863V16C110%2010.4772%20105.523%206%20100%206H20Z%22%20fill%3D%22%23374151%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3Cfilter%20id%3D%22filter0_d_1807_2579%22%20x%3D%220%22%20y%3D%220%22%20width%3D%22120%22%20height%3D%22110.455%22%20filterUnits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%0A%3CfeFlood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22%2F%3E%0A%3CfeColorMatrix%20in%3D%22SourceAlpha%22%20type%3D%22matrix%22%20values%3D%220%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200%22%20result%3D%22hardAlpha%22%2F%3E%0A%3CfeOffset%20dy%3D%224%22%2F%3E%0A%3CfeGaussianBlur%20stdDeviation%3D%225%22%2F%3E%0A%3CfeComposite%20in2%3D%22hardAlpha%22%20operator%3D%22out%22%2F%3E%0A%3CfeColorMatrix%20type%3D%22matrix%22%20values%3D%220%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200.25%200%22%2F%3E%0A%3CfeBlend%20mode%3D%22normal%22%20in2%3D%22BackgroundImageFix%22%20result%3D%22effect1_dropShadow_1807_2579%22%2F%3E%0A%3CfeBlend%20mode%3D%22normal%22%20in%3D%22SourceGraphic%22%20in2%3D%22effect1_dropShadow_1807_2579%22%20result%3D%22shape%22%2F%3E%0A%3C%2Ffilter%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E')`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    height: '111px',
    width: '120px',
  }
  return (
    <>
      <div className="container">
        <div className={styles.framePC}>
          <div className={styles.InfoContainer}>
            <div style={focusBg} className={styles.iconBar}>
              <div className={styles.iconInfo}>
                <FaShoppingCart className={`${styles.icon} text-white`} />
                <h6 className="text-white">訂單明細</h6>
              </div>
            </div>
            <div style={nextBg} className={styles.iconBar}>
              <div className={styles.iconInfo}>
                <FaCreditCard className={`${styles.icon} text-black`} />
                <h6 className="text-black">付款詳情</h6>
              </div>
            </div>
            <div style={nextBg} className={styles.iconBar}>
              <div className={styles.iconInfo}>
                <FaClipboardCheck className={`${styles.icon} text-black`} />
                <h6 className="text-black">訂單完成</h6>
              </div>
            </div>
          </div>

          <div className={`position-relative ${styles.progressWrap}`}>
            <div
              className="progress"
              role="progressbar"
              aria-label="Progress"
              aria-valuenow={25}
              aria-valuemin={0}
              aria-valuemax={100}
              style={{ height: 2 }}
            >
              <div
                className="progress-bar bg-danger"
                style={{ width: '25%' }}
              />
            </div>
            <button
              type="button"
              className="position-absolute top-0 start-0 translate-middle btn btn-sm btn-danger rounded-pill"
              style={{ width: '3.125rem', height: '3.125rem' }}
            >
              01
            </button>
            <button
              type="button"
              className="position-absolute top-0 start-50 translate-middle btn btn-sm btn-light rounded-pill"
              style={{ width: '3.125rem', height: '3.125rem' }}
            >
              02
            </button>
            <button
              type="button"
              className="position-absolute top-0 start-100 translate-middle btn btn-sm btn-light rounded-pill"
              style={{ width: '3.125rem', height: '3.125rem' }}
            >
              03
            </button>
          </div>
        </div>
        <div className={styles.frameMobile}>
          <div className={`position-relative ${styles.progressWrap}`}>
            <div
              className="progress"
              role="progressbar"
              aria-label="Progress"
              aria-valuenow={25}
              aria-valuemin={0}
              aria-valuemax={100}
              style={{ height: 2 }}
            >
              <div
                className="progress-bar bg-danger"
                style={{ width: '25%' }}
              />
            </div>
            <button
              type="button"
              className={`position-absolute top-0 start-0 translate-middle btn btn-sm btn-danger rounded-pill ${styles.iconBtn} ${styles.iconBtnCart}`}
              style={{ width: '2.5rem', height: '2.5rem' }}
            >
              <FaShoppingCart className={styles.iconMobile} />
            </button>
            <button
              type="button"
              className={`position-absolute top-0 start-50 translate-middle btn btn-sm btn-light rounded-pill ${styles.iconBtn}`}
              style={{ width: '2.5rem', height: '2.5rem' }}
            >
              <FaCreditCard className={styles.iconMobile} />
            </button>
            <button
              type="button"
              className={`position-absolute top-0 start-100 translate-middle btn btn-sm btn-light rounded-pill ${styles.iconBtn}`}
              style={{ width: '2.5rem', height: '2.5rem' }}
            >
              <FaClipboardCheck className={styles.iconMobile} />
            </button>
          </div>
          <div className={styles.infoBar}>
            <div
              className={`text-danger ${styles.infoText} ${styles.infoTextA}`}
            >
              確認商品明細
            </div>
            <div
              className={`text-white ${styles.infoText} ${styles.infoTextB}`}
            >
              填寫付款詳情
            </div>
            <div
              className={`text-white ${styles.infoText} ${styles.infoTextC}`}
            >
              訂購完成
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
