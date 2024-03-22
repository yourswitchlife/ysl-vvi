import React, { useState, useEffect } from 'react'
import { MdAddPhotoAlternate } from 'react-icons/md'
import styles from '@/styles/products/product-detail.module.scss'

export default function AddPhoto({
   fileChangHandler = () => {},
}) {

  const [selectFile, setSelectFile] = useState(null)
  const [filePicked, setFilePicked] = useState(false)
  const [preview, setPreview] = useState('')
  const [imgServerUrl, setImgServerUrl] = useState('')

  useEffect(() => {
    if (!selectFile) {
      setPreview('')
      return
    }
    const objURL = URL.createObjectURL(selectFile)
    console.log(objURL)
    setPreview(objURL)

    return () => URL.revokeObjectURL(objURL)
  }, [selectFile])

  const changHandler = (e) => {
    const file = e.target.files[0]
    if(file){
      setFilePicked(true)
      setSelectFile(file)
      setImgServerUrl('')
    }else{
      setFilePicked(false)
      setSelectFile(null)
      setImgServerUrl('')
    }
  }


  return (
    <>
      <div className="d-flex justify-content-center">
       
        <div style={{width:"100px",height:"100px", borderRadius:"10px",overflow:"hidden",border:"2px dashed #C4C4C4",padding:"2px"}}>
        {selectFile && (
          <img style={{objectFit:'contain',width:"100%",height:"100%"}} src={preview} alt="" />
       
      )} 
      {filePicked ? (
        <div className='d-none'>
        </div>
      ) : (
        <>
        <label className={styles.myLabel} htmlFor="reviewPhoto">
          <div className={styles.img}></div>
          <MdAddPhotoAlternate className={`${styles.icon} h2`} />
        </label>
        <input
          type="file"
          className="d-none"
          id="reviewPhoto"
          name="reviewPhoto"
          onChange={(e) => {
            changHandler(e)
            fileChangHandler(e)
          }}
          accept="image/*"
        /></>
      )}</div>
      </div>
    </>
  )
}
