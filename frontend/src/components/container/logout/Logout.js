import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {logout} from '../../../redux/actions/authAction';


const Logout = props => {
    const {children} = props;
    const history = useHistory();
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout(history));
    };

    return(
        <div onClick={logoutHandler}>
            {children}
        </div>
    );
};


Logout.propTypes = {
    children: PropTypes.object
};

export default Logout;