import './App.scss';
import React from 'react';
import Frame from './hoc/frame/Frame';
import AuthView from './composition/auth-view/AuthView';
import MainView from './composition/main-view/MainView';


const App = () => {
  return (
    <Frame className={'frame'}>
        <AuthView/>
        {/*<MainView/>*/}
    </Frame>
  );
};

export default App;
