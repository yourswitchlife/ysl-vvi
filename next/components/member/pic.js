import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import head_pic from '@/public/images/member/head.jpg'
import Style from '@/styles/member/pic.module.scss'
import { useAuth } from '@/context/AuthContext';


export default function Pic() {

    const { isLoggedIn, memberData } = useAuth();
  const [frameStyle, setFrameStyle] = useState(Style.blue_frame); // 使用 state 來管理 frameStyle

  useEffect(() => {
    if (isLoggedIn && memberData) {
        const { level_point } = memberData;
        
        if (level_point < 6000) {
          setFrameStyle(Style.blue_frame); // 高手
        } else if (level_point >= 6000 && level_point <= 12999) {
          setFrameStyle(Style.brown_frame); // 菁英
        } else if (level_point >= 13000 && level_point <= 19999) {
          setFrameStyle(Style.silver_frame); // 大師
        } else if (level_point >= 20000) {
          setFrameStyle(Style.gold_frame); // 傳說
        }
      }
    }, [memberData]); 

    return (
        <>
            <div className={frameStyle}>
                <Image className={Style.img_fit} src={head_pic} alt='account_pic' />
            </div>
        </>
    )
}