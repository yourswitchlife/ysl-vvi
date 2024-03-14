import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/navbar/navbar'
import sStyle from '@/styles/member/sign-up.module.scss'
import mStyle from '@/styles/member/g-valuable.module.scss'
import Link from 'next/link'
import Swal from 'sweetalert2'

import { FcGoogle } from 'react-icons/fc'
import { FaUser, FaEnvelope } from 'react-icons/fa'
import { MdKey } from 'react-icons/md'
import { Form, InputGroup, Button, FormControl } from 'react-bootstrap'
import ForgetExam from '@/context/member/forget-exam'
import { useRouter } from 'next/router'

export default function forgetPassword() {
  const router = useRouter()
  const [isCountingDown, setIsCountingDown] = useState(false);
  const initialCountdown = 600;
  const [countdown, setCountdown] = useState(600); // 初始值為10分鐘，以秒為單位
  const [showExpiredMessage, setShowExpiredMessage] = useState(false);
  const [errorState, setErrorState] = useState('')
  const [countdownInterval, setCountdownInterval] = useState(null);


  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    verificationCode: '',
    newPassword: '',
    confirmPassword: '',
  })
  //error
  const [errors, setErrors] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const startCountdown = () => {
    setIsCountingDown(true);
    setCountdown(initialCountdown);
    setShowExpiredMessage(false);

    // 清除之前的計時器
    if (countdownInterval) {
      clearInterval(countdownInterval);
    }

    // 啟動新的計時器
    const newInterval = setInterval(() => {
      setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0));
    }, 1000);
    setCountdownInterval(newInterval);
  };

  // gmailapi
  const handleGetCode = async () => {
    try {
      // console.log('Email value:', email);
      const response = await fetch('http://localhost:3005/api/member/get-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorJson = await response.json();
        setErrorState(errorJson.error)
      } else {

        console.log("成功寄信")
        setErrorState('');
        startCountdown();
        Swal.fire({
          title: "YSL已敬業的寄送驗證信給您",
          text: "請到信箱收信，我們等你回來！",
          imageUrl: "/images/member/mail.png",
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: "mail",
          confirmButtonColor: "#43B0FF",
          confirmButtonText: "好的",
        })
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    return () => {
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
    };
  }, [countdownInterval]);

  useEffect(() => {
    // 在倒數計時結束後，顯示再次取得驗證碼
    if (countdown === 0) {
      setShowExpiredMessage(true);
    }
  }, [countdown]);

  // 檢查及存值進狀態
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  // reset password
  const handleReset = async () => {
    const error = ForgetExam(formData);
    setErrors(error || '');
    console.log('FormData:', formData);
    console.log('Error:', error);

    if (!error) {
      try {
        const response = await fetch('http://localhost:3005/api/member/reset-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            verificationCode: formData.verificationCode,
            newPassword: formData.newPassword,
          }),
          credentials: 'include',
        });

        if (response.ok) {
          console.log('密碼重設成功');
          Swal.fire({
            position: "center",
            icon: "success",
            title: "您已成功修改密碼",
            showConfirmButton: false,
            timer: 1800
          });
          router.push('/member/login')
        } else {
          const errorJson = await response.json();
          console.error('Server returned an error:', errorJson.error.message)
          setErrors(errorJson.error)
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <>
      <div className={sStyle.forgetbg}>
        <Navbar />
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className={sStyle.sign_body}>
            <div className="d-flex">
              <Link href="/member/login" className={sStyle.in_togglebtn + ' flex-grow-1'}>
                登入
              </Link>
              <Link href="/member/register" className={sStyle.in_togglebtn + ' flex-grow-1 bg-info'}>
                註冊
              </Link>
            </div>
            <h5 className={sStyle.spe_text}>輸入電子郵件地址，按下「取得驗証碼」按鈕後，我們會將密碼重設指示寄送給你。</h5>

            <Form className={mStyle.form_input + ' mt-4 mb-3'}>
              <div className="mb-3">
                <InputGroup className="mb-3">
                  <InputGroup.Text>
                    <FaEnvelope />
                  </InputGroup.Text>
                  <Form.Control className={sStyle.input}
                    type="email"
                    placeholder="信箱@example.com"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                  // onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>

                <div className={sStyle.error + " mt-2"}>
                  {errorState && errorState}
                </div>

              </div>

              <div className="mb-3">
                <InputGroup className="mb-3">
                  <Form.Control className={sStyle.input}
                    type="auth"
                    name="verificationCode"
                    placeholder="請輸入信箱驗證碼"
                    value={formData.verificationCode}
                    onChange={handleChange}
                  // onChange={(e) => setVerificationCode(e.target.value)}
                  />
                  <Button className={sStyle.auth_btn+ " d-flex align-items-center"} onClick={handleGetCode} style={{height:38}}>取得驗証碼</Button>
                </InputGroup>
                <div className={`${sStyle.error} ${isCountingDown ? 'text-info' : ''} mt-2`}>
                  {isCountingDown
                    ? `驗證碼過期時間：${Math.floor(countdown / 60)} 分 ${countdown % 60} 秒`
                    : showExpiredMessage
                      ? '驗證碼已過期，請再次取得驗證碼'
                      : ''}
                </div>
              </div>

              <div className="mb-3">
                <InputGroup className="mb-3">
                  <InputGroup.Text>
                    <MdKey />
                  </InputGroup.Text>
                  <Form.Control className={sStyle.input}
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    placeholder="設定新密碼：至少8個英文字母含數字"
                    autoFocus
                    onChange={handleChange}
                  // onChange={(e) => setNewPassword(e.target.value)}
                  />
                </InputGroup>
              </div>
              <div className="mb-3">
                <InputGroup className="mb-3">
                  <InputGroup.Text>
                    <MdKey />
                  </InputGroup.Text>
                  <Form.Control className={sStyle.input}
                    type={showPassword ? "text" : "password"}
                    placeholder="再次輸入密碼"
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  // onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </InputGroup>
                <Form.Check type="checkbox" label="顯示密碼" onChange={togglePasswordVisibility} />
                <div className={sStyle.error + " mt-2"}>
                  {errors && <h6>{errors}</h6>}
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <Button className={sStyle.sign_btn + ' h5'} onClick={handleReset}>確定修改</Button>
              </div>
            </Form>


          </div>
        </div>
      </div>
    </>
  )
}
