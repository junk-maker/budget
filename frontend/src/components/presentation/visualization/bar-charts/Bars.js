import PropTypes from 'prop-types';
import {select} from 'd3-selection';
import Context from '../../../../context/Context';
import useDelay from '../../../../hooks/delayHook';
import React, {useRef, useEffect, useContext} from 'react';


const Bars = props => {
    const {delay, getDelay} = useDelay();
    const barRef = useRef(null);
    const {appService} = useContext(Context);
    const {color, xScale, yScale, yValue, xValue, getTransition, budgetService, currentCurrency} = props;

    useEffect(() => {
        appService.delay(100).then(getDelay);
        select(barRef.current).transition(getTransition(1000)).attrTween('width', () => t => t * xScale(xValue));
    },[barRef, xScale, xValue, getDelay, appService, getTransition]);

    return(
        <rect
            x={0}
            ref={barRef}
            fill={color}
            y={yScale(yValue)}
            width={xScale(xValue)}
            height={!delay ? null : yScale.bandwidth()}
        >
            <title>{budgetService.format(xValue, currentCurrency)}</title>
        </rect>
    );
};


Bars.propTypes = {
    xScale: PropTypes.func,
    yScale: PropTypes.func,
    color: PropTypes.string,
    yValue: PropTypes.string,
    xValue: PropTypes.number,
    getTransition: PropTypes.func,
    budgetService: PropTypes.object,
    currentCurrency: PropTypes.object,
};


export default Bars;