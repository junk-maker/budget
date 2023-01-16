import {useState} from 'react';
import {UseDelayInterface} from './hooks.interface';

const useDelay = (): UseDelayInterface => {
    const [delay, setDelay] = useState<boolean>(false);

    return {delay, getDelay: () => setDelay(true),};
};

export default useDelay;