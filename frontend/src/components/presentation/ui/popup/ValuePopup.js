import React from 'react';
import PropTypes from 'prop-types';
import Portal from '../../../../portal/Portal';
import useValue from '../../../../hooks/value-popup-hook';


const ValuePopup = ({onClose, children, popupOpen}) => {
    const {value, setValue} = useValue();
    
    const handleClick = e => {
        e.preventDefault();
        setValue('out');
    };
    const close = () => popupOpen === 'out' ? setValue('out') : null;
    
    const transitionEnd = e => {
        close();
        e.persist();
        if (e.propertyName !== 'opacity' || value === 'in') return;

        if (value  === 'out') onClose();
    };

    return(
        <Portal>
            <div
                className={`value-popup value-${value}`}
                onTransitionEnd={e => transitionEnd(e)}
            >
                <div className={'value-popup__container'} onClick={e => e.preventDefault()}>
                    <div className={'value-popup__content'}>
                        {children}
                    </div>
                </div>
                <div
                    onMouseDown={handleClick}
                    className={'value-popup__background'}
                />
            </div>
        </Portal>
    );
};


ValuePopup.propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.any,
    popupOpen: PropTypes.string,
};


export default ValuePopup;