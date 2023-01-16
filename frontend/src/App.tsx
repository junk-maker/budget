import './App.scss';
import Frame from './hoc/frame/Frame';
import {ContextState} from './context/Context';
import MarkupService from './services/markupService';
import React, {memo, useMemo, useEffect} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import Budget from './components/container/budget/Budget';
import AppService from './services/appService/appService';
import valueStorage from './json-storage/valueStorage.json';
import Contact from './components/container/contact/Contact';
import Preview from './components/container/preview/Preview';
import ValidationService from './services/validationService';
import budgetStorage from './json-storage/budgetStorage.json';
import SignIn from './components/presentation/sign-in/SignIn';
import SignUp from './components/presentation/sign-up/SignUp';
import Features from './components/container/features/Features';
import SliceService from './services/sliceService/sliceService';
import currencyStorage from './json-storage/currencyStorage.json';
import statisticStorage from './json-storage/currencyStorage.json';
import Settings from './components/presentation/settings/Settings';
import BudgetService from './services/budgetService/budgetService';
import NotFound from './components/presentation/not-found/NotFound';
import StorageService from './services/storageService/storageService';
import Statistics from './components/container/statistics/Statistics';
import VerifyEmail from './components/container/verify-email/VerifyEmail';
import DataSchemesService from './services/dataSchemesService/dataSchemesService';
import PasswordReset from './components/presentation/password-reset/PasswordReset';
import ProtectedRoute from './components/presentation/protectedRoute/ProtectedRoute';
import EmailActivation from './components/container/email-activation/EmailActivation';
import PasswordRecovery from './components/presentation/password-recovery/PasswordRecovery';

const App: React.FC = memo(() => {
    const language = navigator.language;
    const sliceService = useMemo(() => new SliceService(), []);
    const storageService = useMemo(() => new StorageService(), []);
    const validationService = useMemo(() => new ValidationService(), []);
    const appService = useMemo(() => new AppService(language), [language]);
    const markupService = useMemo(() => new MarkupService(language), [language]);
    const budgetService = useMemo(() => new BudgetService(language), [language]);
    const dataSchemesService = useMemo(() => new DataSchemesService(language), [language]);
    
    useEffect(() => {
        document.title = appService.checkLanguage() ? 'Бюджет' : 'Budget';
        document.documentElement.lang = appService.checkLanguage() ? 'ru-Ru' : 'en-En';
    },[appService]);

    return (
        <ContextState services={{appService, sliceService, markupService, budgetService, storageService, 
            validationService, dataSchemesService, valueStorage, budgetStorage, currencyStorage, statisticStorage,
        }}>
            <Frame className={'frame'}>
                <Routes>
                    <Route path={'/budget'} element={<ProtectedRoute><Budget/></ProtectedRoute>}/>
                    <Route path={'/contact'} element={<ProtectedRoute><Contact/></ProtectedRoute>}/>
                    <Route path={'/features'} element={<ProtectedRoute><Features/></ProtectedRoute>}/>
                    <Route path={'/statistics'} element={<ProtectedRoute><Statistics/></ProtectedRoute>}/>
                    <Route path={'/settings/:list'} element={<ProtectedRoute><Settings/></ProtectedRoute>}/> 

                    <Route path={'/'} element={<Preview/>}/>
                    <Route path={'/sign-in'} element={<SignIn/>}/>
                    <Route path={'/sign-up'} element={<SignUp/>}/>
                    <Route path={'/verify-email/:token'} element={<VerifyEmail/>}/>
                    <Route path={'/password-recovery'} element={<PasswordRecovery/>}/>
                    <Route path={'/email-activation/:token'} element={<EmailActivation/>}/>
                    <Route path={'/password-reset/:resetToken'} element={<PasswordReset/>}/>
                    {
                        storageService.getItem('authToken') ? <Route path={'*'} element={<ProtectedRoute><NotFound/></ProtectedRoute>}/> :
                        <Route path={'*'} element={<Navigate replace to={'/'}/>}/>
                    }
                </Routes>
            </Frame>
        </ContextState>
    );
});

export default App;
