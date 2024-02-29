import React, { useState, useEffect } from 'react'

function FileUploadSample() {
  // 選擇的檔案
  const [selectedFile, setSelectedFile] = useState(null)
  // 是否有檔案被挑選
  const [isFilePicked, setIsFilePicked] = useState(false)
  // 預覽圖片
  const [preview, setPreview] = useState('')
  // server上的圖片網址
  const [imgServerUrl, setImgServerUrl] = useState('')

  // 當選擇檔案更動時建立預覽圖
  useEffect(() => {
    if (!selectedFile) {
      setPreview('')
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    console.log(objectUrl)
    setPreview(objectUrl)

    // 當元件unmounted時清除記憶體
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const changeHandler = (e) => {
    const file = e.target.files[0]

    if (file) {
      setIsFilePicked(true)
      setSelectedFile(file)
      setImgServerUrl('')
    } else {
      setIsFilePicked(false)
      setSelectedFile(null)
      setImgServerUrl('')
    }
  }

  const handleSubmission = () => {
    const formData = new FormData()

    // 對照server上的檔案名稱 req.files.avatar
    formData.append('avatar', selectedFile)

    fetch(
      'http://localhost:5555/upload-avatar', //server url
      {
        method: 'POST',
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result)
        setImgServerUrl('http://localhost:5555/uploads/' + result.data.name)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  return (
    <div>
      <input type="file" name="file" onChange={changeHandler} />
      {selectedFile && (
        <div>
          預覽圖片: <img src={preview} alt="" />
        </div>
      )}
      {isFilePicked ? (
        <div>
          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
          <p>Size in bytes: {selectedFile.size}</p>
          <p>
            lastModifiedDate:
            {selectedFile.lastModifiedDate.toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p>選擇檔案觀看詳細資料</p>
      )}
      <div>
        <button onClick={handleSubmission}>送出</button>
      </div>
      <div>
        伺服器圖片網址:
        <a href={imgServerUrl} target="_blank" rel="noreferrer">
          {imgServerUrl}
        </a>
      </div>
    </div>
  )
}

export default FileUploadSample