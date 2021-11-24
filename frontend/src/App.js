import './App.scss';
import Frame from './hoc/frame/Frame';
import Context from './context/Context';
import AppService from './services/appService';
import React, {useMemo, useEffect} from 'react';
import BudgetService from './services/budgetService';
import MarkupService from './services/markupService';
import StorageService from './services/storageService';
import {Route, Routes, Navigate} from 'react-router-dom';
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
                <Routes>
                    <Route path={'/budget'} element={<ProtectedRoute><Budget/></ProtectedRoute>}/>
                    <Route path={'/contact'} element={<ProtectedRoute><Contact/></ProtectedRoute>}/>
                    <Route path={'/features'} element={<ProtectedRoute><Features/></ProtectedRoute>}/>
                    <Route path={'/statistic'} element={<ProtectedRoute><Statistic/></ProtectedRoute>}/>
                    <Route path={'/settings/:list'} element={<ProtectedRoute><SettingsList/></ProtectedRoute>}/>                                          

                    <Route path={'/'} element={<Preview/>}/>
                    <Route path={'/sign-in'} element={<SignIn/>}/>
                    <Route path={'/sign-up'} element={<SignUp/>}/>
                    <Route path={'/verify-email/:token'} element={<VerifyEmail/>}/>
                    <Route path={'/recover-password'} element={<RecoverPassword/>}/>
                    <Route path={'/activate-email/:token'} element={<ActivateEmail/>}/>
                    <Route path={'/reset-password/:resetToken'} element={<ResetPassword/>}/>
                    {
                        storageService.getItem('authToken') ? <Route path={'*'} element={<ProtectedRoute><NotFound/></ProtectedRoute>}/> :
                        <Route path={'*'} element={<Navigate replace to={'/'}/>}/>
                    }
                </Routes>
            </Frame>
        </Context.Provider>
    );
};


export default App;
