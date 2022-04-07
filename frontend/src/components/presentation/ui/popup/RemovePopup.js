import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button';
import Portal from '../../../../portal/Portal';
import useRemove from '../../../../hooks/remove-popup-hook';


const RemovePopup = props => {
    const {remove, setRemove} = useRemove();

    const handleClick = e => {
        setRemove('out');
    };

    const removeHandleClick = () => {
        props.onClick();
        handleClick();
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
                    <div className={'list__remove'}>
                        <h3 className={'list__remove--heading'}>
                            Вы уверены, что хотите удалить пользователя?
                        </h3>
                        <div className={'list__remove--btn-box'}>
                            <Button className={'btn btn__remove btn__remove--yes'} onClick={removeHandleClick}>
                                <span>{props.markupService.toggleButtonLanguage('remove-yes')}</span>
                            </Button>
                            <Button className={'btn btn__remove btn__remove--no'} onClick={handleClick}>
                                <span>{props.markupService.toggleButtonLanguage('remove-no')}</span>
                            </Button> 
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