import {useState} from 'react';

const useSlide = () => {
    const [slide, setSlide] = useState(0);

    return {slide, setSlide,};
};

export default useSlide;