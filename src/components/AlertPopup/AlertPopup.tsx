import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const AlertPopup: React.FC<ErrorPopupPropsType> = ({message, isRegisterSuccess}) => {

    const viewMessage = () => {
        if(message === 'user not found /ᐠ-ꞈ-ᐟ\\') return 'user not found'
        if(message === 'not correct password /ᐠ-ꞈ-ᐟ\\') return 'not correct password'
        if(message === 'not valid email/password /ᐠ-ꞈ-ᐟ\\') return 'not valid email/password'
        if(message === 'email already exists /ᐠ｡ꞈ｡ᐟ\\') return 'that username is taken'
        if(message === 'sent —ฅ/ᐠ.̫ .ᐟ\\ฅ—') return 'recovery link has been sent'
        if(message === 'setNewPassword success —ฅ/ᐠ.̫ .ᐟ\\ฅ—') return '\n' +
            'new password has been successfully set'
        return 'server error'
    }

    // Без useEffect попап всплывает 2 раза
    useEffect(() => {
        if(message){
            toast(viewMessage().toUpperCase())
        }
        if(isRegisterSuccess){
            toast('success ✔️'.toUpperCase())
        }
    }, [message, isRegisterSuccess])
  
    return (
        <div>
            <ToastContainer  
            position="bottom-center"
            autoClose={4000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover/>
        </div>
    )
}

export default AlertPopup

// types
type ErrorPopupPropsType = {
    message?: string
    isRegisterSuccess?: boolean
}