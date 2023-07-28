import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function GuestGuard({children}) {
    const {token}=useAuth()
    const router = useRouter()

    useEffect(()=>{
        if(!router.isReady){
            return 
        }
        if(localStorage.getItem('accessToken')){
            router.replace('/protected')
        }
    },[router.route])

  return (
    <div>{children}</div>
  )
}
