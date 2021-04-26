import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import PageContainer from '../page-container/PageContainer';


const MainView = () => {
    return (
        <div className={'main-view'}>
            <Sidebar/>
            <PageContainer/>
        </div>
    );
};


export default MainView;