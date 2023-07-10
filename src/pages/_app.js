import '@/styles/globals.css'
import AuthProvider from '@/context/Auth-Context'

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}