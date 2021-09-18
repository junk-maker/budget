import './App.scss';
import Frame from './hoc/frame/Frame';
import Context from './context/Context';
import AppService from './services/appService';
import BudgetService from './services/budgetService';
import MarkupService from './services/markupService';
import {Route, Switch, Redirect} from 'react-router-dom';
import React, {useMemo, useState, useEffect} from 'react';
import Budget from './components/container/budget/Budget';
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
import VerifyEmail from './components/container/verify-email/VerifyEmail';
import LoadingPage from './components/presentation/ui/loading-page/LoadingPage';
import SettingsList from './components/presentation/settings-list/SettingsList';
import ResetPassword from './components/presentation/reset-password/ResetPassword';
import ProtectedRoute from './components/presentation/protectedRoute/ProtectedRoute';
import RecoverPassword from './components/presentation/recover-password/RecoverPassword';
//import NotFound from './components/presentation/error-handlers/not-found/NotFound';


const App = () => {
    const language = navigator.language;
    // const [language, setLanguage] = useState(null);
    const budgetService = useMemo(() => {return new BudgetService();}, []);
    const validationService = useMemo(() => {return new ValidationService();}, []);
    const appService = useMemo(() => {return new AppService(language);}, [language]);
    const markupService = useMemo(() => {return new MarkupService(language);}, [language]);
    const dataSchemasService = useMemo(() => {return new DataSchemasService(language);}, [language]);
    // const budgetService = new BudgetService();
    // const markupService = new MarkupService(language);
    // const validationService = new ValidationService();
    // const dataSchemasService = new DataSchemasService(language);

    useEffect(() => {
        // console.log('work')
        return () => {
            document.title = appService.checkLanguage() ? 'Бюджет' : 'Budget';
            document.documentElement.lang = appService.checkLanguage() ? 'ru-Ru' : 'en-En';
        }
    },[appService]);


    // if(!language) {
    //     return <LoadingPage/>
    // }
    return (
        <Context.Provider value={{
            language, appService, markupService, budgetService, validationService, dataSchemasService,
            valueStorage, budgetStorage, currencyStorage, statisticStorage,
        }}>
            <Frame className={'frame'}>
                <Switch>
                    <ProtectedRoute exact path={'/budget'} component={Budget}/>
                    <ProtectedRoute exact path={'/contact'} component={Contact}/>
                    <ProtectedRoute exact path={'/features'} component={Features}/>
                    <ProtectedRoute exact path={'/statistic'} component={Statistic}/>
                    <ProtectedRoute exact path={'/settings/:list'} component={SettingsList}/>
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
        </Context.Provider>
    );
};


export default App;
