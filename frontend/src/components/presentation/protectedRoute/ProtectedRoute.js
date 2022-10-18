import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import Sidebar from '../sidebar/Sidebar';
import {Navigate} from 'react-router-dom';
import Context from '../../../context/Context';

const ProtectedRoute = ({children}) => {
    const {storageService} = useContext(Context);
    return (
        storageService.getItem('authToken') ? <div className={'main-view'}>
            <Sidebar/>
            <div className={'main-view__container'}>
                {children}
            </div>
        </div> : <Navigate to={'/sign-in'}/>
    );
};

ProtectedRoute.propTypes = {
    children: PropTypes.object.isRequired,
};

export default ProtectedRoute;

