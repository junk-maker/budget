import {useState} from 'react';

const useValue= () => {
    const [value, setValue] = useState(null);

    return {
        value,
        setValue,
    }
};

export default useValue;