import ButtonAppBar from '@/components/AppBar/AppBar'
import AuthGuard from '@/components/Guards/AuthGuard'
import GuestGuard from '@/components/Guards/GuestGuard'
import AuthProvider from '@/context/AuthContext'
import { store } from '@/store'
import '@/styles/globals.css'

import { Provider } from 'react-redux'

const Guard = ({ children, authGuard, guestGuard }) => {
  if (authGuard) {
    return <AuthGuard>{children}</AuthGuard>
  }
  else if (!authGuard && !guestGuard) {
    return <>{children}</>
  }
  else if (guestGuard) {
    return <GuestGuard>{children}</GuestGuard>
  }
}

export default function App({ Component, pageProps }) {
  const authGuard = Component.authGuard ?? false
  const guestGuard = Component.guestGuard ?? false
  return (
    <Provider store={store}>
    <AuthProvider>
      <Guard authGuard={authGuard} guestGuard={guestGuard}>
        <ButtonAppBar />
        <Component {...pageProps} />
      </Guard>
    </AuthProvider>
    </Provider>
  )
}
