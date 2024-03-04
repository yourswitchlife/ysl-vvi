import React, { useState, useEffect, Fragment } from 'react'
import ImageItemPreview from './Image-Item-preview'

function FileUploadMultiple() {
  // 選擇的檔案
  // file 是圖片檔案
  const [selectedFiles, setSelectedFiles] = useState([])

  // 新增圖片檔案用
  const handleSubmission = () => {
    const formData = new FormData()

    // 對照server上的名稱 req.files.photos
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('photos', selectedFiles[i])
    }

    fetch(
      'http://localhost:5555/upload-photos', //server url
      {
        method: 'POST',
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  const changeHandler = (e) => {
    console.log(e.target.files)
    setSelectedFiles(e.target.files)
    console.log(e.target.files.length)
  }

  return (
    <div>
      <input type="file" name="file" multiple onChange={changeHandler} />
      <hr />
      {selectedFiles &&
        [...selectedFiles].map((v, i) => {
          return (
            <Fragment key={i}>
              <ImageItemPreview file={v} />
              <button
                onClick={() => {
                  const newFiles = [...selectedFiles].filter(
                    (v2, i2) => i2 !== i
                  )
                  setSelectedFiles(newFiles)
                }}
              >
                刪除
              </button>
            </Fragment>
          )
        })}
      <div>
        <button onClick={handleSubmission}>送出</button>
      </div>
    </div>
  )
}

export default FileUploadMultiple
