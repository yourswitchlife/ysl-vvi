import React from 'react';
import Image from 'next/image'
import head_pic from '@/public/images/member/head.jpg'
import Style from '@/styles/member/pic.module.scss'

export default function Pic() {
    return (
        <>
            <div className={Style.img_frame}>
                <Image className={Style.img_fit} src={head_pic} alt="account_pic" />
            </div>
        </>
    )
}