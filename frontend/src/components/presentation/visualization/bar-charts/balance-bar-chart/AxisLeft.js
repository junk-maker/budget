import React from 'react';
import PropTypes from 'prop-types';


const AxisLeft = props => {
    return (
        props.yScale.domain().map(value => (
            <g key={value}>
                <text
                    x={-10}
                    dy={'.32em'}
                    style={{textAnchor: 'end'}}
                    className={'balance-bar-chart__title'}
                    y={props.yScale(value) + props.yScale.bandwidth() / 2}
                >
                    {value}
                </text>
            </g>
        ))
    );
};


AxisLeft.propTypes = {
    yScale: PropTypes.func,
};


export default AxisLeft;
