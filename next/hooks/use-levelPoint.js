import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-Auth';
import Style from '@/styles/member/pic.module.scss';
import dStyle from '@/styles/member/sidebar.module.scss';

import profilePhoto from '@/public/images/profile-photo/default-profile-img.svg';
import brutal from '@/public/images/member/brutal.png';
import cracked from '@/public/images/member/cracked.png';
import elf from '@/public/images/member/elf.png';
import warlord from '@/public/images/member/warlord.png';

export const useLevelPoint = () => {
    //待整理
    //Auth
    const { isLoggedIn, memberData } = useAuth();

    const [frameStyle, setFrameStyle] = useState(Style.nblue_frame); // 使用 state 來管理 frameStyle
    const [pointStyle, setpointStyle] = useState(dStyle.blue_text); // pointStyle
    const [BigPic, setBigPic] = useState(profilePhoto);
    const [pointIcon, setpointIcon] = useState(cracked);
    const [levelText, setLevelText] = useState("新手");
    const [levelPoint, setlevelPoint] = useState("6000");

    useEffect(() => {
    if (isLoggedIn && memberData) {
      const picUrl = memberData.pic
        ? (memberData.pic.startsWith("https://") ? memberData.pic : `/images/member/profile-pic/${memberData.pic}`)
        : profilePhoto;

      setBigPic(picUrl);
      const { level_point } = memberData;

      if (level_point < 6000) {
        setFrameStyle(Style.blue_frame);
        setpointStyle(dStyle.blue_text);
        setpointIcon(cracked);
        setLevelText("新手");
        setlevelPoint("6000");
      } else if (level_point >= 6000 && level_point <= 12999) {
        setFrameStyle(Style.brown_frame);
        setpointStyle(dStyle.brown_text);
        setpointIcon(brutal);
        setLevelText("高手");
        setlevelPoint("13000");
      } else if (level_point >= 13000 && level_point <= 19999) {
        setFrameStyle(Style.silver_frame);
        setpointStyle(dStyle.silver_text);
        setpointIcon(warlord);
        setLevelText("菁英");
        setlevelPoint("20000");
      } else if (level_point >= 20000) {
        setFrameStyle(Style.gold_frame);
        setpointStyle(dStyle.gold_text);
        setpointIcon(elf);
        setlevelPoint("MAX");
      }
    }
  }, [memberData]);
};
