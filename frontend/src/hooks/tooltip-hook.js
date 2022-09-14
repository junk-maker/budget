import {useState} from 'react';

const useTooltip = () => {
    const [show, setShow] = useState(false);

    return {show, setShow,}
};

export default useTooltip;