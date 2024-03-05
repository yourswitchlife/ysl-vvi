import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import profilePhoto from '@/public/images/profile-photo/default-profile-img.svg'
import Style from '@/styles/member/pic.module.scss'
//hooks
import { useAuth } from '@/hooks/use-Auth';


export default function navPic() {

  const { isLoggedIn, memberData } = useAuth();
  const [frameStyle, setFrameStyle] = useState(Style.nblue_frame); // 使用 state 來管理 frameStyle
  const [navPic, setNavPic] = useState(profilePhoto);

  useEffect(() => {
    if (isLoggedIn && memberData) {
      const picUrl = memberData.pic
        ? (memberData.pic.startsWith("https://") ? memberData.pic : `/images/member/profile-pic/${memberData.pic}`)
        : profilePhoto;

      setNavPic(picUrl);

      const { level_point } = memberData;
      // console.log(level_point)

      if (level_point < 6000) {
        setFrameStyle(Style.nblue_frame); // 新手
      } else if (level_point >= 6000 && level_point <= 12999) {
        setFrameStyle(Style.nbrown_frame); // 高手
      } else if (level_point >= 13000 && level_point <= 19999) {
        setFrameStyle(Style.nsilver_frame); // 菁英
      } else if (level_point >= 20000) {
        setFrameStyle(Style.ngold_frame); // 大師
      }
    }
  }, [memberData]);

  return (
    <>
      <div className={frameStyle}>
        <Image width={40} height={40} className={Style.img_fit} src={navPic} alt='profile_pic' />
      </div>
    </>
  )
}