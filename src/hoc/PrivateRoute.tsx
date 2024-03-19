import React, { ReactNode, useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import Loader from '../common/Loader';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    console.log(user)

    console.log('loading', loading)

    if (loading) {
        return <Loader />;
    }

    if (user) {
        console.log('user exists')
        return children;
    }

    return <Navigate to='/auth/signin' state={{ from: location }} replace />
};

export default PrivateRoute;