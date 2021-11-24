import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';


const Portal = ({children}) => {
    const [container] = useState(() => document.createElement('div'));

    useEffect(() => {
        document.body.appendChild(container);
        return () => document.body.removeChild(container);
    }, [container]);

    return ReactDOM.createPortal(children, container);
};


export default Portal;