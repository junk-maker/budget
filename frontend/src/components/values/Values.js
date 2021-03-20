import React, {useEffect}from 'react';
import {useDispatch} from 'react-redux';
import {fetchBudgetByValue} from '../../redux/actions/budgetActions';


const Values = props => {
    const render = props.render;
    const dispatch = useDispatch();
    const value = props.value.values;

    useEffect(() => {
        dispatch(fetchBudgetByValue(value));
    }, [value, dispatch]);
    
    return (
        <>
            {render[value]['description']}
        </>
    );
};


export default Values;