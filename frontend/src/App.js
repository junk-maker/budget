import './App.scss';
import React from 'react';
import Frame from './hoc/frame/Frame';
import MainView from './components/presentation/main-view/MainView';
import AuthView from './components/presentation/auth-view/AuthView';


const App = () => {
  return (
    <Frame className={'frame'}>
        <AuthView/>
        {/*<MainView/>*/}
    </Frame>
  );
};

export default App;
