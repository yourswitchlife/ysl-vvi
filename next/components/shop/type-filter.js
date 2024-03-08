import { useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
//toggle list from react bootstrap
import Collapse from 'react-bootstrap/Collapse'
import styles from '@/components/shop/type-filter.module.scss'
import { FaPlus, FaFilter } from 'react-icons/fa'
import Form from 'react-bootstrap/Form'
import typeName from '@/data/type.json'
import ratings from '@/data/rating.json'

export default function TypeFilter() {
  //offcanvas const
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  //toggle
  const [openSort, setOpenSort] = useState(false)
  const [openRate, setOpenRate] = useState(false)
  //控制表單元件:遊戲類別
  const newTypeOptions = typeName.map((v, i) => {
    return {...v, checked: false}
  }) 
  const [typeCheck, setTypeCheck] = useState(newTypeOptions)
  //控制表單元件:遊戲分級
  const newRateOptions = ratings.map((v, i) => {
    return {...v, checked: false}
  }) 
  const [ratingCheck, setRatingCheck] = useState(newRateOptions)
  //漏斗選擇項目
  const toggleCheckbox = (check, id) => {
    return check.map((v, i) => {
      // 展開每個成員時，如果符合條件(v.id===id)則反相屬性checked
      if (v.id === id) return { ...v, checked: !v.checked }
      else return v
    })
  }


  return (
    <>
        {/* offcanvas btn */}
        <button
          type="button"
          onClick={handleShow}
          className={`me-3 btn d-flex justify-content-center align-items-center ${styles.offcanvasBtn}`}
        >
          <h6 className="mb-0 d-none d-md-block">條件篩選</h6>
          <p className="mb-0 d-block d-md-none">條件篩選(0)</p>
          <FaFilter className={`ms-1 ${styles.iconsmall} text-light d-none d-md-block`} />
        </button>

      {/* offcanvas */}
      <Offcanvas show={show} onHide={handleClose} className={styles.offcanvas}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h4>條件篩選</h4>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* toggle sort */}
          <Form className="d-flex align-items-center flex-column">
            <button
              type="button"
              onClick={() => setOpenSort(!openSort)}
              aria-controls="sort-collapse-text"
              aria-expanded={openSort}
              className={`btn d-flex justify-content-center align-items-center ${styles.togglebtn}`}
            >
              <h5 className="mb-0 me-2 text-light">遊戲類別</h5>
              <FaPlus className='text-light'/>
            </button>
            <Collapse in={openSort}>
              <div id="sort-collapse-text">
                <div className="d-flex flex-column align-items-center pt-2">
                {typeCheck.map((t) => {
                  return (
                    <div key={t.id}>
                    <Form.Check // prettier-ignore
                    type="checkbox"
                    checked={t.checked}
                    value={t.name}
                    id={t.id}
                    label={t.name}
                    onChange={() => {
                      setTypeCheck(toggleCheckbox(typeCheck, t.id))
                    }}
                    className="my-1"
                  />
                    </div>
                  )
                })}
                </div>
              </div>
            </Collapse>
            {/* toggle rate */}
            <button
              type="button"
              onClick={() => setOpenRate(!openRate)}
              aria-controls="rate-collapse-text"
              aria-expanded={openRate}
              className={`btn d-flex justify-content-center align-items-center ${styles.togglebtn}`}
            >
              <h5 className="mb-0 me-2 text-light">遊戲分級</h5>
              <FaPlus className='text-light'/>
            </button>
            <Collapse in={openRate}>
              <div id="rate-collapse-text">
                <div className="d-flex flex-column align-items-center pt-2">
                {ratingCheck.map((r) => {
                  return (
                    <div key={r.id}>
                    <Form.Check // prettier-ignore
                    type="checkbox"
                    id={r.id}
                    checked={r.checked}
                    value={r.name}
                    onChange={() => {
                      setRatingCheck(toggleCheckbox(ratingCheck, r.id))
                    }}
                    label={r.name}
                    className="my-1"
                  />
                    </div>
                  )
                })}
                </div>
              </div>
            </Collapse>
            <div
              className={`d-flex justify-content-center ${styles.selectBtn}`}
            >
              <button
                type="submit"
                className="btn btn-danger d-flex align-items-center"
              >
                篩選商品
              </button>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}
