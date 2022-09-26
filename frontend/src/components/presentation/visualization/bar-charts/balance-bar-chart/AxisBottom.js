import React, {memo} from 'react';
import PropTypes from 'prop-types';

const AxisBottom = memo(({xScale, tickFormat, innerHeight}) => {
    return (
        xScale.ticks().map(value =>
            <g
                key={value}
                className={'axis'}
                transform={`translate(${xScale(value)},0)`}>
                <line y2={innerHeight}/>
                <text dy={'20px'} y={innerHeight + 3} style={{textAnchor: 'middle'}}>
                    {tickFormat(value)}
                </text>
            </g>
        )
    );
});

AxisBottom.propTypes = {
    xScale: PropTypes.func,
    tickFormat: PropTypes.func,
    innerHeight: PropTypes.number,
};

export default AxisBottom;
