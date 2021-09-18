import {useState} from 'react';

const useActive= () => {
    const [active, setActive] = useState(false);

    return {
        active,
        setActive,
    }
};

export default useActive;