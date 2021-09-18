import {useState} from 'react';

const useDelay = () => {
    const [delay, setDelay] = useState(null);

    return {
        delay,
        getDelay: () => setDelay(true),
    }
};

export default useDelay;