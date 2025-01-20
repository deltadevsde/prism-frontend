import Spline from '@splinetool/react-spline';
import React from 'react';

const SplinePreloader = () => {
  const handleLoad = () => {
    sessionStorage.setItem('splineLoaded', 'true');
  };

  return (
    <div className='hidden'>
      <Spline
        style={{ height: 1000, width: 1000 }}
        onLoad={handleLoad}
        scene='https://prod.spline.design/V30jxm7Rt3T1ZpnJ/scene.splinecode'
      />
    </div>
  );
};

export default SplinePreloader;
