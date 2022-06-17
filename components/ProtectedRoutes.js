import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'; 
export default function ProtectedRoutes({children}) {
    const {user} = useAuth();
    const router = useRouter();
    useEffect(() => {
        // console.log(userToken)
        console.log(user)
        if(!user){
            // console.log(userToken,"useEffect")
            router.push("/signup")
        }
    }, [])
    
    return (
        <>{user  ? children : null}</>
    )
}
