import Portal from '../../../../portal/Portal';
import React, {MouseEvent, TransitionEvent} from 'react';
import useValue from '../../../../hooks/value-popup-hook';

interface ValuePopupProps {
    // popupOpen: string;
    onClose: () => void;
    children: React.ReactNode;
};

const ValuePopup = ({onClose, children}: ValuePopupProps) => {
    const {value, setValue} = useValue();
    
    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setValue('out');
    };
    // const close = () => popupOpen === 'out' ? setValue('out') : null;
    
    const transitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
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

export default ValuePopup;