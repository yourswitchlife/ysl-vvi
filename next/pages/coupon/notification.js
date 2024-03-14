// import { Modal } from "bootstrap"
import Swal from 'sweetalert2'
import React from 'react'

export default function Notification() {
   const showmsg = ()=>{
    Swal.fire({
      title: "你已領取過了！",
      width: 500,
      height:100,
      // padding: "3em",
      // icon: 'warning',
      color: "#716add",
      background: "#fff url(/images/trees.png)",
      backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `
    });
   }

   const getmsg =()=>{
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1800,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "領取成功"
    });
   }
  return (
    <>
    <button onClick={showmsg} className="btn btn-info">click it!</button>
    <button onClick={getmsg} className="btn btn-info">click it!</button>
    </>
  )
}
