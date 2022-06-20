import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'; 
export default function ProtectedRoutes({children}) {
    const {user} = useAuth();
    const router = useRouter();
    useEffect(() => {
        if(!user){
            router.push("/login")
        }
    }, [])
    
    return (
        <>{user  ? children : null}</>
    )
}
