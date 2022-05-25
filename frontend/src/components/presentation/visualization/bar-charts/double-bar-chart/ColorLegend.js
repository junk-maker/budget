import React from 'react';
import PropTypes from 'prop-types';


const ColorLegend = props => {
    const {color, margin, colorScale} = props;

    return (
        colorScale.domain().map((value, idx) => (
            <g key={idx} transform={`translate(0,${margin.top * idx})`}>
                <rect fill={color(value)} width={10} height={10}/>
                <text className={'double-bar-chart__color-legend'} x={20} y={9.5}>
                    {value}
                </text>
            </g>
        ))
    );
};


ColorLegend.propTypes = {
    color: PropTypes.func,
    margin: PropTypes.object,
    colorScale: PropTypes.func,
};


export default ColorLegend;
