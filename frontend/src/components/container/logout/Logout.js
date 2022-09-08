import React from 'react';
// import {useDispatch} from 'react-redux';
import {logout} from '../../../redux/actions/logoutActions';


const Logout = props => {
    const {children} = props;
    // const dispatch = useDispatch();

    const logoutHandler = () => {
        // dispatch(logout());
        window.location.reload();
    };

    return(
        <div onClick={logoutHandler}>
            {children}
        </div>
    );
};

export default Logout;