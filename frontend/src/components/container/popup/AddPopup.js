import React from 'react';
import PropTypes from 'prop-types';


const AddPopup = props => {
    const {active, setActive, appService, addPopupOpen, setAddPopupOpen} = props;

    const modalWindowCloseHandler = () => {
        setActive(false);
        appService.delay(300).then(() =>  setAddPopupOpen(false));
    };

    const popup = <div className={active ? 'add-popup open' : 'add-popup close'} onClick={modalWindowCloseHandler}>
        <div  className={'add-popup__container'}>
            <div className={'add-popup__content'} onClick={e => e.stopPropagation()}>
                <div className={'add-popup__body'}>
                    {props.children}
                </div>
            </div>
        </div>
    </div>;

    return (
        <>
            {addPopupOpen && popup}
        </>
    );
};


AddPopup.propTypes = {
    active: PropTypes.bool,
    setActive: PropTypes.func,
    addPopupOpen: PropTypes.bool,
    appService: PropTypes.object,
    setAddPopupOpen: PropTypes.func
};


export default AddPopup;