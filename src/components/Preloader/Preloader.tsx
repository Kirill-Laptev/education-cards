import React from 'react'
import preloader from '../../assets/img/preloader.svg'

const preloaderStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh'
}

const Preloader: React.FC = () => {
    return (
        <div style={preloaderStyles}>
            <div><img src={preloader} /></div>
        </div>
    )
}

export default Preloader
