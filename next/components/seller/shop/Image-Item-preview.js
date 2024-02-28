import React, { useState, useEffect } from 'react'

function ImageItemPreview({ file }) {
  // 預覽圖片
  const [preview, setPreview] = useState('')

  // 當選擇檔案更動時建立預覽圖
  useEffect(() => {
    if (!file) {
      setPreview('')
      return
    }

    const objectUrl = URL.createObjectURL(file)
    console.log(objectUrl)
    setPreview(objectUrl)

    // 當元件unmounted時清除記憶體
    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  return (
    <div>
      {/* <input type="file" name="file" onChange={changeHandler} /> */}
      {file && (
        <div>
          預覽圖片: <img src={preview} alt="" />
        </div>
      )}
      {/* 以下為圖片資訊 */}
      {/* {!!file && (
        <div>
          Filename: {file.name}
          <br />
          Filetype: {file.type}
          <br />
          Size in bytes: {file.size}
          <br />
          lastModifiedDate:
          {file.lastModifiedDate.toLocaleDateString()}
        </div>
      )} */}
    </div>
  )
}

export default ImageItemPreview
