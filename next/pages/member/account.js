import react from 'react'
import Image from 'next/image';
import SideBar from '@/components/member/sidebar-member'
import mStyle from '@/styles/member/g-valuable.module.scss'
import Navbar from '@/components/layout/navbar/navbar'
import Footer from '@/components/layout/footer/footer-backstage';
import { Form, InputGroup, Button, FormControl } from 'react-bootstrap';
import { FaUser, FaTransgender, FaEnvelope, FaHome, FaBirthdayCake, FaPhone } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import { IoNewspaper } from "react-icons/io5";
import { BsPersonVcardFill } from "react-icons/bs";
import head_pic from '@/public/images/member/head.jpg'

import RePassword from '@/components/member/re-password';

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
}


export default function account() {
  return (
    <>
      <Navbar />
      <div className={mStyle.accountClass + ' d-flex'}>
        <SideBar />
        <div className='container mt-5'>
          <div className={mStyle.card + " container mt-5 d-flex flex-column"}>
            <div className={mStyle.title + ' d-flex mt-3 mb-3'}>
              <div className={mStyle.title_icon + " px-3"}>
                <IoNewspaper />
              </div>
              <h5 className={mStyle.title_text}>基本資料</h5>
            </div>


            <div className={mStyle.card_body + " container d-flex justify-content-center"}>
              <div className={mStyle.input_frame + " me-5 d-flex"}>
                <Form className="ms-4 py-3 mb-4">
                  <div className="d-flex flex-row mb-3">
                    <InputGroup className={mStyle.text_input + " me-2"}>
                      <InputGroup.Text>
                        <FaUser />
                      </InputGroup.Text>
                      <Form.Control placeholder="真實姓名" />
                    </InputGroup>

                    <InputGroup className="flex-grow-1">
                      <InputGroup.Text>
                        <FaTransgender />
                      </InputGroup.Text>
                      <Form.Select>
                        <option>生理性別</option>
                        <option value="male">男</option>
                        <option value="female">女</option>
                        <option value="other">其他</option>
                      </Form.Select>
                    </InputGroup>
                  </div>

                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                      <FaEnvelope />
                    </InputGroup.Text>
                    <Form.Control type="email" placeholder="信箱@example.com" />
                  </InputGroup>
                  <h6 className={mStyle.text_error + " mb-3"}>* 信箱格式錯誤！</h6>

                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                    <FaLocationDot />
                    </InputGroup.Text>

                    <Form.Control placeholder="聯絡地址" />
                  </InputGroup>
                  <div className="d-flex flex-row mb-3" >
                    <InputGroup className="flex-grow-1 me-2">
                      <InputGroup.Text>
                        <FaBirthdayCake />
                      </InputGroup.Text>
                      <Form.Control type="date" />
                    </InputGroup>
                    <InputGroup className={mStyle.text_input}>
                      <InputGroup.Text>
                        <FaPhone />
                      </InputGroup.Text>
                      <Form.Control placeholder="手機號碼" />
                    </InputGroup>
                  </div>
                  <div className='pb-4"'>
                  <h6 className={mStyle.text_error}>* 生日輸入後不可修改，請謹慎選擇！</h6>
                  </div>
                  <div className='pt-3'>
                  <RePassword />
                  </div>
                </Form>
              </div>
              <div className={mStyle.head_frame + " mt-3 ms-5 flex-grow-3"}>
                <div className={mStyle.head_pic}>
                  <Image className={mStyle.img_fit} src={head_pic} alt="head_pic" />
                </div>
                <input className='d-none' type="file" name="file" /* onChange={changeHandler} */ />

                <div>
                  <button className={mStyle.upload_btn + ' btn text-danger'} /* onClick={handleSubmission} */><span></span>上傳照片</button>
                </div>
                <p>檔案大小:最大1MB / 檔案類型: .JPG , .PNG</p>
              </div>
              
            </div>



          </div>
          <div className='container d-flex justify-content-center mt-5'>
            <Button className={mStyle.confirm_btn + ' me-5'}>儲存</Button>
            <Button className={mStyle.cancel_btn}>取消</Button>
          </div>
        </div>
        
      </div>
      <div className="d-none d-sm-block">
        <Footer />
      </div>
    </>
  )
}

