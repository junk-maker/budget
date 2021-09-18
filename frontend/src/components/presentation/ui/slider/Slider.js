import React from 'react';
import PropTypes from 'prop-types';
import useSlide from '../../../../hooks/slideHook';
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa';


const Slider = props => {
    const {current, setCurrent} = useSlide();
    const {slides, appService, setCurrentCurrency} = props;

    const prevSlideHandler = () => {
        setCurrent(prev => prev === 0 ? slides.length - 1 : prev - 1);
        setCurrentCurrency(slides[current - 1] === undefined ? slides[5] : slides[current - 1]);
    };

    const nextSlideHandler = () => {
        setCurrent(prev => prev === slides.length - 1 ? 0 : prev + 1);
        setCurrentCurrency(slides[current + 1] === undefined ? slides[0] : slides[current + 1]);
    };

    if (!Array.isArray(slides) || slides.length <= 0) return null;

    return(
        <div className={'slider'}>
            <FaArrowAltCircleLeft className={'slider__arrow slider__arrow--left'} onClick={prevSlideHandler} />
            <FaArrowAltCircleRight className={'slider__arrow slider__arrow--right'} onClick={nextSlideHandler}/>
            {slides.map((slide, idx) => {
                return (
                    <div
                        key={slide.id}
                        className={idx === current ? 'slider__slide active' : 'slider__slide'}
                    >
                        {idx === current && (
                            <div className={'slider__content'}>
                                {appService.checkLanguage() ? slide.symbol : slide.translate}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};


Slider.propTypes = {
    slides: PropTypes.array,
    appService: PropTypes.object,
    setCurrentCurrency: PropTypes.func,
};


export default Slider;