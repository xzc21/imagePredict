import React from 'react';
import brain from './brain.png';
import Tilt from 'react-parallax-tilt';
import './Logo.css';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="br2 shadow-2 tiltingyes" tiltMaxAngleX={30} tiltMaxAngleY={30} glareEnable={true}
            glareMaxOpacity={0.8} glareColor="#ffffff" glarePosition="all" glareBorderRadius="20px"
            tiltReverse={true} style={{height: 150, width: 150}}>
                <div className="pa3">
                    <img style={{paddingTop: '5px'}} alt='logo' src={brain}></img>
                </div>
            </Tilt>
        </div>

    );
}

export default Logo;