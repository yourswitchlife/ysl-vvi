import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router'
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
import { uploadExam } from '@/context/member/upload-exam';
import { useAuth } from '@/hooks/use-Auth';
import mainCheckToLogin from '@/hooks/use-mainCheckToLogin'
import profilePhoto from '@/public/images/profile-photo/default-profile-img.svg'



export default function account() {
  const { isLoggedIn, memberId, memberData } = useAuth();
  const [BigPic, setBigPic] = useState(profilePhoto);

  const [birthdayMax, setBirthdayMax] = useState('');
  const [errorMessage, setErrorMessage] = useState('')

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    address: '',
    birthday: '',
    phone: ''
  });
  const [initialFormData, setInitialFormData] = useState({
    name: '',
    gender: '',
    address: '',
    birthday: '',
    phone: ''
  });
  const isDataChanged = JSON.stringify(formData) !== JSON.stringify(initialFormData);


  //生日可選條件
  useEffect(() => {
    const today = new Date();
    const yesterday = new Date(today.setDate(today.getDate() - 1)).toISOString().split('T')[0];
    setBirthdayMax(yesterday);
  }, []);

  useEffect(() => {

    if (isLoggedIn && memberData) {
      const picUrl = memberData.pic
        ? (memberData.pic.startsWith("https://") ? memberData.pic : `http://localhost:3005/profile-pic/${memberData.pic}`)
        : profilePhoto;
      setBigPic(picUrl);

      const data = {
        name: memberData.name || '',
        gender: memberData.gender || '',
        address: memberData.address || '',
        birthday: memberData.birthday ? memberData.birthday.split('T')[0] : '',
        phone: memberData.phone || ''
      };
      setInitialFormData(data);
      setFormData(data);
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
    // uploadExam
    const Result = uploadExam({
      ...formData,
      [name]: value
    });
    setErrorMessage(Result);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    // SweetAlert2
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
            Swal.fire({
              title: "旅途的開始",
              text: "您的個人資料已更新！",
              icon: "success",
              confirmButtonColor: "#43B0FF",
              confirmButtonText: "好的"
            });
            window.location.href = '/member/account';
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // 檢查文件大小（1MB = 1024 * 1024）
    /* if (file && file.size > 1024 * 1024) {
      alert("檔案超過1MB，請重新上傳");
      return;
    } */

    if (file) {
      setSelectedFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewImage(reader.result);
      handleUpload(file); // 將 handleUpload 移至這裡
    };

    reader.readAsDataURL(file);
  };

  //上傳
  const handleUpload = async (file) => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      // console.log(selectedFile);

      try {
        const response = await fetch(`http://localhost:3005/api/member/pic/${memberId}`, {
          method: 'PUT',
          body: formData,
          credentials: 'include',
        });

        if (response.ok) {
          console.log('照片上傳成功');
        } else {
          console.error('照片上傳失敗');
        }
      } catch (error) {
        console.error('上傳過程中發生錯誤:', error);
      }
    } else {
      console.error('請選擇一個文件');
    }
  };

  //上船預覽
  useEffect(() => {
    fileInputRef.current = document.getElementById('fileInput');
  }, []);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
      // console.log('File input clicked');
    } else {
      console.error('fileInputRef is null');
    }
  };


  return (
    <>
      <Navbar />
      <div className={mStyle.accountClass + ' d-flex'}>
        <SideBar />
        <div className='container mt-5'>
          <div className={mStyle.card + " container mt-5 d-flex flex-column"}>
            <div className={mStyle.title + ' d-flex mt-3 mb-3'}>
              <div className={mStyle.title_icon + " px-3 align-self-center"}>
                <IoNewspaper />
              </div>
              <h5 className={mStyle.title_text + " align-self-center"}>基本資料</h5>
              <div className='ms-auto me-3'>
                <RePassword />
              </div>
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
                        placeholder="真實姓名(必填)"
                        value={memberData?.name}
                        disabled={!!memberData?.name}
                      />
                    </InputGroup>

                    <InputGroup className="flex-grow-1">
                      <InputGroup.Text>
                        <FaTransgender />
                      </InputGroup.Text>
                      <Form.Select onChange={handleaccount} name="gender" value={formData.gender.toLowerCase()}>
                        <option disabled>生理性別</option>
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

                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                      <FaLocationDot />
                    </InputGroup.Text>
                    <Form.Control
                      onChange={handleaccount}
                      name="address"
                      placeholder="聯絡地址(必填)"
                      value={formData.address}
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
                        max={birthdayMax}
                      />
                    </InputGroup>
                    <InputGroup className={mStyle.text_input}>
                      <InputGroup.Text>
                        <FaPhone />
                      </InputGroup.Text>
                      <Form.Control
                        onChange={handleaccount}
                        name="phone"
                        placeholder="手機號碼(必填)"
                        value={formData.phone}
                      />
                    </InputGroup>
                  </div>
                  <div className='pb-4"'>
                    {(!memberData?.name || !memberData?.birthday) && (
                      <h6 className={mStyle.text_warning}>* 生日及真實姓名保存後不可修改，請謹慎輸入！</h6>
                    )}
                  </div>

                  <div style={{ height: '65px' }} className='mt-2'>
                    <div className="error-message-container" style={{ visibility: errorMessage ? 'visible' : 'hidden' }}>
                      <div className="alert alert-danger">
                        {errorMessage}
                      </div>
                    </div>
                  </div>



                </Form>

              </div>
              <div className={mStyle.head_frame + " mt-3 ms-5 flex-grow-3"}>

                <div className={mStyle.head_pic}>
                  {previewImage ? (
                    // 如果有預覽圖片，顯示預覽圖片
                    <img width={300} height={300} className={mStyle.img_fit} src={previewImage} alt="head_pic" />
                  ) : (
                    // 否則顯示會員目前大頭貼
                    <Image width={300} height={300} className={mStyle.img_fit} src={BigPic} alt="head_pic" />
                  )}
                </div>
                <input
                  className='d-none'
                  type="file"
                  id="fileInput"
                  name="file"
                  onChange={handleFileChange}
                  ref={fileInputRef} //控制
                  accept=".png, .jpg, .jpeg"
                />


                <div>
                  <button className={mStyle.upload_btn + ' btn text-danger'} onClick={handleClick}><span></span>上傳照片</button>
                </div>
                <p>檔案大小:最大1MB / 檔案類型: .JPG , .PNG</p>
              </div>

            </div>



          </div>
          <div className='container d-flex justify-content-center mt-5'>
            <Button onClick={handleSubmit} className={mStyle.confirm_btn + ' me-5'} disabled={!isDataChanged}>儲存</Button>
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
