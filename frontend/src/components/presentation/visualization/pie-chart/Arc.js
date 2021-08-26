import PropTypes from 'prop-types';
import {select} from 'd3-selection';
import React, {useEffect, useRef} from 'react';
import {interpolateNumber} from 'd3-interpolate';


const Arc = props => {
    const barRef = useRef(null);
    const {d, idx, color, arcPath, data, getTransition, budgetService, currentCurrency} = props;


    useEffect(() => {
        let i = interpolateNumber(d.endAngle, d.startAngle);
        select(barRef.current).transition(getTransition(600)).attrTween('d', () => t => {
            d.startAngle = i(t);
            return arcPath(d);
        });
    }, [d, barRef, arcPath, getTransition]);

    return(
        <g>
            <path
                ref={barRef}
                d={arcPath(d)}
                fill={color(idx / (data.length - 1))}
            >
                <title>{`сумма: ${budgetService.format(d.value, currentCurrency)} категория: ${d.data.category}`}</title>
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
    currentCurrency: PropTypes.object,
};


export default Arc;