import React from 'react';


const Modal = props => {
    const {active, setActive} = props;
    return (
        <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(!active)}>
            <div className={active ? 'modal__container active' :'modal__container'} onClick={e => e.stopPropagation()}>
                {props.children}
            </div>
        </div>
    );
};


export default Modal;