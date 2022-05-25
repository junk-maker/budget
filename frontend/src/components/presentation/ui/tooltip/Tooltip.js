import React from 'react';
import PropTypes from 'prop-types';
import useTooltip from '../../../../hooks/tooltip-hook';

const Tooltip = props => {
    const {show, setShow} = useTooltip();

    return (
        <>
            <div className={'tooltip'} style={show ? {visibility: 'visible'} : null}>
                {props.text}
                <span className={'tooltip__arrow'}/>
            </div>
            <div style={{width: 'auto'}}
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
            >
                {props.children}
            </div>
        </>
      );
};


Tooltip.propTypes = {
    text: PropTypes.string,
    children: PropTypes.array,
};


export default Tooltip;