import {useState} from 'react';
import {UseSlideInterface} from './hooks.interface';

const useSlide = (): UseSlideInterface => {
    const [slide, setSlide] = useState<number>(0);

    return {slide, setSlide,};
};

export default useSlide;