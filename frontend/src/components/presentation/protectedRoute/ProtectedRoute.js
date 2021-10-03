import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import Sidebar from '../sidebar/Sidebar';
import Context from '../../../context/Context';
import {Route, Redirect} from 'react-router-dom';


const ProtectedRoute = ({component: Component, ...rest}) => {
    const {storageService} = useContext(Context);
    return (
        <Route
            {...rest}
            render={(props) =>
                storageService.getItem('authToken') ? (
                    <div className={'main-view'}>
                        <Sidebar/>
                        <div className={'main-view__container'}>
                            <Component {...props}/>
                        </div>
                    </div>
                ) : (
                    <Redirect to={'/sign-in'}/>
                )
            }
        />
    );
};


ProtectedRoute.propTypes = {
    component: PropTypes.func.isRequired
};


export default ProtectedRoute;

