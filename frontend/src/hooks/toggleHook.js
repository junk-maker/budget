import {useState} from 'react';

const useToggle= () => {
    const [toggle, setToggle] = useState(false);

    return {
        toggle,
        setToggle,
    }
};

export default useToggle;