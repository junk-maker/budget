import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../sidebar/Sidebar';
import {Route, Redirect} from 'react-router-dom';


const ProtectedRoute = ({component: Component, language, ...rest}) => {

    return (
        <Route
            {...rest}
            render={(props) =>
                localStorage.getItem('authToken') ? (
                    <div className={'main-view'}>
                        <Sidebar/>
                        <div className={'main-view__container'}>
                            <Component {...props} language={language}/>
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

