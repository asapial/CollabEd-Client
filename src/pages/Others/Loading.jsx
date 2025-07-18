import Lottie from 'lottie-react';
import React from 'react';
import loading from '../../assets/Animation/Loading.json';

const Loading = () => {
    return (
        <div className=' flex justify-center items-center min-h-screen'>
            <Lottie animationData={loading} className='h-40'  />
        </div>
    );
};

export default Loading;