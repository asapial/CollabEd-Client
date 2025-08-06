import Lottie from 'lottie-react';
import React from 'react';
import loading from '../../assets/Animation/Loading.json';

const LoadingCenter = () => {
    return (
        <div className=' flex justify-center items-center'>
            <Lottie animationData={loading} className='h-20'  />
        </div>
    );
};

export default LoadingCenter;