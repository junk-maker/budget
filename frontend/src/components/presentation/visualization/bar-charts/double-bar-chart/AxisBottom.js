import React, {memo} from 'react';
import PropTypes from 'prop-types';

const AxisBottom = memo(({xScale, tickFormat, innerHeight}) => {
   return (
       xScale.ticks().map((value, idx) => (
           <g key={idx} className={'axis'}>
               <line
                   y1={0}
                   stroke={'black'}
                   x1={xScale(value)}
                   x2={xScale(value)}
                   y2={innerHeight + 4}
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
});

AxisBottom.propTypes = {
    xScale: PropTypes.func,
    xLabelFormat: PropTypes.func,
    innerHeight: PropTypes.number,
};

export default AxisBottom;