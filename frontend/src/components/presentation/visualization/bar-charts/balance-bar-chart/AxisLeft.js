import React from 'react';
import PropTypes from 'prop-types';


const AxisLeft = props => {
    const {yScale} = props;
    return(
        yScale.domain().map(value => (
            <g key={value}>
                <text
                    x={-10}
                    dy={'.32em'}
                    style={{textAnchor: 'end'}}
                    y={yScale(value) + yScale.bandwidth() / 2}
                    className={'statistic__balance-bar-chart--title'}
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
