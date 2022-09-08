import React, {useContext} from 'react';
import Sidebar from '../sidebar/Sidebar';
import {Navigate} from 'react-router-dom';
import Context from '../../../context/Context';

interface ProtectedRouteProps {
    children: React.ReactNode;
};

const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    const context = useContext(Context);

    return (
        context?.storageService.getItem('authToken') ? <div className={'main-view'}>
            <Sidebar/>
            <div className={'main-view__container'}>
                {children}
            </div>
        </div> : <Navigate to={'/sign-in'}/>
    );
};

export default ProtectedRoute;

