import React from 'react';
import PropTypes from 'prop-types';
import {AppService} from '../../../services/appService';


const AddPopup = props => {
    let appService = AppService;
    const {active, setActive, modalWindowOpen, setModalWindowOpen} = props;

    const modalWindowCloseHandler = () => {
        setActive(false);
        appService.delay(300).then(() =>  setModalWindowOpen(false));
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
            {modalWindowOpen && popup}
        </>
    );
};


AddPopup.propTypes = {
    active: PropTypes.bool,
    setActive: PropTypes.func,
    modalWindowOpen: PropTypes.bool,
    setModalWindowOpen: PropTypes.func
};


export default AddPopup;