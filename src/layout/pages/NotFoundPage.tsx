import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
        <div>
            <h1>Error 404 - Page Not Found</h1>
            <p>
                <Link to='/'>Back to homepage</Link>
            </p>
        </div>
    );
};

export default NotFoundPage;
