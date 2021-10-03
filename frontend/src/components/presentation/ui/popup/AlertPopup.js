import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import useAlert from '../../../../hooks/alert-popup-hook';


const modalRoot = document.getElementById("modal-root");
const AlertPopup = props => {
    const {alert}= useAlert();

    const transitionEnd = (e) => {
        e.persist()
        if (e.propertyName !== 'height' || alert === 'active') return;

        if (alert === 'alert') {
            props.onReset();
        }
    };

    return ReactDom.createPortal(
        <>
            <div className={alert}
                 onTransitionEnd={e => transitionEnd(e)}
            >
                <span className={'alert__content'}>{props.children}</span>
            </div>
            <div className={'alert__background'}/>
        </>, modalRoot
    );
};


AlertPopup.propTypes = {
    onReset: PropTypes.func,
    children: PropTypes.string
};


export default AlertPopup