import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@pages/Home';
import Layout from '@components/Layout';
import NotFoundPage from '@pages/NotFoundPage';
import Spinner from '@components/common/Spinner';
import '@styles/app.scss';

const App = () => {
    return (
        <Suspense fallback={<Spinner />}>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='*' element={<NotFoundPage />} />
                </Route>
            </Routes>
        </Suspense>
    );
};

export default App;
