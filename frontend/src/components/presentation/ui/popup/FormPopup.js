import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import useForm from '../../../../hooks/form-popup-hook';


const modalRoot = document.getElementById("modal-root");
const FormPopup = props => {
    const {form, setForm} = useForm();

    const handleClick = e => {
        e.preventDefault();
        setForm('out');
    };
    const transitionEnd = (e) => {
        e.persist()
        if (e.propertyName !== 'opacity' || form === 'in') return;

        if (form === 'out') {
            props.onClose();
        }
    };

    return ReactDom.createPortal(
        <div
            className={`form-popup form-${form}`}
            onTransitionEnd={e => transitionEnd(e)}
        >
            <div className={'form-popup__container'} onClick={e => e.preventDefault()}>
                <div className={'form-popup__content'}>
                    {props.children}
                </div>
            </div>
            <div
                onMouseDown={handleClick}
                className={'form-popup__background'}
            />
        </div>, modalRoot
    );
};


FormPopup.propTypes = {
    onClose: PropTypes.func
};


export default FormPopup;