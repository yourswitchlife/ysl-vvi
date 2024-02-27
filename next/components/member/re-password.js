import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import mStyle from '@/styles/member/g-valuable.module.scss'
import { InputGroup } from 'react-bootstrap';
import { MdKey } from "react-icons/md"; 


export default function RePassword() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className={mStyle.function_btn} onClick={handleShow}>
        修改密碼
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header  closeButton>
          <Modal.Title className='h5 font-weight-bold'>修改密碼</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="password">
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <MdKey />
                </InputGroup.Text>

                <Form.Control
                  type="password"
                  placeholder="請輸入舊密碼"
                  autoFocus
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="newpassword">
            <InputGroup className="mb-3">
                <InputGroup.Text>
                  <MdKey />
                </InputGroup.Text>

                <Form.Control
                  type="password"
                  placeholder="設定新密碼"
                  autoFocus
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="newpassword2">
            <InputGroup className="mb-3">
                <InputGroup.Text>
                  <MdKey />
                </InputGroup.Text>

                <Form.Control
                  type="password"
                  placeholder="再次輸入新密碼"
                  autoFocus
                />
              </InputGroup>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-center'>
          <Button className={mStyle.confirm_btn + ' me-5'} variant="primary" onClick={handleClose}>
            確定
          </Button>
          <Button className={mStyle.cancel_btn} variant="secondary" onClick={handleClose}>
            取消
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}