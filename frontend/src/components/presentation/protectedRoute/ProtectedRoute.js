import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../sidebar/Sidebar';
import {Redirect, Route} from 'react-router-dom';


const ProtectedRoute = ({component: Component, ...rest}) => {

    return (
        <Route
            {...rest}
            render={(props) =>
                localStorage.getItem('authToken') ? (
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
    rest: PropTypes.object,
    Component: PropTypes.func
};


export default ProtectedRoute;

