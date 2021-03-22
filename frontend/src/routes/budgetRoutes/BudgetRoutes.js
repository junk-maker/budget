import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from '../../components/home/Home';
import Budget from '../../components/budget/Budget';
import Statistics from '../../components/statistic/Statistic';
import Values from '../../components/values/Values';
import ValuesConfig from '../../components/values/config';


const BudgetRoutes = () => {
    const value = new ValuesConfig();
    
    return (
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/budget' component={Budget}/>
            <Route exact path='/statistics' component={Statistics}/>
            <Route exact path='/budget/:values' render={({match}) =>
                <Values render={value.getBudgetValue()} value={match.params}/>}/>
        </Switch>
    );
};

export default BudgetRoutes;