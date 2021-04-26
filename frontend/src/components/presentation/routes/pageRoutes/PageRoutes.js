import Features from '../../features/Features';
import {Switch, Route} from 'react-router-dom';
import Settings from '../../../settings/Settings';
import Budget from '../../../container/budget/Budget';
import Statistics from '../../../statistic/Statistic';
import NotFound from '../../error-handlers/not-found/NotFound';


const PageRoutes = () => {
    return (
        <Switch>
            <Route exact path={'/'} component={Features}/>
            <Route exact path={'/budget'} component={Budget}/>
            <Route exact path={'/settings'} component={Settings}/>
            <Route exact path={'/statistics'} component={Statistics}/>
            <Route path={'*'} component={NotFound}/>
        </Switch>
    );
};

export default PageRoutes;