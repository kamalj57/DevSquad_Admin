import React from 'react';
import Lottie from 'lottie-react';
import animationData from './loginanimation.json'; 

const Animation = () => {
  return <Lottie animationData={animationData} loop={true} className='w-full h-full' />;
};

export default Animation;
