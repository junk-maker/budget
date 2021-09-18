import {useState} from 'react';

const useSlide = () => {
    const [current, setCurrent] = useState(0);

    return {
        current,
        setCurrent,
    }
};

export default useSlide;