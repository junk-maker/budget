import React from 'react';
import PropTypes from 'prop-types';
import Portal from '../../../../portal/Portal';
import useDatepicker from '../../../../hooks/datepicker-popup-hook';


const DatepickerPopup = props => {
    const {datepicker, setDatepicker} = useDatepicker();

    const handleClick = e => {
        e.preventDefault();
        setDatepicker('out');
    };
    const transitionEnd = e => {
        e.persist()
        if (e.propertyName !== 'opacity' || datepicker === 'in') return;

        if (datepicker === 'out') props.onClose();
    };

    return(
        <Portal>
            <div
                className={`datepicker-popup datepicker-${datepicker}`}
                onTransitionEnd={e => transitionEnd(e)}
            >
                <div className={'datepicker-popup__container'} onClick={e => e.preventDefault()}>
                    <div className={'datepicker-popup__content'}>
                        {props.children}
                    </div>
                </div>
                <div
                    onMouseDown={handleClick}
                    className={'datepicker-popup__background'}
                />
            </div>
        </Portal>
    );
};


DatepickerPopup.propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.object,
};


export default DatepickerPopup;