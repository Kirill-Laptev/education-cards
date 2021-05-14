import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const AlertPopup: React.FC<ErrorPopupPropsType> = ({message, serverRequestSuccess}) => {

    const viewMessage = () => {
        if(message === 'user not found /ᐠ-ꞈ-ᐟ\\') return 'user not found'
        if(message === 'not correct password /ᐠ-ꞈ-ᐟ\\') return 'not correct password'
        if(message === 'not valid email/password /ᐠ-ꞈ-ᐟ\\') return 'not valid email/password'
        if(message === 'email already exists /ᐠ｡ꞈ｡ᐟ\\') return 'that username is taken'
        if(message === 'Email address not found /ᐠ-ꞈ-ᐟ\\') return 'email adress not found'
        if(message === 'no resetPasswordToken, Check your request! /ᐠ-ꞈ-ᐟ\\') return 'please check your email and click on recovery link'
        if(message === 'not your CardsPack! /ᐠ｡ꞈ｡ᐟ\\') return 'not your cards pack'
        return 'server error'
    }


    // Без useEffect попап всплывает 2 раза
    useEffect(() => {
        if(message){
            toast(viewMessage().toUpperCase())
        }
        if(serverRequestSuccess){
            toast('success ✔️'.toUpperCase())
        }
    }, [message, serverRequestSuccess])
  
    return (
        <div>
            <ToastContainer  
            position="bottom-right"
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
    serverRequestSuccess?: boolean | string
}