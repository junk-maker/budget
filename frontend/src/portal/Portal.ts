import {createPortal} from 'react-dom';
import {useRef, useEffect} from 'react';

interface PortalProps {
    children: React.ReactNode;
};

const modalRoot = document.querySelector("#modal-root") as HTMLElement;

const Portal = ({children}: PortalProps) => {
    const el = useRef(document.createElement('div'));

    useEffect(() => {
        let container = el.current;
        modalRoot.appendChild(container);
        return () => void modalRoot.removeChild(container);
    }, []);

    return createPortal(children, el.current);
};


export default Portal;