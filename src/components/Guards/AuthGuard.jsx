import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function AuthGuard({ children }) {
    const router = useRouter()
    const {token}=useAuth()

    useEffect(() => {
        if(!router.isReady){
            return 
        }
        if(!token && !localStorage.getItem('accessToken')){
            router.replace('/login')
        }

    }, [router.route])

    return (
        <div>{children}</div>
    )
}
