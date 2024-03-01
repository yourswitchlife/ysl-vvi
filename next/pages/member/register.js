import React, { useState } from 'react';
import { useRouter } from 'next/router';
import mainCheckLogin from '@/context/member/mainCheckLogin'

import Navbar from '@/components/layout/navbar/navbar'
import sStyle from '@/styles/member/sign-up.module.scss'
import Link from 'next/link'

import { FcGoogle } from 'react-icons/fc'
import { FaUser, FaEnvelope } from 'react-icons/fa'
import { MdKey } from 'react-icons/md'
import { Form, InputGroup, Button, FormControl } from 'react-bootstrap'

import SignupExam from '@/hooks/member/sign-up-exam'

export default function register() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    account: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [errorMessage, setErrorMessage] = useState('')

  const [showPassword, setShowPassword] = useState(false);
  

  // 更新表單數據的函式
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // 提交表單
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const error = SignupExam(formData);
    setErrorMessage(error || '');
  
    // 如果沒有錯誤，執行提交表單的邏輯
    if (!error) {
      try {
        const response = await fetch('http://localhost:3005/api/member/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            account: formData.account,
            password: formData.password,
            email: formData.email,
          }),
        });
  
        if (response.ok) {
          // 處理成功的情況
          const data = await response.json();
          // console.log('註冊成功:', data);
          // 進行前端路由跳轉到登入
          router.push('/member/login');
          
        } else {
          // 處理錯誤情況
          const errorData = await response.json();
          console.log(errorData); // 輸出錯誤資訊到控制台
          setErrorMessage(errorData.message);
        }
      } catch (error) {
        console.error('註冊請求失敗:', error.message);
      }
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className={sStyle.bodybg}>
        <Navbar />
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className={sStyle.sign_body}>
            <div className="d-flex">
              <Link href="/member/login" className={sStyle.in_togglebtn + ' flex-grow-1'}>
                登入
              </Link>
              <Link href="/member/register" className={sStyle.up_togglebtn + ' flex-grow-1'}>
                註冊
              </Link>
            </div>
            <h5 className={sStyle.spe_text}>Enjoy Your Switch Life！</h5>
            <Form className="mt-4" onSubmit={handleSubmit}>
              <InputGroup className="mb-3 px-4">
                <InputGroup.Text>
                  <FaUser />
                </InputGroup.Text>
                <Form.Control
                  autoFocus
                  className={sStyle.input}
                  type="text"
                  placeholder="使用者名稱"
                  style={{ width: '330px' }}
                  name="account"
                  value={formData.account}
                  onChange={handleChange}
                />
              </InputGroup>

              <InputGroup className="mb-3 px-4">
                <InputGroup.Text>
                  <FaEnvelope />
                </InputGroup.Text>
                <Form.Control
                  className={sStyle.input}
                  type="text"
                  placeholder="信箱@example.com"
                  style={{ width: '330px' }}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </InputGroup>

              <Form.Group className="mb-3">
                <InputGroup className="mb-3 px-4">
                  <InputGroup.Text>
                    <MdKey />
                  </InputGroup.Text>
                  <Form.Control
                    className={sStyle.input}
                    type={showPassword ? "text" : "password"}
                    placeholder="密碼：使用至少8個英文字母含數字"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    style={{ width: '330px' }}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <InputGroup className="mb-3 px-4">
                  <InputGroup.Text>
                    <MdKey />
                  </InputGroup.Text>
                  <Form.Control
                    className={sStyle.input}
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="再次輸入密碼"
                    style={{ width: '330px' }}
                  />
                </InputGroup>
                <Form.Check className="mx-4" type="checkbox" label="顯示密碼" onChange={togglePasswordVisibility}  />
              </Form.Group>
              <div className={sStyle.error + ' px-4'}>
                {errorMessage && <h6>{errorMessage}</h6>}
              </div>
              <div
                className={
                  sStyle.wid_xs +
                  ' d-flex justify-content-center align-items-center px-5 py-4'
                }
              >
                <Button className={sStyle.sign_btn + ' h5 me-4'} type="submit">
                  開始探索
                </Button>
                <Button
                  className={sStyle.sign_btn + ' h5 d-flex align-items-center'}
                >
                  <FcGoogle className="me-2" />
                  以Google帳號登入
                </Button>
              </div>
            </Form>

            <div className="d-flex justify-content-center mb-3">
              <h6 className="me-5">已經加入YSL了嗎?</h6>
              <Link href="" className={sStyle.sign_link}>
                立即快速登入
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  return await mainCheckLogin(context);
}