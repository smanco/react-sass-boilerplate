import React from 'react';

const Home: React.FC = () => {
    return (
        <div className='container'>
            <div className='header'>
                <h1>{`Welcome to React application ${process.env.SKIN}`}</h1>
            </div>
            <div className='react-logo'></div>
        </div>
    );
};

export default Home;
