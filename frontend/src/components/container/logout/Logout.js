import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {logout} from '../../../redux/actions/logoutActions';


const Logout = props => {
    const {children} = props;
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
        window.location.reload();
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