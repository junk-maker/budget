import './App.scss';
import Frame from './hoc/frame/Frame';
import AppService from './services/appService';
import MarkupService from './services/markupService';
import {Route, Switch, Redirect} from 'react-router-dom';
import React, {useMemo, useState, useEffect} from 'react';
import Budget from './components/container/budget/Budget';
import Contact from './components/container/contact/Contact';
import Preview from './components/container/preview/Preview';
import SignIn from './components/presentation/sign-in/SignIn';
import SignUp from './components/presentation/sign-up/SignUp';
import Features from './components/container/features/Features';
import Statistic from './components/container/statistic/Statistic';
import VerifyEmail from './components/container/verify-email/VerifyEmail';
import SettingsList from './components/presentation/settings-list/SettingsList';
import ResetPassword from './components/presentation/reset-password/ResetPassword';
import ProtectedRoute from './components/presentation/protectedRoute/ProtectedRoute';
import RecoverPassword from './components/presentation/recover-password/RecoverPassword';
//import NotFound from './components/presentation/error-handlers/not-found/NotFound';



const App = () => {
    const [language, setLanguage] = useState(null);
    const appService = useMemo(() => {return new AppService();}, []);
    const markupService = useMemo(() => {return new MarkupService(language);}, []);

    useEffect(() => {
        let userLang = window.navigator.language;

        setLanguage(userLang);
        document.title = appService.checkLanguage(language) ? 'Бюджет' : 'Budget';
        document.documentElement.lang = appService.checkLanguage(language) ? 'ru-Ru' : 'en-En';
    },[language, appService, markupService, setLanguage]);

    return (
        <Frame className={'frame'}>
            <Switch>
                <ProtectedRoute exact path={'/budget'} component={Budget} language={language}/>
                <ProtectedRoute exact path={'/contact'} component={Contact} language={language}/>
                <ProtectedRoute exact path={'/features'} component={Features} language={language}/>
                <ProtectedRoute exact path={'/statistic'} component={Statistic} language={language}/>
                <ProtectedRoute exact path={'/settings/:list'} component={SettingsList} language={language}/>
                {/*<Route path={'*'} component={NotFound}/>*/}


                <Route exact path={'/'} render={() => <Preview language={language}/>}/>
                <Route exact path={'/sign-in'} render={() => <SignIn language={language}/>}/>
                <Route exact path={'/sign-up'} render={() => <SignUp language={language}/>}/>
                <Route exact path={'/verify'} component={VerifyEmail}/>
                <Route exact path={'/recover-password'} render={() => <RecoverPassword language={language}/>}/>
                <Route exact path={'/reset-password/:resetToken'} render={({match}) => <ResetPassword
                   match={match} language={language}/>}/>
                <Redirect to={'/'}/>
            </Switch>
        </Frame>
    );
};


export default App;
