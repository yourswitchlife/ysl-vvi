import React from 'react'
import Navbar from '@/components/layout/navbar/navbar'
import sStyle from '@/styles/member/sign-up.module.scss'
import Link from 'next/link'

import { FcGoogle } from 'react-icons/fc'
import { FaUser, FaEnvelope } from 'react-icons/fa'
import { MdKey } from 'react-icons/md'
import { Form, InputGroup, Button, FormControl } from 'react-bootstrap'

export default function SignUp() {
  return (
    <>
      <div className={sStyle.forgetbg}>
        <Navbar />
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className={sStyle.sign_body}>
            <div className="d-flex">
              <Link href="" className={sStyle.in_togglebtn + ' flex-grow-1'}>
                登入
              </Link>
              <Link href="" className={sStyle.in_togglebtn + ' flex-grow-1 bg-info'}>
                註冊
              </Link>
            </div>
            <h5 className={sStyle.spe_text}>輸入電子郵件地址，按下「取得驗証碼」按鈕後，我們會將密碼重設指示寄送給你。</h5>

            <Form className='mt-4 mb-3'>
              <div className="row mb-3">
              <InputGroup className="mb-3 px-4">
                <InputGroup.Text>
                  <FaEnvelope />
                </InputGroup.Text>
                <Form.Control className={sStyle.input}
                  type="email"
                  placeholder="信箱@example.com"
                  style={{ width: '180px' }}
                />
              </InputGroup>

                <div className={sStyle.error+ " mt-2 ps-4"}>
                  請輸入有效的註冊會員電子郵件地址。
                </div>

              </div>

              <div className="row mb-3">
                <InputGroup className="mb-3 px-4">
                <Form.Control className={sStyle.input}
                  type="auth"
                  placeholder="請輸入信箱驗證碼"
                  style={{ width: '180px' }}
                />
                <Button className={sStyle.auth_btn}>取得驗証碼</Button>
              </InputGroup>
                <div className={sStyle.error+ " mt-2 ps-4"}>
                  請輸入驗証碼。
                </div>
              </div>

              <div className="row mb-3">
              <InputGroup className="mb-3 px-4">
                  <InputGroup.Text>
                    <MdKey />
                  </InputGroup.Text>
                  <Form.Control className={sStyle.input}
                    type="password"
                    placeholder="設定新密碼：使用至少8個英文字母含數字"
                    autoFocus
                    style={{ width: '180px' }}
                  />
                </InputGroup>
                <div className={sStyle.error+ " mt-2 ps-4"}>
                  請輸入新密碼。
                </div>
              </div>
              <div className="row mb-3">
              <InputGroup className="mb-3 px-4">
                  <InputGroup.Text>
                    <MdKey />
                  </InputGroup.Text>
                  <Form.Control className={sStyle.input}
                    type="password"
                    placeholder="再次輸入密碼"
                    style={{ width: '160px' }}
                  />
                </InputGroup>
                <Form.Check className='mx-4' type="checkbox" label="顯示密碼" />
                <div className={sStyle.error+ " mt-2 ps-4"}>
                
                  請輸入確認密碼。
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <Button className={sStyle.sign_btn + ' h5'}>確定</Button>
              </div>
            </Form>

            <div className="d-flex justify-content-center mb-3">
              <h6 className="me-5">還沒加入YSL嗎?</h6>
              <Link href="" className={sStyle.sign_link}>
                立即快速註冊
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
