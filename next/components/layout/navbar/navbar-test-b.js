import { slide as Menu } from 'react-burger-menu'
import { useState, useEffect } from 'react'
import Link from 'next/link'

// 勾子
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    window.addEventListener('resize', listener)
    return () => window.removeEventListener('resize', listener)
  }, [matches, query])

  return matches
}

// 彈出的漢堡選單內容
const Sidebar = () => {
  return (
    <>
      <Menu>
        <Link className="menu-item" href="/">
          Home
        </Link>
        <Link className="menu-item" href="/salads">
          Salads
        </Link>
        <Link className="menu-item" href="/pizzas">
          Pizzas
        </Link>
        <Link className="menu-item" href="/desserts">
          Desserts
        </Link>
      </Menu>
    </>
  )
}

export default function NavbarTestB() {
  // You can use any @media property
  const isMobile = useMediaQuery('(max-width: 700px)')

  return (
    <div className="App">
      <div className="App" id="outer-container">
        {isMobile ? (
          <Sidebar
            pageWrapID={'page-wrap'}
            outerContainerId={'outer-container'}
          />
        ) : (
          <h1>Desktop</h1>
        )}
        <div id="page-wrap">
          <h1>測試一下</h1>
          <h2>測試一下</h2>
        </div>
      </div>
    </div>
  )
}

// 去除上下選單的版型，套用layout用
NavbarTestB.getLayout = function (page) {
  return (
    <main className="flex-shrink-0 mt-3">
      <div className="container-fluid m-0 p-0">{page}</div>
    </main>
  )
}
