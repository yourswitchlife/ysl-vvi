import * as React from "react"
import { useEffect, useRef } from 'react'
import styles from '@/components/layout/navbar/navbar.module.scss'


export default function LogoSm(props) {
    //logo animation
    const circleRef = useRef(null)
    const yRef = useRef(null)
    const oRef = useRef(null)
    const uRef = useRef(null)
    const rRef = useRef(null)
    const sRef = useRef(null)
    const wRef = useRef(null)
    const tRef = useRef(null)
    const cRef = useRef(null)
    const hRef = useRef(null)
    const lRef = useRef(null)
    const iRef = useRef(null)
    const fRef = useRef(null)
    const eRef = useRef(null)
    const bigYref= useRef(null)
    const bigSref= useRef(null)
    const bigLref= useRef(null)

    useEffect(() => {
      const initialDelay = 2000
      // 使用setTimeout來實現初始延遲
      const timeoutId = setTimeout(() => {
        const intervalId = setInterval(() => {
          //加上圓形的動畫類別
        if(circleRef.current){
          circleRef.current.classList.add(styles.logoCircleAnimation)
        }
        if(yRef.current){
          yRef.current.classList.add(styles.logoUpAnimation)
          uRef.current.classList.add(styles.logoUpAnimation)
          wRef.current.classList.add(styles.logoUpAnimation)
          tRef.current.classList.add(styles.logoUpAnimation)
          hRef.current.classList.add(styles.logoUpAnimation)
          lRef.current.classList.add(styles.logoUpAnimation)
          fRef.current.classList.add(styles.logoUpAnimation)
        }
        }, 5000); // 每5秒觸發一次動畫

        return () => {
          clearInterval(intervalId); // 清理定時器
        };
      }, initialDelay);

      // 清理setTimeout
      return () => clearTimeout(timeoutId)
    }, [])

    return (
        <svg
          id="ysl-logo"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 100.6 37.5"
          width={100}
          height={37}
          xmlSpace="preserve"
          {...props}
        >
          <style>{".st0{fill:#fff}"}</style>
          <path
          ref={bigLref}
            className="st0"
            d="M7.7 29.9c-.5-.5-.8-1.2-.8-1.9V9.6C6.9 8.5 6 7.7 5 7.7H0V28c0 1.1.9 1.9 1.9 1.9h3a2.732 2.732 0 012.7 2.7v3c0 1.1.9 1.9 1.9 1.9h20.3v-6.9H9.6c-.7.1-1.4-.2-1.9-.7z"
            id="L_00000170964264407698171990000009477223227361660599_"
          />
          <path
          ref={bigYref}
            className="st0"
            d="M23 4.9a2.732 2.732 0 01-2.7 2.7h-3a2.732 2.732 0 01-2.7-2.7v-3c0-1.1-.9-1.9-1.9-1.9H0v6.9h12.6a2.732 2.732 0 012.7 2.7v3c0 1.1.9 1.9 1.9 1.9h3c1.1 0 1.9-.9 1.9-1.9v-3a2.732 2.732 0 012.7-2.7h3c1.1 0 1.9-.9 1.9-1.9V0H23v4.9z"
            id="Y_00000119102549278613251630000002790325988117734060_"
          />
          <path
          ref={bigSref}
            className="st0"
            d="M30.7 7.7c.5-.5 1.2-.8 1.9-.8h4.9V0h-4.9c-1.1 0-1.9.9-1.9 1.9v3A2.732 2.732 0 0128 7.6h-3c-1.1 0-1.9.9-1.9 1.9v3c0 1.1.9 1.9 1.9 1.9h3a2.732 2.732 0 012.7 2.7v3a2.732 2.732 0 01-2.7 2.7H7.7V28c0 1.1.9 1.9 1.9 1.9h18.3c1.1 0 1.9-.9 1.9-1.9v-3a2.732 2.732 0 012.7-2.7h3c1.1 0 1.9-.9 1.9-1.9v-3c0-1.1-.9-1.9-1.9-1.9h-3a2.732 2.732 0 01-2.7-2.7v-3c.1-.9.4-1.6.9-2.1z"
            id="S_00000070808664895190897660000010712409964373098113_"
          />
          <g id="your">
            <path
              ref={yRef}
              id="y"
              className="st0"
              d="M47.5 4.9L44.2.3H47l1.7 2.4L50.4.3h2.8l-3.3 4.6v4.3h-2.3l-.1-4.3z"
            />
            <path
            ref={oRef}
              id="o"
              className="st0"
              d="M54.4 4.7c0-.7.1-1.3.4-1.9.2-.6.6-1.1 1-1.5s1-.8 1.6-1 1.3-.4 2-.4 1.4.1 2 .4 1.1.6 1.6 1c.4.4.8.9 1 1.5.2.6.4 1.2.4 1.9s-.2 1.3-.5 1.9c-.2.6-.6 1.1-1 1.5-.4.4-1 .8-1.6 1s-1.3.4-2 .4-1.4-.1-2-.4c-.6-.2-1.1-.6-1.6-1-.4-.4-.8-.9-1-1.5-.2-.6-.3-1.2-.3-1.9zm2.4 0c0 .4.1.7.2 1 .1.3.3.6.5.8.3.2.5.4.9.5.3.1.6.2 1 .2.3 0 .7-.1 1-.2s.6-.3.8-.5.4-.5.6-.8c.1-.3.2-.6.2-1s-.1-.7-.2-1c-.1-.3-.3-.6-.6-.8-.2-.2-.5-.4-.8-.5s-.6-.2-1-.2c-.3 0-.7.1-1 .2-.4.2-.6.3-.9.6-.2.2-.4.5-.5.8-.1.2-.2.6-.2.9z"
            />
            <path
            ref={uRef}
              id="u"
              className="st0"
              d="M69.5.3v5.6c0 .3.1.5.2.7.1.3.3.4.5.6.2.1.5.2.9.2s.7-.1.9-.2c.2-.1.4-.3.5-.5s.2-.5.2-.7V.3H75v5.2c0 1.4-.3 2.4-1 3-.6.6-1.6 1-2.9 1s-2.3-.3-3-1c-.6-.6-1-1.6-1-3V.3h2.4z"
            />
            <path
            ref={rRef}
              id="r"
              className="st0"
              d="M85.8 9.2h-2.9l-2.2-3.4v3.4h-2.3V.3H82c.5 0 .9.1 1.3.2s.7.3.9.6c.2.2.4.5.5.9s.2.7.2 1.1c0 .7-.2 1.2-.5 1.6s-.8.7-1.5.9l2.9 3.6zm-5.2-5h.4c.5 0 .8-.1 1.1-.3.2-.2.4-.5.4-.8s-.1-.6-.4-.8c-.2-.2-.6-.3-1-.3h-.4l-.1 2.2z"
            />
          </g>
          <g id="switch">
            <path
            ref={sRef}
              id="s"
              className="st0"
              d="M50.3 16.7c-.3-.2-.5-.4-.8-.5s-.5-.1-.7-.1c-.3 0-.5.1-.7.2s-.3.3-.3.6c0 .2 0 .3.1.4s.2.2.4.3c.2.1.3.1.5.2s.4.1.6.2c.8.2 1.3.6 1.7 1s.5 1 .5 1.6c0 .5-.1.9-.2 1.2-.2.4-.4.7-.7 1s-.7.5-1.1.6c-.4.1-.9.2-1.5.2-1.1 0-2.2-.3-3.1-1l1-1.9c.4.3.7.5 1 .7s.7.2 1 .2c.4 0 .7-.1.8-.3.2-.2.3-.4.3-.6 0-.1 0-.2-.1-.4 0-.1-.1-.2-.2-.3-.1-.1-.3-.2-.4-.2-.2-.1-.4-.1-.7-.2l-.9-.3c-.3-.1-.5-.3-.8-.5-.2-.2-.4-.4-.5-.7-.1-.3-.2-.7-.2-1.1s.1-.8.2-1.2c.1-.4.4-.7.6-.9.3-.3.6-.5 1-.6s.8-.2 1.3-.2c.4 0 .9.1 1.4.2.5.1.9.3 1.4.5l-.9 1.9z"
            />
            <path
            ref={wRef}
              id="w"
              className="st0"
              d="M56 14.4l1.5 5.8 1.9-5.8h1.9l1.9 5.8 1.5-5.8h2.4l-2.7 8.9H62l-1.8-5.2-1.8 5.2H56l-2.7-8.9H56z"
            />
            <path
              id="i_00000038399341783707791630000000517163327618144682_"
              className="st0"
              d="M71.9 17.9v5.4h-2.3v-5.4h2.3z"
            />
            <circle
              ref={circleRef}
              id="logo-circle-move"
              className="st0"
              cx={70.8}
              cy={15.5}
              r={1.4}
            />
            <path
            ref={tRef}
              id="t"
              className="st0"
              d="M78.6 16.4v6.9h-2.3v-6.9h-1.9v-2h6.2v2h-2z"
            />
            <path
            ref={cRef}
              id="c"
              className="st0"
              d="M89.3 17.4c-.5-.7-1.2-1-2-1-.4 0-.7.1-1 .2s-.6.3-.8.5c-.2.2-.4.5-.5.8s-.2.6-.2 1c0 .3.1.7.2 1s.3.6.5.8c.2.2.5.4.8.5s.6.2 1 .2c.7 0 1.4-.3 2-.9v2.7l-.2.1c-.4.1-.7.2-1 .3s-.6.1-.9.1c-.6 0-1.2-.1-1.8-.4-.6-.2-1.1-.6-1.5-1s-.8-.9-1-1.5c-.3-.6-.4-1.2-.4-1.9s.1-1.3.4-1.9.6-1.1 1-1.5.9-.7 1.5-1c.6-.2 1.2-.4 1.8-.4.4 0 .7 0 1.1.1.3.1.7.2 1.1.4l-.1 2.8z"
            />
            <path
            ref={hRef}
              id="h"
              className="st0"
              d="M94.9 17.9h3.4v-3.4h2.3v8.9h-2.3v-3.7h-3.4v3.7h-2.3v-8.9h2.3v3.4z"
            />
          </g>
          <g id="life">
            <path 
            ref={lRef}
            id="l" className="st0" d="M47.7 28.6v6.9h2.8v2h-5.1v-8.9h2.3z" />
            <path 
            ref={iRef}
            id="i" className="st0" d="M55.5 28.6v8.9h-2.3v-8.9h2.3z" />
            <path
            ref={fRef}
              id="f"
              className="st0"
              d="M63.9 30.6h-2.8v1.5h2.6v2h-2.6v3.5h-2.3v-8.9h5.1v1.9z"
            />
            <path
            ref={eRef}
              id="e"
              className="st0"
              d="M71.8 30.6H69v1.5h2.6v2H69v1.5h2.8v2h-5.1v-8.9h5.1v1.9z"
            />
          </g>
        </svg>
      )
}

