import React from 'react';
import PropTypes from 'prop-types';
import Portal from '../../../../portal/Portal';
import useForm from '../../../../hooks/form-popup-hook';


const FormPopup = props => {
    const {form, setForm} = useForm();

    const handleClick = e => {
        e.preventDefault();
        setForm('out');
    };
    const transitionEnd = e => {
        e.persist()
        if (e.propertyName !== 'opacity' || form === 'in') return;

        if (form === 'out') {
            props.onClose();
        }
    };

    return(
        <Portal>
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
            </div>
        </Portal>
    );
};


FormPopup.propTypes = {
    onClose: PropTypes.func
};


export default FormPopup;