import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Features from '../../components/features/Features';
import Budget from '../../components/budget/Budget';
import Statistics from '../../components/statistic/Statistic';
import Values from '../../components/values/Values';
import AppService from '../../services/appService';
import ValuesConfig from '../../components/values/config';

const PageRoutes = () => {
    const app = new AppService();
    const value = new ValuesConfig();
    const type = app._type;

    return (
        <Switch>
            <Route exact path={'/'} component={Features}/>
            <Route exact path={'/budget'} component={Budget}/>
            <Route exact path={'/statistics'} component={Statistics}/>
            <Route exact path={'/budget/:values'} render={({match}) =>
                <Values render={value.getBudgetValue(type)} value={match.params}/>}/>
        </Switch>
    );
};

export default PageRoutes;