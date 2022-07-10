import PropTypes from 'prop-types';
import {select} from 'd3-selection';
import {interpolateNumber} from 'd3-interpolate';
import React, {useRef, useEffect, useCallback} from 'react';


const Arc = props => {
    const barRef = useRef(null);
    const {d, idx, data, color, arcPath, markupService, getTransition, budgetService, currentCurrency} = props;
    
    const arcEnter = useCallback(() => {
        let i = interpolateNumber(d.endAngle, d.startAngle);
        select(barRef.current).transition(getTransition(600)).attrTween('d', () => t => {
            d.startAngle = i(t);
            return arcPath(d);
        });
    },[d, arcPath, getTransition])

    useEffect(() => arcEnter(), []);
    
    return (
        <g>
            <path
                ref={barRef}
                d={arcPath(d)}
                fill={color(idx / (data.length - 1))}
            >
                <title>
                    {`${markupService.chartsHeadingTemplate()['sum']}: ${budgetService.format(d.value, currentCurrency)}, ${markupService.chartsHeadingTemplate()['cat']}: ${d.data.category}, ${markupService.chartsHeadingTemplate()['date']}: ${new Date(d.data.date).toLocaleDateString()}`}
                </title>
            </path>
        </g>
    );
};


Arc.propTypes = {
    d: PropTypes.object,
    idx: PropTypes.number,
    color: PropTypes.func,
    data: PropTypes.array,
    arcPath: PropTypes.func,
    getTransition: PropTypes.func,
    budgetService: PropTypes.object,
    markupService: PropTypes.object,
    currentCurrency: PropTypes.object,
};


export default Arc;