import "../../styles/globals.css"
import AuthProvider from '@/context/AuthContext'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import { useEffect } from "react"

export default function App({ Component, pageProps }) {

  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    if (window.localStorage.getItem('accessToken') && Component.protected === false) {
      router.replace('/home')
    }

    if (auth.token === null && !window.localStorage.getItem('accessToken') && Component.protected === true) {
      if (router.asPath !== '/') {
        router.replace({
          pathname: '/login',
          query: { returnUrl: router.asPath }
        })
      } else {
        router.replace('/login')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route])

  

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}