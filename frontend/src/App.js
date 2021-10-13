import './App.scss';
import Frame from './hoc/frame/Frame';
import Context from './context/Context';
import AppService from './services/appService';
import React, {useMemo, useEffect} from 'react';
import BudgetService from './services/budgetService';
import MarkupService from './services/markupService';
import StorageService from './services/storageService';
import {Route, Switch, Redirect} from 'react-router-dom';
import Budget from './components/container/budget/Budget';
import monthStorage from './json-storage/monthStorage.json';
import valueStorage from './json-storage/valueStorage.json';
import ValidationService from './services/validationService';
import Contact from './components/container/contact/Contact';
import Preview from './components/container/preview/Preview';
import SignIn from './components/presentation/sign-in/SignIn';
import SignUp from './components/presentation/sign-up/SignUp';
import budgetStorage from './json-storage/budgetStorage.json';
import DataSchemasService from './services/dataSchemasService';
import Features from './components/container/features/Features';
import currencyStorage from './json-storage/currencyStorage.json';
import Statistic from './components/container/statistic/Statistic';
import statisticStorage from './json-storage/statisticStorage.json';
import NotFound from './components/presentation/not-found/NotFound';
import VerifyEmail from './components/container/verify-email/VerifyEmail';
import ActivateEmail from './components/container/activate-email/ActivateEmail';
import SettingsList from './components/presentation/settings-list/SettingsList';
import ResetPassword from './components/presentation/reset-password/ResetPassword';
import ProtectedRoute from './components/presentation/protectedRoute/ProtectedRoute';
import RecoverPassword from './components/presentation/recover-password/RecoverPassword';


const App = () => {
    const language = navigator.language;
    const budgetService = useMemo(() => {return new BudgetService();}, []);
    const validationService = useMemo(() => {return new ValidationService();}, []);
    const appService = useMemo(() => {return new AppService(language);}, [language]);
    const storageService = useMemo(() => {return new StorageService(localStorage);},[]);
    const markupService = useMemo(() => {return new MarkupService(language);}, [language]);
    const dataSchemasService = useMemo(() => {return new DataSchemasService(language);}, [language]);

    useEffect(() => {
        document.title = appService.checkLanguage() ? 'Бюджет' : 'Budget';
        document.documentElement.lang = appService.checkLanguage() ? 'ru-Ru' : 'en-En';
    },[appService]);

    return (
        <Context.Provider value={{
            language, appService, markupService, budgetService, storageService, validationService,
            dataSchemasService, monthStorage, valueStorage, budgetStorage, currencyStorage, statisticStorage
        }}>
            <Frame className={'frame'}>
                <Switch>
                    <ProtectedRoute exact path={'/budget'} component={Budget}/>
                    <ProtectedRoute exact path={'/contact'} component={Contact}/>
                    <ProtectedRoute exact path={'/features'} component={Features}/>
                    <ProtectedRoute exact path={'/statistic'} component={Statistic}/>
                    <ProtectedRoute exact path={'/settings/:list'} component={SettingsList}/>

                    <Route exact path={'/'} component={Preview}/>
                    <Route exact path={'/sign-in'} component={SignIn}/>
                    <Route exact path={'/sign-up'} component={SignUp}/>
                    <Route exact path={'/verify-email/:token'} component={VerifyEmail}/>
                    <Route exact path={'/recover-password'} component={RecoverPassword}/>
                    <Route exact path={'/activate-email/:token'} component={ActivateEmail}/>
                    <Route exact path={'/reset-password/:resetToken'} component={ResetPassword}/>
                    {
                        storageService.getItem('authToken') ? <ProtectedRoute path={'*'} component={NotFound}/> :
                            <Redirect to={'/'}/>
                    }
                </Switch>
            </Frame>
        </Context.Provider>
    );
};


export default App;
