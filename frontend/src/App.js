import './App.scss';
import React from 'react';
import Frame from './hoc/frame/Frame';
import Settings from './components/container/settings/Settings';
import {Route, Switch, Redirect} from 'react-router-dom';
import Statistics from './components/statistic/Statistic';
import Budget from './components/container/budget/Budget';
import Contact from './components/container/contact/Contact';
import Preview from './components/container/preview/Preview';
import SignIn from './components/presentation/sign-in/SignIn';
import SignUp from './components/presentation/sign-up/SignUp';
import Features from './components/container/features/Features';
import VerifyEmail from './components/container/verify-email/VerifyEmail';
import ResetPassword from './components/presentation/reset-password/ResetPassword';
import ProtectedRoute from './components/presentation/protectedRoute/ProtectedRoute';
import RecoverPassword from './components/presentation/recover-password/RecoverPassword';
//import NotFound from './components/presentation/error-handlers/not-found/NotFound';



const App = () => {
  return (
    <Frame className={'frame'}>
        <Switch>
            <ProtectedRoute exact path={'/budget'} component={Budget}/>
            <ProtectedRoute exact path={'/features'} component={Features}/>
            <ProtectedRoute exact path={'/settings'} component={Settings}/>
            <ProtectedRoute exact path={'/contact'} component={Contact}/>
            <ProtectedRoute exact path={'/statistics'} component={Statistics}/>
            {/*<Route path={'*'} component={NotFound}/>*/}

            <Route exact path={'/'} component={Preview}/>
            <Route exact path={'/sign-in'} component={SignIn}/>
            <Route exact path={'/sign-up'} component={SignUp}/>
            <Route exact path={'/verify'} component={VerifyEmail}/>
            <Route exact path={'/recover-password'} component={RecoverPassword}/>
            <Route exact path={'/reset-password/:resetToken'} component={ResetPassword}/>
            <Redirect to={'/'}/>
        </Switch>
    </Frame>
  );
};


export default App;
