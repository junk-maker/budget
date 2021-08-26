import React from 'react';
import PropTypes from 'prop-types';


const AxisBottom = props => {
    const {xScale, tickFormat, innerHeight} = props;

   return(
       xScale.ticks().map((value, idx) => (
           <g key={idx} className={'axis'}>
               <line
                   y1={0}
                   y2={innerHeight}
                   stroke={'black'}
                   x1={xScale(value)}
                   x2={xScale(value)}

               />
               <text
                   x={xScale(value)}
                   y={innerHeight + 25}
                   textAnchor={'middle'}

               >
                   {tickFormat(value)}
               </text>
           </g>)
       )
   );
};


AxisBottom.propTypes = {
    xScale: PropTypes.func,
    xLabelFormat: PropTypes.func,
    innerHeight: PropTypes.number,
};


export default AxisBottom;