import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import SideBar from '@/components/member/sidebar-member'
import Navbar from '@/components/layout/navbar/navbar'
import Footer from '@/components/layout/footer/footer-backstage'
import mStyle from '@/styles/member/g-valuable.module.scss'
import sStyle from '@/styles/member/sign-in.module.scss'
import pStyle from '@/styles/member/points.module.scss'
import ProgressBar from 'react-bootstrap/ProgressBar'

import mainCheckToLogin from '@/hooks/use-mainCheckToLogin'


import brutal from '@/public/images/member/brutal.png'
import cracked from '@/public/images/member/cracked.png'
import elf from '@/public/images/member/elf.png'
import warlord from '@/public/images/member/warlord.png'
import Link from 'next/link'

import { useAuth } from '@/hooks/use-Auth';


export default function points() {
  const { isLoggedIn, memberData } = useAuth();
  const [levelPoint, setlevelPoint] = useState('');
  const [progressBar, setProgressBar] = useState(0);

  useEffect(() => {

    if (isLoggedIn && memberData) {
      const { level_point } = memberData;
      let calculatedValue;

      if (level_point < 6000) {
        setlevelPoint("6000");
        calculatedValue = (level_point / 6000) * 100;

      } else if (level_point >= 6000 && level_point <= 12999) {
        setlevelPoint("13000");
        calculatedValue = (level_point / 13000) * 100;

      } else if (level_point >= 13000 && level_point <= 19999) {
        setlevelPoint("20000");
        calculatedValue = (level_point / 20000) * 100;

      } else if (level_point >= 20000) {
        setlevelPoint("M A X");
        calculatedValue = 100;
      }
      setProgressBar(calculatedValue);
    }
  }, [memberData]);

  return (
    <>
      <Navbar />
      <div className={mStyle.bodyClass + ' d-flex'}>
        <SideBar />
        <div
          className={
            pStyle.point_frame +
            ' container d-flex flex-column justify-content-center align-items-center'
          }
        >
          <div className={pStyle.progress_frame}>
            <div className={pStyle.progress_flex}>
              <h6 className="flex-grow-1">目前累積積分</h6>
              <h4 className={pStyle.red_text}>{memberData?.level_point}</h4>
              <h6 className="px-3">/</h6>
              <h6 className="flex-grow-1">{levelPoint}</h6>
              <h6 className={`${pStyle.red_text} px-5`}>
                {memberData?.level_point >= 20000 ?
                  "恭喜您解鎖最高等級！" :
                  `再消費 $${levelPoint - (memberData?.level_point)} 可解鎖下一等級`}
              </h6>

              <Link className={pStyle.shop_btn + " fw-bold"} href="/products">
                去逛逛
              </Link>
            </div>

            <div>
              <ProgressBar className={pStyle.progress_bg} animated now={progressBar} />
            </div>
          </div>

          <div
            className={
              pStyle.level_div +
              ' d-flex py-4 justify-content-center align-items-center'
            }
          >
            <div className={pStyle.margin_auto}>
              <div className={pStyle.level_frame}>
                <Image
                  className={pStyle.img_fit}
                  src={cracked}
                  alt="cracked"
                />
              </div>
              <div className={pStyle.line}></div>
              <div className={pStyle.level_frame}>
                <Image
                  className={pStyle.img_fit}
                  src={brutal}
                  alt="cracked"
                />
              </div>
              <div className={pStyle.line}></div>
              <div className={pStyle.level_frame}>
                <Image
                  className={pStyle.img_fit}
                  src={warlord}
                  alt="cracked"
                />
              </div>
              <div className={pStyle.line}></div>
              <div className={pStyle.level_frame}>
                <Image className={pStyle.img_fit} src={elf} alt="cracked" />
              </div>
            </div>
            <div className={pStyle.column_leveltext}>
              <div className={pStyle.border_bm + '  pb-3'}>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex py-3">
                    <h5 className={pStyle.blue_text + ' pe-4'}>新手</h5>
                    <div className={`${pStyle.frame} ${pStyle.px2} ${levelPoint === '6000' ? '' : 'd-none'}`}>
                      <h6 className={pStyle.level_text}>目前等級</h6>
                    </div>
                  </div>
                  <h6 className={pStyle.blue_text}>
                    積分 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0
                  </h6>
                </div>
                <h6 className={pStyle.white_text}>
                  歡迎您，勇者！初來乍到，盡情探索ysl世界吧！探險之旅，每一步都是成長的開始。
                </h6>
              </div>

              <div className={pStyle.border_bm + '  pb-3'}>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex py-3">
                    <h5 className={pStyle.second_text + ' pe-4'}>高手</h5>
                    <div className={`${pStyle.frame} ${pStyle.px2} ${levelPoint === '13000' ? '' : 'd-none'}`}>
                      <h6 className={pStyle.level_text}>目前等級</h6>
                    </div>
                  </div>
                  <h6 className={pStyle.second_text}>
                    積分 &nbsp;&nbsp;&nbsp; 6000
                  </h6>
                </div>
                <h6 className={pStyle.white_text}>
                  恭喜您晉升為高手！您已經展翅高飛，挑戰更高的領域，無限可能的成就等著您發現！
                </h6>
              </div>

              <div className={pStyle.border_bm + '  pb-3'}>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex py-3">
                    <h5 className={pStyle.white_text + ' pe-4'}>菁英</h5>
                    <div className={`${pStyle.frame} ${pStyle.px2} ${levelPoint === '20000' ? '' : 'd-none'}`}>
                      <h6 className={pStyle.level_text}>目前等級</h6>
                    </div>
                  </div>
                  <h6 className={pStyle.white_text}>積分 &nbsp; 13000</h6>
                </div>
                <h6 className={pStyle.white_text}>
                  看來您已經成為菁英之一！在這個圈子裡，與您一同追求卓越的夥伴期待與您互動、挑戰極致。
                </h6>
              </div>

              <div className={pStyle.border_bm + '  pb-3 border-0'}>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex py-3">
                    <h5 className={pStyle.master_text + ' pe-4'}>大師</h5>
                    <div className={`${pStyle.frame} ${pStyle.px2} ${levelPoint === 'M A X' ? '' : 'd-none'}`}>
                      <h6 className={pStyle.level_text}>目前等級</h6>
                    </div>
                  </div>
                  <h6 className={pStyle.master_text}>積分 &nbsp; 20000</h6>
                </div>
                <h6 className={pStyle.white_text}>
                  我們迎來了一位大師！您的智慧如光芒閃耀，大師降臨，智慧共享之旅展開。引領巔峰。
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-none d-sm-block">
        <Footer />
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  return await mainCheckToLogin(context);
}