import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import PageContainer from '../../components/page-container/PageContainer';


const MainView = () => {
    return (
        <div className={'main-view'}>
            <Sidebar/>
            <PageContainer/>
        </div>
    );
};


export default MainView;