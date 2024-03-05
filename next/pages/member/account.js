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

import Swal from 'sweetalert2'

import RePassword from '@/components/member/re-password';

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-Auth';
import mainCheckToLogin from '@/hooks/use-mainCheckToLogin'
import profilePhoto from '@/public/images/profile-photo/default-profile-img.svg'


/* function FileUploadSample() {
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
} */


export default function account() {
  const { isLoggedIn, memberId, memberData } = useAuth();
  const [BigPic, setBigPic] = useState(profilePhoto);

  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    address: '',
    birthday: '',
    phone: ''
  });

  useEffect(() => {

    if (isLoggedIn && memberData) {
      const picUrl = memberData.pic
        ? (memberData.pic.startsWith("https://") ? memberData.pic : `/images/member/profile-pic/${memberData.pic}`)
        : profilePhoto;
      setBigPic(picUrl);

    }
  }, [memberData]);



  const handleaccount = (e) => {
    const { name, value } = e.target;

    // 如果是生日欄位，提取月份
    if (name === "birthday") {
      const selectedDate = new Date(value);
      const selectedMonth = selectedDate.getMonth() + 1;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        birthdayMonth: selectedMonth, // 新增 birthday_month 屬性
      }));
    } else {
      // 其他欄位正常更新
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 使用 SweetAlert 提示確認
    Swal.fire({
      title: "確定儲存嗎？",
      text: "提醒：生日及真實姓名保存後不可修改哦！",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#43B0FF",
      confirmButtonText: "確認",
      cancelButtonColor: "取消",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:3005/api/member/account/${memberId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: formData.name,
              gender: formData.gender,
              address: formData.address,
              birthday: formData.birthday,
              phone: formData.phone,
              birthday_month: formData.birthdayMonth
            }),
            credentials: 'include',
          });
          if (response.ok) {
            // 更新成功，顯示成功訊息
            Swal.fire({
              title: "旅途的開始",
              text: "您的個人資料已更新！",
              icon: "success",
              confirmButtonColor: "#43B0FF",
              confirmButtonText: "好的"
            });
            // console.log('資料更新成功！');
          } else {
            // 更新失敗，顯示錯誤訊息
            Swal.fire({
              title: "喔喔!",
              text: "您的個人資料更新錯誤！",
              icon: "error"
            });
            // console.error('資料更新失敗！');
          }
        } catch (error) {
          // 更新發生錯誤，顯示錯誤訊息
          Swal.fire({
            title: "喔喔!",
            text: "您的個人資料更新錯誤！",
            icon: "error"
          });
          // console.error('更新發生錯誤：', error);
        }
      }
    });
  };



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
                      <Form.Control
                        onChange={handleaccount}
                        name="name"
                        placeholder="真實姓名"
                        value={memberData?.name}
                        disabled={!!memberData?.name}
                      />
                    </InputGroup>

                    <InputGroup className="flex-grow-1">
                      <InputGroup.Text>
                        <FaTransgender />
                      </InputGroup.Text>
                      <Form.Select onChange={handleaccount} name="gender" value={memberData?.gender}>
                        <option>生理性別</option>
                        <option value="male">生理男</option>
                        <option value="female">生理女</option>
                        <option value="other">其他</option>
                      </Form.Select>
                    </InputGroup>
                  </div>

                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                      <FaEnvelope />
                    </InputGroup.Text>
                    <Form.Control
                      name="email"
                      type="email"
                      value={memberData?.email}
                      readOnly
                      disabled
                    />
                  </InputGroup>
                  <h6 className={mStyle.text_error + " mb-3"}>* 欄位不得為空！</h6>

                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                      <FaLocationDot />
                    </InputGroup.Text>
                    <Form.Control
                      onChange={handleaccount}
                      name="address"
                      placeholder="聯絡地址"
                      value={memberData?.address}
                    />
                  </InputGroup>
                  <div className="d-flex flex-row mb-3">
                    <InputGroup className="flex-grow-1 me-2">
                      <InputGroup.Text>
                        <FaBirthdayCake />
                      </InputGroup.Text>
                      <Form.Control
                        onChange={handleaccount}
                        name="birthday"
                        type="date"
                        disabled={!!memberData?.birthday}
                        value={memberData?.birthday?.split('T')[0]}
                      />
                    </InputGroup>
                    <InputGroup className={mStyle.text_input}>
                      <InputGroup.Text>
                        <FaPhone />
                      </InputGroup.Text>
                      <Form.Control
                        onChange={handleaccount}
                        name="phone"
                        placeholder="手機號碼"
                        value={memberData?.phone}
                      />
                    </InputGroup>
                  </div>
                  <div className='pb-4"'>
                    {(!memberData?.name || !memberData?.birthday) && (
                      <h6 className={mStyle.text_warning}>* 生日及真實姓名保存後不可修改，請謹慎輸入！</h6>
                    )}
                  </div>
                  <div className='pt-3'>
                    <RePassword />
                  </div>
                </Form>

              </div>
              <div className={mStyle.head_frame + " mt-3 ms-5 flex-grow-3"}>
                <div className={mStyle.head_pic}>
                  <Image width={300} height={300} className={mStyle.img_fit} src={BigPic} alt="head_pic" />
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
            <Button onClick={handleSubmit} className={mStyle.confirm_btn + ' me-5'}>儲存</Button>
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

export async function getServerSideProps(context) {
  return await mainCheckToLogin(context);
}
