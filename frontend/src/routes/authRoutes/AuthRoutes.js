import React from 'react';
import {Switch, Route} from 'react-router-dom';
import SignIn from '../../components/sign-in/SignIn';
import SignUp from '../../components/sign-up/SignUp';
import Preview from '../../components/preview/Preview';


const AuthRoutes = () => {
    return(
        <Switch>
            <Route exact path={'/sign_in'} component={SignIn}/>
            <Route exact path={'/sign_up'} component={SignUp}/>
            <Route exact path={'/preview'} component={Preview}/>
        </Switch>
    );
};


export default AuthRoutes;