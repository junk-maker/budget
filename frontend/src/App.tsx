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
import valueStorage from './json-storage/valueStorage.json';
import ValidationService from './services/validationService';
import Contact from './components/container/contact/Contact';
import Preview from './components/container/preview/Preview';
import SignIn from './components/presentation/sign-in/SignIn';
import SignUp from './components/presentation/sign-up/SignUp';
import budgetStorage from './json-storage/budgetStorage.json';
import DataSchemasService from './services/dataSchemesService';
import Features from './components/container/features/Features';
import currencyStorage from './json-storage/currencyStorage.json';
import Settings from './components/presentation/settings/Settings';
import statisticStorage from './json-storage/statisticStorage.json';
import NotFound from './components/presentation/not-found/NotFound';
import Statistics from './components/container/statistics/Statistics';
import VerifyEmail from './components/container/verify-email/VerifyEmail';
import PasswordReset from './components/presentation/password-reset/PasswordReset';
import ProtectedRoute from './components/presentation/protectedRoute/ProtectedRoute';
import EmailActivation from './components/container/email-activation/EmailActivation';
import PasswordRecovery from './components/presentation/password-recovery/PasswordRecovery';
import {ContextInterface} from './types/types';


const App: React.FC = () => {
  const budgetService: BudgetService = useMemo(() => new BudgetService(), []);
  const appService: AppService = useMemo(() => new AppService(navigator.language), []);
  const validationService: ValidationService = useMemo(() => new ValidationService(), []);
  const storageService: StorageService = useMemo(() => new StorageService(localStorage),[]);
  const markupService: MarkupService = useMemo(() => new MarkupService(navigator.language), []);
  const dataSchemasService: DataSchemasService = useMemo(() => new DataSchemasService(navigator.language), []);

  const ContextProvider: ContextInterface = {
    appService: appService,
    budgetService: budgetService,
    markupService: markupService,
    storageService: storageService,
    validationService: validationService,
    dataSchemasService: dataSchemasService,
  };

  useEffect(() => {
    document.title = appService.checkLanguage() ? 'Бюджет' : 'Budget';
    document.documentElement.lang = appService.checkLanguage() ? 'ru-Ru' : 'en-En';
  },[appService]);

  return (
    <Context.Provider value={ContextProvider}>
      <Frame>
                <Routes>
                    {/* <Route path={'/budget'} element={<ProtectedRoute><Budget/></ProtectedRoute>}/>
                    <Route path={'/contact'} element={<ProtectedRoute><Contact/></ProtectedRoute>}/>
                    <Route path={'/features'} element={<ProtectedRoute><Features/></ProtectedRoute>}/>
                    <Route path={'/statistics'} element={<ProtectedRoute><Statistics/></ProtectedRoute>}/>
                    <Route path={'/settings/:list'} element={<ProtectedRoute><Settings/></ProtectedRoute>}/>  */}

                    <Route path={'/'} element={<Preview/>}/>
                    {/* <Route path={'/sign-in'} element={<SignIn/>}/>
                    <Route path={'/sign-up'} element={<SignUp/>}/>
                    <Route path={'/verify-email/:token'} element={<VerifyEmail/>}/>
                    <Route path={'/password-recovery'} element={<PasswordRecovery/>}/>
                    <Route path={'/email-activation/:token'} element={<EmailActivation/>}/>
                    <Route path={'/password-reset/:resetToken'} element={<PasswordReset/>}/> */}
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

// appService, markupService, budgetService, storageService, validationService,
//       dataSchemasService, valueStorage, budgetStorage, currencyStorage, statisticStorage