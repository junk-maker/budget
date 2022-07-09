import PropTypes from 'prop-types';
import {select} from 'd3-selection';
import Context from '../../../../context/Context';
import useDelay from '../../../../hooks/delay-hook';
import React, {useRef, useEffect, useContext, useCallback} from 'react';


const Bars = props => {
    const barRef = useRef(null);
    const {delay, getDelay} = useDelay();
    const {appService} = useContext(Context);
    const {fill, color, xScale, yScale, yValue, xValue, getTransition, budgetService, currentCurrency} = props;
    
    const barEnter = useCallback(() => {
        appService.delay(100).then(getDelay);
        select(barRef.current).transition(getTransition(1000)).attrTween('width',
            () => t => xValue < 0 ?  t * Math.abs(xScale(xValue)) : t * xScale(xValue))
        ;
    },[xScale, xValue, getDelay, appService, getTransition])

    useEffect(() => barEnter(),[]);
    
    return (
        <rect
            x={0}
            ref={barRef}
            y={yScale(yValue)}
            fill={color ? color : fill}
            height={!delay ? null : yScale.bandwidth()}
            width={xValue < 0 ? xScale(Math.abs(xValue)) : xScale(xValue)}
        >  
            <title>{budgetService.format(xValue, currentCurrency)}</title>
        </rect>
        
    );
};


Bars.propTypes = {
    xScale: PropTypes.func,
    fill: PropTypes.string,
    yScale: PropTypes.func,
    color: PropTypes.string,
    yValue: PropTypes.string,
    xValue: PropTypes.number,
    getTransition: PropTypes.func,
    budgetService: PropTypes.object,
    currentCurrency: PropTypes.object,
};


export default Bars;