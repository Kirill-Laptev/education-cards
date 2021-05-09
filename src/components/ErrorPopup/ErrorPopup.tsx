import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../../redux/store';

const ErrorPopup: React.FC = () => {

    const errorMessage = useSelector<AppRootStateType, string>((state) => state.login.error)

    const viewError = () => {
        if(errorMessage === 'user not found /ᐠ-ꞈ-ᐟ\\') return 'user not found'
        if(errorMessage === 'not correct password /ᐠ-ꞈ-ᐟ\\') return 'not correct password'
        if(errorMessage === 'not valid email/password /ᐠ-ꞈ-ᐟ\\') return 'not valid email/password'
        return 'server error'
    }

    // Без useEffect попап всплывает 2 раза
    useEffect(() => {
        if(errorMessage){
            toast(viewError().toUpperCase())
        }
    }, [errorMessage])
  
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

export default ErrorPopup

