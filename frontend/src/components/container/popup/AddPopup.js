import React from 'react';
import PropTypes from 'prop-types';
import AppService from '../../../services/appService';


const AddPopup = props => {
    const appService = new AppService();
    const {active, setActive, addPopupOpen, setAddPopupOpen} = props;

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
    setAddPopupOpen: PropTypes.func
};


export default AddPopup;