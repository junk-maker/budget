import React from 'react';
import PropTypes from 'prop-types';
import Portal from '../../../../portal/Portal';
import useAlert from '../../../../hooks/alert-popup-hook';


const AlertPopup = props => {
    const {alert}= useAlert();

    const transitionEnd = e => {
        e.persist()
        if (e.propertyName !== 'height' || alert === 'active') return;

        if (alert === 'alert') props.onReset();
    };

    return (
        <Portal>
            <div className={alert}
                 onTransitionEnd={e => transitionEnd(e)}
            >
                <span className={'alert__content'}>{props.children}</span>
            </div>
            <div className={'alert__background'}/>
        </Portal>
    );
};


AlertPopup.propTypes = {
    onReset: PropTypes.func,
    children: PropTypes.string
};


export default AlertPopup;