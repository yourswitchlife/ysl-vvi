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
      <div className={sStyle.bodybg}>
        <Navbar />
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className={sStyle.sign_body}>
            <div className='d-flex'>
              <Link href='' className={sStyle.in_togglebtn + ' flex-grow-1'}>登入</Link>
              <Link href='' className={sStyle.up_togglebtn + ' flex-grow-1'}>註冊</Link>
            </div>
            <h5 className={sStyle.spe_text}>Enjoy Your Switch Life！</h5>
            <Form className='mt-4'>
              <InputGroup className="mb-3 px-4">
                <InputGroup.Text>
                  <FaUser />
                </InputGroup.Text>
                <Form.Control className={sStyle.input}
                  type="text"
                  placeholder="使用者名稱"
                  style={{ width: '330px' }}
                />
              </InputGroup>

              <InputGroup className="mb-3 px-4">
                <InputGroup.Text>
                  <FaEnvelope />
                </InputGroup.Text>
                <Form.Control className={sStyle.input}
                  type="email"
                  placeholder="信箱@example.com"
                  style={{ width: '330px' }}
                />
              </InputGroup>

              <Form.Group className="mb-3" controlId="password">
                <InputGroup className="mb-3 px-4">
                  <InputGroup.Text>
                    <MdKey />
                  </InputGroup.Text>
                  <Form.Control className={sStyle.input}
                    type="password"
                    placeholder="密碼：使用至少8個英文字母含數字"
                    autoFocus
                    style={{ width: '330px' }}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3" controlId="newpassword">
                <InputGroup className="mb-3 px-4">
                  <InputGroup.Text>
                    <MdKey />
                  </InputGroup.Text>
                  <Form.Control className={sStyle.input}
                    type="password"
                    placeholder="再次輸入密碼"
                    style={{ width: '330px' }}
                  />
                </InputGroup>
                <Form.Check className='mx-4' type="checkbox" label="顯示密碼" />
              </Form.Group>
              <div className={sStyle.error + " px-4"}>
              <h6> * 信箱格式錯誤</h6>
              </div>
              <div className={sStyle.wid_xs+" d-flex justify-content-center align-items-center px-5 py-4"}>
              <Button className={sStyle.sign_btn + ' h5 me-4'}>開始探索</Button>
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
