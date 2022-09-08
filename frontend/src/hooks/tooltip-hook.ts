import {useState} from 'react';

const useTooltip = () => {
    const [show, setShow] = useState<boolean>(false);

    return {show, setShow,}
};

export default useTooltip;