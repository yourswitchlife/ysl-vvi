import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import head_pic from '@/public/images/member/profile-pic/mario.webp'
import Style from '@/styles/member/pic.module.scss'
import dStyle from '@/styles/member/sidebar.module.scss'
import mStyle from '@/styles/member/g-valuable.module.scss'

import profilePhoto from '@/public/images/profile-photo/default-profile-img.svg'
import brutal from '@/public/images/member/brutal.png';
import cracked from '@/public/images/member/cracked.png';
import elf from '@/public/images/member/elf.png';
import warlord from '@/public/images/member/warlord.png';

import { useAuth } from '@/hooks/use-Auth';


export default function BigPic() {
  //Auth
  const { isLoggedIn, memberData } = useAuth();

  const [frameStyle, setFrameStyle] = useState(Style.nblue_frame); // 使用 state 來管理 frameStyle
  const [pointStyle, setpointStyle] = useState(dStyle.blue_text); // pointStyle
  const [BigPic, setBigPic] = useState(profilePhoto);
  const [pointIcon, setpointIcon] = useState(cracked);
  const [levelText, setLevelText] = useState("新手");
  
  useEffect(() => {
    
    if (isLoggedIn && memberData) {
      const picUrl = memberData.pic
        ? (memberData.pic.startsWith("https://") ? memberData.pic : `/images/member/profile-pic/${memberData.pic}`)
        : profilePhoto;
      
      setBigPic(picUrl);
      const { level_point } = memberData;
      console.log(level_point)

      if (level_point < 6000) {
        setFrameStyle(Style.blue_frame) // 新手
        setpointStyle(dStyle.blue_text)
        setpointIcon(cracked)
        setLevelText("新手")

      } else if (level_point >= 6000 && level_point <= 12999) {
        setFrameStyle(Style.brown_frame)
        setpointStyle(dStyle.brown_text) // 高手
        setpointIcon(brutal)
        setLevelText("高手")

      } else if (level_point >= 13000 && level_point <= 19999) {
        setFrameStyle(Style.silver_frame)
        setpointStyle(dStyle.silver_text) // 菁英
        setpointIcon(warlord)
        setLevelText("菁英")

      } else if (level_point >= 20000) {
        setFrameStyle(Style.gold_frame)
        setpointStyle(dStyle.gold_text) // 大師
        setpointIcon(elf)
        setLevelText("大師")
      }
    }
  }, [memberData]);

  return (
    <>
      <div className={frameStyle}>
        <Image width={40} height={40} className={Style.img_fit} src={BigPic} alt='profile_pic' />
      </div>
      <div className="d-flex flex-column px-3">
      <h6 className={mStyle.h6+ " m-auto"}>{memberData?.account}</h6>
        <div className={dStyle.frame+ " mt-2"}>
          <div className={dStyle.level_frame}>
            <Image className={dStyle.level} src={pointIcon} alt="level_img" />
          </div>
          <h6 className={pointStyle}>{levelText}</h6>
        </div>
      </div>
    </>
  )
}