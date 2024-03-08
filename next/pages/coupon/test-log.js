import React from 'react'
import Swal from 'sweetalert2';
import { useAuth } from '@/hooks/use-Auth'
import { useRouter } from 'next/router';
// import mainCheckToLogin from '@/hooks/use-mainCheckToLogin'


export default function TestLog() {
    const { isLoggedIn, memberId }= useAuth
    const router = useRouter();
  
    const handleGetCoupon = () => {
      if (!isLoggedIn) {
        // Redirect the user to the login page
        router.push('/member/login');
      } else {
        // Logic for what happens when a logged-in user clicks the "Get Coupon" button
        console.log("User is logged in and can claim the coupon.");
      }
    };

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-center',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer
          toast.onmouseleave = Swal.resumeTimer
        },
      })
     

    const handleClick = async () =>{
        Toast.fire({
            icon: 'success',
            title: '優惠券領取成功',
          })
    }
    
    
  return (
    <>
    <div className='text-white'>test-log</div>
    <button className='btn btn-info'
    onClick={()=>handleGetCoupon()}>click it!</button>

    </>
  )
}

// export functionmainCheckToLogin(context)