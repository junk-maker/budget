import SignIn from '../../sign-in/SignIn';
import SignUp from '../../sign-up/SignUp';
import Preview from '../../preview/Preview';
import {Route, Switch, Redirect} from 'react-router-dom';
import RecoverPassword from '../../../container/recover-password/RecoverPassword';
import VerifyEmail from '../../../container/verify-email/VerifyEmail';


const AuthRoutes = () => {
    return(
        <Switch>
            <Route exact path={'/sign-in'} component={SignIn}/>
            <Route exact path={'/sign-up'} component={SignUp}/>
            <Route exact path={'/preview'} component={Preview}/>
            <Route exact path={'/verify'} component={VerifyEmail}/>
            <Route exact path={'/help'} component={RecoverPassword}/>
            <Redirect to={'/preview'}/>
        </Switch>
    );
};


export default AuthRoutes;