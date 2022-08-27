import React, { StrictMode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App';

const container: HTMLElement = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
const AppWithCallbackAfterRender = () => {
    return (
        <Router>
            <StrictMode>
                <App />
            </StrictMode>
        </Router>
    );
};
root.render(<AppWithCallbackAfterRender />);
