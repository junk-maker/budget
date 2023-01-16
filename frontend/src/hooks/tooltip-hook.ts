import {useState} from 'react';
import {UseTooltipInterface} from './hooks.interface';

const useTooltip = (): UseTooltipInterface => {
    const [show, setShow] = useState<boolean>(false);

    return {show, setShow,}
};

export default useTooltip;