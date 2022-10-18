import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {actionToLogout} from '../../../redux/slice/logoutSlice';

const Logout = ({children}) => {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        window.location.reload();
        dispatch(actionToLogout());
    };

    return(
        <div onClick={logoutHandler}>
            {children}
        </div>
    );
};

Logout.propTypes = {
    children: PropTypes.object.isRequired
};

export default Logout;