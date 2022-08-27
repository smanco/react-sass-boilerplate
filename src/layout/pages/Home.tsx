import React from 'react';

const Home: React.FC = () => {
    return (
        <div className='container'>
            <div className='header'>
                <h1>{`Welcome to React application ${process.env.SKIN}`}</h1>
            </div>
            <div className='react-logo'></div>
            <img src={`${process.env.THEME_IMAGES_PATH}react.png`} alt='image from theme directory' />
            <img src={`${process.env.COMMON_IMAGES_PATH}react.png`} alt='image from common directory' />
        </div>
    );
};

export default Home;
