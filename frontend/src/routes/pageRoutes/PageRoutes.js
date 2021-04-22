import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Budget from '../../components/budget/Budget';
import Settings from '../../components/settings/Settings';
import Features from '../../components/features/Features';
import Statistics from '../../components/statistic/Statistic';


const PageRoutes = () => {
    return (
        <Switch>
            <Route exact path={'/'} component={Features}/>
            <Route exact path={'/budget'} component={Budget}/>
            <Route exact path={'/settings'} component={Settings}/>
            <Route exact path={'/statistics'} component={Statistics}/>
        </Switch>
    );
};

export default PageRoutes;