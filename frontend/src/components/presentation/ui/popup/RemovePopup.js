import React from 'react';
import PropTypes from 'prop-types';
import Portal from '../../../../portal/Portal';
import useRemove from '../../../../hooks/remove-popup-hook';


const RemovePopup = props => {
    const {remove, setRemove} = useRemove();

    const denyHandler = () => setRemove('out');

    const removeHandler = () => {
        props.onClick();
        denyHandler();
    };

    const transitionEnd = e => {
        e.persist()
        if (e.propertyName !== 'opacity' || remove === 'in') return;

        if (remove === 'out') props.onClose();
    };

    return (
        <Portal>
            <div className={`remove-popup remove-${remove}`}
                onTransitionEnd={e => transitionEnd(e)}
            >
                <div className={'remove-popup__content'}>
                    <div className={'remove-popup__header'}>
                        <h3 className={'remove-popup__heading'}>
                            {props.markupService.removePopupHeadingTemplate()['title']}
                        </h3>
                        <div className={'remove-popup__btn-box'}>
                            <span onClick={removeHandler}> 
                                <img 
                                    src={'/icons/ok.svg'} 
                                    className={'remove-popup__img'}
                                    alt={props.markupService.svgHeadingTemplate()['ok']}
                                />
                            </span>
                           
                            <span onClick={denyHandler}> 
                                <img 
                                    src={'/icons/disabled.svg'} 
                                    className={'remove-popup__img'} 
                                    alt={props.markupService.svgHeadingTemplate()['deny']}
                                />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'remove-popup__background'}/>
        </Portal>
    );
};


RemovePopup.propTypes = {
    onClose: PropTypes.func,
    onClick: PropTypes.func,
};


export default RemovePopup;