import React from 'react';
import './App.scss';
import Frame from './hoc/frame/Frame';
import Sidebar from './components/sidebar/Sidebar';
import MainView from './composition/main-view/MainView';

function App() {
  return (
      <Frame className={'budget-view-container'}>
        <Sidebar/>
        <MainView/>
      </Frame>
  );
}

export default App;
