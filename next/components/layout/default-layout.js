import Navbar from './navbar'
import Footer from './footer'
// import { useLoader } from '@/hooks/use-loader'

export default function DefaultLayout({ children }) {
  // const { loader } = useLoader()
  return (
    <>
      {/* <Navbar /> */}
      <main>
        <div>{children}</div>
        {/* {loader()} */}
      </main>
      {/* <Footer /> */}
    </>
  )
}
