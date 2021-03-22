import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from '../../components/auth/Auth';


const AuthRoutes = () => {
    return(
        <Switch>
            <Route exact path={'/auth'} component={Auth}/>
        </Switch>
    );
};


export default AuthRoutes;